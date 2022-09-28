<template>
  <div class="navigation_box BG0blur">
    <div class="navigation lineBG2">
      <div class="navigation_left text1">{{ currentName }}</div>
      <div class="navigation_right text3">
        <div v-for="(item, index) in navList" :key="item.id">
          <a
            :href="item.link"
            :class="
              activitedIndex == index ? 'setStyle text1 linetext1' : 'text3'
            "
            @click="itemActivited($event, item, index)"
            >{{ item.name }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentName: "",
    };
  },
  props: {
    navList: {
      type: Array,
      defalut: () => {},
    },
    activitedIndex: {
      defalut: "0",
    },
  },
  mounted() {
    this.currentName = this.navList.find(
      (item) => item.activited == this.activitedIndex
    ).name;
  },
  methods: {
    itemActivited(event, item, index) {
      if (event && event.preventDefault) {
        event.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      this.currentName = item.name;
      this.$router.push({
        path: item.link,
      });
      this.$Ta.track({
        name: "Bitkeep__Page",
        data: {
          Action_Location_Name: "NFT",
          Action_Location_Type: "top",
          Action_Sub_Name: item.name,
          source: "PC",
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.navigation_box {
  height: 51px;
  width: 100%;
  min-width: 350px;
  position: fixed;
  top: 63px;
  z-index: 100;
  // padding: 0px 196px;
  -webkit-backdrop-filter: blur(20px);
  -moz-backdrop-filter: blur(20px);
  -ms-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  .navigation_left {
    font-weight: 500;
    font-size: 28px;
  }
  .navigation_right {
    font-weight: 500;
    font-size: 14px;
    display: flex;
    div {
      margin-left: 30px;
      a {
        line-height: 48px;
        display: inline-block;
      }
    }
  }
  .setStyle {
    border-bottom: 2px solid;
  }
}
@media screen and (max-width: 1800px) {
  .navigation_box {
    padding: 0 20px;
  }
}
@media screen and (min-width: 1800px) {
  .navigation_box {
    padding: 0 195px;
  }
}
@media screen and (max-width: 750px) {
  .navigation_box {
    top: 44px;
  }
}
</style>