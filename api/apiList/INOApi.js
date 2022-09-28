//注意:新增接口需要在proxywhitelist.json 增加服务白名单
const prefix = 'inoApi';
export default axios => ({
    //ino列表
    getINOlist(data, headers) {
        return axios.post(`${prefix}/ino/list`, data, { headers: headers })
    },
    // INO详情
    inoDetail(data, headers) {
        return axios.post(`${prefix}/ino/detail`, data, { headers: headers })
    },
    // ino历史记录
    getInoHistory(data, headers) {
        return axios.post(`${prefix}/ino/getInoHistory`, data, { headers: headers })
    },
    // ino按钮状态
    getInoStatus(data, headers) {
        return axios.post(`${prefix}/ino/getInoStatus`, data, { headers: headers })
    },
    // ino获取tx
    buildNftMintTxs(data, headers) {
        return axios.post(`${prefix}/ino/buildNftMintTxs`, data, { headers: headers })
    }, 
    // 发送广播
    sendDeposit(data, headers) {
        return axios.post(`${prefix}/ino/sendDeposit`, data, { headers: headers })
    },
    // 获取广播状态
    checkInoStatus(data, headers) {
        return axios.post(`${prefix}/ino/checkInoStatus`, data, { headers: headers })
    },
    // Free mint
    getFreeMintInfo(data, headers) {
        return axios.post(`${prefix}/mint/getFreeMintInfo`, data, { headers: headers })
    },
})
