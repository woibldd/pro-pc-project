<template>
  <div class="box">
    <div class="WhitelistRaffle_box lineBG2" v-for="(item, index) in pastData" :key="index">
      <a :href="item.link" @click="gotoPage($event, item.link, item.name, item.chain, 'PastEvents')" class="seo_href">
        <div class="WhitelistRaffle_box_left">
          <div>
            <img :src="item.icon" :alt="item.icon" class="lineBG2" />
          </div>
          <div>
            <p class="text1">
              <span class="title" :title="item.name">{{ item.name }}</span>
              <span v-if="item.hot == 1" class="setHot Common_light_red Common_red">{{ $t('FreeMints.hot') }}</span>
            </p>
            <p class="text3" :title="item.description">
              {{ item.description }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ['pastData'],
  methods: {
    gotoPage(event, url, Sub_Name, chain, name) {
      if (event && event.preventDefault) {
        event.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      chain = chain.toLowerCase();
      if (url.indexOf('?') != -1) {
        url = `${url}&_needChain=${chain}`;
      } else {
        url = `${url}?_needChain=${chain}`;
      }
      window.open(url, '_blank');
      this.$Ta.track({
        name: 'FreeMint_Page',
        data: {
          Action_Location_Name: name,
          Action_Sub_Name: Sub_Name,
          source: 'PC',
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.WhitelistRaffle_box:hover {
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.08);
}
.box {
  display: flex;
  justify-content: flex-start;
  // justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
// .WhitelistRaffle_box:last-child:nth-child(4n - 2) {
//   margin-right: calc(48% + 8% / 3);
// }
.WhitelistRaffle_box {
  height: 120px;
  width: 368px;
  border: 1px solid;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-right: 20px;
  width: 24%;
  margin-right: 1.33333333%;
  position: relative;
  cursor: pointer;
  .WhitelistRaffle_box_left {
    display: flex;
    max-width: 382px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    div:first-child {
      position: relative;
      img {
        width: 80px;
        height: 80px;
        max-width: 80px;
        border-radius: 50%;
        border: 1px solid;
      }
      .smallImg {
        width: 18px;
        height: 18px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    div:last-child {
      margin-left: 18px;
      p:first-child {
        font-weight: 600;
        font-size: 16px;
        display: flex;
      }
      .setHot {
        font-size: 11px;
        padding: 2px 5px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .title {
        max-width: 120px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
      }
      p:last-child {
        font-weight: 400;
        font-size: 12px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
@media screen and (min-width: 1201px) {
  .WhitelistRaffle_box:nth-child(4n + 4) {
    margin-right: 0;
  }
}
@media screen and (max-width: 1200px) {
  .WhitelistRaffle_box {
    width: 32% !important;
  }
  .WhitelistRaffle_box:nth-child(3n + 3) {
    margin-right: 0 !important;
  }
  .title{
    max-width: 67px !important;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .title{
    max-width: 75px !important;
  }
}
@media screen and (max-width: 890px) {
  .WhitelistRaffle_box{
    width: 100% !important;
    margin-right: 0 !important;
    margin-bottom: 10px !important;
  }
}
</style>