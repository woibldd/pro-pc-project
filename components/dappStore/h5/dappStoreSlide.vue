<template>
    <a-affix :offset-top="top">
        <div class="optional-header BG0blur" v-swiper="swiperOption">
            <div class="next-icon-wrap leftwrap BG4 lineBG2 swiper-button-prev" slot="button-prev">
                <img class="slide-arrow-left pointer light_icon"
                    src="@/assets/img/components/h5/dappStore/light/arrow_left.svg" alt="arrow_left">
                <img class="slide-arrow-left pointer dark_icon"
                    src="@/assets/img/components/h5/dappStore/dark/arrow_left.svg" alt="arrow_left">
            </div>
            <div class="vertical-scroll-wrap swiper-wrapper">
                <div class="swiper-slide">
                    <h2 class="dappStoreSlideitem text1"
                        :class="$route.path.indexOf('collect') != -1 ? 'isActive Colorpurple' : ''"
                        @click="toPath('collect')">
                        <span>{{ $t('DappStore.slide.mycollection') }}</span>
                    </h2>
                </div>
                <div class="swiper-slide">
                    <h2 class="dappStoreSlideitem text1"
                        :class="$route.path.indexOf('browsinghistory') != -1 ? 'isActive Colorpurple' : ''"
                        @click="toPath('history')">
                        <span>{{ $t('DappStore.slide.Browsinghistory') }}</span>
                    </h2>
                </div>
                <div class="swiper-slide">
                    <h2 class="dappStoreSlideitem text1"
                        :class="$route.path == '/' + $route.params.language + '/dapp' ? 'isActive Colorpurple' : ''"
                        @click="toPath('dapp')">
                        <span>{{ $t('DappStore.slide.recommend') }}</span>
                    </h2>
                </div>
                <div v-for="item in dappStoreslideList" :key="item.id" class="swiper-slide" @click="toTag(item.id)">
                    <h2 class="dappStoreSlideitem text1"
                        :class="$route.path.indexOf(item.id) != -1 ? 'isActive Colorpurple' : ''">
                        <span v-if="vuxslide.indexOf(item.title) != -1">{{ $t('DappStore.slide.' + item.title)
                        }}</span>
                        <span v-else>{{ item.title }}</span>
                    </h2>
                </div>
                <!-- <div class="vertical-scroll" :style="`height:${height}`">
                    <div class="content vertical-item-slide">
                        <h2 class="dappStoreSlideitem text1"
                            :class="$route.path.indexOf('collect') != -1 ? 'isActive Colorpurple' : ''"
                            @click="toPath('collect')">
                            <span>{{ $t('DappStore.slide.mycollection') }}</span>
                        </h2>
                        <h2 class="dappStoreSlideitem text1"
                            :class="$route.path.indexOf('browsinghistory') != -1 ? 'isActive Colorpurple' : ''"
                            @click="toPath('history')">
                            <span>{{ $t('DappStore.slide.Browsinghistory') }}</span>
                        </h2>
                        <h2 class="dappStoreSlideitem text1"
                            :class="$route.path == '/' + $route.params.language + '/dapp' ? 'isActive Colorpurple' : ''"
                            @click="toPath('dapp')">
                            <span>{{ $t('DappStore.slide.recommend') }}</span>
                        </h2>
                        <h2 class="dappStoreSlideitem text1"
                            :class="$route.path.indexOf(item.id) != -1 ? 'isActive Colorpurple' : ''"
                            v-for="item in dappStoreslideList" :key="item.id" @click="toTag(item.id)">
                            <span v-if="vuxslide.indexOf(item.title) != -1">{{ $t('DappStore.slide.' + item.title)
                            }}</span>
                            <span v-else>{{ item.title }}</span>
                        </h2>
                    </div>
                </div> -->

            </div>
            <div class="next-icon-wrap rightwrap BG4 lineBG2 swiper-button-next" slot="button-next">
                <img class="slide-arrow-right pointer light_icon"
                    src="@/assets/img/components/h5/dappStore/light/arrow_right.svg" alt="arrow_right">
                <img class="slide-arrow-right pointer dark_icon"
                    src="@/assets/img/components/h5/dappStore/dark/arrow_right.svg" alt="arrow_right">
            </div>
            <div class="optional-headerShading">
                <span class="shadow BG0"></span>
                <span class="shadow BG0"></span>
            </div>
        </div>
    </a-affix>
</template>
<script>
import Vue from 'vue'
import "@/plugins/vue-awesome-swiper.js"
import "swiper/css/swiper.css"
import Affix from 'ant-design-vue/lib'
Vue.use(Affix)
export default {
    name: "DappStoreSlideH5",
    data() {
        return {
            dappStoreslideList: this.$store.state.GetDappConfig.dataTag.tags,
            vuxslide: this.$store.state.dappStore.dappStoreSlide,
            top: 80,
            height: "55px",
            swiperOption: { // 配置说明直接看官网
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                slidesPerView: "auto",
                observer: true,
                observeParents: true,
                slideToClickedSlide: true,
                // centeredSlides: true,
                slidesOffsetBefore: 40,
                slidesOffsetAfter: 40
            },

        }
    },
    methods: {
        toTag(id) {
            const { chain, language } = this.$router.currentRoute.params;
            const { ...query } = this.$route.query;
            const Curchain = chain ? chain : 'All'
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: id,
                    Action_Location_Id:id
                }
            })
            this.$router.push({
                path: "/" + language + '/dapp/' + Curchain + '/' + id,
                query: { ...query }
            })
        },
        toPath(path) {
            const { language } = this.$router.currentRoute.params;
            const { ...query } = this.$route.query;
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: path,
                    Action_Location_Id:path
                }
            })
            switch (path) {
                case 'collect':
                    this.$router.push({
                        path: "/" + language + '/dapp/collect',
                        query: { ...query }
                    })
                    break;
                case 'history':
                    this.$router.push({
                        path: "/" + language + '/dapp/browsinghistory',
                        query: { ...query }
                    })
                    break;
                case 'dapp':
                    this.$router.push({
                        path: "/" + language + '/dapp',
                        query: { ...query }
                    })
                    break;
                default:
                    this.$router.replace({
                        path: "/" + language + '/dapp',
                        query: { ...query }
                    })
                    break;
            }
        },


    },
    components: {

    },
}
</script>
<style lang="less" scoped>

.theme-light {
    .icon_light {
        display: block;
    }

    .icon_dark {
        display: none;
    }


    .isActive {
        background: rgba(117, 36, 249, 0.1);
    }

    .next-icon-wrap {
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
    }
}

.theme-dark {
    .icon_light {
        display: none;
    }

    .icon_dark {
        display: block;
    }


    .isActive {
        background: rgba(160, 65, 255, 0.1);
    }

    .next-icon-wrap {
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.4);
    }
}

.optional-header {
    width: 100%;
    min-height: 55px;
    min-width: 350px !important;
    box-sizing: border-box;
    z-index: 100;
    -webkit-backdrop-filter: blur(20px);
    -moz-backdrop-filter: blur(20px);
    -ms-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    position: relative;
}

.vertical-scroll-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .swiper-slide {
        width: auto !important;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;

        .dappStoreSlideitem {
            display: flex;
            flex-shrink: 0;
            text-align: center;
            padding: 7px 15px;
            font-weight: 600;
            font-size: 12px;
            border-radius: 100px;
            cursor: pointer;
            box-sizing: border-box;

            span {
                display: block;
            }
        }
    }
}

.next-icon-wrap {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    border-radius: 100px;
    align-items: center;
    border: 1px solid;
    top: 60% !important;
    z-index: 11;
}
.optional-headerShading{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    .shadow{
        display: block;
        width: 20px !important;
        height: 100%;
        z-index: 10;
    }
}
</style>