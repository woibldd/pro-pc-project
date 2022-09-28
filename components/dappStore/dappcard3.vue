<template>
    <div class="cardItem3 BG0 lineBG2">
        <a :href="DappData3.url" target="_blank" class="seo_href" @click="handleclcik($event, DappData3)">
            <div class="itemTop">
                <avatar :size="40" :src="DappData3.icon" :title="DappData3.name" :alt="DappData3.name"
                    :initials="DappData3.name.slice(0, 4)" :customStyle="customStyle">
                </avatar>
                <div class="itemTopInfo">
                    <div class="itemName">
                        <h2 class="text1" :title="DappData3.name">
                            {{ DappData3.name }}
                        </h2>
                        <div class="cardShare">
                            <a-tooltip placement="top" v-if="DappData3.telegram">
                                <template #title>
                                    <span title="Telegram">Telegram</span>
                                </template>

                                <span class="shareicon">
                                    <a :href="DappData3.telegram" target="_blank" rel="noopener noreferrer">
                                        <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#919899"
                                            class="light_icon" :data_val="DappData3.telegram">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#707076"
                                            class="dark_icon" :data_val="DappData3.telegram">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#7524F9"
                                            class="hover_icon" :data_val="DappData3.telegram">
                                        </iconpark-icon>
                                    </a>
                                </span>

                            </a-tooltip>
                            <a-tooltip placement="top" v-if="DappData3.twitter">
                                <template #title>
                                    <span title="Twitter">Twitter</span>
                                </template>

                                <span class="shareicon">
                                    <a :href="DappData3.twitter" target="_blank" rel="noopener noreferrer">
                                        <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#919899"
                                            class="light_icon" :data_val="DappData3.twitter">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#707076"
                                            class="dark_icon" :data_val="DappData3.twitter">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#7524F9"
                                            class="hover_icon" :data_val="DappData3.twitter">
                                        </iconpark-icon>
                                    </a>
                                </span>
                            </a-tooltip>
                            <a-tooltip placement="top" v-if="DappData3.discord">
                                <template #title>
                                    <span title="Discord">Discord</span>
                                </template>

                                <span class="shareicon">
                                    <a :href="DappData3.discord" target="_blank" rel="noopener noreferrer">
                                        <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#919899"
                                            class="light_icon" :data_val="DappData3.discord">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#707076"
                                            class="dark_icon" :data_val="DappData3.discord">
                                        </iconpark-icon>
                                        <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#7524F9"
                                            class="hover_icon" :data_val="DappData3.discord">
                                        </iconpark-icon>
                                    </a>
                                </span>
                            </a-tooltip>
                            <!-- <a-tooltip placement="top">
                            <template #title>
                                <span>Facebook</span>
                            </template>
                            <span>
                                <iconpark-icon name="Property1Facebook" size="16" color="#919899" class="light_icon">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Facebook" size="16" color="#707076" class="dark_icon">
                                </iconpark-icon>
                            </span>
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template #title>
                                <span>Github</span>
                            </template>
                            <span>
                                <iconpark-icon name="Property1Github" size="16" color="#919899" class="light_icon">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Github" size="16" color="#707076" class="dark_icon">
                                </iconpark-icon>
                            </span>
                        </a-tooltip> -->
                        </div>
                    </div>
                    <div class="tagNameBox">
                        <span class="icon-img BG2 lineBG0" v-for="(item, index) in DappData3.chainTag"
                            v-if="chainArr.indexOf(item) !== -1 && index < 7" :title="item"><img
                                :src='"@/assets/img/components/Mainnet/" + item.toUpperCase() + "_GRAY.png"'
                                :alt="item" /></span>
                        <span class="icon-img BG2 lineBG0" v-if="DappData3.chainTag.length >= 7">
                            <img src="@/assets/img/components/Mainnet/omit_icon.svg" class="light_icon" alt="omit_icon">
                            <img src="@/assets/img/components/Mainnet/omit_dark.svg" class="dark_icon" alt="omit_icon">
                        </span>
                    </div>
                </div>
            </div>
            <div class="itemcontent text2" :title="DappData3.intro">
                {{ DappData3.intro }}
            </div>
            <div class="collect_btn" v-if="isFavorite">
                <span class="collect_icon">

                </span>
            </div>
            <div class="not-collect_btn" v-else>
                <span class="not-collect_icon">

                </span>
            </div>
        </a>
    </div>

</template>
<script>
import Avatar from '@/components/Avatar/Avatar.vue'
import { mapMutations } from 'vuex'
import { deepClone } from '@/tools/common'
import { Tooltip } from 'ant-design-vue/lib'
import Vue from 'vue'
Vue.use(Tooltip)
export default {
    name: "cardItem3",
    props: {
        DappData3: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            chainArr: ['arbitrum', 'asm', 'avax_c', 'bgh', 'bhp', 'bnb', 'btc', 'ar', 'cspr', 'czz', 'doge', 'dot', 'eos', 'eth', 'fil', 'atom', 'ftm', 'hbc', 'ht', 'atom', 'htdf', 'iost', 'khc', 'klay', 'avax', 'luna', 'matic', 'near', 'neo', 'nuls', 'okt', 'boba', 'ont', 'qtum', 'btt', 'sgb', 'sol', 'true', 'trx', 'ulam', 'wax', 'celo', 'wicc', 'yta', 'zks', 'ztb', 'ckb_evm', 'ckb', 'cmp', 'cro', 'cronos', 'cube', 'dash', 'dscc', 'dscc1', 'egld', 'far', 'flo', 'fuse', 'gt', 'halo', 'icp', 'inj', 'iotx', 'kai', 'kcs', 'lat', 'lunav2', 'one', 'optimism', 'polygon', 'scdo', 'smartbch', 'sys', 'velas', 'vision', 'xdai'],
            customStyle: {
                "border-radius": "100%",
                "margin-right": "6px",
                "border": "1px solid",
                "font-weight": "700",
                "font-size": "12px",
                "line-height": "40px",
                "text-align": "center",
                "overflow": "hidden",
            }
        }
    },
    computed: {
        isFavorite() {
            const { WalletID, dappStore } = this.$store.state
            if (!WalletID) {
                if (this.DappData3.id) {
                    return dappStore.favoriteList.find(item => item.id == this.DappData3.id) ? true : false;
                } else {
                    return dappStore.favoriteList.find(item => item.url == this.DappData3.url) ? true : false;
                }
            } else {
                return this.DappData3.isFavorite
            }
        }
    },
    mounted() {
    },
    components: {
        Avatar
    },
    methods: {
        ...mapMutations({
            changeFavoriteList: 'dappStore/changeFavoriteList',
            changeHistoryList: 'dappStore/changeHistoryList',
            removeFavoriteList: 'dappStore/removeFavoriteList',
        }),
        async handleclcik(event, item) {
            if (event && event.preventDefault)
                event.preventDefault();
            else
                window.event.returnValue = false; //兼容IE8
            const { WalletID, dappStore } = this.$store.state
            const eventtarget = event.target.className
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: "searchresults",
                    Action_Location_Id:'searchresults',
                    Action_Sub_Id:item.id,
                    Action_Sub_Name:item.name
                }
            })
            if (eventtarget == "not-collect_icon" || eventtarget == "not-collect_btn") {
                if (!WalletID) {
                    if (dappStore.favoriteList.filter(favoriteItem => favoriteItem.id == item.id).length != 0) {
                        this.$message.warn(this.$t("DappStore.collect.collected"));
                        return
                    }
                    item.isFavorite = true
                    this.$message.success(this.$t("DappStore.collect.collectSuccess"));
                    this.changeFavoriteList(deepClone(item))
                    return
                }

                const { status, data } = await this.$api.dappStore.Dappfavorite({ id: item.id, status: 'follow', type: 'dapp', name: item.name })
                if (status == 0) {
                    item.isFavorite = true
                    this.$message.success(this.$t("DappStore.collect.collectSuccess"));
                } else {
                    this.$message.error(this.$t("DappStore.collect.collectFail"));
                }
            } else if (eventtarget == "collect_icon" || eventtarget == "collect_btn") {
                if (!WalletID) {
                    if (dappStore.favoriteList.filter(favoriteItem => favoriteItem.id == item.id).length == 0) {
                        this.$message.warn(this.$t("DappStore.collect.RemovedCollect"));
                        return
                    } else {
                        item.isFavorite = false
                        this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
                        this.removeFavoriteList(item)
                        return
                    }
                }
                const { status, data } = await this.$api.dappStore.Dappfavorite({ id: item.id, status: 'unfollow', type: 'dapp', name: item.name })
                if (status == 0) {
                    item.isFavorite = false
                    this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
                } else {
                    this.$message.error(this.$t("DappStore.collect.cancelCollectFail"));
                }
            } else if (eventtarget == "hover_icon") {
                window.open(event.target.getAttribute('data_val'), '_blank')
            } else {
                if (!WalletID) {
                    if (dappStore.historyList.filter(historyItem => historyItem.id == item.id).length != 0) {
                        window.open(item.url, '_blank')
                        return
                    }
                    this.changeHistoryList(deepClone(item))
                    window.open(item.url, '_blank')
                    return
                }
                window.open(item.url, '_blank')
                const { status, data } = await this.$api.dappStore.Dapphistory({ ids: String(item.id), status: 'follow' })
                if (status != 0) {
                    this.$message.error(this.$t("DappStore.history.addHistoryFail"));
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .not-collect_icon {
        background: url(../../assets/img/components/dappStore/not-collect_lighticons.svg) no-repeat;
        background-size: 100% 100%;
    }

    .icon-img {
        .light_icon {
            display: block !important;
        }

        .dark_icon {
            display: none !important;
        }
    }

    .cardItem3:hover {
        background: @theme-light-bg1;
    }
}

.theme-dark {
    .not-collect_icon {
        background: url(../../assets/img/components/dappStore/not-collect_darkicons.svg) no-repeat;
        background-size: 100% 100%;
    }

    .icon-img {
        .light_icon {
            display: none !important;
        }

        .dark_icon {
            display: block !important;
        }
    }

    .cardItem3:hover {
        background: @theme-dark-bg1;
    }
}

@media screen and (max-width: 845px) {
    .cardItem3 .seo_href {
        height: 104px !important;
        padding: 10px !important;

        .not-collect_btn {
            top: -5px !important;
            right: -5px !important;
        }

        .collect_btn {
            top: -5px !important;
            right: -5px !important;
        }
    }

    .cardShare {
        .shareicon {
            display: none !important;
        }
    }
}


.cardItem3 {
    border: 1px solid;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;

    .seo_href {
        display: block;
        width: 100%;
        height: 126px;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        position: relative;
    }

    .itemTop {
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;

        .vue-avatar--wrapper {
            min-width: 40px;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 6px;
            border: 1px solid;
        }

        .defaulticon {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 6px;
            border: 1px solid;
            font-weight: 700;
            font-size: 12px;
            line-height: 40px;
            text-align: center;
            overflow: hidden;
        }

        .itemTopInfo {
            flex: 1;
            overflow: hidden;

            .itemName {
                display: flex;
                justify-content: space-between;
                align-items: center;

                h2 {
                    flex: 1;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 1.5;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                }

                .cardShare {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: -10px;
                    margin-right: 23px;
                    .shareicon {
                        .hover_icon {
                            display: none;
                        }
                    }

                    .shareicon:hover .hover_icon {
                        display: block;
                    }

                    .shareicon:hover .light_icon,
                    .shareicon:hover .dark_icon {
                        display: none;
                    }

                    >span {
                        margin-left: 11px;
                        width: 16px;
                        height: 16px;
                        position: relative;
                    }
                }
            }


            .tagNameBox {
                width: 100%;
                overflow: hidden;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .icon-img {
                    display: block;
                    border-radius: 100%;
                    margin-left: -2px;
                    border: 1px solid;

                    img {
                        display: block;
                        width: 14px;
                        height: auto;
                    }
                }

                .icon-img:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    .itemcontent {
        width: 100%;
        font-weight: 500;
        font-size: 12px;
        line-height: 1.5;
        margin-top: 10px;
        display: -webkit-box;
        display: -moz-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-wrap: break-word;
    }

    .collect_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 52px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;

        .collect_icon {
            cursor: pointer;
            display: block;
            width: 16px;
            height: 16px;
            background: url(../../assets/img/components/dappStore/collect_icons.svg) no-repeat;
            background-size: 100% 100%;
        }
    }

    .not-collect_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 52px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;

        .not-collect_icon {
            display: block;
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
}
</style>