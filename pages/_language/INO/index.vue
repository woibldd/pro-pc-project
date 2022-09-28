<template>
    <div :class="isPC ? 'ino-content' : 'ino-content-small'">
        <navigation :navList='navList' :activitedIndex = '1'></navigation>
        <div :class="isPC ? 'inodefault' : 'inodefault-small inodefault '"  v-if="(!INOlist.topList.list || !INOlist.topList.list.length) && INOlist.banners">
          <div class="inodefault-box">
              <div class="inodefault-left">
                  <h1 class="inodefault-title text1" :title="INOlist.banners.title">{{INOlist.banners.title || 'BitKeep NFT INO'}}</h1>
                  <p class="inodefault-des text2">{{INOlist.banners.content || 'Gain early access to tokens from promising projects'}}</p>
                  <div class="inodefault-quantity" v-if="INOlist.banners.bannerTitles &&INOlist.banners.bannerTitles.length">
                      <p class="inodefault-quantity-every" v-for=" (item,index) in INOlist.banners.bannerTitles" :key="index">
                          <span class="inodefault-quantity-nums text1"> {{item.value}} </span>
                          <span class="inodefault-quantity-text text3">{{item.title}}</span>
                      </p>
                  </div>
              </div>
              <div class="inodefault-right">
                  <div class="inodefault-background"></div>
                  <img :src="INOlist.banners.iconList[0]" class="bannerimg" alt="defaultr img"/>
                  <!-- <div class="inodefault-right-box">
                      <div class="swiper-container swiperOne" id="swiperOne">
                          <div class="swiper-wrapper  swiper-no-swiping">
                              <div class="swiper-slide" v-for="(item,index) in INOlist.banners.oneArray" :key="index">
                                  <p>
                                      <img :src="item" alt="Series Avatar"/>
                                  </p>
                              </div>
                          </div>
                      </div>
                          <div class="swiper-container swiperOne swiperTwo" id="swiperOne" style="transform: rotate(180deg)">
                          <div class="swiper-wrapper swiper-no-swiping">
                              <div class="swiper-slide" v-for="(item,index) in INOlist.banners.secondArray" :key="index">
                                  <p>
                                      <img :src="item" alt="Series Avatar" style="transform: rotate(180deg)"/>
                                  </p >
                              </div>
                          </div>
                      </div>
  
  
                      <div class="swiper-container swiperOne" id="swiperthree">
                          <div class="swiper-wrapper swiper-no-swiping">
                              <div class="swiper-slide" v-for="(item,index) in INOlist.banners.thirdArray" :key="index">
                                  <p>
                                      <img :src="item" alt="Series Avatar"/>
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div> -->
              </div>
          </div>
        </div>
        <!-- 倒计时或者已开始 -->
        <div  :class="isPC ? ' ino-countdown countdownBox' :  'ino-countdown-small countdownBox'"  v-if="INOlist.topList.list && INOlist.topList.list.length">
            <div class="slide-every">
                <ul class="ino-countdown-text" v-if="topInfo">
                    <li> <h6 :title="topInfo.projectName"  class="ino-countdown-text-title text1">{{ topInfo.projectName }}</h6></li>
                    <li v-if="topInfo && topInfo.privilegeTag" class="privilegeTag"><p> <span>{{topInfo.privilegeTag}}</span></p></li>
                    <li class="ino-countdown-text-hot">
                        <p class="hot-text">🔥<span>{{ topInfo.hotNum }}</span></p>
                        <!-- <p :class="!copyFlag ? 'ino-countdown-text-hot-second BG1 text2 lineBG2' : 'ino-countdown-text-hot-second BG0 text2 lineBG2'"
                           @click="onCopy($event,topInfo.nftContract)">
                            <img
                                :src="chainList && chainList[topInfo.chain] ? chainList[topInfo.chain].icon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'" :alt="topInfo && topInfo.chain" />
                            <span v-if="!copyFlag"> {{ getSubStr(topInfo.nftContract) }}</span>
                            <span v-if="copyFlag"> Copied!</span>
                        </p> -->
                    </li>
                    <li class="ino-countdown-text-divrice"><span class="text1" :title="$t('INO.castPrirce')">{{$t('INO.castPrirce')}} {{ topInfo.price }}
                            {{ topInfo.priceCoinName }}</span><span class="BG3"></span><span class="text1" :title="$t('INO.castTotal')">{{$t('INO.castTotal')}}
                            {{ topInfo.allTotalMinted }} </span></li>
                    <li class="ino-countdown-text-des text2" >
                        <div ref="more">
                            <p class="before"></p>
                            <p  ref="viewall">
                                <a :href='"/" +  $route.params.language + "/INO/INODetatil"' class="viewall text1" title="查看详情" @click="viewdDeatil($event,topInfo,'ComingSoon')"> View All</a>
                            </p>
                            <p  ref="moreText" class="moreText" :title="topInfo.publisherDesc">{{ topInfo.publisherDesc }}</p>
                            <p class="bottomtext" ref="bottomtext"> {{ topInfo.publisherDesc }}</p>
                        </div>
                    </li>
                    <li class="ino-countdown-text-issuer"><img :src="topInfo.publisherPic" class="issuerAvag" alt="publisherPic"/><span
                            class="text2">{{
                                    topInfo.publisher
                            }}</span><span class="text5">{{$t('INO.publish')}}</span></li>
                    <li v-if="topInfo.countDown == 0 || !!topInfo.timeList.alreadyStarted">
                        <p class="ino-countdown-text-soonDown text1">{{$t('INO.soonDown')}}</p>
                        <p >
                        <a :href='"/" +  $route.params.language + "/INO/INODetatil"' :class=" !isPC ? ' ino-countdown-text-viewDetail-small' : 'ino-countdown-text-viewDetail'"  title="查看详情" @click="viewdDeatil($event,topInfo,'ComingSoon')"> {{$t('INO.viewdDeatil')}}</a>
                        </p>
                    </li>
                    <li class="ino-countdown-text-soon text1"
                        v-if="topInfo.countDown > 0 && !topInfo.timeList.alreadyStarted">
                        {{$t('INO.soon')}}</li>
                    <li class="ino-countdown-text-time"
                        v-if="topInfo.countDown > 0 && !topInfo.timeList.alreadyStarted">
                        <p class="time-every">
                            <span class="time-every-num BG1 text1 lineBG2">{{ Number(topInfo.timeList.d)< 10 ? '0' + topInfo.timeList.d : topInfo.timeList.d }}</span>
                            <span class="time-every-min text2">D A Y S</span>
                        </p>
                        <p class="time-every">
                            <span class="time-every-num BG1 text1 lineBG2">{{  Number(topInfo.timeList.h)< 10 ? '0' + topInfo.timeList.h : topInfo.timeList.h }}</span>
                            <span class="time-every-min text2">H R S</span>
                        </p>
                        <p class="time-every">
                            <span class="time-every-num BG1 text1 lineBG2">{{ Number(topInfo.timeList.m)< 10 ? '0' + topInfo.timeList.m : topInfo.timeList.m }}</span>
                            <span class="time-every-min text2">M I N</span>
                        </p>
                        <p class="time-every">
                            <span class="time-every-num BG1 text1 lineBG2">{{  Number(topInfo.timeList.s)< 10 ? '0' + topInfo.timeList.s : topInfo.timeList.s }}</span>
                            <span class="time-every-min text2">S E C</span>
                        </p>
                    </li>
                    <li  v-if="topInfo.countDown > 0 && !topInfo.timeList.alreadyStarted">
                        <p >
                            <a :href='"/" +  $route.params.language + "/INO/INODetatil"' :class=" !isPC ? ' ino-countdown-text-viewDetail-small countdownBtn' : 'ino-countdown-text-viewDetail countdownBtn'"  title="查看详情" @click="viewdDeatil($event,topInfo,'ComingSoon')"> {{$t('INO.viewdDeatil')}}</a>
                        </p>
                    </li>
                </ul>
                <div class="ino-countdown-imgBox">
                    <img v-show="!isPC && topInfo && topInfo.pcBanner !='' && topInfo.pcBannerFlag" class="bottomimg" :src="topInfo.pcBanner" alt="nft banner"  />
                    <div class="ino-countdown-img" @click="viewdDeatil($event,topInfo,'ComingSoon')">
                        <div class="swiper-container swiper-containerBox">
                            <div :class="isPC? 'swiper-wrapper swiper-no-swiping' : 'swiper-wrapper'">
                                <div class="swiper-slide swiperSlide" v-for="(item) in INOlist.topList.list" :id="item.id" :data-swiper-slide-index="item.id"  :key="item.id">
                                    <img :src="item.pcBanner" alt="nft banner" class="banner"  :id="item.id"   />
                                    <img class="bottomimg" v-show="isPC" :src="item.pcBanner" alt="nft banner" :id="item.id"   />
                                </div>
                            </div>
                            <div class="swiper-pagination swiper-pagination-btn" v-if="INOlist.topList.list.length > 1"></div>
                        </div>
                        <div class="swiper-pagination swiper-pagination-btn" v-if="INOlist.topList.list.length > 1"></div>
                    </div>
                </div>
            </div>
            <div class="swiper-button-next swiper-button-nextBox" v-if="INOlist.topList.list.length > 1"></div>
            <div class="swiper-button-prev swiper-button-prevBox" v-if="INOlist.topList.list.length > 1"></div>
        </div>
        <!-- 活动预告 -->
        <div :class=" isPC ? 'ino-eventPreview  BG1' : ' BG1 ino-eventPreview-small'" v-if="INOlist.foreList.list && INOlist.foreList.list.length >= 1">
            <h1 class="ino-eventPreview-title text1" :title="INOlist.foreList.title">{{ INOlist.foreList.title }}</h1>
            <ul class="ino-eventPreview-list">
                <li  v-for="(item, index) in INOlist.foreList.list"
                    :key='index' >
                     <a :href='"/" +  $route.params.language + "/INO/INODetatil"' class="ino-eventPreview-every text1  BG0 lineBG2" title="查看详情" @click="viewdDeatil($event,item,'Getitnow')"> 
                        <p class="ino-eventPreview-every-img"  >
                            <img :src="item.banner" :alt="INOlist.foreList.title + 'banner'"/>
                        </p>
                        <div class="ino-eventPreview-every-bottom">
                            <p class="ino-eventPreview-every-head BG0">
                                <span>
                                    <img :src="item.publisherPic" class="BG0 headPortrait" alt='publisher'/>
                                    <img class="chainIcon"
                                        :src="chainList && chainList[item.chain] ? chainList[item.chain].grayIcon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'" :alt="item && item.chain"/>
                                </span>
                                <span class="text1">{{ item.projectName }}</span>
                                <span class="hot-text">🔥<span>{{ item.hotNum }}</span></span>
                            </p>
                            <p class="ino-eventPreview-every-text text3">{{ item.publisherDesc }}</p>
                            <p class="ino-eventPreview-every-time text1">{{$t('INO.launchtime')}} {{ item.startTime.split('T')[0] }}</p>
                        </div>
                     </a>
                </li>
            </ul>
        </div>
        <!-- 历史活动 -->
        <div :class=" isPC ? 'ino-history' : 'ino-history ino-history-small'" v-if="INOlist.endList.list && INOlist.endList.list.length >= 1">
            <h1 class="ino-history-title text1"  :title="INOlist.endList.title">{{ INOlist.endList.title }}</h1>
            <div :class="(INOlist.endList.list.length < 4 && screenWidth >= 1200 ) || (INOlist.endList.list.length < 2 && screenWidth < 1200) ? 'ino-history-content ino-history-contentFlex' : 'ino-history-content' ">
                <div class="swiper-container swiper-containerHistory">
                    <div class="swiper-wrapper swiper-no-swiping">
                        <div class="swiper-slide lineBG2" v-for="(item, index) in INOlist.endList.list" :key="index">
                             <a :href='"/" +  $route.params.language + "/INO/INODetatil"' class="ino-eventPreview-every text1  BG0 lineBG2" title="查看详情" @click="viewdDeatil($event,item,'SoldOut')"> 
                                <p class="ino-history-content-img" :title="INOlist.endList.title + 'banner'" :style="{
                                'background-image': `url(${item.banner})`,
                            }">
                                <!-- <img :src="item.banner" alt="历史活动 banner"/> -->
                                </p>
                                <div class="ino-history-content-bottom">
                                    <p class="ino-history-content-head BG0">
                                        <span>
                                            <img :src="item.publisherPic" class="BG0 headPortrait" alt="publisher" />
                                            <img class="chainIcon"
                                                :src="chainList && chainList[item.chain] ? chainList[item.chain].grayIcon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'" :alt="item &&item.chain" />
                                        </span>
                                    </p>
                                    <p class="ino-history-content-text text1">{{ item.projectName }}</p>
                                    <p class="ino-history-content-price"><span class="text3">Floor Price</span><span
                                            class="text1">
                                            <img class="chainIcon blackIcon"
                                                :src="chainList && chainList[item.chain]?(theme == 'dark' ?  chainList[item.chain].blcakIcon : chainList[item.chain].lightIcon) : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'"  :alt="item && item.chain"/>
                                            {{
                                                    item.price
                                            }}</span>
                                    </p>
                                </div>
                             </a>
                        </div>
                    </div>
                </div>
                <div :class=" isPC?'swiper-button-next swiper-button-next-big swiper-button-nexthistory' : 'swiper-button-next swiper-button-next-small swiper-button-nexthistory'" v-show="changeNav()" ></div>
                <div :class="isPC ?'swiper-button-prev swiper-button-prev-big swiper-button-prevhistory' : 'swiper-button-prev swiper-button-prev-small swiper-button-prevhistory'" v-show="changeNav()" ></div>
            </div>
        </div>
        <client-only>
            <div v-if="WalletID">
                <a :href='"/" +  $route.params.language + "/INO/INOHistory"' class="ino-order" title="查看铸造记录" @click="goHistory($event)">
                    <img :src="theme == 'dark' ? 'https://cdn.bitkeep.vip/u_b_e59f9060-f67c-11ec-8f33-753efcf3be7f.png' :  'https://cdn.bitkeep.vip/u_b_18cc5d50-eb20-11ec-97bb-e59e4c91aec8.png'" alt="order" />
                    <span v-if="neworder && neworder === 'new'" class="littleDot"></span>
                </a>
            </div>
        </client-only>
    </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import {mapState, mapMutations ,mapGetters} from "vuex";
import Vue from 'vue';
import { wallet } from '@/utils/wallet'
import copy from "copy-to-clipboard";;
import navigation from "@/components/navigation";

if (process.browser) {
  const VueAnimateNumber = require("vue-animate-number");
  Vue.use(VueAnimateNumber);
}
export default {
    layout: 'INO/default',
    name: 'INOPage',
    scrollToTop: true,
    async asyncData(app) {
        let topInfo={};
        let  swiperActiveIndex = 0;
        const { status, data } = await app.$api.INOApi.getINOlist();
        if (status == 0) {
            if (data.topList && !!data.topList.list) {
                topInfo = data.topList.list[0];
                swiperActiveIndex = data.topList.list[0] ? data.topList.list[0].id : '';
                if(topInfo && topInfo.pcBanner){
                    topInfo.pcBannerFlag = true;
                }
                data.topList.list.map(item => {
                    item.pcBannerFlag = true
                    item.timeList = {
                        d: '0',
                        h: '0',
                        m: '0',
                        s: '0',
                        alreadyStarted: false
                    }
                })
            }
            if(data.banners && data.banners.iconList){
                data.banners.oneArray =[];
                data.banners.secondArray =[];
                data.banners.thirdArray =[];
                data.banners.iconList.map((v,index)=>{
                    if(index < 10){
                        data.banners.oneArray.push(v)
                    }
                    if(index >= 10 && index< 20){
                        data.banners.secondArray.push(v)
                    }
                    if(index >= 20 && index < 30){
                        data.banners.thirdArray.push(v)
                    }
                })
            }
            if(data.foreList && data.foreList.list &&  data.foreList.list.length >3){
                data.foreList.list = data.foreList.list.slice(0,3);
            }
        }
        return {
            INOlist: status == 0? data : { endList: { list: [], tittle: '' }, foreList: { list: [], tittle: '' }, topList: { list: [], tittle: '' },banners:{oneArray:[],secondArray:[],thirdArray:[],} },   
            topInfo:  topInfo,
            swiperActiveIndex,
        }
    },
    components: {
      navigation  
    },
    data() {
        return {
            swiperSlides: [1, 2, 3, 4, 5],
            navList:[{
                id: '1',
                name:'Free Mints',
                link: `/${this.$route.params.language}/nft/freeMint`,
                activited: '0',
            },{
                id: '2',
                name:'INO',
                link: `/${this.$route.params.language}/INO`,
                activited: '1',
            }],
            INOlist: {
                endList: { list: [], tittle: '' },
                foreList: { list: [], tittle: '' },
                topList: { list: [], tittle: '' },
            },
            chainList:{"eth": {
        "chain": "eth",
        "title": "Ethereum",
        "icon": "https://cdn.bitkeep.vip/u_b_bae388c0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_ab472ff0-f072-11ec-84d2-0337bae4f47b.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e4a321d0-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_4ed2edc0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "bnb": {
        "chain": "bnb",
        "title": "BSC",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4ec2d1-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0e7fe210-f073-11ec-82d1-45df45b47e59.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e2662a20-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_4a3549c0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "matic": {
        "chain": "matic",
        "title": "Polygon",
        "explorer": "https://polygonscan.com/",
        "icon": "https://cdn.bitkeep.vip/u_b_bbb29890-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_190165b0-f073-11ec-878d-dd4f1d6d4d8d.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_e77888f0-031b-11ed-ad3b-25d60e820fbb.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_5210dab0-031b-11ed-ad3b-25d60e820fbb.png'
    },
    "sol": {
        "chain": "sol",
        "title": "Solana",
        "icon": "https://cdn.bitkeep.vip/u_b_bbb3aa00-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_2ae46840-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "ftm": {
        "chain": "ftm",
        "title": "Fantom",
        "icon": "https://cdn.bitkeep.vip/u_b_baeb50f0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_40a95ff0-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "avax_c": {
        "chain": "avax_c",
        "title": "AVAX-C",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4e4da0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_4cd7f750-f073-11ec-b752-4545d7d7a6c5.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "arbitrum": {
        "chain": "arbitrum",
        "title": "Arbitrum",
        "icon": "https://cdn.bitkeep.vip/u_b_ba4ee9e0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_5ac4e080-f073-11ec-ab28-2dacbd127ae1.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "kcs": {
        "chain": "kcs",
        "title": "KCC",
        "icon": "https://cdn.bitkeep.vip/u_b_661aabb0-a693-11ec-9bb2-d529ee665d4d.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_72d74aa0-f073-11ec-b59b-cb8601612437.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "ht": {
        "chain": "ht",
        "title": "Heco",
        "icon": "https://cdn.bitkeep.vip/u_b_bb0b5c10-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_835761d0-f073-11ec-b59b-cb8601612437.png",
        'blcakIcon':'https://cdn.bitkeep.vip/u_b_5d734be0-0762-11ed-8cdd-45359e3c45df.png',
        'lightIcon':'https://cdn.bitkeep.vip/u_b_50485320-0762-11ed-8cdd-45359e3c45df.png'
    },
    "okt": {
        "chain": "okt",
        "title": "OKX Chain",
        "icon": "https://cdn.bitkeep.vip/u_b_bb808c10-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_94d62450-f073-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "trx": {
        "chain": "trx",
        "title": "Tron",
        "icon": "https://cdn.bitkeep.vip/u_b_bbdaba00-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_a69a7b50-f073-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "fuse": {
        "chain": "fuse",
        "title": "Fuse",
        "icon": "https://cdn.bitkeep.vip/u_b_bafc19d0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0419e040-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "one": {
        "chain": "one",
        "title": "Harmony",
        "icon": "https://cdn.bitkeep.vip/u_b_5c054600-9acf-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_d106ac60-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "boba": {
        "chain": "boba",
        "title": "BOBA",
        "icon": "https://cdn.bitkeep.vip/u_b_52f98720-bb08-11ec-9b6d-d799ca9b85ca.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_25281860-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "klay": {
        "chain": "klay",
        "title": "KLAY",
        "icon": "https://cdn.bitkeep.vip/u_b_bb3c3010-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_3390c140-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "optimism": {
        "chain": "optimism",
        "title": "Optimism",
        "icon": "https://cdn.bitkeep.vip/u_b_bb999250-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_3b761630-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "kai": {
        "chain": "kai",
        "title": "KardiaChain",
        "icon": "https://cdn.bitkeep.vip/u_b_42900030-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_deaaccc0-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "eos": {
        "chain": "eos",
        "title": "EOS",
        "icon": "https://cdn.bitkeep.vip/u_b_bab796c0-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_5cae6b90-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "wax": {
        "chain": "wax",
        "title": "WAX",
        "icon": "https://cdn.bitkeep.vip/u_b_bbfb1340-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_69539280-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "near": {
        "chain": "near",
        "title": "NEAR",
        "icon": "https://cdn.bitkeep.vip/u_b_bb6a9310-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_73d34160-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "iost": {
        "chain": "iost",
        "title": "IOST",
        "icon": "https://cdn.bitkeep.vip/u_b_bb2ec290-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_e7f41e80-f078-11ec-b13a-6df09a64a418.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "luna": {
        "chain": "luna",
        "title": "Terra",
        "icon": "https://cdn.bitkeep.vip/u_b_bbca8d60-9afd-11ec-aac8-bf8a172584ab.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_a2335b30-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "czz": {
        "chain": "czz",
        "title": "ClassZZ",
        "icon": "https://cdn.bitkeep.vip/u_b_11664430-a810-11eb-9f5e-d184ba33d3a3.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_bf7cc320-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "cmp": {
        "chain": "cmp",
        "title": "Caduceus",
        "icon": "https://cdn.bitkeep.vip/u_b_6f4023e0-c4b2-11ec-aa57-411cc0b3f4cb.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_b7a550e0-f074-11ec-86b4-53e272e03a61.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "true": {
        "chain": "true",
        "title": "TRUE",
        "icon": "http://cdn.bitkeep.vip/u_b_802aefa0-a811-11eb-9f5e-d184ba33d3a3.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_b8581870-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "vlx": {
        "chain": "vlx",
        "title": "Velas",
        "icon": "https://cdn.bitkeep.vip/u_b_4427cf90-69f0-11ec-9d26-85f1b63f7fbd.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_d2ad94c0-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "celo": {
        "chain": "celo",
        "title": "CELO",
        "icon": "https://cdn.bitkeep.vip/u_b_4f8a0620-e8ab-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_4d852420-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "crol2": {
        "chain": "crol2",
        "title": "Cronos",
        "icon": "https://cdn.bitkeep.vip/u_b_181780d0-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_60fef350-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "bch": {
        "chain": "bch",
        "title": "smartBCH",
        "icon": "https://cdn.bitkeep.vip/u_b_b4efbf80-e8ad-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "",
        'blcakIcon':'',
        'lightIcon':''
    },
    "xdai": {
        "chain": "xdai",
        "title": "xDAI",
        "icon": "https://cdn.bitkeep.vip/u_b_07682f10-e8ac-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_0ed1cf80-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "vs": {
        "chain": "vs",
        "title": "Vision",
        "icon": "https://cdn.bitkeep.vip/u_b_6245d440-dd6d-11ec-a0b5-f7bd232e861e.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_f80504c0-f21b-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    },
    "cube": {
        "chain": "cube",
        "title": "CUBE",
        "icon": "https://cdn.bitkeep.vip/u_b_53c39ee0-e8b0-11ec-8e86-53798d1a9b70.png",
        "grayIcon": "https://cdn.bitkeep.vip/u_b_77e5fcd0-f21c-11ec-9ebd-dbf9091edbd7.png",
        'blcakIcon':'',
        'lightIcon':''
    }
},
            copyFlag: false,
            swiperBox:'',
            swiperHistory:'',
            neworder:'',
            screenWidth:'831',
            isPC:this.$store.state.isPC,
            swiperActiveIndex:0,
        }
    },
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('INO.shareTitle'),
            meta: [
                { name: 'keywords', content:this.$t('INO.shareDes') },
                { name: 'description', content:this.$t('INO.shareDes') },
                { name: 'title', content:this.$t('INO.shareDes') },
                { name: 'og:title', content:this.$t('INO.shareDes') },
                { name: 'og:description', content:this.$t('INO.shareDes') },
                { name: 'twitter:title', content:this.$t('INO.shareDes') },
                { name: 'twitter:description', content:this.$t('INO.shareDes') },
                { name:'twitter:card', content: "summary_large_image"},
                { name:'twitter:site', content: "BitKeep"},
                { name:'og:type', content: "website"},
                { name:'og:site_name', content: "BitKeep"},
                { hid:'og:image:src', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : ''  },
                { hid:'og:image', content: this.INOlist.topList && this.INOlist.topList.list.length ? this.INOlist.topList.list[0].banner : ''  },
                {hid:'og:image:alt', name: 'og:image:alt', content:'BitKeep, a Best Crpto Wallet' },
                {hid:'twitter:image', name: 'twitter:image', content:this.INOlist.topList.list &&this.INOlist.topList.list.length ?this.INOlist.topList.list[0].banner : ''  },
                {hid:'twitter:image:src', name: 'twitter:image:src', content:this.INOlist.topList.list &&this.INOlist.topList.list.length ?this.INOlist.topList.list[0].banner : ''  },
                {hid:'twitter:image:alt', name: 'twitter:image:alt', content:'BitKeep, a Best Crpto Wallet' },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep.com/${language}/INO` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/INO` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/INO` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/INO` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/INO` },
            ]
        }
    },
    watch: {
        "$store.state.address": function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal)
            }
        },
         "$store.state.chainId": function (newVal, oldVal) {
            if (newVal) {
                this.changeChainId(newVal)
            }
        },
        "$store.state.WalletID": function (newVal, oldVal) {
            if (newVal) {
                this.changeWalletID(newVal)
            }
        },
        screenWidth: {
          handler(val) {
              this.changeIsPC(val > 830)
              this.isPC =  val > 830;
              this.changeNav()
          },
          immediate: true
        },
    },
    computed: {
        ...mapState(["address","chainId",'WalletID']),
        theme(){
            return this.GetTheme()
        }
    },
    beforeMount(){
        // window.biteep_Ta.track('Web_Ino',{
        //      Source:"browser",
        //     Page_Enter: "1"
        // })
        this.$Ta.track( {
            name:"Web_Ino",
            data:{
                Source:"browser",
                Page_Enter: "1"
            }
        }
        )
    },
    mounted() {
        // this.getlist()
        this.screenWidth = document.body.clientWidth;
        this.neworder =  localStorage.getItem('cast');
        this.$nextTick(() => {
            this.screenWidth = document.body.clientWidth;
            this.changeIno({id:'',series:'',type:'homePage'})
            this.initswiper()
            this.INOlist.topList.list.forEach((item, index) => {
                this.getcountTime(index, item.startTime)
            });
            this.viewAllFunc()
            this.changeSwiperHeight();
            window.onresize = () => {
                this.viewAllFunc()
                this.changeSwiperHeight();
                this.screenWidth = document.body.clientWidth;
                // this.initswiper()
            }
        })
    },
    methods: {
        ...mapGetters(['GetTheme']),
        ...mapMutations(['changeIno','changeAddress', 'changeChainId', 'changeWalletID','changeIsPC']),
        transfer16(val = 0) {
            val = isNaN(Number(val)) ? 1 : Number(val);
            return "0x" + val.toString(16);
        },
        viewAllFunc() {
            this.$nextTick(()=>{
                let doucumentList = this.$refs.more;
                let doucumentTetx = this.$refs.bottomtext;
                if (doucumentList && doucumentTetx) {
                    let textview = doucumentTetx.clientHeight;
                        if (textview > 72) {
                            doucumentList.childNodes[0].style = "height:48px;";
                            doucumentList.childNodes[2].style = "display:block";
                        } else {
                            doucumentList.childNodes[0].style = "height:0px";
                            doucumentList.childNodes[2].style = "display:none";
                        }
                }
            })
        },
        onCopy (event,text) {
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            copy(text);
            event.stopPropagation();
            this.copyFlag = true;
            setTimeout(() => {
                this.copyFlag = false;
            }, 3000);
        },
        getSubStr(str) {
            if (str) {
                var subStr1 = str.substr(0, 6);
                var subStr2 = str.substr(str.length - 4, 4);
                var subStr = subStr1 + "..." + subStr2;
                return subStr;
            } else {
                return ''
            }
        },
        getcountTime(ind, startTime) {
            let timer = null;
            timer = setInterval(() => {
                var EndTime = new Date(startTime).getTime() / 1000//开始时间
                var NowTime = new Date();//当前时间
                var t = EndTime - (NowTime.getTime() / 1000).toFixed(0);
                if (t < 0) {
                    clearInterval(timer)
                    this.INOlist.topList.list[ind].timeList = {
                        d: '0',
                        h: '0',
                        m: '0',
                        s: '0',
                        alreadyStarted: true
                    }
                    return;
                }
                // var t =(count/1000).toFixed(0);
                var d = Math.floor(t / 60 / 60 / 24);//天 
                var h = Math.floor(t / 60 / 60 % 24);//时
                var m = Math.floor(t / 60 % 60);//分
                var s = Math.floor(t % 60);//秒 
                this.INOlist.topList.list[ind].timeList = {
                    d, h, m, s, alreadyStarted: false
                }
            }, 1000)
        },
        getlist() {
            let { status, data } = this.$api.INOApi.getINOlist()
            if (status == 0) {
                if (data.topList && !!data.topList.list) {
                    data.topList.list.map(item => {
                        item.timeList = {
                            d: 0,
                            h: 0,
                            m: 0,
                            s: 0,
                            alreadyStarted: false
                        }
                    })
                }
            }
        },
        changeNav(){
            let flag = false;
            if(this.screenWidth >= 1200 && this.INOlist.endList &&  this.INOlist.endList.list.length >=4){
                flag=true
            }else if(this.screenWidth < 1200 && this.INOlist.endList &&  this.INOlist.endList.list.length >=2){
                flag=true
            }
            return flag
        },
        changeSwiperHeight(){
            const slides = [...document.querySelectorAll('.swiperSlide')];
            if(slides){
                slides.map(v=>{
                    let id = v.getAttribute('id')
                    if(id == this.swiperActiveIndex){
                        v.style.height ='auto'
                    }else{
                        v.style.height = 0;
                    }
                })
            }
        },
        initswiper() {
            this.swiperHistory = new Swiper(".swiper-containerHistory",{
                // loop: true,
                // loopedSlides: 'auto',
                slidesPerview:'auto',
                navigation: {
                    nextEl: ".swiper-button-nexthistory",
                    prevEl: ".swiper-button-prevhistory"
                },
                preventClicksPropagation : false,
                breakpoints: {
                    320: {  //当屏幕宽度大于等于320
                        slidesPerView: 1.2,
                        spaceBetween: 20
                    },
                    820: {  //当屏幕宽度大于等于820
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1200: {  //当屏幕宽度大于等于1200
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                },
                spaceBetween: 10,
            })
            // 820:2,1200:3,1530:4
            let that = this;
            this.swiperBox = new Swiper(".swiper-containerBox", {
                on: {
                    slideChange: function () {
                        that.swiperActiveIndex = this.realIndex
                        if(that.INOlist && that.INOlist.topList && that.INOlist.topList.list){
                            that.INOlist.topList.list.map(v=>{
                                if(v.id == this.realIndex){
                                    that.topInfo = v;
                                    // that.topInfo.pcBannerFlag = true;
                                }
                            })
                        }
                        that.changeSwiperHeight()
                        that.viewAllFunc();
                    },
                    touchMove:function(){
                        that.topInfo.pcBannerFlag = false;
                    },
                     touchEnd:function(){
                         that.topInfo.pcBannerFlag = true;
                    }
                },
                // loop: true,
                // loopedSlides: 1,
                navigation: {
                    nextEl: ".swiper-button-nextBox",
                    prevEl: ".swiper-button-prevBox"
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
            // let swiper1 = new Swiper(".swiperOne", {
            //     loop: true,
            //     slidesPerView: 'auto',
            //     loopedSlides: 5.5,
            //     autoplay: {
            //         delay: 1000,
            //         reverseDirection: true,
            //     },
            // });
        },
        goHistory(event) {
            this.$Ta.track({name:"Web_Ino",data:{
                Action_Location_Name:'MintingRecord_icon',
                Action_Sub_Name:'MintingRecord',
            }})
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            this.changeIno({id:'',series:'',type:'homePage'})
            localStorage.setItem('cast','old');
            const { ...query } = this.$route.query
            const { language } = this.$route.params
            this.$router.push({
                path: '/' + language + '/INO/INOHistory'
            })
        },
        async viewdDeatil(event,item,type) {
            // type 当前主位置
            this.$Ta.track({name:"Web_Ino",data:{
                Action_Location_Type:'Banner',
                Action_Location_Name:type,
                Action_Sub_Name:item.projectName,
                Action_Sub_Id:item.id,
            }})
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            this.changeIno({id:item.id,series:item.series,type:'homePage'})
            const { ...query } = this.$route.query
            const { language } = this.$route.params
            this.$router.push({
                path: '/' + language + '/INO/INODeatil',
                query: {
                    ...query,
                    id: item.id,
                    series:item.series
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 1440px) {
    .ino-countdown{
        max-width: 1440px;
    }
    .inodefault-box{
        max-width: 1440px;
    }
    .ino-history-content{
        .swiper-slide{
            max-width: 367px!important;
        }
    }
}
@media screen and (max-width: 1200px)  {
    .ino-countdown{
        width: 100%;
        height: 100%;
        padding: 0 20px;
        .slide-every{
              transform: scale(0.85);
        }
        .ino-countdown-img{
           transform: scale(0.85);
        //    .swiper-slide{
        //         transform: scale(0.8);
        //    }
        }
    }
    .inodefault-box{
        width: 100%;
        height: 100%;
        padding: 0 20px;
         transform: scale(0.85);
        .inodefault-right{
            transform: scale(0.85);
        }
    }
}

@media screen and (max-width: 1080px) and (min-width: 830px)  {
    .inodefault{
        .inodefault-left{
            .inodefault-quantity{
                display: flex;
                justify-content: space-between;
                .inodefault-quantity-every{
                    margin-right: 0px!important;
                }
            }
        } 
    } 
}

@media screen and (max-width: 830px)  {
    .inodefault-box{
         transform: scale(1);
        .inodefault-right{
            transform: scale(1);
        }
    }
}




.hrefa{
    width: 100%;
    height: 100%;
}
.theme-light{
    .issuerAvag{
        border: 1px solid #F2F2F5;
    }
    .headPortrait{
        border: 2px solid #FFFFFF;
    }
    .countdownBox{
        .swiper-button-next {
            display: none;
            width: 50px;
            height: 50px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_d3bfe1a0-ea25-11ec-8113-c94df49cd896.png');
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
            // right: 180px;
    
            &::after {
                content: none;
            }
        }
    
        .swiper-button-prev {
            display: none;
            width: 50px;
            height: 50px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png');
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
            // left: 180px;
    
            &::after {
                content: none;
            }
        }
    }
    .chainIcon{
        background: #F2F2F5;
        border-radius: 9px;
    }
    .blackIcon{
        background: #FFFFFF;
    }
    .ino-countdown-img{
        .swiper-pagination {
            display: flex;
            width: 240px!important;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
        /deep/.swiper-pagination-bullet{
            flex: 1;
            height: 2px!important;
            border-radius: 0;
            border: none!important;;
            background: rgba(255, 255, 255, 0.5)!important;
            margin: 0;
        }
        /deep/.swiper-pagination-bullet-active {
            background: #FFFFFF!important;
            opacity: 1!important;
        }
    }
    .ino-order{
        background: #FFFFFF;
    }
     .ino-history{
        .ino-history-content{
            .swiper-button-next-big {
                width: 32px;
                height: 32px;
                background: #FFFFFF;
                border: 1px solid #F2F2F5;
                box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
                border-radius: 100px;
                background-image: url('https://cdn.bitkeep.vip/u_b_d3bfe1a0-ea25-11ec-8113-c94df49cd896.png');
                background-size: 18px;
                background-repeat: no-repeat;
                background-position: 8px;
                right: -13px;
                

                &::after {
                    content: none;
                }
            }

        .swiper-button-prev-big {
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            left: -13px;

            &::after {
                content: none;
            }
        }

        .swiper-button-next-small {
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_a4ec00f0-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            right: -13px;

            &::after {
                content: none;
            }
        }

        .swiper-button-prev-small {
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_93bee0e0-fdb9-11ec-a32d-7b2a8234159d.png');
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 6px;
            left: -16px;

            &::after {
                content: none;
            }
        }
        }
    }
}


.theme-dark{
    .issuerAvag{
        border: 1px solid #252529;
    }
    .headPortrait{
        border: 2px solid #17171A;
    }
    .chainIcon{
        background: #17171A;
        border-radius: 9px;
    }
    .blackIcon{
        background: #17171A;
    }
    .ino-countdown-img{
        .swiper-pagination {
            display: flex;
            width: 240px!important;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
        /deep/.swiper-pagination-bullet{
            flex: 1;
            height: 2px!important;
            border-radius: 0;
            border: none!important;;
            background: rgba(255, 255, 255, 0.5)!important;
            margin: 0;
        }
        /deep/.swiper-pagination-bullet-active {
            background: #FFFFFF!important;
            opacity: 1!important;
        }
    }
    .ino-order{
        background: #2A292E;
    }
    .countdownBox{
        .swiper-button-next {
            display: none;
            width: 50px;
            height: 50px;
            background: #2A292E;
            border: 1px solid #2A292E;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_2ec22160-fcd9-11ec-bc5d-11be1d4cf263.png');
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
            // right: 180px;
    
            &::after {
                content: none;
            }
        }
    
        .swiper-button-prev {
            display: none;
            width: 50px;
            height: 50px;
            background: #2A292E;
            border: 1px solid #2A292E;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_0ef2f8f0-fcd9-11ec-bc5d-11be1d4cf263.png');
            background-size: 24px;
            background-repeat: no-repeat;
            background-position: center;
            // left: 180px;
    
            &::after {
                content: none;
            }
        }
    }
    .ino-history{
        .ino-history-content{
            .swiper-button-next {
                width: 32px;
                height: 32px;
                background: #2A292E;
                border: 1px solid #2A292E;
                box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
                border-radius: 100px;
                background-image: url('https://cdn.bitkeep.vip/u_b_2ec22160-fcd9-11ec-bc5d-11be1d4cf263.png');
                background-size: 18px;
                background-repeat: no-repeat;
                background-position: 8px;
                right: -13px;
                

                &::after {
                    content: none;
                }
            }

        .swiper-button-prev {
            width: 32px;
            height: 32px;
            background: #2A292E;
            border: 1px solid #2A292E;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_0ef2f8f0-fcd9-11ec-bc5d-11be1d4cf263.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            left: -17px;

            &::after {
                content: none;
            }
        }
        }
    }
}
.ino-content{
    min-width: 820px;
    // display: flex;
    // justify-content: center;
}
.ino-content-small{
    min-width: 300px;
    .ino-order{
        right: 20px;
    }
}
.inodefault-small{
    padding: 80px 20px 26px 20px!important;
    height: 100%!important;
    max-height: 100%!important;
    max-width: 820px!important;
    min-width: 100%!important;
    .inodefault-title{
        font-size: 28px!important;
        line-height: 32px!important;
    }
    .inodefault-des {
        margin-bottom: 20px!important;
        font-size: 14px!important;
    }
    .inodefault-box{
        display: flex;
        flex-direction: column-reverse;
        // min-width: 375px;
        padding: 0!important;
        .inodefault-left{
            margin: 30px 0 0 0 ;
        }
        .inodefault-right{
            min-width: 335px;
            width: 100%;
            height: 100%;
            .inodefault-right-box{
                min-width: 335px;
                height: 196px;
                width: 100%;
            }
            .inodefault-background{
                width: 267px;
                height: 129px;
                filter: blur(30px);
            }
            .bannerimg{
                z-index: 2;
                width: 100%;
                height: 100%;
                object-fit:cover;
                vertical-align:inherit;
                border-radius: 8px;
            }
            .swiper-container {
                margin-top: 9px;
                .swiper-slide{
                    width: 54px!important;
                    height: 57px;
                    img{
                        width: 54px;
                        height: 53px;
                    }
                }
            }
            .swiperTwo{
                margin-top: 0;
                margin-bottom: 9px;
            }
        }
    }
    .inodefault-quantity{
        justify-content: space-between;
        .inodefault-quantity-every{
            margin-right: 10px!important;
        }
        .inodefault-quantity-nums{
            font-size: 18px!important;
            line-height: 22px!important;
        }
        .inodefault-quantity-text{ 
            font-size: 12px!important;
            line-height: 20px!important;
        }
    }
}
.inodefault{ 
    max-height: 655px;
    margin:0 auto;
    min-width: 820px;
    max-width: 1530px;
    padding: 0 20px 80px 20px;
    .inodefault-box{
        display: flex;
        justify-content: space-evenly;
        padding: 68px 0px 20px 0px;
    }
    .inodefault-left{
        max-width: 496px;
        min-width:243px;
        // margin-right: 150px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 20px;
        .inodefault-title{
            font-weight: 700;
            font-size: 50px;
            line-height: 60px;
        }
        .inodefault-des{
            margin-top: 10px;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 40px;
            font-weight: normal;
            font-family: none;
        }
        .inodefault-quantity{
            display: flex;
            .inodefault-quantity-every{
                display: flex;
                flex-direction: column;
                margin-right: 50px;
                text-align: center;
                &:nth-last-child(1){
                    margin-right: 0px;
                }
                .inodefault-quantity-nums{
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 32px;
                }
                .inodefault-quantity-text{
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
    }
    .inodefault-right{
        width: 626px;
        height: 366px;
        background: #190042;
        border-radius: 8px;
        position: relative;
        display: flex;
        justify-content: center;
        .inodefault-background{
            position: absolute;
            background: #190042;
            bottom: 0;
            width: 500px;
            height: 290px;
            filter: blur(60px);
            z-index: 1;
        }
        .bannerimg{
            z-index: 2;
            width: 100%;
            height: 100%;
            object-fit:cover;
            vertical-align:inherit;
            border-radius: 8px;
        }
        .inodefault-right-box{
             width: 626px;
        height: 366px;
        }
        .swiper-container{
            margin-top: 18px;
        }
        .swiper-slide{
            display: flex;
            width: 102px!important;
            height: 102px;
            margin-right: 15px;
            &:nth-last-child(1){
                margin-right: 0;
            }
            img{
                padding: 2px;
                background: linear-gradient(89.46deg, #FF01E6 3.56%, #FB45FF 54.56%, #9554FF 95.78%);
                width: 98px;
                height: 98px;
                border-radius: 50px;
            }
        }
    }
}

.countdownBox{

    .ino-countdown-text {
        max-width: 496px;
        // margin-right: 150px;
        // margin-left: 100px;
        min-width: 243px;
        flex: 1;
        padding-right: 20px;

        .privilegeTag{
            display: flex;
            align-items: center;
            justify-content: center;
            display: inline-block;
            p{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2px 5px;
                background: linear-gradient(90deg, rgba(156, 96, 255, 0.15) 3.76%, rgba(78, 191, 255, 0.15) 68.92%, rgba(9, 239, 189, 0.15) 100%);
                border-radius: 2px;
                span{
                    background: linear-gradient(90deg, #9C60FF 3.76%, #35B6FF 64.41%, #09EFBD 100%);
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
        .ino-countdown-text-title {
            font-weight: 700;
            font-size: 50px;
        }

        .ino-countdown-text-hot {
            display: flex;
            align-items: center;

            .hot-text {
                margin-right: 20px;
                font-size: 16px;
                font-weight: 600;
            }

            .ino-countdown-text-hot-second {
                display: flex;
                align-items: center;
                // width: 142px;
                height: 28px;
                padding: 0px 8px 0px 4px;
                border-radius: 14px;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                border: 1px solid;
                box-sizing: content-box;

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    border-radius: 8px;
                }

                span {
                    flex: 1;
                    width: 105px;
                }
            }
        }


        .ino-countdown-text-divrice {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            display: flex;
            align-items: center;
            margin-top: 10px;

            span:nth-child(2) {
                width: 1px;
                height: 16px;
                line-height: 24px;
                margin: 0 20px;
            }
        }

        .ino-countdown-text-des {
            font-size: 16px;
            font-weight: 500;
            margin-top: 10px;
            line-height: 24px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            position: relative;

            .before {
                content: '';
                float: right;
                clear: both;
                width: 0px;
            }

            .viewall {
                float: right;
                clear: both;
                cursor: pointer;
                // font-family: none;
            }
            .moreText{
                // font-family: pingfang;
            }

            .bottomtext{
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                opacity: 0;
            }

        }

        .ino-countdown-text-issuer {
            margin-top: 10px;
            height: 40px;
            display: flex;
            align-items: center;
            // font-family: none;

            img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
                border-radius: 20px;
            }

            span:nth-child(2) {
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                margin-right: 8px;
            }

            span:nth-child(3) {
                line-height: 22px;
                text-align: center;
                width: 52px;
                height: 22px;
                font-size: 12px;
                background: rgba(64, 163, 255, 0.1);
                border-radius: 2px;
            }
        }

        .ino-countdown-text-soon {
            font-weight: 600;
            font-size: 16px;
            margin-top: 30px;
        }

        .ino-countdown-text-soonDown {
            font-weight: 600;
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        .ino-countdown-text-time {
            margin-top: 10px;
            display: flex;
            margin-bottom: 20px;

            .time-every {
                font-weight: normal;
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
                    font-weight: normal!important;
                    font-family: none!important;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 4px;
                    font-size: 14px;
                }
            }
        }
    }
}
.ino-countdown-small{
    padding: 0 20px 40px 20px;
    .slide-every{
        display: flex;
        flex-direction: column-reverse;
        .ino-countdown-text{
            .ino-countdown-text-title{
                font-weight: 700;
                font-size: 28px;
                line-height: 33px;
            }
            .ino-countdown-text-divrice{
                font-size: 12px;
            }

            .ino-countdown-text-des{
                font-size: 14px;
            }
            .ino-countdown-text-hot{
                margin-top: 10px;
            }
        }

        .ino-countdown-imgBox{
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: relative;
            .bottomimg{
                width: 267px;
                height: 129px;
                position: absolute;
                bottom: 30px;
                filter: blur(30px);
                z-index: 1;
                object-fit:cover;
                vertical-align:inherit;
                // left: 50%;
                // transform: translateX(-50%);
            }
    }
        .ino-countdown-img{
            position: relative;
            // height: 170px;
            // margin-bottom: 30px;
            width: 100%;
            height: 100%;
            // flex: 1;
            .swiper-slide{
                width: 100%;
                height: 100%;
                // flex: 1;
                position: relative;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                margin-bottom: 30px;
                padding: 0 4px;
                box-sizing: border-box;
            }
            .banner{
                // width: 100%;
                // height: 170px;
                object-fit:cover;
                vertical-align:inherit;
                border-radius: 10px;
                z-index: 2;
            }
            .swiper-pagination{
                width: 100px!important;
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .ino-countdown-text-viewDetail-small {
        display: flex;
        width: 100%;
        height: 50px;
        align-items: center;
        border-radius: 8px;
        color: #ffffff;
        background: #7524F9;
        justify-content: center;
    }
}
.ino-countdown {
    position: relative;
    max-height: 655px;
    margin:0 auto;
    min-width: 820px;
    max-width: 1530px;
    padding: 0 20px;
    &:hover{
        .swiper-button-next{
            display: block;
        }
        .swiper-button-prev{
            display: block;
        }
    }
    .ino-countdown-img{
        width: 626px;
        .swiper-pagination{
            position: absolute;
            bottom: 130px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .slide-every {
        display: flex;
        justify-content:space-evenly;
        width: 100%;
        height: 100%;
        padding: 68px 0px 0px 0px;
    }


    .ino-countdown-text {
        max-width: 496px;
        // margin-right: 150px;
        // margin-left: 100px;
        min-width: 243px;
        flex: 1;
        padding-right: 20px;

        .ino-countdown-text-title {
            font-weight: 700;
            font-size: 50px;
        }

        .ino-countdown-text-hot {
            display: flex;
            align-items: center;

            .hot-text {
                margin-right: 20px;
                font-size: 16px;
                font-weight: 600;
            }

            .ino-countdown-text-hot-second {
                display: flex;
                align-items: center;
                // width: 142px;
                height: 28px;
                padding: 0px 8px 0px 4px;
                border-radius: 14px;
                line-height: 28px;
                text-align: center;
                font-size: 14px;
                border: 1px solid;
                box-sizing: content-box;

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    border-radius: 8px;
                }

                span {
                    flex: 1;
                    width: 105px;
                }
            }
        }

        .ino-countdown-text-divrice {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            display: flex;
            align-items: center;
            margin-top: 10px;

            span:nth-child(2) {
                width: 1px;
                height: 16px;
                line-height: 24px;
                margin: 0 20px;
            }
        }

       .ino-countdown-text-des {
            font-size: 16px;
            font-weight: 500;
            margin-top: 10px;
            line-height: 24px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            position: relative;

            .before {
                content: '';
                float: right;
                clear: both;
                width: 0px;
            }

            .viewall {
                float: right;
                clear: both;
                cursor: pointer;
            }
            .moreText{
                // font-family: none;
            }

            .bottomtext{
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                opacity: 0;
            }

        }

        .ino-countdown-text-issuer {
            margin-top: 10px;
            height: 40px;
            display: flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
                border-radius: 20px;
            }

            span:nth-child(2) {
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                margin-right: 8px;
            }

            span:nth-child(3) {
                line-height: 22px;
                text-align: center;
                width: 52px;
                height: 22px;
                font-size: 12px;
                background: rgba(64, 163, 255, 0.1);
                border-radius: 2px;
            }
        }

        .ino-countdown-text-soon {
            font-weight: 600;
            font-size: 16px;
            margin-top: 30px;
        }

        .ino-countdown-text-soonDown {
            font-weight: 600;
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        .ino-countdown-text-time {
            margin-top: 10px;
            display: flex;

            .time-every {
                font-weight: normal;
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
                    font-weight: normal!important;
                    font-family: none!important;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 4px;
                    font-size: 14px;
                }
            }
        }
    }

    .ino-countdown-text-viewDetail {
        display: flex;
        width: 238px;
        height: 50px;
        align-items: center;
        border-radius: 8px;
        color: #ffffff;
        background: #7524F9;
        justify-content: center;
    }
    .countdownBtn{
        width: 270px;
    }

    .ino-countdown-img {
        position: relative;
        width: 626px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        .swiper-container {
            padding-bottom: 120px;
        }
        .swiper-slide{
            position: relative;
            display: flex;
            // justify-content: center;
             width: 626px;
            // padding: 0 0 102px 0 ;
            padding: 0 4px;
            box-sizing: border-box;
        }
        img {
            width: 100%;
            max-width: 626px;
            z-index: 2;
            border-radius: 10px;
            height: 366px;
            margin:0 auto;
            object-fit:cover;
            vertical-align:inherit;
            cursor: pointer;
        }

        .bottomimg {
            position: absolute;
            bottom: 0;
            width: 47%;
            width: 300px;
            height: 290px;
            filter: blur(60px);
            z-index: 1;
            left: 50%;
            margin-left: -150px;
            object-fit:cover;
            vertical-align:inherit;
        }
    }
}

.ino-eventPreview-small{
    height: 100%!important;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    .ino-eventPreview-title {
        margin-top: 80px;
        font-weight: 600px;
        font-size: 30px;
        margin-bottom: 30px;
    }

    .ino-eventPreview-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 20px 50px 20px;
        li{
            width: 100%;
            flex: 1;
            min-width: 335px;
            display: flex;
            margin-top: 16px;
            justify-content: center;
            .ino-eventPreview-every{
                max-width: 100%;
            }
        }

        .ino-eventPreview-every {
            flex: 1;
            max-width: 497px;
            height: 338px;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            border: 1px solid;
            border-radius: 8px;

            .ino-eventPreview-every-bottom {
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 10px 20px 20px 20px;
            }

            .ino-eventPreview-every-img {
                width: 100%;
                height: 180px;
                background-repeat: no-repeat;
                background-size: cover;
                display: flex;
                justify-content: center;
                background-position: center;
                border-radius: 8px 8px 0 0 ;
                img{
                    width: 100%;
                    object-fit:cover;
                    vertical-align:inherit;
                    border-radius: 8px 8px 0 0 ;
                }
            }

            .ino-eventPreview-every-head {
                display: flex;

                span:nth-child(1) {
                    position: relative;
                    height: 64px;
                    margin-top: -32px;

                    .chainIcon {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 18px;
                        height: 18px;
                    }

                    img {
                        width: 64px;
                        height: 64px;
                        border-radius: 32px;
                    }
                }

                span:nth-child(2) {
                    flex: 1;
                    margin-left: 8px;
                    margin-right: 26px;
                    flex: 1;
                    height: 44px;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 22px;
                }

                span:nth-child(3) {
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 22px;
                }
            }

            .ino-eventPreview-every-text {
                margin-top: 10px;
                max-height: 42px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                flex: 1;
            }

            .ino-eventPreview-every-time {
                font-weight: 600;
                font-size: 14px;
                margin-top: 20px;
            }
        }
    }
}
.ino-eventPreview {
    height: 593px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .ino-eventPreview-title {
        margin-top: 80px;
        font-weight: 600px;
        font-size: 30px;
        margin-bottom: 30px;
    }

    .ino-eventPreview-list {
        // max-width: 1400px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        padding: 0 20px;
        li{
            flex: 1;
            max-width: 497px;
            display: flex;
            margin-right: 20px;
            &:nth-child(3){
                margin-right: 0;
            }
        }

        .ino-eventPreview-every {
            flex: 1;
            max-width: 497px;
            height: 338px;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            border: 1px solid;
            border-radius: 8px;
            // margin-left: 20px;

            .ino-eventPreview-every-bottom {
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 10px 20px 20px 20px;
            }

            .ino-eventPreview-every-img {
                width: 100%;
                height: 180px;
                background-repeat: no-repeat;
                background-size: cover;
                display: flex;
                justify-content: center;
                background-position: center;
                border-radius: 8px 8px 0 0 ;
                img{
                    width: 100%;
                    object-fit:cover;
                    vertical-align:inherit;
                    border-radius: 8px 8px 0 0 ;
                }
            }

            .ino-eventPreview-every-head {
                display: flex;

                span:nth-child(1) {
                    position: relative;
                    margin-top: -20px;
                    width: 64px;
                    height: 64px;

                    .chainIcon {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 18px;
                        height: 18px;
                    }

                    img {
                        width: 64px;
                        height: 64px;
                        border-radius: 32px;
                    }
                }

                span:nth-child(2) {
                    margin-left: 8px;
                    margin-right: 26px;
                    flex: 1;
                    height: 44px;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 22px;
                }

                span:nth-child(3) {
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 22px;
                }
            }

            .ino-eventPreview-every-text {
                margin-top: 10px;
                max-height: 42px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                flex: 1;
            }

            .ino-eventPreview-every-time {
                font-weight: 600;
                font-size: 14px;
                margin-top: 20px;
            }
        }
    }

}

.hot-text {
    span {
        background: linear-gradient(89.8deg, #FF01E6 42.36%, #FB45FF 69.43%, #9554FF 96.02%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
}

.ino-countdown-text-hot-second {
    display: flex;
    align-items: center;
    // width: 133px;
    height: 28px;
    padding: 0px 8px 0px 4px;
    border-radius: 14px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    border: 1px solid;
    box-sizing: content-box;

    img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border-radius: 8px;
    }

    span {
        flex: 1;
        width: 105px;
    }
}

.ino-history-small{
    .ino-history-content{
        .swiper-container{
            .swiper-wrapper{
                .swiper-slide{
                    // width: 100%!important;
                    // height: 100%!important;
                    // min-width: 335px;
                    max-width: 100%!important;
                }
            }
        } 
    } 
}
.ino-history {
    // height: 593px;
    // padding: 0 170px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ino-history-title {
        margin-top: 80px;
        font-weight: 600px;
        font-size: 30px;
        margin-bottom: 30px;
    }

.ino-history-contentFlex{
    .swiper-wrapper{
        display: flex;
        justify-content: center;
        .swiper-slide{
            flex:1;
            max-width: 367px!important;
        }
    }
}
    .ino-history-content {
        width: 100%;
        height: 100%;
        position: relative;
        max-width: 1530px;
        .swiper-button-disabled{
            pointer-events: auto;
        }

        // background: red;
        .swiper-button-next {
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_d3bfe1a0-ea25-11ec-8113-c94df49cd896.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            right: -13px;
            

            &::after {
                content: none;
            }
        }

        .swiper-button-prev {
            width: 32px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #F2F2F5;
            box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
            background-image: url('https://cdn.bitkeep.vip/u_b_8c122920-ea26-11ec-8113-c94df49cd896.png');
            background-size: 18px;
            background-repeat: no-repeat;
            background-position: 8px;
            left: -17px;

            &::after {
                content: none;
            }
        }

        .swiper-container {
            // box-sizing: border-box;
            width: 100%;
            height: 100%;
            //   overflow:inherit;
            .swiper-wrapper {
                // display: flex;
                // // justify-content: space-evenly;
                width: 100%;
                height: 100%;
                // display: flex;
                .swiper-slide {
                    height: 254px;
                    border: 1px solid;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    position: relative;  bottom: 0;
                    box-sizing: border-box;
                    &:nth-last-child(1) {
                        margin-right: 0!important;
                    }
                    .ino-eventPreview-every {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        border-radius: 8px;
                    }

                    .ino-history-content-bottom {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 10px 20px 0 20px;
                    }

                    .ino-history-content-img {
                        width: 100%;
                        height: 133px;
                        background-repeat: no-repeat;
                        background-size: cover;
                        display: flex;
                        justify-content: center;
                        background-position: center;
                        border-radius: 8px 8px 0 0 ;
                        img{
                            object-fit:cover;
                            vertical-align:inherit;
                        }
                    }

                    .ino-history-content-head {
                        display: flex;

                        span:nth-child(1) {
                            position: relative;
                            margin-top: -30px;

                            .chainIcon {
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                width: 18px;
                                height: 18px;
                            }

                            img {
                                width: 56px;
                                height: 56px;
                                border-radius: 28px;
                            }
                        }
                    }

                    .ino-history-content-text {
                        flex: 1;
                        margin-top: 10px;
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 22px;
                        text-align: center;
                         word-break: break-all;
                        // text-overflow: ellipsis;
                        // display: -webkit-box;
                        // -webkit-box-orient: vertical;
                        // -webkit-line-clamp: 2;
                        overflow: hidden;
                    }

                    .ino-history-content-price {
                        margin-bottom: 7px;
                        height: 18px;
                        display: flex;
                        align-items: center;

                        span:nth-child(1) {
                            font-size: 14px;
                            margin-right: 4px;
                        }

                        span:nth-child(2) {
                            font-weight: 600;
                            font-size: 14px;
                            height: 100%;
                            display: flex;
                            align-items: center;

                            img {
                                width: 18px;
                                height: 18px;
                                margin-right: 4px;
                            }
                        }
                    }
                }
                // .swiper-slide:nth-last-child(0){
                //     margin-right: 0;
                //     background: #000;
                // }
            }
        }
    }
}

.ino-order {
    position: fixed;
    width: 50px;
    height: 50px;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.08);
    border-radius: 100px;
    top: 580px;
    right: 98px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 24px;
        height: 24px;
    }
    .littleDot{
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #F36464;
        top: 0;
        right: 0;
    }
}
</style>