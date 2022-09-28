


import { wallet } from '@/utils/wallet'

export default { 
  methods: {
    async getSignature() { 
      const {address} = this.$store.state 
      try {
        const res = await this.$api.royalties.getToken({address}) 
        console.log(res)
        if (res.status != 0) return {token:null, signature:null, sign_address: null}
        const token = res.data.token
        const signature = await wallet.CheckSign(token, address)
        return {token, signature, sign_address: address}
      } catch (error) {
        return {token:null, signature:null, sign_address: address} 
      }
    }
  }
}