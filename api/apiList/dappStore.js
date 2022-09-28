//注意:新增接口需要在proxywhitelist.json 增加服务白名单
const prefix = 'dappApi'
export default axios => ({
    //dapp配置项接口
    GetDappConfig(data) {
        return axios.post(`${prefix}/config/get`, { language: "en", version: "7.0.9" })
    },
    //通过chain/tag 获取dapp list
    GetDappList(data) {
        return axios.post(`${prefix}/dapp/list`, data)
    },
    //获取dapp浏览记录列表
    GetDapphistoryList(data) {
        return axios.post(`${prefix}/dapp/historyList`, data)
    },
    //获取dapp收藏列表
    GetDappfavoriteList(data) {
        return axios.post(`${prefix}/dapp/favoriteList`, data)
    },
    //dapp添加收藏
    Dappfavorite(data) {
        return axios.post(`${prefix}/dapp/favorite`, data)
    },
    //添加浏览记录
    Dapphistory(data) {
        return axios.post(`${prefix}/dapp/history`, data)
    },
    //推荐应用(dapp首页)
    dappIndex(data) {
        return axios.post(`${prefix}/dapp/dappIndex`, data)
    },
    //dapp搜索查询
    dappSearch(data) {
        return axios.post(`${prefix}/dapp/search`, data)
    },
    //关键词模糊查询
    dappSearchTips(data) {
        return axios.post(`${prefix}/dapp/dappSearchTips`, data)
    },
    //pc理财收藏查询
    favoriteListForPC(data) {
        return axios.post(`${prefix}/dapp/favoriteListForPC`, data,)
    } 
})
