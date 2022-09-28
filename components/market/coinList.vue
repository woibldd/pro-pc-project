<template>
  <div class="coin-list">
    <div class="coin-header coin-row">
      <div class="title coin-col text3 InterR">
        {{ $t('SwapHome.table.name') }}
      </div>
      <div class="title coin-col text3 InterR">
        {{ `${$t('SwapHome.table.price')}/${$t('SwapHome.table.percent2')}` }}
      </div>
      <div class="title coin-col text3 InterR" v-if="isPC">
        {{ $t('SwapHome.table.vol') }}
      </div>
    </div>
    <div v-for="(item, index) in dataList" class="coin-content coin-row" :key="index" @click="gotoTrade(item)">
      <div class="coin-col">
        <div>
          <a v-show="false" :href='`/${params.language}/swap/${item.chain}/${item.contract?item.contract:"bitkeep"}`'
            @click="preventDefault('', $event)">
          </a>
          <div class="collect-box" @click.stop="favorite(item, 'unfollow')" v-if="item.isFavorite">
                <span class="collect_icon"></span>
              </div>
              <div class="collect-box" @click.stop="favorite(item, 'follow')" v-else>
                <span class="not-collect_icon"></span>
              </div>
        </div>
        <div class="coin-icon">
          <coinIcon :icon="item.icon" :chainIcon="item.chainIcon" :coinName="item.coin" :chainName="item.chain" imgWidth="24px" chaincionWidth="14px" />
        </div>
        <div>
          <div class="coin-name text-bold text1" :title="item.coin">{{ (item.coin || '').toUpperCase() }}</div>
          <div class="coin-chain text3 InterR" :title="item.name">{{ item.name }}</div>
        </div>
      </div>
      <div class="coin-col">
        <div>
          <div class="coin-price text-bold text1 ellipsis">{{ item.priceText }}</div>
          <div class="coin-percent ellipsis InterR" :class="{ up: +item.percentNum >= 0, down: +item.percentNum < 0 }">
            {{ item.percent }}</div>
        </div>
      </div>
      <div class="coin-col col-last" v-if="isPC">
        <div class="coin-vol text-bold text1 ellipsis">{{ (item.volText || '').replace('Vol ', '') || '$0' }} </div>
      </div>
    </div>
  </div>
</template>


<script>
import coinIcon from './coinIcon.vue'
export default {
  data() {
    return {
      isPC: this.h5style?!this.h5style:this.$store.state.isPC,
      params: this.$route.params
    }
  },
  props: {
    dataList: {
      type: Array,
      default: () => { }
    },
    h5style:{
			type: Boolean,
      default: false
		}
  },
  components: {
    coinIcon
  },
  watch: {
    "$store.state.isPC": function (newVal, oldVal) {
      if(!this.h5style){
				this.isPC = newVal
			}
    },
  },
  methods: {
    favorite(item, type) {
      this.$emit('favorite', { item, type })
    },
    gotoTrade(item) {
      console.log(item)
      this.$emit('gotoSwap', item)
    },
    preventDefault(path, event) {
      if (event && event.preventDefault)
        event.preventDefault();
      else
        window.event.returnValue = false; //兼容IE8
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
.coin-list {
  padding-bottom: 50px;

  .coin-row {
    display: flex;
    padding: 0 14px;
    min-height: 60px;

    &.coin-header {
      height: 30px;
      line-height: 30px;
      min-height: 30px;
    }

    .coin-col {
      display: flex;
      flex: 1;
      flex-shrink: 0;
      align-items: center;
      font-size: 12px;
      font-weight: 500;

      &:not(:first-child) {
        text-align: right;
        justify-content: flex-end;
      }

      .text-bold {
        font-size: 12px;
        font-weight: 500;
      }

      &:nth-child(1) {
        flex: 1;
        max-width: 140px;
        font-weight: 400;
      }

      &:last-child {
        flex: 1;
        font-weight: 400;
      }

      .coin-icon {
        margin-left: 5px;
      }

      .coin-name {
        white-space: nowrap;
        font-size: 14px;
				line-height: 1.3;
        width: 70px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .coin-chain {
        white-space: nowrap;
        font-weight: 500;
				line-height: 1.2;
        width: 70px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;

      }
      @media screen and (min-width: 430px) {
        .coin-name {
          width: 90px;
        }
        .coin-chain{
          width: 90px;
        }
      }
      .coin-percent {
        font-weight: 400;
        &.up {
          color: #1BC89E;
        }

        &.down {
          color: #F36464;
        }

      }

      .ellipsis {
        white-space: nowrap;
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .collect-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    text-align: center;

    &:hover {
      /* Light/bg3 */
      // border-color: #E5E3E9;
      border-radius: 2px;
    }

    .not-collect_icon {
      display: block;
      width: 16px;
      height: 16px;
      cursor: pointer;
      background-size: 100% 100%;
    }

    .collect_icon {
      display: block;
      width: 14px;
      height: 14px;
      cursor: pointer;
      background-size: 100% 100%;
    }

    .collect_icon {
      background: url(../../assets/img/components/market/collect.svg) no-repeat;
      background-size: 100% 100%;
    }

  }


}


.theme-light {
  .coin-content:hover {
    background-color: @theme-light-bg1;
  }


  .not-collect_icon {
    background: url(../../assets/img/components/market/no-collect.svg) no-repeat;
    background-size: 100% 100%;
  }
}

.theme-dark {
  .coin-content:hover {
    background-color: @theme-dark-bg1;
  }

  .not-collect_icon {
    background: url(../../assets/img/components/market/no-collect-dark.svg) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
