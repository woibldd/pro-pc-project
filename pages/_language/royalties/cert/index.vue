<template>
  <div class="royalties-cert-wrap">
    <div class="nav">
      <TopNav>
        <button v-if="WalletID" class="btn-add Common_white BGpurple" @click="handleClickAdd">{{$t('royalties.cert.addCert')}}</button>
      </TopNav>
    </div>
    <div class="list" > 
      <div v-if="list.length > 0 || loading">
        <a-table :locale="{emptyText:' '}" :loading="loading" class="my-table royalty-table " :columns="columns" :data-source="list" :pagination="pagination">
          <span slot="auth_standard" slot-scope="auth_standard">
            <label >
              {{standardDist[auth_standard]}} 
              <img v-if="auth_standard==1" class="standard-icon" src="@/assets/img/components/royalties/icon-cert-blue.svg" alt="">
              <img v-if="auth_standard==2" class="standard-icon" src="@/assets/img/components/royalties/icon-cert-pink.svg" alt="">
            </label>
          </span>
          <span slot="auth_status" slot-scope="auth_status,record"> 
            <a-tooltip v-if="auth_status==2" overlayClassName="mytooltip"  :title="`${$t('royalties.reason')}: ${record.auth_reject_reason || ''}`" >
              <label class="status" :class="[`status2`]">
                {{statusDist[auth_status]}}
                <img class="standard-icon"  src="@/assets/img/components/royalties/icon-reject.svg" alt="">
              </label>
            </a-tooltip>
            <label v-else  class="status" :class="[`status${auth_status}`]">
              {{statusDist[auth_status]}}
            </label>
          </span>
          <span slot="chain" slot-scope="chain">
            <label>
              {{chainTransform(chain)}}
            </label>
          </span>
          <span slot="action" slot-scope="text, record"> 
            <span v-if="record.role == 'manager' || record.role == 'admin'"> 
              <a v-if="record.auth_status==2" @click="()=>handleClickRemove(record)" class="Colorpurple">{{$t('royalties.delete')}}</a>
            </span>
          </span>
        </a-table>
      </div>  
      <div v-else class="empty-box"> 
        <div class="empty-icon">
          <img src="@/assets/img/components/royalties/icon-empty4.png" alt="">
        </div>
        <div class="empty-text3 text3">
         <!--   {{myLang.dataCenter.nodata}} -->
          <!-- 暂无记录 -->
          {{$t('royalties.nodata3')}}
        </div>
        <!-- <div class="empty-text2 text1">{{myLang.dataCenter.text1}}</div> -->
        <!-- <div class="empty-btn">
          <button  @click="handleClickAdd" class="route-btn">{{$t()}}</button>
          <button v-else  @click="connectWallet" class="route-btn">{{myLang.dataCenter.connect}}</button>
        </div>  -->
      </div>
    </div>

    <v-modal :open.sync="showModalConfirm">  
      <div class="modal-box modal-confirm"> 
        <div class="modal-content text1"> 
          {{$t('royalties.project.table.text1')}}
        </div>
        <div class="modal-option" flex="box:mean">
          <button class="modal-btn btn-cancle BG1 text1" @click="showModalConfirm=false">{{$t('royalties.cancel')}}</button>
          <button class="modal-btn btn-confirm BGpurple " @click="handleConfirmRemove">{{$t('royalties.confirm')}}</button>
        </div>
      </div>
    </v-modal> 

  </div>
</template>


<script>
import TopNav from '@/components/royalties/topNav.vue';
import VModal from '@/components/nft/VModal.vue';
// import { wallet } from '@/utils/wallet'
import mixin from '@/mixins/royalty.js'
import {Table,Tooltip} from 'ant-design-vue' 
import Vue from 'vue'
Vue.use(Table)
Vue.use(Tooltip)

export default {
  layout: 'nft/default',
  name: 'NftCert',
  components: { TopNav, VModal },
  data() {
    return {
      list: [],
      loading: true,
      showModalConfirm: false,
      selectedItem: null,
      columns: [
        {
          title: this.$t('royalties.cert.table.name'), //'合集名',
          dataIndex: 'name',
          key:'name',
          width: '15%',
        },
        {
          title: this.$t('royalties.cert.add.chain'), //'合约主链',
          dataIndex: 'chain',
          key:'chain',
          width: '15%',
          scopedSlots: {
            customRender: 'chain'
          },
        }, 
        {
          title:  this.$t('royalties.cert.table.contract'), //'合约地址',
          dataIndex: 'collection_contract',//
          key:'collection_contract',
          width: '30%',
        },
        {
          title: this.$t('royalties.cert.table.standard'), //'认证规格',
          dataIndex: 'auth_standard',
          key:'auth_standard',
          width: '20%',
          scopedSlots: {
            customRender: 'auth_standard'
          },
        },
        {
          title: this.$t('royalties.cert.table.status'), //'状态',
          dataIndex: 'auth_status',//认证状态：0审核中，1认证通过，2认证未通过，3未认证
          key:'auth_status', 
          width: '12%',
          scopedSlots: {
            customRender: 'auth_status'
          }
        },
        {
          title: this.$t('royalties.cert.table.action'), //'操作', 
          key:'action',
          width: '13%',
          align: 'right',
          scopedSlots: {
            customRender: 'action'
          }
        },
      ],
      statusDist: {
        0: this.$t('royalties.cert.table.statusDict.0'), //'审核中',
        1: this.$t('royalties.cert.table.statusDict.1'), //'认证通过',
        2: this.$t('royalties.cert.table.statusDict.2'), //'认证未通过',
        3: this.$t('royalties.cert.table.statusDict.3'), //'未认证'
      },
      standardDist: {
        1: this.$t('royalties.cert.table.standardDict.0'), //'正品认证',
        2: this.$t('royalties.cert.table.standardDict.1'), //'潮品认证'
      },
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
  mixins: [mixin],
  computed: { 
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
    chainTransform(chain) {
      if (chain=='bnb') {
        return 'BSC'
      } else if (chain=='eth') {
        return 'ETH'
      } else if (chain=='matic') {
        return 'Polygon'
      }
    },
    async getList() { 
      this.loading = true
      const {  address } = this.$store.state
      const params = {
        address,
        filter: 'auth',
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
      try {
        const {data, status} = await this.$api.royalties.getCollections(params) 
        this.loading = false
        if (status==0) {
          this.pagination.total = data.total
          this.list = data.list || []
        }  
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    handleClickAdd() {      
      this.$Ta.track( {
        name:"Add_Identification", 
      })

      const locale = this.$store.state.locale
      this.$router.push({
        path: `/${locale}/royalties/cert/add`, 
      })  
    },
    async handleClickRemove(item) { 
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
      const {token, signature, sign_address} = await this.getSignature() 

      if (token && signature) {
        const params = {
          chain: this.selectedItem.chain,
          contract: this.selectedItem.collection_contract,
          token, signature, sign_address
        }
        const res = await this.$api.royalties.removeCert(params)
        if (res.status==0) {
          this.showModalConfirm = false
          if (res.data.success) {
            this.$message.success(this.$t('royalties.delSuccess'))
            this.getList()
          } else {
            this.$message.error(this.$t('royalties.delFail'))
          }
        } else {
          this.$message.error(this.$t('royalties.delFail'))
        }
      }
    },
    pageChange(e) { 
      this.pagination.current = e
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
}

</script>

<style lang="less" scoped>
.royalties-cert-wrap { 
  .btn-add {
    padding: 10px 14px;
    border-radius: 8px;
    font-family: 'PingFang SC'; 
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  .list {
    .standard-icon {
      width: 14px;
      height: 14px;
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
      &.status3 {
        color: #FFB800;
        background-color: rgba(255, 184, 0, 0.1);
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
      .empty-text3{
        margin-top: 10px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
      }
      .route-btn {
        margin-top: 30px;
        width: 200px;
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
      padding:10px;
      border: 1px solid #F2F2F5;
      box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
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