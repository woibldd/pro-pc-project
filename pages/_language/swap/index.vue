<template>
  <div class="market-content">
    <div class="title" v-click-outside="closeH5Search">
      <div class="title-left">
        <h1 class="text1 title-text" :title="$t('SwapHome.title')">{{ $t('SwapHome.title') }}</h1>
      </div>
      <div class="title-right">
        <marketSearch v-show="isPC" :h5style="false" @favoriteChange="handleFavoriteChange"></marketSearch>
        <div class="mobilesearch" @click="showSearch">
          <img src="~/assets/img/swap/light/search_icons.svg" alt="btn" class="dark_icon">
          <img src="~/assets/img/swap/dark/search_icons.svg" alt="btn" class="light_icon">
          <!-- <img src="@/assets/img/components/market/nav_light_search.svg" class="nav_search_light light_icon"
            alt="nav_search">
          <img src="@/assets/img/components/market/nav_dark_search.svg" class="nav_search_dark dark_icon"
            alt="nav_search"> -->
        </div>
      </div>
      <div class="search-box-h5 BG0" v-if="!isPC">
        <marketSearch v-show="h5searchshow" @favoriteChange="handleFavoriteChange" :isDrawer="true" :setfocus="true"
          @close="closeH5Search"></marketSearch>
      </div>
    </div>
    <div class="view-list">
      <div class="cardlist pc">
        <quote-view class="pointer" v-for="(item, index) in views" v-if="index < 6" :key="item.name" :coinData="item"
          :delta="item.percentNum" @gotoSwap="quoteviewTA(item)" />
      </div>
      <div class="cardlist mobile">
        <quote-view class="pointer" v-for="(item, index) in views" v-if="index < 3" :key="item.name" :coinData="item"
          :delta="item.percentNum" @gotoSwap="quoteviewTA(item)" />
      </div>
    </div>
    <div class="recommend-list">
      <div class="cardlist">
        <recommend-card v-for="item in recommendType" :key="item.title" @gotoSwap="recommendcard"
          :title="$t(`SwapHome.recommendType.${item.id}`)" :list="item.list" :Type="item.id" />
      </div>
    </div>
    <div class="tags-list">
      <div class="tags-label-list">
        <a-affix :offset-top="offsetTop" :style='{ "width": "100%", "z-index": affixZindex }' @change="affixtop">
          <verticalScroll :dataLength="tags.length" :showIcon.sync="showScrollIcon" #content="{ slotClick }"
            :verticaispc="isPC" style="z-index:102" :height='isPC ? "60px" : "37px"'>
            <div class="tag-label item-label" v-for="item in tags" :key="item.id"
              :class="{ active: activeTag.id === item.id }" :title="item.name" @click="handleClickTag(item)">
              <label v-if="item.id == 1" class="icon">
                <img v-if="activeTag.id == 1" src="@/assets/img/components/market/header-collect.svg" alt="">
                <img v-else src="@/assets/img/components/market/header-no-collect.svg" alt="">
              </label>
              <label class="name text2">
                {{ item.name }}
              </label>
            </div>
          </verticalScroll>
        </a-affix>
      </div>
      <div class="tags-table">
        <tag-table :dataSource="activeTag.list" :tag="activeTag.id" @favoriteChange="handleFavoriteChange"
          :loading="loading" :favoriteList="favoriteList"></tag-table>
      </div>
    </div>
  </div>
</template>

<script>
import { GetQueryString } from '../../../tools/common'
import quoteView from '@/components/market/quoteView'
import recommendCard from '@/components/market/recommendCard'
import tagTable from '@/components/market/tagTable'
import marketSearch from '@/components/market//marketSearch.vue'
import verticalScroll from '@/components/market/verticalScroll.vue'
import ClickOutside from 'vue-click-outside'
import { Drawer } from 'ant-design-vue'
import Affix from 'ant-design-vue/lib'
import Vue from 'vue'
Vue.use(Affix)
Vue.use(Drawer)

export default {
  layout: 'swapQuota/default',
  name: 'MarketPage',
  scrollToTop: true,
  async asyncData(app) {
    const res = await app.$api.swap.getQuoteRecommend()
    const recommendType = [
      { id: 0, title: '热门币种', list: [] },
      { id: 1, title: '最新币种', list: [] },
      { id: 2, title: '最大涨幅币种', list: [] },
      { id: 3, title: '最高交易量币种', list: [] },
    ]
    const reslist = await Promise.all([
      app.$api.swap.getQuoteSearchSummary(),
      app.$api.swap.quoteHotList({ tag: "New" }),
      app.$api.swap.quoteChangeTop({ type: "gainers" }),
      app.$api.swap.quoteFavoriteList()
    ])

    recommendType[0].list = reslist[0].data.hot
    recommendType[1].list = reslist[1].data.list
    recommendType[2].list = reslist[2].data.list
    recommendType[3].list = reslist[0].data.trade

    let favoriteList = []
    if (reslist[3].status == 0) {
      favoriteList = reslist[3].data.list
    }

    return {
      quoteRecommend: res,
      recommendType,
      favoriteList
    }
  },
  head() {
    const { language } = this.$route.params;
    return {

      title: this.$t('SwapHome.PageTitle'),
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.$t('SwapHome.PageKeywords') },
        { hid: 'description', name: 'description', content: this.$t('SwapHome.Pagedescription') },
      ],
      link: [
        { rel: 'canonical', href: `https://bitkeep.com/${language}/swap` },
        { rel: 'alternate', hreflang: 'zh', href: 'https://bitkeep.com/zh/swap' },
        { rel: 'alternate', hreflang: 'en', href: 'https://bitkeep.com/en/swap' },
        { rel: 'alternate', hreflang: 'ko', href: 'https://bitkeep.com/ko/swap' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://bitkeep.com/en/swap' },
      ]
    }
  },
  data() {
    return {
      loading: true,
      timer: null,
      timer2: null,
      tags: [],
      views: [],
      recommends: [],
      activeTag: {
        list: [],
        id: 1
      },
      tagData: [],
      showScrollIcon: false,
      isPC: this.$store.state.isPC,
      h5searchshow: false,
      offsetTop: 64,
      affixZindex: ""
    }
  },
  components: {
    quoteView,
    recommendCard,
    tagTable,
    marketSearch,
    verticalScroll
  },
  directives: {
    ClickOutside
  },
  watch: {
    "$store.state.WalletID": function (newVal, oldVal) {
      this.init('refresh')
      // if (newVal) {
      //   window.scrollTo(0, 0);
      // }
    },
    "$store.state.isPC": function (newVal, oldVal) {
      this.isPC = newVal;
      if (newVal == true) {
        const bodycontent = document.getElementsByClassName("bodycontent")[0];
        bodycontent.classList.remove("overflowbody")
      }
    },
  },
  methods: {
    affixtop(affixed) {
      if (affixed) {
        this.affixZindex = 102
      } else {
        this.affixZindex = ""
      }
    },
    closeH5Search() {
      this.h5searchshow = false;
      const bodycontent = document.getElementsByClassName("bodycontent")[0];
      bodycontent.classList.remove("overflowbody")
    },
    showSearch() {
      this.h5searchshow = true;
      const bodycontent = document.getElementsByClassName("bodycontent")[0];
      bodycontent.classList.add("overflowbody")
    },
    apiUrl(url) {
      if (url.indexOf("/quotev2/favoriteList") != -1) {
        return {
          api: "quoteFavoriteList",
          query: {

          }
        }
      } else if (url.indexOf("/quotev2/getQuoteListByTag") != -1) {
        return {
          api: "quoteHotList",
          query: {
            tag: GetQueryString(url, "tag")
          }
        }
      } else if (url.indexOf("/quotev2/changeTop") != -1) {
        return {
          api: "quoteChangeTop",
          query: {
            type: GetQueryString(url, "type")
          }
        }
      }
    },
    async handleClickTag(item) {
      let Action_Location_Name;
      switch (item.id) {
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
          Action_Location_Id: item.id,
          Action_Location_Name: Action_Location_Name
        }
      })
      window.scrollTo(0, 0);
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.timer2) {
        clearInterval(this.timer2)
      }
      if (item.id !== this.activeTag.id && !this.loading) {
        this.loading = true
        this.activeTag = item
        try {
          const apiData = this.apiUrl(item.url.replace('/market', ''))
          console.log({ ...apiData.query })
          const res = await this.$api.swap[apiData.api]({ ...apiData.query })
          this.loading = false
          if (res.status == 0) {
            if (this.activeTag.id == 1) {
              this.favoriteList = res.data.list
              this.$set(item, 'list', res.data.list.reverse())
            } else {
              this.$set(item, 'list', res.data.list)
            }
            this.timingApi(item)
            this.timer = setInterval(() => {
              this.refresh()
            }, 30000)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    timingApi(item) {
      this.timer2 = setInterval(async () => {
        try {
          const apiData = this.apiUrl(item.url.replace('/market', ''))
          const res = await this.$api.swap[apiData.api]({ ...apiData.query })
          this.loading = false
          if (res.status == 0) {
            if (this.activeTag.id == 1) {
              this.favoriteList = res.data.list
              this.$set(item, 'list', res.data.list.reverse())
            } else {
              this.$set(item, 'list', res.data.list)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }, 30000)
    },
    async init(option) {
      if (this.quoteRecommend.status == 0 && option != "refresh") {
        this.views = this.quoteRecommend.data.coins
        this.recommends = this.quoteRecommend.data.pushList
        this.tags = this.quoteRecommend.data.tags
        if (this.tags.length > 1) {
          this.$nextTick(() => {
            this.handleClickTag(this.tags[1])
          })
        }
        this.handleFavoriteChange()
      } else {
        const res = await this.$api.swap.getQuoteRecommend()
        if (res?.status == 0) {
          this.views = res.data.coins
          this.recommends = res.data.pushList
          this.tags = res.data.tags
          if (this.tags.length > 0) {
            this.handleClickTag(this.tags[1])
          }
        }
        this.handleFavoriteChange()
      }
      this.loading = false
    },
    async handleFavoriteChange() {
      const { data, status } = await this.$api.swap.quoteFavoriteList()
      if (status == 0) {
        this.favoriteList = data.list.reverse()
        if (this.activeTag.id == 1) {
          this.activeTag.list = data.list
        }
      } else {
        this.favoriteList = []
        if (this.activeTag.id == 1) {
          this.activeTag.list = []
        }
      }
    },
    quoteviewTA(item) {
      this.$Ta.track({
        name: 'Bitkeep__Swap_Page', data: {
          Action_Location_Type: 'icon',
          Action_Location_Id: item.contract?item.contract:'bitkeep',
          Action_Location_Name: item.coin.toUpperCase()
        }
      })
      this.gotoSwap(item)
    },
    recommendcard(item, type) {
      let Action_Location_Name;
      switch (type) {
        case 0:
          Action_Location_Name = 'Hot'
          break;
        case 1:
          Action_Location_Name = 'New'
          break;
        case 2:
          Action_Location_Name = 'ChangeTop'
          break;
        case 3:
          Action_Location_Name = 'Tradingvolume'
          break;
        default:
          Action_Location_Name = 'Hot'
          break;
      }
      this.$Ta.track({
        name: 'Bitkeep__Swap_Page', data: {
          Action_Location_Type: 'column',
          Action_Location_Id: type,
          Action_Location_Name: Action_Location_Name,
          Action_Sub_Id:item.contract?item.contract:'bitkeep',
          Action_Sub_Name: item.coin.toUpperCase()
        }
      })
      this.gotoSwap(item)
    },
    gotoSwap(item) {
      const { language } = this.$route.params
      let routeUel = this.$router.resolve({
        path: `/${language}/swap/${item.chain}/${item.contract || 'bitkeep'}`
      })
      window.open(`/${language}/swap/${item.chain}/${item.contract || 'bitkeep'}`, '_blank')
    },
    async refresh() {
      const res = await this.$api.swap.getQuoteRecommend()
      if (res.status == 0) {
        this.quoteRecommend = res
        this.views = this.quoteRecommend.data.coins
        this.recommends = this.quoteRecommend.data.pushList
      }
    },
    handleScroll() {
      try {
        const top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
        const marketcontent = Math.floor(document.getElementsByClassName("market-content")[0].clientHeight) + 40
        this.offsetTop = top >= marketcontent ? 0 : 64
      } catch (error) {
        console.log(error)
      }
    }
  },
  beforeMount() {
    this.$Ta.track({
      name: 'Bitkeep__Swap_Page', data: {
        Page_Enter: '1'
      }
    })
  },
  async mounted() {
    if (process.client) {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      window.addEventListener('scroll', this.handleScroll, true)
    }
    this.init()
    this.timer = setInterval(() => {
      this.refresh()
    }, 30000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timer2) {
      clearInterval(this.timer2)
    }
    //离开这个界面之后，删除滚动事件，不然容易除bug
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less" scoped>
.market-content {
  margin-top: 11px;
  position: relative;
  font-family: 'Inter';

  .title-right {
    display: flex;
    align-items: center;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .title-text {
      font-size: 28px;
      font-weight: 600;
    }
  }

  .view-list {
    margin-top: 11px;
    // height: 92px;
    overflow: hidden;

    .cardlist.pc {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }

    .cardlist.mobile {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
    }
  }

  .recommend-list {
    .cardlist {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
    }
  }

  .tags-list {
    margin-top: 20px;

    .tags-label-list {
      display: flex;

      .tag-label {
        display: flex;
        margin-right: 4px;
        padding: 10px 15px;
        border-radius: 20px;
        font-weight: 600;
        white-space: nowrap;
        line-height: 16px;

        &.active {
          background-color: #7524F91A;

          .name {
            color: #7524F9;
          }
        }

        .icon {
          display: flex;
          width: 16px;
          height: 16px;
          margin-right: 5.5px;
          justify-content: center;
          align-items: center;

          img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }

    .tags-table {
      margin-top: 5px;
      margin-bottom: 50px;
    }
  }

  .search-box-h5 {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 40px 0px 20px;
    width: 100%;
    box-sizing: border-box;
    z-index: 103;
  }
}

@media screen and (min-width: 1201px) {
  .market-content {
    .title-right {
      width: 496px;

      .mobilesearch {
        display: none;
      }

      .searchBox {
        display: block;
      }
    }

    .view-list {
      .cardlist.pc {
        display: grid;
      }

      .cardlist.mobile {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 831px) {
  .market-content {
    .title-right {
      width: 496px;

      .mobilesearch {
        display: none;
      }

      .searchBox {
        display: block;
      }
    }

    .view-list {
      .cardlist.pc {
        display: grid;
      }

      .cardlist.mobile {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 830px) {
  .market-content {
    font-size: 12px;

    .title {
      padding: 0 20px;

      .title-text {
        font-size: 24px;
      }

      .title-right {
        .mobilesearch {
          display: block;
        }

        .searchBox {
          display: none;
        }
      }
    }

    .view-list {
      padding: 0 20px;

      .cardlist.pc {
        display: none;
      }

      .cardlist.mobile {
        display: grid;
        grid-gap: 10px;
        overflow: hidden;
      }
    }

    .recommend-list {
      display: none;
    }

    .tags-label-list {
      padding: 0 10px;
    }

    .tags-list {

      margin-top: 14px;
    }
  }
}


.theme-light {
  .tag-label:hover {
    background-color: @theme-light-bg1;
  }
}

.theme-dark {
  .tag-label:hover {
    background-color: @theme-dark-bg1;
  }
}


// @media screen and (max-width: 1570) and (min-width: 1201px) {
//   .market-content {
//     width: 1530px;
//     margin: 0 auto;
//   }

// }
</style>
 

<style lang="less">
.search-box-h5.ant-drawer.ant-drawer-right.ant-drawer-open .ant-drawer-content-wrapper {
  width: 100% !important;

  .ant-drawer-body {
    overflow: scroll;
  }
}


.m-tooltip {
  .ant-tooltip-content {
    .ant-tooltip-inner {
      min-height: 34px;
      line-height: 20px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
    }
  }
}
</style> 