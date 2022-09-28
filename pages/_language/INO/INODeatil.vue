<template>
    <div class="contentBox">
        <div class="detailbox">
            <div v-if="isloading" class="loadingBox">
                <a-spin :spin="isloading">
                    <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
                </a-spin>
            </div>
            <div :class="isPC ? 'inodetatil-content' : 'inodetatil-content-small'" v-else>
                <div class="inodetatil-content-top" v-if="detailList.info">
                    <!-- :style="{
                                    'background-image': `url(${detailList.info.banner})`,
                                }" -->
                    <div class="inodetatil-content-banner">
                        <img :src="detailList.info.banner" alt="nft banner" />
                    </div>
                    <ul class="inodetatil-content-text">
                        <li class="inodetatil-content-img lineBG0">
                            <img class="BG0" :src="detailList.info.publisherPic" alt="publisher" />
                            <img
                                class="chainIcon"
                                :src="
                                    chainList && detailList.info.chain && chainList[detailList.info.chain].grayIcon
                                        ? chainList[detailList.info.chain].grayIcon
                                        : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'
                                "
                                :alt="detailList.info && detailList.info.chain"
                            />
                        </li>
                        <li>
                            <h6 class="inodetatil-content-text-title text1" title="发行发介绍">{{ detailList.info.publisher }}</h6>
                        </li>
                        <li v-if="detailList && detailList.info && detailList.info.privilegeTag" class="privilegeTag">
                            <p>
                                <span>{{ detailList.info.privilegeTag }}</span>
                            </p>
                        </li>
                        <li class="inodetatil-content-text-hot">
                            <p class="hot-text">
                                🔥<span>{{ detailList.info.hotNum }}</span>
                            </p>
                            <!-- <p class="inodetatil-content-text-hot-second BG1 text2 lineBG2"
                                v-clipboard:copy="detailList.info.nftContract" v-clipboard:success="onCopy">
                                <img :src="chainList && detailList.info.chain && chainList[detailList.info.chain].icon ? chainList[detailList.info.chain].icon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'"
                                    :alt="detailList.info && detailList.info.chain" />
                                <span class="inodetatil-content-text-hot-Contract" v-show="!copyFlag">{{
                                        getSubStr(detailList.info.nftContract)
                                }}</span>
                                <span class="inodetatil-content-text-hot-Contract" v-show="copyFlag">Copied!</span>
                            </p> -->
                        </li>
                        <li class="text2 writing">
                            <div ref="more">
                                <p class="before" v-show="!isPC && !viewAllFlag"></p>
                                <p ref="viewall" class="viewall text1" @click="viewAll()" v-show="!isPC && !viewAllFlag">View All</p>
                                <p class="moreText" ref="moreText">
                                    {{ detailList.info.publisherDesc }}
                                </p>
                                <p class="bottomtext" v-show="!isPC" ref="bottomtext">{{ detailList.info.publisherDesc }}</p>
                            </div>
                        </li>
                        <li class="issuer lineBG2">
                            <p class="issuer-text">
                                <span class="text1">{{ detailList.info.publisher }}</span>
                                <span class="text5">{{ $t('INO.publish') }}</span>
                            </p>
                            <p class="issuerimg-box">
                                <span v-for="(item, key, index) in iconList" :key="index" class="issuer-img" v-show="detailList.info[key]">
                                    <a :href="detailList.info[key]" :title="key" @click="jump($event, detailList.info[key])">
                                        <img :src="item" :alt="key" />
                                    </a>
                                </span>
                            </p>
                        </li>
                    </ul>
                </div>

                <div :class="isPC ? ' ino-detail' : 'ino-detail ino-detail-small'" id="inodetail" ref="inodetail">
                    <!-- 左边 -->
                    <div class="ino-detail-right" ref="detailRight">
                        <div id="inodetailImg" ref="inodetailImg">
                            <div class="swiper-container" id="gallery">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide lineBG2" v-for="item in detailList.list" :id="item.id" :key="item.id">
                                        <img :src="item.icon" :id="item.id" alt="nft img" />
                                    </div>
                                </div>
                            </div>
                            <div class="thumbsBox">
                                <div class="swiper-container swiper-thumbs" id="thumbs">
                                    <div class="swiper-wrapper" v-if="detailList && detailList.list && detailList.list.length && detailList.list.length >= 2">
                                        <div class="swiper-slide lineBG2" v-for="item in detailList.list" :id="item.id" :key="item.id">
                                            <img :src="item.icon" :id="item.id" alt="nft img" />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    :class="isPC ? 'swiper-button-next  swiper-buttom-next-big' : 'swiper-button-next swiper-buttom-next-small'"
                                    v-if="detailList.list && detailList.list.length >= 4"
                                ></div>
                                <div
                                    :class="isPC ? 'swiper-button-prev swiper-buttom-prev-big' : 'swiper-button-prev swiper-buttom-prev-small'"
                                    v-if="detailList.list && detailList.list.length >= 4"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <ul class="ino-detail-left" v-if="detailInfo.id">
                        <p class="ino-detail-price text3">Price</p>
                        <li class="priceDeatil">
                            <img
                                :src="
                                    chainList && detailInfo.chain && chainList[detailInfo.chain].icon
                                        ? chainList[detailInfo.chain].icon
                                        : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'
                                "
                                :alt="detailInfo && detailInfo.chain"
                            />
                            <p class="chainPrice text1">{{ detailInfo.price ? toFixed(detailInfo.price, 4) : 0 }} {{ detailInfo.priceCoinName }}</p>
                            <p class="doller text3">~{{ detailInfo.symbol }}{{ detailInfo.priceDollar ? toFixed(detailInfo.priceDollar, 2) : 0 }}</p>
                        </li>
                        <li class="castingNums">
                            <p class="castingNums-text text1">
                                <span>{{ $t('INO.castTotal') }}</span>
                                <span>{{ detailInfo.currencyMint }}/{{ detailInfo.totalMinted }}</span>
                            </p>
                            <div class="progress">
                                <a-progress
                                    :percent="(detailInfo.currencyMint / detailInfo.totalMinted) * 100"
                                    :steps="100"
                                    :stroke-color="{
                                        '0%': '#495BFF',
                                        '50%': '#0E0064',
                                        '100%': '#986DF6',
                                    }"
                                    :showInfo="false"
                                    trailColor="#f00"
                                />
                            </div>
                        </li>

                        <li v-for="(item, index) in detailInfo.others" :key="index + 'info'">
                            <div class="information lineBG2" v-if="item && item.type && item.type == 'info' && !!item.infoValue.length">
                                <p class="information-text text1">
                                    <span>{{ item.title }}</span
                                    ><span
                                        >{{ $t('INO.copyrightRoyalty') }} {{ detailInfo.copyrightRoyalty }}
                                        <a-tooltip placement="top">
                                            <template #title>
                                                <span>{{ $t('INO.tooltip') }}</span>
                                            </template>
                                            <img :src="theme == 'dark' ? imgList.questionDark : imgList.question" alt="question" />
                                        </a-tooltip>
                                    </span>
                                </p>
                                <p class="contract" v-for="(item, index) in item.infoValue" :key="index + 'infoList'">
                                    <span class="text3" v-if="!!item.title && !!item.infoValue">{{ item.title }}</span
                                    ><span class="text1"
                                        >{{ item.isContract === true ? getSubStr(item.infoValue) : item.infoValue }}
                                        <img :src="imgList.copy" v-if="item.isCopy" @click="successCopy($event, item.infoValue)" alt="copy"
                                    /></span>
                                </p>
                            </div>
                        </li>

                        <li class="time" v-if="!detailInfo.timeList.alreadyStarted">
                            <h6 class="text1">{{ $t('INO.soon') }}</h6>
                            <div class="ino-countdown-text-time">
                                <p class="time-every">
                                    <span class="time-every-num BG1 text1 lineBG2">{{
                                        Number(detailInfo.timeList.d) < 10 ? '0' + detailInfo.timeList.d : detailInfo.timeList.d
                                    }}</span>
                                    <span class="time-every-min text2">D A Y S</span>
                                </p>
                                <p class="time-every">
                                    <span class="time-every-num BG1 text1 lineBG2">{{
                                        Number(detailInfo.timeList.h) < 10 ? '0' + detailInfo.timeList.h : detailInfo.timeList.h
                                    }}</span>
                                    <span class="time-every-min text2">H R S</span>
                                </p>
                                <p class="time-every">
                                    <span class="time-every-num BG1 text1 lineBG2">{{
                                        Number(detailInfo.timeList.m) < 10 ? '0' + detailInfo.timeList.m : detailInfo.timeList.m
                                    }}</span>
                                    <span class="time-every-min text2">M I N</span>
                                </p>
                                <p class="time-every">
                                    <span class="time-every-num BG1 text1 lineBG2">{{
                                        Number(detailInfo.timeList.s) < 10 ? '0' + detailInfo.timeList.s : detailInfo.timeList.s
                                    }}</span>
                                    <span class="time-every-min text2">S E C</span>
                                </p>
                            </div>
                        </li>
                        <div :class="!isPC ? 'bottomFixed BG0 lineBG5' : ''">
                            <li class="white">
                                <!-- 是否是白名单 -->
                                <div>
                                    <p class="noWhiteList" v-if="inoStatus.isWhite && !inoStatus.isUserWhite">
                                        <span class="whiteUser"> <img :src="imgList.noWhite" alt="Non whitelist users" /> {{ $t('INO.noUserWhite') }}</span>
                                    </p>
                                    <p class="WhiteList" v-if="inoStatus.isWhite && inoStatus.isUserWhite">
                                        <span class="whiteUser"> <img :src="imgList.white" alt="White list users" /> {{ $t('INO.UserWhite') }}</span>
                                    </p>
                                </div>
                                <!-- 出售进行中 -->
                                <span
                                    class="saleProgress"
                                    v-if="
                                        detailInfo.timeList.alreadyStarted &&
                                        CurrentIno &&
                                        CurrentIno.type &&
                                        CurrentIno.type !== 'myOrder' &&
                                        inoStatus.buttonStatus !== 4 &&
                                        inoStatus.buttonStatus !== 5
                                    "
                                >
                                    <span>
                                        <span>{{ $t('INO.soonDown') }}</span>
                                    </span>
                                </span>
                                <span class="castStart" v-if="CurrentIno && CurrentIno.type && CurrentIno.type == 'myOrder' && CurrentIno.castStatus == 1"
                                    >{{ $t('INO.mintingstarts') }}{{ chainIcon.time }}</span
                                >
                                <span class="castSuccess" v-if="CurrentIno && CurrentIno.type && CurrentIno.type == 'myOrder' && CurrentIno.castStatus == 2"
                                    >{{ $t('INO.castSUccess') }}!</span
                                >
                                <span class="castError" v-if="CurrentIno && CurrentIno.type && CurrentIno.type == 'myOrder' && CurrentIno.castStatus == 3"
                                    >{{ $t('INO.castError') }}!</span
                                >
                            </li>
                            <!-- // 0 可铸造 1 不可铸造 2 用户不是白名单 不可铸造 3  用户mint数量达到上限 4 所有nft已经全部铸造 5 活动已结束 -->
                            <li class="detatilbutton" v-if="inoStatus.buttonStatus == 0 && inoStatus.broadcast != 1">
                                <!-- 可铸造 -->
                                <a-button type="primary" class="connectWallet" @click="castingFunc()">
                                    {{ $t('INO.cast') }}
                                </a-button>
                            </li>
                            <li class="detatilbutton" v-if="inoStatus.broadcast == 1">
                                <!-- 铸造中 -->
                                <a-button type="primary" class="connectWallet" @click="minting()"> {{ $t('INO.castpedding') }}... </a-button>
                            </li>
                            <li
                                class="detatilbutton detatilbuttonDisable"
                                v-if="inoStatus.buttonStatus == 1 && !detailInfo.timeList.alreadyStarted && inoStatus.isWhite && inoStatus.isUserWhite"
                            >
                                <!-- 不可铸造 -->
                                <a-button type="primary" class="connectWallet" :disabled="true">
                                    {{ $t('INO.cast') }}
                                </a-button>
                            </li>

                            <li
                                class="detatilbutton detatilbuttonDisable"
                                v-if="inoStatus.buttonStatus == 1 && !detailInfo.timeList.alreadyStarted && !inoStatus.isWhite && !inoStatus.isUserWhite"
                            >
                                <!-- 不可铸造 -->
                                <a-button type="primary" class="connectWallet" :disabled="true">
                                    {{ $t('INO.cast') }}
                                </a-button>
                            </li>

                            <li
                                class="detatilbutton detatilbuttonDisable"
                                v-if="
                                    inoStatus.buttonStatus == 1 &&
                                    !detailInfo.timeList.alreadyStarted &&
                                    inoStatus.isWhite &&
                                    !inoStatus.isUserWhite &&
                                    !inoStatus.whiteUrl
                                "
                            >
                                <!-- 不可铸造 -->
                                <a-button type="primary" class="connectWallet" :disabled="true">
                                    {{ $t('INO.cast') }}
                                </a-button>
                            </li>
                            <li
                                class="detatilbutton detatilbuttonDisable"
                                v-if="inoStatus.buttonStatus == 1 && detailInfo.timeList.alreadyStarted && inoStatus.isWhite && !inoStatus.isUserWhite"
                            >
                                <!-- 不可铸造 -->
                                <a-button type="primary" class="connectWallet" :disabled="true">
                                    {{ $t('INO.cast') }}
                                </a-button>
                            </li>

                            <li class="detatilbutton detatilbuttonDisable btnFlex" v-if="inoStatus.buttonStatus == 3">
                                <!-- 铸造数已达上限 -->
                                <a-button type="primary" class="connectWallet upperlimit" :disabled="true">
                                    {{ $t('INO.upperlimit') }}
                                </a-button>
                                <a-button type="primary" class="viewNft">
                                    <a :href="'/' + $route.params.language + '/INO/INOHistory'" @click="viewHistory($event)">
                                        {{ $t('INO.viewNFT') }}
                                    </a>
                                </a-button>
                            </li>
                            <li
                                class="detatilbutton btnFlex"
                                v-if="
                                    (inoStatus.buttonStatus == 4 || inoStatus.buttonStatus == 5) && detailInfo.timeList.alreadyStarted && inoStatus.userMintNum
                                "
                            >
                                <!-- 已结束 -->
                                <a-button type="primary" class="connectWallet">
                                    <a href="https://bitkeep.com/download" :title="$t('INO.down')" @click="downApp($event)">
                                        {{ $t('INO.down') }}
                                    </a>
                                </a-button>
                                <a-button type="primary" class="viewNft">
                                    <a :href="'/' + $route.params.language + '/INO/INOHistory'" :title="$t('INO.viewNFT')" @click="viewHistory($event)">
                                        {{ $t('INO.viewNFT') }}
                                    </a>
                                </a-button>
                            </li>
                            <li
                                class="detatilbutton"
                                v-if="
                                    (inoStatus.buttonStatus == 4 || inoStatus.buttonStatus == 5) && detailInfo.timeList.alreadyStarted && !inoStatus.userMintNum
                                "
                            >
                                <!-- 没有铸造过 -->
                                <a-button type="primary" class="connectWallet">
                                    <a href="https://bitkeep.com/download" :title="$t('INO.down')" @click="downApp($event)">
                                        {{ $t('INO.down') }}
                                    </a>
                                </a-button>
                            </li>
                            <li
                                class="detatilbutton"
                                v-if="!inoStatus.isUserWhite && inoStatus.isWhite && inoStatus.whiteUrl && !detailInfo.timeList.alreadyStarted"
                            >
                                <!-- 获取白名单 -->
                                <a-button type="primary" class="connectWallet">
                                    <a :href="inoStatus.whiteUrl" :title="$t('INO.getWhite')" @click="getWhitelist($event, inoStatus.whiteUrl)">
                                        {{ $t('INO.getWhite') }}
                                    </a>
                                </a-button>
                            </li>
                        </div>
                        <li>
                            <!-- 风险警示 -->
                            <div class="nftintroduction lineBG2">
                                <p class="nftintroduction-title text1">{{ $t('INO.riskWarning') }}</p>
                                <p class="nftintroduction-text text3">
                                    {{ $t('INO.riskWarningDesc') }}
                                </p>
                            </div>
                        </li>
                        <div v-for="(item, index) in detailInfo.customText || []" :key="index + item.type">
                            <li v-if="item && item.type && item.type == 'describe' && item.value && item.value.list && mapObject(item.value.list)">
                                <div class="nftintroduction lineBG2" v-if="item && item.value">
                                    <p class="nftintroduction-title text1">{{ item.title }}</p>
                                    <p class="nftintroduction-text text3" v-if="item && item.value && item.value.type && item.value.type == 'img'">
                                        <img :src="theme == 'dark' ? item.value.list.iphoneDark : item.value.list.iphoneLight" :alt="item.title" />
                                    </p>
                                    <p class="nftintroduction-text text3" v-if="item && item.value && item.value.type && item.value.type == 'text'">
                                        <span v-for="(v, ind) in item.value.list" :key="ind">{{ v }}</span>
                                    </p>
                                </div>
                            </li>
                            <li v-if="item && item.type && item.type == 'roadMap'">
                                <!-- 路线图 -->
                                <div
                                    class="roadMap lineBG2"
                                    v-if="item && item.type && item.type == 'roadMap' && item.value && item.value.list && mapObject(item.value.list)"
                                >
                                    <p class="roadMap-title text1">{{ item.title }}</p>
                                    <div class="roadMap-content" v-if="item.value && item.value.type && item.value.type == 'text'">
                                        <a-timeline>
                                            <a-timeline-item
                                                v-for="(v, index) in item.value.list"
                                                :key="index + 'roadMap'"
                                                :color="theme === 'dark' ? '#9E9DA6' : '#515556'"
                                            >
                                                <span class="text3">{{ v.title }}</span>
                                                <span class="text2">{{ v.content }}</span>
                                            </a-timeline-item>
                                        </a-timeline>
                                    </div>
                                    <div v-if="item.value && item.value.type && item.value.type == 'img'">
                                        <img :src="theme == 'dark' ? item.value.list.iphoneDark : item.value.list.iphoneLight" alt="路线图" />
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
                <CastNFT
                    :castingShow="castingShow"
                    :detailInfo="detailInfo"
                    @cloaseCastNft="cloaseCastNft"
                    :address="address"
                    :chainList="chainList"
                    :castBtn="castBtn"
                    :inoStatus="inoStatus"
                />
                <NotInstalled :InstalledShow="InstalledShow" @closeInstalledShow="closeInstalledShow"></NotInstalled>
                <AlreadyInstalled :AlreadyInstalledShow="AlreadyInstalledShow" @closeAlreadystalledShow="closeAlreadystalledShow"></AlreadyInstalled>
            </div>
        </div>
    </div>
</template>
<script>
import CastNFT from './castNFT.vue';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import { Progress, Timeline, Spin, Tooltip } from 'ant-design-vue/lib';
import NotInstalled from '../../../components/isInstallModel/notInstalled.vue';
import AlreadyInstalled from '../../../components/isInstallModel/alreadyInstalled.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { wallet } from '@/utils/wallet';
import Vue from 'vue';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';

Vue.use(Tooltip);
Vue.use(Progress);
Vue.use(Timeline);
Vue.use(Spin);
export default {
    layout: 'INO/default',
    name: 'INOdetatil',
    scrollToTop: true,
    // async asyncData(app) {
    //     let chainList = {};
    //     const GetDappConfig = app.store.state.chainMainnetList && app.store.state.chainMainnetList.length != 0 ? { status: 0, data:{chainMainnetList :app.store.state.chainMainnetList}  } : await app.$api.dappStore.GetDappConfig({});
    //      if (GetDappConfig.status == 0) {
    //         app.store.commit("changechainMainnetList", GetDappConfig.data)
    //         if (GetDappConfig.data && GetDappConfig.data.chainMainnetList) {
    //             GetDappConfig.data.chainMainnetList.map(v => {
    //                 chainList[v.chain] = v;
    //             })
    //         }
    //     }
    //     return {
    //         chainList,
    //     }
    // },
    components: { AlreadyInstalled, CastNFT, NotInstalled },
    async asyncData(app) {
        const { status, data } = await app.$api.INOApi.getINOlist();
        return {
            INOlist:
                status == 0
                    ? data
                    : {
                          endList: { list: [], tittle: '' },
                          foreList: { list: [], tittle: '' },
                          topList: { list: [], tittle: '' },
                          banners: { oneArray: [], secondArray: [], thirdArray: [] },
                      },
        };
    },
    data() {
        return {
            chainList: {
                eth: {
                    chain: 'eth',
                    title: 'Ethereum',
                    icon: 'https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_ab472ff0-f072-11ec-84d2-0337bae4f47b.png',
                    blcakIcon: 'https://cdn.bitkeep.vip/u_b_e4a321d0-031b-11ed-ad3b-25d60e820fbb.png',
                    lightIcon: 'https://cdn.bitkeep.vip/u_b_4ed2edc0-031b-11ed-ad3b-25d60e820fbb.png',
                },
                bnb: {
                    chain: 'bnb',
                    title: 'BSC',
                    icon: 'https://cdn.bitkeep.vip/u_b_ba4ec2d1-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_0e7fe210-f073-11ec-82d1-45df45b47e59.png',
                    blcakIcon: 'https://cdn.bitkeep.vip/u_b_e2662a20-031b-11ed-ad3b-25d60e820fbb.png',
                    lightIcon: 'https://cdn.bitkeep.vip/u_b_4a3549c0-031b-11ed-ad3b-25d60e820fbb.png',
                },
                matic: {
                    chain: 'matic',
                    title: 'Polygon',
                    explorer: 'https://polygonscan.com/',
                    icon: 'https://cdn.bitkeep.vip/u_b_bbb29890-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_190165b0-f073-11ec-878d-dd4f1d6d4d8d.png',
                    blcakIcon: 'https://cdn.bitkeep.vip/u_b_e77888f0-031b-11ed-ad3b-25d60e820fbb.png',
                    lightIcon: 'https://cdn.bitkeep.vip/u_b_5210dab0-031b-11ed-ad3b-25d60e820fbb.png',
                },
                sol: {
                    chain: 'sol',
                    title: 'Solana',
                    icon: 'https://cdn.bitkeep.vip/u_b_bbb3aa00-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_2ae46840-f073-11ec-b752-4545d7d7a6c5.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                ftm: {
                    chain: 'ftm',
                    title: 'Fantom',
                    icon: 'https://cdn.bitkeep.vip/u_b_baeb50f0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_40a95ff0-f073-11ec-b752-4545d7d7a6c5.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                avax_c: {
                    chain: 'avax_c',
                    title: 'AVAX-C',
                    icon: 'https://cdn.bitkeep.vip/u_b_ba4e4da0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_4cd7f750-f073-11ec-b752-4545d7d7a6c5.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                arbitrum: {
                    chain: 'arbitrum',
                    title: 'Arbitrum',
                    icon: 'https://cdn.bitkeep.vip/u_b_ba4ee9e0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_5ac4e080-f073-11ec-ab28-2dacbd127ae1.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                kcs: {
                    chain: 'kcs',
                    title: 'KCC',
                    icon: 'https://cdn.bitkeep.vip/u_b_661aabb0-a693-11ec-9bb2-d529ee665d4d.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_72d74aa0-f073-11ec-b59b-cb8601612437.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                ht: {
                    chain: 'ht',
                    title: 'Heco',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb0b5c10-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_835761d0-f073-11ec-b59b-cb8601612437.png',
                    blcakIcon: 'https://cdn.bitkeep.vip/u_b_5d734be0-0762-11ed-8cdd-45359e3c45df.png',
                    lightIcon: 'https://cdn.bitkeep.vip/u_b_50485320-0762-11ed-8cdd-45359e3c45df.png',
                },
                okt: {
                    chain: 'okt',
                    title: 'OKX Chain',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb808c10-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_94d62450-f073-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                trx: {
                    chain: 'trx',
                    title: 'Tron',
                    icon: 'https://cdn.bitkeep.vip/u_b_bbdaba00-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_a69a7b50-f073-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                fuse: {
                    chain: 'fuse',
                    title: 'Fuse',
                    icon: 'https://cdn.bitkeep.vip/u_b_bafc19d0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_0419e040-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                one: {
                    chain: 'one',
                    title: 'Harmony',
                    icon: 'https://cdn.bitkeep.vip/u_b_5c054600-9acf-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_d106ac60-f078-11ec-b13a-6df09a64a418.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                boba: {
                    chain: 'boba',
                    title: 'BOBA',
                    icon: 'https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_25281860-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                klay: {
                    chain: 'klay',
                    title: 'KLAY',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb3c3010-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_3390c140-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                optimism: {
                    chain: 'optimism',
                    title: 'Optimism',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb999250-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_3b761630-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                kai: {
                    chain: 'kai',
                    title: 'KardiaChain',
                    icon: 'https://cdn.bitkeep.vip/u_b_42900030-dd6d-11ec-a0b5-f7bd232e861e.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_deaaccc0-f078-11ec-b13a-6df09a64a418.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                eos: {
                    chain: 'eos',
                    title: 'EOS',
                    icon: 'https://cdn.bitkeep.vip/u_b_bab796c0-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_5cae6b90-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                wax: {
                    chain: 'wax',
                    title: 'WAX',
                    icon: 'https://cdn.bitkeep.vip/u_b_bbfb1340-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_69539280-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                near: {
                    chain: 'near',
                    title: 'NEAR',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb6a9310-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_73d34160-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                iost: {
                    chain: 'iost',
                    title: 'IOST',
                    icon: 'https://cdn.bitkeep.vip/u_b_bb2ec290-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_e7f41e80-f078-11ec-b13a-6df09a64a418.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                luna: {
                    chain: 'luna',
                    title: 'Terra',
                    icon: 'https://cdn.bitkeep.vip/u_b_bbca8d60-9afd-11ec-aac8-bf8a172584ab.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_a2335b30-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                czz: {
                    chain: 'czz',
                    title: 'ClassZZ',
                    icon: 'https://cdn.bitkeep.vip/u_b_11664430-a810-11eb-9f5e-d184ba33d3a3.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_bf7cc320-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                cmp: {
                    chain: 'cmp',
                    title: 'Caduceus',
                    icon: 'https://cdn.bitkeep.vip/u_b_6f4023e0-c4b2-11ec-aa57-411cc0b3f4cb.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_b7a550e0-f074-11ec-86b4-53e272e03a61.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                true: {
                    chain: 'true',
                    title: 'TRUE',
                    icon: 'http://cdn.bitkeep.vip/u_b_802aefa0-a811-11eb-9f5e-d184ba33d3a3.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_b8581870-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                vlx: {
                    chain: 'vlx',
                    title: 'Velas',
                    icon: 'https://cdn.bitkeep.vip/u_b_4427cf90-69f0-11ec-9d26-85f1b63f7fbd.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_d2ad94c0-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                celo: {
                    chain: 'celo',
                    title: 'CELO',
                    icon: 'https://cdn.bitkeep.vip/u_b_4f8a0620-e8ab-11ec-8e86-53798d1a9b70.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_4d852420-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                crol2: {
                    chain: 'crol2',
                    title: 'Cronos',
                    icon: 'https://cdn.bitkeep.vip/u_b_181780d0-dd6d-11ec-a0b5-f7bd232e861e.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_60fef350-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                bch: {
                    chain: 'bch',
                    title: 'smartBCH',
                    icon: 'https://cdn.bitkeep.vip/u_b_b4efbf80-e8ad-11ec-8e86-53798d1a9b70.png',
                    grayIcon: '',
                    blcakIcon: '',
                    lightIcon: '',
                },
                xdai: {
                    chain: 'xdai',
                    title: 'xDAI',
                    icon: 'https://cdn.bitkeep.vip/u_b_07682f10-e8ac-11ec-8e86-53798d1a9b70.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_0ed1cf80-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                vs: {
                    chain: 'vs',
                    title: 'Vision',
                    icon: 'https://cdn.bitkeep.vip/u_b_6245d440-dd6d-11ec-a0b5-f7bd232e861e.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_f80504c0-f21b-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
                cube: {
                    chain: 'cube',
                    title: 'CUBE',
                    icon: 'https://cdn.bitkeep.vip/u_b_53c39ee0-e8b0-11ec-8e86-53798d1a9b70.png',
                    grayIcon: 'https://cdn.bitkeep.vip/u_b_77e5fcd0-f21c-11ec-9ebd-dbf9091edbd7.png',
                    blcakIcon: '',
                    lightIcon: '',
                },
            },
            iconList: {
                discord: 'https://cdn.bitkeep.vip/u_b_b196bce0-f397-11ec-8850-e9274e3dc079.png',
                twitter: 'https://cdn.bitkeep.vip/u_b_f68e0fb0-ea19-11ec-8113-c94df49cd896.png',
                telegram: 'https://cdn.bitkeep.vip/u_b_f9ef6320-ea19-11ec-8113-c94df49cd896.png',
                facebook: 'https://cdn.bitkeep.vip/u_b_fdec0c30-ea19-11ec-8113-c94df49cd896.png',
                website: 'https://cdn.bitkeep.vip/u_b_07344c80-ea1a-11ec-8113-c94df49cd896.png',
            },
            imgList: {
                copy: 'https://cdn.bitkeep.vip/u_b_506c8da0-eabe-11ec-8113-c94df49cd896.png',
                question: 'https://cdn.bitkeep.vip/u_b_91187df0-eabe-11ec-8113-c94df49cd896.png',
                questionDark: 'https://cdn.bitkeep.vip/u_b_0fe14e20-f3a5-11ec-8850-e9274e3dc079.png',
                white: 'https://cdn.bitkeep.vip/u_b_7f40c1d0-eac5-11ec-8113-c94df49cd896.png',
                noWhite: 'https://cdn.bitkeep.vip/u_b_47832480-ec92-11ec-9a67-731bb7b0e161.png',
            },
            swiperSlides: [
                'https://cdn.bitkeep.vip/u_b_50750f00-ea43-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_79fa54c0-ea43-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_f9ef6320-ea19-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_fdec0c30-ea19-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_00f9e870-ea1a-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_03dc20d0-ea1a-11ec-8113-c94df49cd896.png',
                'https://cdn.bitkeep.vip/u_b_07344c80-ea1a-11ec-8113-c94df49cd896.png',
            ],
            copyFlag: false,
            castingShow: false,
            detailList: { info: {}, list: [] },
            detailId: 0,
            detailInfo: {},
            inoStatus: {
                isWhite: true,
                isUserWhite: false,
                whiteUrl: '',
                userMintNum: 0,
                userMaxNum: 0,
                totalMinted: 0,
                currencyMint: 0,
                buttonStatus: 1,
                countDown: 0,
                startTime: 0,
                countDownTime: 0,
                endTime: 0,
            },
            isloading: true,
            castBtn: 'NotStarted',
            chainIdList: {
                eth: '0x1',
                ht: '0x80',
                matic: '0x89',
                bnb: '0x38',
                bsc: '0x38',
                arbitrum: '0xa4b1',
                polygon: '0x89',
                heco: '0x80',
                avalanche: '0xa86a',
                ftm: '0xfa',
            },
            indicator: <a-icon type='loading' style='font-size: 24px' spin />,
            AlreadyInstalledShow: false,
            InstalledShow: false,
            isPC: this.$store.state.isPC,
            screenWidth: 0,
            viewAllFlag: false,
        };
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('INO.shareTitle'),
            meta: [
                { name: 'keywords', content: this.$t('INO.shareDes') },
                { name: 'description', content: this.$t('INO.shareDes') },
                { name: 'title', content: this.$t('INO.shareDes') },
                { name: 'og:title', content: this.$t('INO.shareDes') },
                { name: 'og:description', content: this.$t('INO.shareDes') },
                { name: 'twitter:title', content: this.$t('INO.shareDes') },
                { name: 'twitter:description', content: this.$t('INO.shareDes') },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: 'BitKeep' },
                { name: 'og:type', content: 'website' },
                { name: 'og:site_name', content: 'BitKeep' },
                { hid: 'og:image:src', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : '' },
                { hid: 'og:image', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : '' },
                { hid: 'og:image:alt', name: 'og:image:alt', content: 'BitKeep, a Best Crpto Wallet' },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.INOlist.topList.list && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : '',
                },
                {
                    hid: 'twitter:image:src',
                    name: 'twitter:image:src',
                    content: this.INOlist.topList.list && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : '',
                },
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'BitKeep, a Best Crpto Wallet' },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/INO` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/INO` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/INO` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/INO` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/INO` },
            ],
        };
    },
    computed: {
        ...mapState(['address', 'CurrentIno', 'chainId']),
        theme() {
            return this.GetTheme();
        },
    },
    watch: {
        '$store.state.address': function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal);
                this.addressinit();
                this.initList();
            }
        },
        '$store.state.chainId': function (newVal, oldVal) {
            if (newVal) {
                this.changeChainId(newVal);
            }
        },
        screenWidth: {
            handler(val) {
                this.changeIsPC(val > 830);
                this.isPC = val > 830;
            },
            immediate: true,
        },
    },
    beforeMount() {
        this.$Ta.track({
            name: 'Web_Ino',
            data: {
                Source: 'browser',
                Page_Enter: '1',
            },
        });
    },
    mounted() {
        this.isloading = true;
        this.initList();
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
                this.viewAllFunc();
            })();
        };
        this.$nextTick(() => {
            // this.initSwiper();
            window.addEventListener('scroll', this.handleScroll);
        });
        window.onresize = () => {
            this.handleScroll();
        };
    },
    methods: {
        ...mapGetters(['GetTheme']),
        ...mapMutations(['changeAddress', 'changeChainId', 'changeWalletID', 'changeIno', 'changeIsPC']),
        mapObject(data) {
            if (Array.isArray(data) && data.length) {
                return true;
            } else if (Object.prototype.toString.call(data) === '[object Object]') {
                let list = [];
                Object.values(data).map(v => {
                    if (v) {
                        list.push(v);
                    }
                });
                return list.length > 0;
            } else {
                return false;
            }
        },
        successCopy(event, text) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            copy(text);
            event.stopPropagation();
            this.$message.success('Copied!');
        },
        toFixed(nums, decimal) {
            if (nums && decimal) {
                let num = Number(nums).toFixed(decimal);
                num = num.toString();
                if (num.indexOf('.') && !Number(num)) {
                    let num1 = num.split('.');
                    num = BigNumber(0.1).pow(num1[1].length);
                }
                // let num =nums.toString();
                //  num = num.substring(0,num.indexOf(".") + decimal)
                return Number(num);
            }
        },
        viewAll() {
            let doucumentList = this.$refs.more;
            let doucumentTetx = this.$refs.moreText;
            if (doucumentList && doucumentTetx) {
                this.viewAllFlag = true;
                doucumentList.childNodes[0].style = 'height:0px';
                doucumentList.childNodes[2].style = 'display:none';
                doucumentList.style = 'overflow:auto;display:inline-block;';
            }
        },
        viewAllFunc() {
            if (!this.isPC && !this.viewAllFlag) {
                this.$nextTick(() => {
                    let doucumentList = this.$refs.more;
                    let doucumentTetx = this.$refs.bottomtext;
                    if (doucumentList && doucumentTetx) {
                        let textview = doucumentTetx.clientHeight;
                        if (textview > 42) {
                            // doucumentList.style="word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;"
                            doucumentList.childNodes[0].style = 'height:21px';
                            doucumentList.childNodes[2].style = 'display:block';
                        } else {
                            // doucumentList.style=""
                            doucumentList.childNodes[0].style = 'height:0px';
                            doucumentList.childNodes[2].style = 'display:none';
                        }
                    }
                });
            }
        },
        downApp(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            window.open('https://bitkeep.com/download', '_blank');
        },
        viewHistory(event) {
            this.$Ta.track({
                name: 'Web_Ino',
                data: {
                    Action_Location_Name: 'INOdetail',
                    Action_Sub_Name: 'MintingRecord',
                },
            });
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            this.changeIno({ id: '', series: '', type: 'homePage' });
            localStorage.setItem('cast', 'old');
            const { ...query } = this.$route.query;
            const { language } = this.$route.params;
            this.$router.push({
                path: '/' + language + '/INO/INOHistory',
                query: query,
            });
        },
        async sendDeposit(txsData, signData) {
            let that = this;
            // 发送广播
            const { status, data } = await this.$api.INOApi.sendDeposit({ id: txsData.id, txs: signData });
            // const { status, data } = { "status": 0, data: { eerrMsg: '', status: 1 } }
            if (status == 0 && (data.status == 1 || data.status == 2)) {
                let time = null;
                time = setInterval(async () => {
                    // const { status, data } = {
                    //     "status": 0,
                    //     "data": {
                    //         "broadcast": 1
                    //     }
                    // }
                    // 1广播中 2 成功 3失败
                    const { status, data } = await this.$api.INOApi.checkInoStatus({ inoId: this.detailId, address: this.address });
                    if (status == 0 && data.broadcast == 2) {
                        localStorage.setItem('cast', 'new');
                        clearInterval(time);
                        that.castBtn = 'success';
                    } else if (status != 0 || data.broadcast == 3) {
                        clearInterval(time);
                        that.$message.warning(data);
                        that.castingShow = false;
                    }
                }, 3000);
            } else {
                this.$message.warning(data.errMsg);
            }
        },
        // async getbalance() {
        //     if (this.web3) {
        //         let balance = await wallet.getBalance()
        //         console.log( this.web3,'balancebalance')
        //         let value = this.web3.utils.fromWei(balance, 'ether')

        //         console.log(value,this.web3.utils.toDecimal(balance))
        //         return value
        //     }
        // },
        async cloaseCastNft(quantity) {
            this.castBtn = 'GetTXS';
            if (!this.address) {
                this.connectWallet('click');
                return;
            }
            // 点击铸造
            if (quantity.type == 'cast') {
                // let balance = await this.getbalance();
                if (this.address && quantity.castNums) {
                    let num = quantity.castNums;
                    let params = {
                        num,
                        id: this.detailId,
                        address: this.address,
                    };
                    // 获取txs
                    const { status, data } = await this.$api.INOApi.buildNftMintTxs(params);
                    this.castBtn = 'GetTXS';
                    if (status == 0 && data) {
                        let index = 0;
                        let list = data.txs;
                        let signData = [];
                        let that = this;
                        if (list[0].fee.balance < quantity.castNums * this.detailInfo.price) {
                            this.castBtn = 'nobalance';
                            return;
                        }
                        const test = async function test() {
                            if (index >= list.length) {
                                // 签名完成
                                that.sendDeposit(data, signData);
                                that.castBtn = 'start';
                                return;
                            }
                            let x = list[index++];
                            let result;
                            try {
                                //签名
                                result = await wallet.Sign(x);
                                signData.push({ ...x, sig: result });
                                // 上一次成功，才会发送下一次的请求
                                test();
                            } catch (error) {
                                that.castBtn = 'NotStarted';
                                that.$message.error(typeof error == 'object' ? error.message : error);
                            }
                        };
                        test();
                    } else {
                        this.$message.warning('获取数据失败');
                    }
                }
            } else {
                if (quantity.type == 'iknow') {
                    this.initList();
                }
                this.castBtn = 'NotStarted';
                this.castingShow = false;
            }
        },
        async switchChain() {
            try {
                wallet.switchChainId(this.chainIdList[this.detailInfo.chain], this.address, 'isBitKeep');
                const chainId = await wallet.getChainId(false);
                this.changeChainId(chainId);
            } catch (error) {
                this.$message.error(typeof error == 'object' ? error.message : error);
            }
        },
        init() {
            this.changeWalletID('');
            this.changeAddress('');
            this.changeChainId('');
        },
        async connectWallet(click) {
            // 是否有 bitkeep 处理
            if (!wallet.isInstall()) {
                if (click) {
                    this.InstalledShow = true;
                } else {
                    if (sessionStorage.getItem('bitkeep_installed') && sessionStorage.getItem('bitkeep_installed') == 'true') {
                        this.InstalledShow = false;
                    } else {
                        this.InstalledShow = true;
                    }
                }
                sessionStorage.setItem('bitkeep_installed', 'true');
                this.init();
                return false;
            }
            try {
                if (!wallet.selectedAddress('')) {
                    this.init();
                }
                const bitkeepaddress = await wallet.connect('bitkeep');
                this.switchChain();
                const chainId = await wallet.getChainId('isBitKeep');
                const [address] = await wallet.getAccounts('isBitKeep');
                const walletID = await wallet.getWalletID('isBitKeep');
                this.changeWalletID(walletID);
                this.changeAddress(address);
                this.changeChainId(chainId);
                localStorage.setItem('connectorId', 'injected');
                wallet.on('chainChanged', async () => {
                    chainId = await wallet.getChainId();
                    this.changeChainId(chainId);
                });
                wallet.on('accountsChanged', () => {
                    this.init();
                    this.connectWallet();
                });
            } catch (error) {
                this.init();
                this.$message.error(typeof error == 'object' ? error.message : error);
            }
        },
        async addressinit() {
            try {
                const [address] = await wallet.getAccounts('bitkeep');
                if (!address) {
                    this.init();
                    return false;
                }
                let chainId = await wallet.getChainId('bitkeep');
                const walletID = await wallet.getWalletID('bitkeep');
                this.changeWalletID(walletID);
                this.changeAddress(address);
                this.changeChainId(chainId);
                wallet.initEvent();
                wallet.on('chainChanged', async () => {
                    let chainId = await wallet.getChainId();
                    this.changeChainId(chainId);
                });
                wallet.on('accountsChanged', () => {
                    this.init();
                    this.addressinit();
                });
            } catch (error) {}
        },
        castingFunc() {
            if (!this.address) {
                this.connectWallet('click');
                return;
            }
            if (this.chainId !== this.chainIdList[this.detailInfo.chain]) {
                this.switchChain();
                return;
            }
            this.castingShow = true;
        },
        minting() {
            return false;
        },
        getWhitelist(event, url) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            if (!url) {
                return;
            }
            window.open(url, '_blank');
        },
        initList() {
            this.isloading = true;
            let a = this.inoDetail();
            let b = this.getInoEveryStatus();
            // this.isloading = false;
            // Promise.all([a]).then(res => {
            //     this.isloading = false;
            //     this.$nextTick(()=>{
            //         this.initSwiper();
            //     })
            //     if (!this.address) {
            //         this.$message.warning(this.$t('INO.linkWallet'));
            //     }
            // })
        },
        async inoDetail() {
            this.isloading = true;
            const { status, data } = await this.$api.INOApi.inoDetail({ id: this.$route.query.id, address: this.address, series: this.$route.query.series });
            if (status == 0) {
                if (data.list && !!data.list.length) {
                    data.list.map((item, index) => {
                        item.timeList = {
                            d: 0,
                            h: 0,
                            m: 0,
                            s: 0,
                            alreadyStarted: true,
                        };
                        this.getcountTime(index, item.startTime);
                    });
                    this.detailList = data;
                    this.detailId = data.list[0].id;
                    this.detailInfo = data.list[0];
                }
            } else {
                this.$message.warning(this.$t('INO.error'));
            }
            this.isloading = false;
            this.$nextTick(() => {
                this.initSwiper();
                this.viewAllFunc();
            });
            if (!this.address) {
                this.$message.warning(this.$t('INO.linkWallet'));
            }
        },
        async getInoEveryStatus(id) {
            const { status, data } = await this.$api.INOApi.getInoStatus({ inoId: id || this.$route.query.id, address: this.address });
            if (status == 0) {
                this.inoStatus = data;
            } else {
                this.$message.warning(this.$t('INO.error'));
            }
        },
        onCopy(e) {
            if (e) {
                this.copyFlag = true;
                setTimeout(() => {
                    this.copyFlag = false;
                }, 3000);
            }
        },
        getcountTime(ind, startTime) {
            if (!ind && !startTime) {
                return;
            }
            let timer = null;
            timer = setInterval(() => {
                var EndTime = new Date(startTime).getTime() / 1000; //开始时间
                var NowTime = new Date(); //当前时间
                var t = EndTime - (NowTime.getTime() / 1000).toFixed(0);
                if (t < 0) {
                    clearInterval(timer);
                    this.detailList.list[ind].timeList = {
                        d: '0',
                        h: '0',
                        m: '0',
                        s: '0',
                        alreadyStarted: true,
                    };
                    if (this.detailList.list[ind].id == this.detailInfo.id) {
                        this.detailInfo.timeList = {
                            d: '0',
                            h: '0',
                            m: '0',
                            s: '0',
                            alreadyStarted: true,
                        };
                    }
                    return;
                }
                // var t =(count/1000).toFixed(0);
                var d = Math.floor(t / 60 / 60 / 24); //天
                var h = Math.floor((t / 60 / 60) % 24); //时
                var m = Math.floor((t / 60) % 60); //分
                var s = Math.floor(t % 60); //秒
                this.detailList.list[ind].timeList = {
                    d,
                    h,
                    m,
                    s,
                    alreadyStarted: false,
                };
                if (this.detailList.list[ind].id == this.detailInfo.id) {
                    this.detailInfo.timeList = {
                        d,
                        h,
                        m,
                        s,
                        alreadyStarted: false,
                    };
                }
            }, 1000);
        },
        getdetailInfo(ind) {
            this.detailList &&
                this.detailList.list.map((v, index) => {
                    if (index == ind) {
                        this.detailInfo = v;
                        this.detailId = v.id;
                        this.getInoEveryStatus(v.id);
                        this.handleScroll();
                    }
                });
        },
        getSubStr(str) {
            if (!!str) {
                var subStr1 = str.substr(0, 6);
                var subStr2 = str.substr(str.length - 4, 4);
                var subStr = subStr1 + '...' + subStr2;
                return subStr;
            } else {
                return '';
            }
        },
        jump(event, url) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            window.open(url, '_blank');
        },
        handleScroll() {
            if (!this.isPC) {
                return;
            }
            let currentDom = document.querySelector('#inodetail');
            if (!!currentDom) {
                let left = document.querySelector('#inodetailImg').offsetLeft;

                let bottom = document.querySelector('.footer');
                let bottomHeight = bottom.getBoundingClientRect().top;
                let viewport = document.documentElement;
                let heightm = document.querySelector('.ino-detail-right').getBoundingClientRect().width - 40;
                if (currentDom.getBoundingClientRect().top <= 80 && bottomHeight + 150 >= viewport.clientHeight) {
                    this.$refs.inodetailImg.style = `position: fixed;top: 80px;left:${left}px; width:${heightm}px`;
                    this.$refs.detailRight.style = `height:${this.$refs.inodetailImg.getBoundingClientRect().height}px`;
                } else {
                    if (bottom.getBoundingClientRect().top < viewport.clientHeight) {
                        this.$refs.inodetailImg.style = '';
                    } else {
                        this.$refs.inodetailImg.style = '';
                    }
                }
            }
        },
        initSwiper() {
            let that = this;
            var gallerySwiper = new Swiper('#gallery', {
                spaceBetween: 10,
                observer: true,
                observeParents: false,
                on: {
                    slideChange: function () {
                        that.getdetailInfo(this.activeIndex);
                        // let currentDom = document.querySelector('#inodetail');
                        // let top = document.querySelector('.inodetatil-content-top')
                        // if(currentDom && top && top.getBoundingClientRect()){
                        //     console.log(top)
                        //     let topHeight = top.getBoundingClientRect().height;
                        //     window.scrollTo(0,topHeight+ 40);
                        // }
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    hideOnClick: true,
                },
                thumbs: {
                    swiper: {
                        el: '#thumbs',
                        spaceBetween: 10,
                        slidesPerView: 4,
                        watchSlidesVisibility: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        hideOnClick: true,
                    },
                    autoScrollOffset: 4,
                },
            });
        },
        closeInstalledShow(data) {
            this.InstalledShow = false;
            if (data) {
                this.AlreadyInstalledShow = true;
            }
        },
        closeAlreadystalledShow() {
            this.AlreadyInstalledShow = false;
        },
    },
    beforeDestroy() {
        //离开这个界面之后，删除滚动事件，不然容易除bug
        window.removeEventListener('scroll', this.handleScroll, true);
    },
};
</script>
<style lang="less">
.theme-light {
    .castingNums {
        .progress {
            .ant-progress-inner {
                background: #f2f2f5 !important;
            }
        }
    }
}

.theme-dark {
    .castingNums {
        .progress {
            .ant-progress-inner {
                background: #252529 !important;
            }
        }
    }
}
</style>
<style lang="less" scoped>
@media screen and (min-width: 1440px) {
    .detailbox {
        display: flex;
        justify-content: center;
    }
    .inodetatil-content {
        width: 100%;
        max-width: 1530px;
        .inodetatil-content-banner {
            width: 100%;
            max-width: 1530px;
        }
    }
}
@media screen and (max-width: 1440px) {
    .inodetatil-content {
        padding: 0 20px;
    }
}

@media screen and (max-width: 1220px) {
    .inodetatil-content {
        padding: 0 20px;
    }
    .inodetatil-content-banner {
        height: 220px !important;
        max-height: 220px !important;
        img {
            width: 100% !important;
            height: 220px !important;
        }
    }
}

@media screen and (max-width: 1020px) {
    .inodetatil-content {
        padding: 0 20px;
        .ino-detail-right {
            margin-right: 90px !important;
        }
    }
}

@media screen and (max-width: 981px) {
    .inodetatil-content {
        padding: 0 20px;
        .ino-detail-right {
            margin-right: 60px !important;
        }
    }
    .inodetatil-content-banner {
        height: 200px !important;
        max-height: 200px !important;
        img {
            width: 100% !important;
            height: 200px !important;
        }
    }
}

@media screen and (max-width: 820px) {
    .ino-detail {
        // padding: 0 20px;
        .ino-detail-right {
            // margin-right: 30px!important;
            max-width: 100%;
        }
    }
}

@media screen and (max-width: 766px) {
    .inodetatil-content {
        padding: 0 20px;
    }
    .inodetatil-content-banner {
        height: 180px !important;
        max-height: 180px !important;
        min-width: 100%;
        img {
            width: 100% !important;
            height: 180px !important;
        }
    }
}

@media screen and (max-width: 580px) {
    .inodetatil-content {
        padding: 0 20px;
    }
    .inodetatil-content-banner {
        height: 150px !important;
        max-height: 150px !important;
        min-width: 100%;
        img {
            width: 100% !important;
            height: 150px !important;
        }
    }
}

@media screen and (max-width: 450px) {
    .inodetatil-content {
        padding: 0 20px;
    }
    .inodetatil-content-banner {
        height: 100px !important;
        max-height: 100px !important;
        min-width: 100%;
        img {
            width: 100% !important;
            height: 100px !important;
        }
    }
}

.loadingBox {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.theme-light {
    .chainIcon {
        background: #f2f2f5;
        border-radius: 9px;
    }
    .roadMap-content {
        .ant-timeline {
            width: 100%;
            height: 100%;

            .ant-timeline-item {
                /deep/.ant-timeline-item-tail {
                    height: calc(100% - 20px);
                    top: 14px !important;
                    border-left: 2px solid #c7cbcb;
                }
            }
        }
    }

    .noWhiteList {
        .whiteUser {
            color: #ffffff;
            background: #c7cbcb;
        }
    }

    .detatilbuttonDisable {
        /deep/.ant-btn-primary {
            border: none;
            background: #e5e3e9 !important;
            color: #ffffff !important;
            border-radius: 6px;
        }
        .viewNft {
            background: #7524f9 !important;
            border: 1px solid #f2f2f5 !important;
            border-radius: 8px !important;
            color: #ffffff !important;
        }
    }

    .viewNft {
        background: #f8f8f9 !important;
        border: 1px solid #f2f2f5 !important;
        border-radius: 8px !important;
        color: #0e0e0e !important;
    }
    .ino-detail-small {
        .swiper-buttom-next-small {
            width: 32px;
            height: 32px;
            background: #ffffff;
            border: 1px solid #f2f2f5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_a4ec00f0-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            right: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }

        .swiper-buttom-prev-small {
            width: 32px;
            height: 32px;
            background: #ffffff;
            border: 1px solid #f2f2f5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_93bee0e0-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            left: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }
    }
    .ino-detail-right {
        .swiper-buttom-next-big {
            width: 32px;
            height: 32px;
            background: #ffffff;
            border: 1px solid #f2f2f5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_d3bfe1a0-ea25-11ec-8113-c94df49cd896.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            right: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }

        .swiper-buttom-prev-big {
            width: 32px;
            height: 32px;
            background: #ffffff;
            border: 1px solid #f2f2f5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            left: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }
    }
}

.theme-dark {
    .chainIcon {
        background: #17171a;
        border-radius: 9px;
    }

    .roadMap-content {
        .ant-timeline {
            width: 100%;
            height: 100%;

            .ant-timeline-item {
                /deep/.ant-timeline-item-head {
                    background-color: #17171a;
                }

                /deep/.ant-timeline-item-tail {
                    height: calc(100% - 20px);
                    top: 14px !important;
                    border-left: 2px solid #49494d;
                }
            }
        }
    }

    .noWhiteList {
        .whiteUser {
            color: #9e9da6;
            background: #49494d;
        }
    }

    .detatilbuttonDisable {
        .ant-btn-primary {
            border: none;
            background: #2e2d38 !important;
            color: #707076 !important;
            border-radius: 6px;
        }
    }

    .saleProgress {
        span {
            background: #252529 !important;

            span {
                background: linear-gradient(89.46deg, #ff01e6 3.56%, #fb45ff 54.56%, #9554ff 95.78%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                text-fill-color: transparent !important;
            }
        }
    }

    .viewNft {
        background: #202024 !important;
        border: 1px solid #252529 !important;
        border-radius: 8px !important;
        color: #e5e5e5 !important;
    }

    .ino-detail-small {
        .swiper-button-next {
            width: 32px;
            height: 32px;
            background: #17171a;
            border: 1px solid #252529;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_7d5ac300-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            right: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }

        .swiper-button-prev {
            width: 32px;
            height: 32px;
            background: #17171a;
            border: 1px solid #252529;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_6b59b120-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            left: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }
    }

    .ino-detail-right {
        .swiper-button-next {
            width: 32px;
            height: 32px;
            background: #2a292e;
            border: 1px solid #2a292e;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_2ec22160-fcd9-11ec-bc5d-11be1d4cf263.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            right: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }

        .swiper-button-prev {
            width: 32px;
            height: 32px;
            background: #2a292e;
            border: 1px solid #2a292e;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_0ef2f8f0-fcd9-11ec-bc5d-11be1d4cf263.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            left: -16px;
            top: 65px;

            &::after {
                content: none;
            }
        }
    }
}

.privilegeTag {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    display: inline-block;
    p {
        padding: 2px 5px;
        background: linear-gradient(90deg, rgba(156, 96, 255, 0.15) 3.76%, rgba(78, 191, 255, 0.15) 68.92%, rgba(9, 239, 189, 0.15) 100%);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            background: linear-gradient(90deg, #9c60ff 3.76%, #35b6ff 64.41%, #09efbd 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-weight: 600;
            font-size: 12px;
            line-height: 14px;
        }
    }
}
.hot-text {
    span {
        background: linear-gradient(89.8deg, #ff01e6 42.36%, #fb45ff 69.43%, #9554ff 96.02%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
}
.inodetatil-content-small {
    // padding: 0 20px;
    min-width: 375px;
    width: 100%;
    height: 100%;
    .inodetatil-content-top {
        padding: 0 20px;
    }
    .inodetatil-content-text {
        .inodetatil-content-img {
            width: 74px;
            height: 74px;
            margin-top: -45px;
            img:nth-child(1) {
                width: 70px;
                height: 70px;
            }
            .chainIcon {
                width: 20px;
                height: 20px;
            }
        }
        .inodetatil-content-text-title {
            font-size: 24px;
        }
        .writing {
            width: 100%;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            position: relative;
            .before {
                content: '';
                float: right;
                width: 0px;
            }

            .viewall {
                // font-family: none;
                float: right;
                clear: both;
                cursor: pointer;
                z-index: 999999;
            }
            .moreText {
                // font-family: none;
            }
            .bottomtext {
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
            }
        }
        .issuer {
            width: 335px;
            height: 72px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .issuer-text {
                margin-right: 0;
            }
            .issuer-img {
                &:nth-child(1) {
                    margin-left: 0px;
                }
            }
        }
    }
    .ino-detail-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 820px !important;
        min-width: 100%;
        .ino-detail-right {
            width: 100%;
            // max-width: 497px;
            margin: 0;
            margin-right: 0;
            padding: 0 20px;
            #gallery {
                // max-width: 497px;
                display: flex;
                justify-content: center;
                .swiper-wrapper {
                    // max-width: 497px;
                    .swiper-slide {
                        max-width: 100%;
                        img {
                            object-fit: cover;
                            vertical-align: inherit;
                        }
                    }
                }
            }
        }
        .ino-detail-left {
            margin-top: 30px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .ino-detail-price {
                padding: 0 20px;
            }
            li {
                padding: 0 20px;
            }
            .roadMap-content {
                li {
                    padding: 0 0 20px;
                }
            }
            .priceDeatil {
                img {
                    width: 30px;
                    height: 30px;
                }
                .chainPrice {
                    font-size: 24px;
                    flex: none;
                }
            }
        }
    }
    .bottomFixed {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid;
        z-index: 11;
        min-width: 375px;
        // height: 100%;
        .castStart {
            margin-top: 7px;
        }
        .castSuccess {
            margin-top: 7px;
        }
        .castError {
            margin-top: 7px;
        }
        .noWhiteList {
            margin-top: 7px;
        }
        .saleProgress {
            margin-top: 7px;
        }
        .WhiteList {
            margin-top: 7px;
        }
    }
    .btnFlex {
        .ant-btn {
            min-width: 180px;
            flex: 1;
            width: 100%;
            &:nth-child(1) {
                margin-right: 10px;
            }
        }
    }
}
.inodetatil-content {
    margin-top: 28px;
    // padding: 28px 195px 0;
}
// .contentBox{
//     display: flex;
//     justify-content: center;
// }

.inodetatil-content-banner {
    width: 100%;
    height: 200px;
    max-width: 100%;
    max-height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    display: flex;
    justify-content: center;

    img {
        width: 100%;
        height: 200px;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        vertical-align: inherit;
        border-radius: 10px;
    }
}

.inodetatil-content-text {
    display: flex;
    flex-direction: column;
    align-items: center;

    .inodetatil-content-img {
        width: 124px;
        height: 124px;
        position: relative;
        margin-top: -60px;
        border: 2px solid;
        border-radius: 60px;

        .chainIcon {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 28px;
            height: 28px;
        }

        img {
            width: 120px;
            height: 120px;
            border-radius: 60px;
        }
    }

    .inodetatil-content-text-title {
        font-weight: 700;
        font-size: 30px;
        margin-top: 10px;
        line-height: 36px;
        margin-top: 10px;
    }

    .inodetatil-content-text-hot {
        margin-top: 10px;
        display: flex;

        .hot-text {
            line-height: 28px;
            margin-right: 20px;
            font-size: 16px;
        }

        .inodetatil-content-text-hot-second {
            display: flex;
            align-items: center;
            // width: 143px;
            height: 28px;
            padding: 0px 8px 0px 4px;
            border-radius: 14px;
            line-height: 28px;
            text-align: center;
            font-size: 14px;
            border: 1px solid;
            box-sizing: content-box;

            .inodetatil-content-text-hot-Contract {
                flex: 1;
                width: 105px;
                display: inline-block;
            }

            img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                border-radius: 8px;
            }
        }
    }

    .writing {
        width: 495px;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        margin-top: 10px;
    }

    .writing-second {
        margin-top: 21px;
    }

    .issuer {
        margin-top: 20px;
        // width: 563px;
        height: 40px;
        border: 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        border-radius: 4px;

        .issuer-text {
            display: flex;
            align-items: center;

            span:nth-child(1) {
                font-size: 14px;
                margin-right: 8px;
            }

            span:nth-child(2) {
                line-height: 22px;
                text-align: center;
                width: 52px;
                height: 22px;
                font-size: 12px;
                background: rgba(64, 163, 255, 0.1);
                border-radius: 6px;
            }
        }
        .issuerimg-box {
            display: flex;
        }
        .issuer-img {
            display: flex;
            margin-right: 20px;
            &:nth-child(1) {
                margin-left: 40px;
            }

            img {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            &:nth-last-child(1) {
                margin-right: 0;
            }
        }
    }
}

.ino-detail {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    min-width: 820px;
}

.ino-detail-right {
    width: 497px;
    height: auto;
    // height: 497px;
    margin-bottom: 131px;
    margin-right: 149px;
    overflow: hidden;
    padding: 0 20px;

    #inodetailImg {
        width: 100%;
        // width: 497px;
        // height: 497px;
        height: auto;
        position: relative;
    }

    #gallery {
        width: 100%;
        height: auto;
        .swiper-slide {
            width: 100%;
            height: auto;
            max-width: 497px;
            max-height: 497px;
            border-radius: 10px;

            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 497px;
                border-radius: 10px;
            }
        }
    }

    #thumbs {
        margin-top: 10px;

        .swiper-slide {
            width: 100px !important;
            height: 100px;
            opacity: 0.5;
            border-radius: 6px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
            }
        }

        // .slideEvery {
        //     opacity: 0.5;
        // }

        // .slideActives {
        //     opacity: 0.5;
        // }

        .swiper-slide-thumb-active {
            opacity: 1;
        }
    }

    .thumbsBox {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
}

.ino-detail-left {
    width: 368px;

    .ino-detail-price {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 2px;
    }

    .priceDeatil {
        display: flex;
        height: 40px;
        align-items: center;

        img {
            width: 40px;
            height: 40px;
        }

        .chainPrice {
            font-weight: 600;
            font-size: 30px;
            margin: 0 6px 0 6px;
        }

        .doller {
            font-size: 18px;
        }
    }

    .castingNums {
        margin-top: 32px;

        .castingNums-text {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            font-size: 16px;
        }

        .progress {
        }
    }

    .information {
        margin-top: 30px;
        border-top: 1px solid;
        border-bottom: 1px solid;
        padding-bottom: 15px;

        p {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .information-text {
            height: 40px;
            font-weight: 600;
            font-size: 16px;

            span:nth-child(2) {
                display: flex;
                align-items: center;
                font-weight: 500;
                font-size: 14px;

                img {
                    width: 16px;
                    height: 16px;
                    margin-left: 10px;
                }
            }
        }

        .contract {
            font-weight: 500;
            font-size: 14px;
            height: 16px;
            display: flex;
            align-items: center;
            margin-top: 20px;

            span {
                display: flex;
                align-items: center;
            }

            img {
                width: 16px;
                height: 16px;
                margin-left: 4px;
                cursor: pointer;
            }
        }
    }

    .time {
        margin-top: 30px;
        display: flex;
        flex-direction: column;

        h6 {
            font-weight: 600;
            font-size: 16px;
        }

        .ino-countdown-text-time {
            margin-top: 10px;
            display: flex;

            .time-every {
                display: flex;
                flex-direction: column;
                margin-right: 10px;
                text-align: center;

                .time-every-num {
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                    line-height: 60px;
                    text-align: center;
                    border-radius: 5px;
                    border: 1px solid;
                }

                .time-every-min {
                    height: 20px;
                    line-height: 20px;
                    margin-top: 4px;
                    font-weight: normal !important;
                    font-family: none !important;
                }
            }
        }
    }

    .white {
        display: flex;
        justify-content: space-between;
    }

    .noWhiteList {
        height: 32px;
        margin-left: 13px;
        margin-top: 62px;
    }

    .WhiteList {
        height: 32px;
        margin-top: 62px;
        margin-left: 13px;

        .whiteUser {
            height: 22px;
            // width: 91px;
            background: rgba(28, 189, 181, 0.1);
            font-weight: 500;
            font-size: 14px;
            color: #1cbdb5;
            border-radius: 4px;
            padding: 0px 9px 0px 0px;
        }

        img {
            width: 26px;
            height: 26px;
            margin-left: -13px;
        }
    }

    .saleProgress {
        margin-top: 62px;
        height: 32px;
        font-weight: 600;
        font-size: 16px;
        padding: 1px;
        background: linear-gradient(89.46deg, #ff01e6 3.56%, #fb45ff 54.56%, #9554ff 95.78%);
        border-radius: 5px;

        // border-image-source:linear-gradient(89.46deg, #FF01E6 3.56%, #FB45FF 54.56%, #9554FF 95.78%);
        // border-image-slice: 1;
        span {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: #fff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                display: inline;
                padding: 4px 8px 4px 8px;
                background: linear-gradient(89.46deg, #ff01e6 3.56%, #fb45ff 54.56%, #9554ff 95.78%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent !important;
            }
        }
    }

    .castStart {
        padding: 4px 8px;
        height: 32px;
        background: rgba(64, 163, 255, 0.1);
        border: 1px solid #0075ff;
        border-radius: 4px;
        color: #0075ff;
        font-weight: 600;
        font-size: 16px;
        margin-top: 62px;
    }

    .castError {
        padding: 4px 8px;
        height: 32px;
        background: rgba(243, 100, 100, 0.1);
        border: 1px solid #f36464;
        border-radius: 4px;
        color: #f36464;
        font-weight: 600;
        font-size: 16px;
        margin-top: 62px;
    }

    .castSuccess {
        padding: 4px 8px;
        height: 32px;
        background: rgba(27, 200, 158, 0.1);
        border: 1px solid #1bc89e;
        border-radius: 4px;
        color: #1bc89e;
        font-weight: 600;
        font-size: 16px;
        margin-top: 62px;
    }

    .noWhiteList {
        height: 32px;
        margin-left: 13px;
        margin-top: 62px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 26px;
            height: 26px;
            margin-left: -13px;
        }

        .whiteUser {
            // width: 105px;
            height: 22px;
            font-weight: 500;
            font-size: 14px;
            border-radius: 4px;
            padding: 0px 9px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .detatilbutton {
        // width: 368px;
        height: 50px;
        margin-top: 17px;
        margin-bottom: 44px;

        .ant-btn-primary {
            width: 100%;
            height: 100%;
            font-weight: 600;
            font-size: 15px;
            border-radius: 6px;
        }
    }
    /deep/.upperlimit {
        span {
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .maxNums {
        overflow: hidden;
        white-space: break-spaces;
    }

    .btnFlex {
        display: flex;
        justify-content: space-between;

        .ant-btn {
            width: 180px;
        }
    }

    .nftintroduction {
        border-top: 1px solid;
        margin-top: 22px;
        font-weight: normal !important;

        .nftintroduction-title {
            line-height: 32px;
            font-weight: 600;
            font-size: 16px;
        }

        .nftintroduction-text {
            font-size: 14px;
            display: flex;
            flex-direction: column;
            font-weight: normal !important;
            font-family: none !important;
        }
    }

    .roadMap {
        border-top: 1px solid;
        margin-top: 20px;

        .roadMap-title {
            line-height: 32px;
            font-weight: 600;
            font-size: 16px;
        }

        .roadMap-content {
            margin-top: 10px;

            .ant-timeline {
                .ant-timeline-item {
                    /deep/.ant-timeline-item-content {
                        display: flex;
                        flex-direction: column;
                        font-size: 14px;
                        line-height: 18px;
                        // font-family: none;
                    }
                }
            }
        }
    }

    .WhitePrivilege {
        margin-top: 15px;
        border-bottom: none;

        .nftintroduction-title-second {
            margin-top: 24px;
        }
    }
}
</style>
