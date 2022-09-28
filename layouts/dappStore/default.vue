<template>
    <div class="BG0 body_box">
        <Header></Header>
        <DappHeader></DappHeader>
        <div class="banderBox" v-if="!isPC&&banderList.length > 0"  >
            <div class="bander" v-swiper="swiperOption">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in banderList">
                        <a :href="item.jump_url" target="_blank">
                            <img :src="item.image_url_h5" :alt="item.image_url_h5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <H5DappStoreSlide v-if="!isPC"></H5DappStoreSlide>
        <div class="bodycontent BG0">
            <div>
                <div class="contentBox">
                    <DappStoreSlide v-if="isPC"></DappStoreSlide>
                    <Nuxt />
                    <a-back-top>
                        <span class="Backtotop lineBG2">

                        </span>
                    </a-back-top>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import { BackTop } from 'ant-design-vue/lib'
import Header from '../header.vue'
import Footer from '../footer.vue'
import DappHeader from '../../components/dappStore/header.vue'
import DappStoreSlide from '../../components/dappStore/dappStoreSlide.vue'
import H5DappStoreSlide from '../../components/dappStore/h5/dappStoreSlide.vue'
import { mapMutations, mapState } from 'vuex'
import "@/plugins/vue-awesome-swiper.js"
import "swiper/css/swiper.css"
import Vue from 'vue'
Vue.use(BackTop)
export default {
    name: 'DappStoredefault',
    data() {
        return {
            screenWidth: this.$store.state.isPC?1920:845,
            banderList: this.$store.state.GetDappConfig.bannerList ? this.$store.state.GetDappConfig.bannerList : [],
            swiperOption: { // 配置说明直接看官网
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                loop: true,
                initialSlide: 0,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                speed: 500,
                paginationClickable: true,
                pagination: '.swiper-pagination',
                paginationType: 'bullets',
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class="' + className + '" style="margin:0px 7px"></span>';
                }
            },
        }
    },
    head() {
        return {
            script: [
                {
                    src: "https://cdn2.bitkeep.vip/files/icons_6126_51.ffe635293668a9e6b2d54447c425a246.js",
                    type: "text/javascript",
                    charset: "utf-8"
                }
            ]
        }

    },
    components: {
        DappHeader,
        DappStoreSlide,
        H5DappStoreSlide,
        Header, Footer
    },
    beforeMount(){
        window.scrollTo(0, 0);
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth
            })()
        }
    },
    computed: mapState({
        locale: state => state.locale === 'zh_CN' ? zhCN : null,
        isPC() {
            return this.$store.state.isPC
        }
    }),

    methods: {
        ...mapMutations(['changeIsPC']),
        switchLang() {
            this.locale = this.locale ? 'zh-cn' : null
        },

    },
    watch: {
        screenWidth: {
            handler(val) {
                this.changeIsPC(val > 845)
            },
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .Backtotop {
        background-image: url(../../assets/img/components/dappStore/backtop_light.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-color: #fff;
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
    }
}

.theme-dark {
    .Backtotop {
        background-image: url(../../assets/img/components/dappStore/backtop_dark.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-color: #2E2D38;
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.4);
    }
}

.body_box {
    width: 100%;
    min-height: 100vh;
    min-width: 350px;
    overflow: hidden;
}
.banderBox{
    overflow: hidden;
    padding: 0px 20px;
    .bander{
        width: 100%;
        overflow: hidden;
        border-radius: 12px !important;
    }
}

.bodycontent {
    width: 100%;
    // min-width: 1200px;
    // position: fixed;
    box-sizing: border-box !important;
}

@media screen and (min-width: 1920px) {
    .bodycontent {
        padding: 150px 196px 0px 196px;
    }
}

@media screen and (max-width: 1919px) and (min-width: 1024px) {
    .bodycontent {
        padding: 150px 70px 0px 70px;
    }
}

@media screen and (max-width: 1023px)and (min-width: 845px)  {
    .banderBox {
        width: 100%;
        padding: 150px 20px 0px 70px;

        .bander {
            width: 100%;
            border-radius: 10px;
            cursor: pointer;
            overflow: hidden;
            overflow: hidden;
            box-sizing: border-box;

            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }
    }

    .bodycontent {
        padding: 150px 20px 0px 20px !important;
    }
}
@media screen and(max-width: 844px){
    .bodycontent {
        padding: 0px 20px 0px 20px !important;
    }
}
.contentBox {
    display: flex;
    justify-content: space-between;

    .Backtotop {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 100px;
        border: 1px solid;
        cursor: pointer;
    }
}
</style>