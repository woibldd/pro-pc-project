export default axios => ({
    //获取安卓包版本
    androidVersion(data, headers) {
        return axios.post(`/userApi/config/androidVersion`, data, { headers: headers })
    },
    //空投安卓版本
    airdropDetail(data, headers){
        return axios.post(`/operationApi/airdrop/detail`, data, { headers: headers })
    },
    //BitKeep官方验证渠道
    officialcheckChannel(data, headers){
        return axios.post(`/operationApi/official/checkChannel`, data, { headers: headers })
    },
  })