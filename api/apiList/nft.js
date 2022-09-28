//注意:新增接口需要在proxywhitelist.json 增加服务白名单
// const prefix = 'nftMarketApi';
const prefix = 'inoApi';
const cache = {} 

export default axios => ({
  //1. 获取用户所有合集信息
  getMyCollections(data) {
    return axios.post(`${prefix}/collectionV2/getMyCollections`, data)
  },
  //2. 获取用户所有合集信息
  getMyOrders(data) { 
    // console.log('getMyOrders', headers)
    return axios.post(`${prefix}/collectionV2/getMyOrders`, data)
  },
  getOrderDetail(data) {
    return axios.post(`${prefix}/market/orderDetail`, data)
  },
  //3. 获取兑换美元比率
  getUnitPrice(data) {
    return getCache(`get-unit-price-${data.chain}-${data.symbol}`, () => axios.post(`${prefix}/collectionV2/getUnitPrice`, data), 6e4) 
    // return axios.get(`${prefix}/collectionV2/getUnitPrice`, {params: data})
  },
  //4. 获取交易market_token
  getToken(data) {
    return getCache('get-token', () => axios.post(`${prefix}/marketV2/getToken`, data), 6e5) 
    // return axios.post(`${prefix}/marketV2/getToken`, data)
  },
  //5. 单个订单的取消
  cancelOrder(data) {
    return axios.post(`${prefix}/marketV2/cancelOrder`, data)
  }, 
  //6. 单个订单的确认出售
  confirmSale(data) {
    return axios.post(`${prefix}/marketV2/confirmSale`, data)
  }, 
  //7. 单个订单的出售
  saveSign(data) {
    return axios.post(`${prefix}/marketV2/saveSign`, data)
  }, 
  //8. 分页获取用户某个合集下的NFT
  getMyNft(data) {  
    return axios.post(`${prefix}/collectionV2/getMyNft`, data)
  },
  //9. 批量订单的确认出售（需要真实验证）
  batchConfirmSale(data) {
    return axios.post(`${prefix}/collectionV2/batchConfirmSale`, data)
  }, 
  //10. 批量订单的出售（需要真实验证）
  batchSaveSign(data) {
    return axios.post(`${prefix}/collectionV2/batchSaveSign`, data)
  },  
  //12. 获取矿工费
  getRegisterApprovalFee(data) {
    return axios.post(`${prefix}/collectionV2/getRegisterApprovalFee`, data)
  },  

  //13. 获取用户余额
  getBatch(data) {
    return axios.post(`/userApi/wallet/batch`, {
      "list":[
        {
          "chain":data.chain,
          "address":data.address,
          "contract":[""]
        }
      ],
      "nocache":true,
      "appointCurrency":"usd"
    })
  } 
})


export function getCache(key, promiseGetter, ttl = 0) {
  if (!cache[key] || (cache[key].expired && cache[key].expired < new Date())) {
    cache[key] = {
      promise: promiseGetter(),
      expired: ttl ? +new Date() + ttl : 0
    }
  }
  cache[key].promise.then((res) => {
    if (res.code < 0) {
      rmCache(key)
    }
  })
  return cache[key].promise
}


function rmCache(key) { 
  delete cache[key]
}