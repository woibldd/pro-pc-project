
import { initVueI18n } from '@/locales/index.js'
const Initstate = {
  Supportedlanguages: ['zh', 'en', 'ko','vi','tr','id'],
  addlanguage:false,
  isPC: true,
  locale: 'en',
  address: '',
  chainId: '',
  WalletID: '',
  isMobile:false,
  hostIsCom:true,
  hostChange:'.com',
  SeoReptile:false,
  isBitkeep:false,
  rates: {
    eth: 0,
    bnb: 0,
    matic: 0
  },
  theme:'light',
  headerDownloadTipsIsShow: true,
  GetDappConfig: {"bannerList":[],"dataTag":{"version":7,"staticTag":[],"chainMainnetList":[{"chain":"eth","title":"Ethereum","icon":"https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_ab472ff0-f072-11ec-84d2-0337bae4f47b.png"},{"chain":"bnb","title":"BSC","icon":"https://cdn.bitkeep.vip/u_b_ba4ec2d1-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_0e7fe210-f073-11ec-82d1-45df45b47e59.png"},{"chain":"matic","title":"Polygon","explorer":"https://polygonscan.com/","icon":"https://cdn.bitkeep.vip/u_b_bbb29890-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_190165b0-f073-11ec-878d-dd4f1d6d4d8d.png"},{"chain":"sol","title":"Solana","icon":"https://cdn.bitkeep.vip/u_b_bbb3aa00-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_2ae46840-f073-11ec-b752-4545d7d7a6c5.png"},{"chain":"ftm","title":"Fantom","icon":"https://cdn.bitkeep.vip/u_b_baeb50f0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_40a95ff0-f073-11ec-b752-4545d7d7a6c5.png"},{"chain":"avax_c","title":"AVAX-C","icon":"https://cdn.bitkeep.vip/u_b_ba4e4da0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_4cd7f750-f073-11ec-b752-4545d7d7a6c5.png"},{"chain":"arbitrum","title":"Arbitrum","icon":"https://cdn.bitkeep.vip/u_b_ba4ee9e0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_5ac4e080-f073-11ec-ab28-2dacbd127ae1.png"},{"chain":"kcs","title":"KCC","icon":"https://cdn.bitkeep.vip/u_b_661aabb0-a693-11ec-9bb2-d529ee665d4d.png","grayIcon":"https://cdn.bitkeep.vip/u_b_72d74aa0-f073-11ec-b59b-cb8601612437.png"},{"chain":"ht","title":"Heco","icon":"https://cdn.bitkeep.vip/u_b_bb0b5c10-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_835761d0-f073-11ec-b59b-cb8601612437.png"},{"chain":"okt","title":"OKX Chain","icon":"https://cdn.bitkeep.vip/u_b_bb808c10-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_94d62450-f073-11ec-86b4-53e272e03a61.png"},{"chain":"trx","title":"Tron","icon":"https://cdn.bitkeep.vip/u_b_bbdaba00-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_a69a7b50-f073-11ec-86b4-53e272e03a61.png"},{"chain":"fuse","title":"Fuse","icon":"https://cdn.bitkeep.vip/u_b_bafc19d0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_0419e040-f074-11ec-86b4-53e272e03a61.png"},{"chain":"one","title":"Harmony","icon":"https://cdn.bitkeep.vip/u_b_5c054600-9acf-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_d106ac60-f078-11ec-b13a-6df09a64a418.png"},{"chain":"boba","title":"BOBA","icon":"https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png","grayIcon":"https://cdn.bitkeep.vip/u_b_25281860-f074-11ec-86b4-53e272e03a61.png"},{"chain":"klay","title":"KLAY","icon":"https://cdn.bitkeep.vip/u_b_bb3c3010-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_3390c140-f074-11ec-86b4-53e272e03a61.png"},{"chain":"optimism","title":"Optimism","icon":"https://cdn.bitkeep.vip/u_b_bb999250-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_3b761630-f074-11ec-86b4-53e272e03a61.png"},{"chain":"kai","title":"KardiaChain","icon":"https://cdn.bitkeep.vip/u_b_42900030-dd6d-11ec-a0b5-f7bd232e861e.png","grayIcon":"https://cdn.bitkeep.vip/u_b_deaaccc0-f078-11ec-b13a-6df09a64a418.png"},{"chain":"eos","title":"EOS","icon":"https://cdn.bitkeep.vip/u_b_bab796c0-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_5cae6b90-f074-11ec-86b4-53e272e03a61.png"},{"chain":"wax","title":"WAX","icon":"https://cdn.bitkeep.vip/u_b_bbfb1340-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_69539280-f074-11ec-86b4-53e272e03a61.png"},{"chain":"near","title":"NEAR","icon":"https://cdn.bitkeep.vip/u_b_bb6a9310-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_73d34160-f074-11ec-86b4-53e272e03a61.png"},{"chain":"iost","title":"IOST","icon":"https://cdn.bitkeep.vip/u_b_bb2ec290-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_e7f41e80-f078-11ec-b13a-6df09a64a418.png"},{"chain":"luna","title":"Terra","icon":"https://cdn.bitkeep.vip/u_b_bbca8d60-9afd-11ec-aac8-bf8a172584ab.png","grayIcon":"https://cdn.bitkeep.vip/u_b_a2335b30-f074-11ec-86b4-53e272e03a61.png"},{"chain":"czz","title":"ClassZZ","icon":"https://cdn.bitkeep.vip/u_b_11664430-a810-11eb-9f5e-d184ba33d3a3.png","grayIcon":"https://cdn.bitkeep.vip/u_b_bf7cc320-f074-11ec-86b4-53e272e03a61.png"},{"chain":"cmp","title":"Caduceus","icon":"https://cdn.bitkeep.vip/u_b_6f4023e0-c4b2-11ec-aa57-411cc0b3f4cb.png","grayIcon":"https://cdn.bitkeep.vip/u_b_b7a550e0-f074-11ec-86b4-53e272e03a61.png"},{"chain":"true","title":"TRUE","icon":"http://cdn.bitkeep.vip/u_b_802aefa0-a811-11eb-9f5e-d184ba33d3a3.png","grayIcon":"https://cdn.bitkeep.vip/u_b_b8581870-f21c-11ec-9ebd-dbf9091edbd7.png"},{"chain":"vlx","title":"Velas","icon":"https://cdn.bitkeep.vip/u_b_4427cf90-69f0-11ec-9d26-85f1b63f7fbd.png","grayIcon":"https://cdn.bitkeep.vip/u_b_d2ad94c0-f21c-11ec-9ebd-dbf9091edbd7.png"},{"chain":"celo","title":"CELO","icon":"https://cdn.bitkeep.vip/u_b_4f8a0620-e8ab-11ec-8e86-53798d1a9b70.png","grayIcon":"https://cdn.bitkeep.vip/u_b_4d852420-f21c-11ec-9ebd-dbf9091edbd7.png"},{"chain":"crol2","title":"Cronos","icon":"https://cdn.bitkeep.vip/u_b_181780d0-dd6d-11ec-a0b5-f7bd232e861e.png","grayIcon":"https://cdn.bitkeep.vip/u_b_60fef350-f21c-11ec-9ebd-dbf9091edbd7.png"},{"chain":"bch","title":"smartBCH","icon":"https://cdn.bitkeep.vip/u_b_b4efbf80-e8ad-11ec-8e86-53798d1a9b70.png","grayIcon":""},{"chain":"xdai","title":"xDAI","icon":"https://cdn.bitkeep.vip/u_b_07682f10-e8ac-11ec-8e86-53798d1a9b70.png","grayIcon":"https://cdn.bitkeep.vip/u_b_0ed1cf80-f21c-11ec-9ebd-dbf9091edbd7.png"},{"chain":"vs","title":"Vision","icon":"https://cdn.bitkeep.vip/u_b_6245d440-dd6d-11ec-a0b5-f7bd232e861e.png","grayIcon":"https://cdn.bitkeep.vip/u_b_f80504c0-f21b-11ec-9ebd-dbf9091edbd7.png"},{"chain":"cube","title":"CUBE","icon":"https://cdn.bitkeep.vip/u_b_53c39ee0-e8b0-11ec-8e86-53798d1a9b70.png","grayIcon":"https://cdn.bitkeep.vip/u_b_77e5fcd0-f21c-11ec-9ebd-dbf9091edbd7.png"}],"chain":[{"id":"matic","title":"Polygon","icon":"https://cdn.bitkeep.vip/u_b_bbb29890-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"sol","title":"Solana","icon":"https://cdn.bitkeep.vip/u_b_d0b0db20-e622-11eb-95e8-39ff5e1a4a45.png","type":"chain"},{"id":"bnb","title":"BSC","type":"chain","icon":"https://cdn.bitkeep.vip/u_b_ba4ec2d1-9afd-11ec-aac8-bf8a172584ab.png","default":true},{"id":"ht","title":"HECO","type":"chain","icon":"https://cdn.bitkeep.vip/u_b_bb0b5c10-9afd-11ec-aac8-bf8a172584ab.png","default":true},{"id":"eth","title":"ETH","type":"chain","icon":"https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png","default":true},{"id":"okt","title":"OEC","icon":"https://cdn.bitkeep.vip/u_b_bb808c10-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"trx","title":"TRON","icon":"https://cdn.bitkeep.vip/u_b_bbdaba00-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"iost","title":"IOST","icon":"https://cdn.bitkeep.vip/u_b_bb2ec290-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"luna","title":"Terra","icon":"https://cdn.bitkeep.vip/u_b_bbca8d60-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"wax","title":"WAX","icon":"https://cdn.bitkeep.vip/u_b_bbfb1340-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"ftm","title":"Fantom","icon":"https://cdn.bitkeep.vip/u_b_baeb50f0-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"arbitrum","title":"Arbitrum","icon":"https://cdn.bitkeep.vip/u_b_ba4ee9e0-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"avax_c","title":"AVAX-C","icon":"https://cdn.bitkeep.vip/u_b_ba4e4da0-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"eos","title":"EOS","icon":"https://cdn.bitkeep.vip/u_b_bab796c0-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"near","title":"NEAR","icon":"https://cdn.bitkeep.vip/u_b_bb6a9310-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"fuse","title":"FUSE","icon":"https://cdn.bitkeep.vip/u_b_bafc19d0-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"klay","title":"KLAY","icon":"https://cdn.bitkeep.vip/u_b_bb3c3010-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"optimism","title":"Optimism","icon":"https://cdn.bitkeep.vip/u_b_bb999250-9afd-11ec-aac8-bf8a172584ab.png","type":"chain"},{"id":"czz","title":"CZZ","icon":"http://cdn.bitkeep.vip/u_b_360d4bd0-a752-11eb-9f5e-d184ba33d3a3.png","type":"chain"},{"id":"one","title":"ONE","icon":"http://cdn.bitkeep.vip/u_b_49c7f700-b568-11eb-ba28-9912f032d29b.webp","type":"chain"},{"id":"kcs","title":"KCS","icon":"https://cdn.bitkeep.vip/u_b_661aabb0-a693-11ec-9bb2-d529ee665d4d.png","type":"chain"},{"id":"boba","title":"BOBA","icon":"https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png","type":"chain"},{"id":"kai","title":"KAI","icon":"https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png","type":"chain"},{"id":"cmp","title":"CMP","icon":"https://cdn.bitkeep.vip/u_b_6f4023e0-c4b2-11ec-aa57-411cc0b3f4cb.png","type":"chain"}],"tags":[{"id":"DeFi","title":"DeFi","type":"tag","default":true},{"id":"NFT","title":"NFT","type":"tag","default":true},{"id":"Bridge","title":"Bridge","type":"tag"},{"id":"Exchange","title":"Exchange","type":"tag"},{"id":"Tools","title":"Tools","type":"tag"},{"id":"Game","title":"GameFi","type":"tag"},{"id":"Market","title":"Market","type":"tag"},{"id":"Social","title":"Social","type":"tag"},{"id":"Lending","title":"Lending","type":"tag"},{"id":"Airdrop","title":"Airdrop","type":"tag"}]},"keywords":["Uniswap","Pancake","Opensea","Quickswap","Sunswap","Raydium","Mdex"],},
}
export const state = () => ({
  ...Initstate
})
export const getters = {
  gettersIsPC: (state) => {
    return state.IsPC
  },
  locale(state){
    return state.locale
  },
  supportedlanguages(state){
    return state.Supportedlanguages
  },
  GetTheme(state){
    return state.theme
  },
}

export const mutations = {
  changeIsPC(state, option) {
    state.isPC = option
  },
  setHeaderDownloadTipsIsShow(state, option) {
    state.headerDownloadTipsIsShow = option;
  },
  changeisMobile(state, option) {
    state.isMobile = option
  },
  changeTheme(state, option){
    state.theme = option
  },
  //header 连接钱包
  changeLocal(state, option) {
    console.log("changeLocal", option)
    state.locale = option
    initVueI18n().locale = option
  },
  changeAddress(state, option) {
    state.address = option
  },
  changeChainId(state, option) {
    state.chainId = option
  },
  changeWalletID(state, option) {
    state.WalletID = option
  },
  //Dapp
  setGetDappConfig(state, option) {
    state.GetDappConfig = option
  },
  changeIno(state,option){
    state.CurrentIno = option
  },
  setRate(state, option) {
    state.rates[option.coin] = option.price
  },
  setIscom(state, option) {
    state.hostIsCom = option
  },
  hostChange(state, option) {
    state.hostChange = option
  },
  addlanguage(state, option){
    state.addlanguage = option
  },
  isReptile(state, option){
    state.SeoReptile = option
  },
  SET_ISBitkeep(state, params){
    state.isBitkeep = params;
  },
}
export const actions = {
  nuxtServerInit({ commit, state}, ctx) {
    // 初始化数据到store中
    const { req,redirect } = ctx;
    let userAgentInfo = req.headers['user-agent'];
    const  isGoogleSearch =/Googlebot|Bingbot|Yahoo|slurp/i.test(userAgentInfo)
    commit('isReptile', isGoogleSearch)
    if(req.url=='/'){
      let locale;
      try {
        const AcceptLanguage = req.headers['accept-language'];
        locale = AcceptLanguage ? !state.Supportedlanguages.find(lang => lang == AcceptLanguage.substring(0, 2).toLowerCase()) ? "en" : AcceptLanguage.substring(0, 2).toLowerCase() : "en"
      } catch {
        locale = 'en'
      }
      commit('changeLocal', locale)
    }
    if(req.headers.host.indexOf("192.168")!=-1||req.headers.host.indexOf("localhost")!=-1||req.headers.host.indexOf(".top")!=-1||req.headers.host.indexOf(":8888")!=-1||req.headers.host.indexOf(":8022")!=-1){
       commit("setIscom", true);
    }else{
      if(req.headers.host.indexOf(".com")!=-1){
        commit("setIscom", true);
      }else{
        commit("setIscom", false);
      }
    }
    if(req.headers.host.indexOf(".top")!=-1||req.headers.host.indexOf("192.168")!=-1||req.headers.host.indexOf("localhost")!=-1||req.headers.host.indexOf(":8888")!=-1||req.headers.host.indexOf(":8022")!=-1){
      commit("hostChange", '.io');
     }else{
      let host = req.headers.host;
      let hostChange = "."+host.split(".")[1];
      commit("hostChange", hostChange);
    }
    let headerUa=req.headers['user-agent'].toLowerCase();
    if(headerUa.match(/(iphone|ipod|ipad|android)/)){
      commit("changeisMobile", true);
      if(req.url.indexOf("/nft/freeMint")!=-1){
        redirect(302, "https://sharea.bitkeep.asia/FreeMints")
        return false 
    }
    }else{
      commit("changeisMobile", false);
    }

  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
export const strict = false
