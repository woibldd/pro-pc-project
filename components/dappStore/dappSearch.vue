<template>
    <div class="searchBox" v-click-outside="handleBlur">
        <div class="search BG1 lineBG2">
            <img src="@/assets/img/components/dappStore/search/light/nav_search.svg" class="nav_search_light light_icon"
                alt="nav_search">
            <img src="@/assets/img/components/dappStore/search/dark/nav_search.svg" class="nav_search_dark dark_icon"
                alt="nav_search">
            <input type="text" ref="dappSearch" v-model="dappSearchValue"
                :placeholder='$t("DappStore.search.placeholder")' @input="handleChange" @focus="handleFocus"
                maxlength="250" v-on:keyup.13="enterSearch" class="text1">
            <img src="@/assets/img/components/dappStore/search/light/close_icons.svg" alt="close_icons"
                class="close_icons light_icon" v-show="dappSearchValue" @click="clearSearch">
            <img src="@/assets/img/components/dappStore/search/dark/close_icons.svg" alt="close_icons"
                class="close_icons_dark dark_icon" v-show="dappSearchValue" @click="clearSearch">
        </div>

        <div class="searchhistory BG0 lineBG2" v-show="searchhistory && historyList.length > 0">
            <div class="searchhistorytitle">
                <span class="text1">{{ $t("DappStore.search.searchTitle") }}</span>
                <img src="@/assets/img/components/dappStore/search/light/remove_history_icons.svg"
                    alt="remove_history_icons" class="light_icon" @mousedown="RemoveAll">
                <img src="@/assets/img/components/dappStore/search/dark/remove_history_icons.svg"
                    alt="remove_history_icons" class="dark_icon" @mousedown="RemoveAll">
            </div>
            <div class="historyList">
                <div class="historyItem" v-for="item in historyList" :key="item">
                    <div class="historyInfo" @click="HandleSetHistory(item)">
                        <img src="@/assets/img/components/dappStore/search/light/history.svg" class="light_icon"
                            alt="history">
                        <img src="@/assets/img/components/dappStore/search/dark/history.svg" class="dark_icon"
                            alt="history">
                        <span class="text1" :title="item">{{ item }}</span>
                    </div>
                    <img src="@/assets/img/components/dappStore/search/light/delete_history_cions.svg"
                        class="light_icon" alt="delete_history" @mousedown="HandleSetHistory(item, true)">
                    <img src="@/assets/img/components/dappStore/search/dark/delete_history_cions.svg" class="dark_icon"
                        alt="delete_history" @mousedown="HandleSetHistory(item, true)">
                </div>
            </div>
        </div>
        <div class="searchhistory BG0 lineBG2" v-show="dappSearchTips">
            <a-spin v-show="searchloading" style="margin:180px auto">
                <a-icon slot="indicator" type="loading" style="font-size: 32px" spin />
            </a-spin>
            <div class="historyList" v-show="keywordlist.length > 0">
                <div class="historyItem" v-for="(item, index) in keywordlist" :key="item">
                    <div class="historyInfo" @click="HandleSetHistory(initkeywordlist[index])">
                        <iconpark-icon name="search" size="20" color="#E5E5E5" class="dark_icon" style="margin-top:2px">
                        </iconpark-icon>
                        <iconpark-icon name="search" size="20" color="#0E0E0E" class="light_icon"
                            style="margin-top:2px"></iconpark-icon>
                        <div v-html="item" :title="item" class="text1"></div>
                    </div>
                </div>
            </div>
            <div class="noData" v-show="!searchloading && keywordlist.length == 0">
                <img src="@/assets/img/components/dappStore/search/light/not_search_icons.svg" class="light_icon"
                    alt="">
                <img src="@/assets/img/components/dappStore/search/dark/not_search_icons.svg" class="dark_icon" alt="">
                <div class="text3" :title="$t('DappStore.search.noSearch')">{{ $t('DappStore.search.noSearch') }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { deepClone, debounce } from '@/tools/common'
import { Spin, Icon } from 'ant-design-vue'
import { mapMutations } from 'vuex'
import Vue from 'vue'
Vue.use(Spin)
Vue.use(Icon)
export default {
    name: "dappSearch",
    data() {
        return {
            dappSearchValue: this.$store.state.dappStore.dappSeachValue || "",
            searchhistory: false,
            historyList: [],
            keywordlist: [],
            initkeywordlist: [],
            dappSearchTips: false,
            searchloading: false,
            isPC: this.$store.state.isPC
        }
    },
    props: {
        setfocus: {
            type: Boolean,
            default: false
        }
    },
    beforeMount() {
        this.HandleInitHistory()
    },
    mounted() {
        if (this.setfocus) {
            this.$refs.dappSearch.focus()
        }
    },
    methods: {
        ...mapMutations({
            changedappSeachValue: 'dappStore/changedappSeachValue'
        }),
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
            this.fuzzysearch(this.dappSearchValue)
        }, 500),
        async fuzzysearch(dappSearchValue) {
            this.initkeywordlist = [];
            this.keywordlist = [];
            this.searchhistory = false;
            this.dappSearchTips = true
            this.searchloading = true
            if (!dappSearchValue) {
                this.dappSearchTips = false;
                this.searchloading = false
                return
            }
            const { WalletID } = this.$store.state;
            const { data, status } = await this.$api.dappStore.dappSearchTips({ keyword: dappSearchValue });
            if (status == 0) {
                this.initkeywordlist = deepClone(data)
                this.keywordlist = deepClone(data)
            } else {
                this.initkeywordlist = [];
                this.keywordlist = [];
                this.dappSearchTips = false;
            }
            this.searchloading = false
            if (this.keywordlist.length > 0) {
                this.setSearchStyle(dappSearchValue, this.keywordlist)
            }
            // this.historyList = this.historyList.filter(item => {
            //     if (item.indexOf(dappSearchValue) > -1) { //indexOf方法中如果xxx.indexOf("")返回值为0
            //         return item
            //     }
            // })
        },
        clearSearch() {
            this.dappSearchValue = ''
            this.changedappSeachValue('')
            this.handleBlur()
        },
        handleFocus() {
            this.searchhistory = true;
        },
        handleBlur() {
            this.searchhistory = false;
            this.dappSearchTips = false;
        },
        enterSearch() {
            this.handleBlur()
            if (!this.dappSearchValue || !this.dappSearchValue.trim()) {

                return this.$message.error(this.$t("DappStore.search.error1"))
            }
            this.historyList.push(this.dappSearchValue)
            this.HandleSetHistory(this.dappSearchValue)
        },
        HandleSetHistory(data, isRemove) {
            if (isRemove) {
                this.searchhistory = true
            } else {
                this.dappSearchValue = data;
                this.handleBlur()
                const { ...query } = this.$route.query
                const { language } = this.$route.params
                this.changedappSeachValue(this.dappSearchValue)
                if (this.$route.path == '/' + language + '/dapp/searchresults') {

                } else {
                    this.$router.push({
                        path: '/' + language + '/dapp/searchresults',
                        query: {
                            ...query
                        }
                    })
                }
            }
            let oldHistory = [];
            let newArr = [];
            let showArr = [];
            data = data.toString();
            if (localStorage.getItem('BK_DAPP_SEARCH_HISTORY')) {
                oldHistory = JSON.parse(localStorage.getItem('BK_DAPP_SEARCH_HISTORY'));
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
            localStorage.setItem('BK_DAPP_SEARCH_HISTORY', JSON.stringify(newArr));
            this.HandleInitHistory()
        },
        HandleInitHistory() {
            if (!localStorage.getItem('BK_DAPP_SEARCH_HISTORY')) {
                this.historyList = [];
            } else {
                let data = JSON.parse(localStorage.getItem('BK_DAPP_SEARCH_HISTORY'));
                this.historyList = data;
            }
        },
        RemoveAll() {
            localStorage.removeItem('BK_DAPP_SEARCH_HISTORY');
            this.HandleInitHistory()
        }
    },
    directives: {
        ClickOutside
    },
    watch: {
        "$store.state.dappStore.dappSeachValue": function (newVal, oldVal) {
            this.dappSearchValue = newVal;
        },
        $route(to, from) {
            const { path, params } = to
            const { language } = params
            if (path != '/' + language + '/dapp/searchresults') {
                this.dappSearchValue = '';
                this.changedappSeachValue('')
            }
        }
    },
}
</script>
<style lang="less" scoped>
.theme-light {
    @media (any-hover:hover) {

        .historyItem:hover {
            background: @theme-light-bg1;
        }
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
    @media (any-hover:hover) {
        .historyItem:hover {
            background: @theme-dark-bg1;
        }
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

@media screen and (max-width: 845px) {
    .searchBox {
        width: 100%;

        .search {
            width: 100% !important;
        }

        .searchhistory {
            bottom: -420px !important;
        }
    }
}

.searchBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .search {
        width: 496px;
        border: 1px solid;
        padding: 10px;
        border-radius: 4px;
        display: flex;
        align-items: center;

        input {
            margin-left: 10px;
            flex: 1;
        }

        .close_icons,
        .close_icons_dark {
            cursor: pointer;
        }
    }


    .searchhistory {
        border: 1px solid;
        width: 100%;
        height: 420px;
        position: absolute;
        bottom: -428px;
        left: 0px;
        z-index: 99;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
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
            width: 100%;
            flex: 1;
            overflow-y: scroll;
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;

            .historyItem {
                user-select: none;
                width: 100%;
                padding: 15px 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;

                .historyInfo {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    white-space: nowrap;

                    span {
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

        .historyList::-webkit-scrollbar {
            width: 0 !important
        }

        .noData {
            width: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 18px;
            flex-direction: column;
        }
    }
}

.searchhistoryhover {
    display: block !important;
}
</style>