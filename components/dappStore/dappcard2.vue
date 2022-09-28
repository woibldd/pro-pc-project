<template>
    <div class="cardItem2 BG0 lineBG2" :id="DappData2.id" v-if="isPC">
        <div class="ItemLeft">
            <div v-show="isFavorite" class="collect_btn" @click="favorite(DappData2, 'unfollow')">
                <span class="collect_icon">

                </span>
            </div>
            <div v-show="!isFavorite" class="not-collect_btn" @click="favorite(DappData2, 'follow')">
                <span class="not-collect_icon">

                </span>
            </div>

            <div class="dappNameBox" v-if="DappData2.coins.length < 2">
                <avatar :size="32" :src="DappData2.coins[0].icon" :alt="DappData2.coins[0].coin"
                    :title="DappData2.coins[0].coin" :initials="DappData2.coins[0].coin.slice(0, 3)"
                    :customStyle="customStyle" v-if="DappData2.coins[0].coin"></avatar>
                <div class="dappName">
                    <span class="text1" v-if="DappData2.coins[0].coin" :title="DappData2.coins[0].coin">{{ DappData2.coins[0].coin.toUpperCase()
                    }}</span>
                    <span class="text3"
                    v-if="DappData2.coins[0].coin"
                        :title='$t("DappStore.dappCard2.Stake") + DappData2.coins[0].coin + $t("DappStore.dappCard2.Earn") + DappData2.earnCoin'>{{
                                $t("DappStore.dappCard2.Stake")
                        }}
                        {{ DappData2.coins[0].coin.toUpperCase() }} {{ $t("DappStore.dappCard2.Earn") }} {{
                                DappData2.earnCoin.toUpperCase()
                        }}</span>
                </div>
            </div>
            <div class="dappNameBox" v-else>
                <avatar :size="32" :src="item.icon" :alt="item.coin" :title="item.coin"
                    :initials="item.coin.slice(0, 3)" v-if="item.coin" :customStyle="customStyle"
                    v-for="(item, index) in DappData2.coins" :key="item.coin + DappData2.id + index"></avatar>
                <div class="dappName2">
                    <span class="text1" v-if="DappData2.coins[0].coin" :title="DappData2.coins[0].coin / DappData2.coins[1].coin">{{
                            DappData2.coins[0].coin.toUpperCase()
                    }} / {{
        DappData2.coins[1].coin.toUpperCase()
}}</span>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="Itemcontent">
            <div class="Top">
                <span class="text2" title="APY">APY</span>
                <span class="income Colorpurple" :title='DappData2.apyMin + "%-" + DappData2.apyMax + "%"'>{{
                        DappData2.apyMin
                }}%-{{ DappData2.apyMax }}%</span>
            </div>
            <div class="bottom">
                <div class="icon-item lineBG3">
                    <span class="text3" :title='$t("DappStore.dappCard2.mainChai")'>{{
                            $t("DappStore.dappCard2.mainChai")
                    }}</span>
                    <img :src="DappData2.chainIcon" :alt="DappData2.chain" class="lineBG2">
                </div>
                <div class="icon-item lineBG3">
                    <span class="text3" :title='$t("DappStore.dappCard2.dAppEarn")'>{{
                            $t("DappStore.dappCard2.dAppEarn")
                    }}</span>
                    <img :src="DappData2.earnCoinIcon" :alt="DappData2.earnCoin" class="lineBG2">
                </div>
                <div class="icon-item lineBG3">
                    <span class="text3" :title='$t("DappStore.dappCard2.swapTokenListSearchSource")'>{{
                            $t("DappStore.dappCard2.swapTokenListSearchSource")
                    }}</span>
                    <img :src="DappData2.sourceDappIcon" :alt="DappData2.chain" class="lineBG2">
                </div>
            </div>
        </div>
        <div class="ItemRight" :title='$t("DappStore.dappCard2.dappToPledge")'>
            <a :href="DappData2.url" target="_blank" rel="noopener noreferrer" class="seo_href"
                @click="pledge(DappData2)">
                {{ $t("DappStore.dappCard2.dappToPledge") }}
            </a>
        </div>
    </div>
    <div v-else class="mobilecardItem2 BG0 lineBG2">
        <div class="ItemTop">
            <div class="dappNameBox" v-if="DappData2.coins.length < 2">
                <avatar :size="32" :src="DappData2.coins[0].icon" v-if="DappData2.coins[0].coin" class="lineBG2"
                    :initials="DappData2.coins[0].coin.slice(0, 3)" :customStyle="customStyle"></avatar>
                <div class="dappName">
                    <span class="text1" v-if="DappData2.coins[0].coin">{{ DappData2.coins[0].coin.toUpperCase() }}</span>
                    <span class="text3" v-if="DappData2.coins[0].coin">{{ $t("DappStore.dappCard2.Stake") }} {{ DappData2.coins[0].coin.toUpperCase()
                    }}
                        {{ $t("DappStore.dappCard2.Earn") }} {{
                                DappData2.earnCoin.toUpperCase()
                        }}</span>
                </div>
            </div>
            <div class="dappNameBox" v-else>
                <avatar :size="32" :src="item.icon" :initials="item.coin.slice(0, 3)" :customStyle="customStyle"
                    v-for="(item, index) in DappData2.coins" :key="item.coin + DappData2.id + index"></avatar>
                <div class="dappName2">
                    <span class="text1" v-if="DappData2.coins[0].coin">{{ DappData2.coins[0].coin.toUpperCase() }} / {{
                            DappData2.coins[1].coin.toUpperCase()
                    }}</span>
                    <span class="text3" v-if="DappData2.coins[0].coin">{{ $t("DappStore.dappCard2.Stake") }} {{
                            DappData2.coins[0].coin.toUpperCase()
                    }}{{ $t("DappStore.dappCard2.Earn") }} {{
        DappData2.earnCoin.toUpperCase()
}}</span>
                </div>
            </div>
        </div>
        <div class="Itemcontent">
            <div class="ItemLeft">
                <div class="Top">
                    <span class="text2">APY</span>
                    <span class="income Colorpurple">{{ DappData2.apyMin }}%-{{ DappData2.apyMax }}%</span>
                </div>
                <div class="bottom">
                    <div class="icon-item lineBG3">
                        <span class="text3">{{ $t("DappStore.dappCard2.mainChai") }}</span>
                        <img :src="DappData2.chainIcon" :alt="DappData2.chain" class="lineBG2">
                    </div>
                    <div class="icon-item lineBG3">
                        <span class="text3">{{ $t("DappStore.dappCard2.dAppEarn") }}</span>
                        <img :src="DappData2.earnCoinIcon" :alt="DappData2.earnCoin" class="lineBG2">
                    </div>
                    <div class="icon-item lineBG3">
                        <span class="text3">{{ $t("DappStore.dappCard2.swapTokenListSearchSource") }}</span>
                        <img :src="DappData2.sourceDappIcon" alt="" class="lineBG2">
                    </div>
                </div>
            </div>
            <div class="ItemRight" @click="pledge(DappData2)">
                {{ $t("DappStore.collect.pledge") }}
            </div>
        </div>
        <div class="collect_btn" v-if="isFavorite" @click="favorite(DappData2, 'unfollow')">
            <span class="collect_icon">

            </span>
        </div>
        <div class="not-collect_btn" v-else @click="favorite(DappData2, 'follow')">
            <span class="not-collect_icon">

            </span>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { deepClone } from '@/tools/common'
import Avatar from '@/components/Avatar/Avatar'
export default {
    name: "cardItem2",
    props: {
        DappData2: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            isPC: this.$store.state.isPC,
            customStyle: {
                "border-radius": "100%",
                "border": "1px solid",
                "font-weight": "700",
                "font-size": "12px",
                "line-height": "32px",
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
                if (this.DappData2.id) {
                    return dappStore.favoritefinancialList.find(item => item.id == this.DappData2.id) ? true : false;
                } else {
                    return dappStore.favoritefinancialList.find(item => item.url == this.DappData2.url) ? true : false;
                }
            } else {
                return this.DappData2.isFavorite
            }
        }
    },
    methods: {
        ...mapMutations({
            changeFavoritefinancialList: 'dappStore/changeFavoritefinancialList',
            removeFavoritefinancialList: 'dappStore/removeFavoritefinancialList',
        }),
        async favorite(item, type) {
            const { language } = this.$router.currentRoute.params;
            const { WalletID, dappStore } = this.$store.state
            // 目前接口没有id,无法得知是否收藏
            if (type == "follow") {
                if (!WalletID) {
                    if (item.id) {
                        if (dappStore.favoritefinancialList.filter(favoriteItem => favoriteItem.id == item.id).length != 0) {
                            this.$message.warn(this.$t("DappStore.collect.collected"));
                            return
                        }
                    } else {
                        if (dappStore.favoritefinancialList.filter(favoriteItem => favoriteItem.url == item.url).length != 0) {
                            this.$message.warn(this.$t("DappStore.collect.collected"));
                            return
                        }
                    }
                    item.isFavorite = true
                    this.$message.success(this.$t("DappStore.collect.collectSuccess"));
                    this.changeFavoritefinancialList(deepClone(item))
                    return
                }
                if (!item.id) {
                    return this.$message.error(this.$t("DappStore.collect.collectFail0"));
                }
                const { status, data } = await this.$api.dappStore.Dappfavorite({ id: item.id, status: 'follow', type: 'financial', name: item.name })
                if (status == 0) {
                    item.isFavorite = true
                    this.$message.success(this.$t("DappStore.collect.collectSuccess"));
                } else {
                    this.$message.error(this.$t("DappStore.collect.collectFail"));
                }
            } else {
                if (!WalletID) {
                    if (dappStore.favoritefinancialList.filter(favoriteItem => favoriteItem.id == item.id).length == 0) {
                        this.$message.warn(this.$t("DappStore.collect.RemovedCollect"));
                        return
                    } else {
                        item.isFavorite = false
                        this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
                        this.removeFavoritefinancialList(item)
                        return
                    }
                }
                if (!item.id) {
                    return this.$message.error(this.$t("DappStore.collect.collectFail0"));
                }
                const { status, data } = await this.$api.dappStore.Dappfavorite({ id: item.id, status: 'unfollow', type: 'financial', name: item.name })
                if (status == 0) {
                    item.isFavorite = false;
                    if (this.$router.currentRoute.path == "/" + language + "/dapp/collect") {
                        this.$emit("unfollowfinancial")
                    }
                    this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
                } else {
                    this.$message.error(this.$t("DappStore.collect.cancelCollectFail"));
                }
            }
        },
        pledge(item) {
            if (event && event.preventDefault)
                event.preventDefault();
            else
                window.event.returnValue = false; //兼容IE8
            this.$Ta.track({
                name: 'Bitkeep__Dapp_Page', data: {
                    Action_Location_Name:'dapp',
                    Action_Location_Id:'dapp',
                    Action_Sub_Id:item.id,
                    Action_Sub_Name:item.taName
                }
            })
            window.open(item.url, '_blank')
        }
    },
    watch: {
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .cardItem2:hover {
        background-color: #F8F8F9;
        ;
    }

    .cardItem2 .ItemLeft .not-collect_icon,
    .mobilecardItem2 .not-collect_icon {
        background: url(../../assets/img/components/dappStore/not-collect_lighticons.svg) no-repeat;
        background-size: 100% 100%;
    }

    .cardItem2 .ItemRight,
    .mobilecardItem2 .ItemRight {
        background: #7524F9;
    }
}

.theme-dark {
    .cardItem2:hover {
        background-color: #202024;
    }

    .cardItem2 .ItemLeft .not-collect_icon,
    .mobilecardItem2 .not-collect_icon {
        background: url(../../assets/img/components/dappStore/not-collect_darkicons.svg) no-repeat;
        background-size: 100% 100%;
    }

    .cardItem2 .ItemRight,
    .mobilecardItem2 .ItemRight {
        background: #9C60FF;
    }
}

@media screen and (max-width: 1540px) {
    .financial_item {

        .dappName2,
        .dappName {
            min-width: 200px;
        }
    }
}

.cardItem2 {
    border: 1px solid;
    width: 100%;
    min-height: 78px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    .ItemLeft {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .not-collect_btn {
            display: flex;
            width: 45px;
            height: 45px;
            margin-left: -15px;
            align-items: center;
            justify-content: center;
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
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            margin-left: -15px;
            cursor: pointer;

            .collect_icon {
                cursor: pointer;
                width: 16px;
                height: 16px;
                background: url("@/assets/img/components/dappStore/collect_icons.svg") no-repeat;
                background-size: 100% 100%;
            }
        }

        .dappNameBox {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            >img {
                width: 32px;
                height: auto;
                border-radius: 100%;
                border: 1px solid;
                margin-left: -6px;

                :first-child {
                    margin-left: 0px;
                    margin-right: 0px !important;
                }
            }

            .vue-avatar--wrapper {
                margin-left: -6px;

                :first-child {
                    margin-left: 0px;
                    margin-right: 0px !important;
                }
            }

            .dappName {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                width: 140px;

                :first-child {
                    display: block;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 1.25;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                :last-child {
                    display: block;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 1.33;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .dappName2 {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                width: 100px;

                :first-child {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 1.25;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                :last-child {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 1.33;
                }
            }
        }
    }

    .Itemcontent {
        .Top {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;

            :first-child {
                font-weight: 500;
                font-size: 12px;
                line-height: 15px;
                margin-right: 6px;
            }

            .income {
                font-weight: 600;
                font-size: 14px;
                line-height: 16px;
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-weight: 500;

            .icon-item {
                font-weight: 500;
                font-size: 12px;
                line-height: 1.33;
                padding: 0px 8px;
                border-right: 0.5px solid;

                span {
                    font-weight: 500;
                }

                img {
                    width: 14px;
                    height: 14px;
                    margin-left: 4px;
                    border-radius: 100%;
                    border: 1px solid;
                }
            }

            :first-child {
                padding-left: 0px;
            }

            :last-child {
                border-right: none;
            }
        }
    }

    .ItemRight {
        display: flex;
        border-radius: 100px;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;

        .seo_href {
            display: block;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 14px;
            color: #fff;
            padding: 6px 16px;
            border-radius: 100px;
            box-sizing: border-box;
            cursor: pointer;
        }
    }
}

.mobilecardItem2 {
    border: 1px solid;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;

    .ItemTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dappNameBox {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            >img {
                width: 32px;
                height: auto;
                border-radius: 100%;
                border: 1px solid;
                margin-left: -6px;

                :first-child {
                    margin-left: 0px;
                    margin-right: 0px !important;
                }
            }

            .vue-avatar--wrapper {
                margin-left: 0px;
                margin-right: 0px;
            }

            .vue-avatar--wrapper:nth-of-type(2) {
                margin-left: -12px;
            }

            .dappName {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                width: 140px;

                :first-child {
                    display: block;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 1.25;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                :last-child {
                    display: block;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 1.33;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .dappName2 {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                width: 100px;

                :first-child {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 1.25;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                :last-child {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 1.33;
                }
            }
        }

    }

    .Itemcontent {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        .Top {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;

            :first-child {
                font-weight: 500 !important;
                font-size: 12px !important;
                line-height: 16px !important;
                margin-right: 4px !important;
            }

            .income {
                font-weight: 600;
                font-size: 14px !important;
                line-height: 16px !important;
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .icon-item {
                font-weight: 500 !important;
                font-size: 12px !important;
                line-height: 1.33;
                padding: 0px 3px;
                border-right: 0.5px solid;

                img {
                    width: 14px;
                    height: 14px;
                    border-radius: 100%;
                    border: 1px solid;
                }
            }

            :first-child {
                padding-left: 0px;
            }

            :last-child {
                border-right: none;
            }
        }

        .ItemRight {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 14px;
            color: #fff;
            height: 32px;
            padding: 0px 12px;
            border-radius: 100px;
            cursor: pointer;
            box-sizing: border-box;
        }
    }

    .not-collect_btn {
        display: flex;
        width: 45px;
        height: 45px;
        position: absolute;
        right: -5px;
        top: -5px;
        justify-content: center;
        align-items: center;
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
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        cursor: pointer;
        position: absolute;
        right: -5px;
        top: -5px;

        .collect_icon {
            cursor: pointer;
            width: 16px;
            height: 16px;
            background: url("@/assets/img/components/dappStore/collect_icons.svg") no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
