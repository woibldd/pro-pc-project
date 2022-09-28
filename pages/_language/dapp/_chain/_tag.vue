<template>
    <div class="DappTag">
        <h1 class="text1" :title="params.tag">
            <span v-if="vuxslide.indexOf(params.tag) != -1" :title="$t('DappStore.slide.' + params.tag)">{{
                    $t('DappStore.slide.' + params.tag)
            }}</span>
            <span v-else :title="params.tag">{{ params.tag }}</span>
        </h1>
        <SkeletonCard :cards="24" v-show="SkeletonShow"></SkeletonCard>
        <div class="cardlistBox">
            <div class="cardlist" v-show="!SkeletonShow">
                <Dappcard v-for="item in currentDappList" :key="item.id" :DappData="item" :params="params" :source="params.tag"></Dappcard>
            </div>
            <div class="notDataBox" v-if="GetDappList.length<1">
                 <img src="@/assets/img/components/dappStore/Tag/light/noData_icons.svg" class="light_icon" alt="notData">
                <img src="@/assets/img/components/dappStore/Tag/dark/noData_icons.svg" class="dark_icon" alt="notData">
                <div class="text3 notData" :title='$t("DappStore.history.noHistory")'>{{ $t("DappStore.Tag.noData")}}</div>
            </div>
        </div>
        <div class="paginationbox" v-show="!SkeletonShow&&GetDappList.length>20">
            <a-pagination :current="defaultcurrent" :pageSize="20" :total="GetDappList.length" @change="onChange" />
        </div>
        <DappFooter class="footinfo"></DappFooter>
    </div>
</template>
<script>
import Vue from 'vue'
import { Pagination } from 'ant-design-vue/lib'
import Dappcard from '@/components/dappStore/dappcard.vue'
import DappFooter from '@/components/dappStore/dappfooter.vue'
import SkeletonCard from '@/components/Skeletonscreen/dappcard.vue'
Vue.use(Pagination)
export default {
    layout: 'dappStore/default',
    scrollToTop: true,
    async asyncData(app) {
        const { tag, chain } = app.params;
        const [GetDappConfig, GetDappList] = await Promise.all([
            app.$api.dappStore.GetDappConfig({}),
            app.$api.dappStore.GetDappList({ type: "tag", id: tag, chain: chain.toLowerCase() == 'all' ? '' : chain })
        ])
        let data, data2;
        if (GetDappConfig.status == 0) {
            data = GetDappConfig.data
            app.store.commit("setGetDappConfig", GetDappConfig.data)
        } else {
            data = app.store.state.GetDappConfig
        }
        if (GetDappList.status == 0) {
            data2 = GetDappList.data
        } else {
            data2 = []
        }
        return {
            GetDappConfig: data,
            GetDappList: data2,
            params: app.params,
            currentDappList: data2.length > 0 ? data2.slice(0, 20) : [],
            WalletID: app.store.state.WalletID,
        }
    },
    data() {
        return {
            defaultcurrent: 1,
            SkeletonShow: true,
            vuxslide: this.$store.state.dappStore.dappStoreSlide
        }
    },
    head() {
        const { language, chain, tag } = this.$route.params;
        let title, description, keywords;
        switch (language) {
            case "zh":
                const zhtag=this.vuxslide.indexOf(tag) != -1?this.$t('DappStore.slide.' + tag):tag;     
                title =`${zhtag} DApps | 去中心化${zhtag}应用 | BitKeep DApp Store`;
                description = `BitKeep DApp应用商店为您提供各种区块链上的去中心化${zhtag}应用。立即在我们的一站式平台上探索${zhtag}DApp的完整列表。`;
                keywords = `BitKeep dapp store,dapp应用商店,区块链${zhtag}应用,区块链${zhtag}dapp,${zhtag}Dapp, Dapp${zhtag}, ${zhtag}dapp排行榜, ${zhtag}dapp应用商店, 去中心化${zhtag}应用商店,去中心化${zhtag}应用`;
                break;
            case "en":
                title = tag=='DeFi'?`Top Decentralized Finance Apps | BitKeep DApp Store`: `Top Decentralized ${tag} Apps | BitKeep DApp Store`;
                description = tag=='DeFi'?`BitKeep's DApp store provides you DeFi Apps built on various blockchains. Explore the full list of decentralized finance apps now on our one-stop platform.`:`BitKeep's DApp store provides you ${tag} DApps built on various blockchains. Explore the full list of ${tag} DApps now on our one-stop platform.`;
                keywords = tag=='DeFi'?`bitkeep, bitkeep dapps, bitkeep dapp store,DeFi dapp,decentralized finance apps, DeFi dapp blockchain,decentralized finance application, DeFi dapp store`:`bitkeep, bitkeep dapps, bitkeep dapp store, ${tag} dapp,decentralized ${tag} apps, ${tag} dapp blockchain,decentralized ${tag} application, ${tag} dapp store`;
                break;
            case "ko":
                title = tag=='DeFi'?`Top Decentralized Finance Apps | BitKeep DApp Store`: `Top Decentralized ${tag} Apps | BitKeep DApp Store`;
                description = tag=='DeFi'?`BitKeep's DApp store provides you DeFi Apps built on various blockchains. Explore the full list of decentralized finance apps now on our one-stop platform.`:`BitKeep's DApp store provides you ${tag} DApps built on various blockchains. Explore the full list of ${tag} DApps now on our one-stop platform.`;
                keywords = tag=='DeFi'?`bitkeep, bitkeep dapps, bitkeep dapp store,DeFi dapp,decentralized finance apps, DeFi dapp blockchain,decentralized finance application, DeFi dapp store`:`bitkeep, bitkeep dapps, bitkeep dapp store, ${tag} dapp,decentralized ${tag} apps, ${tag} dapp blockchain,decentralized ${tag} application, ${tag} dapp store`;
                break;
            default:
                title = tag=='DeFi'?`Top Decentralized Finance Apps | BitKeep DApp Store`: `Top Decentralized ${tag} Apps | BitKeep DApp Store`;
                description = tag=='DeFi'?`BitKeep's DApp store provides you DeFi Apps built on various blockchains. Explore the full list of decentralized finance apps now on our one-stop platform.`:`BitKeep's DApp store provides you ${tag} DApps built on various blockchains. Explore the full list of ${tag} DApps now on our one-stop platform.`;
                keywords = tag=='DeFi'?`bitkeep, bitkeep dapps, bitkeep dapp store,DeFi dapp,decentralized finance apps, DeFi dapp blockchain,decentralized finance application, DeFi dapp store`:`bitkeep, bitkeep dapps, bitkeep dapp store, ${tag} dapp,decentralized ${tag} apps, ${tag} dapp blockchain,decentralized ${tag} application, ${tag} dapp store`;
                break;
        }
        return {
            title: title,
            meta: [
                { name: 'keywords', content: keywords },
                { name: 'description', content: description },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/dapp/${chain}/${tag}` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/dapp/${chain}/${tag}` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/dapp/${chain}/${tag}` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/dapp/${chain}/${tag}` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/dapp/${chain}/${tag}` },
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
        const { WalletID } = this.$store.state;
        if (this.WalletID != WalletID) {
            this.DappList()
        } else {
            this.$nextTick(() => {
                this.SkeletonShow = false
            })
        }
    },
    methods: {
        async DappList() {
            this.SkeletonShow = true
            const { tag, chain } = this.params;
            const { status, data } = await this.$api.dappStore.GetDappList({ type: "tag", id: tag, chain: chain.toLowerCase() == 'all' ? '' : chain })
            this.GetDappList = data;
            this.currentDappList = this.GetDappList.slice(0, 20);
            this.$nextTick(() => {
                this.SkeletonShow = false
            })
        },
        onChange(current) {
            this.defaultcurrent = current
            this.currentDappList = this.GetDappList.slice((this.defaultcurrent - 1) * 20, this.defaultcurrent * 20)
            window.scrollTo(0, 0);
        }
    },
    watch: {
        "$store.state.WalletID": function (newVal, oldVal) {
            this.DappList()
            window.scrollTo(0, 0);
        },
        "$store.state.locale": function (newVal, oldVal) {
            this.SkeletonShow = true;
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 845px) {
    .DappTag {
        width: 100% !important;
        padding: 20px 0px 0px 0px !important;
        box-sizing: border-box;

        h1 {
            font-weight: 600 !important;
            font-size: 14px !important;
            line-height: 16px !important;
        }
    }
}

.DappTag {
    flex: 1;
    padding: 20px 0px 0px 18px;
    box-sizing: border-box;
    min-height: 100vh;
    position: relative;

    >h1 {
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        margin-bottom: 20px;
    }

    .cardlistBox {
        width: 100%;
        min-height: 760px;
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

    .cardlist {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        // margin-bottom: 100px;
    }

    .paginationbox {
        width: 100%;
        margin: 20px 0px;
        text-align: right;
    }

    .footinfo {
        margin: 54px 0px 100px 0px;
    }
}

.DappTag::-webkit-scrollbar {
    display: none;
}
</style>