//注意:新增接口需要在proxywhitelist.json 增加服务白名单
import Vue from 'vue'
Vue.prototype.$cancelList=[]
const prefix = 'marketApi'
export default axios => ({
  // k线数据接口
  getKLineData(data) {
    return axios.post(`${prefix}/quotev2/getKline`, data,
    {
      cancelToken: new axios.CancelToken(function executor(c) {
        Vue.prototype.$cancelList.push(c)
      })
    })
  },
  // 获取某币行情信息
  getCoinMarket(data) {
    return axios.post(`${prefix}/quotev2/getTokenMarket`, data)
  },
  // 获取某币信息-24小时高低成交量
  getCoinInfo(data) {
    return axios.post(`${prefix}/quotev2/getCoin`, data)
  },
  // 获取交易记录
  getTradesList(data) {
    return axios.post(`${prefix}/quotev2/getTrades`, data)
  },
  // 24小时交易地址数
  getStatAddress(data) {
    return axios.post(`${prefix}/quotev2/getStatAddress`, data)
  },
  // 24小时资金流向饼图
  getStatTrade(data) {
    return axios.post(`${prefix}/quotev2/getStatTrade`, data)
  },
  // 24小时资金流向 echar折线图
  getStatLineData(data) {
    return axios.post(`${prefix}/quotev2/getPoolData`, data)
  },
  // 资金池接口
  getPoolData(data) {
    return axios.post(`${prefix}/quotev2/getPool`, data)
  },
  // 币信息介绍
  getIconIndroduce(data) {
    return axios.post(`${prefix}/quotev2/coinInfo`, data)
  },
  // 币行情首页 
  getQuoteRecommend(data) {
    return axios.post(`${prefix}/quotev2/quoteWebRecommend`, data)
  },
  //行情页面查询
  getQuoteSearchValue(data) {
    return axios.post(`${prefix}/quotev2/searchV2`, data)
  },
  //行情页面查询窗口默认展示
  getQuoteSearchSummary(data) {
    return axios.post(`${prefix}/quotev2/searchSummary`, data)
  },
  //收藏
  quoteFavorite(data) {
    return axios.post(`${prefix}/quotev2/favorite`, data)
  },
  //收藏列表
  quoteFavoriteList(data) {
    return axios.post(`${prefix}/quotev2/favoriteList`, data)
  },
  //热门
  quoteHotList(data) {
    return axios.post(`${prefix}/quotev2/getQuoteListByTag`,data)
  },
  //最大涨幅
  quoteChangeTop(data) {
    return axios.post(`${prefix}/quotev2/changeTop`,data)
  }, 
   
})
