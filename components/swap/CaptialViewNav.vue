<template>
  <div class="captial-view-nav lineBG1">
    <div class="Searchbox lineBG2">
      <marketSearch  :h5style="true" :jumpTarget="false" >
		  </marketSearch>
    </div>
    <nav class="text3 lineBG1">
      <h2 :class="flag ? 'active text1' : 'text3'" @click="flag = true">
        {{ $t('SwapDetail.captial.pool') }}
      </h2>
      <h2 :class="!flag ? 'active text1' : 'text3'" @click="flag = false">
        {{ $t('SwapDetail.captial.intro') }}
      </h2>
    </nav>
    <div v-if="flag">
      <SwapCaptialPool v-if="isSpecialty==1"/>
      <div class="notDataBox" v-else>
        <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
        <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
        <div class="text3 notData" :title='$t("SwapHome.noData")'>{{ $t("SwapHome.noData") }}
        </div>
      </div>
    </div>
    <div v-if="!flag">
      <SwapCaptialIntroduce />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CaptialViewNav',
  props: {
    isSpecialty: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      flag: this.isSpecialty==1?true:false
    }
  },
}
</script>
<style lang="less" scoped>
.captial-view-nav {
  width: 100%;
  border: 1px solid #F2F2F5;
  border-bottom: 0;
  border-top: none;
  .Searchbox{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    z-index: 103;
    border-bottom: 1px solid #F8F8F9;
  }
  nav {
    height: 40px;
    padding: 0px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid#F8F8F9;
    font-size: 14px;

    h2 {
      height: 100%;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;
    }

    .active {
      border-bottom: 2px solid;
      font-weight: 600;
    }

    h2:first-child {
      margin-right: 20px;
    }
  }
  .notDataBox {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
    }

    .notData {
      font-weight: 500;
      font-size: 12px;
      line-height: 1.5;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
