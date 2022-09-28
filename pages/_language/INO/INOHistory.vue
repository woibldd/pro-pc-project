<template>
    <div :class="isPC ? 'ino-history' : 'ino-history-small'">
        <div class="ino-history-content">
            <div><h1  class="ino-history-title text1" :title="$t('INO.history')">{{$t('INO.history')}}</h1></div>
            <div class="ino-history-nav">
                <p v-for="(item, index) in navList" :key="index" @click="changeNav(item)"
                    :class="item.value == navActive ? 'nav-active Common_light_purple Colorpurple text2' : 'nav-every text2'">
                    <span>{{ item.name }}</span>
                </p>
            </div>
            <div :class="isPC ?'listBox' : 'listBox listBox-small'">
                <ul v-if="historyList && historyList.length"  :class="historyList.length <= 2 ? 'historyEvery ino-eventPreview-list' : 'ino-eventPreview-list'">
                    <li  v-for="item in historyList" :key="item.id">
                        <a :href='"/" +  $route.params.language + "/INO/INODetatil"' class="ino-eventPreview-every  BG0 lineBG2" title="查看详情" @click="viewdDeatil($event,item)"> 
                             <p class="ino-eventPreview-every-img">
                            <img  :src="item.banner" alt="nft banner"/>
                            </p>
                            <div class="ino-eventPreview-every-bottom">
                                <p class="ino-eventPreview-every-head">
                                    <span>
                                        <img :src="item.publisherPic" alt="publisher" />
                                        <img class="chainIcon"
                                            :src="chainList ? chainList[item.chain].grayIcon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'"
                                            :alt="item && item.chain" />
                                    </span>
                                    <span class="text1">{{ item.publisher }}</span>
                                    <span class="statusLoading" v-if="item.status == 1">{{$t('INO.castpedding')}}</span>
                                    <span class="statussuccess" v-if="item.status == 2">{{$t('INO.castSUccess')}}!</span>
                                    <span class="statuserror" v-if="item.status == 3">{{$t('INO.castError')}}!</span>
                                </p>
                                <div class="priceDeatil">
                                    <img  class="chainIcon" :src="chainList ? chainList[item.chain].icon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'"
                                        :alt="item.chain" />
                                    <p class="chainPrice text1" v-if="!!item.mintAmount.toString()">{{ item.mintAmount }}{{
                                            item.priceContractName
                                    }}</p>
                                    <p class="doller text3" v-if="!!item.mintAmount.toString()">~{{ item.mintAmountDollar }}</p>
                                </div>
                                <div class="information lineBG2" v-if="item.other && item.other.length">
                                    <div v-for="(item, index) in item.other" :key="index + item.title">
                                        <p class="contract">
                                            <span class="text3">{{ item.title }}</span>
                                            <span class="text1">
                                                <img v-if="item.icon" :src="item.icon" class="bitkepp" alt="bitkeep" />
                                                {{item.isContract ? (item.value ? getSubStr(item.value) : '--') : (item.isTime ? toFormData(item.value) : item.value) }}
                                                <img v-if="item.isCopy && item.value"  @click="changeEvent($event,item.value)"
                                                    src="https://cdn.bitkeep.vip/u_b_506c8da0-eabe-11ec-8113-c94df49cd896.png"
                                                    alt="copy" /></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <!-- style="{
                            'background-image': `url(${item.banner})`,
                        }" -->
                    </li>
                    <!-- <li v-if="historyList && historyList.length % 2"></li> -->
                </ul>
                <div v-else class="noData">
                    <img :src="theme == 'dark' ? 'https://cdn.bitkeep.vip/u_b_d2717110-fcdb-11ec-bc5d-11be1d4cf263.png' : 'https://cdn.bitkeep.vip/u_b_42d2a7d0-fc14-11ec-ac7e-0793bca77ad8.png'" alt="noData"/>
                    <span class="text3">{{ $t('INO.noData')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations,mapGetters } from "vuex";
import { wallet } from '@/utils/wallet';
import  moment  from "moment";
import copy from "copy-to-clipboard";
export default {
    layout: 'INO/default',
    name: 'INOPage',
    scrollToTop: true,
    async asyncData(app) {
        const History = app.store.state.token ? await app.$api.INOApi.getInoHistory({ type:0,start:1,limit:10,address: app.store.state.address  }) :{status:'historynotoken'};
        const { status, data } = await app.$api.INOApi.getINOlist();
        return {
            INOlist: status == 0? data : { endList: { list: [], tittle: '' }, foreList: { list: [], tittle: '' }, topList: { list: [], tittle: '' },banners:{oneArray:[],secondArray:[],thirdArray:[],} },   
            historyList: History.status == 0 ? History.data.list :[],
            historyStatus: History.status == 'historynotoken'  ? 'historynotoken':'',
        }
    },
    data() {
        return {
            chainList:{"eth": {
        "chain": "eth",
        "title": "Ethereum",
        "icon": "https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_ab472ff0-f072-11ec-84d2-0337bae4f47b.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e4a321d0-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_4ed2edc0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "bnb": {
        "chain": "bnb",
        "title": "BSC",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4ec2d1-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0e7fe210-f073-11ec-82d1-45df45b47e59.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e2662a20-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_4a3549c0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "matic": {
        "chain": "matic",
        "title": "Polygon",
        "explorer": "https://polygonscan.com/",
        "icon": "https://cdn.bitkeep.vip/u_b_bbb29890-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_190165b0-f073-11ec-878d-dd4f1d6d4d8d.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e77888f0-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_5210dab0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "sol": {
        "chain": "sol",
        "title": "Solana",
        "icon": "https://cdn.bitkeep.vip/u_b_bbb3aa00-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_2ae46840-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "ftm": {
        "chain": "ftm",
        "title": "Fantom",
        "icon": "https://cdn.bitkeep.vip/u_b_baeb50f0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_40a95ff0-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "avax_c": {
        "chain": "avax_c",
        "title": "AVAX-C",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4e4da0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_4cd7f750-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "arbitrum": {
        "chain": "arbitrum",
        "title": "Arbitrum",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4ee9e0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_5ac4e080-f073-11ec-ab28-2dacbd127ae1.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "kcs": {
        "chain": "kcs",
        "title": "KCC",
        "icon": "https://cdn.bitkeep.vip/u_b_661aabb0-a693-11ec-9bb2-d529ee665d4d.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_72d74aa0-f073-11ec-b59b-cb8601612437.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "ht": {
        "chain": "ht",
        "title": "Heco",
        "icon": "https://cdn.bitkeep.vip/u_b_bb0b5c10-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_835761d0-f073-11ec-b59b-cb8601612437.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_5d734be0-0762-11ed-8cdd-45359e3c45df.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_50485320-0762-11ed-8cdd-45359e3c45df.png'
    },
    "okt": {
        "chain": "okt",
        "title": "OKX Chain",
        "icon": "https://cdn.bitkeep.vip/u_b_bb808c10-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_94d62450-f073-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "trx": {
        "chain": "trx",
        "title": "Tron",
        "icon": "https://cdn.bitkeep.vip/u_b_bbdaba00-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_a69a7b50-f073-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "fuse": {
        "chain": "fuse",
        "title": "Fuse",
        "icon": "https://cdn.bitkeep.vip/u_b_bafc19d0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0419e040-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "one": {
        "chain": "one",
        "title": "Harmony",
        "icon": "https://cdn.bitkeep.vip/u_b_5c054600-9acf-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_d106ac60-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "boba": {
        "chain": "boba",
        "title": "BOBA",
        "icon": "https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_25281860-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "klay": {
        "chain": "klay",
        "title": "KLAY",
        "icon": "https://cdn.bitkeep.vip/u_b_bb3c3010-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_3390c140-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "optimism": {
        "chain": "optimism",
        "title": "Optimism",
        "icon": "https://cdn.bitkeep.vip/u_b_bb999250-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_3b761630-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "kai": {
        "chain": "kai",
        "title": "KardiaChain",
        "icon": "https://cdn.bitkeep.vip/u_b_42900030-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_deaaccc0-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "eos": {
        "chain": "eos",
        "title": "EOS",
        "icon": "https://cdn.bitkeep.vip/u_b_bab796c0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_5cae6b90-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "wax": {
        "chain": "wax",
        "title": "WAX",
        "icon": "https://cdn.bitkeep.vip/u_b_bbfb1340-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_69539280-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "near": {
        "chain": "near",
        "title": "NEAR",
        "icon": "https://cdn.bitkeep.vip/u_b_bb6a9310-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_73d34160-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "iost": {
        "chain": "iost",
        "title": "IOST",
        "icon": "https://cdn.bitkeep.vip/u_b_bb2ec290-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_e7f41e80-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "luna": {
        "chain": "luna",
        "title": "Terra",
        "icon": "https://cdn.bitkeep.vip/u_b_bbca8d60-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_a2335b30-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "czz": {
        "chain": "czz",
        "title": "ClassZZ",
        "icon": "https://cdn.bitkeep.vip/u_b_11664430-a810-11eb-9f5e-d184ba33d3a3.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_bf7cc320-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "cmp": {
        "chain": "cmp",
        "title": "Caduceus",
        "icon": "https://cdn.bitkeep.vip/u_b_6f4023e0-c4b2-11ec-aa57-411cc0b3f4cb.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_b7a550e0-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "true": {
        "chain": "true",
        "title": "TRUE",
        "icon": "http://cdn.bitkeep.vip/u_b_802aefa0-a811-11eb-9f5e-d184ba33d3a3.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_b8581870-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "vlx": {
        "chain": "vlx",
        "title": "Velas",
        "icon": "https://cdn.bitkeep.vip/u_b_4427cf90-69f0-11ec-9d26-85f1b63f7fbd.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_d2ad94c0-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "celo": {
        "chain": "celo",
        "title": "CELO",
        "icon": "https://cdn.bitkeep.vip/u_b_4f8a0620-e8ab-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_4d852420-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "crol2": {
        "chain": "crol2",
        "title": "Cronos",
        "icon": "https://cdn.bitkeep.vip/u_b_181780d0-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_60fef350-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "bch": {
        "chain": "bch",
        "title": "smartBCH",
        "icon": "https://cdn.bitkeep.vip/u_b_b4efbf80-e8ad-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "",
        'blcakIcon':'',
        'lightIcon':''
    },
    "xdai": {
        "chain": "xdai",
        "title": "xDAI",
        "icon": "https://cdn.bitkeep.vip/u_b_07682f10-e8ac-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0ed1cf80-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "vs": {
        "chain": "vs",
        "title": "Vision",
        "icon": "https://cdn.bitkeep.vip/u_b_6245d440-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_f80504c0-f21b-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "cube": {
        "chain": "cube",
        "title": "CUBE",
        "icon": "https://cdn.bitkeep.vip/u_b_53c39ee0-e8b0-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_77e5fcd0-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    }
},
            navList: [{
                name: this.$t('INO.all'),
                value: '0'
            }, {
                name: this.$t('INO.castpedding'),
                value: '1'
            }, {
                name: this.$t('INO.castSUccess'),
                value: '2'
            }, {
                name: this.$t('INO.castError'),
                value: '3'
            },],
            chainIdList:{
                'eth':'1',
                'ht':'128',
                'matic':'137',
                'bnb':'56',
                'bsc':'56',
                'arbitrum':'42161',
                'polygon':'137',
                'heco':'128',
                'avalanche':'43114',
                'ftm':'250',
            },
            navActive: '0',
            historyList: [],
            isPC:this.$store.state.isPC,
            screenWidth:0
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('INO.shareTitle'),
            meta: [
                { name: 'keywords', content:this.$t('INO.shareDes') },
                { name: 'description', content:this.$t('INO.shareDes') },
                { name: 'title', content:this.$t('INO.shareDes') },
                { name: 'og:title', content:this.$t('INO.shareDes') },
                { name: 'og:description', content:this.$t('INO.shareDes') },
                { name: 'twitter:title', content:this.$t('INO.shareDes') },
                { name: 'twitter:description', content:this.$t('INO.shareDes') },
                { name:'twitter:card', content: "summary_large_image"},
                { name:'twitter:site', content: "BitKeep"},
                { name:'og:type', content: "website"},
                { name:'og:site_name', content: "BitKeep"},
                { hid:'og:image:src', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : ''  },
                { hid:'og:image', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : ''  },
                {hid:'og:image:alt', name: 'og:image:alt', content:'BitKeep, a Best Crpto Wallet' },
                {hid:'twitter:image', name: 'twitter:image', content:this.INOlist.topList.list &&this.INOlist.topList.list.length ?this.INOlist.topList.list[0].banner : ''  },
                {hid:'twitter:image:src', name: 'twitter:image:src', content:this.INOlist.topList.list &&this.INOlist.topList.list.length ?this.INOlist.topList.list[0].banner : ''  },
                {hid:'twitter:image:alt', name: 'twitter:image:alt', content:'BitKeep, a Best Crpto Wallet' },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/INO` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/INO` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/INO` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/INO` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/INO` },
            ]
        }
    },
    watch: {
        "$store.state.address": function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal)
            }
        },
        "$store.state.chainId": function (newVal, oldVal) {
            if (newVal) {
                this.changeChainId(newVal)
            }
        },
        screenWidth: {
          handler(val) {
              this.changeIsPC(val > 830)
              this.isPC =  val > 830;
          },
          immediate: true
        },
    },
    computed: {
        ...mapState(["address", "chainId"]),
        theme(){
            return this.GetTheme()
        }
    },
    beforeMount(){
        this.$Ta.track({name:"Web_Ino", data:{
            Source:"browser",
            Page_Enter: "1"
        }})
    },
    mounted() {
        for(var key in this.chainIdList){
            this.chainIdList[key] = this.transfer16(this.chainIdList[key])
        }
        if(this.historyStatus == 'historynotoken'){
            this.getInoHistory(0);
        }
        this.screenWidth = document.body.clientWidth
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth
            })()
        }
    },
    methods: {
        ...mapGetters(['GetTheme']),
        ...mapMutations(['changeIno', 'changeAddress', 'changeChainId', 'changeWalletID','changeIsPC']),
        changeEvent(event,text){
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            copy(text);
            event.stopPropagation();
            this.$message.success('Copied!');
        },
        toFormData(value,format = 'YYYY-MM-DD HH:mm:ss'){
            return moment(value).format(format);
        },
        getSubStr(str) {
            if (!!str) {
                var subStr1 = str.substr(0, 6);
                var subStr2 = str.substr(str.length - 4, 4);
                var subStr = subStr1 + "..." + subStr2;
                return subStr;
            } else {
                return ''
            }
        },
        transfer16(val = 0) {
            val = isNaN(Number(val)) ? 1 : Number(val);
            return "0x" + val.toString(16);
        },
        changeNav(item) {
            this.navActive = item.value;
            this.getInoHistory(item.value);
        },
        viewdDeatil(event,item) {
            this.$Ta.track({name:"Web_Ino",data:{
                Action_Location_Name:'MintingRecord',
                Action_Sub_Name:item.projectName,
                Action_Sub_Id:item.id,
            }})
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            this.changeIno({ id: item.inoId, series: item.series, type: 'myOrder', castStatus: item.status,time:this.toFormData(item.time,'YYYY-MM-DD') })
            const { ...query } = this.$route.query
            const { language } = this.$route.params
            // this.switchChain(item);
            // if(this.chainId == this.chainIdList[item.chain]){
            this.$router.push({
                path: '/' + language + '/INO/INODeatil',
                query: {
                    ...query,
                    id: item.inoId,
                    series: item.series
                }
            })
            // }else{
            //     this.switchChain(item)
            // }
        },
        async switchChain(item) {
            try {
                wallet.switchChainId(this.chainIdList[item.chain], this.address, 'isBitKeep');
                const chainId = await wallet.getChainId(false);
                this.changeChainId(chainId)
            } catch (error) {
                this.$message.error(typeof error == 'object' ? error.message : error);
            }
        },
        init() {
            this.changeWalletID("")
            this.changeAddress("")
            this.changeChainId("")
        },
        async connectWallet() {
            try {
                if (!wallet.selectedAddress("")) {
                    this.init()
                }
                const bitkeepaddress = await wallet.connect('isBitKeep');
                const chainId = await wallet.getChainId('isBitKeep');
                const [address] = await wallet.getAccounts('isBitKeep');
                const walletID = await wallet.getWalletID('isBitKeep');
                this.changeWalletID(walletID)
                this.changeAddress(address)
                this.changeChainId(chainId)
                localStorage.setItem('connectorId', "injected")
                wallet.on("chainChanged", async () => {
                    chainId = await wallet.getChainId()
                    this.changeChainId(chainId)
                })
                wallet.on("accountsChanged", () => {
                    this.init()
                    this.connectWallet()
                })
            } catch (error) {
                console.log(error)
                this.init()
                this.$message.error(typeof error == 'object' ? error.message : error);
            }
        },
        async getInoHistory(value) {
            const { status, data } = await this.$api.INOApi.getInoHistory({ type: value, start: 1, limit: 10, address:this.address });
            if (status == 0) {
                this.historyList = data.list;
            }else {
                this.$message.warning(this.$t('INO.error'));
            }
        }
    }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 1045px) {
    .listBox{
       
        .ino-eventPreview-list{
            li{
                &:nth-child(3n){
                margin-right: 0!important;
                }
            }
        }
    }
}
@media screen and (max-width: 1045px) {
    .ino-history {
        .listBox{
            .ino-eventPreview-list{
                li{
                    // flex: 0 0 50%;`  
                    width: (96% / 2);
                    margin-right: 4%;
                    &:nth-child(2n){
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 820px) {
    .ino-history {
        .listBox{
            .ino-eventPreview-list{
                li{ 
                    width:100%;
                    margin-right: 0;
                }
            }
        }
    }
}
@media screen and (max-width: 425px) {
    .ino-history-nav{
        justify-content: space-between;
        p{
            padding: 10px 9px !important;
        }
    }
}
.theme-light{
    
    .ino-eventPreview-every-head{
        span:nth-child(1){
            img{
                border:2px solid #FFFFFF;
            }
        }
    }
    .chainIcon{
        background: #F2F2F5;
        border-radius: 9px;
    }
}
.theme-dark{
     .chainIcon{
        background: #17171A;
        border-radius: 9px;
    }
        .ino-eventPreview-every-head{
        span:nth-child(1){
            img{
                border: 2px solid #17171A;
            }
        }
    }
}
.ino-history-small{
    min-width: 375px;
    padding: 0 20px;
    .ino-history-nav{
        p {
            margin-right: 0;
        }
    }
    .historyEvery{
        display: inline-block;
    }
}
.ino-history {
    margin: 0 auto;
    max-width: 1530px;
    .ino-history-content{
         max-width: 1530px;
         height: 100%;
         padding: 0 20px;
    }
}
.ino-history-title {
    font-weight: 600;
    font-size: 28px;
    line-height: 60px;
}

.ino-history-nav {
    margin-top: 27px;
    display: flex;

    p {
        // width: 72px;
        padding: 10px 15px;
        height: 36px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
        justify-content: center;
        cursor: pointer;
    }

    .nav-active {
        border-radius: 18px;
    }
}

.noData{
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    img{
        width: 80px;
        height: 80px;
    }
}
.listBox-small{
    .ino-eventPreview-list{
        li{
            width: 100%;
            margin-right: 0;
            min-width: 334px;
            .ino-eventPreview-every  {
                margin: 0 auto 20px;
            }
        }
    }
}
.listBox{
    // width: 1530px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    // padding: 0 10px;
}
.historyEvery{
    display: flex;
    li{
        // flex: 1;
        margin-right: 20px;
    }
}
.ino-eventPreview-list {
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-evenly;
    // flex-wrap: wrap;
    // align-items: center;
    margin-top: 47px;
    li{
        // display: flex;
        display: inline-block;
        width: calc(96% / 3);
        justify-content: center;
        // min-width: 268px;
        margin-right: 2%;
    }
    .ino-eventPreview-every {
        // width: 100%;
        max-width: 497px;
        height: 382px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        border: 1px solid;
        margin-bottom: 20px;
        // margin-right: 20px;

        .ino-eventPreview-every-bottom {
            padding: 10px 20px 15px 20px;
        }

        .ino-eventPreview-every-img {
            width: 100%;
            height: 180px;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            img{
                    border-radius: 8px 8px  0 0 ;
            }
        }

        .ino-eventPreview-every-head {
            display: flex;
            span:nth-child(1) {
                position: relative;
                margin-top: -28px;

                .chainIcon {
                    position: absolute;
                    right: 0;
                    bottom: 5px;
                    width: 18px;
                    height: 18px;
                }

                img {
                    width: 64px;
                    height: 64px;
                    border-radius: 32px;
                }
            }

            span:nth-child(2) {
                display: inline;
                margin-left: 8px;
                margin-right: 26px;
                flex: 1;
                height: 44px;
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .statusLoading {
                display: flex;
                align-items: center;
                padding: 4px 8px;
                height: 24px;
                background: rgba(64, 163, 255, 0.1);
                border: 1px solid #0075FF;
                border-radius: 8px;
                color: #0075FF;
            }

            .statussuccess {
                display: flex;
                align-items: center;
                padding: 4px 8px;
                height: 24px;
                background: rgba(27, 200, 158, 0.1);
                border: 1px solid #1BC89E;
                border-radius: 8px;
                color: #1BC89E;
            }

            .statuserror {
                display: flex;
                align-items: center;
                padding: 4px 8px;
                height: 24px;
                background: rgba(243, 100, 100, 0.1);
                border: 1px solid #F36464;
                border-radius: 8px;
                color: #F36464;
            }
        }

        .ino-eventPreview-every-text {
            margin-top: 10px;
            max-height: 42px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            /* 这里是超出几行省略 */
            overflow: hidden;
        }

        .ino-eventPreview-every-time {
            font-weight: 600;
            font-size: 14px;
            margin-top: 20px;
        }
    }
}

.priceDeatil {
    display: flex;
    height: 40px;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
    }

    .chainPrice {
        font-weight: 600;
        font-size: 18px;
        margin: 0 6px 0 6px;
    }

    .doller {
        font-size: 14px;
        font-weight: normal;
        // font-family: none;
    }
}

.information {
    margin-top: 11px;
    border-top: 1px solid;

    p {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .information-text {
        height: 11px;
        font-weight: 600;
        font-size: 16px;

        span:nth-child(2) {
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 14px;

            img {
                width: 16px;
                height: 16px;
                margin-left: 10px;
            }
        }
    }

    .contract {
        font-size: 12px;
        height: 16px;
        margin-top: 10px;
        .bitkepp{
            margin-right: 4px;
        }
        img {
            width: 16px;
            height: 16px;
            margin-left: 4px;
        }
        span{
            display: flex;
            align-items: center;
        }
        span:nth-child(2){
            font-weight: 500;
        }
    }

    .tokenStandard {
        font-weight: 500;
        font-size: 14px;
        height: 16px;
        margin-top: 10px;
    }

    .mainnet {
        font-weight: 500;
        font-size: 14px;
        height: 16px;
        margin-top: 10px;
    }
}
</style>

