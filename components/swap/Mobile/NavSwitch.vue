<template>
    <div class="mobile-nav">
        <nav class="lineBG2 text3">
            <p @click="navType = 1" :class="{ 'text1 active': navType == 1 }">{{ $t('SwapDetail.captial.pool') }}</p>
            <p @click="navType = 2" :class="{ 'text1 active': navType == 2 }"> {{ $t('SwapDetail.dealNav1') }}</p>
            <p @click="navType = 3" :class="{ 'text1 active': navType == 3 }">{{ $t('SwapDetail.captial.intro') }}</p>
            <p @click="wsitch()" :class="{ 'text1 active': navType == 4 }">{{ $t('SwapDetail.dealNav2') }}</p>
        </nav>
        <!-- 组件切换 -->
        <div>
            <CaptialPool v-show="navType == 1" v-if="isSpecialty == 1" />
            <DealRecordMobile v-show="navType == 2" v-if="isSpecialty == 1" />
            <CaptialIntroduce v-show="navType == 3" />
            <DealData ref="swapDealData" v-if="navType == 4 && isSpecialty == 1" />
            <div class="notDataBox" v-if="navType != 3 && isSpecialty != 1">
                <img src="@/assets/img/components/dappStore/history/light/icons.svg" class="light_icon" alt="notData">
                <img src="@/assets/img/components/dappStore/history/dark/icons.svg" class="dark_icon" alt="notData">
                <div class="text3 notData" :title='$t("SwapHome.noData")'>{{ $t("SwapHome.noData") }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CaptialPool from '../CaptialPool.vue'
import DealRecordMobile from './DealRecordMobile.vue'
import DealData from '../DealData.vue'
import CaptialIntroduce from '../CaptialIntroduce.vue'
export default {
    name: 'NavSwitch',
    components: {
        CaptialPool,
        DealRecordMobile,
        DealData,
        CaptialIntroduce
    },
    props: {
        isSpecialty: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            navType: this.isSpecialty!=1?3:1
        }
    },
    mounted() {
    },
    methods: {
        wsitch() {
           this.navType = 4;
           if(this.isSpecialty==1){
            setTimeout(() => {
                this.$refs.swapDealData.init()
            }, 700)
           }
        },
        resizeEchart() {
            this.$refs.swapDealData.rangeEchart()
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .active {
        border-color: #0E0E0E !important;
    }
}

.theme-dark {
    .active {
        border-color: #E5E5E5 !important;
    }
}

.mobile-nav {
    width: 100%;

    nav {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 32px;
        height: 40px;
        align-items: center;
        border-bottom: 1px solid #F5F5F5;
        border-top: 5px solid #F5F5F5;

        p {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 34px;
            height: 100%;

            &.active {
                border-bottom: 2px solid #0E0E0E;
            }
        }

    }

    .notDataBox {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 64px;
            height: 64px;
        }

        .notData {
            font-weight: 500;
            font-size: 12px;
            line-height: 1.5;
            display: flex;
            align-items: center;
            text-align: center;
        }
    }
}
</style>