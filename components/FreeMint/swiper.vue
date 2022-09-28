<template>
  <div>
    <div class="ProgressBoxTool" v-if="toolsList && toolsList.length">
      <div class="processBox">
        <div
          :class="currentClickNumber > 0 ? 'arrow' : 'arrow arrowOpacity'"
          class="BG4 lineBG2"
          @click="fnPrev()"
        >
          <img :src="arrowL" alt="left img" class="light_icon" />        
          <img :src="arrowLD" alt="left img" class="dark_icon" />        
        </div>
        <div class="fixedBox" :ref="`fixedBox`">
          <div
            class="centerScroll"
            :style="`width:${
              signleWidth * toolsList.length
            }px;transform:translate(${scrollResultWidth}px,0);transition:1s;`"
          >
                 
            <div
              class="signleTab"
              v-for="(item, index) in toolsList"
              :key="index + 'progress'"
            >
              <a :href="item.url" @click=" gotoPage($event, item.url, item.name, item.chain, 'Tools')
              ">
                <div class="leftIcon">
                  <img
                    :src="item.icon"
                    :alt="item.name"
                    class="pregressIcon lineBG2"
                  />
                  <div class="name text1">{{ item.name }}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          :class="noScrollRight ? 'arrow' : 'arrow arrowOpacity'"
          @click="fnNext(activeName)"
          class="BG4 lineBG2"
        >
            <img :src="arrowR" alt="right img" class="light_icon" />          
          <img :src="arrowRD" alt="right img" class="dark_icon" />        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrowL:
        "https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png",
      arrowLD:
        "https://cdn.bitkeep.vip/u_b_0ef2f8f0-fcd9-11ec-bc5d-11be1d4cf263.png",
      arrowR:
        "https://cdn.bitkeep.vip/u_b_d3bfe1a0-ea25-11ec-8113-c94df49cd896.png",
      arrowRD:
        "https://cdn.bitkeep.vip/u_b_2ec22160-fcd9-11ec-bc5d-11be1d4cf263.png",
      icon: "https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png",
      iconArrow:
        "https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png",
      scrollResultWidth: 0, //transform滚动的距离
      signleWidth: 190, //单个流程的宽度
      activeName: 0,
      currentClickNumber: 0,
      noScrollRight: true,
    };
  },
  props: ["toolsList"],
  methods: {
    gotoPage(event, url, Sub_Name, chain, name) {
      if (event && event.preventDefault){
        event.preventDefault();
      }else{
        window.event.returnValue = false;
      }
      chain = chain.toLowerCase();
      this.$Ta.track({name:"FreeMint_Page",data:{
          Action_Location_Name: name,
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
    //初始化判断是否可以向右滚动
    initgoRightArrow() {
      const currentScrollWidth = this.$refs.fixedBox.clientWidth;
      const canNumber = Math.floor(currentScrollWidth / this.signleWidth); //可以放下的个数 //如果最后一个流程图标已经展示出来，则停止滚动
      if (this.currentClickNumber + canNumber >= this.toolsList.length) {
        this.noScrollRight = false;
        return;
      }
    }, //点击上一个
    fnPrev() {
      //如果右点击的次数大于0，才可以左滚
      if (this.currentClickNumber > 0) {
        this.currentClickNumber -= 1;
        this.noScrollRight = true;
        this.fnScrollWidth("reduce");
      } else {
        return false;
      }
    }, //点击下一个
    fnNext() {
      const currentScrollWidth = this.$refs.fixedBox.clientWidth;
      const canNumber = Math.floor(currentScrollWidth / this.signleWidth); //可以放下的个数 //如果最后一个流程图标已经展示出来，则停止滚动
      if (this.currentClickNumber + canNumber >= this.toolsList.length) {
        return;
      } //说明放不下有滚动条
      if (this.toolsList.length > canNumber) {
        this.currentClickNumber += 1;
        if (this.currentClickNumber + canNumber >= this.toolsList.length) {
          this.noScrollRight = false;
        }
        this.fnScrollWidth("add");
      }
    }, //translate的宽度
    fnScrollWidth(type) {
      let result = 0;
      if (type === "reduce") {
        result = 190;
      } else if (type === "add") {
        result = -190;
      } else {
        result = 0;
      }
      this.scrollResultWidth += result;
    },
  },
};
</script>
<style lang="less" scoped>
.processBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .arrow {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    margin-bottom: 44px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .arrowOpacity {
    cursor: default;
    opacity: 0.4;
  }
  .fixedBox {
    flex: 1;
    overflow: hidden;
  }
  .centerScroll {
    box-sizing: border-box;
    padding: 20px 0;
    white-space: nowrap;
    .signleTab {
      position: relative;
      display: inline-block;
      margin-right: 40px;
      .leftIcon {
        width: 150px;
        text-align: center;
        cursor: pointer;
        & > .pregressIcon {
          border-radius: 50%;
          width: 120px;
          height: 120px;
          border: 1px solid;
        }
        .name {
          font-weight: 600;
          font-size: 14px;
          line-height: 1.09;
          text-align: center;
          margin-top: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & > .arrowSquare {
        position: absolute;
        top: 25px;
        right: 0;
      }
    }
  }
}
@media screen and (max-width: 830px) {
  .arrow{
    width: 32px!important;
    height: 32px!important;
  }
}
</style>