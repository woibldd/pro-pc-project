<template>
  <span>
    <!-- 法币 -->
    <!-- <label>{{symbol}}</label>
    <label>{{value}}</label> -->
    <span
      class="value"
      v-if="ready">${{ displayValue }}</span>
    <span
      class="wait"
      v-else>...</span>
  </span>
</template>

<script>
import bignumber from 'bignumber.js'
import { mapMutations } from 'vuex'
export default {
  name: 'FiatMoney',
  props: ['base', 'value'],
  data() {
    return {
      symbol: '$', 
      scale: '2',
      rate:  0
    }
  },
  watch: {
    base: {
      immediate: true,
      handler() {
        this.fetchRate(this.base)
      }
    }, 
    value: {
      immediate: true,
      handler () {
        this.fetchRate(this.base)
      }
    }
  },
  computed: {
    ready () {
      return this.rate || 0 // this.$store.state.rates && this.$store.state.rates[this.base] 
    },
    baseValue () { 
      return this.rate || 0
      // return this.allRates[this.state.fiatMoney]
    },
    displayValue() {
      // console.log('displayValue')
      const value = bignumber(this.value).times(this.rate)
      let result 
      // if (value.gte(1000) ) {
      //   result = value.toFixed(1)
      // } else if (value.gte(1)) {
      //   result = value.toFixed(2)
      // } else if (value.gt(0)) {
      //   result = value.toFixed(4)
      // } else {
      //   result = '0.00' 
      // }
      if (value.gt(0)) {
        result = value.toFixed(2)
      } else {
        result = '0.00'
      }
      return result
    } 
  },
  methods: {
    ...mapMutations(['setRate']),
    async fetchRate (base='eth') { 
        // console.log('fetchRate', base)
      const params = {
        chain: base,
        symbol: base
      }
      if (this.$store.state.rates[base]) {
        // console.log('asdf')
        // this.rate = this.$store.state.rates[base]
        this.$set(this, 'rate',  this.$store.state.rates[base])
      } else {
        const res = await this.$api.nft.getUnitPrice(params)
        // console.log('fetchRate', res)
        if (res.status == 0) {
          this.setRate({coin: base, price: res.data.unit_price})
          this.rate = res.data.unit_price
          // console.log('fetchRate:',this.$store.state.rates) 
        }
      } 
    }
  }
  
}
</script>