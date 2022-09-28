<template>
    <div class="downloadPage" v-if="!isMobile">
        <div class="one">
            <div class="one-box">
                <div class="tab-box-bar">
                    <div class="contbox">
                        <div class="tab-box base-layer lineBG2" id="download-tab-box">
                            <div class="tab-item text3 android j-tab-item" :class="tabIndex == 0 ? 'on Colorpurple' : ''" @click="tabitemClick(0)">Android</div>
                            <div class="tab-item text3 ios j-tab-item" :class="tabIndex == 1 ? 'on Colorpurple' : ''" @click="tabitemClick(1)">iOS</div>
                            <div class="tab-item text3 chrome j-tab-item" :class="tabIndex == 2 ? 'on Colorpurple' : ''" @click="tabitemClick(2)">
                                {{ $t('DownlaodPage.ChromeApp') }}
                            </div>
                            <div class="tab-item-bg BG4" id="tab-item-bg"></div>
                        </div>
                    </div>
                </div>
                <div class="tab-content text1">
                    <div id="Android" class="tab-content-item android-content">
                        <div class="contbox">
                            <div class="android-left">
                                <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_0a023c00-e719-11ec-a63c-e3668ae412cb.png" alt="BitKeep Android App" />
                                <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_cf862870-e718-11ec-a63c-e3668ae412cb.png" alt="BitKeep Android App" />
                            </div>
                            <div class="android-right">
                                <h1 class="text1">
                                    {{ $t('DownlaodPage.android_1') }}
                                </h1>
                                <p class="title-p InterR text1">
                                    {{ $t('DownlaodPage.android_2') }}
                                </p>
                                <div class="chrom-info InterR">
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.android_3') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.android_4') }}
                                        <span class="j_androidVersion">{{ AndroidVersion }}</span>
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.android_5') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.android_6') }}<span class="j_update_time">{{ update_time }}</span>
                                    </p>
                                </div>
                                <div class="android-btn-box">
                                    <div class="android-btn-item">
                                        <a :href="AFUrl" @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                                            <img
                                                class="light_icon"
                                                src="https://cdn.bitkeep.vip/u_b_ebd96400-f844-11ec-b63a-312b958ab834.png"
                                                alt="Download from Google Play"
                                            />
                                            <img
                                                class="dark_icon"
                                                src="https://cdn.bitkeep.vip/u_b_3254ebd0-f849-11ec-b63a-312b958ab834.png"
                                                alt="Download from Google Play"
                                            />
                                        </a>
                                    </div>
                                    <div class="android-btn-item">
                                        <a :href="AndroidUrl" class="android_download" @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)">
                                            <img
                                                class="light_icon"
                                                src="https://cdn.bitkeep.vip/u_b_e433fe40-f844-11ec-b63a-312b958ab834.png"
                                                alt="Download via Android APK"
                                            />
                                            <img
                                                class="dark_icon"
                                                src="https://cdn.bitkeep.vip/u_b_3255af20-f849-11ec-b63a-312b958ab834.png"
                                                alt="Download via Android APK"
                                            />
                                        </a>
                                    </div>
                                    <div class="android-btn-erweima">
                                        <img :src="qrcodeImage" alt="erweima" />
                                        <span>
                                            {{ $t('DownlaodPage.android_7') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="android-arrow animate__bounce animate__animated">
                            <!-- <img src="../../images/01icon_arrow_down.png" alt="arrow" /> -->
                        </div>
                    </div>
                    <div id="ios" class="tab-content-item ios-content BG1">
                        <div class="contbox">
                            <div class="ios-right">
                                <h1 class="text1">
                                    {{ $t('DownlaodPage.iOS_1') }}
                                </h1>
                                <p class="title-p InterR text1">
                                    {{ $t('DownlaodPage.iOS_2') }}
                                </p>
                                <div class="chrom-info InterR">
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.iOS_3') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.iOS_4') }}
                                        <span class="j_androidVersion">{{ AndroidVersion }}</span>
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.iOS_5') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.iOS_6') }}
                                        <span class="j_update_time">{{ update_time }}</span>
                                    </p>
                                </div>
                                <div class="ios-btn-box">
                                    <div class="ios-btn-item">
                                        <a
                                            href="https://apps.apple.com/app/bitkeep/id1395301115"
                                            @click="downloadTA('downloadIOS_appStore', $event, 'https://apps.apple.com/app/bitkeep/id1395301115')"
                                        >
                                            <img
                                                class="light_icon"
                                                src="https://cdn.bitkeep.vip/u_b_e4329eb0-f844-11ec-b63a-312b958ab834.png"
                                                alt="Download from App Store"
                                            />
                                            <img
                                                class="dark_icon"
                                                src="https://cdn.bitkeep.vip/u_b_2df402b0-f849-11ec-b63a-312b958ab834.png"
                                                alt="Download from App Store"
                                            />
                                        </a>
                                    </div>
                                    <div class="ios-btn-item">
                                        <a
                                            href="https://testflight.apple.com/join/gMNlVK4J"
                                            target="_blank"
                                            @click="downloadTA('downloadIOS_testflight', $event, 'https://apps.apple.com/app/bitkeep/id1395301115')"
                                        >
                                            <img
                                                class="light_icon"
                                                src="https://cdn.bitkeep.vip/u_b_f1669820-f844-11ec-b63a-312b958ab834.png"
                                                alt="Testing app with TestFlight"
                                            />
                                            <img
                                                class="dark_icon"
                                                src="https://cdn.bitkeep.vip/u_b_2df932d0-f849-11ec-b63a-312b958ab834.png"
                                                alt="Testing app with TestFlight"
                                            />
                                        </a>
                                    </div>
                                    <div class="ios-btn-erweima">
                                        <img :src="qrcodeImage" alt="erweima" />
                                        <span>
                                            {{ $t('DownlaodPage.iOS_7') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="ios-left">
                                <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_0c029550-e718-11ec-a63c-e3668ae412cb.png" alt="BitKeep iOS App" />
                                <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_75258fb0-e718-11ec-a63c-e3668ae412cb.png" alt="BitKeep iOS App" />
                            </div>
                        </div>
                    </div>
                    <div id="chrome" class="tab-content-item chrom-content">
                        <div class="contbox">
                            <div class="chrom-left">
                                <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_7556e020-a923-11ec-9bb2-d529ee665d4d.png" alt="BitKeep Chrome App" />
                                <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_5738ed70-e719-11ec-a63c-e3668ae412cb.png" alt="BitKeep Chrome App" />
                            </div>
                            <div class="chrom-right">
                                <h1 class="text1">
                                    {{ $t('DownlaodPage.chrome_1') }}
                                </h1>
                                <p class="title-p InterR text1">
                                    {{ $t('DownlaodPage.chrome_2') }}
                                </p>
                                <div class="chrom-info">
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.chrome_3') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.chrome_4') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.chrome_5') }}
                                    </p>
                                    <p class="InterR text3">
                                        {{ $t('DownlaodPage.chrome_6') }}
                                    </p>
                                    <div class="chrom-download-url">
                                        <div class="chrom-btn-item">
                                            <a
                                                href="https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak"
                                                @click="
                                                    downloadTA(
                                                        'downloadChrome_webstore',
                                                        $event,
                                                        'https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak',
                                                    )
                                                "
                                            >
                                                <img
                                                    class="light_icon chromeImg"
                                                    src="https://cdn.bitkeep.vip/u_b_ebd5ba80-f844-11ec-b63a-312b958ab834.png"
                                                    alt="Download with Google Chrome Web Store"
                                                />
                                                <img
                                                    class="dark_icon chromeImg"
                                                    src="https://cdn.bitkeep.vip/u_b_2788caa0-f849-11ec-b63a-312b958ab834.png"
                                                    alt="Download with Google Chrome Web Store"
                                                />
                                            </a>
                                        </div>
                                        <div class="chrom-btn-item">
                                            <a
                                                href="https://cdn.bitkeep.vip/chrome/v1.3.2_release.zip"
                                                @click="downloadTA('downloadChrome_APK', $event, 'https://cdn.bitkeep.vip/chrome/v1.3.2_release.zip')"
                                            >
                                                <img
                                                    class="light_icon"
                                                    src="https://cdn.bitkeep.vip/u_b_ebd80470-f844-11ec-b63a-312b958ab834.png"
                                                    alt="Download with Google Chrome Web Store"
                                                />
                                                <img
                                                    class="dark_icon"
                                                    src="https://cdn.bitkeep.vip/u_b_2784abf0-f849-11ec-b63a-312b958ab834.png"
                                                    alt="Download with Google Chrome Web Store"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <remote-js cdn="https://cdn2.bitkeep.vip/files/jquery.min.js"></remote-js>
    </div>
    <div class="mobiledownloadPage" v-else>
        <div class="detail_box">
            <div class="detail_box_bigTitle">
                <h1 class="text1" v-html="$t('DownlaodPage.h5Page.aboutWeb3')"></h1>
            </div>
            <div class="detail_box_bigTitle_content text1">
                {{ $t('DownlaodPage.h5Page.mainnets') }}
            </div>
            <div class="detail_box_img">
                <img src="https://cdn.bitkeep.vip/u_b_871ea130-01c5-11ed-859d-e33d95963497.svg+xml" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_b16ef940-22ad-11ed-ac51-451ad2fa7963.svg+xml" alt="" class="dark_icon" />
            </div>
            <div style="margin-top: 16px">
                <h5-download-group ref="pronbit" :af-url="AFUrl" :android-url="AndroidUrl" :app-store="appStore" source="download" location="row1" />
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_f0964e70-01c9-11ed-87df-e7400131c7ee.svg+xml" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3822b60-1e4c-11ed-b236-f769417b9aed.png" alt="" class="dark_icon" />
                <p class="detail_box_text_title text1">
                    {{ $t('DownlaodPage.h5Page.BitKeepCrypto') }}
                </p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.BitKeepCryptoInfo') }}
                </p>
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_2f6a7c10-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e381b630-1e4c-11ed-b236-f769417b9aed.png" alt="" class="dark_icon" />
                <p class="detail_box_text_title text1">{{ $t('DownlaodPage.h5Page.Private') }}</p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.Privateinfo') }}
                </p>
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_4bf63950-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3825270-1e4c-11ed-b236-f769417b9aed.png" alt="" class="dark_icon" />
                <p class="detail_box_text_title text1">
                    {{ $t('DownlaodPage.h5Page.esayTransaction') }}
                </p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.esayTransactionInfo') }}
                </p>
            </div>
            <div class="detail_box_text detail_bottom">
                <img src="https://cdn.bitkeep.vip/u_b_70c76ce0-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3825271-1e4c-11ed-b236-f769417b9aed.png" alt="" class="dark_icon" />
                <p class="detail_box_text_title text1">{{ $t('DownlaodPage.h5Page.nftMarket') }}</p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.nftMarketInfo') }}
                </p>
            </div>
            <div class="download" id="IosBtnen" v-if="false">
                <div class="left">
                    <a :href="appStore" @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                        <img src="https://cdn.bitkeep.vip/u_b_333f4110-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                    </a>
                </div>
                <div class="right">
                    <a
                        href="https://testflight.apple.com/join/gMNlVK4J"
                        @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                    >
                        <img src="https://cdn.bitkeep.vip/u_b_33418b00-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                    </a>
                </div>
            </div>
            <div class="download" id="AndroidBtnen" v-if="false">
                <div class="left">
                    <a :href="AFUrl" @click="downloadTA('downloadAndroid_GooglePlay', $event, AFUrl)">
                        <img src="https://cdn.bitkeep.vip/u_b_33740cb0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                    </a>
                </div>
                <div class="right">
                    <a class="btnDwonload" :href="AndroidUrl" @click="downloadTA('downloadAndroid_APK', $event, AndroidUrl)">
                        <img src="https://cdn.bitkeep.vip/u_b_337433c0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                    </a>
                </div>
            </div>
        </div>
        <!-- <div class="downloadFoot" v-show="isShowFoot">
            <div class="download BG0 lineBG3" id="IosBtnen" v-if="Phonesystem == 'IOS'">
                <div class="version">
                    BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
                </div>
                <div v-if="locale == 'zh'" class="Btnbetween">
                    <div class="left">
                        <a class="iosUrl" :href="appStore" @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_333fb640-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                        </a>
                    </div>
                    <div class="right">
                        <a
                            href="https://testflight.apple.com/join/gMNlVK4J"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                            ><img src="https://cdn.bitkeep.vip/u_b_33413ce0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2"
                        /></a>
                    </div>
                </div>
                <div v-else class="Btnbetween">
                    <div class="left">
                        <a class="iosUrl" :href="appStore" target="_blank" @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_333f4110-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                        </a>
                    </div>
                    <div class="right">
                        <a
                            href="https://testflight.apple.com/join/gMNlVK4J"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                        >
                            <img src="https://cdn.bitkeep.vip/u_b_33418b00-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="download BG0 lineBG3" id="AndroidBtnen" v-else>
                <div class="version">
                    BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
                </div>
                <div v-if="locale == 'zh'" class="Btnbetween">
                    <div class="left">
                        <a class="AndriodUrl" :href="AFUrl" @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_33400460-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn3" />
                        </a>
                    </div>
                    <div class="right">
                        <a class="btnDwonload j_androidMarkBtn j_btnDwonload" :href="AndroidUrl" @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)"
                            ><img src="https://cdn.bitkeep.vip/u_b_333f6820-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn4"
                        /></a>
                    </div>
                </div>
                <div v-else class="Btnbetween">
                    <div class="left">
                        <a class="AndriodUrl" target="_blank" :href="AFUrl" @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_33740cb0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                        </a>
                    </div>
                    <div class="right">
                        <a class="btnDwonload j_androidMarkBtn j_btnDwonload" :href="AndroidUrl" @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_337433c0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                        </a>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import { InitTime } from '@/tools/common';
import cndMixins from '@/mixins/cnd.js';
import { getQrcodeImage } from '@/utils/qrcode';
import h5DownloadGroup from '@/components/downloadButtons/h5DownloadGroup';

export default {
    name: 'DownloadPage',
    layout: 'IndexPage/default',
    components: { h5DownloadGroup },
    mixins: [cndMixins],
    scrollToTop: false,
    head() {
        const { language } = this.$route.params;
        const { hostChange } = this.$store.state;
        return {
            title: this.$t('DownlaodPage.Title'),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('DownlaodPage.Keyword') },
                { hid: 'description', name: 'description', content: this.$t('DownlaodPage.Description') },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep${hostChange}/${language}/download` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep${hostChange}/zh/download` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep${hostChange}/en/download` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep${hostChange}/ko/download` },
                { rel: 'alternate', hreflang: 'tr', href: `https://bitkeep${hostChange}/tr/download` },
                { rel: 'alternate', hreflang: 'vi', href: `https://bitkeep${hostChange}/vi/download` },
                { rel: 'alternate', hreflang: 'id', href: `https://bitkeep${hostChange}/id/download` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep${hostChange}/en/download` },
            ],
        };
    },
    computed: {
        qrcodeImage() {
            return getQrcodeImage(this.locale);
        },
    },
    data() {
        return {
            locale: this.$store.state.locale,
            hostIsCom: this.$store.state.hostIsCom,
            Phonesystem: '',
            AndroidUrl: '',
            AndroidVersion: null,
            isMobile: this.$store.state.isMobile && !this.$store.state.isPC,
            appStore: 'https://itunes.apple.com/app/bitkeep/id1395301115',
            AFUrl: 'https://play.google.com/store/apps/details?id=com.bitkeep.wallet',
            isShowFoot: false,
            tabIndex: 0,
            update_time: '',
        };
    },
    mounted() {
        //深度链接跳转
        const { deep_link_value, type } = this.$route.query;
        if (deep_link_value && unescape(deep_link_value).indexOf('bitkeep://') != -1) {
            window.location.href = unescape(deep_link_value);
            return;
        }
        this.getAndroidUrl();
        this.HandleSys();
        if (this.isMobile && !this.$store.state.isPC) {
            window.addEventListener('scroll', this.handleScrollx, true);
            window.scrollTo(0, 0);
        } else {
            if (type) {
                this.tabIndex = type > 2 ? 2 : type;
                this.tabitemClick(this.tabIndex);
                console.log(this.tabIndex);
            }
            $(window).on('scroll', () => {
                let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                let tabIndex;
                tabIndex = Math.round(scrollY / 650);
                if (tabIndex > 2) {
                    tabIndex = 2;
                }
                this.tabIndex = tabIndex;
                $('#tab-item-bg').css({
                    transform: 'translate3d(' + tabIndex * $('#tab-item-bg').width() + 'px, 0, 0)',
                });
            });
        }
    },
    methods: {
        HandleSys() {
            let isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod'),
                isAndroid = navigator.userAgent.match('Android');
            if (isiOS) {
                this.Phonesystem = 'IOS';
            } else if (isAndroid) {
                this.Phonesystem = 'Android';
            }
        },
        getUrlPramse(version) {
            if (!version) return;
            let versionOne = JSON.parse(JSON.stringify(version)).replace(/[^0-9]/gi, '');
            let url = {
                huawei: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_huawei.apk`,
                one: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_k-one-store.apk`,
                xphoenixswap: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_xphoenixswap.apk`,
                '520club': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_520club.apk`,
                koc1: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc1.apk`,
                koc2: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc2.apk`,
                koc3: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc3.apk`,
                koc4: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc4.apk`,
                koc5: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc5.apk`,
                koc6: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc6.apk`,
                'vivo-store': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_vivo-store.apk`,
            };
            const { channel } = this.$route.query;
            switch (channel) {
                case 'huawei':
                    this.AndroidUrl = url.huawei;
                    break;
                case 'one':
                    this.AndroidUrl = url.one;
                    break;
                case 'xphoenixswap':
                    this.AndroidUrl = url.xphoenixswap;
                    break;
                case '520club':
                    this.AndroidUrl = url['520club'];
                    break;
                case 'koc1':
                    this.AndroidUrl = url['koc1'];
                    break;
                case 'koc2':
                    this.AndroidUrl = url['koc2'];
                    break;
                case 'koc3':
                    this.AndroidUrl = url['koc3'];
                    break;
                case 'koc4':
                    this.AndroidUrl = url['koc4'];
                    break;
                case 'koc5':
                    this.AndroidUrl = url['koc5'];
                    break;
                case 'koc6':
                    this.AndroidUrl = url['koc6'];
                    break;
                case 'vivo-store':
                    this.AndroidUrl = url['vivo-store'];
                    break;
            }
            this.getAirdrop();
        },
        async getAirdrop() {
            let headers = {
                language: this.locale,
                brand: 'web',
                os: 'ios',
                package: 'bitKeep',
                clientversion: '',
                token: '',
                im: '23423434324234324234',
                currency: 'usd',
                mylanguage: this.locale,
                seqnum: '',
                sig: '',
            };
            const { activity } = this.$route.query;
            if (activity) {
                const { data, status } = await this.$api.index.airdropDetail({ activityId: activity }, headers);
                if (status == 0) {
                    this.AFUrl = data.af_url == '' ? 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m' : data.af_url;
                } else {
                    this.AFUrl = 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m';
                }
            }
        },
        async getAndroidUrl() {
            const { data, status } = await this.$api.index.androidVersion({});
            if (status == 0) {
                let date = InitTime(data.update_time, 1, 10);
                let newData = date.split('-');
                this.AndroidUrl = data.url;
                this.AndroidVersion = data.version;
                this.update_time = newData[1] + '-' + newData[2] + '-' + newData[0];
                this.getUrlPramse(data.version); //H5下载链接
            }
        },
        handleScrollx() {
            // 获取视窗高度
            var domHight = document.body.offsetHeight;
            // dom滚动位置
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // 获取监听元素
            var id;
            // 获取监听元素本身高度
            var scrollHeight;
            // 获取监听元素距离视窗顶部距离
            var offsetTop;
            // 获取监听元素距离顶部高度-窗口高度
            var top;
            // 元素距离底部的高度+元素本身高度
            var bottom;
            id = this.$refs.pronbit;
            if (id == undefined) {
                return;
            }
            scrollHeight = id.scrollHeight;
            offsetTop = id.offsetTop;
            domHight = document.body.offsetHeight;
            top = offsetTop - domHight > 0 ? offsetTop - domHight : 0;
            bottom = scrollHeight + offsetTop;
            // 页面滚动位置 > 元素距离顶部高度-窗口高度 && 页面滚动位置 < 元素距离顶部高度+元素本身高度
            if (scrollTop >= top && scrollTop <= bottom) {
                this.isShowFoot = false;
            } else {
                this.isShowFoot = true;
            }
        },
        tabitemClick(Index) {
            this.tabIndex = Index;
            console.log(Index);
            $('#tab-item-bg').css({
                transform: 'translate3d(' + Index * $('#tab-item-bg').width() + 'px, 0, 0)',
            });
            $(document).scrollTop(Index * 650);
        },
        downloadTA(name, event, href) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            this.$Ta.track({
                name: 'Download_Click',
                data: {
                    download_type: name,
                },
            });
            window.open(href, '_blank');
        },
    },
    watch: {
        '$store.state.isPC': function (newVal, oldVal) {
            this.isMobile = !newVal;
            if (newVal == true) {
                window.removeEventListener('scroll', this.handleScrollx, true);
            }
        },
        $route(to, from) {
            const { type } = to.query;
            this.tabitemClick(Number(type));
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScrollx, true);
    },
};
</script>
<style lang="less" scoped>
.theme-light {
    .tab-box-bar {
        position: fixed;
        top: 63px;
        z-index: 1;
        box-sizing: border-box;
        height: 100px;
        width: 100%;
        padding: 20px 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(30px);
    }

    .tab-box {
        border: 1px solid #f2f2f5 !important;
    }

    .tab-box {
        position: relative;
        z-index: 100;
        box-sizing: border-box;
        width: 755px;
        height: 60px;
        border-radius: 10px;
        padding: 5px;
        margin: 0 auto;

        .tab-item-bg {
            position: absolute;
            width: 32.9%;
            height: 50px;
            border-radius: 6px;
            transition: transform 0.3s ease-in-out;
            transform: translate3d(0, 0, 0);
            z-index: 0;
        }

        .tab-item {
            float: left;
            width: 33%;
            height: 50px;
            font-size: 20px;
            line-height: 53px;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            z-index: 1;
            font-weight: bold;

            .icon-box {
                display: inline-block;
                width: 30px;
                height: 30px;
                margin-top: 10px;

                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }

            &.chrome {
                text-indent: 80px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 40px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_d84c2d70-15f3-11ec-b6c7-d1db1ffcfe5e.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.android {
                text-indent: 100px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 60px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_1e13a260-1546-11ec-9fff-c998cd52200b.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.ios {
                text-indent: 120px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 80px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_1e13c970-1546-11ec-9fff-c998cd52200b.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.on {
                &.chrome {
                    text-indent: 80px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 40px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_0b448790-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }

                &.android {
                    text-indent: 100px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 60px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_bea2f4c0-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }

                &.ios {
                    text-indent: 120px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 80px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_bea31bd0-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }
            }
        }
    }
}

.theme-dark {
    .tab-box-bar {
        position: fixed;
        top: 63px;
        z-index: 1;
        box-sizing: border-box;
        height: 100px;
        width: 100%;
        padding: 20px 0;
    }

    .tab-box {
        position: relative;
        z-index: 100;
        box-sizing: border-box;
        width: 755px;
        height: 60px;
        border-radius: 10px;
        padding: 5px;
        margin: 0 auto;

        .tab-item-bg {
            position: absolute;
            width: 32.9%;
            height: 50px;
            border-radius: 6px;
            transition: transform 0.3s ease-in-out;
            transform: translate3d(0, 0, 0);
            z-index: 0;
        }

        .tab-item {
            float: left;
            width: 33%;
            height: 50px;
            font-size: 20px;
            line-height: 53px;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            z-index: 1;
            font-weight: bold;

            .icon-box {
                display: inline-block;
                width: 30px;
                height: 30px;
                margin-top: 10px;

                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }

            &.chrome {
                text-indent: 80px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 40px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_74f213b0-e704-11ec-a810-956323528725.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.android {
                text-indent: 100px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 60px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_76fd6cb0-e707-11ec-a810-956323528725.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.ios {
                text-indent: 120px;

                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 80px;
                    width: 30px;
                    height: 30px;
                    background: url(https://cdn.bitkeep.vip/u_b_e7e0e0d0-e705-11ec-a810-956323528725.png) no-repeat;
                    background-size: 100% auto;
                }
            }

            &.on {
                &.chrome {
                    text-indent: 80px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 40px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_0b448790-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }

                &.android {
                    text-indent: 100px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 60px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_bea2f4c0-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }

                &.ios {
                    text-indent: 120px;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 10px;
                        left: 80px;
                        width: 30px;
                        height: 30px;
                        background: url(https://cdn.bitkeep.vip/u_b_bea31bd0-9dfd-11ec-aac8-bf8a172584ab.png) no-repeat;
                        background-size: 100% auto;
                    }
                }
            }
        }
    }

    .android-btn-erweima {
        border: 1px solid #e5e5e5 !important;
    }

    .ios-btn-erweima {
        border: 1px solid #e5e5e5 !important;
    }
}

@media only screen and (min-width: 1100px) and (max-width: 1280px) {
    .chrom-content {
        height: 600px !important;

        .chrom-left {
            width: 450px !important;
        }

        .chrom-right {
            width: 420px !important;
        }
    }
}

@media only screen and (min-width: 780px) and (max-width: 1100px) {
    .downloadPage {
        .android-content {
            height: 500px !important;

            .android-left {
                width: 210px !important;
                height: 400px !important;
                margin-left: 18% !important;
            }

            .android-right {
                width: 400px !important;
                margin-top: 124.88px !important;
            }
        }

        .ios-content {
            height: 500px !important;

            .ios-left {
                width: 210px !important;
                height: 400px !important;
                margin-left: 20px !important;
            }

            .ios-right {
                width: 400px !important;
                margin-left: 18% !important;
                margin-top: 124px !important;
            }
        }

        .chrom-content {
            height: 500px !important;

            .chrom-left {
                width: 380px !important;
                margin-left: 8% !important;
            }

            .chrom-right {
                width: 350px !important;
                margin-left: 20px !important;
            }
        }
    }
}

.downloadPage {
    .contbox {
        position: relative;
        max-width: 1500px;
        min-width: 300px;
        margin: 0 auto;
        overflow: hidden;
    }

    h1,
    h2 {
        font-size: 41px;
        font-weight: 600 !important;
    }

    .one {
        width: 100%;

        .one-box {
            position: relative;
            padding-top: 160px;

            .adots {
                position: absolute;
                width: 106px;
                height: 174px;
                left: 80px;
                top: 150px;

                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }

            .tab-content {
                width: 100%;
                overflow: hidden;

                .tab-content-item {
                    height: 650px;

                    .title-p {
                        font-size: 20px;
                        font-weight: 300;
                    }

                    .chrom-info {
                        line-height: 16px;
                        color: #707076;
                        margin-top: 95px !important;

                        p {
                            margin-bottom: 10px;
                        }
                    }
                }

                .chrom-content {
                    overflow: hidden;

                    .chrom-left {
                        float: left;
                        width: 496px;
                        height: auto;
                        margin-left: 11%;
                        margin-top: 93px;

                        img {
                            width: 100%;
                            height: auto;
                        }
                    }

                    .chrom-right {
                        float: left;
                        width: 544px;
                        margin-top: 93px;
                        margin-left: 100px;

                        .chrom-info {
                            margin-top: 96px;

                            p {
                                margin-bottom: 10px;
                            }
                        }

                        .chrom-download-url {
                            margin-top: 20px;
                            height: 40px;
                            position: relative;

                            .chrom-btn-item {
                                float: left;
                                margin-right: 10px;

                                .chromeImg {
                                    width: 185.6px;
                                    height: auto;
                                }

                                img {
                                    width: 134.4px;
                                    height: auto;
                                }
                            }
                        }
                    }
                }

                .android-content {
                    height: 650px;
                    position: relative;
                    overflow: hidden;

                    .android-left {
                        float: left;
                        width: 288px;
                        height: 500px;
                        margin-left: 23%;
                        margin-top: 64px;

                        img {
                            width: 100%;
                            height: auto;
                        }
                    }

                    .android-arrow {
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        left: 50%;
                        bottom: 80px;

                        img {
                            display: block;
                            width: 100%;
                            height: auto;
                        }
                    }

                    .android-right {
                        float: left;
                        width: 480px;
                        margin-left: 10px;
                        margin-top: 154.88px;

                        .chrom-info {
                            margin-top: 96px;

                            p {
                                margin-bottom: 10px;
                            }
                        }

                        .android-download-url {
                            width: 134.4px;
                            height: 40px;
                            margin-top: 10px;

                            img {
                                display: block;
                                width: 100%;
                                height: auto;
                            }
                        }

                        .hack-download {
                            cursor: pointer;
                        }

                        .android-btn-box {
                            margin-top: 20px;
                            height: 40px;
                            position: relative;

                            .android-btn-item {
                                float: left;
                                margin-right: 10px;

                                img {
                                    width: 134.4px;
                                    height: auto;
                                }
                            }

                            .android-btn-erweima {
                                position: absolute;
                                left: 291.2px;
                                bottom: 0;
                                width: 82px;
                                border: 1px solid #0e1b40;
                                border-radius: 8px;

                                img {
                                    display: block;
                                    width: 66px;
                                    height: auto;
                                    margin: 9px 9px 0;
                                }

                                span {
                                    display: block;
                                    text-align: center;
                                    font-size: 11px;
                                }
                            }
                        }
                    }
                }

                .ios-content {
                    overflow: hidden;

                    .ios-left {
                        float: left;
                        width: 288px;
                        height: 500px;
                        margin-left: 100px;
                        margin-top: 64px;

                        img {
                            width: 100%;
                            height: auto;
                        }
                    }

                    .ios-right {
                        float: left;
                        margin-left: 20%;
                        margin-top: 154.88px;
                        width: 480px;

                        .chrom-info {
                            margin-top: 110px;

                            p {
                                margin-bottom: 10px;
                            }
                        }

                        .ios-download-url {
                            width: 134.4px;
                            height: 40px;
                            margin-top: 10px;

                            img {
                                display: block;
                                width: 100%;
                                height: auto;
                            }
                        }

                        .hack-download {
                            cursor: pointer;
                        }

                        .ios-btn-box {
                            margin-top: 20px;
                            position: relative;
                            height: 40px;

                            .ios-btn-item {
                                float: left;
                                margin-right: 10px;

                                img {
                                    width: 134.4px;
                                    height: auto;
                                }
                            }

                            .ios-btn-erweima {
                                position: absolute;
                                left: 291.2px;
                                bottom: 0;
                                width: 82px;
                                border: 1px solid #0e1b40;
                                border-radius: 8px;

                                img {
                                    display: block;
                                    width: 66px;
                                    height: auto;
                                    margin: 9px 9px 0;
                                }

                                span {
                                    display: block;
                                    text-align: center;
                                    font-size: 11px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .tab-box-bar {
            position: fixed;
            top: 63px;
            z-index: 1;
            box-sizing: border-box;
            height: 100px;
            width: 100%;
            padding: 20px 0;
            backdrop-filter: blur(30px);
        }
    }
}

.mobiledownloadPage {
    padding-top: 60px;

    .detail_box_bigTitle {
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        padding: 0 20px;

        h1 {
            font-size: 28px;
            line-height: 1.3;
            font-weight: 600;
            // font-family: "HYQiHei";
            text-align: center;
        }
    }

    .detail_box_bigTitle_content {
        font-size: 14px;
        font-weight: 400;
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 0 40px;
        margin-top: 6px;
    }

    .detail_box_img {
        width: 100%;
        display: flex;
        justify-content: center;

        img {
            width: 100%;
            height: auto;
        }
    }

    .detail_bottom {
        padding-bottom: 40px !important;
    }

    .detail_box_text {
        padding: 0 20px;
        text-align: center;
        margin-top: 60px;

        > img {
            width: 100%;
        }

        .detail_box_text_title {
            font-size: 24px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            margin-top: 10px;
            line-height: 1.3;
        }

        .detail_box_text_content {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            margin-top: 4px;
        }
    }

    .setWidth {
        width: 562px !important;
    }

    .download {
        box-sizing: border-box;
        position: fixed;
        z-index: 100;
        bottom: 0;
        width: 100%;
        padding: 0px 16px 16px 16px;
        border-top: 1px solid;
        box-sizing: border-box;

        .Btnbetween {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                margin-right: 20px;
            }
        }

        a {
            display: block;
            width: 100%;
            margin: 12px 0 0;
            border: 1px solid #fff;
            border-radius: 6px;

            img {
                display: block;
                width: 100%;
            }
        }

        .version {
            width: 100%;
            color: #9ca5b3;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
        }
    }

    .setFont {
        font-size: 12px;
    }

    a {
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        -moz-tap-highlight-color: transparent;
    }
}
</style>
