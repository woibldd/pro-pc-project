//注意:新增接口需要在proxywhitelist.json 增加服务白名单
const prefix = 'inoApi';
export default axios => ({
  //1. 创建项目前校验签名
  verifyCollectionAddress(data, headers) {
    return axios.post(`${prefix}/project/verifyCollectionAddress`, data, {headers: headers})
  },
  //2. 查询用户某项目权限
  checkAuthority(data, headers) {
    return axios.post(`${prefix}/project/checkAuthority`, data, {headers: headers})
  },
  //3. 创建项目
  createProject(data, headers) {
    return axios.post(`${prefix}/project/createProject`, data, {headers: headers})
  },
  //4. 删除项目
  removeProject(data, headers) {
    return axios.post(`${prefix}/project/removeProject`, data, {headers: headers})
  },
  //5. 更新项目基础信息
  updateProject(data, headers) {
    return axios.post(`${prefix}/project/updateProject`, data, {headers: headers})
  },
  //6. 获取用户、主链下所有项目信息
  getCollections(data, headers) {
    return axios.post(`${prefix}/project/getCollections`, data, {headers: headers})
  },
  //  获取项目详情 
  getCollectionDetail(data, headers) {
    return axios.post(`${prefix}/project/getCollectionDetail`, data, {headers:headers})
  },
  //7. 创建项目权限
  createAuthority(data, headers) {
    return axios.post(`${prefix}/project/createAuthority`, data, {headers: headers})
  },
  //8. 删除项目权限
  removeAuthority(data, headers) {
    return axios.post(`${prefix}/project/removeAuthority`, data, {headers: headers})
  },
  //9. 更新项目权限
  updateAuthority(data, headers) {
    return axios.post(`${prefix}/project/updateAuthority`, data, {headers: headers})
  },
  //10. 获取项目权限列表
  getAuthorities(data, headers) {
    return axios.post(`${prefix}/project/getAuthorities`, data, {headers: headers})
  },
  //11. 增加项目认证
  createCert(data, headers) {
    return axios.post(`${prefix}/project/createCert`, data, {headers: headers})
  },
  //12. 删除项目认证
  removeCert(data, headers) {
    return axios.post(`${prefix}/project/removeCert`, data, {headers: headers})
  },
  //13. 设置项目版税（增加/更新）
  setRoyalty(data, headers) {
    return axios.post(`${prefix}/project/setRoyalty`, data, {headers: headers})
  },
  //14. 删除项目版税
  removeRoyalty(data, headers) {
    return axios.post(`${prefix}/project/removeRoyalty`, data, {headers: headers})
  },
  //15. 获取打款记录列表
  getRoyaltyRecord(data, headers) {
    return axios.post(`${prefix}/project/getRoyaltyRecord`, data, {headers: headers})
  },
  //16. 获取NFT售出交易记录
  getSaleOrders(data, headers) {
    return axios.post(`${prefix}/project/getSaleOrders`, data, {headers: headers})
  },
  //17. 获取版税柱状图数据
  getRoyaltyChart(data, headers) {
    return axios.post(`${prefix}/project/getRoyaltyChart`, data, {headers: headers})
  },
  //18. 获取用户下合集内出售数量、出售最低价和最高价
  getTransactionPrice(data, headers) {
    return axios.post(`${prefix}/transaction/getTransactionPrice`, data, {headers: headers})
  },  
  handleUpload(data) { 
      return axios.post(`/bitkeep/upload`, data)
  }, 
  getToken(data) {
    return axios.post(`${prefix}/project/getToken`, data)
  }
})