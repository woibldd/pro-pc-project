<template>
  <div class="tags-table">
    <div class="notDataBox" v-if="!loading && showList.length == 0">
      <div v-if="tag == 1">
        <img src="@/assets/img/components/dappStore/collect/light/icons.svg" class="light_icon" alt="">
        <img src="@/assets/img/components/dappStore/collect/dark/icons.svg" class="dark_icon" alt="">
      </div>
      <div v-else>
        <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="">
        <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="">
      </div>
      <div class="text3 notData">{{ $t("SwapHome.noData") }}</div>
    </div>
    <div v-else>
      <div v-if="loading" class="loading-wrap">
        <a-spin style="margin:180px auto">
          <a-icon slot="indicator" type="loading" style="font-size: 32px" spin />
        </a-spin>
      </div>
      <div v-else>
        <div class="coin-header coin-row">
          <div class="title coin-col text3">
            <div>
              <span @click="setTradingSort('coin')">
                <sort color="#01CED1" :sort="true" :label="$t('SwapHome.table.name')"
                  :state="stateTradingSortBy('coin')" />
              </span>
              <span class="small" @click="setTradingSort('vol')">/
                <sort color="#01CED1" :sort="true" :label="$t('SwapHome.table.vol')"
                  :state="stateTradingSortBy('vol')" />
              </span>

            </div>
          </div>
          <div class="title coin-col text3">
            <div @click="setTradingSort('price')">
              <sort color="#01CED1" :sort="true" :label="$t('SwapHome.table.price')"
                :state="stateTradingSortBy('price')" />
            </div>
          </div>
          <div class="title coin-col text3">
            <div @click="setTradingSort('percentNum')">
              <sort color="#01CED1" :sort="true" :label="$t('SwapHome.table.percent')"
                :state="stateTradingSortBy('percentNum')" />
            </div>
          </div>
          <div class="title coin-col text3 large">
            <div @click="setTradingSort('vol')">
              <sort color="#01CED1" :sort="true" :label="$t('SwapHome.table.vol')" :state="stateTradingSortBy('vol')" />
            </div>
          </div>
          <div class="title coin-col text3 large">
          </div>
        </div>
        <div v-for="(item, index) in showList" class="coin-content coin-row" :key="index" @click="gotoSwap(item)">
          <div class="coin-col">
            <a v-show="false" :href='`/${params.language}/swap/${item.chain}/${item.contract || "bitkeep"}`'
              @click.stop="preventDefault">
            </a>
            <div class="collect-box" @click.stop="favorite(item, 'unfollow')" v-if="isFavorite(item)">
              <span class="collect_icon"></span>
            </div>
            <div class="collect-box" @click.stop="favorite(item, 'follow')" v-else>
              <span class="not-collect_icon"></span>
            </div>
            <div class="coin-icon">
              <coinIcon :icon="item.icon" :chainIcon="item.chainIcon" :coinName="item.coin" imgWidth="32px"
                :chainName="item.chain" />
            </div>
            <div class="coin-box">
              <div :title="item.coin" class="coin-name text-bold text1 ellipsis">{{ (item.coin || '').toUpperCase() }}
              </div>
              <div :title="item.name" class="coin-chain text3 ellipsis">{{ item.name }}</div>
            </div>
            <div class="coin-box2">
              <div :title="item.coin" class="coin-name text-bold text1 ellipsis">{{ (item.coin || '').toUpperCase() }}
              </div>
              <div :title="item.volText" class="coin-chain text3 ellipsis">{{ item.volText }}</div>
            </div>
          </div>
          <div class="coin-col">
            <div class="coin-price text-bold text1 ellipsis">{{ item.priceText }}</div>
          </div>
          <div class="coin-col">
            <div class="coin-percent text-bold ellipsis"
              :class="{ up: +item.percentNum >= 0, down: +item.percentNum < 0 }">
              {{ item.percent }}</div>
          </div>
          <div class="coin-col large">
            <div class="coin-vol text-bold text1 ellipsis">{{ (item.volText || '').replace('Vol ', '') || '$0' }} </div>
          </div>
          <div class="coin-col large">
            <div class="coin-vol text-bold Colorpurple pointer">{{ $t('SwapHome.exchange') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sort from './Sort.vue'
import coinIcon from './coinIcon.vue'
import { deepClone } from '@/tools/common'
import { Tooltip } from 'ant-design-vue/lib'
import Vue from 'vue'
Vue.use(Tooltip)
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    tag: {
      type: [String, Number],
      default: 1,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    favoriteList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    coinIcon,
    sort
  },
  data() {
    return {
      isPC: this.$store.state.isPC,
      sorter: '',
      sortBy: '',
      sortState: 0, // 0:不排序 1:降序 2:升序
      params: this.$route.params

    }
  },
  watch: {
    "$store.state.isPC": function (newVal, oldVal) {
      this.isPC = newVal
    },
  },
  computed: {
    showList() {
      let list = []
      let source = deepClone(this.dataSource)
      if (this.tag == 1) {
        source = deepClone(this.favoriteList)
      }
      if (!this.sortState) {
        list = source
      } else {
        list = source.sort((a, b) => {
          if (this.sortState === 1) {
            if (this.sortBy == 'name' || this.sortBy == 'coin') {
              return a[this.sortBy].toUpperCase().charCodeAt(0) - b[this.sortBy].toUpperCase().charCodeAt(0)
            }
            return a[this.sortBy] - b[this.sortBy]
          } else if (this.sortState === 2) {
            if (this.sortBy == 'name' || this.sortBy == 'coin') {
              return b[this.sortBy].toUpperCase().charCodeAt(0) - a[this.sortBy].toUpperCase().charCodeAt(0)
            }
            return b[this.sortBy] - a[this.sortBy]
          }
        })
      }
      return list
    },
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.sorter = sorter.order
      this.sortBy = sorter.col
    },
    async favorite(item, type) {
      const { WalletID } = this.$store.state
      if (WalletID) {
        const res = await this.$api.swap.quoteFavorite({
          status: type,
          chain: item.chain,
          coin: item.coin,
          contract: item.contract
        })
        if (res.status == 0) {
          if (type == "follow") {
            item.isFavorite = true
            this.$message.success(this.$t("DappStore.collect.collectSuccess"));
          } else {
            item.isFavorite = false
            this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
          }
          this.$emit('favoriteChange')
        }
      } else {
        this.$message.warning(this.$t('SwapHome.connectWalletAlert'))
      }
    },
    gotoSwap(item) {
      let Action_Location_Name;
      switch (this.tag) {
        case 1:
          Action_Location_Name = "Favorite"
          break;
        case 2:
          Action_Location_Name = "HOT"
          break;
        case 3:
          Action_Location_Name = "TopGainers"
          break;
        case 4:
          Action_Location_Name = "TopLosers"
          break;
        case 5:
          Action_Location_Name = "New"
          break;
        case 6:
          Action_Location_Name = "Mainnet"
          break;
        case 7:
          Action_Location_Name = "EthereumECO"
          break;
        case 8:
          Action_Location_Name = "PolygonECO"
          break;
        case 9:
          Action_Location_Name = "NFTS"
          break;
        case 10:
          Action_Location_Name = "Lending"
          break;
        case 11:
          Action_Location_Name = "DAO"
          break;
        default:
          Action_Location_Name = "HOT"
          break;
      }
      this.$Ta.track({
        name: 'Bitkeep__Swap_Page', data: {
          Action_Location_Type: 'tab',
          Action_Location_Id: this.tag,
          Action_Location_Name: Action_Location_Name,
          Action_Sub_Name: item.coin.toUpperCase(),
          Action_Sub_Id: item.contract ? item.contract : 'bitkeep'
        }
      })
      const { language } = this.$route.params
      let routeUel = this.$router.resolve({
        path: `/${language}/swap/${item.chain}/${item.contract || 'bitkeep'}`
      })
      window.open(`/${language}/swap/${item.chain}/${item.contract || 'bitkeep'}`, '_blank')
    },
    setTradingSort(key) {
      if (this.sortBy === key) {
        this.sortState = (this.sortState + 1) % 3
      } else {
        this.sortBy = key
        this.sortState = 1
      }
    },
    stateTradingSortBy(key) {
      if (key !== this.sortBy) {
        return 0
      } else {
        return this.sortState
      }
    },
    isFavorite(item) {
      const fa = this.favoriteList.find(f => {
        return f.coin.toUpperCase() == item.coin.toUpperCase() && f.chain == item.chain && item.contract == f.contract
      })

      return !!fa
    },
    preventDefault(path, event) {
      if (event && event.preventDefault)
        event.preventDefault();
      else
        window.event.returnValue = false; //兼容IE8
    }

  }
}
</script>


<style lang="less" scoped>
.tags-table {
  .coin-row {
    display: flex;
    padding: 0 20px;
    min-height: 60px;

    &.coin-header {
      height: 30px;
      line-height: 30px;
      min-height: 30px;
    }

    .coin-col {
      display: flex;
      flex: 1;
      align-items: center;

      &:not(:first-child) {
        text-align: right;
        justify-content: flex-end;
      }

      &:first-child {
        flex-basis: 150px;
      }

      &:nth-child(2) {
        flex: .6;
      }

      .text-bold {
        font-size: 16px;
        font-weight: 500;
      }

      &:last-child {
        .coin-vol {
          font-size: 16px;
        }
      }

      .coin-icon {
        margin-left: 11px;
      }

      .coin-name {
        max-width: 120px;
        font-size: 16px;
        margin-right: 10px;
      }

      .coin-price,
      .coin-vol {
        max-width: 180px;
        letter-spacing: -1px;
      }

      .coin-chain {
        max-width: 150px;
        white-space: nowrap;
        font-size: 14px !important;
        font-weight: 300 !important;
      }

      .icon-percent {
        white-space: nowrap;
        font-size: 11px;
      }

      .coin-percent {
        letter-spacing: -1px;

        &.up {
          color: #1BC89E;
        }

        &.down {
          color: #F36464;
        }

      }

      .coin-box {
        align-items: center;
      }
    }
  }

  .collect-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    text-align: center;

    &:hover {
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
      width: 13px;
      height: 13px;
      cursor: pointer;
      background-size: 100% 100%;
    }

    .collect_icon {
      background: url(../../assets/img/components/market/collect.svg) no-repeat;
      background-size: 100% 100%;
    }

  }

  .notDataBox {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .notData {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  .loading-wrap {
    display: flex;
    justify-content: center;
    align-self: center;
  }

  .ellipsis {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

@media screen and (max-width: 1400px) and (min-width:831px) {
  .tags-table {
    .coin-row {
      .coin-col {
        .coin-name {
          max-width: 80px;
        }

        .coin-chain {
          max-width: 100px;
        }

        .coin-price,
        .coin-vol {
          max-width: 120px;
        }

        .coin-percent {
          max-width: 120px;
        }
      }
    }

    .ellipsis {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      font-size: 14px;
    }
  }
}


@media screen and (min-width: 831px) {
  .coin-box {
    display: flex;
  }

  .coin-box2 {
    display: none;
  }

  .small {
    display: none !important;
  }
}

@media screen and (max-width: 830px) {
  .coin-box {
    display: none;
  }

  .coin-box2 {
    display: block;
  }

  .large {
    display: none !important;
    ;
  }

  .tags-table {
    .coin-row {
      .coin-col {
        &:first-child {
          flex-basis: 100px;
        }

        &:not(:first-child) {
          flex: 1;
        }

        .text-bold {
          font-size: 14px;
        }

        .coin-name {
          max-width: 100px;
        }

        .coin-chain {
          font-size: 12px !important;
          max-width: 100px;
        }

        .coin-price {
          max-width: 80px;
        }

        .coin-percent {
          max-width: 70px;
        }

        white-space: nowrap;
      }
    }

    .ellipsis {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      // font-size: 14px;
    }
  }
}
</style>
