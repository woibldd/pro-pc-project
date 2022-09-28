<template>
  <div class="BG0"> 
    <Header></Header>   
      <div class="bodycontent"> 
        <div class="wrap">
          <Nuxt /> 
        </div>
      </div> 
    <Footer></Footer>
    <v-modal :open.sync="showFirstModal">
        <div class="modal-box modal-extend">
        <div class="modal-title"></div>
        <div class="modal-content">
            <div class="modal-content-title text1">
            <!-- 暂不支持代币标准为ERC-1155 NFT的批量出售和订单编辑功能 -->
            {{$t('nft.text4')}}
            </div>
            <div class="modal-option">
                <div class="modal-option-btn" flex="box:mean"> 
                    <div class="btn-confirm BGpurple btn-modal Common_white" @click="showFirstModal=false">
                    {{$t('nft.confirm')}}
                    </div> 
                </div>
            </div>
        </div>
        </div>
    </v-modal> 
  </div>

</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import Nav from './nav.vue'
import { mapState, mapMutations } from 'vuex'
import VModal from '@/components/nft/VModal.vue'
import { storage } from '@/utils/Storage' 
export default {
  name: 'DefaultLayout',
  data() {
    return {
      showFirstModal: false,
      screenWidth: 0,
    }
  },
  components: {
    Header,Footer,Nav,VModal
  }, 
  mounted() {
      this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
          return (() => {
              this.screenWidth = document.body.clientWidth
          })()
      }
  },
  computed: mapState({
    locale: state => state.locale === 'zh' ? 'zhCN' : null
  }),
  methods: {
    ...mapMutations(['changeIsPC']),
    switchLang() {
      this.locale = this.locale ? 'zh-cn' : null
    }
  },
  watch: { 
    "$store.state.address": function (newVal, oldVal) { 
      if (newVal) {
        if (!storage.getItem("firstConnect") && newVal) {  
            storage.setItem({ name: 'firstConnect', value: new Date() })
            this.showFirstModal = true
        } 
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bodycontent{
  width: 100%;
  min-width: 900px;
  min-height: 100vh;
  padding: 0 0 50px 0;
  /deep/ .ant-table-placeholder {
    border: none;
  }
}

.modal-box { 
    width: 420px;
  .modal-title {
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    
  }
  .modal-content { 
    padding: 0 20px;
    .modal-content-title {
      margin-top: 40px;
      margin-bottom: 78px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      /* identical to box height, or 140% */ 
      text-align: center; 
    //   line-height: 60px;
      min-height: 60px;
      /* Light/text1 */ 
      color: #0E0E0E;
    }
    .modal-option {
      .modal-option-title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        height: 32px;
      }
      .modal-option-btn {
        margin-top: 30px;
        gap: 12px;
        .btn-modal { 
          height: 50px;
          line-height: 50px;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }
      }
      .modal-option-list { 
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 13px;
        grid-row-gap: 10px; 
        .button {
          padding: 10px 0;
          border: 1px solid;
          border-radius: 100px;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          cursor: pointer;
        } 
      }
    } 
  }  
}



@media screen and (min-width: 1568px) {
  .wrap {
    width: 1528px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1577px)  {
  .bodycontent {
    min-width: 900px;
    padding: 0 20px 20px;
  }
}
</style>
