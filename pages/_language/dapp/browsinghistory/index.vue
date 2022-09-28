<template>
    <div class="browsinghistoryBox">
        <div class="browsingTitle">
            <h1 class="text1" :title='$t("DappStore.history.history")'>{{ $t("DappStore.history.history") }}</h1> <img
                src="@/assets/img/components/dappStore/search/light/remove_history_icons.svg" alt="remove_history_icons"
                class="light_icon" @click="RemoveAll">
            <img src="@/assets/img/components/dappStore/search/dark/remove_history_icons.svg" alt="remove_history_icons"
                class="dark_icon" @click="RemoveAll">
        </div>
        <div class="historyBox" v-if="!loading && historyList.length > 0" :style="{ 'minHeight': dappMinheight }">
            <div class="historyList" v-if="historyList.length > 0">
                <Dappcard v-for="item in currenthistoryList" :key="item.id" :DappData="item" source="history"></Dappcard>
            </div>
        </div>
        <div class="paginationbox" v-if="!loading && historyList.length > 20">
            <a-pagination :current="defaultcurrent" :pageSize="20" :total="historyList.length" @change="onChange" />
        </div>
        <div class="notDataBox" v-if="!loading && historyList.length == 0">
            <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
            <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
            <div class="text3 notData" :title='$t("DappStore.history.noHistory")'>{{ $t("DappStore.history.noHistory")}}</div>
        </div>
        <SkeletonCard :cards="20" v-if="loading"></SkeletonCard>
        <DappFooter class="footinfo" v-show="!loading"></DappFooter>
    </div>
</template>
<script>
import Vue from 'vue'
import { Pagination } from 'ant-design-vue/lib'
import SkeletonCard from '@/components/Skeletonscreen/dappcard.vue'
import Dappcard from '@/components/dappStore/dappcard.vue'
import DappFooter from '@/components/dappStore/dappfooter.vue'
import { mapMutations } from 'vuex'
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
            GetDappConfig: data
        }
    },
    data() {
        return {
            historyList: [],
            defaultcurrent: 1,
            currenthistoryList: [],
            loading: true
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('DappStore.title'),
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/dapp/browsinghistory` },
                { rel: 'alternate', hreflang: 'zh', href: 'https://bitkeep.com/zh/dapp/browsinghistory' },
                { rel: 'alternate', hreflang: 'en', href: 'https://bitkeep.com/en/dapp/browsinghistory' },
                { rel: 'alternate', hreflang: 'ko', href: 'https://bitkeep.com/ko/dapp/browsinghistory' },
                { rel: 'alternate', hreflang: 'x-default', href: 'https://bitkeep.com/en/dapp/browsinghistory' },
            ]
        }
    },
    components: {
        Dappcard,
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
                this.historyList = deepClone(dappStore.historyList);
                this.currenthistoryList = deepClone(dappStore.historyList).slice(0, 20)
                this.loading = false;
            } else {
                this.gethistoryList()
            }
        })

    },
    methods: {
        ...mapMutations({
            removeHistoryList: 'dappStore/removeHistoryList'
        }),
        async gethistoryList() {
            this.loading = true;
            const { status, data } = await this.$api.dappStore.GetDapphistoryList({});
            if (status == 0) {
                this.historyList = data;
                this.currenthistoryList = data.slice(0, 20)
                this.loading = false;
            } else {
                this.loading = false;
                this.$message.error(this.$t("DappStore.history.getHistoryFail"))
            }
        },
        async RemoveAll() {
            if (this.historyList.length == 0) {
                return this.$message.warning(this.$t("DappStore.history.noHistory"))
            }
            const { WalletID } = this.$store.state
            if (!WalletID) {
                this.historyList = [];
                this.removeHistoryList()
                this.$message.success(this.$t("DappStore.history.deleteHistorySuccess"))
            } else {
                const ids = this.historyList.map(item => item.id).join(',')
                const { status, data } = await this.$api.dappStore.Dapphistory({ ids: ids, status: 'unfollow' })
                if (status == 0) {
                    this.historyList = [];
                    this.$message.success(this.$t("DappStore.history.deleteHistorySuccess"))
                } else {
                    this.$message.error(this.$t("DappStore.history.deleteHistoryFail"));
                }
            }
        },
        onChange(current) {
            this.defaultcurrent = current
            this.currenthistoryList = this.historyList.slice((this.defaultcurrent - 1) * 20, this.defaultcurrent * 20)
            window.scrollTo(0, 0);
        }
    },
    computed: {
        dappMinheight() {
            return this.historyList.length > 20 ? '760px' : '70%'
        }
    },
    watch: {
        "$store.state.WalletID": function (newVal, oldVal) {
            if(!newVal){
                const { dappStore } = this.$store.state
                this.historyList = deepClone(dappStore.historyList);
                this.currenthistoryList = deepClone(dappStore.historyList).slice(0, 20)
            }else{
                this.gethistoryList()
            }  
            window.scrollTo(0, 0);
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .browsinghistoryBox {
        padding: 20px 0px 0px 0px !important;

        .browsingTitle {
            h1 {
                font-size: 14px !important;
                line-height: 1.14 !important;
            }

            img {
                cursor: pointer;
            }
        }

        .notDataBox {
            height: 250px !important;
            img{
                width: 64px;
                height: 64px;
            }
            .notData {
                font-weight: 500;
                font-size: 18px;
                line-height: 25px;
                display: flex;
                align-items: center;
                text-align: center;
            }
        }
    }

    .footinfo {
        bottom: 40px !important;
        margin: 40px 0px !important;
    }
}

.browsinghistoryBox {
    flex: 1;
    min-height: 100vh;
    padding: 20px 0px 0px 18px;

    .browsingTitle {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        h1 {
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
        }

        img {
            cursor: pointer;
        }
    }

    .historyBox {
        width: 100%;

        .historyList {
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
        margin: 24px 0px 100px 0px;
    }
}

.browsinghistoryBox::-webkit-scrollbar {
    display: none;
}
</style>