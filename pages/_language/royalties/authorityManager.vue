<template>
  <div class="royalties-cert-wrap">
    <div class="nav">
      <TopNav>
        <div v-if="WalletID">
          <a-select @change="handleChangeCantract" v-model="selectItem" class="myselect topselect" style="width: 140px"> 
            <a-select-option value="0">{{myLang.manager.allProject}}</a-select-option>
            <a-select-option v-for="item in projectList" :key='item.id' :value="item.collection_contract">{{item.name}}</a-select-option> 
          </a-select>
          <button class="btn-add Common_white BGpurple" @click="handleClickAdd">{{myLang.manager.modal.title}}</button>
        </div>
      </TopNav>
    </div>
    <div class="list" > 
      <div v-if="list.length > 0 || loading">
        <a-table 
          :locale="{emptyText:' '}"
          :loading="loading" 
          class="my-table royalty-table " 
          :columns="columns" 
          :data-source="list" 
          :pagination="pagination"> 
          <span slot="role" slot-scope="role">
            <label class="text2"> 
              {{myLang.manager.statusDict[role]}}
            </label>
          </span>
          <span slot="chain" slot-scope="chain">
            <label>
              {{chainTransform(chain)}}
            </label>
          </span>
          <span slot="address" :title="address" slot-scope="address"> 
              {{sx(address)}} 
          </span>
          <span slot="contract" :title="contract" slot-scope="contract"> 
              {{sx(contract)}} 
          </span>
          <span slot="action" slot-scope="text, record">
            <span v-if="record.role!='admin'">
              <a @click="()=>handleClickEdit(record)" class="Colorpurple  table-btn">{{myLang.edit}}</a>
              <a @click="()=>handleClickRemove(record)" class="Colorpurple table-btn">{{myLang.delete}}</a>
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
      </div>
    </div>
    <v-modal :open.sync="showAddModal">  
      <div class="modal-box modal-apply">
        <div class="title text1">
          <!-- {{modalType == 'add' ? '添加地址' : '编辑权限'}} -->
          {{modalType == 'add' ? myLang.manager.modal.title :  myLang.manager.modal.title2}}
        </div>
        <div class="modal-form">
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{ myLang.manager.chain}}</label>
            </div>
            <div  class="modal-value"> 
               <a-select
                ref="select"
                class="myselect text1"
                v-model="chain"
                style="width: 100%" 
                size="large"> 
                <a-select-option value="eth">ETH</a-select-option>
                <a-select-option value="bnb">BSC</a-select-option> 
                <a-select-option value="matic">Polygon</a-select-option>
              </a-select>
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{myLang.manager.contract}}</label>
            </div>
            <div  class="modal-value">
              <input class="input text1 lineBG2" v-model="contract" type="text">
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{myLang.manager.address}}</label>
            </div>
            <div  class="modal-value">
              <input class="input text1 lineBG2" v-model="address" type="text">
            </div> 
          </div>
          <div class="modal-field">
            <div class="text1">
              <label class="label">{{myLang.manager.modal.range}}</label>
            </div>
            <div class="modal-value"> 
              <a-checkbox @change="handleChange($event, 'user')" v-model:checked="checkeda">{{myLang.manager.modal.role1}}</a-checkbox>
              <a-checkbox @change="handleChange($event, 'manager')" v-model:checked="checkedb">{{myLang.manager.modal.role2}}</a-checkbox>
            </div> 
          </div>
          
        </div>
        <div class="model-submit">
          <button @click="submitApply" class="modal-btn Common_white BGpurple">{{myLang.confirm}}</button>
        </div>
      </div> 
    </v-modal>

    <v-modal :open.sync="showModalConfirm">  
      <div class="modal-box modal-confirm"> 
        <div class="modal-content text1"> 
          {{$t('royalties.text1')}}
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
import {Table, Checkbox, Select, DatePicker} from 'ant-design-vue'  
import Vue from 'vue'
Vue.use(Table)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(DatePicker)
export default {
  layout: 'nft/default',
  name: 'NftCert',
  components: { TopNav, VModal },
  mixins: [mixin],
  data() {
    return {
      list: [],
      showAddModal: false,
      showModalConfirm: false,
      selectedItem: null,
      loading: true,
      columns: [ 
        {
          title: this.$t('royalties.manager.name') ,// '合集名',
          dataIndex: 'collection_name',//
          key:'collection_name',
          width: '17.5%'
        },
        {
          title: this.$t('royalties.manager.chain') ,// '合集名',
          dataIndex: 'chain',//
          key:'chain',
          width: '10%',
          scopedSlots: {
            customRender: 'chain'
          }
        },
        {
          title: this.$t('royalties.manager.contract') ,//'合约地址',
          dataIndex: 'contract',//
          key:'contract',
          width: '25%',
          scopedSlots: {
            customRender: 'contract'
          }
        },
        {
          title: this.$t('royalties.manager.address') ,//'钱包地址',
          dataIndex: 'address',//
          key:'address',
          width: '25%' ,
          scopedSlots: {
            customRender: 'address'
          }
        },
        {
          title: this.$t('royalties.manager.role') ,//'权限',
          dataIndex: 'role',
          key:'role',
          align: 'right',
          width: '11.5%',
          scopedSlots: {
            customRender: 'role'
          }
        }, 
        {
          title: this.$t('royalties.manager.action') ,//'操作', 
          key:'action',
          align: 'right',
          width: '15%' ,
          scopedSlots: {
            customRender: 'action'
          }
        },
      ], 
      address: '',
      contract: '',
      chain: '',
      type: '',
      checkeda: true,
      checkedb: false,
      modalType: 'add',
      selectItem: '0',
      projectList: [], 
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
      this.getAllProjectList()
    },
  },
  methods: {
    sx(address) {
      if (address.length > 16) {
        return address.substr(0, 4) + '......' + address.substr(address.length-12)
      } else {
        return address
      }
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
    async getList() {
      this.loading = true
      let { address } =  this.$store.state 
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bsc'
      // } else if (chainId == '0x89') {
      //   chainName='polygon'
      // }   
      const params = {
        // chain: chainName,
        address, 
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
      if (this.selectItem!='0') {
        params.contract = this.selectItem
      }
      try {
        const {data, status} = await this.$api.royalties.getAuthorities(params)
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

      // let { chainId, address, chainName } =  this.$store.state 
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bsc'
      // } else if (chainId == '0x89') {
      //   chainName='polygon'
      // }   
      this.modalType = 'add' 
      this.chain = ''
      this.address = '';
      this.contract = ''
      this.checkeda = true
      this.checkedb = false
      this.showAddModal = true
    },
    handleClickEdit(item) {
      this.modalType = 'edit'
      this.chain = item.chain
      this.address = item.address;
      this.contract = item.contract
      this.checkeda = item.role == 'user'
      this.checkedb = item.role == 'manager'
      this.showAddModal = true 

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
          contract: this.selectedItem.contract,
          address: this.selectedItem.address,
          token, signature, sign_address
        }
        const res = await this.$api.royalties.removeAuthority(params)
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
    async submitApply() {
      if (this.countDown.Apply && this.countDown.Apply > new Date()) {
        // this.$message.error('ApplyApplyApplyApplyApplyApplyApply')
        return
      } else {
        this.countDown.Apply = +new Date() + 5000
      }

      const {token, signature, sign_address} = await this.getSignature() 

      if (token && signature) {
        const params = {
          chain: this.chain,
          address: this.address.trim(),
          contract: this.contract.trim(),
          role: this.checkeda ? 'user' : 'manager',
          token, signature, sign_address
        }
        if (this.modalType=='add') { 
          const res = await this.$api.royalties.createAuthority(params)
          if (res.status == 0) {
            // this.$message.success('添加成功') 
            if (res.data.success == false ) {
              // if (res.data.msg == 'Permission denied') {
              //   this.$message.error('没有操作权限!')
              // } else if (res.data.msg == 'Not unauthenticated state') {
              //   this.$message.error('请先添加此合约到合集列表!')
              // } else {
              //   this.$message.error(res.data.msg)
              // } 
              this.$message.success(this.$t('royalties.text5'))
              // this.$message.error(res.data.msg)
            } else {
              this.$message.success(this.$t('royalties.addSuccess'))
              this.showAddModal = false 
              this.getList() 
            }
          } else {
            // this.$message.error('添加失败')
          this.$message.error(this.$t('royalties.addFail'))
          } 
        } else {
          const res = await this.$api.royalties.updateAuthority(params)
          if (res.status == 0) { 
            if (res.data.success == false ) {
              // if (data.msg == 'Permission denied') {
              //   this.$message.error('没有操作权限!')
              // } else if (data.msg == 'Not unauthenticated state') {
              //   this.$message.error('请先添加此合约到合集列表!')
              // } else {
              //   this.$message.error(data.msg)
              // } 
              this.$message.error(this.$t('royalties.editFail'))
            } else {
              this.$message.success(this.$t('royalties.editSuccess'))
              this.showAddModal = false 
              this.getList() 
            }
          } else {
            // this.$message.error('修改失败')
          this.$message.error(this.$t('royalties.editFail'))
          } 

        }
      }
    },
    handleChange(a, item) { 
      if(item=='user') {
        this.checkedb=false
        this.checkeda=true
      } else {
        this.checkeda=false
        this.checkedb=true 
      }
    },
    async getAllProjectList() {
      const { address } = this.$store.state
      const params = {
        address,
        page: 1,
        limit: 1000
      }
      const {data, status} = await this.$api.royalties.getCollections(params)
      if (status == 0) {
        this.projectList = data.list || []

        console.log(this.projectList)
      }
    },
    handleChangeCantract(e) { 
      this.getList() 
    },
    pageChange(e) { 
      this.pagination.current = e
      this.getList()
    }
  },
  mounted() {
    this.getList() 
    this.getAllProjectList()
  },
  created() {
  },
}

</script>

<style lang="less" scoped>
.royalties-cert-wrap { 
  .btn-add {
    padding: 10px 14px;
    margin-left: 15px;
    border-radius: 8px;
    font-family: 'PingFang SC'; 
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  .list {
    // max-width: 884px;
    // margin: 0 auto;
    .table-btn {
      margin-left: 20px;
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
      .empty-text3 {
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

  .my-table {
    font-size: 14px;
    /deep/.ant-table-thead > tr > th, 
    /deep/.ant-table-tbody > tr > td {
      padding: 16px 0;
      background-color: #fff;

    }
  }  

  .topselect {
    height: 36px;
    line-height: 36px;
    /deep/.ant-select-selection {
      border-radius: 8px; 
      height: 36px;
      .ant-select-selection__rendered {
        line-height: 36px;
      } 
    }
    /deep/.ant-select-lg {
      height: 36px;
    }
  }

  .modal-box {
    padding: 20px;
    .title { 
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 20px; 
    }
    .modal-form {
      margin: 30px 0 50px;
    }
    .modal-field {
      &:not(:first-child) {
        margin-top:20px;
      }
      .modal-value {
        margin-top: 8px;
      }
    }
    .label {
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
    .input { 
      width: 380px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      border: 1px solid;
      text-indent: 10px;
    }
    .modal-btn {
      padding: 13px 0;
      width: 380px;
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      border-radius: 8px;
    }
    .ant-checkbox-wrapper {
      /deep/ .ant-checkbox-inner {
        border-radius: 50%;
      }
      /deep/ .ant-checkbox-checked::after {
        border-radius: 50%;
      }
    }
   
  }

}
</style>