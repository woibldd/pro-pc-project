<template>
    <div class="searchBox BG0" :class='isPC?"":"h5_searchBox"' v-click-outside="handleBlur">
        <div class="search-header">
            <div class="search BG1" :class='isPC?"lineBG2":"linetext1"'>
                <img src="@/assets/img/components/dappStore/search/light/nav_search.svg"
                    class="nav_search_light light_icon" alt="nav_search">
                <img src="@/assets/img/components/dappStore/search/dark/nav_search.svg"
                    class="nav_search_dark dark_icon" alt="nav_search">
                <input type="text" ref="dappSearch" v-model="dappSearchValue" :placeholder='$t("SwapHome.placeholder")'
                    @input="handleChange(dappSearchValue)" @focus="handleFocus" maxlength="250"
                    v-on:keyup.13="enterSearch" class="text1">
                <img src="@/assets/img/components/dappStore/search/light/close_icons.svg" alt="close_icons"
                    class="close_icons light_icon" v-show="dappSearchValue" @click="clearSearch">
                <img src="@/assets/img/components/dappStore/search/dark/close_icons.svg" alt="close_icons"
                    class="close_icons_dark dark_icon" v-show="dappSearchValue" @click="clearSearch">
            </div>
            <span v-if="!isPC" class="BG0 Cancel text2" @click="headerClose">{{ $t("SwapHome.Cancel") }}</span>
        </div>
        <div class="searchhistory BG0 lineBG2" v-show="(searchOnFocus || isDrawer) && !showSearchResult">
            <div class="historywrap" v-if="historyList.length > 0">
                <div class="searchhistorytitle">
                    <span class="text2">{{ $t("DappStore.search.searchTitle") }}</span>
                    <img src="@/assets/img/components/dappStore/search/light/remove_history_icons.svg"
                        alt="remove_history_icons" class="light_icon" @mousedown="RemoveAll">
                    <img src="@/assets/img/components/dappStore/search/dark/remove_history_icons.svg"
                        alt="remove_history_icons" class="dark_icon" @mousedown="RemoveAll">
                </div>
                <div class="historyList">
                    <verticalScroll :dataLength="historyList.length" :showIcon.sync="showScrollIcon"
                        #content="{ slotClick }" height="30px" :verticaispc="false">
                        <div class="historyItem BG1 item-label" v-for="item in historyList" :key="item">
                            <div class="historyInfo" @click="HandleSetHistory(item)">
                                <span class="text2">{{ ellipsis(item) }}</span>
                            </div>
                        </div>
                    </verticalScroll>
                </div>
            </div>
            <div class="loading-wrap BG0" v-if="!defaultList.hot">
                <a-spin style="margin:180px auto">
                    <a-icon slot="indicator" type="loading" style="font-size: 32px" spin />
                </a-spin>
            </div>
            <a-tabs v-model:activeKey="activeKey" @change="handleTagChange(activeKey)">
                <a-tab-pane key="1" :tab="$t(`SwapHome.searchType.hot`)" ref="tab1">
                    <coinList :dataList="defaultList.hot" @favorite="handleFavorite" @gotoSwap="gotoSwap"
                        :h5style="h5style" />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t(`SwapHome.searchType.coin`)" ref="tab3">
                    <coinList :dataList="defaultList.trade" @favorite="handleFavorite" @gotoSwap="gotoSwap"
                        :h5style="h5style" />
                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t(`SwapHome.searchType.trade`)" ref="tab2" force-render>
                    <coinList :dataList="defaultList.coin" @favorite="handleFavorite" @gotoSwap="gotoSwap"
                        :h5style="h5style" />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="searchhistory BG0 lineBG2" v-show="(searchOnFocus || isDrawer) && showSearchResult">
            <div v-if="loading" class="loading-wrap BG0">
                <a-spin style="margin:180px auto">
                    <a-icon slot="indicator" type="loading" style="font-size: 32px" spin />
                </a-spin>
            </div>
            <div class="searchList" ref="searchList">
                <searchList v-if="quoteSearchResult.length > 0" :dataList="quoteSearchResult" @favorite="handleFavorite"
                    @gotoSwap="gotoSwap" @getAllByChain="searchByChain" :h5style="h5style" />
                <div class="notDataBox" v-if="!loading && quoteSearchResult.length == 0">
                    <div>
                        <img src="@/assets/img/components/dappStore/search/light/not_search_icons.svg"
                            class="light_icon" alt="">
                        <img src="@/assets/img/components/dappStore/search/dark/not_search_icons.svg" class="dark_icon"
                            alt="">
                    </div>
                    <div class="text3 notData">{{ $t("SwapHome.nosearch") }}</div>
                </div>
            </div>
        </div>
        <div class="h5-mask" v-if="!isPC" @click="headerClose"></div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { Tabs } from 'ant-design-vue/lib'
import coinIcon from './coinIcon.vue'
import coinList from './coinList.vue'
import searchList from './searchList.vue'
import verticalScroll from '@/components/market/verticalScroll.vue'
import { debounce } from '@/tools/common'
import Vue from 'vue'
Vue.use(Tabs)
export default {
    name: "dappSearch",
    scrollToTop: true,
    components: {
        coinIcon,
        coinList,
        searchList,
        verticalScroll
    },
    props: {
        isDrawer: false,
        jumpTarget: {
            type: Boolean,
            default: true
        },
        setfocus: {
            type: Boolean,
            default: false
        },
        h5style: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isPC: this.$store.state.isPC,
            loading: false,
            activeKey: "1",
            dappSearchValue: "",
            searchhistory: false,
            dappSearchTips: false,
            searchOnFocus: false,
            showSearchResult: false,
            historyList: [],
            keywordlist: [],
            initkeywordlist: [],
            quoteSearchResult: [],
            defaultList: {},
            showScrollIcon: true,
        }
    },
    beforeMount() {
        this.HandleInitSearchSummary()
        this.$nextTick(() => {
            this.HandleInitHistory()
        })
    },
    mounted() {
        if (this.setfocus) {
            this.$refs.dappSearch.focus()
        }
    },
    watch: {
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        },
        "$store.state.WalletID": function (newVal, oldVal) {
            this.HandleInitSearchSummary()
        },
    },
    methods: {
        headerClose() {
            this.$emit('close')
        },
        //searchValue 为搜索项 匹配搜索项与keywordlist[index].fullName是否匹配 然后
        //返回匹配项数组searchMatchArr.涉及到了模糊搜索,故而做了大小写处理即函数searchSubStr
        //this.positions用于存储检索到的需要高亮的下标 
        setSearchStyle(searchValue, keywordlist) {
            if (searchValue.trim() !== '') {
                for (let i = 0; i < keywordlist.length; i++) {
                    this.positions = [];
                    //遍历获取符合要求的搜索项
                    let re = new RegExp(searchValue, "ig");
                    let searchMatchArr = [];
                    searchMatchArr = keywordlist[i].match(re);
                    if (keywordlist[i].match(re).length > 0) {
                        //模糊搜索,不区分大小写
                        this.searchSubStr(keywordlist[i], searchValue);
                        let fullNameArr = keywordlist[i].split('');
                        for (let m = 0; m < this.positions.length; m++) {
                            //动态包裹标签设置class类
                            fullNameArr.splice(this.positions[m], searchValue.length);
                            fullNameArr.splice(this.positions[m], 0, '<span class="Colorpurple">' + searchMatchArr[m] + '</span>');
                            keywordlist[i] = fullNameArr.join('');
                        }
                    }
                }
            }
        },
        //模糊搜索,不区分大小写
        searchSubStr(str, subStr) {
            let pos = str.toLowerCase().indexOf(subStr.toLowerCase());
            while (pos > -1) {
                this.positions.push(pos);
                pos = str.toLowerCase().indexOf(subStr.toLowerCase(), pos + 1);
            }
        },
        handleChange: debounce(function (dappSearchValue) {
            if (!dappSearchValue) {
                this.showSearchResult = false
                return
            } else {
                this.getQuoteSearchValue()
            }
        }, 500),
        clearSearch() {
            this.dappSearchValue = ''
            this.showSearchResult = false
            // this.handleBlur()
        },
        handleFocus() {
            this.searchOnFocus = true
            this.searchhistory = true;
            this.dappSearchTips = true;
        },
        handleBlur() {
            this.searchOnFocus = false
            this.searchhistory = false;
            this.dappSearchTips = false;
            this.activeKey = "1"
            this.handleListRegression()
        },
        enterSearch() {
            // this.handleBlur() 
            if (!this.dappSearchValue || !this.dappSearchValue.trim()) {
                return this.$message.error(this.$t("DappStore.search.error1"))
            }
            this.showSearchResult = true
            this.historyList.push(this.dappSearchValue)
            this.HandleSetHistory(this.dappSearchValue)

        },
        searchByChain(chain) {
            this.getQuoteSearchValue(chain)
        },
        getQuoteSearchValue(chain) {
            const params = {
                keyword: this.dappSearchValue
            }
            if (chain) {
                params.chain = chain
            }

            this.loading = true
            this.showSearchResult = true
            try {
                this.$Ta.track({
                    name: 'Bitkeep__Swap_Page', data: {
                        Action_Location_Type: 'top',
                        Action_Location_Id: 0,
                        Action_Location_Name: 'search',
                    }
                })
                this.$api.swap.getQuoteSearchValue(params).then(res => {
                    this.loading = false
                    if (res.status == 0) {
                        this.quoteSearchResult = res.data.list || []
                        this.quoteSearchResult.by = chain
                    }
                })
            } catch {
                this.loading = false
            }
        },
        HandleSetHistory(data, isRemove) {
            if (isRemove) {
                this.searchhistory = true
            } else {
                this.loading = true
                this.showSearchResult = true
                this.quoteSearchResult = []
                this.dappSearchValue = data;
                try {
                    this.$api.swap.getQuoteSearchValue({ keyword: this.dappSearchValue }).then(res => {
                        this.loading = false
                        if (res.status == 0) {
                            this.showSearchResult = true
                            this.quoteSearchResult = res.data.list || []
                        }
                    })
                } catch (error) {
                    this.loading = false
                    console.error(error)
                }
            }
            let oldHistory = [];
            let newArr = [];
            let showArr = [];
            data = data.toString();
            if (localStorage.getItem('BK_QUOTE_SEARCH_HISTORY')) {
                oldHistory = JSON.parse(localStorage.getItem('BK_QUOTE_SEARCH_HISTORY'));
            }
            let maxLen = oldHistory.length < 20 ? oldHistory.length : 20;

            for (let i = 0; i < maxLen; i++) {
                if (oldHistory[i] != data) {
                    newArr.push(oldHistory[i]);
                }
            }
            if (!isRemove || isRemove == 'undefined') {
                showArr = [data];
                newArr = showArr.concat(newArr);
            }
            localStorage.setItem('BK_QUOTE_SEARCH_HISTORY', JSON.stringify(newArr));
            this.HandleInitHistory()
        },
        HandleInitHistory() {
            if (!localStorage.getItem('BK_QUOTE_SEARCH_HISTORY')) {
                this.historyList = [];
            } else {
                let data = JSON.parse(localStorage.getItem('BK_QUOTE_SEARCH_HISTORY'));
                this.historyList = data;
            }
        },
        RemoveAll() {
            localStorage.removeItem('BK_QUOTE_SEARCH_HISTORY');
            this.HandleInitHistory()
        },
        async HandleInitSearchSummary() {
            const { data, status } = await this.$api.swap.getQuoteSearchSummary()
            if (status == 0) {
                // this.defaultList=data
                this.$set(this, 'defaultList', data)
            }
        },
        async handleFavorite(sender) {
            const { item, type } = sender
            const { WalletID } = this.$store.state
            if (WalletID) {
                const res = await this.$api.swap.quoteFavorite({
                    status: type,
                    chain: item.chain,
                    coin: item.coin,
                    contract: item.contract
                })
                if (res.status == 0) {
                    if (type == "follow") {
                        item.isFavorite = true
                        this.$message.success(this.$t("DappStore.collect.collectSuccess"));
                    } else {
                        item.isFavorite = false
                        this.$message.success(this.$t("DappStore.collect.cancelCollectSuccess"));
                    }
                    this.$emit('favoriteChange')
                }
            } else {
                this.$message.warning(this.$t('SwapHome.connectWalletAlert'))
            }

        },
        gotoSwap(item) {
            let Action_Location_Name;
            switch (this.activeKey) {
                case 1:
                    Action_Location_Name = "hot"
                    break;
                case 2:
                    Action_Location_Name = "coin"
                    break;
                case 3:
                    Action_Location_Name = "trade"
                    break;
                default:
                    Action_Location_Name = "hot"
                    break;
            }
            this.$Ta.track({
                name: 'Bitkeep__Swap_Page', data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: this.activeKey,
                    Action_Location_Name: Action_Location_Name,
                    Action_Sub_Name: item.coin.toUpperCase(),
                    Action_Sub_Id: item.contract ? item.contract : 'bitkeep'
                }
            })
            const { language } = this.$route.params
            window.open(`/${language}/swap/${item.chain}/${item.contract || 'bitkeep'}`, this.jumpTarget ? '_blank' : "_self")
        },
        handleTagChange(activeKey) {
            let Action_Location_Name;
            switch (activeKey) {
                case "1":
                    Action_Location_Name = "hot"
                    break;
                case "2":
                    Action_Location_Name = "coin"
                    break;
                case "3":
                    Action_Location_Name = "trade"
                    break;
                default:
                    Action_Location_Name = "hot"
                    break;
            }
            this.$Ta.track({
                name: 'Bitkeep__Swap_Page', data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: this.activeKey,
                    Action_Location_Name: Action_Location_Name
                }
            })
            this.handleListRegression()
        },
        handleListRegression() {
            if (this.$refs?.tab1?.$el) {
                this.$refs?.tab1?.$el.scrollTo(0, 0)
            }
            if (this.$refs?.tab2?.$el) {
                this.$refs?.tab2?.$el.scrollTo(0, 0)
            }
            if (this.$refs?.tab3?.$el) {
                this.$refs?.tab3?.$el.scrollTo(0, 0)
            }
            if (this.$refs?.searchList) {
                this.$refs?.searchList?.scrollTo(0, 0)
            }

        },
        ellipsis(text = '') {
            let t = text
            if (text.length > 10) {
                t = text.slice(0, 6) + '...' + text.slice(text.length - 4, text.length)
            }
            return t
        }

    },
    directives: {
        ClickOutside,
    },

}
</script>
<style lang="less" scoped>

@media screen and (max-width: 845px) {
    .searchhistory {
        top: 52px !important;
    }
}

.theme-light {

    .historyItem:hover {
        background: @theme-light-bg1;
    }

    input::input-placeholder {
        color: @theme-light-text3;
    }

    input::-webkit-input-placeholder {
        //兼容WebKit browsers（Chrome的内核）
        color: @theme-light-text3;
    }

    input::-moz-placeholder {
        //Mozilla Firefox 4 to 18
        color: @theme-light-text3;
    }

    input::-moz-placeholder {
        //Mozilla Firefox 19+
        color: @theme-light-text3;
    }

    input::-ms-input-placeholder {
        //Internet Explorer 10+
        color: @theme-light-text3;
    }
}

.theme-dark {

    .historyItem:hover {
        background: @theme-dark-bg1;
    }

    input::input-placeholder {
        color: @theme-dark-text3;
    }

    input::-webkit-input-placeholder {
        //兼容WebKit browsers（Chrome的内核）
        color: @theme-dark-text3;
    }

    input::-moz-placeholder {
        //Mozilla Firefox 4 to 18
        color: @theme-dark-text3;
    }

    input::-moz-placeholder {
        //Mozilla Firefox 19+
        color: @theme-dark-text3;
    }

    input::-ms-input-placeholder {
        //Internet Explorer 10+
        color: @theme-dark-text3;
    }
}


.searchBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 103;

    .search-header {
        display: flex;
        width: 100%;

        .arrow {
            display: flex;
            height: 42px;
            width: 30px;
            line-height: 42px;
            font-size: 20px;
        }

        .search {
            flex: 1;
            border: 1px solid;
            padding: 10px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            input {
                margin-left: 12px;
                flex: 1;
                font-size: 14px;
                font-weight: 500;
                display: block;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                input::placeholder {
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

            .close_icons,
            .close_icons_dark {
                position: relative;
                z-index: 100;
                cursor: pointer;
            }
        }

        .Cancel {
            display: block;
            height: 45px;
            text-align: center;
            line-height: 45px;
            font-weight: 500;
            font-size: 14px;
            padding-left: 10px;
        }
    }


    .mobilesearch {
        display: none;
        cursor: pointer;
    }

    .searchhistory {
        border: 1px solid;
        width: 100%;
        position: absolute;
        top: 50px;
        left: 0px;
        z-index: 99;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        border: 1px solid;
        box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);

        .searchhistorytitle {
            padding: 10px 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;

            span {
                font-weight: 600;
                font-size: 12px;
                line-height: 1.33;
            }

            img {
                cursor: pointer;
            }
        }

        .historyList {
            flex: 1;
            overflow: hidden;
            display: flex;
            padding: 0 20px;

            .historyItem {
                user-select: none;
                padding: 6px 12px;
                margin-right: 8px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                border-radius: 20px;

                .historyInfo {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    white-space: nowrap;

                    span {
                        display: block;
                        // max-width: 100px;
                        width: 100%;
                        font-weight: 600;
                        font-size: 12px;
                        line-height: 1.5;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    div {
                        display: block;
                        width: 100%;
                        margin-left: 10px;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 1.5;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

            }
        }

        .searchList {
            height: 100%;
            overflow-y: auto;
            border-radius: 4px;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        & /deep/.ant-tabs-bar {
            margin-bottom: 0;

        }

        .ant-tabs-tabpane-active {
            // height: 390px;
            overflow: scroll;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }


    .loading-wrap {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-self: center;
        position: absolute;
        z-index: 99;
    }
}

.searchBox {
    .searchhistory {
        height: 420px;
    }

    .historyList {
        .ant-tabs-tabpane-active {
            height: 390px
        }
    }
}

.h5-mask {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 100%;
    z-index: 9;
}

.searchhistoryhover {
    display: block !important;
}

.notDataBox {
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

.h5_searchBox {
    height: 100vh !important;
    width: calc(100% + 40px) !important;
    margin-left: -20px !important;
    padding-left: 20px !important;
}
</style>

<style lang="less">
.ant-tabs-ink-bar {
    display: none !important;
}

.searchhistory {


    .ant-tabs-content {
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .ant-tabs-nav-scroll {
        .ant-tabs-nav {
            padding-left: 20px;

            .ant-tabs-tab {
                font-size: 12px;
                padding: 10px 0;
                margin-right: 20px;
            }

            .ant-tabs-tab-active {
                position: relative;
                border-bottom: 3px solid #7524F9;
                color: #7524F9;
                font-weight: 500 !important;
            }
        }
    }
}

.theme-light {
    .searchhistory {
        .ant-tabs-bar {
            border-color: @theme-light-bg5
        }

        .ant-tabs-tab {
            color: @theme-light-text1;
        }
    }

}

.theme-dark {
    .searchhistory {
        .ant-tabs-bar {
            border-color: @theme-dark-bg5
        }

        .ant-tabs-tab {
            color: @theme-dark-text1;
        }
    }
}
</style>