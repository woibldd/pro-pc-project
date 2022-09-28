import createPersistedState from 'vuex-persistedstate'
// import Vue from "vue"
export default ({ store }) => {
  createPersistedState({
    storage: localStorage,
    paths: [
      'locale',
      'address',
      'chainId',
      'WalletID',
      'dappStore.favoriteList',
      'dappStore.favoritefinancialList',
      'dappStore.historyList',
      'dappStore.dappSeachValue',
      'CurrentIno',
      'swap.interval'
      // 'swap.poolActivityList',
      // 'swap.poolList',
      // 'swap.statLineData',
      // 'swap.statTrade',
      // 'swap.statAddressList'
    ]
  })(store)
  // Vue.prototype.$store = store
}
