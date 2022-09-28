<template> 
  <div class="royalties-project-edit-wrap">
    <div class="nav">
      <TopNav>
        <!-- <button class="btn-add Common_white BGpurple" @click="handleClickAdd">添加合集</button> -->
      </TopNav> 
      <div class="form-wrap">
        <div class="create-order-top">
          <div class="title" flex="main:left">
            <!-- <div class="return lineBG2" flex="main:center cross:center" @click="$router.go(-1)">
              <img src="@/assets/img/components/nft/series/icon-arrow-return.svg" alt="">
            </div> -->
            <h2 class="text1">{{title}}</h2> 
          </div>
        </div> 
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item >  
              <div class="ant-col my-form-item-label text1">
                <label class="ant-form-item-required">{{myLang.project.edit.chain}}</label> 
              </div>
              <div class=" my-form-item-label">
                <a-checkbox :disabled="action=='edit'" @change="handleChange($event, 'bnb')" :checked="checkedbsc">BSC</a-checkbox>
                <a-checkbox :disabled="action=='edit'" @change="handleChange($event, 'eth')" :checked="checkedeth">ETH</a-checkbox>
                <a-checkbox :disabled="action=='edit'" @change="handleChange($event, 'matic')" :checked="checkedpoly">Polygon</a-checkbox>
              </div>
          </a-form-item>
          <a-form-item >
            <div class="ant-col my-form-item-label text1">
              <label class="ant-form-item-required ">{{myLang.project.edit.name}}</label> 
            </div>
            <a-input
              :maxLength="50"
              v-decorator="[
                'collection_name',
                { rules: [{ required: true, message: myLang.project.edit.text1 }] },
              ]"
              :placeholder="myLang.project.edit.text1 "
            />
          </a-form-item>
          <a-form-item  name="collection_contract">
            <div class="ant-col my-form-item-label ant-form-contract text1">
              <label class="ant-form-item-required">{{myLang.project.edit.contract}}</label> 
              <span class="my-sub-label text3"> {{myLang.project.edit.text10}} <label @click="handleSelectStandard('721')" class="pointer text5">ERC721</label> {{myLang.project.edit.text11}} <label  @click="handleSelectStandard('1155')"  class="text5 pointer">ERC1155</label>  {{myLang.project.edit.text12}}</span>
            </div>
            <a-input
              :maxLength="80"
              :disabled="action=='edit'"
              @change="handleOnValueChange" 
              ref="contract_input"
              validate-status="error"
              v-decorator="[
                'collection_contract',
                { rules: [
                  { required: true, message: myLang.project.edit.text2},
                  { validator: (rule, value, callback) => handleCheckAddress(rule, value, callback)},
                ] },
              ]"
              :placeholder="myLang.project.edit.text2"
            />
            <div> 
              <button v-if="!contractText"  type="button" class="btn-check-address btn-default BG2 text4">{{myLang.project.edit.text3}}</button>
              <button v-else-if="checkStatus==0 && checkLoading==false"  type="button" @click="handleClickCheckAddress" class="btn-check-address btn-loading">{{myLang.project.edit.text3}}</button>
              <button  v-else-if="(checkStatus==0 && checkLoading==true)"  type="button" @click="handleClickCheckAddress" class="btn-check-address btn-loading">
                <img src="@/assets/img/components/royalties/icon-btn-loading.png" alt="">{{myLang.project.edit.text4}}
              </button>
              <button  v-else-if="checkStatus==1" type="button" @click="handleClickCheckAddress" class="btn-check-address btn-yes">
                <img src="@/assets/img/components/royalties/icon-btn-yes.svg" alt="">{{myLang.project.edit.text5}}
              </button> 
              <button  v-else-if="checkStatus==2" type="button" @click="handleClickCheckAddress" class="btn-check-address btn-no">
                <img src="@/assets/img/components/royalties/icon-btn-no.svg" alt="">{{myLang.project.edit.text6}}
              </button>
              <span class="check-tag text3" :class="{noCheck: noCheck}">{{myLang.project.edit.text7}}</span>
            </div>
          </a-form-item> 
          <a-form-item> 
            <div class="ant-col my-form-item-label my-form-img-label text1">
              <label class="ant-form-item-required">{{myLang.project.edit.projectImg}}</label> 
            </div>
            <div class="ant-col my-form-img-sub-label text1">
              <label class="ant-form-sub-required">{{myLang.project.edit.text8}}</label> 
            </div>
            <a-upload
                v-decorator="[
                  'profile_picture',
                {
                  rules: [{ 
                    required: true, 
                    message: myLang.project.edit.text9
                  }]
                },
              ]" 
              accept="image/jpeg,image/png,image/gif"
              action= '/inoApi/file/uploadImage'
              name="file"
              :show-upload-list="false"
              list-type="picture-card"
              :before-upload="beforeUpload"
              @change='handleChangeHeaderImg' 
            >
              <div class="uploadImg" v-if="handerImageUrl" flex="main:center cross:center">
                <img :src="handerImageUrl" alt="head portrait" />
              </div>
              <div v-else>
                <span v-if="loading2">
                  <a-icon type="loading" />
                </span>
                <span v-else>
                  <img src="@/assets/img/components/royalties/icon-upload.svg" alt="">
                </span> 
                <div class="ant-upload-text"> 
                </div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item> 
            <div class="ant-col my-form-item-label text1">
              <label for="" class="ant-form-item-required">{{myLang.project.edit.token}}</label>
              <!-- <span class="my-sub-label text3">(请确保您的项目遵守 <label @click="handleSelectStandard('721')" class="pointer text5">ERC721</label> 或 <label  @click="handleSelectStandard('1155')"  class="text5 pointer">ERC1155</label>  协议的最新实现，以便合集收录后可以查看到全部数据)</span> -->
              
            </div>
            <a-select
              accept="image/jpeg,image/png,image/gif"
              class="my-form-select"
              v-decorator="[
                'standard',
                { rules: [{ required: true, message: myLang.project.edit.text17 }] },
              ]"
              placeholder="" 
            >
              <a-select-option value="721">
                ERC721
              </a-select-option>
              <a-select-option value="1155">
                ERC1155
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item >
            <div class="ant-col my-form-item-label text1">
              <label  class="ant-form-item-required">{{myLang.project.edit.amount}}</label> 
            </div>
            <a-input-number
              :min="0"
              v-decorator="[
                'nft_number',
                { rules: [{ required: true, message: myLang.project.edit.amount }] },
              ]"
              :placeholder="myLang.project.edit.amount"
            /> 
          </a-form-item> 
          <a-form-item > 
            <div class="ant-col my-form-item-label my-form-img-label text1">
              <label class="ant-form-item-required">{{myLang.project.edit.projectImg2}}</label> 
            </div>
            <div class="ant-col my-form-img-sub-label text1">
              <label class="ant-form-sub-required">{{myLang.project.edit.text18}}</label> 
            </div>
            <a-upload
              v-decorator="[
                'background_picture',
                {
                  rules: [{ required: true, message: myLang.project.edit.text13 }]
                },
              ]"
              accept="image/jpeg,image/png,image/gif"
              class="upload-lg"
              action= '/inoApi/file/uploadImage'
              name="file"
              :show-upload-list="false"
              list-type="picture-card"
              :before-upload="beforeUpload"
              @change='handleChangeBgImg' 
            >
              <div class="uploadImg" v-if="bgImageUrl" flex="main:center cross:center">
                <img :src="bgImageUrl" alt="background picture" />
              </div>
              <div v-else>
                <span v-if="loading2">
                  <a-icon type="loading" />
                </span>
                <span v-else>
                  <img src="@/assets/img/components/royalties/icon-upload.svg" alt="">
                </span> 
                <div class="ant-upload-text"> 
                </div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item>
            <div class="ant-col my-form-item-label text1">
              <label  class="ant-form-item-required">{{myLang.project.edit.introduce}}</label> 
            </div>
            <a-input 
              :maxLength="500"
              v-decorator="[
                'description',
                { rules: [{ required: true, message: myLang.project.edit.introduce }] },
              ]"
              :placeholder="myLang.project.edit.introduce"
            /> 
          </a-form-item>
          <!-- <a-form-item :label="myLang.project.edit.other">
          </a-form-item> -->
          <div></div>
          <a-row>
            <a-col :span="12">
              <div class="sub-title">
                <label class="text1">{{myLang.project.edit.other}}</label>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item>
                <div class="ant-col my-form-item-label text1">
                  <label class="ant-form-item-required">{{myLang.project.edit.email}}</label> 
                </div>
                <a-input  
                  :maxLength="50"
                  v-decorator="[ 
                    'email',
                    { 
                      rules: [
                        { required: true, message: myLang.project.edit.text14 },
                        { type: 'email', message: myLang.project.edit.text16 },
                      ] 
                    },
                  ]" /> 
              </a-form-item>
            </a-col> 
            <a-col :span="12">
              <a-form-item >
                <div class="ant-col my-form-item-label text1">
                  <label >Twitter</label> 
                </div>
                <a-input 
                  :maxLength="50" v-decorator="[ 'twitter']" /> 
              </a-form-item> 
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item>
                <div class="ant-col my-form-item-label text1">
                  <label >Telegram</label> 
                </div>
                <a-input :maxLength="50" v-decorator="[ 'telegram']" /> 
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item >
                <div class="ant-col my-form-item-label text1">
                  <label >Discord</label> 
                </div>
                <a-input v-decorator="[ 'discord']" /> 
              </a-form-item> 
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item >
                <div class="ant-col my-form-item-label text1">
                  <label >Facebook</label> 
                </div>
                <a-input :maxLength="50" v-decorator="[ 'facebook']" /> 
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item>
                <div class="ant-col my-form-item-label text1">
                  <label>Instagram</label> 
                </div>
                <a-input :maxLength="50" v-decorator="[ 
                  'instagram'
                ]" /> 
              </a-form-item> 
            </a-col>
          </a-row>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item>
                <div class="ant-col my-form-item-label text1">
                  <label >{{myLang.project.edit.website}}</label> 
                </div>
                <a-input :maxLength="50" v-decorator="[ 'official_website']" /> 
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item> 
            <button class="btn  Common_white BGpurple" type="submit">{{myLang.project.edit.submit}}</button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    
    <v-modal :open.sync="showModalToken">  
      <div class="modal-box modal-apply">
        <div class="modal-title text1">{{modalTitle}}</div>
        <div class="modal-content text2">
          {{modalContent}}
        </div>
      </div>
    </v-modal> 
  </div>
</template>

<script>
import TopNav from '@/components/royalties/topNav.vue';
import { wallet } from '@/utils/wallet'
import { scrollIntoView } from '@/utils/public'
import mixin from '@/mixins/royalty.js'
import {Form, Checkbox, Input, Upload, Row, Col, Icon, InputNumber, Select} from 'ant-design-vue' 
import VModal from '@/components/nft/VModal.vue';
import Vue from 'vue'
Vue.use(Form) 
// Vue.use(Form.Item)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(InputNumber)
Vue.use(Select)

export default {
  layout: 'nft/default',
  name: 'NftPorjectEdit',
  components: { TopNav, VModal },
  mixins: [mixin],
  data() {
    return { 
      form: this.$form.createForm(this, { name: 'coordinated', onValuesChangeL: (props, value)=> {
        console.log(props, value)
      }}),
      title: this.$t('royalties.project.edit.title'),// '添加集合',
      fileList: [],
      fileList2: [], 
      checkedbsc: true,
      checkedeth: false,
      checkedpoly: false,
      action: 'add',
      project: null,
      loading: false,
      loading2: false,
      handerImageUrl: '',
      bgImageUrl: '',
      checkLoading: false,
      checkStatus: 0,
      contractText:'',
      showModalToken: false,
      modalTitle: '',
      modalContent: '',
      validateStatus: false,
      noCheck: false,
      countDown: {}
    }
  },
  computed: { 
    myLang() {
      return this.$t('royalties')
    }
  },
  methods: {  
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!'); 
      }
      const isLt100M = file.size / 1024 / 1024 < 1;
      if (!isLt100M) {
        this.$message.error('Image must smaller than 1MB!'); 
      } 
      return isJpgOrPng && isLt100M;
    },
    handleChangeHeaderImg(e) { 
      this.loading = true; 
      if(e.file.response && e.file.status == 'done'){
        // console.log(e.file)
        // this.handerImageUrl = 'http://cdn.bitkeep.vip/'+ e.file.response;
        this.handerImageUrl = e.file.response.data.url
        this.form.setFieldsValue({
          profile_picture: this.handerImageUrl
        })
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    handleChangeBgImg(e) {
      this.loading2 = true; 
      if(e.file.response && e.file.status == 'done'){
        // this.bgImageUrl = 'http://cdn.bitkeep.vip/'+ e.file.response;
        this.bgImageUrl = e.file.response.data.url
        this.form.setFieldsValue({
          background_picture: this.bgImageUrl
        })
        this.loading2 = false;
      }else {
        this.loading2 = false;
      }
    },  
    normFile(e) { 
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    async handleSubmit(e) {
      e.preventDefault(); 
      if (this.action=='add'&&this.checkStatus!=1) {
        this.$message.warning( this.$t('royalties.project.edit.text15'))
        let timer = setInterval(() => { 
          scrollIntoView(document.querySelector('.ant-form-contract'));
          clearInterval(timer); 
      }, 300)
        return 
      }
      if (this.countDown.Submit && this.countDown.Submit > new Date()) { 
        return
      } else {
        this.countDown.Submit = +new Date() + 5000
      }
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const  {token, signature, sign_address } = await this.getSignature()
          if (!token || !signature) return
          // console.log('Received values of form: ', values); 
          let chain = ''
          if (this.checkedbsc) chain='bnb'
          else if (this.checkedeth) chain='eth'
          else if (this.checkedpoly) chain='matic'
          // const walletid = this.$store.state.WalletID 
          const {  address } = this.$store.state
          const params = {
            chain,//this.form.chain[0],
            address,
            name: values.collection_name,
            description: values.description,
            standard: values.standard,
            collection_contract:  values.collection_contract.trim(),
            collection_name: values.collection_name,
            nft_number: values.nft_number,
            profile_picture: this.handerImageUrl, //values.profile_picture || 'test',
            background_picture: this.bgImageUrl,//values.background_picture || 'test',
            email: values.email,
            official_website: values.official_website,
            twitter: values.twitter,
            facebook: values.facebook,
            telegram: values.telegram,
            instagram: values.instagram,
            discord: values.discord,
            token, 
            signature,
            sign_address
          } 
          if (this.action == 'add') {
            const res = await this.$api.royalties.createProject(params) 
            if (res.status == 0) {
              if (res.data.success == false ) {
                this.$message.error(data.msg)
              } else { 
                const locale = this.$store.state.locale
                this.$router.push({
                  path: `/${locale}/royalties/project`, 
                })   
              }
            } else {
                this.$message.error(res.data || res.data.msg || 'error')
            }
          } else {
            const res = await this.$api.royalties.updateProject(params) 
            if (res.status == 0) {
              if (res.data.success == false ) {
                this.$message.error(data.msg)
              } else {
                const locale = this.$store.state.locale
                this.$router.push({
                  path: `/${locale}/royalties/project`, 
                })   
              } 
            } else {
                this.$message.error(res.data || res.data.msg || 'error')
            }
          }
        } else {
          // console.log({err}) 
          // console.log(1,err?.background_picture)
          // console.log(2,err?.background_picture?.errors)
          this.handleGetError()
          // if (err?.background_picture?.errors) {
          //   this.$message.warning('请上传背景图片');
          // } else if (err?.collection_contract?.errors) {

          // } else if (err?.collection_name?.errors) {
          //   this.$message.warning('请填写合集名！'); 
          // }  else if (err?.description?.errors) {
          //   this.$message.warning('请填写合集介绍！'); 
          // } else if (err?.email?.errors) {
          //   this.$message.warning('请填写联系邮箱'); 
          // } else if (err?.nft_number?.errors) {
          //   this.$message.warning('请填写发行数量！'); 
          // } else if (err?.profile_picture?.errors) {
          //   this.$message.warning('请上传头像图片！'); 
          // } else if (err?.standard?.errors) {
          //   this.$message.warning('请选择Token标准！'); 
          // }

          // this.$message.warning(err?.message)
        }
      }); 
      // console.log('submit')
    },
    handleGetError() {
      let timer = setInterval(() => {
        if (document.querySelector('.ant-form-explain')) {
          scrollIntoView(document.querySelector('.ant-form-explain'));
          clearInterval(timer); 
        }
      }, 300)
    },
    handleChange(event, item) { 
      if(item=='bnb') {
        this.checkedbsc=true
        this.checkedeth=false
        this.checkedpoly = false
      } else if (item=='eth') {
        this.checkedbsc=false
        this.checkedeth=true
        this.checkedpoly = false
      } else if (item=='matic') {
        this.checkedbsc=false
        this.checkedeth=false
        this.checkedpoly = true 
      }
    },
    handleSelectStandard(item) {
      console.log({item})
      if (item.toString() == '721') {
        this.modalTitle = 'ERC-721'
        // this.modalContent = 'ERC-721是一个免费、开放的标准，描述了如何在以太坊区块链上构建不可替代或唯一的代币。虽然大多数代币是可替代的（每个代币都与其他代币相同），但ERC-721代币都是唯一的。ERC-721定义了智能合约必须实现的最小接口，以允许管理、拥有和交易唯一的代币。它没有强制要求代币元数据标准，也没有限制添加补充功能。 '
        this.modalContent= this.$t('royalties.project.edit.erc721') 
      } else {
         this.modalTitle = 'ERC-1155'
        // this.modalContent = `ERC-1155是一种代币标准，可在单个交易中有效传输可替代和不可替代代币。 
        //   它支持无限数量的代币，与ERC-20和ERC-721形成鲜明对比，ERC-20和ERC-721需要为每种类型的代币制定新的智能合约。它不仅支持可替代和不可替代的代币，还支持半可替代的代币。它消除了单独“批准”单个代币合约的需要，这意味着签署更少的交易`
         this.modalContent= this.$t('royalties.project.edit.erc1155')
      }
      this.showModalToken = true
    },
    async getProjectDetail() {
      const {chain, contract} = this.$route.query
      // console.log('getProjectDetail', chain, contract)
      if (chain && contract) {
        const params = {
          chain,
          contract
        }
        const {data, status} = await this.$api.royalties.getCollectionDetail(params) 
        if (status == 0 ) {
          this.project = data
          this.action = 'edit' 
          this.form.setFieldsValue({
            address: data.address,
            name: data.name,
            description: data.description,
            standard: data.standard,
            collection_contract:  data.collection_contract,
            collection_name: data.collection_name,
            nft_number: data.nft_number,
            profile_picture: data.profile_picture,
            background_picture:  data.background_picture,
            email: data.email,
            official_website: data.official_website,
            twitter: data.twitter,
            facebook: data.facebook,
            telegram: data.telegram,
            instagram: data.instagram,
            discord: data.discord,
          })
          this.handerImageUrl = data.profile_picture
          this.bgImageUrl = data.background_picture 
          this.contractText = data.collection_contract
          

          this.checkedbsc = data.chain=='bnb'
          this.checkedeth = data.chain=='eth'
          this.checkedpoly = data.chain=='matic'
        }
      }
    },
    handleCheckAddress(rule, value, callback) { 
      if (this.action=='edit') {
        callback()
        return true
      }
      if(this.checkStatus!=1) {
        console.log('his.checkStatus',this.checkStatus)
        callback(' ')
        return false
      } 
      callback()
    },
    async handleClickCheckAddress() {      
      this.$refs.contract_input.focus() //  cootract_input
      try {
        this.checkLoading = true 
        this.noCheck = false
        const {address} = this.$store.state
        const res = await this.$api.royalties.getToken({address}) 
        if (res.status != 0) return
        let chain = ''
        if (this.checkedbsc) chain='bnb'
        else if (this.checkedeth) chain='eth'
        else if (this.checkedpoly) chain='matic'
        const contract = this.form.getFieldValue('collection_contract')
        const token = res.data.token
        const signature = await wallet.CheckSign(token, address)
        const params = {
          chain,
          contract,
          token,
          address,
          signature
        }
        const {data, status} = await this.$api.royalties.verifyCollectionAddress(params) 
        if (status == 0) {
          if (data.verify==true) {
            this.checkStatus = 1
          } else {
            this.checkStatus = 2
          } 
          this.form.validateFields(['collection_contract'])
        } 
      } catch (error) {
        console.error(error) 
        this.checkLoading = false
      }
    },
    handleOnValueChange(props) {  
      this.checkStatus = 0
      this.checkLoading = false
      this.contractText = props.target.value
      if (this.contractText) { 
        this.noCheck = true
      } else {
        this.noCheck = false
      }
      // console.log(this.contractText )
    }
  }, 
  created() { 
    const { contract} = this.$route.query
    if (contract) {
      this.title =  this.$t('royalties.project.edit.title2') //'修改集合'
    }
    this.getProjectDetail()
  }
}

</script>


<style lang="less" scoped>
.royalties-project-edit-wrap {
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
    margin: 25px auto;
    .sub-title {
      margin-top: 10px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .create-order-top {
      .title {
        position: relative;
        margin-bottom: 20px;
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
      padding: 10px 14px;
      height: 48px;
      width: 172px;
      box-sizing: border-box;
      border-radius: 8px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-align: center; 
    }
    .btn-check-address {
      padding: 6px 14px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      border-radius: 4px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
      &.btn-default { 
      } 
      &.btn-loading {
        color: #7524F9;
        background-color:  rgba(117, 36, 249, 0.1);
        img {
          animation: loadingCircle 1s linear infinite;
        }
      }
      &.btn-yes {
        color: #1CBDB5;
        background-color:  rgba(27, 200, 158, 0.1);;
      }
      &.btn-no {
        color: #F36464;
        background-color:  rgba(243, 100, 100, 0.1);
      }
    }
    .my-sub-label {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
    }
    .check-tag {
      margin-left: 10px;
      font-family: 'PingFang SC'; 
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      &.noCheck {
        color: #F36464;
      }
    } 
    .ant-upload-picture-card-wrapper {
      &.upload-lg {
        /deep/ .ant-upload {
          width: 100%; 
          .uploadImg {
            width: 100%; 
          }
        }
      }
      /deep/ .ant-upload {
        border: 1px solid #F2F2F5;  
        margin: 0;
        padding: 0;
        .uploadImg {
          height: 120px;
          width: 120px;
          overflow: hidden;
        }
      } 
    }
    .ant-checkbox-wrapper {
      /deep/ .ant-checkbox-inner {
        border-radius: 50%;
      }
      /deep/ .ant-checkbox-checked::after {
        border-radius: 50%;
      }
    }
    .ant-input-number {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #0e0e0e;
      border-color: #F2F2F5;
    }
    .ant-input {
      height: 40px;
      line-height: 40px;
      color: #0e0e0e;
      border-color: #F2F2F5;
    }
 
    .my-form-select {
      height: 40px;
      line-height: 40px;
      border-radius: 4px; 
      /deep/.ant-select-selection {
        height: 40px;
        border-color: #F2F2F5;
        .ant-select-selection__rendered {
          line-height: 40px;
        }

      }
      /deep/.ant-select-lg {
        height: 40px;
      }
    }

    .my-form-item-label {
      line-height: 20px;
      margin-bottom:8px;
      font-weight: bold;
      &.my-form-img-label {
        margin-bottom: 0px;
      }
    } 
    .my-form-img-sub-label {
      margin-bottom: 8px;
      font-size: 12px;
      line-height: 130%;
      label {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 130%;
        color: #919899;
      }
    }
    .ant-checkbox-wrapper {
      height: 20px;
      line-height: 20px;
      font-weight: 500;
      color: #0e0e0e;
      font-family: 'PingFang SC';
    }

  }
  .modal-box {
    width: 420px;
    min-height: 216px;
    box-sizing: border-box;
    padding: 30px 20px 10px;
    .modal-title {
      font-family: 'PingFang HK'; 
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    .modal-content {
      margin-top: 20px;
    }
  }

  /deep/ .ant-input-number-handler-wrap {
    display: none!important;
  }
}
</style>