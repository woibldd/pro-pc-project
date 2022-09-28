<template>
  <div class="introduce-info">
    <div class="captial-info lineBG2">
      <h3 class="info-title text1" v-if="isPC">
        {{ $t('SwapDetail.captial.coinInfo') }}
      </h3>
      <div v-else class="h5_infotitlebox">
        <h3 class="info-title text1">
          {{ $t('SwapDetail.captial.coinInfo') }}
        </h3>
        <a v-if="contractinfo && contractinfo.contractCheckUrl" class="check-btn" :href="contractinfo.contractCheckUrl"
          target="_blank">
          <img src="~/assets/img/swap/contract_icon.svg">
          <div class="heyue-text">
            <span>{{ $t('SwapDetail.kLineNav.contractCheck') }}</span> <img src="~/assets/img/swap/token_check.svg">
          </div>
        </a>
      </div>
      <div v-for="(item, index) in infoList" :key="index">
        <div v-if="item.value" class="info-ul-list">
          <p class="info-li-name text3">{{ item.title }}</p>
          <div class="copy-btn" v-if="item.copy == true" @click="handleCopy(item.value)">
            <p class="info-li-value text1">
              {{ item.value.slice(0, 4) + '...' + item.value.slice(-4) }}
            </p>
            <img src="~/assets/img/swap/copy_icon.svg" alt="copy">
          </div>
          <div class="copy-btn" v-else>
            <p class="info-li-value text1">
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tags && tags.length > 0" class="captial-info lineBG2">
      <h3 class="info-title text1">
        {{ $t('SwapDetail.captial.tag') }}
      </h3>
      <p v-for="(item, index) in tags" :key="index" class="tag-li text2 BG1">
        {{ item.title ? '#' : '' }}{{ item.title }}
      </p>
    </div>
    <div class="captial-info lineBG2" v-if="iconIndroduce.about">
      <h3 class="info-title text1">
        {{ $t('SwapDetail.captial.about') }}
      </h3>
      <p class="about-all text3" :class="{ 'about-active': flag }">
        {{ iconIndroduce.about }}
      </p>
      <div v-show="flag" class="text1 dot-btn" @click="flag = false">
        {{ $t('SwapDetail.captial.ViewAll') }}
      </div>
    </div>
    <div class="captial-info lineBG2 source" v-if="sourceList.length > 0">
      <h3 class="info-title text1">
        {{ $t('SwapDetail.captial.resour') }}
      </h3>
      <div class="source-list">
        <a v-for="(item, index) in sourceList" :key="index" :href="item.url" target="_blank">
          <img class="resource-img" :src="item.src" alt="websit">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import copy from 'copy-to-clipboard';
export default {
  name: 'IntroduceInfo',
  data() {
    return {
      flag: true,
      isPC: this.$store.state.isPC,
    }
  },
  computed: mapState({
    iconIndroduce: state => state.swap.iconIndroduce,
    infoList: (state) => {
      return state.swap.iconIndroduce.others && state.swap.iconIndroduce.others.find(item => item.type === 'info').list
    },
    contractinfo: (state) => {
      return state.swap.iconIndroduce.others && state.swap.iconIndroduce.others.find(item => item.type === 'info')
    },
    tags: (state) => {
      const tags = state.swap.iconIndroduce.others && state.swap.iconIndroduce.others.find(item => item.type === 'tag')
      return tags && tags.list
    },
    sourceList: (state) => {
      let arr = []
      let source = state.swap.iconIndroduce.source
      for (let key in source) {
        if (source[key]) {
          arr.push({
            src: require(`@/assets/img/swap/source/${key}_icon.svg`),
            url: source[key]
          })
        }
      }
      return arr
    }
  }),
  methods: {
    handleCopy(data) {
      if (!data) {
        this.$message.warning(this.$t('header.Nocopy'))
        return
      }
      copy(data)
      this.$message.success(this.$t('header.copySuccess'))
    },
  }
}
</script>
<style lang="less" scoped>
.introduce-info {
  .captial-info {
    padding: 15px 20px 10px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f2f5;
  }

  .info-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .h5_infotitlebox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .info-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 0px !important;
    }

    .check-btn {
      font-weight: 500;
      height: 32px;
      padding: 8px;
      box-sizing: border-box;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      color: #1BC89E;
      cursor: pointer;
      background: rgba(27, 200, 158, 0.1);
      border-radius: 100px 0px 0px 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: -20px;

      img {
        margin-right: 4px;
      }

      .heyue-text {
        white-space: nowrap;
        display: flex;
        align-items: center;

        span {
          margin-right: 6px;
          font-weight: 500 !important;
        }
      }
    }
  }

  .info-ul-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 16px;
    font-size: 12px;
    margin-bottom: 15px;

    .info-li-name {
      font-weight: 500;
    }

    .info-li-value {
      font-weight: 500;
    }

    .copy-btn {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }

  .tag-li {
    border-radius: 20px;
    font-weight: 500;
    margin-right: 8px;
    line-height: 16px;
    padding: 6px 12px;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .about-all {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
  }

  .about-active {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .dot-btn {
    cursor: pointer;
    text-align: right;
    font-size: 12px;
    font-weight: 500 !important;
  }

  .source {
    border-bottom: 0;

    .source-list {
      a {
        display: block;
        display: inline-block;
        margin-right: 27px;
        margin-bottom: 27px;
      }

      img {
        width: 24px;
        height: 24px;
      }

    }
  }
}
</style>
