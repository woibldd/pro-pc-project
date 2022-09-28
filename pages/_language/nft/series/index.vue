<template>
  <div class="nft-wrap">
    <Nav>
      <div class="assets-top-right">
        <button @click="goPath('/nft/orders')" class="nav-btn text1">{{$t('nft.myOrder')}}</button>
      </div>
    </Nav> 
    <div class="nft-series-wrap"> 
      <div v-if="show=='list'" class="nft-series-main">
        <div v-if="!loading"> 
          <div class="series-top">
            <div class="series-top-banner" >
              <div class="banner-box">
                <!-- <img class="banner" :src="detail.banner" alt=""> -->
                <img class="banner" v-show="!imgBannerError" :src="detail.banner" alt=""  @error="onBannerImgError" @load="onBannerImgLoad">
                <img class="banner" v-show="imgBannerError" src="@/assets/img/components/nft/default-nft-banner.png" alt="">
              </div>
              <img class="header lineBG0" v-show="!imgHeaderError" :src="detail.icon" alt=""  @error="onHeaderImgError" @load="onHeaderImgLoad">
              <img class="header lineBG0" v-show="imgHeaderError" src="@/assets/img/components/nft/default-nft-header.png" alt="">
            </div>
            <div class="series-top-info">
              <h2 class="title series-name text1">
                {{detail.name}}  
                <img v-if="detail.auth==1" style="width:30px; " src="@/assets/img/components/nft/orders/icon-cert-blue.svg" alt="">
                <img v-if="detail.auth==2" style="width:30px; " src="@/assets/img/components/nft/orders/icon-cert-pink.svg" alt="">
              </h2>
              <div class="series-chain text3">{{detail.type}}</div>
              <div class="pointer" @click.stop="handleCopy(detail.contract)">
                <div class="series-address BG1 lineBG2">
                  <img class="chain-icon" :src='"@/assets/img/components/Mainnet/"+(detail.symbol || "ETH")+".png"' alt="">
                  <span class="text2">{{sx(detail.contract)}} </span>
                </div>
                <img src="@/assets/img/components/nft/icon-copy.svg" alt="">
              </div> 
              <div class="series-details" flex="main:left">
                <div class="series-field">
                  <div class="series-value text1">{{detail.items_number || 0}}</div>
                  <div class="series-label text2">{{$t('nft.series.amount')}}</div>
                </div>
                <div class="series-field">
                  <div class="series-value text1" >
                    <CoinIcon :chain="chain"></CoinIcon>
                    {{fixed(detail.floor_price, 5)}}
                  </div>
                  <div class="series-label text2">{{$t('nft.series.floorPrice')}}</div>
                </div>
                <div class="series-field">
                  <div class="series-value text1"> 
                    <CoinIcon :chain="chain"></CoinIcon>
                    {{fixed(detail.volume_traded, 5)}}
                  </div>
                  <div class="series-label text2">{{$t('nft.series.volumeTraded')}}</div>
                </div>
                <div class="series-field">
                  <div class="series-value text1">{{detail.owners || 0}}</div>
                  <div class="series-label text2">{{$t('nft.series.owners')}}</div>
                </div>
              </div>
            </div>
          </div>
          <nav class="series-nav" >
            <div class="nav-left" flex="main:left">
                <div class="label-button text2" @click="handleTabChange(0)" :class="[tab==0? 'Common_light_purple Colorpurple':'']">{{$t('nft.series.all')}} {{detail.total}}</div>
                <div class="label-button text2" @click="handleTabChange(1)" :class="[tab==1? 'Common_light_purple Colorpurple':'']">{{$t('nft.onSale')}} {{detail.saleTotal}}</div>
                <div class="label-button text2" @click="handleTabChange(2)" :class="[tab==2? 'Common_light_purple Colorpurple':'']">{{$t('nft.forSale')}} {{(detail.total||0) - (detail.saleTotal||0)}}</div>
              </div>
          </nav>
          <div class="series-table"> 
            <div class="series-price" flex>
              <div class="series-price-field">
                <label class="text2">{{$t('nft.minPrice')}}</label>
                <span class="text1">{{detail.minPrice}} {{detail.symbol}}</span>
              </div>
              <div class="series-price-field">
                <label class="text2">{{$t('nft.maxPrice')}}</label>
                <span class="text1">{{detail.maxPrice}} {{detail.symbol}}</span>
              </div>
            </div>
            <!-- nft 列表 -->
            <div class="series-list" flex="box:last">
              <div class="series-list-left"> 
                <div v-if="loading2" class="loading-box">
                  <a-spin  size="large"></a-spin>
                </div> 
                <div class="series-card-list" v-else>
                  <div class="series-nft-item" v-for="item in list" :key="item.token_id">
                    <card-nft @checkdChange="checkdChange($event, item)" :info="item" :checked="item.checked" ></card-nft>
                  </div>
                  <!-- <div  class="series-nft-item" v-for="item in 12" :key="item">
                    <card-nft @checkdChange="checkdChange($event, list[0])" :info="list[0]" :checked="list[0].checked" ></card-nft>
                  </div> -->
                </div> 
                <a-pagination 
                  style="text-align:right;"
                  v-model="pagination.current" 
                  :total="pagination.total" 
                  :pageSize="pagination.pageSize"
                  @change="pagination.onChange"
                  :hideOnSinglePage="pagination.hideOnSinglePage"/>
              </div>
            <!-- 出售清单 -->
              <div class="series-list-right">
                <div class="series-order-sidebar lineBG2">
                  <div class="order-sidebar-header" flex="main:justify">
                    <div class="order-list-header-left">
                      <span class="text1">{{$t('nft.series.saleList')}}</span> 
                      <span class="text1 amount">{{selectList.length}}</span>
                    </div>
                    <div class="order-list-header-right">
                      <label @click="handleClickClear" class="Colorpurple pointer">Clear</label>
                    </div>
                  </div>
                  <div v-if="selectList.length > 0" class="list-box">
                    <div class="order-sidebar-box" >
                      <order-item 
                        :ableEdit="true" 
                        :ableRemove="true"
                        :ableBrush="true"
                        :showPrice="true"
                        v-for="item in selectList" 
                        :info="item" 
                        @remove="checkdChange(false, item)"
                        @brush="handleBrushClick(item.amount)"
                        v-model="item.amount"
                        :key="item.token_id">
                      </order-item> 
                    </div>
                    <div class="order-sidebar-price-list">
                      <div class="order-price-field" flex="main:justify">
                        <div class="text2 order-price-label">{{$t('nft.minPrice')}} </div>
                        <div class="text1 order-price-value">
                          <span>{{minPrice}}</span>
                          <span>{{detail.symbol}}</span>
                        </div>
                      </div>
                      <div class="order-price-field" flex="main:justify">
                        <div class="text2 order-price-label">{{$t('nft.maxPrice')}} </div>
                        <div class="text1 order-price-value">
                          <span>{{maxPrice}}</span>
                          <span>{{detail.symbol}}</span>
                        </div>
                      </div>
                      <div class="order-price-field" flex="main:justify">
                        <div class="text2 order-price-label">{{$t('nft.series.totalPrice')}} </div>
                        <div class="text1 order-price-value">
                          <span>{{totalPrice}}</span>
                          <span>{{detail.symbol}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="order-sidebar-option">
                      <div class="sidebar-option-title text1">
                        {{$t('nft.series.setTime')}}
                      </div>
                      <div class="sidebar-option-list">
                        <div @click="handleOrderTermChange(1)" :class="[orderTerm==1? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" class="button">{{$t('nft.time1')}}</div>
                        <div @click="handleOrderTermChange(2)" :class="[orderTerm==2? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" class="button">{{$t('nft.time2')}}</div>
                        <div @click="handleOrderTermChange(3)" :class="[orderTerm==3? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time3')}}</div>
                        <div @click="handleOrderTermChange(4)" :class="[orderTerm==4? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time4')}}</div>
                        <div @click="handleOrderTermChange(5)" :class="[orderTerm==5? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">{{$t('nft.time5')}}</div>
                        <!-- <div @click="handleOrderTermChange(6)" :class="[orderTerm==6? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']"  class="button">
                          自定义
                        </div> -->
                        <a-date-picker  
                          class="my-date-picker"
                          :class="[orderTerm==6? 'Colorpurple linePurple Common_light_purple':'lineBG2 text1']" 
                          :disabled-date="disabledDate"
                          :placeholder="$t('nft.time6')"
                          @ok="onOk"
                          :format="dateFormat" 
                          @change="onChange">
                          <span slot="suffixIcon"/>
                        </a-date-picker>
                      </div>
                      <div class="btn-next BGpurple" @click="handleClickNext">
                        {{$t('nft.series.next')}}
                      </div>
                    </div>
                    <div v-if="getFeeLoading" class="fee-loading-box">
                      <a-spin  size="large"></a-spin>
                    </div>
                  </div>
                  <div v-else class="empty-box"> 
                    <div class="empty">
                      <div>
                        <img src="@/assets/img/components/royalties/icon-empty.png" alt=""/>
                      </div> 
                        <div class="text1 tag1">{{$t('nft.series.tag1')}}</div>  
                        <div class="text1 tag2">{{$t('nft.series.tag2')}}</div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div v-else class="loading-box">
            <a-spin  size="large"></a-spin>
          </div>
      </div> 
      <div v-if="show=='order'" class="series-create-order-wrap">
        <div class="create-order-top">
          <div class="title" flex="main:left">
            <!-- <div class="return lineBG2" flex="main:center cross:center" @click="show='list'">
              <img src="@/assets/img/components/nft/series/icon-arrow-return.svg" alt="">
            </div> -->
            <h2 class="text1">{{$t('nft.series.order.title')}}</h2> 
          </div>
        </div> 
        <div class="create-order-content" flex="box:last">
          <div class="create-order-left">
            <div class="order-sidebar-box lineBG2" >
              <order-item  
                v-for="item in selectList" 
                :info="item"  
                :showPrice="true"
                :ableEdit="false"
                v-model="item.amount"
                :key="item.token_id">
              </order-item>
            </div> 
          </div>
          <div class="create-order-right">
            <div class="create-order-form">
              <div class="order-field" flex="main:justify">
                <div class="label text3">{{$t('nft.series.order.count')}}</div>
                <div class="value text1">{{selectList.length}}</div>
              </div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">{{$t('nft.series.order.platform')}}</div>
                <div class="value text1">BitKeep</div>
              </div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">{{$t('nft.series.order.end_time')}}</div>
                <div class="value text1">{{parseTime(end_time)}}</div>
              </div>
              <div class="line BG2"></div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">{{$t('nft.series.order.minPrice')}}</div>
                <div class="value text1">{{minPrice}}{{detail.symbol}}</div>
              </div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">{{$t('nft.series.order.maxPrice')}}</div>
                <div class="value text1">{{maxPrice}}{{detail.symbol}}</div>
              </div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">
                  {{$t('nft.series.order.handling_fee')}}
                  <a-tooltip overlayClassName="mytooltip"  :title="`${$t('nft.text1')}`" >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </div>
                <div class="value text1">{{detail.handling_fee || 0}}%</div>
              </div>
              <div class="order-field" flex="main:justify">
                <div class="label text3">
                  {{$t('nft.series.order.royalty_param')}}
                  <a-tooltip overlayClassName="mytooltip"  :title="`${$t('nft.text3')}`" >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </div>
                <div class="value text1">{{detail.royalty_param || 0}}%</div>
              </div>
              <div v-if="+gasFee" class="order-field" flex="main:justify">
                <div class="label text3">
                  {{$t('nft.gas_fee')}} 
                  <label class="label-first">{{$t('nft.first_time')}} </label>
                </div>
                <div style="max-width: 126px" class="value text1 ellipsis">{{gasFee || 0}} {{detail.symbol}}</div>
              </div>
              <div class="line BG2"></div> 
              <div class="order-field" flex="main:justify">
                <div class="label ">{{$t('nft.series.order.total')}}</div>
                <div class="value text1">
                  <div class="summary text1" flex="main:right">{{totalPrice}} {{detail.symbol}}</div>
                  <div class="valuation text3" flex="main:right"> 
                    <fiatMoney :base="detail.symbol" :value="totalPrice"></fiatMoney>
                  </div>
                </div>
              </div>
              <div class="order-submit" flex="box:mean">
                <button @click="handleClickCancel" class="btn-cancel BG2 text1">{{$t('nft.cancel')}}</button>
                <button @click="handleClickSubmit" class="btn-submit BGpurple Common_white">{{$t('nft.confirm')}}</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <v-modal :open.sync="showResultModal" >
      <div class="modal-box modal-confirm">
        <div class="modal-title text1">{{$t('nft.series.order.result')}}</div>
        <div class="modal-content modal-result-content">
          <div class="modal-img-box">
            <img v-if="isSufficient==false" class="modal-img "  src="@/assets/img/components/nft/icon-result-fail.png" alt="">
            <img v-else-if="resultStatus=='loading'" class="modal-img img-loading" src="@/assets/img/components/nft/icon-result-loading.png" alt="">
            <img v-else-if="resultStatus=='fail'" class="modal-img "  src="@/assets/img/components/nft/icon-result-fail.png" alt="">
            <img v-else-if="resultStatus=='success'" class="modal-img "  src="@/assets/img/components/nft/icon-result-success.png" alt="">
          </div>
          <div class="modal-result-text">
            <div  v-if="isSufficient==false" class="result-text1">{{$t('nft.orderResult2')}}</div>
            <div  v-else-if="resultStatus=='loading'" class="result-text1">{{$t('nft.orderResult1')}}</div>
            <div  v-else-if="resultStatus=='fail'" class="result-text1">{{$t('nft.orderResult2')}}</div>
            <div  v-else-if="resultStatus=='success'" class="result-text1">{{$t('nft.orderResult3')}}</div>
            <div  v-if="resultStatus=='success'" class="result-text2">{{$t('nft.orderResult4')}}</div>
            <div  v-if="isSufficient==false" class="result-text3">{{$t('nft.text6', {symbol: detail.symbol})}}</div>
 
          </div> 
        </div>
        <div class="modal-option"> 
          <div v-if="resultStatus!='loading'" class="modal-option-btn" flex="box:mean"> 
            <div class="modal-btn-confirm BGpurple btn-modal Common_white" @click="handleClickDetail">
              {{$t('nft.series.order.detail')}}
            </div> 
          </div>
        </div> 
      </div>
    </v-modal>
  </div>
</template> 

<script>
import {parseTime} from '@/utils/public'
import CardNft from '@/components/nft/CardNft.vue'
import OrderItem from '@/components/nft/OrderItemSeries.vue'
import fiatMoney from '@/components/nft/FiatMoney.vue'
import Nav from '@/components/nft/nav'
// import moment from 'moment'
import VModal from '@/components/nft/VModal.vue'
import {DatePicker, Pagination, Spin} from 'ant-design-vue'  
import bignumber from 'bignumber.js'
import {wallet} from '@/utils/wallet'
import CoinIcon from '@/components/nft/CoinIcon'
import copy from 'copy-to-clipboard';
import Vue from 'vue' 

Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Spin)
export default {
  layout: 'nft/assets',
  data() {
    return {
      detail: {},
      list: [],
      selectList: [],
      tab: 0,
      orderTerm: 1,
      dateFormat: 'YYYY/MM/DD',
      loading: true,
      loading2: false,
      pagination: {
        current:1,
        pageSize: 12, 
        total: 0,  
        onChange: this.pageChange,
        hideOnSinglePage: true
      },
      show: 'list',
      end_time: '',
      chain: this.$route.query.chain,
      showResultModal: false,
      resultStatus: 'loading',
      imgBannerError: false,  
      imgHeaderError: false,
      getFeeLoading: false,
      gasFee: 0,
      batch: {},
      isSufficient: false,

    }
  },
  watch: {
    "$store.state.WalletID": function (newVal, oldVal) {  
      if (!this.loading) {
        this.init()
      }
    },
    "$store.state.chainId": function (newVal, oldVal) {  
      if (!this.loading) {
        this.init()
      }
    }
  },
  computed: { 
    is1155() {
      return this.detail.type.indexOf('1155') > -1
    },
    maxPrice() {
      if (this.selectList.length > 0) {
        let max = 0
        this.selectList.map(item => {
          if (item.amount > max) {
            max = item.amount
          }
        }) 
        return max
      }
      return 0
    },
    minPrice() {
      if (this.selectList.length > 0) { 
        let min = -1
        this.selectList.map(item => { 
          if ((item.amount||0) < min || min < 0) { 
            min = item.amount || 0
          }
        }) 
        return min
      }
      return 0
    },
    totalPrice() {
      if (this.selectList.length > 0) {
        let total = bignumber(0)
        this.selectList.map(item => { 
          total = total.plus(item.amount || 0)
        })
        return total.toString()
      }
      return 0
    },
    royaltyPrice() {
      let result = bignumber(this.totalPrice).times(this.detail.royalty_param || 0).toFixed(4)
      return result || 0
    },
    //平台手续费
    handlingFee() {
      let result = bignumber(this.totalPrice).times(this.detail.handling_fee || 0).toFixed(4)
      return result || 0
    }
  },
  components: {
    CardNft,
    OrderItem,
    fiatMoney,
    VModal,
    CoinIcon,
    Nav
  },
  methods: { 
    parseTime,
    init() {
      this.selectList=[]
      this.show = 'list'
      this.isSufficient = false,
      this.pagination.current = 1
      this.getList()
    },
    onBannerImgError(event) { 
      this.imgBannerError = true
    },
    onBannerImgLoad(event) { 
      this.imgBannerError=false
    },
    onHeaderImgError(event) { 
      this.imgHeaderError = true
    },
    onHeaderImgLoad(event) { 
      this.imgHeaderError=false
    },
    goPath(path) {
      const { language } = this.$route.params
      this.$router.push({
        path: '/'+ language + path
      })
    },
    fixed(num=0, scale=2) {
      // console.log(BigNumber(0))
      // return new BigNumber(num || 0)
      return +bignumber(num||0).toFixed(scale, 0)
    },
    sx(address='') {
      if (address.length > 16) {
        return address.substr(0, 6) + '...' + address.substr(address.length-4)
      } else {
        return address
      }
    },
    async handleTabChange(id) {
      // console.log('handleTabChange')
      this.tab = id
      this.pagination.current = 1
      await this.getList()
     
      //数据刷新后保持选中状态
      if (this.selectList?.length > 0) {
        this.selectList.map(item => {
          this.list.map(obj => {
            if (obj.token_id == item.token_id) { 
              this.$set(obj, 'checked', true) 
            }
          }) 
        })
      } 
    },
    handleOrderTermChange(id) {
      if (id != 6) {
        this.orderTerm = id
        this.end_time = new Date() 
        switch (id) {
          case 1: //7天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 7
            break;
          case 2: //30天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 30
            break;
          case 3: //90天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 90
            break;
          case 4: //180天后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 180
            break;
          case 5: //10年后 
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 365 * 10
            break; 
          default:
            this.end_time = +this.end_time + 1000 * 60 * 60 * 24 * 7
            break;
        }

      }  
    },
    onChange(date, dateString) {  
      if (!date) {
        this.orderTerm = 0
      } else { 
        let date = new Date(dateString + ' 23:59:59')
        this.end_time = +date
        this.orderTerm = 6
      }
    },
    onOk(value) { 
      // console.log('onOk: ', value);
    },
    disabledDate(current) { 
      return current && current < new Date();
    },
    async handleClickNext() {
      this.$Ta.track( {
        name:"Nft_Nextstep_Click", 
      })
      for (let i = 0; i < this.selectList.length; i++) {
        const item = this.selectList[i];
        if (!item.amount || item.amount == 0) {
          this.$message.warn(this.$t('nft.series.order.text1'))
          return 
        } 
      } 
      const {chain, contract} = this.$route.query
      const { address } = this.$store.state 
      const params = {
        chain,
        address,
        contract,
        standard: this.is1155 ? '1155' : '721'
      }
      this.getFeeLoading = true 
      try { 
        //获取用户余额
        await this.getBatch() 

        const res =  await this.$api.nft.getRegisterApprovalFee(params)  
        this.getFeeLoading = false
        if (res.status == 0) {
          this.gasFee = res.data.fee || 0
          if (+this.batch.balance >= (+(this.gasFee || 0))) {
            this.isSufficient = true
          } 
        }  

        if (process.client) {
          document.body.scrollTop = document.documentElement.scrollTop = 0
          window.addEventListener('scroll', this.handleScroll, true)
        }  
        this.show = 'order' 
      } catch (error) {
        this.getFeeLoading = false 
      }

    },  
    handleScroll() {
      const top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      const marketcontent=Math.floor(document.getElementsByClassName("nft-series-wrap")[0]?.clientHeight)+40 
    },
    checkdChange(checked, item) {  
      //出售状态，1出售中，2已取消出售，3超出出售时间，4成功出售，5上架中，6上架失败
      if (this.is1155) {
        this.$message.warn(this.$t('nft.text4'))
        return 
      } 
      if (item.status == 1 || item.status == 4 || item.status == 5) {
        this.$message.warn(this.$t('nft.text5'))
        return 
      }
      if (this.selectList.length >= 50) return 

      this.$set(item, 'checked', checked) 
      if (checked) { 
        const find = this.selectList.find(obj => obj.token_id==item.token_id)
        if (!find) {
           this.selectList.push(item) 
        } 
      } else {
        item.amount = ''
        this.selectList = this.selectList.filter(obj => obj.token_id!=item.token_id)  
      }
    },
    handleBrushClick(amount=0) {  
      if (!+amount || +amount == 0) {
        this.$message.warn(this.$t('nft.series.order.text1'))
        return 
      }   
      this.selectList.map(item => { 
          this.$set(item, 'amount', amount)
        // }
      })
    },
    handleClickClear() {
      this.selectList.map(item => {
        item.amount = ''
        item.checked = false
      })
      this.selectList = []
    },
    async pageChange(e) {
      this.pagination.current = e
      await this.getList()

      //数据刷新后保持选中状态
      if (this.selectList?.length > 0) {
        this.selectList.map(item => {
          this.list.map(obj => {
            if (obj.token_id == item.token_id) { 
              this.$set(obj, 'checked', true) 
            }
          }) 
        })
      } 
    },
    async getList() {  
      const {chain, contract} = this.$route.query
      const { address } = this.$store.state 
      if (!chain || !contract || !address) {
        this.loading = false
        this.loading2 = false
        return
      }
      // if (this.loading2) {
      //   return
      // }
      this.loading2 = true    
      //出售状态：saling出售中，sale待出售
      const dict = ['', 'saling', 'sale']
      const status = dict[this.tab ] 
      const params = {
        address,  
        chain,
        contract,
        status,
        page: this.pagination.current,
        limit: this.pagination.pageSize 
      }  
      // chain=eth&
      // address=0x2a70276683792c764a575118bd7b9919d42bf9d5&
      // contract=0x73d10536915d5837135d884490eab6070b065870
      // params.address = '0x2a70276683792c764a575118bd7b9919d42bf9d5'
      // params.contract= '0x73d10536915d5837135d884490eab6070b065870'
      // params.chain = 'eth'
      try {  
        const {data, status} = await this.$api.nft.getMyNft(params)  
        this.loading = false
        this.loading2 = false 
        if (status==0) { 
          this.detail = data.detail || {}
          this.list = data.list || []
          this.pagination.total = data.total
          this.loading = false
          this.loading2 = false 
 
        } else { 
          if (data?.message != 'canceled') { 
            this.detail = {}
            this.list = []
            this.pagination.total = 0 
          }
        }
      } catch (error){ 
        console.error(error)
        this.detail = {}
        this.list = []
        this.pagination.total = 0
        this.loading = false
        this.loading2 = false 
      }
    },
    handleClickCancel() {
      this.show='list'
    },
    async handleClickSubmit() { 
        this.$Ta.track( {
            name:"Nft_Confirm_Click",
            data:{
                Nft_Name: this.detail.name
            }
        })
      this.showResultModal = true
      if (!this.isSufficient) { 
        return
      }

      this.resultStatus = 'loading' 
      // const res = await wallet.getBalance() 
      // console.log('getBalance', res)
      this.multiOrderCreate()

    },
    //批量订单的确认出售
    async multiOrderCreate() {
      try {
        const { address } = this.$store.state 
        // let { chainName } = wallet.getWalletInfo()
        const {chain, contract} = this.$route.query 
        const token_ids = []
        this.selectList.map(item => {
          token_ids.push({
            token_id: item.token_id,
            price: item.amount || 0
          })
        })
        let sale_end_time = this.end_time
        const params = {
          chain,
          address,
          contract,
          token_ids,
          sale_end_time,
          price: this.total,
          price_coins: {
            chain:chain,
            symbol: this.detail.symbol,  
            contract:'0x0000000000000000000000000000000000000000'
          }, 
        }

        const res = await this.$api.nft.batchConfirmSale(params)
        // console.log(res )
        if (res.status == 0) {
          if (res.data.success && res.data.success.length > 0) {
            // console.log('batchConfirmSale')
            await this.multSaveSign(res.data.success, res.data.txs)
          } else {
            // console.log(1)
            this.resultStatus = 'fail'
          } 
        } else {
          // console.log(2)
          this.resultStatus = 'fail'
        }
        
      } catch (error) {
        this.resultStatus = 'fail'
        console.error(error)
      }

      
      this.$Ta.track( {
          name:"Nft_Result_Click",
          data:{
              Result: this.resultStatus ? this.resultStatus.toUpperCase() : 'FAIL'
          }
      })

    },
    //批量订单的出售
    async multSaveSign(orders=[], txs) { 
      if (orders.length == 0) {
        this.resultStatus = 'fail'
        return
      }
      try {
        const {chain} = this.$route.query 
        const { address } = this.$store.state 
        
        // const sign_data = orders[0].sign_data
        // const order_sign = await wallet.CheckSign(sign_data, address)
        const sign_data_list = []
        orders.map(item => {
          // sign_data_list.push({
          //   "data": {
          //     "data": item.sign_data,
          //     "__type": 'personal'
          //   },
          //   "from": address, 
          //   "method": "personal_sign",
          //   "type":"evm",
          //   "chain": chain
          // })
        // const order_sign_list = await wallet.MultSign(sign_data_list)
          sign_data_list.push({
            "data": [item.sign_data,address],
            "from": address,
            "type": "evm",
            "chain": chain
          })
        })
        
        const order_sign_list = await wallet.MultPersonalSign(sign_data_list)

        console.log('order_sign_list:' , { order_sign_list})
        // return 
        const myOrders = []
        orders.map(item => {
          let find = order_sign_list.find(obj => obj.data[0] == item.sign_data)
          myOrders.push({
            order_id: item.order_id,
            order_sign: find.sig
          })
        })
        txs.map(item => {
          item.type='evm'
          item.chain=chain
        })
        const txs_sign = await wallet.MultSign(txs)
        // console.log('txs_sign', txs_sign, 111111)
        const params = {
          orders: myOrders, // {order_id:'', order_sign:''}
          txs: txs_sign,
        }
        const res = await this.$api.nft.batchSaveSign(params)
        // console.log(res )
        if (res.status == 0) {
          if (res.data.success) {
            this.resultStatus = 'success'
            // this.show = "list" 
            this.selectList=[]
            this.show = 'list'
            this.getList()
          } else {
            // console.log(3)
            this.resultStatus = 'fail'
          } 
        } else {
            // console.log(4)
          this.resultStatus = 'fail'
        }
        
      } catch (error) {
        this.resultStatus = 'fail'
        console.error(error)
      } 

    },
    
    // async orderCreate(order, end_time) { 
    //   const { address } = this.$store.state 
    //   const params = {
    //     address,
    //     chain: order.chain,
    //     contract: order.collection_contract,
    //     token_id: order.token_id,
    //     sale_end_time: end_time,
    //     price: order.price,
    //     price_coins: {
    //       chain: order.chain,
    //       symbol: order.symbol,
    //       contract:'0x0000000000000000000000000000000000000000'
    //     },
    //     platform: 'BitKeep'
    //   }
    //   const res = await this.$api.nft.confirmSale(params)

    //   if (res.status == 0 && res.data.status ==1) {
    //     const {order_id, sign_data, txs} = res.data  
    //     const order_sign = await wallet.CheckSign('sign_data', address)
    //     // const txs_sign = await wallet.Sign('txs')
    //     const txs_sign = await wallet.MultSign(['txs']) 
    //     // console.log(order_sign,'------------', txs_sign) 
    //     const params2 = {
    //       order_id,
    //       order_sign,
    //       txs: txs_sign
    //     }
    //     const result = await this.$api.nft.saveSign(params) 
    //     if (res.status == 0 && res.data.status ==0) {
    //       this.$message.success(this.$t('nft.editSuccess'))
    //       this.getList()
    //     } else {
    //       this.$message.success(this.$t('nft.editFail')) 
    //     }
    //   } 
    // }, 
    handleClickDetail() {
      // console.log('handleClickDetail')
      this.goPath('/nft/orders')
    },
    handleCopy(data) {
        if (!data) {
          this.$message.warning(this.$t('header.Nocopy'))
          return
        }
        copy(data)
        this.$message.success(this.$t('header.copySuccess'))
    },
    getChainName(chinid) { 
      switch (chinid) {
        case "0x80":
          return "HT";
        case "0x42":
          return "OKT";
        case "0x38":
          return "BNB";
        case "0x89":
          return "MATIC";
        case "0xa86a":
          return "AVAX";
        case "0xfa":
          return "FTM";
        case "0xa4b1":
          return "ARBITRUM";
        case "0x141":
          return "KCC";
        case "0x7a":
          return "FUSE";
        case "0x1":
          return "ETH";
        case "0x2019":
          return "KLAY";
        case "0xa":
          return "OP";
        case "0x120":
          return "BOBA";
        case "0xc7":
          return "BTT";
        default:
          return "ETH";
      }
    },
    async getBatch() { 
      const { chainId, address } = this.$store.state
      let chainName = this.getChainName(chainId).toLowerCase()
      // if (chainId=='0x1') {
      //   chainName='eth'
      // } else if (chainId == '0x38') {
      //   chainName='bnb'
      // } else if (chainId == '0x89') {
      //   chainName='matic'
      // }   
      const params = {
        address,   
        chain: chainName 
      } 
      const res = await this.$api.nft.getBatch(params)
      // console.log(res)
      if (res.status == 0 && res.data.length > 0) {
        this.batch = res.data[0].list[''];
        // console.log('batch', this.batch)
      }
    }
  },
  mounted() { 
    if (process.client) {
      this.getList()
      this.getBatch()
      this.handleOrderTermChange(1)
    }
  },
  created() { 
  },
  beforeDestroy() {
    //离开这个界面之后，删除滚动事件，不然容易除bug
    window.removeEventListener("scroll", this.handleScroll,true)
  }
}
</script>

<style lang="less" scoped>
.nft-series-main {
  min-width: 1270px;
  .series-top {
    .series-top-banner {
      position: relative;
        height: 200px;
      .banner-box {
        height: 200px;
          overflow: hidden;
          position: absolute;
          inset: 0px;
          background-color: rgba(255, 255, 255, 0.03);   
          border-radius: 8px;

          border-width: 0px;
          border-style: solid;
          border-color: rgb(255, 255, 255);

          .banner {
            width: 100%;
            height: 100%;

            max-height: 100%;
            max-width: 100%;

            object-fit: cover;
            vertical-align: inherit;
          } 
      }
      .header {
        position: absolute;
        left: 20px;
        bottom: -62px;
        width: 120px;
        height: 120px;
        border: 2px solid;
        border-radius: 50%;
        background-color: #F8F8F9;
      }
    }
    .series-top-info {
      margin-top: 73px;
      .title {
        font-size: 28px;
        line-height: 120%;
        font-weight: 700;
        font-style: normal;
      }
      .series-chain {
        margin-top: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%; 
      }
      .series-address {
        margin-top: 4px;
        display: inline-block;
        padding: 4px 8px 4px 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        border-radius: 100px;
        border: 1px solid;
        .chain-icon {
          width: 20px;
          height: 20px;
        } 
      }
      .series-details {
        margin-top: 10px;
        .series-field {
          margin-right: 50px;
          .series-value {
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 150%;
          }
          .series-label {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;

          }
        }
      }
    }
  }
  .series-nav {
    margin-top: 30px;
    height: 50px;
    .nav-left {
      .label-button {
        padding: 10px 15px;
        margin-right: 10px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px; 
        border-radius: 100px;
        cursor: pointer;
      }
    }

  }
  .series-table {
    margin-top: 20px;
    margin-bottom: 40px;
    .series-price {
      .series-price-field {
        margin-right: 50px;
      }
    }
    .series-list {
      margin-top: 20px;
      margin-bottom: 160px;
      gap: 20px;
      .series-card-list {
        display: grid;
      
        // grid-template-columns: 1fr 1fr 1fr 1fr;
        // gap: 20px;
        .series-nft-item {
          margin-bottom:20px;
        }
      }
      .ant-pagination {
        margin-top: 10px;
      }
      .series-order-sidebar {
        width: 497px;
        border: 1px solid;
        border-radius: 8px;
        .order-sidebar-header {
          padding: 20px 20px 0 20px;
        }
        .list-box {
          position: relative;
          padding: 10px 0 20px;
          .order-sidebar-box {
            padding: 10px 0;
            max-height: 446px;
            overflow-y: auto;
          }
          .order-sidebar-price-list {
            margin-top: 20px;
            padding: 0 20px;
            .order-price-label {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 150%;
            }
            .order-price-value {
              max-width: 200px;
              overflow: hidden;
              white-space: nowrap;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 14px;
            }
          }
          .order-sidebar-option {
            margin: 20px 20px 0 20px;
            .sidebar-option-title {
              height: 40px;
              line-height: 40px; 
            }
            .sidebar-option-list {
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
            .btn-next { 
              margin-top: 20px;
              padding: 15px 0;
              cursor: pointer;
              color: #fff;
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 600;
              font-size: 15px;
              line-height: 20px; 
              text-align: center;
              border-radius: 8px;
            }

            .my-date-picker {
              border: 1px solid;
              border-radius: 100px;
              overflow: hidden;
              min-width: 118px!important;
              /deep/ .ant-input { 
                height: 38px;
                line-height: 38px;
                border:none;
                font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                text-align: center; 
                cursor: pointer; 
                background-color: transparent;
                &::-webkit-input-placeholder{
                    color:@theme-light-text1;
                }
                &::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color:@theme-light-text1;
                }
                &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                    color:@theme-light-text1;
                }
                &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                    color:@theme-light-text1;
                }
 
              }
            }
          }
          .fee-loading-box {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 100px;
          }
        }
        .empty-box { 
          padding: 138px 0;
          text-align: center;
          .tag1 {
            margin-top: 20px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 150%;
          }
          .tag2 {
            margin-top: 4px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
          }
          img {
            width: 64px;
          }
        }
      }
    }
  }

  .loading-box {
    margin-top: 180px;
    margin-bottom: 180px;
    text-align: center;
  }
}


.nft-wrap {
  min-width: 1270px;
  .nav-btn {
    padding: 6.5px 14px;
    border: 1px solid #F2F2F5;
    border-radius: 8px;
  }
}

@media screen and (min-width: 1540px) { 
  .nft-series-main {
    .series-card-list { 
      grid-template-columns: 23.8% 23.8% 23.8% 23.8%;
      grid-column-gap: 1.6%; 
    }
  }
}

@media screen and (max-width: 1539px)  {
  .nft-series-main  {
    .series-card-list { 
      grid-template-columns: 32% 32% 32%;
      grid-column-gap: 2%;
    }
  }
}


.series-create-order-wrap {
  max-width: 1013px;
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
  .create-order-content { 
    margin-top: 20px;
    .create-order-left {
      max-width: 626px;
      .order-sidebar-box { 
        padding: 20px 0;
        height: 650px; 
        border: 1px solid;
        border-radius: 8px;
        overflow-y: scroll;
      }
    }
    .create-order-right {
      width: 367px;
      margin-left: 20px;
      .order-field {
        margin-bottom: 15px;
        .label {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          .label-first {
            padding: 0px 8px;
            border-radius: 20px;
            background-color: orange;
            color: #ffffff;
          }
        }
        .value { 
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          .summary {
            font-weight: 600;
            font-size: 24px;
            line-height: 150%;
          }
          .valuation {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px; 
          }
        }
      }
      .line {
        margin: 30px 0;
        height: 1px;
      }
      .order-submit {
        gap: 10px;
        button {
          padding: 13px 0;
          border-radius: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
}


.modal-box { 
  width: 420px; 
  .modal-title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;  
  }
  .modal-content {
    // margin-top: 10px;
    text-align: center;
    &.modal-result-content {
      height: 200px;
      box-sizing: border-box;
    }
    .modal-img-box {
      padding-top: 40px;
      .modal-img {
        height: 60px;
        width: 60px; 
        &.img-loading {
          animation: loadingCircle 1s linear infinite;
        }
      }
    }
    .modal-result-text {
      margin-top: 20px;
      color: #0E0E0E;
      .result-text1 {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 130%; 
      }
      .result-text2 {
        margin-top: 8px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
      }
      .result-text3 {
        margin: 20px 20px 0;
        padding: 10px;
        color: rgb(243, 122, 96);
        background-color: rgb(255, 242, 237);
        font-family: 'PingFang SC';
        text-align: left;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        border-radius: 8px;
      }
    }
  }
  .modal-option {
    margin: 40px 20px 0 20px; 
    .modal-btn-confirm {
      margin-top: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 8px;
    }
  }
}
button {
  cursor: pointer;
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
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
    } 
    .ant-tooltip-arrow:before {
      background-color: #fff;
    }
  } 
}
</style>