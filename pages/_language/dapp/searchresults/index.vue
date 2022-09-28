<template>
    <div class="searchResultsBox">
        <div class="searchResults">
            <div class="searchtitle">
                <h1 class="text1" :title='$t("DappStore.search.title")'>{{ $t("DappStore.search.title") }}</h1>
            </div>
            <div class="searchtitle" :title='$t("DappStore.search.title2")'><span class="text3"
                    :title='$t("DappStore.search.title2")'>{{ $t("DappStore.search.title2") }}</span></div>
            <!-- 关闭搜索网址联想 -->
            <!-- <div class="possibleSearch">
                <h3 class="text1">{{ $t("DappStore.search.title3") }}</h3>
                <div class="possibleurl">
                    <a :href='dappSearchValue | urlDisplay' target="_blank" class="Colorpurple">{{ dappSearchValue |
                            urlDisplay
                    }}</a>
                </div>
            </div> -->
            <div v-show="!SkeletonShow && GetDappSearch.length > 0" class="searchrelatedBox">
                <div class="searchrelated">
                    <Dappcard3 :DappData3="item" v-for="item in currentDappSearch" :key="item.id"></Dappcard3>
                </div>
            </div>
            <div class="paginationbox" v-if="!SkeletonShow && GetDappSearch.length > 10">
                <a-pagination :current="defaultcurrent" :pageSize="10" :total="GetDappSearch.length"
                    @change="onChange" />
            </div>
            <div class="notDataBox" v-if="!SkeletonShow && GetDappSearch.length == 0">
                <img src="@/assets/img/components/dappStore/search/light/not_search_icons.svg" class="light_icon"
                    alt="noData">
                <img src="@/assets/img/components/dappStore/search/dark/not_search_icons.svg" class="dark_icon"
                    alt="noData">
                <div class="text3 notData" :title='$t("DappStore.search.nosearch")'>{{ $t("DappStore.search.nosearch")
                }}</div>
            </div>
            <SkeletonCard3 :cards="10" v-show="SkeletonShow"></SkeletonCard3>
            <DappFooter class="footinfo"></DappFooter>
        </div>
        <div class="hotSearch">
            <h3 class="text1" :title='$t("DappStore.search.hotsearch")'>{{ $t("DappStore.search.hotsearch") }}</h3>
            <div class="hotSearchList">
                <div class="hotSearchItem BG1" :class="dappSearchValue == item ? 'isActive' : ''"
                    v-for="item in GetDappConfig.keywords" :key="item" :title="item" @click="search(item)">
                    <span class="text2" :title="item">{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Pagination } from 'ant-design-vue/lib'
import Dappcard3 from '@/components/dappStore/dappcard3.vue'
import DappFooter from '@/components/dappStore/dappfooter.vue'
import SkeletonCard3 from '@/components/Skeletonscreen/dappcard3.vue'
import { mapMutations } from 'vuex'
Vue.use(Pagination)
export default {
    name: "dappSearchresults",
    layout: 'dappStore/default',
    scrollToTop: true,
    async asyncData(app) {
        const [GetDappConfig, GetDappSearch] = await Promise.all([
            app.$api.dappStore.GetDappConfig({}),
            app.$api.dappStore.dappSearch({ keyword: app.store.state.dappStore.dappSeachValue })
        ])
        let data, data2;
        if (GetDappConfig.status == 0) {
            data = GetDappConfig.data
            app.store.commit("setGetDappConfig", GetDappConfig.data)
        } else {
            data = app.store.state.GetDappConfig
        }
        if (GetDappSearch.status == 0) {
            data2 = GetDappSearch.data
        } else {
            data2 = []
        }
        return {
            GetDappConfig: data,
            GetDappSearch: data2,
            currentDappSearch: data2.length > 0 ? data2.slice(0, 10) : [],
            WalletID: app.store.state.WalletID,
        }
    },
    components: {
        Dappcard3,
        DappFooter,
        SkeletonCard3
    },
    data() {
        return {
            dappSearchValue: this.$store.state.dappStore.dappSeachValue,
            defaultcurrent: 1,
            SkeletonShow: true,
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('DappStore.title'),
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/dapp/searchresults` },
                { rel: 'alternate', hreflang: 'zh', href: 'https://bitkeep.com/zh/dapp/searchresults' },
                { rel: 'alternate', hreflang: 'en', href: 'https://bitkeep.com/en/dapp/searchresults' },
                { rel: 'alternate', hreflang: 'ko', href: 'https://bitkeep.com/ko/dapp/searchresults' },
                { rel: 'alternate', hreflang: 'x-default', href: 'https://bitkeep.com/en/dapp/searchresults' },
            ]
        }

    },
    created() {
        const { WalletID, dappStore } = this.$store.state;
        if (this.WalletID != WalletID) {
            this.searchlist(dappStore.dappSeachValue)
        } else {
            if (dappStore.dappSeachValue != '') {
                this.searchlist(dappStore.dappSeachValue)
            } else {
                this.$nextTick(() => {
                    this.SkeletonShow = false;
                })
            }
        }
    },
    beforeMount() {
        this.$Ta.track({
            name: 'Bitkeep__Dapp_Page', data: {
                Page_Enter: '1'
            }
        })
    },
    methods: {
        ...mapMutations({
            changedappSeachValue: 'dappStore/changedappSeachValue'
        }),
        async searchlist(dappSearchValue) {
            this.SkeletonShow = true
            const { data, status } = await this.$api.dappStore.dappSearch({ keyword: dappSearchValue });
            if (status == 0) {
                this.GetDappSearch = data;
                this.currentDappSearch = data.slice(0, 20)
                this.SkeletonShow = false
            }
        },
        search(dappSearchValue) {
            this.changedappSeachValue(dappSearchValue)
        },
        onChange(current) {
            this.defaultcurrent = current
            this.currentDappSearch = this.GetDappSearch.slice((this.defaultcurrent - 1) * 10, this.defaultcurrent * 10)
            window.scrollTo(0, 0);
        }
    },
    //页面离开前
    beforeRouteLeave(to, from, next) {
        this.changedappSeachValue('')
        next()
    },
    watch: {
        "$store.state.dappStore.dappSeachValue": function (newVal, oldVal) {
            this.searchlist(newVal)
            this.dappSearchValue = newVal;  
            window.scrollTo(0, 0);
        },
        "$store.state.WalletID": function (newVal, oldVal) {
                this.searchlist(this.$store.state.dappStore.dappSeachValue)
                window.scrollTo(0, 0);
        }
    },
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .searchResultsBox {
        width: 100%;
        padding: 20px 0px 0px 0px !important;
        box-sizing: border-box;

        .searchResults {
            width: 100% !important;
            .searchtitle{
                h1{
                    font-weight: 600 !important;
                    font-size: 14px !important;
                    line-height: 1.5 !important;
                }
            }
            .searchtitle2 {
                display: block !important;
                margin-bottom: 10px;

                span {
                    font-size: 12px;
                }
            }

        }

        .possibleSearch {
            width: 100%;
            margin-bottom: 20px !important;

            .possibleurl {
                a {
                    font-size: 14px !important;
                    font-weight: 500;
                    width: 238px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .hotSearch {
            display: none;
        }
    }
}

.theme-light {
    .isActive {
        background: rgba(117, 36, 249, 0.1);

        span {
            color: #7524F9;
        }
    }
}

.theme-dark {
    .isActive {
        background: rgba(117, 36, 249, 0.1);

        span {
            color: #7524F9;
        }
    }
}

.searchResultsBox {
    flex: 1;
    overflow: hidden;
    padding: 20px 0px 0px 18px;
    display: flex;

    .searchResults {
        width: 755px;

        .searchtitle {
            display: flex;
            align-items: baseline;
            margin-bottom: 20px;

            h1 {
                font-weight: 600;
                font-size: 24px;
                line-height: 34px;
                white-space: nowrap;
            }

            span {
                font-weight: 500;
                font-size: 11px;
                line-height: 1.45;
            }
        }

        .searchtitle:nth-of-type(1) {
            margin-bottom: 5px;
        }

        .searchtitle2 {
            display: none;
        }

        .searchrelatedBox {
            width: 100%;
            min-height: 1338px;
        }

        .possibleSearch {
            width: 100%;
            margin-bottom: 40px;

            h3 {
                font-weight: 500;
                font-size: 16px;
                line-height: 1.25;
                margin-bottom: 10px;
            }

            .possibleurl {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                flex-direction: row;

                a {
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 1.25;
                    margin-right: 20px;
                    width: 238px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .paginationbox {
            width: 100%;
            margin: 20px 0px;
            text-align: right;
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

        .footinfo {
            margin: 54px 0px 100px 0px;
        }
    }

    .searchResults::-webkit-scrollbar {
        display: none;
    }

    .hotSearch {
        flex: 1;
        padding-left: 20px;

        h3 {
            font-weight: 500;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 10px;
        }

        .hotSearchList {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;

            .hotSearchItem {
                padding: 8px 16px;
                margin-right: 10px;
                margin-bottom: 10px;
                text-align: center;
                line-height: 1.14;
                border-radius: 100px;
                font-weight: 500;
                font-size: 12px;
                cursor: pointer;
            }

        }
    }


}
</style>