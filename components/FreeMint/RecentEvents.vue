<template>
  <div>
    <div class="WhitelistRaffle_box lineBG2" v-for="item in dataList">
      <div class="WhitelistRaffle_box_left">
        <div>
          <img :src="item.icon" :alt="item.icon" class="lineBG2 setBor" />
          <img
            src="https://cdn.bitkeep.vip/u_b_d294ad80-28ee-11ed-b1b0-4b0549850693.png"
            alt="state-little"
            class="smallImg light_icon"
          />
          <img
            src="https://cdn.bitkeep.vip/u_b_55d39970-28f6-11ed-aa39-8702978c6622.png"
            alt="state-little"
            class="smallImg dark_icon"
          />
        </div>
        <div>
          <p class="text1">{{ item.name }}</p>
          <p class="text2">
            {{ item.description }}
          </p>
        </div>
      </div>
      <div class="WhitelistRaffle_box_center">
        <div>
          <p class="text3">{{ $t("FreeMints.price") }}</p>
          <p class="text1 setWidth">${{ item.price }}</p>
        </div>
        <div>
          <p class="text3">{{ $t("FreeMints.mint_number") }}</p>
          <p class="text1 setWidth">{{ item.mint_number }}</p>
        </div>
        <div>
          <p class="text3">{{ $t("FreeMints.fans_number") }}</p>
          <p class="text1 setWidth">{{ item.fans_number }}</p>
        </div>
        <div>
          <p class="text3">{{ $t("FreeMints.time") }}</p>
          <p class="text1 setWidth">{{ item.time }}</p>
        </div>
      </div>
      <div
        class="WhitelistRaffle_box_right"
      >
        <a :href="item.link"
        @click="gotoPage($event, item.link, item.name, item.chain)"
        >
          <button>{{ $t("FreeMints.Mint") }}</button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    dataList: {
      type: Array,
      dafalut: () => {},
    },
    type: {
      type: String
    },
  },
  methods: {
    gotoPage(event, url, Sub_Name, chain) {
      if (event && event.preventDefault){
        event.preventDefault();
      }else{
        window.event.returnValue = false;
      }
      chain = chain.toLowerCase();
      this.$Ta.track({name:"FreeMint_Page",data:{
        Action_Location_Name: this.type || 'Free Mint',
        Action_Sub_Name: Sub_Name,
        source: "PC",
      }})
      if (url.indexOf("?") != -1) {
        url = `${url}&_needChain=${chain}`;
      } else {
        url = `${url}?_needChain=${chain}`;
      }
      window.open(url, "_blank");
    },
  },
};
</script>
<style lang="less" scoped>
.WhitelistRaffle_box:hover {
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.08);
}
.WhitelistRaffle_box {
  height: 120px;
  border: 1px solid;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  .WhitelistRaffle_box_left {
    display: flex;
    width: 382px;
    align-items: center;
    justify-content: space-between;
    .setBor{
      border: 1px solid;
    }
    div:first-child {
      margin-left: 20px;
      position: relative;
      img {
        width: 80px;
        height: 80px;
        max-width: 80px;
        border-radius: 50%;
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
      text-align: left;
      p:first-child {
        font-weight: 600;
        font-size: 16px;
      }
      p:last-child {
        font-weight: 400;
        font-size: 12px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
      }
    }
  }
  .WhitelistRaffle_box_center {
    display: flex;
    width: 500px;
    div {
      flex: 1;
      width: 25%;
      word-break: break-all;
    }
    div p:first-child {
      margin-right: 20px;
    }
    .setWidth{
      max-width: 100px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .WhitelistRaffle_box_right {
    width: 90px;
    height: 38px;
    background: #7524f9;
    border-radius: 100px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    button {
      font-weight: 600;
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>