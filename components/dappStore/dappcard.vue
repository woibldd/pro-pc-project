<template>
    <div class="cardItem">
        <a :href="DappData.url" target="_blank" class="seo_href" :class="source == 'dapp' ? 'indexcard' : ''"
            @click="handleclcik($event, DappData)">
            <div class="defaultcard BG0 lineBG2">
                <div class="listBoxItemTop">
                    <div class="dappIconBox lineBG2">
                        <avatar :size="40" :src="DappData.icon" :title="DappData.name" :alt="DappData.name"
                            :initials="DappData.name" :customStyle="customStyle">
                        </avatar>
                    </div>
                    <div class="dappNameBox">
                        <div class="dappName">
                            <div class="dappNametext">
                                <span class="text1" :title="DappData.name"> {{ DappData.name }}</span>
                            </div>
                        </div>
                        <div class="tagNameBox" v-if="DappData.chainTag">
                            <span class="icon-img BG2 lineBG0" v-for="(item, index) in DappData.chainTag"
                                v-if="chainArr.indexOf(item) !== -1 && index < 7" :title="item"><img
                                    :src='"@/assets/img/components/Mainnet/" + item.toUpperCase() + "_GRAY.png"'
                                    :alt="item" /></span>
                            <span class="icon-img BG2 lineBG0" v-if="DappData.chainTag.length >= 7">
                                <img src="@/assets/img/components/Mainnet/omit_icon.svg" class="light_icon"
                                    alt="omit_icon">
                                <img src="@/assets/img/components/Mainnet/omit_dark.svg" class="dark_icon"
                                    alt="omit_icon">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="messageP text2" :title="DappData.intro">
                    {{ DappData.intro }}
                </div>
                <!-- 默认不展示未收藏icon，只有滑入效果加上。 -->
                <div class="collect_btn" v-if="isFavorite">
                    <span class="collect_icon">

                    </span>
                </div>
                <div class="not-collect_btn" v-else>
                    <span class="not-collect_icon">

                    </span>
                </div>
            </div>
            <div class="hovercard BG0 lineBG2">
                <div class="listBoxItemTop">
                    <div class="dappIconBox lineBG2">
                        <avatar :size="40" :src="DappData.icon" :initials="DappData.name" :title="DappData.name"
                            :alt="DappData.name" :customStyle="customStyle">
                        </avatar>
                    </div>
                    <div class="dappNameBox">
                        <div class="dappName">
                            <div class="dappNametext">
                                <span class="text1" :title="DappData.name"> {{ DappData.name }}</span>
                            </div>
                        </div>
                        <!--目前dapp首页接口没有该信息(单独dapp的chain展示) -->
                        <div class="tagNameBox" v-if="DappData.chainTag">
                            <span class="icon-img BG2 lineBG0" v-for="(item, index) in DappData.chainTag"
                                v-if="chainArr.indexOf(item) !== -1 && index < 7" :title="item"><img
                                    :src='"@/assets/img/components/Mainnet/" + item.toUpperCase() + "_GRAY.png"'
                                    :alt="item" /></span>
                            <span class="icon-img BG2 lineBG0 omit_icon" v-if="DappData.chainTag.length >= 7">
                                <img src="@/assets/img/components/Mainnet/omit_icon.svg" class="light_icon"
                                    alt="omit_icon">
                                <img src="@/assets/img/components/Mainnet/omit_dark.svg" class="dark_icon"
                                    alt="omit_icon">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="messageP text2" :title="DappData.intro">
                    {{ DappData.intro }}
                </div>
                <!--目前dapp首页接口没有该信息(单独dapp的chain展示) -->
                <div class="cardShare">
                    <a-tooltip placement="top" v-if="DappData.telegram">
                        <template #title>
                            <span title="Telegram">Telegram</span>
                        </template>

                        <span class="shareicon">
                            <a :href="DappData.telegram" target="_blank" rel="noopener noreferrer">
                                <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#919899"
                                    class="light_icon" :data_val="DappData.telegram">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#707076"
                                    class="dark_icon" :data_val="DappData.telegram">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Telegram" alt="Telegram" size="16" color="#7524F9"
                                    class="hover_icon" :data_val="DappData.telegram">
                                </iconpark-icon>
                            </a>
                        </span>

                    </a-tooltip>
                    <a-tooltip placement="top" v-if="DappData.twitter">
                        <template #title>
                            <span title="Twitter">Twitter</span>
                        </template>

                        <span class="shareicon">
                            <a :href="DappData.twitter" target="_blank" rel="noopener noreferrer">
                                <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#919899"
                                    class="light_icon" :data_val="DappData.twitter">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#707076"
                                    class="dark_icon" :data_val="DappData.twitter">
                                </iconpark-icon>
                                <iconpark-icon name="Property1Twitter" alt="Twitter" size="16" color="#7524F9"
                                    class="hover_icon" :data_val="DappData.twitter">
                                </iconpark-icon>
                            </a>
                        </span>
                    </a-tooltip>
                    <a-tooltip placement="top" v-if="DappData.discord">
                        <template #title>
                            <span title="Discord">Discord</span>
                        </template>

                        <span class="shareicon">
                            <a :href="DappData.discord" target="_blank" rel="noopener noreferrer">
                                <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#919899"
                                    class="light_icon" :data_val="DappData.discord">
                                </iconpark-icon>
                                <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#707076"
                                    class="dark_icon" :data_val="DappData.discord">
                                </iconpark-icon>
                                <iconpark-icon name="Property1discord" alt="Discord" size="16" color="#7524F9"
                                    class="hover_icon" :data_val="DappData.discord">
                                </iconpark-icon>
                            </a>
                        </span>
                    </a-tooltip>
                </div>
                <div class="collect_btn" v-if="isFavorite">
                    <span class="collect_icon">

                    </span>
                </div>
                <div class="not-collect_btn" v-else>
                    <span class="not-collect_icon">

                    </span>
                </div>
            </div>
        </a>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Avatar from '@/components/Avatar/Avatar'
import { deepClone } from '@/tools/common'
import { Tooltip } from 'ant-design-vue/lib'
import Vue from 'vue'
Vue.use(Tooltip)
export default {
    name: "cardItem",
    props: {
        DappData: {
            type: Object,
            default: {}
        },
        source: {
            type: String,
            default: "tag"
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
    components: {
        Avatar
    },
    computed: {
        isFavorite() {
            const { WalletID, dappStore } = this.$store.state
            if (!WalletID) {
                if (this.DappData.id) {
                    return dappStore.favoriteList.find(item => item.id == this.DappData.id) ? true : false;
                } else {
                    return dappStore.favoriteList.find(item => item.url == this.DappData.url) ? true : false;
                }
            } else {
                return this.DappData.isFavorite
            }
        }
    },
    methods: {
        ...mapMutations({
            changeFavoriteList: 'dappStore/changeFavoriteList',
            removeFavoriteList: 'dappStore/removeFavoriteList',
            changeHistoryList: 'dappStore/changeHistoryList',
        }),
        async handleclcik(event, item) {
            if (event && event.preventDefault)
                event.preventDefault();
            else
                window.event.returnValue = false; //兼容IE8
            const { WalletID, dappStore } = this.$store.state;
            const { language } = this.$router.currentRoute.params;
            const eventtarget = event.target.className;
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name: this.source,
                    Action_Location_Id:this.source,
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
                if (!item.id) {
                    return this.$message.error(this.$t("DappStore.collect.collectFail0"));
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
                        this.$emit("unfollowDapp")
                        this.removeFavoriteList(item)
                        return
                    }
                }
                if (!item.id) {
                    return this.$message.error(this.$t("DappStore.collect.collectFail0"));
                }
                const { status, data } = await this.$api.dappStore.Dappfavorite({ id: item.id, status: 'unfollow', type: 'dapp', name: item.name })
                if (status == 0) {
                    item.isFavorite = false;
                    if (this.$router.currentRoute.path == "/" + language + "/dapp/collect") {
                        this.$emit("unfollowDapp")
                    }
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

    .hovercard {
        box-shadow: 0px 10px 40px rgba(14, 27, 64, 0.1);
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

    .hovercard {
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.8);
    }
}

@media screen and (min-width: 1201px) {
    .cardItem {
        &:nth-child(4n+4) {
            margin-right: 0;
        }
    }
}


@media screen and (max-width: 1200px) {
    .cardItem {
        width: 32% !important;

        &:nth-child(3n+3) {
            margin-right: 0;
        }
    }
}

@media screen and (max-width: 890px) {
    .cardItem {
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
    }
}

@media screen and (max-width: 845px) {
    .cardItem {
        width: 100% !important;
        margin-bottom: 10px !important;
        margin-right: 0 !important;

        .defaultcard {
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

        .indexcard {
            .messageP {
                display: block !important;
                margin-top: 4px !important;
                overflow: hidden !important;

                white-space: nowrap !important;

                text-overflow: ellipsis !important;

                -o-text-overflow: ellipsis !important;
            }
        }
    }

    .defaultcard .not-collect_btn {
        display: flex !important;
    }

    .cardItem:hover .hovercard {
        display: none !important;
    }

    .cardItem .hovercard {
        display: none !important;
    }
}


.cardItem {
    display: block;
    width: 24%;
    margin-right: 4/3%;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;

    .seo_href {
        display: block;
        width: 100%;
        height: 100%;
    }

    .defaultcard {
        width: 100%;
        height: 100%;
        border: 1px solid;
        border-radius: 8px;
        padding: 20px;
        box-sizing: border-box;
        position: relative;

        .messageP {
            font-size: 12px;
            font-weight: 500;
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
    }

    .hovercard {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        border: 1px solid;
        border-radius: 8px;
        padding: 20px;
        box-sizing: border-box;
        z-index: 1;

        .messageP {
            font-size: 12px;
            line-height: 1.5;
            margin-top: 10px;
            font-weight: 500;
            display: -webkit-box;
            display: -moz-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            word-wrap: break-word;
        }

        .cardShare {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 12px;

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

            span {
                margin-left: 11px;
                width: 16px;
                height: 16px;
                position: relative;
            }
        }
    }

    .listBoxItemTop {
        width: 100%;
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dappIconBox {
            min-width: 40px;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            overflow: hidden;
            border: 1px solid;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            img {
                display: block;
                width: 100%;
            }

            .defaulticon {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                font-weight: 700;
                font-size: 12px;
                line-height: 40px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .dappNameBox {
            flex: 1;
            padding-left: 6px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;

            .dappName {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;

                .dappNametext {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;

                    span {
                        height: 24px;
                        overflow: hidden;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 1.5;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
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

    .defaultcard .not-collect_btn {
        display: none;
    }

    .not-collect_btn {
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 45px;
        width: 45px;
        height: 45px;
        // margin: -15px -15px 0px 0px;
        cursor: pointer;

        .not-collect_icon {
            display: block;
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }



    .collect_btn {
        display: flex;
        position: absolute;
        top: 0px;
        right: 0px;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        // margin: -15px -15px 0px 0px;
        cursor: pointer;

        .collect_icon {
            display: block;
            width: 16px;
            height: 16px;
            background: url(../../assets/img/components/dappStore/collect_icons.svg) no-repeat;
            background-size: 100% 100%;
        }
    }
}

@media (any-hover:hover) {
    .cardItem:hover .hovercard {
        display: block;
    }
}
</style>