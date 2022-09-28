<template>
    <div class="collectBox">
        <h1 class="text1" :title='$t("DappStore.collect.title")'>{{ $t("DappStore.collect.title") }}</h1>
        <div class="dapp" v-if="!loading && favoriteList.length > 0" :style="{ 'minHeight': dappMinheight }">
            <div class="dapplist">
                <Dappcard v-for="item in currentfavoriteList" :key="item.id" :DappData="item"
                    @unfollowDapp="unfollowDapp" source="collect"></Dappcard>
            </div>
        </div>
        <div class="notDataBox" v-if="!loading && favoriteList.length == 0">
            <img src="@/assets/img/components/dappStore/collect/light/icons.svg" class="light_icon" alt="notDat">
            <img src="@/assets/img/components/dappStore/collect/dark/icons.svg" class="dark_icon" alt="notDat">
            <div class="text3 notData" :title='$t("DappStore.collect.nocollect")'>{{ $t("DappStore.collect.nocollect")
            }}</div>
        </div>
        <div class="paginationbox" v-if="!loading && favoriteList.length > pageSize">
            <a-pagination :current="defaultcurrent" :pageSize="pageSize" :total="favoriteList.length"
                @change="onChange" />
        </div>
        <SkeletonCard :cards="16" v-if="loading"></SkeletonCard>
        <h1 class="text1" style="margin-top:20px" :title='$t("DappStore.collect.title2")'>{{
                $t("DappStore.collect.title2")
        }}</h1>
        <div class="finance" v-show="!loading">
            <div class="financelist" v-if="currentfinancialList.length > 0">
                <div class="financial_item" v-for="item in currentfinancialList" :key="item.id">
                    <Dappcard2 :DappData2="item" @unfollowfinancial="unfollowfinancial"></Dappcard2>
                </div>
                <div class="paginationbox" v-if="currentfinancialList.length > pageSize">
                    <a-pagination :current="defaultcurrent2" :pageSize="pageSize" :total="favoritefinancialList.length"
                        @change="onChange2" />
                </div>
            </div>
            <div class="notDataBox2" v-else>
                <img src="@/assets/img/components/dappStore/collect/light/icons.svg" class="light_icon" alt="noData">
                <img src="@/assets/img/components/dappStore/collect/dark/icons.svg" class="dark_icon" alt="noData">
                <div class="text3 notData" :title='$t("DappStore.collect.nocollectfinance")'>{{
                        $t("DappStore.collect.nocollectfinance")
                }}</div>
            </div>
        </div>
        <SkeletonCard :cards="8" v-if="loading"></SkeletonCard>
        <DappFooter class="footinfo"></DappFooter>
    </div>
</template>
<script>
import Dappcard from '@/components/dappStore/dappcard.vue'
import Dappcard2 from '@/components/dappStore/dappcard2.vue'
import DappFooter from '@/components/dappStore/dappfooter.vue'
import SkeletonCard from '@/components/Skeletonscreen/dappcard.vue'
import Vue from 'vue'
import { Pagination } from 'ant-design-vue/lib'
import { deepClone } from '@/tools/common'
Vue.use(Pagination)
export default {
    layout: 'dappStore/default',
    scrollToTop: true,
    async asyncData(app) {
        const GetDappConfig = await app.$api.dappStore.GetDappConfig({});
        let data;
        if (GetDappConfig.status == 0) {
            data = GetDappConfig.data;
            app.store.commit("setGetDappConfig", GetDappConfig.data)
        } else {
            data = app.store.state.GetDappConfig;
        }
        return {
            GetDappConfig: data,
            loading: true
        }
    },
    data() {
        return {
            favoriteList: [],
            favoritefinancialList: [],
            pageSize: 20,
            defaultcurrent: 1,
            defaultcurrent2: 1,
            currentfavoriteList: [],
            currentfinancialList: []
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('DappStore.title'),
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/dapp/collect` },
                { rel: 'alternate', hreflang: 'zh', href: 'https://bitkeep.com/zh/dapp/collect' },
                { rel: 'alternate', hreflang: 'en', href: 'https://bitkeep.com/en/dapp/collect' },
                { rel: 'alternate', hreflang: 'ko', href: 'https://bitkeep.com/ko/dapp/collect' },
                { rel: 'alternate', hreflang: 'x-default', href: 'https://bitkeep.com/en/dapp/collect' },
            ]
        }
    },
    components: {
        Dappcard,
        Dappcard2,
        DappFooter,
        SkeletonCard
    },
    beforeMount() {
        this.$Ta.track({
            name: 'Bitkeep__Dapp_Page', data: {
                Page_Enter: '1'
            }
        })
    },
    mounted() {
        this.$nextTick(() => {
            const { WalletID, dappStore } = this.$store.state
            //第一次拿取WalletID 可能会为空(有一个初始化的过程)
            if (!WalletID) {
                this.favoriteList = deepClone(dappStore.favoriteList);
                this.currentfavoriteList = this.favoriteList.slice(0, this.pageSize)
                this.favoritefinancialList = deepClone(dappStore.favoritefinancialList)
                this.currentfinancialList = this.favoritefinancialList.slice(0, this.pageSize)
                this.$store.watch(() => this.$store.state.dappStore.favoriteList, (newVal, oldVal) => {
                    this.favoriteList = deepClone(newVal);
                    this.currentfavoriteList = this.favoriteList.slice((this.defaultcurrent - 1) * this.pageSize, this.defaultcurrent * this.pageSize)
                })
                this.$store.watch(() => this.$store.state.dappStore.favoritefinancialList, (newVal, oldVal) => {
                    this.favoritefinancialList = deepClone(newVal);
                    this.currentfinancialList = this.favoritefinancialList.slice((this.defaultcurrent2 - 1) * this.pageSize, this.defaultcurrent2 * this.pageSize)
                })
                this.loading = false;
            } else {
                this.getfavoriteList()
            }
        })

    },
    methods: {
        async getfavoriteList() {
            const { status, data } = await this.$api.dappStore.favoriteListForPC({});
            if (status == 0 && Object.keys(data).length > 0) {
                this.favoriteList = data.dappList.map(item => {
                    item.isFavorite = true
                    return item
                });
                this.favoritefinancialList = data.financialList.map(item => {
                    item.isFavorite = true
                    return item
                });
                this.currentfavoriteList = this.favoriteList.slice(0, this.pageSize)
                this.currentfinancialList = this.favoritefinancialList.slice(0, this.pageSize)
                this.loading = false;
            } else {
                this.loading = false;
                this.favoriteList = [];
                this.favoritefinancialList = [];
                this.currentfavoriteList = []
                this.currentfinancialList = []
                if (status != 0) {
                    this.$message.error(this.$t('DappStore.collect.nocollect'))
                }
            }
        },
        unfollowDapp() {
            this.favoriteList = this.favoriteList.filter(item => {
                return item.isFavorite == true
            })
            let totalPage = Math.ceil(this.favoriteList.length / this.pageSize)
            let currentPage = this.defaultcurrent > totalPage ? totalPage : this.defaultcurrent;
            this.defaultcurrent = currentPage < 1 ? 1 : currentPage;
            this.currentfavoriteList = this.favoriteList.slice((this.defaultcurrent - 1) * this.pageSize, this.defaultcurrent * this.pageSize).length != 0 ? this.favoriteList.slice((this.defaultcurrent - 1) * this.pageSize, this.defaultcurrent * this.pageSize) : this.favoriteList.slice(0, this.pageSize)
        },
        unfollowfinancial() {
            this.favoritefinancialList = this.favoritefinancialList.filter(item => {
                return item.isFavorite == true
            })
            let totalPage = Math.ceil(this.favoritefinancialList.length / this.pageSize)
            let currentPage = this.defaultcurrent2 > totalPage ? totalPage : this.defaultcurrent2;
            this.defaultcurrent2 = currentPage < 1 ? 1 : currentPage;
            this.currentfinancialList = this.favoritefinancialList.slice((this.defaultcurrent2 - 1) * this.pageSize, this.defaultcurrent2 * this.pageSize).length != 0 ? this.favoritefinancialList.slice((this.defaultcurrent2 - 1) * this.pageSize, this.defaultcurrent2 * this.pageSize) : this.favoritefinancialList.slice(0, this.pageSize)
        },
        onChange(current) {
            this.defaultcurrent = current
            this.currentfavoriteList = this.favoriteList.slice((current - 1) * this.pageSize, current * this.pageSize)
            window.scrollTo(0, 0);
        },
        onChange2(current) {
            this.defaultcurrent2 = current;
            this.currentfinancialList = this.favoritefinancialList.slice((current - 1) * this.pageSize, current * this.pageSize)
            window.scrollTo(0, 0);
        },
    },
    computed: {
        dappMinheight() {
            return this.favoriteList.length > this.pageSize ? '760px' : '200px'
        }
    },
    watch: {
        "$store.state.WalletID": function (newVal, oldVal) {
            if (!newVal) {
                const { dappStore } = this.$store.state
                this.favoriteList = deepClone(dappStore.favoriteList);
                this.currentfavoriteList = this.favoriteList.slice(0, this.pageSize)
                this.favoritefinancialList = deepClone(dappStore.favoritefinancialList)
                this.currentfinancialList = this.favoritefinancialList.slice(0, this.pageSize)
                this.$store.watch(() => this.$store.state.dappStore.favoriteList, (newVal, oldVal) => {
                    this.favoriteList = deepClone(newVal);
                    this.currentfavoriteList = this.favoriteList.slice((this.defaultcurrent - 1) * this.pageSize, this.defaultcurrent * this.pageSize)
                })
                this.$store.watch(() => this.$store.state.dappStore.favoritefinancialList, (newVal, oldVal) => {
                    this.favoritefinancialList = deepClone(newVal);
                    this.currentfinancialList = this.favoritefinancialList.slice((this.defaultcurrent2 - 1) * this.pageSize, this.defaultcurrent2 * this.pageSize)
                })
            } else {
                this.getfavoriteList()
            }
            window.scrollTo(0, 0);
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .collectBox {
        padding: 20px 0px 0px 0px !important;
        box-sizing: border-box;

        h1 {
            font-weight: 600;
            font-size: 14px !important;
            line-height: 1.5;
            display: flex;
            align-items: center;
            margin-bottom: 12px !important;
        }

        .categoryList {
            margin-top: 10px !important;
        }

        .financelist {
            margin-top: 10px !important;

            .financial_item {
                width: 100%;
            }
        }

        .notDataBox,
        .notDataBox2 {
            height: 200px !important;

            img {
                width: 64px;
                height: 64px;
            }
        }

        .footinfo {
            bottom: 40px !important;
            margin: 40px 0px !important;
        }
    }
}


@media screen and (max-width: 1540px) and (min-width: 1201px) {
    .financelist {
        flex-direction: column;

        .financial_item {
            width: 100% !important;
            min-width: 100% !important;
            margin-right: 0px;
        }
    }
}

@media screen and (max-width: 1200px) and (min-width: 300px) {
    .financelist {
        flex-direction: column;

        .financial_item {
            width: 100% !important;
            min-width: 340px !important;
        }
    }
}

.collectBox {
    flex: 1;
    padding: 20px 0px 0px 18px;
    min-height: 100vh;

    h1 {
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        margin-bottom: 20px;
    }

    .dapp {
        width: 100%;

        .dapplist {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
        }
    }

    .paginationbox {
        width: 100%;
        margin: 20px 0px;
        text-align: right;
    }

    .finance {
        width: 100%;
        margin-top: 20px;

        .financelist {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;

            .financial_item {
                width: 49%;
                min-width: 562px;

                .cardlist {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }
            }

            .paginationbox {
                width: 100%;
                text-align: right;
            }
        }
    }

    .notDataBox {
        width: 100%;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .notData {
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            display: flex;
            align-items: center;
            text-align: center;
        }
    }

    .notDataBox2 {
        width: 100%;
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .notData {
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            display: flex;
            align-items: center;
            text-align: center;
        }
    }

    .footinfo {
        margin: 24px 0px 100px 0px;
    }
}

.collectBox::-webkit-scrollbar {
    display: none;
}
</style>