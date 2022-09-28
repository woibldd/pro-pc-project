<template>
  <div class="nft-series-item-wrap BG0">
    <div class="item-box pointer" flex="main:justify"  @click="handleClick">
      <div class="item-box-left" flex="main:left cross:center"  >
        <div class="item-logo">
          <img class="item-img" :src="info.nft_icon" alt="">
          <img v-if="ableRemove" @click="handleRemoveClick" class="item-remove" src="@/assets/img/components/nft/series/icon-remove.svg" alt="">
        </div>
        <div class="item-info"  @click="handleClick">
          <div class="nft-name text1">{{info.collection_name}}</div>
          <div class="nft-token text3">
            <span>Token ID: </span>
            <span>#{{info.token_id}}</span>
          </div>
        </div>
      </div>
      <div class="item-box-right" flex="main:right cross:center">
        <div v-if="showPrice">
          <div class="digital-price text1" >
            <!-- <span class="text1">0.32 </span> -->
            <!-- <input ref="myInput" type="text" :precision="4" class="input-price text1" :disabled="!ableEdit" placeholder="0" v-model="info.amount"> -->
            <a-input-number 
              ref="myInput"  
              :min="0" 
              :max="9999999" 
              v-model="amount"
              @change="updateValue($event, 'input')"
              class="input text1"  
              :formatter="limitDecimals"
              :parser="limitDecimals"
              :disabled="!ableEdit"> </a-input-number> 
            <span  class="text1">{{UpperCase(info.symbol)}}</span> 
            <a-tooltip overlayClassName="mytooltip2"  :title="$t('nft.setAll')" > 
              <div v-if="ableBrush" @click="handleBrushClick" class="brush BG3" flex="main:center cross:center">
                <img src="@/assets/img/components/nft/series/icon-brush.svg" alt="">
              </div>
            </a-tooltip>
          </div>
          <div class="fiat-price text3">
            <span> 
              <fiatMoney :base="info.symbol" :value="info.amount"></fiatMoney>
            </span>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import fiatMoney from '@/components/nft/FiatMoney.vue'
export default {
  components: {fiatMoney},
  props: {
    ableEdit: false,
    ableRemove: false,
    ableBrush: false,
    showPrice: false,
    value:{
      type: [String, Number],
      default: null
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    value(newVal) {
      this.amount = newVal
    }
  },
  data() {
    return {
      amount: this.value
    }
  },
  methods: {
    handleRemoveClick() {
      this.$emit('remove')
    },
    handleBrushClick() {
      this.$emit('brush')
    },
    UpperCase(txt='') {
      return txt.toUpperCase()
    },
    handleClick() { 
      this.$nextTick(() => {
        if (this.$refs.myInput) {
          this.$refs.myInput.focus()
        }
      })
    },
    updateValue (value, src) { 
      console.log('updateValue', value)
      this.$emit('input', value)
    },
    limitDecimals(value) {
      const reg = /^(\-)*(\d+)\.(\d\d\d\d).*$/; 
      if(typeof value === 'string') {
          return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
      } else if (typeof value === 'number') {
          return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
      } else {
          return ''
      }
    }

  }
}
</script>

<style lang="less" scoped> 
.nft-series-item-wrap {
  padding: 10px 20px;
  .item-box {
    .item-box-left {
      .item-logo {
        position: relative;
        .item-img {
          width: 64px;
          height: 64px;
        }
        .item-remove {
          position: absolute;
          top: -8px;
          right: -8px;
          height: 16px;
          width: 16px;
        }
      }
      .item-info {
        margin-left: 10px;

      }
    }
    .item-box-right {
      text-align: right;
      .digital-price {
        position: relative;
          line-height: 30px; 
        .input-price {
          // direction: rtl;
          text-align: right;
          width: 100px;
          caret-color: @theme-light-purple;
        }
        .brush {
          display: none;
          position: absolute;
          top: 6px; 
          right: -20px;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .fiat-price {
        max-width: 135px;
        overflow: hidden;
      }
    }
  }
  .ant-input-number {
    border: none;
    box-shadow: none;
    background-color: transparent;
    /deep/ .ant-input-number-handler-wrap {
      display: none!important;
    } 
    /deep/ .ant-input-number-input {
      text-align: right;
    }
  } 
}

.theme-light {
  .nft-series-item-wrap:hover {
    background-color: @theme-light-bg1;
    .brush {
      display: flex!important;
    }
  }
}
.theme-dark {
  .nft-series-item-wrap:hover {
    background-color: @theme-dark-bg1;
    .brush {
      display: flex!important;
    }
  }

}
</style>

<style lang="less"> 
.mytooltip2 {
  white-space: nowrap;
}
</style>