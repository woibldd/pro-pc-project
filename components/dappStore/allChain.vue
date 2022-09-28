<template>
    <div class="Box">
        <div class="allChainbox" v-if="chainBoxshow" @click="closechainBox">
            <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" v-if="currentChain == 'All'"
                :alt='$t("DappStore.Allchain.all")' class="currentChainIcon light_icon">
            <img src="../../assets/img/components/dappStore/Mainnet & Coin_dark.svg" v-if="currentChain == 'All'"
                :alt='$t("DappStore.Allchain.all")' class="currentChainIcon dark_icon">
            <img :src="currentChainIcon" v-else :alt='$t("DappStore.Allchain.all")' class="currentChainIcon">
            <span class="text1" v-if="currentChain == 'All'" :title='$t("DappStore.Allchain.all")'>{{
                    $t("DappStore.Allchain.all")
            }}</span>
            <span class="text1" v-else :title="currentChain">{{ currentChain }}</span>
            <img src="../../assets/img/components/dappStore/icon_arrowright.svg" alt="arrowright"
                class="arrowright_light">
            <img src="../../assets/img/components/dappStore/icon_arrowright_dark.svg" alt="arrowright"
                class="arrowright_dark">
        </div>
        <!-- 没有网络搜索的暂时隐藏 -->
        <!-- <div class="allChainbox" v-else @click="setChain(null, null, null)">
            <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" v-if="currentChain == 'All'"
                alt="All Chain" class="currentChainIcon light_icon">
            <img src="../../assets/img/components/dappStore/Mainnet & Coin_dark.svg" v-if="currentChain == 'All'"
                alt="All Chain" class="currentChainIcon dark_icon">
            <img :src="currentChainIcon" v-else :alt='$t("DappStore.Allchain.all")' class="currentChainIcon">
            <span class="text1" v-if="currentChain == 'All'">{{ $t("DappStore.Allchain.all") }}</span>
            <span class="text1" v-else>{{ currentChain }}</span>
            <span style="display:blick;width:14px;height:14px"></span>
        </div> -->
        <div class="chainBox">
            <div class="chaincontent BG0 lineBG2" v-if="chainBoxshow">
                <div class="chainList">
                    <div class="chainitem BG0 lineBG2" :class="currentChain == 'All' ? 'isActiveChain' : ''"
                        :title='$t("DappStore.Allchain.all")'
                        @click="setChain('All', '../../assets/img/components/dappStore/Mainnet & Coin.svg', 'All')">
                        <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" alt="All Chain"
                            class="light_icon">
                        <img src="../../assets/img/components/dappStore/Mainnet & Coin_dark.svg" alt="All Chain"
                            class="dark_icon">
                        <span class="text1">{{ $t("DappStore.Allchain.all")
                        }}</span>
                    </div>
                </div>
                <!-- <div class="chainType text3">Top</div> -->
                <div class="chainList">
                    <div class="chainitem BG0 lineBG2" v-for="item in chain" :key="item.chain"
                        :class="currentChain == item.title ? 'isActiveChain' : ''"
                        @click="setChain(item.title, item.icon, item)" :title="item.title">
                        <img :src="item.icon" :alt="item.title">
                        <span class="text1">{{ item.title }}</span>
                    </div>
                </div>
                <!-- <div class="chainType text3">Attention</div>
            <div class="chainList">
                <div class="chainitem BG0 lineBG2">
                    <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" alt="">
                    <span class="text1">All Chain</span>
                </div>
            </div>
            <div class="chainType text3">0x Protocol</div>
            <div class="chainList">
                <div class="chainitem BG0 lineBG2">
                    <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" alt="">
                    <span class="text1">All Chain</span>
                </div>
            </div>
            <div class="chainType text3">Others</div>
            <div class="chainList">
                <div class="chainitem BG0 lineBG2">
                    <img src="../../assets/img/components/dappStore/Mainnet & Coin.svg" alt="">
                    <span class="text1">All Chain</span>
                </div>
            </div> -->
            </div>
        </div>
        <remote-js
            cdn="https://cdn2.bitkeep.vip/files/jquery.min.js"
        ></remote-js>
    </div>
</template>
<script>
import cndMixins from "@/mixins/cnd.js";
export default {
    name: "AllChain",
    mixins: [cndMixins],
    data() {
        return {
            chain: this.$store.state.GetDappConfig.chainMainnetList,
            currentChain: "All",
            currentChainIcon: "../../assets/img/components/dappStore/Mainnet & Coin.svg",
            chainBoxshow: true,
            isPC: this.$store.state.isPC
        }
    },
    created() {
        const { language, chain } = this.$router.currentRoute.params;
        const notRoute = ["/" + language + "/dapp/collect", "/" + language + "/dapp/browsinghistory", "/" + language + "/dapp/searchresults", "/" + language + "/dapp"];
        if (notRoute.find(item => item == this.$router.currentRoute.path)) {
            this.currentChain = 'All';
            this.currentChainIcon = '../../assets/img/components/dappStore/Mainnet & Coin.svg';
            this.chainBoxshow = false;
        } else {
            const selectChain = this.chain.find(item => item.chain == chain)
            if (selectChain) {
                this.currentChain = selectChain.title;
                this.currentChainIcon = selectChain.icon;
            }
            this.chainBoxshow = true;
        }
    },
    methods: {
        closechainBox() {
            if (!this.isPC) {
                $(".chainBox").toggleClass("showchainBox")
            }
        },
        setChain(setchain, icon, item) {
            const { chain, tag, language } = this.$router.currentRoute.params;
            const { ...query } = this.$route.query;
            const notRoute = ["/" + language + "/dapp/collect", "/" + language + "/dapp/browsinghistory", "/" + language + "/dapp/searchresults", "/" + language + "/dapp"];
            if (notRoute.indexOf(this.$router.currentRoute.path) == -1) {
                this.currentChain = setchain;
                this.currentChainIcon = icon;
                if (setchain != 'All') {
                    this.$router.push({
                        path: '/' + language + '/dapp/' + item.chain + '/' + tag,
                        query: { ...query }
                    })
                } else {
                    this.$router.push({
                        path: '/' + language + '/dapp/All/' + tag,
                        query: { ...query }
                    })
                }
                if (!this.isPC) {
                    $(".chainBox").removeClass("showchainBox")
                }
            } else {
                this.$message.warning(this.$t("DappStore.Allchain.error1"));
            }
        }
    },
    watch: {
        $route(to, from) {
            const { language } = this.$router.currentRoute.params;
            const notRoute = ["/" + language + "/dapp/collect", "/" + language + "/dapp/browsinghistory", "/" + language + "/dapp/searchresults", "/" + language + "/dapp"];
            if (notRoute.find(item => item == this.$router.currentRoute.path)) {
                this.currentChain = 'All';
                this.currentChainIcon = '../../assets/img/components/dappStore/Mainnet & Coin.svg';
                this.chainBoxshow = false;
            } else {
                this.chainBoxshow = true;
            }
        },
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        }
    },
}
</script>
<style lang="less" scoped>
.theme-light {
    .Box .allChainbox .arrowright_light {
        display: block;
    }

    .Box .allChainbox .arrowright_dark {
        display: none;
    }

    .Box:hover .allChainbox,
    .chainBox .chainitem:hover {
        background-color: #F2F2F5;
    }

    .isActiveChain {
        background: rgba(117, 36, 249, 0.1) !important;
        /* Common/purple */
        border: 1px solid #7524F9 !important;
        color: #7524F9 !important;

        span {
            color: #7524F9 !important;
        }
    }
}

.theme-dark {
    .Box .allChainbox .arrowright_light {
        display: none;
    }

    .Box .allChainbox .arrowright_dark {
        display: block;
    }

    .Box:hover .allChainbox,
    .chainBox .chainitem:hover {
        background-color: #252529;
    }

    .isActiveChain {
        background: rgba(137, 65, 255, 0.1) !important;
        /* Common/purple */
        border: 1px solid #7524F9 !important;
        color: #7524F9 !important;

        span {
            color: #7524F9 !important;
        }
    }

}

.Box {
    position: relative;
    z-index: 9;

    @media screen and (max-width: 1200px) {
        .chainBox {
            width: 600px !important;
        }
    }

    @media screen and (max-width: 845px) {
        .allChainbox {
            min-width: 102px !important;
            padding: 8px 10px !important;
            box-sizing: border-box !important;

            .currentChainIcon {
                width: 14px !important;
                height: 14px !important;
            }

            span {
                font-weight: 500 !important;
                font-size: 12px !important;
                line-height: 16px !important;
            }
        }

        .chainBox {
            width: 100% !important;
            position: fixed !important;
            padding: 10px 20px !important;

            .chaincontent {
                height: 440px !important;
                overflow: auto;
                padding: 20px !important;

                .chainList {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between !important;

                    .chainitem {
                        margin-right: 2px !important;
                    }
                }
            }
        }
    }

    .chainBox {
        display: none;
        position: absolute;
        left: 0;
        width: 954px;
        padding-top: 10px;
        z-index: 120;

        .chaincontent {
            width: 100%;
            border: 1px solid;
            padding: 20px 0px 10px 20px;
            box-shadow: 0px 10px 40px rgba(14, 27, 64, 0.08);
            border-radius: 8px;

            .chainType {
                width: 100%;
                font-weight: 500;
                line-height: 1.5;
                margin: 20px 0px 10px 0px;
            }

            .chainList {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;

                .chainitem {
                    width: 122px;
                    box-sizing: border-box;
                    padding: 6.5px 8px;
                    border-radius: 100px;
                    font-weight: 500;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    border: 1px solid;

                    span {
                        flex: 1;
                        display: block;
                        padding: 0px 3px;
                        word-wrap: break-word;
                        /*强制换行*/
                        overflow: hidden;
                        /*超出隐藏*/
                        text-overflow: ellipsis;
                        /*隐藏后添加省略号*/
                        white-space: nowrap;
                        /*强制不换行*/
                    }

                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }

    .allChainbox {
        min-width: 134px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        cursor: pointer;
        border-radius: 100px;
        box-sizing: border-box;

        span {
            padding: 0px 5px;
        }

        .currentChainIcon {
            width: 26px;
            height: 26px;
        }
    }
}

.showchainBox {
    display: block !important;
}

@media (any-hover:hover) {
    .Box:hover .chainBox {
        display: block;
    }
}
</style>