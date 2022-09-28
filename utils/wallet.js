import eventemitter3 from 'eventemitter3'
class Wallet extends eventemitter3 {
  constructor() {
    super()
    this._accounts = []
    this._chainId = 0
    this._walletPlatform = 'bitkeep'
  }
  transfer16(val = 0) {
    val = isNaN(Number(val)) ? 1 : Number(val);
    return "0x" + val.toString(16);
  }
  // 是否安装 bitkeep 钱包
  isInstall() {
    const isInstalled = !!window.ethereum && !!window.isBitKeep;
    !isInstalled && console.warn("no installed bitkeep")
    return isInstalled;
  }

  // 是否连接中
  isConnected(isBitKeep) {
    return window.ethereum && isBitKeep? window.bitkeep.ethereum.selectedAddress : window.ethereum.selectedAddress
  }

  // 连接钱包
  async connect(isBitKeep) {
    console.log('connect')
    const Accounts = window.ethereum && isBitKeep?await window.bitkeep.ethereum.request({ method: 'eth_requestAccounts' }):await window.ethereum.request({ method: 'eth_requestAccounts' })
    this.initEvent(isBitKeep)
    return Accounts[0]
  }

  // 切换地址
  selectedAddress(isBitKeep) {
    return window.ethereum && (isBitKeep?window.bitkeep.ethereum.selectedAddress:window.ethereum.selectedAddress)
  }

  // 获取钱包信息
  getWalletInfo() {
    return {
      address: window.ethereum && window.ethereum.selectedAddress,
      chainName: window.ethereum && window.ethereum.chainName || 'eth',
      chainId: window.ethereum && window.ethereum.chainId || '1',
      walletId: "",
      walletPlatform: this.getWalletPlatform(),
    };
  }

  //获取钱包账号ID
  async getWalletID() {
    return window.selectedAccount && window.selectedAccount.id;
  }

  // 获取 chain ID
  async getChainId(isBitKeep) {
    return window.ethereum && (isBitKeep?window.bitkeep.ethereum.request({ method: "eth_chainId" }):window.ethereum.request({ method: "eth_chainId" }));
  }

  // 切换 chain ID
  async switchChainId(chainId, address,isBitKeep) {
    if (!address) {
      const [nAddress] = await this.getAccounts();
      address = nAddress;
    }
    return window.ethereum ? (isBitKeep ? window.bitkeep.ethereum.request({ method: "wallet_addEthereumChain", params: [{ chainId: this.transfer16(chainId) }, address] }) : window.ethereum.request({ method: "wallet_addEthereumChain", params: [{ chainId: this.transfer16(chainId) }, address] })):'';
  }

  // 获取余额
  async getBalance(chainId, address,isBitKeep) {
    if (!address) {
      const [nAddress] = await this.getAccounts();
      address = nAddress;
    }
    return window.ethereum ? (isBitKeep ? window.bitkeep.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] }) : window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })):'';
  }

  async CheckSign(dataToSign, address) {
    console.log(dataToSign, address, 'dataToSign, addressdataToSign, addressdataToSign, address')
    return await window.bitkeep.ethereum.request({ method: "personal_sign", params: [dataToSign,address],from: address})
  }


  // 签名
  async Sign(txs, address) {
    console.log(txs, "dataToSign, addressdataToSign, addressdataToSign, address");
    return await  window.bitkeep.ethereum._post("dappsSign", txs);;
  }


  async MultSign(txs) {
    // return await window.bitkeep.request('bit_sign', [{transaction: txs, type: "evm"}])
    //  const res =  await window.bitkeep.request('bit_sign', [txs])
    // console.log('MultSignMultSignMultSignMultSignMultSign')
    return await window.bitkeep.signTransaction(txs)
    //  console.log('MultSign', res)
  }

  async MultPersonalSign(sign) {
    return await window.bitkeep.personalSign(sign)
  }

  async CheckSign(dataToSign, address) {
    console.log(dataToSign, address, 'dataToSign, addressdataToSign, addressdataToSign, address')
    return await window.bitkeep.ethereum.request({ method: "personal_sign", params: [dataToSign,address],from: address})
  }




  // 获取钱包标识
  getWalletPlatform() {
    return this._walletPlatform;
  }

  // 获取钱包账号
  async getAccounts(isBitKeep) {
    return window.ethereum ? (isBitKeep ? window.bitkeep?.ethereum?.request({ method: "eth_accounts" }) : window.ethereum?.request({ method: "eth_accounts" })) : [];
  }


  initEvent(isBitKeep) {
    if(isBitKeep){
      window.bitkeep.ethereum.removeAllListeners && window.bitkeep.ethereum.removeAllListeners()
      window.bitkeep.ethereum.on('accountsChanged', async (...arg) => {
        this.emit('accountsChanged', ...arg)
      })
      window.bitkeep.ethereum.on('chainChanged', async (...arg) => {
        this.emit('chainChanged', ...arg)
      })
    }else{
      window.ethereum.removeAllListeners && window.ethereum.removeAllListeners()
      window.ethereum.on('accountsChanged', async (...arg) => {
        this.emit('accountsChanged', ...arg)
      })
      window.ethereum.on('chainChanged', async (...arg) => {
        this.emit('chainChanged', ...arg)
      })
    }

  }
}

export const wallet = new Wallet()
