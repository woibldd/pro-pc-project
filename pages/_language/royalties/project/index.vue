<template>
  <div class="royalties-project-wrap">
    <div class="nav">
      <TopNav>
        <button v-if="WalletID" class="btn-add Common_white BGpurple" @click="handleClickAdd">{{myLang.project.addProject}}</button>
      </TopNav>
    </div>
    <div class="list" > 
      <div v-if="list.length > 0 || loading">
        <a-table  :locale="{emptyText:' '}"  :loading="loading" class="my-table royalty-table" :columns="columns" :data-source="list"  :pagination="pagination">
          <span slot="check_time" slot-scope="check_time">
            <label>
              {{parseTime(check_time)}}
            </label>
          </span>
          <span slot="chain" slot-scope="chain">
            <label>
              {{chainTransform(chain)}}
            </label>
          </span>
          <span slot="check_status" slot-scope="check_status, record">
            <a-tooltip v-if="check_status==2" overlayClassName="mytooltip"  :title="`${myLang.reason}: ${record.check_reject_reason || ''}`" >
              <label class="status" :class="[`status2`]">
                <!-- {{statusDist[check_status]}} -->
                {{myLang.project.table.statusDict[check_status]}}
                <img class="standard-icon"  src="@/assets/img/components/royalties/icon-reject.svg" alt="">
              </label>
            </a-tooltip>
            <label  v-else class="status" :class="[`status${check_status}`]">
              <!-- {{statusDist[check_status]}} -->
              {{myLang.project.table.statusDict[check_status]}}
            </label>
          </span>
          <span slot="action" slot-scope="text, record">
            <span v-if="record.role == 'manager' || record.role == 'admin'"> 
              <a v-if="record.check_status > 1"  @click="()=>handleClickRemove(record)" class="Colorpurple table-btn">{{myLang.delete}}</a>
              <a v-if="record.check_status > 0" @click="()=>handleClickEdit(record)" class="Colorpurple table-btn">{{myLang.edit}}</a> 
            </span>
          </span>
        </a-table>
      </div> 
      <div v-else class="empty-box"> 
        <div class="empty-icon">
          <img src="@/assets/img/components/royalties/icon-empty3.png" alt="">
        </div>
        <div class="empty-text1 text1">
           {{myLang.nodata2}}
          <!-- 暂无合集 -->
        </div>
        <!-- <div class="empty-text2 text1">{{myLang.dataCenter.text1}}</div> -->
        <div class="empty-btn">
          <button  @click="handleClickAdd" class="route-btn">{{myLang.dataCenter.text2}}</button>
          <!-- <button v-else  @click="connectWallet" class="route-btn">{{myLang.dataCenter.connect}}</button> -->
        </div> 
      </div>
    </div> 

    <v-modal :open.sync="showModalConfirm">  
      <div class="modal-box modal-confirm"> 
        <div class="modal-content text1"> 
          {{myLang.project.table.text1}}
        </div>
        <div class="modal-option" flex="box:mean">
          <button class="modal-btn btn-cancle BG1 text1" @click="showModalConfirm=false">{{myLang.cancel}}</button>
          <button class="modal-btn btn-confirm BGpurple " @click="handleConfirmRemove">{{myLang.confirm}}</button>
        </div>
      </div>
    </v-modal> 
  </div>
</template>


<script>
import TopNav from '@/components/royalties/topNav.vue';
// import { wallet } from '@/utils/wallet'
import {Table, Form, Checkbox, Input, Upload, Row, Col, Tooltip} from 'ant-design-vue' 
import {parseTime} from '@/utils/public' 
import mixin from '@/mixins/royalty.js'
import VModal from '@/components/nft/VModal.vue';
import Vue from 'vue'
Vue.use(Table)
Vue.use(Form) 
// Vue.use(Form.Item)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)

export default {
  layout: 'nft/default',
  name: 'NftPorjectList',
  components: { TopNav, VModal },
  mixins: [mixin],
  data() {
    return {
      show: 'list',
      showModalConfirm: false,
      columns: [
        {
          title: this.$t('royalties.project.table.createTime'),// '添加时间',
          dataIndex: 'check_time',//
          key:'check_time',
          width: '20%',
          scopedSlots: {
            customRender: 'check_time'
          }
        },
        {
          title: this.$t('royalties.project.table.name'), // '合集名',
          dataIndex: 'name',
          key:'name',
          width: '20%',
        },
        { 
          title: this.$t('royalties.project.table.contract'), // '合集名',
          dataIndex: 'collection_contract',
          key:'collection_contract',
          width: '25%',
        },
        {
          title:  this.$t('royalties.project.table.chain'),
          dataIndex: 'chain',
          key:'chain',
          width: '13%',
          scopedSlots: {
            customRender: 'chain'
          }
        },
        {
          title: this.$t('royalties.project.table.status'),
          dataIndex: 'check_status',// 审核状态：0审核中，1审核通过，2审核未通过
          key:'check_status', 
          width: '8%',
          scopedSlots: {
            customRender: 'check_status'
          }
        },
        {
          title:  this.$t('royalties.project.table.operation'), 
          key:'action',
          align: 'right',
          width: '14%',
          scopedSlots: {
            customRender: 'action'
          }
        },
      ],
      selectedItem: null,
      list: [],
      loading: true,
      // 审核状态：0审核中，1审核通过，2审核未通过
      statusDist: {
        0: '审核中',
        1: '已通过',
        2: '未通过', 
      },
      form: this.$form.createForm(this, { name: 'coordinated' }),
      fileList: [],
      fileList2: [], 
      pagination: {
        current:1,
        pageSize: 10, 
        total: 0,  
        onChange: this.pageChange,
        hideOnSinglePage: true
      },
      countDown: {}
    }
  },
  computed: { 
    myLang() {
      return this.$t('royalties')
    }, 
      WalletID() {
        return this.$store.state.WalletID
      },
  },
  watch: { 
    "$store.state.WalletID": function (newVal, oldVal) {  
      this.getList()
    },
  },
  methods: {
    parseTime,
    async getList() { 
      this.loading = true
      // const walletid = this.$store.state.WalletID
      const {  address } = this.$store.state
      const params = {
        address,  
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
      try {
        const {data, status} = await this.$api.royalties.getCollections(params) 
        if (status==0) {
          this.pagination.total = data.total
          this.list = data.list || []
        } 
        this.loading = false
      } catch {
        this.loading = false
      }
    },
    handleClickAdd() { 
      this.$Ta.track( {
        name:"Application_Collection", 
      })
      const locale = this.$store.state.locale
      this.$router.push({
        path: `/${locale}/royalties/project/edit`, 
      }) 
    },
    handleClickRemove(item) { 
      this.selectedItem = item
      this.showModalConfirm = true 
    },
    async handleConfirmRemove() {
      if (!this.selectedItem) return  
      if (this.countDown.Remove && this.countDown.Remove > new Date()) { 
        return
      } else {
        this.countDown.Remove = +new Date() + 5000
      }
      const  {token, signature, sign_address} = await this.getSignature()

      if (token && signature) {
        const params = {
          chain: this.selectedItem.chain,
          contract: this.selectedItem.collection_contract,
          token,
          signature,
          sign_address
        }
        const res = await this.$api.royalties.removeProject(params)
        // console.log('handleConfirmRemove',res)
        if (res.status == 0) {
          this.getList()

          this.showModalConfirm = false
        }
      }
    },
    handleClickEdit(item) {   
      const locale = this.$store.state.locale 
      this.$router.push({
        path: `/${locale}/royalties/project/edit`,  
        query: {
          chain: item.chain,
          contract: item.collection_contract
        }
      })
    }, 
    chainTransform(chain) {
      if (chain=='bnb') {
        return 'BSC'
      } else if (chain=='eth') {
        return 'ETH'
      } else if (chain=='matic') {
        return 'Polygon'
      }
    },
    pageChange(e) { 
      this.pagination.current = e
      this.getList()
    }
  },
  created() {
  },
  mounted() { 
    this.getList()
  }
}

</script>

<style lang="less" scoped>
.royalties-project-wrap {
  .btn-add {
    padding: 10px 14px;
    border-radius: 8px;
    font-family: 'PingFang SC'; 
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  .list {
    .table-btn {
      margin-left: 20px;
    }
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      &.status0 {
        color: #FFB800;
        background-color: rgba(255, 184, 0, 0.1);
      }
      &.status1 {
        color: #1BC89E;
        background: rgba(27, 200, 158, 0.1);;

      }
      &.status2 {
        color: #F36464;
        background:  rgba(243, 100, 100, 0.1);
      }
    }

    .empty-box {
      text-align: center;
      .empty-icon {
        margin-top: 154px;
        img {
          width: 64px;
          height: 64px;
        }
      }
      .empty-text1 {
        margin-top: 20px;
        font-family: 'PingFang SC'; 
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
      }
      .empty-text2 {
        margin-top: 10px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
      }
      .route-btn {
        margin-top: 30px;
        min-width: 200px;
        box-sizing: border-box;
        padding: 0 20px;
        height: 50px;
        background: #7524F9;
        border-radius: 8px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        color: #fff;
      } 
    }
  }

  .my-table {
    font-size: 14px;
    /deep/.ant-table-thead > tr > th, 
    /deep/.ant-table-tbody > tr > td {
      padding: 16px 0;
      background-color: #fff;

    }
  } 
  .form-wrap { 
    max-width: 755px;
    margin: 25px auto;
    .create-order-top {
      .title {
        position: relative;
        h2 {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 150%;
        }
        .return {
          position: absolute;
          top: 0; 
          left: -48px;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          border: 1px solid;
        }
      }
    }
    .btn {

      width: 172px;
      height: 48px;
      border-radius: 8px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      line-height: 48px;
    }
  }
  .modal-box {
    width: 420px;
    box-sizing: border-box;
    padding: 20px;
    .modal-content {
      margin-top: 80px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 130%;
      text-align: center;
    }
    .modal-option {
      margin-top: 90px;
      gap: 10px;
      .modal-btn {
        padding: 13px 0; 
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        border-radius: 8px;
        .btn-cancle { 
        }
        &.btn-confirm {
          color: #fff;
        }

      }
    }
  }
}
</style>


<style  lang="less">
.mytooltip {
  max-width: 240px;
  .ant-tooltip-content {
    .ant-tooltip-inner {
      background-color: #fff;
      color: #0E0E0E;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
    } 
    .ant-tooltip-arrow:before {
      background-color: #fff;
    }
  }

  
}
</style>