<template>
  <div> 
    <div id="panel3" v-if="!isMobile" class="pc about">
      <div class="about-title"> 
        {{$t('knft.aboutbk')}}
      </div>
      <div class="myswiper pc mt-10">  
        <div class="bander" v-swiper:myswiper1="swiperOptionPc">
          <div class="swiper-wrapper">
            <div class="swiper-slide" > 
              <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
              </svg>
              <div class="myIframe">
                <iframe
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/FskRmYjXqbY"
                  frameborder="0"
                  allowfullscreen
                  v-if="showvideo"
                ></iframe>
              </div>
            </div>
            <div class="swiper-slide" > 
              <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
              </svg>
              <div class="myIframe">
                <iframe
                  width="100%" 
                  height="100%"
                  src="https://www.youtube.com/embed/-74OUyy-aDU"
                  frameborder="0"
                  allowfullscreen
                  v-if="showvideo"
                ></iframe>
              </div>
            </div>   
            <div class="swiper-slide" > 
              <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
              </svg>
              <div class="myIframe">
                <iframe
                  width="100%" 
                  height="100%"
                  src="https://www.youtube.com/embed/sv6AwYnMMvo"
                  frameborder="0"
                  allowfullscreen
                  v-if="showvideo"
                ></iframe>
              </div>
            </div>  
            <div class="swiper-slide" > 
              <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
              </svg>
              <div class="myIframe">
                <iframe
                  width="100%" 
                  height="100%"
                  src="https://www.youtube.com/embed/6IFNHTAoSoo"
                  frameborder="0"
                  allowfullscreen
                  v-if="showvideo"
                ></iframe>
              </div>
            </div>  
          </div>
        </div> 
        <div class="swiper-pagination2"  slot="pagination" style="display:none;"></div>
        <div class="button-prev1" slot="button-prev">
          <img src="@/assets/img/activity/knft/icon-arrow-left.svg" alt="" />
        </div>
        <div class="button-next1" slot="button-next">
          <img src="@/assets/img/activity/knft/icon-arrow-left.svg" alt="" />
        </div>
      </div> 
    </div>
    <div  v-if="isMobile" class=" mobile about">
      <div class="about-title">
        {{$t('knft.aboutbk')}}
      </div>
      <div class="myswiper mt-10 swiper2">  
          <div class="bander" v-swiper:myswiper2="swiperOptionMobile">
            <div class="swiper-wrapper">
              <div class="swiper-slide" > 
                <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
                </svg>
                <div class="myIframe">
                  <iframe
                    loading="lazy"
                    width="100%" 
                    height="100%"
                    src="https://www.youtube.com/embed/FskRmYjXqbY"
                    frameborder="0"
                    allowfullscreen
                    v-if="showvideo"
                  ></iframe>
                </div>
              </div>
              <div class="swiper-slide" > 
                <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
                </svg>
                <div class="myIframe">
                  <iframe
                    loading="lazy"
                    width="100%" 
                    height="100%"
                    src="https://www.youtube.com/embed/-74OUyy-aDU"
                    frameborder="0"
                    allowfullscreen
                    v-if="showvideo"
                  ></iframe>
                </div>
              </div>  
              <div class="swiper-slide" > 
                <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
                </svg>
                <div class="myIframe">
                  <iframe
                    loading="lazy"
                    width="100%" 
                    height="100%"
                    src="https://www.youtube.com/embed/sv6AwYnMMvo"
                    frameborder="0"
                    allowfullscreen
                    v-if="showvideo"
                  ></iframe>
                </div>
              </div>  
              <div class="swiper-slide" > 
                <svg class="occupy-img" width="503" height="279" viewBox="0 0 503 279" fill="pink">
                </svg>
                <div class="myIframe">
                  <iframe
                    loading="lazy"
                    width="100%" 
                    height="100%"
                    src="https://www.youtube.com/embed/6IFNHTAoSoo"
                    frameborder="0"
                    allowfullscreen
                    v-if="showvideo"
                  ></iframe>
                </div>
              </div>  
            </div>
          </div> 
            <div class="swiper-pagination2"  slot="pagination" flex="cross:center"></div>
            <div class="button-prev2" slot="button-prev">
              <img src="@/assets/img/activity/knft/arrow-left.svg" alt="" />
            </div>
            <div class="button-next2" slot="button-next">
              <img src="@/assets/img/activity/knft/arrow-right.svg" alt="" />
            </div>
      </div> 
    </div>
  </div>
</template>

<script>

import "@/plugins/vue-awesome-swiper.js";
import "swiper/css/swiper.css";
export default {
  data() {
    return { 
      isMobile: this.$store.state.isMobile,
      showvideo: false,
      swiperOptionPc: {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true, 
        prevButton: '.button-prev1',
        nextButton: '.button-next1', 
        pagination: '.swiper-pagination1',
      },
      swiperOptionMobile: {
        slidesPerView: 1.25,
        spaceBetween: 10,
        loop: true, 
        prevButton: '.button-prev2',
        nextButton: '.button-next2',
        pagination: '.swiper-pagination2',
        paginationType: 'bullets',
      }
    }
  },
  methods: {
    documentLoad() { 
      let isLoad = document.readyState == 'complete'
      if (isLoad) return isLoad
      return new Promise(resolve => {
        window.addEventListener('load', resolve) 
      })
    }
  },
  async mounted() { 
    // setTimeout(() => {
    //   this.showvideo = true
    // }, 5000)
    await this.documentLoad()
     setTimeout(() => {
      this.showvideo = true
    }, 3000) 
  },

}
</script>

<style lang="less" scoped>
.about {
  // padding: 80px 20px;
  .about-title {
    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 110%;
  }
  &.mobile {
    .about-title {
      font-size: 28px;
    }
    .myswiper {
      .bander {
        margin-top: 20px;
      } 
    }
  }
  .myswiper {
    position: relative;
    .bander {
      margin-top: 60px;
      overflow: hidden;
      .occupy-img {
        width: 100%;
      }
      .swiper-wrapper {
        width: 100%;
        .swiper-slide { 
          position: relative; 
          .myIframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .occupy-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .button-prev1 {
      position: absolute;
      left: -95px;
      top: 50%;
      margin-top: -50px;
      z-index: 100;
      cursor: pointer;
    }
    .button-next1 { 
      position: absolute;
      right: -95px;
      top: 50%;
      margin-top: -50px;
      transform:rotate(180deg); 
      width: 25px;
      height: 100px;
      z-index: 100;
      cursor: pointer;
    }
    &.swiper2 { 
      .button-prev2 { 
        position: absolute; 
        bottom: -48px;
        left: 0;
        width: 28px;
        z-index: 99;
        cursor: pointer;
        img {
          display: block;
          width: 28px;
          height: auto;
        }

      }
      .button-next2  { 
        position: absolute; 
        bottom: -48px;
        right: 0;
        width: 28px;
        z-index: 99;
        cursor: pointer;
        img {
          display: block;
          width: 28px;
          height: auto;
        }
      }
      .swiper-pagination2 {
        position: absolute; 
        bottom: -48px; 
        left: 50%;
        margin-left: -129.5px;
        width: 259px; 
        height: 28px;
      }
      // :deep(.swiper-pagination-bullet) {
      /deep/ .swiper-pagination-bullet {
          display: block;
          width: 50%!important;
          height: 2px!important;
          background: #49494d!important;
          border-radius: 0;
          margin: 0!important;
          &-active {
            background: #ECE4CC!important; 
            border-color: #ECE4CC!important;
          } 
      }
    }

  }
}
</style>