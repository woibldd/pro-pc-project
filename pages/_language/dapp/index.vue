<template>
    <div class="Dappcontent">
        <div class="bander" v-swiper="swiperOption" v-if="banderList.length > 0&&isPC">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in banderList">
                    <a :href="item.jump_url" target="_blank">
                        <img :src="item.image_url" :alt="item.image_url" />
                    </a>
                </div>
            </div>
        </div>
        <div class="paginationBox" v-if="banderList.length > 0&&isPC">
            <div class="swiper-pagination"></div>
        </div>
        <div class="categoryList" v-for="(item, index) in GetDappIndex.categoryList" :key="'category' + index">
            <h2 class="text1" :title="item.categoryName">{{ item.categoryName }}</h2>
            <div class="cardlist" v-if="!SkeletonShow">
                <Dappcard v-for="item in item.dappList" :key="item.id" :DappData="item" source="dapp"></Dappcard>
            </div>
            <SkeletonCard :cards="8" v-show="SkeletonShow"></SkeletonCard>
        </div>
        <div class="financialList" v-if="isPC">
            <div class="financial_item" v-for="(item, index) in GetDappIndex.financialList" :key="'financia' + index">
                <h2 class="text1" :title="item.categoryName">{{ item.categoryName }}</h2>
                <div class="cardlist" v-show="!SkeletonShow">
                    <Dappcard2 v-for="item in item.financialList" :key="item.id" :DappData2="item"></Dappcard2>
                </div>
                <SkeletonCard :cards="16" v-show="SkeletonShow"></SkeletonCard>
            </div>
        </div>
        <a-tabs  class="dappindexTab text3" v-else>
            <a-tab-pane class="financial_item" :key="index" :tab="item.categoryName"
                v-for="(item, index) in GetDappIndex.financialList" :forceRender="true">
                <div class="cardlist" v-show="!SkeletonShow">
                    <Dappcard2 v-for="item in item.financialList" :key="item.id" :DappData2="item"></Dappcard2>
                </div>

            </a-tab-pane>
        </a-tabs>
        <DappFooter class="footinfo"></DappFooter>
    </div>
</template>
<script>
import Vue from 'vue'
import Dappcard from '@/components/dappStore/dappcard.vue'
import Dappcard2 from '@/components/dappStore/dappcard2.vue'
import DappFooter from '@/components/dappStore/dappfooter.vue'
import SkeletonCard from '@/components/Skeletonscreen/dappcard.vue'
import "@/plugins/vue-awesome-swiper.js"
import "swiper/css/swiper.css"
import { Tabs } from 'ant-design-vue/lib' 
Vue.use(Tabs)
// import { deepClone } from '@/tools/common'
export default {
    name: 'DappPage',
    layout: 'dappStore/default',
    scrollToTop: true,
    async asyncData(app) {
        const [GetDappConfig, GetDappIndex] = await Promise.all([
            app.$api.dappStore.GetDappConfig({}),
            app.$api.dappStore.dappIndex({})
        ])
        let data, data2;
        if (GetDappConfig.status == 0) {
            data = GetDappConfig.data
            app.store.commit("setGetDappConfig", GetDappConfig.data)
        } else {
            data = app.store.state.GetDappConfig
        }
        if (GetDappIndex.status == 0) {
            data2 = GetDappIndex.data
        } else {
            data2 = { categoryList: [], financialList: [] }
        }
        return {
            GetDappConfig: data,
            banderList: data['bannerList'] ? data['bannerList'] : [],
            GetDappIndex: data2,
            WalletID: app.store.state.WalletID,
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('DappStore.indexTitle'),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('DappStore.indexKeywords') },
                {hid: 'description', name: 'description', content: this.$t('DappStore.indexDescription') },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/dapp` },
                { rel: 'alternate', hreflang: 'zh', href: 'https://bitkeep.com/zh/dapp' },
                { rel: 'alternate', hreflang: 'en', href: 'https://bitkeep.com/en/dapp' },
                { rel: 'alternate', hreflang: 'ko', href: 'https://bitkeep.com/ko/dapp' },
                { rel: 'alternate', hreflang: 'x-default', href: 'https://bitkeep.com/en/dapp' },
            ]        
        }

    },
    data() {
        return {
            SkeletonShow: true,
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
            isPC: this.$store.state.isPC,
        }
    },
    beforeMount() {
        this.$Ta.track({
            name: 'Bitkeep__Dapp_Page', data: {
                Page_Enter: '1'
            }
        })
    },
    mounted() {
        const { WalletID } = this.$store.state;
        if (this.WalletID != WalletID) {
            this.DappIndex()
        } else {
            this.$nextTick(() => {
                this.SkeletonShow = false
            })
        }
    },
    components: {
        Dappcard,
        Dappcard2,
        DappFooter,
        SkeletonCard
    },
    methods: {
        async DappIndex() {
            this.SkeletonShow = true;
            // const { WalletID } = this.$store.state
            const { status, data } = await this.$api.dappStore.dappIndex({})
            if (status != 0) {
                this.$message.error(this.$t('DappStore.IndexDapp.error1'))
            }
            this.GetDappIndex = data;
            this.$nextTick(() => {
                this.SkeletonShow = false;
            })

        }
    },
    watch: {
        "$store.state.WalletID": function (newVal, oldVal) {
                this.DappIndex()
                window.scrollTo(0, 0);
        },
        "$store.state.locale": function (newVal, oldVal) {
            this.SkeletonShow = true;
        },
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        }
    },
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .Dappcontent {
        padding: 20px 0px 0px 0px !important;
        box-sizing: border-box;

        .categoryList {
            margin-top: 10px !important;

            h1 {
                font-weight: 600;
                font-size: 14px !important;
                line-height: 1.5;
                display: flex;
                align-items: center;
                margin-bottom: 12px !important;
            }

            .cardlist {
                height: 190px;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                overflow: auto;

                .cardItem {
                    margin-right: 10px !important;
                    width: 80% !important;
                }
            }

            .cardlist::-webkit-scrollbar {
                display: none;
            }
        }

        .financialList {
            margin-top: 10px !important;

            .financial_item {
                width: 100%;

                h1 {
                    font-size: 14px !important;
                    margin-bottom: 12px !important;
                }
            }
        }
    }
}


@media screen and (max-width: 1540px) and (min-width: 1201px) {
    .financialList {
        flex-direction: column;

        .financial_item {
            width: 100% !important;
            min-width: 100% !important;
            margin-right: 0px;
        }
    }
}

@media screen and (max-width: 1200px) and (min-width: 300px) {
    .financialList {
        flex-direction: column;

        .financial_item {
            width: 100% !important;
            min-width: 300px !important;
        }
    }
}

@media screen and (max-width: 845px) {

    .categoryList,
    .financialList {
        h2 {
            font-size: 14px !important;
            line-height: 1.14 !important;
            font-weight: 600 !important;
        }
    }
}

.contentBox {
    display: flex;
    justify-content: space-between;

    .Backtotop {
        width: 50px;
        height: 50px;
        border-radius: 100px;
        border: 1px solid;
        cursor: pointer;
    }

    .Dappcontent {
        flex: 1;
        padding: 20px 0px 0px 18px;
        box-sizing: border-box;
        min-height: 100vh;
        overflow: hidden;

        .bander {
            width: 100%;
            border-radius: 10px;
            cursor: pointer;
            overflow: hidden;

            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }

        .paginationBox {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;

            .swiper-pagination {
                width: 100%;
                text-align: center;
            }
        }

        .categoryList {
            width: 100%;
            margin-top: 10px;

            h2 {
                font-weight: 600;
                font-size: 24px;
                line-height: 1.5;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }

            .cardlist {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
        }

        .financialList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 40px;

            .financial_item {
                flex: 1;
                min-width: 562px;

                h2 {
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 1.5;
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .cardlist {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }
            }

            .financial_item:first-child {
                margin-right: 20px;
            }
        }

        .footinfo {
            margin: 54px 0px 100px 0px;
        }
    }

    .Dappcontent::-webkit-scrollbar {
        display: none;
    }
}
</style>