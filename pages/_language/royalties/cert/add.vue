<template>
  <div class="royalties-cert-add-wrap">
    <div class="nav">
      <TopNav>
        <!-- <button class="btn-add Common_white BGpurple" @click="handleClickAdd">添加认证</button> -->
      </TopNav>
    </div> 
    <div class="form-wrap">
      <div class="create-order-top">
        <div class="title" flex="main:left">
          <!-- <div class="return lineBG2" flex="main:center cross:center" @click="$router.go(-1)">
            <img src="@/assets/img/components/nft/series/icon-arrow-return.svg" alt="">
          </div> -->
          <h2 class="text1">{{myLang.cert.addCert}}</h2> 
        </div>
      </div>  
      <div class="form-main">
        <div class="cert-box cert-left">
          <img src="@/assets/img/components/royalties/icon-cert-blue.svg" alt="">
          <h3 class="cert-title">{{myLang.cert.add.title}}</h3>
          <div class="cert-descript"> 
            {{myLang.cert.add.descript}}
          </div>
          <div class="active">
            <button  @click="handleClickOpen(1)" class="btn Common_white BGpurple">
             {{myLang.cert.add.confirm}}
            </button>
          </div>
        </div>
        <div class="cert-box cert-right">
          <img src="@/assets/img/components/royalties/icon-cert-pink.svg" alt="">
          <h3 class="cert-title">{{myLang.cert.add.title2}}</h3>
          <div class="cert-descript"> 
            {{myLang.cert.add.descript2}}
          </div>
          <div class="active">
            <button @click="handleClickOpen(2)" class="btn Common_white BGpurple">
              {{myLang.cert.add.confirm}}
            </button>
          </div>
        </div>
      </div>
      <v-modal :open.sync="showApplyModal">  
        <div class="modal-box modal-apply">
          <div class="title text1">
            <!-- {{ type==1 ? '正品认证申请' : '潮品认证申请'}} -->
            {{ type==1 ? myLang.cert.add.apply : myLang.cert.add.apply2}}
          </div>
          <div class="model-form">

            <div class="modal-field">
              <div class="text1">
                <label class="label">{{myLang.cert.add.chain}}</label>
              </div>
              <div class="modal-value">
                <a-select
                  ref="select"
                  class="myselect input text1 lineBG2"
                  v-model="chain"
                  style="width: 100%" 
                  size="large" 
                >
                  <a-select-option value="eth">ETH</a-select-option>
                  <a-select-option value="bnb">BSC</a-select-option> 
                  <a-select-option value="matic">Polygon</a-select-option>
                </a-select>
              </div>
            </div>
            <div class="modal-field">
              <div class="text1">
                <label class="label">{{myLang.cert.add.address}}</label>
              </div>
              <div class="modal-value">
                <input class="input  text1 lineBG2" v-model="contract" type="text">
              </div>
            </div>
            <!-- <label for="">合集名</label>
            <input type="text"> -->
          </div>
          <div class="model-submit">
            <button @click="submitApply" class="model-btn Common_white BGpurple">{{myLang.cert.add.confirm}}</button>
          </div>
        </div> 
      </v-modal>

      <v-modal :open.sync="showConfirmModal"> 
        <div class="modal-box modal-confirm">
          <div class="modal-icon BG1" flex="main:center cross:center">
            <img src="@/assets/img/components/royalties/icon-gou.svg" alt="">
          </div>
          <div class="modal-status text1">
            {{myLang.cert.add.success}}
          </div>
          <div class="modal-details text1"> 
            <!-- {{ type==1 ? '正品认证申请' : '潮品认证申请'}}提交成功，等待大约1个工作日 -->
            {{ type==1 ? myLang.cert.add.text1 : myLang.cert.add.text2}}
          </div>
          <div class="model-submit">
            <button @click="showConfirmModal=false" class="model-btn Common_white BGpurple">{{myLang.confirm}}</button>
          </div> 
        </div> 
      </v-modal>
    </div> 
  </div>
</template>

<script>
import TopNav from '@/components/royalties/topNav.vue';
import VModal from '@/components/nft/VModal.vue'
import { wallet } from '@/utils/wallet'
import mixin from '@/mixins/royalty.js'
export default { 
  layout: 'nft/default',
  name: 'NftCert',
  components: { TopNav,VModal },
  data() {
    return {
      list: [],
      type: 0,//type 1正品认证，2潮品认证
      address: '',//合约地址
      name: '', //合集名
      chain: '',
      contract: '',
      showApplyModal: false,
      showConfirmModal: false,
      countDown: {}
    }
  },
  mixins: [mixin],
  computed: { 
    myLang() {
      return this.$t('royalties')
    }
  },
  methods: {
    handleClickAdd() {

    },
    handleClickOpen(type) {
      //type 1正品认证，2潮品认证
      this.address = ''
      this.type = type
      this.showApplyModal = true

    }, 
    async submitApply() {
      // const { chainName, address } = wallet.getWalletInfo()
      if (this.countDown.Apply && this.countDown.Apply > new Date()) { 
        return
      } else {
        this.countDown.Apply = +new Date() + 5000
      }
      let {  address } =  this.$store.state  
      const {token, signature, sign_address} = await this.getSignature() 

      if (token && signature) {
        const params = {
          chain: this.chain,
          contract: this.contract.trim(),
          auth_standard: this.type,
          address,
          token, 
          signature,
          sign_address 
        }
        const {data, status} = await this.$api.royalties.createCert(params) 
        if (status == 0) {
          if (data.success == false ) {
            // if (data.msg == 'Permission denied') {
            //   this.$message.error('没有操作权限!')
            // } else if (data.msg == 'Not unauthenticated state') {
            //   this.$message.error('请先添加此合约到合集列表!')
            // } else {
            //   this.$message.error(data.msg)
            // }
            this.$message.error(this.$t('royalties.text4')) 
          } else {
            // this.$message.success('提交成功')
            // this.$message.success(this.$t('royalties.cert.add.success'))
            this.showApplyModal = false
            this.showConfirmModal = true
            this.chain='eth'
            this.contract = ''
          }
        } else { 
          // this.$message.error('提交失败');
            this.$message.error(this.$t('royalties.cert.add.fail'))
        }
      } 
    }
  }
}
</script>

<style lang="less" scoped>
.royalties-cert-add-wrap {
  .btn-add {
    padding: 11px 14px;
    border-radius: 8px;
    font-family: 'PingFang SC'; 
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  .form-wrap {
    max-width: 755px;
    margin: 0 auto;    
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
    .form-main {
      display: flex;
      gap: 20px;
      margin-top: 90px;
      .cert-box {
        padding: 30px 40px;
        border-radius: 8px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid transparent;
        &:hover {
          border-color: #F2F2F5;
        }
        .cert-title {
          margin-top: 32.2px;font-family: 'PingFang SC'; 
          font-weight: 600;
          font-size: 18px;
          line-height: 130%;
        }
        .cert-descript {
          margin-top: 10px;
          margin-bottom: 30px;
          font-family: 'PingFang SC'; 
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }

  .btn {
    min-width: 120px;
    height: 36px;
    border-radius: 8px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    line-height: 36px;
  }

  .modal-box {
    padding: 20px;
    .title { 
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 20px; 
    }
    .model-form {
      margin: 30px 0;
    }
    .modal-field {
      &:not(:first-child) {
        margin-top:20px;
      }
      .modal-value {
        position: relative;
        margin-top: 8px;
        i {
          position: absolute;
          top: 15px;
          right: 10px;
          font-size: 14px;
          font-style: normal;
        }
      }
    }
    .label {
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
    .input {
      // margin-top: 8px;
      width: 380px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      border: 1px solid;
    }
    .indent {
      text-indent: 10px;
    }
    .model-btn {
      padding: 13px 0;
      width: 380px;
      font-family: 'PingFang SC'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      border-radius: 8px;
    }
    .modal-icon {
      margin: 50px auto 20px;
      height: 56px;
      width: 56px;
      border-radius: 50%;
    }
    .modal-status {
      font-family: 'PingFang SC'; 
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
    }
    .modal-details {
      margin-top: 4px;
      margin-bottom: 66px;
      font-family: 'PingFang SC'; 
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }

    .myselect { 
      border-radius: 4px; 
      /deep/.ant-select-selection {
        border-color: #F2F2F5;
      }
    }
  }

}
</style>