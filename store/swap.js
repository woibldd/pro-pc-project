export const state = () => ({
  paramsData: {},
  coinInfo: {}, // symbol信息
  tradesList: [], // 交易记录
  statAddressList: {}, // 24小时交易地址数
  statTrade: {}, // 24小时资金流向饼图
  statLineData: {}, // 24小时资金流向 echar折线图
  poolList: [], // 资金池
  poolActivityList: [], // 资金池
  iconIndroduce: {}, // 币信息介绍。。。全
  isMobile: false,
  interval: '1min',
  klineData: [],
  themeFlag: true,
  clickOut: false,
  dealdatanav:"dealNav1"
})

export const mutations = {
  Setout(state, option) {
    state.clickOut = false
  },
  setThemeFlag(state, option) {
    state.themeFlag = option
  },
  // K线相关
  setParamsData(state, option) {
    state.paramsData = option
  },
  setTradesList(state, option) {
    state.tradesList = option
  },
  setStatAddressList(state, option) {
    state.statAddressList = option
  },
  setStatTrade(state, option) {
    state.statTrade = option
  },
  setStatLineData(state, option) {
    state.statLineData = option
  },
  setPoolData(state, option) {
    state.poolList = option.list
    state.poolActivityList = option.activityList
  },
  // 切换资金池
  setPoolActivityList(state, option) {
    console.log(option)
    state.poolActivityList = option
  },
  setIconIndroduce(state, option) {
    state.iconIndroduce = option
  },
  setCoinInfo(state, option) {
    state.coinInfo = option
  },
  setMobileFlag(state, option) {
    state.isMobile = option
  },
  setKlineinterval(state, option) {
    state.interval = option
  },
  setKlineData(state, option) {
    state.klineData = option
  },
  setdealdatanav(state, option) {
    state.dealdatanav = option
  }
}
export const actions = {
  nuxtServerInit(store, { app: $cookies }) {
    // 初始化数据到store中
  },
  async CRYCLE_REQUEST({ commit }, params) {
    try {
      const [data1, getCoinIntroduce] = await Promise.all([
        this.$api.swap.getCoinMarket(params), // 币行情接口
        this.$api.swap.getIconIndroduce(params), // 币信息介绍接口
      ])
      if (Number(data1.data.isSpecialty) == 1) {
        const [data2, getPoolData, getTradesList, getStatLineData, getStatAddress, getStatTrade] = await Promise.all([
          this.$api.swap.getCoinInfo(params), // 币信息接口
          this.$api.swap.getPoolData({
            page: 0,
            size: 3,
            ...params
          }),
          this.$api.swap.getTradesList({
            page: 0,
            size: 50,
            ...params
          }),
          this.$api.swap.getStatLineData(params),
          this.$api.swap.getStatAddress(params),
          this.$api.swap.getStatTrade(params)
        ])
        if(data1.status==0&&data2.status==0){
          commit('setCoinInfo', Object.assign(data1.data, data2.data))
        }
        // 资金池接口
        if(getPoolData.status==0){
          commit('setPoolData', getPoolData.data)
        }
        // 交易记录
        if(getTradesList.status==0){
          commit('setTradesList', getTradesList.data.list)
        }
        // 24小时资金流向 echar折线图
        if(getStatLineData.status==0){
          commit('setStatLineData', getStatLineData.data)
        }
        // 24小时交易地址数
        if(getStatAddress.status==0){
          commit('setStatAddressList', getStatAddress.data)
        }
        if(getStatTrade.status==0){
          commit('setStatTrade', getStatTrade.data)
        }
        // 24小时资金流向饼图
      } else {
        // 资金池接口
        commit('setPoolData', {
          list: [],
          activityList: []
        })
        // 交易记录
        commit('setTradesList', [])

        // 24小时资金流向 echar折线图
        commit('setStatLineData', {})
        // 24小时交易地址数
        commit('setStatAddressList', {})
        // 24小时资金流向饼图
        commit('setStatTrade', {})
        if(data1.status==0){
          commit('setCoinInfo', Object.assign(data1.data, getCoinIntroduce.data))
        }
        if(data1.status!=0&&getCoinIntroduce.status==0){
            commit('setCoinInfo', getCoinIntroduce.data)
        }
      }
      // 币信息介绍接口
      if(data1.status==0){
        commit('setIconIndroduce', getCoinIntroduce.data)
      }
    } catch (err) {
      console.log('server request error')
    }
  }
}
export default {
  state,
  mutations,
  actions
}
