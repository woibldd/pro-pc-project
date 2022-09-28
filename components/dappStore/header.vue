<template>
    <div class="DappStoreheaderBox BG0blur" v-click-outside="h5handleBlur">
        <div class="DappStoreheader lineBG2" v-if="!h5searchshow">
            <div class="left">
                <h1 class="text1" :title="$t('DappStore.header')">
                    {{ $t('DappStore.header') }}
                </h1>
                <AllChain></AllChain>
            </div>
            <DappSearch v-if="isPC"></DappSearch>
            <div class="mobilesearch" v-if="!isPC" @click="showSearch">
                <img src="@/assets/img/components/dappStore/search/light/h5_search.svg"
                    class="nav_search_light light_icon" alt="nav_search">
                <img src="@/assets/img/components/dappStore/search/dark/h5_search.svg"
                    class="nav_search_dark dark_icon" alt="nav_search">
            </div>
        </div>
        <DappSearch v-if="h5searchshow" :setfocus="setfocus"></DappSearch>
    </div>
</template>
<script>
import AllChain from './allChain.vue'
import DappSearch from './dappSearch.vue'
import ClickOutside from 'vue-click-outside'
export default {
    data() {
        return {
            isPC: !this.$store.state.isMobile,
            h5searchshow: false,
            setfocus:true
        }
    },
    directives: {
        ClickOutside
    },
    components: {
        AllChain,
        DappSearch
    },
    methods: {
        h5handleBlur() {
            this.h5searchshow = false
            this.setfocus=false
        },
        showSearch() {
            this.h5searchshow = true;
            this.setfocus=true
        }
    },
    watch: {
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        },
        "$store.state.dappStore.dappSeachValue": function (newVal, oldVal) {
           if(!this.isPC){
               this.h5searchshow=false
           }
        },
    }
}
</script>
<style lang="less" scoped>

@media screen and (min-width: 1920px) {
    .DappStoreheaderBox {
        padding: 0px 196px !important;
    }
}
@media screen and (max-width: 1919px)and (min-width: 1024px)  {
    .DappStoreheaderBox {
         padding: 0px 70px !important;
    }
}
@media screen and (max-width: 1023px)   {
    .DappStoreheaderBox {
         padding: 0px 20px !important;
    }
}
@media screen and (max-width: 1249px)and (min-width: 751px) {
    .DappStoreheader .left h1 {
        font-size: 32px !important;
    }
}

@media screen and (max-width: 845px)and(min-width: 751px) {
    .DappStoreheaderBox {
        position: sticky !important;
        min-height: 52px !important;
        margin-top: 80px !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 120 !important;
        .DappStoreheader {
            border: none !important;
            width: 100%;
            .left {
                min-height: 32px;
                flex: 1;
                justify-content: space-between;
                padding-right: 10px;

                h1 {
                    font-size: 16px !important;
                }
            }

            .mobilesearch {
                display: block;
            }
        }
    }
}
       
@media screen and (max-width: 750px) {
    .DappStoreheaderBox {
        position: sticky !important;
        top: 0 !important;
        min-height: 52px !important;
        margin-top: 44px !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 120 !important;
        .DappStoreheader {
            border: none !important;
            width: 100%;
            .left {
                min-height: 32px;
                flex: 1;
                justify-content: space-between;
                padding-right: 10px;

                h1 {
                    width: auauto;
                    max-width:110px;
                    font-size: 16px !important;
                }
            }

            .mobilesearch {
                display: block;
            }
        }
    }
}

.DappStoreheaderBox {
    width: 100%;
    min-width: 350px;
    position: fixed;
    top: 64px;
    z-index: 100;
    padding: 0px 196px;
    -webkit-backdrop-filter: blur(20px);
    -moz-backdrop-filter: blur(20px);
    -ms-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);


    .DappStoreheader {
        display: flex;
        background: transparent;
        justify-content: space-between;
        align-items: center;
        background: transparent;
        border-bottom: 1px solid;
        padding: 10px 0px;

        .left {
            display: flex;
            align-items: center;

            h1 {
                width: 238px;
                display: inline-block;
                font-weight: 600;
                font-size: 32px;
                line-height: 1.5;
            }
        }
    }
}
</style>