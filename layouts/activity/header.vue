<template>
  <div class="header-wrap" >
    <div class="headerbox" flex="cross:center box:mean">
      <div class="headleft" > 
        <div title="bitkeep" > 
            <a :href="'/'" title="BitKeep,  a best crypto wallet" class="seo_href" > 
                <img src="../../assets/img/header/BK logo_dark.svg"
                    alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_dark">
            </a>
        </div>
      </div>
      <div class="headmiddle" flex="main:center"> 
        <a href="#panel1"  class="item">{{$t('knft.week')}}</a>
        <a href="#panel2" class="item">{{$t('knft.timeline')}}</a>
        <a href="#panel3" class="item">{{$t('knft.about')}}</a>
      </div>
      
      <div class="headright" flex="main:right"> 
        <div class="language item pc">
            <div class="language-cur" :title="lang"> 
              <div class="lang-text">
                <div class="img-box-l" flex="cross:center">
                  <img class="img-lang" src="@/assets/img/activity/knft/icon-earth2.svg" alt="">
                </div>
                {{lang}}
                <div class="img-box-r">
                  <img class="img-arrow" src="../../assets/img/activity/knft/icon-arrow-down.svg" alt="triangle"> 
                </div>
              </div> 
            </div> 
            <div class="language-list ">
                <ul> 
                    <li class="langItem" 
                        :title='$t("header.en")'
                        :class="{active: locale == 'en'}">
                        <a :title='$t("header.en")' class="seo_href "  
                            @click="switchlanguage('en', 'English')">
                            {{ $t("header.en")}}
                        </a></li>
                    <li class="langItem" :title='$t("header.ko")' 
                            :class="{active: locale == 'ko'}">
                        <a  class="seo_href " :title='$t("header.ko")' @click="switchlanguage('ko', '한국인')">{{ $t("header.ko") }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="language item mobile" flex="main:right">
            <div class="language-cur" :title="lang"> 
              <div class="language-img-box" flex="cross:center">
                <img class="img-lang-mobile" src="@/assets/img/activity/knft/icon-earth2.svg" alt="">
              </div> 
            </div> 
            <div class="language-list ">
                <ul> 
                    <li class="langItem" 
                        :title='$t("header.en")'
                        :class="{active: locale == 'en'}">
                        <a :title='$t("header.en")' class="seo_href "  
                            @click="switchlanguage('en', 'English')">
                            {{ $t("header.en")}}
                        </a></li>
                    <li class="langItem" :title='$t("header.ko")' 
                            :class="{active: locale == 'ko'}">
                        <a  class="seo_href " :title='$t("header.ko")' @click="switchlanguage('ko', '한국인')">{{ $t("header.ko") }}</a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script> 
import { initVueI18n } from '@/locales/index.js'
import { mapMutations} from 'vuex'
export default {
  data() {
    return {
      lang: 'English'
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },
  methods: { 
    // switchlanguage(Local, lang) {
    //   if (this.lang == lang) return
    //   this.lang = lang   
    //   initVueI18n().locale = Local 
    //   this.$router.replace({ query: { lang: Local } }); 
    // }
    ...mapMutations(['changeLocal']),
    switchlanguage(Local, lang) {
        if (event && event.preventDefault) {
            event.preventDefault();
        } else {
            window.event.returnValue = false; //兼容IE8
        }
        this.changeLocal(Local)
        let { fullPath } = this.$route;
        fullPath = fullPath.split('/')
        fullPath.splice(1, 1, Local);

        this.$router.push({
            path: fullPath.join('/'),
        })
        this.lang = lang
    },
  },
  created() {
    // const pathLang = this.$route.query.lang
    // const { ...query } = this.$route.query;
    // if (!pathLang) {
    //   console.log('pathLang', pathLang)
    //   this.$router.replace({ query: { ...query, lang: 'en' } }); 
    // } else { 
    //   this.lang = pathLang=='ko' ? '한국인' : 'English'
    //   initVueI18n().locale = pathLang 
    // }

  }
} 
</script>

<style lang="less" scoped>
.header-wrap { 
  height: 64px;  
  background: #17171A; 
  .headerbox {
    margin: 0 auto;
    width: 1530px; 
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%; 
    color: #ECE4CC; 
    .headleft {
      a {
        transition: 1;
      }
    }
    .headmiddle {
      .item {
        height: 64px;  
        line-height: 64px; 
        color: #ECE4CC;
        white-space: nowrap;
        &:not(:first-child) {
          margin-left: 80px;
        }  
      }
    }
    .headright {
      .language {
        position: relative;
        width: 200px;
        text-align: center;
        .lang-text {
          position: relative;;
        }
        .img-box-l {
          position: absolute;
          top:0;
          left: 47px;
          height: 100%;
        }
        .img-box-r {
          position: absolute;
          top:0;
          right: 56px;
        }
        &.mobile {
          .language-img-box {
            height: 50px;
          }
          .language-list {
            right: -20px;
          }
        }
      }
    }
  } 
  
  .language-list {
      box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.08);
  }
 

  .language:hover .language-list{
    display: block;
  }

  .language-list {
      display: none;
      position: absolute;
      top: 50px;
      right: 3px;
      z-index: 100;
      overflow: hidden;
      width: 200px;
      line-height: 55px;
      border-radius: 8px;
      text-align: center;
      margin-left: -65px;  
      background: #17171A;
      box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.5);
      border: 1px solid #252529;
      ul li {
          display: block;
          text-align: center;
          width: 100%;
          height: 55px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600; 
          a {
            color: #ECE4CC;
          }
          .seo_href{
            display: block;
            width: 100%;
            height: 100%;
          } 
          &:hover  {
            background: #202024;
          }
      }
  }

  .language-cur {
      height: 50px; 
      line-height: 50px; 
      font-size: 14px;
      cursor: pointer; 
      align-items: center;
      justify-content: space-around;  
      white-space: nowrap;
      .img-lang {
        height: 18px;
        width: 18px;
        margin-right: 7px;
      }
      .lang-text {
        margin-right: 7px;
        font-family: 'Inter'; 
        font-weight: 600;
        font-size: 14px;
      }
      span {  
          width: 8px;
          height: 8px;
          -webkit-transition: transform .3s ease-in-out;
          transition: transform .3s ease-in-out;

          img {
              width: 100%;
              height: auto;
          }
      }
  }

}
 
@media screen and (min-width: 1570px) { 
  .header-wrap { 
    .headerbox {
      width: 1530px; 
    } 
  } 
  .mobile {
    display: none !important;;
  }
}
@media screen and (max-width: 1569px) and (min-width: 800px) {
  .header-wrap { 
    .headerbox {
      padding: 0 20px;
      width: 100%; 
      box-sizing: border-box;
      .headright {
        .language {
          .language-cur {
            display: flex;
            justify-content: flex-end;
            .lang-text {
              width: 70px;
              .img-box-l {
                left: -13px;
              }
              .img-box-r {
                right: -3px;
              }

            }
          }
        }
      }
    } 
  } 
  .mobile {
    display: none !important;;
  }
}
@media screen and (max-width: 799px)  { 
  .header-wrap { 
    height: 50px;
    .headerbox {
      padding: 0 20px;
      width: 100%; 
      box-sizing: border-box;
      .headmiddle {
        display: none;
      }
    } 
  } 
  .pc {
    display: none !important;;
  }
}

</style>
