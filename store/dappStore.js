
const dappStore = {
  favoriteList: [],
  favoritefinancialList: [],
  historyList: [],
  dappStoreSlide: [
    "Earn",
    "Mine",
    "New",
    "NFT",
    "DeFi",
    "Bridge",
    "Exchange",
    "Tools",
    "GameFi",
    "Lending",
    "Marker",
    "Social",
    "Airdrop",
    "Layer2",
    "Metaverse",
    "Insurance",
  ],
  dappSeachValue: '',
}
export const state = () => ({
  ...dappStore
})
export const getters = {
 
}

export const mutations = {
  //Dapp
  changeFavoriteList(state, option) {
    state.favoriteList = [option, ...state.favoriteList]
  },
  changeFavoritefinancialList(state, option) {
    state.favoritefinancialList = [option, ...state.favoritefinancialList]
  },
  removeFavoriteList(state, option) {
    const { favoriteList } = state
    const newfavoriteList = favoriteList.filter(item => item.id != option.id)
    state.favoriteList = newfavoriteList
  },
  removeFavoritefinancialList(state, option) {
    const { favoritefinancialList } = state
    const newfavoriteList = favoritefinancialList.filter(item => item.id != option.id)
    state.favoritefinancialList = newfavoriteList
  },
  changeHistoryList(state, option) {
    state.historyList = [option, ...state.historyList]
  },
  removeHistoryList(state) {
    state.historyList = []
  },
  changedappSeachValue(state, option){
    state.dappSeachValue = option
  }
}
export const actions = {
  nuxtServerInit({ commit, state }, ctx) {
    // 初始化数据到store中

  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
