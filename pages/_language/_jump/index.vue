<template>
    <div class="mobiledownloadPage">
        <div class="detail_box">
            <div class="detail_box_bigTitle">
                <h1 class="text1" v-html="$t('DownlaodPage.h5Page.aboutWeb3')"></h1>
            </div>
            <div class="detail_box_bigTitle_content text1">
                {{ $t("DownlaodPage.h5Page.mainnets") }}
            </div>
            <div class="detail_box_img">
                <img src="https://cdn.bitkeep.vip/u_b_871ea130-01c5-11ed-859d-e33d95963497.svg+xml" alt=""
                    class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_b16ef940-22ad-11ed-ac51-451ad2fa7963.svg+xml" alt=""
                    class="dark_icon" />
            </div>
            <div class="downLoadImg" ref="pronbit" v-if="Phonesystem == 'IOS'">
                <div class="isChina" v-if="locale == 'zh'">
                    <div class="downLoadImg_one">
                        <a href="https://testflight.apple.com/join/gMNlVK4J" target="_blank"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')">
                            <img src="https://cdn.bitkeep.vip/u_b_7d078e10-0408-11ed-ab63-99e82465c3d2.png" alt="" />
                            <span>{{ $t('DownlaodPage.h5Page.TestFlightDown') }}</span>
                            <span></span>
                        </a>
                    </div>
                    <div class="downLoadImg_two">
                        <a :href="appStore" target="_blank"
                            @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_95786be0-0408-11ed-ab63-99e82465c3d2.png" alt=""
                                class="light_icon" />
                            <img src="https://cdn.bitkeep.vip/u_b_42c180c0-2227-11ed-ac51-451ad2fa7963.png" alt=""
                                class="dark_icon" />
                            <div>
                                <span class="text1">{{ $t('DownlaodPage.h5Page.AppStore') }}</span><br />
                                <span class="text2">{{ $t('DownlaodPage.h5Page.AppStorehai') }}</span>
                            </div>
                            <span></span>
                        </a>
                    </div>
                </div>
                <div class="isOverseas" v-else>
                    <div class="downLoadImg_two">
                        <a href="https://testflight.apple.com/join/gMNlVK4J"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')">
                            <img src="https://cdn.bitkeep.vip/u_b_7d078e10-0408-11ed-ab63-99e82465c3d2.png" alt="" />
                            <div>
                                <span class="text1 setFont">{{ $t('DownlaodPage.h5Page.TestFlightDown') }}</span>
                            </div>
                            <span></span>
                        </a>
                    </div>
                    <div class="downLoadImg_one">
                        <a :href="appStore" @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_37e77360-040b-11ed-8650-39d663452ddf.png" alt="" />
                            <span class="setFont">{{ $t('DownlaodPage.h5Page.AppStore') }}</span>
                            <span></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="downLoadImg" ref="pronbit" v-else>
                <div class="isChina" v-if="locale == 'zh'">
                    <div class="downLoadImg_one">
                        <a :href="AndroidUrl" @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_781d5e70-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                            <span>{{ $t('DownlaodPage.h5Page.AndroidAPK') }}</span>
                            <span></span>
                        </a>
                    </div>

                    <div class="downLoadImg_two">
                        <a :href="AFUrl" @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_8d3ca040-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                            <div>
                                <span class="text1">{{ $t('DownlaodPage.h5Page.GooglePlay') }}</span><br />
                                <span class="text2">{{ $t('DownlaodPage.h5Page.GooglePlayUser') }}</span>
                            </div>
                            <span></span>
                        </a>
                    </div>
                </div>
                <div class="isOverseas" v-else>
                    <div class="downLoadImg_two">
                        <a :href="AndroidUrl" @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_781d5e70-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                            <div>
                                <span class="text1 setFont">{{ $t('DownlaodPage.h5Page.AndroidAPK') }}</span>
                            </div>
                            <span></span>
                        </a>
                    </div>
                    <div class="downLoadImg_one">
                        <a :href="AFUrl" @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_8d3ca040-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                            <span class="setFont">{{ $t('DownlaodPage.h5Page.GooglePlay') }}</span>
                            <span></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_f0964e70-01c9-11ed-87df-e7400131c7ee.svg+xml" alt=""
                    class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3822b60-1e4c-11ed-b236-f769417b9aed.png" alt=""
                    class="dark_icon" />
                <p class="detail_box_text_title text1">
                    {{ $t('DownlaodPage.h5Page.BitKeepCrypto') }}
                </p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.BitKeepCryptoInfo') }}
                </p>
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_2f6a7c10-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt=""
                    class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e381b630-1e4c-11ed-b236-f769417b9aed.png" alt=""
                    class="dark_icon" />
                <p class="detail_box_text_title text1">{{ $t('DownlaodPage.h5Page.Private') }}</p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.Privateinfo') }}
                </p>
            </div>
            <div class="detail_box_text">
                <img src="https://cdn.bitkeep.vip/u_b_4bf63950-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt=""
                    class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3825270-1e4c-11ed-b236-f769417b9aed.png" alt=""
                    class="dark_icon" />
                <p class="detail_box_text_title text1">
                    {{ $t('DownlaodPage.h5Page.esayTransaction') }}
                </p>
                <p class="detail_box_text_content text1">
                    {{ $t('DownlaodPage.h5Page.esayTransactionInfo') }}
                </p>
            </div>
            <div class="detail_box_text detail_bottom">
                <img src="https://cdn.bitkeep.vip/u_b_70c76ce0-01cb-11ed-8798-bb9e19a323f4.svg+xml" alt=""
                    class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_e3825271-1e4c-11ed-b236-f769417b9aed.png" alt=""
                    class="dark_icon" />
                <p class="detail_box_text_title text1"> {{ $t('DownlaodPage.h5Page.nftMarket') }}</p>
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
                    <a href="https://testflight.apple.com/join/gMNlVK4J"
                        @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')">
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
                    <a class="btnDwonload" :href="AndroidUrl"
                        @click="downloadTA('downloadAndroid_APK', $event, AndroidUrl)">
                        <img src="https://cdn.bitkeep.vip/u_b_337433c0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                    </a>
                </div>
            </div>
        </div>
        <div class="downloadFoot" v-show="isShowFoot">
            <div class="download BG0 lineBG3" id="IosBtnen" v-if="Phonesystem == 'IOS'">
                <div class="version">BitKeep V <span class="j_v">{{ AndroidVersion }}</span></div>
                <div v-if="locale == 'zh'" class="Btnbetween">
                    <div class="left">
                        <a class="iosUrl" :href="appStore"
                            @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_333fb640-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1">
                        </a>
                    </div>
                    <div class="right">
                        <a href="https://testflight.apple.com/join/gMNlVK4J"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"><img
                                src="https://cdn.bitkeep.vip/u_b_33413ce0-d0ba-11eb-a1fd-1b9796c35a14.png"
                                alt="btn2"></a>
                    </div>
                </div>
                <div v-else class="Btnbetween">
                    <div class="left">
                        <a class="iosUrl" :href="appStore" target="_blank"
                            @click="downloadTA('downloadIOS_appStore', $event, appStore)">
                            <img src="https://cdn.bitkeep.vip/u_b_333f4110-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1">
                        </a>
                    </div>
                    <div class="right">
                        <a href="https://testflight.apple.com/join/gMNlVK4J"
                            @click="downloadTA('downloadIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')">
                            <img src="https://cdn.bitkeep.vip/u_b_33418b00-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2">
                        </a>
                    </div>
                </div>

            </div>
            <div class="download BG0 lineBG3" id="AndroidBtnen" v-else>
                <div class="version">BitKeep V <span class="j_v">{{ AndroidVersion }}</span></div>
                <div v-if="locale == 'zh'" class="Btnbetween">
                    <div class="left">
                        <a class="AndriodUrl" :href="AFUrl"
                            @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_33400460-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn3">
                        </a>
                    </div>
                    <div class="right">
                        <a class="btnDwonload j_androidMarkBtn j_btnDwonload" :href="AndroidUrl"
                            @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)"><img
                                src="https://cdn.bitkeep.vip/u_b_333f6820-d0ba-11eb-a1fd-1b9796c35a14.png"
                                alt="btn4"></a>
                    </div>
                </div>
                <div v-else class="Btnbetween">
                    <div class="left">
                        <a class="AndriodUrl" target="_blank" :href="AFUrl"
                            @click="downloadTA('downloadAndriod_GooglePlay', $event, AFUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_33740cb0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1">
                        </a>
                    </div>
                    <div class="right">
                        <a class="btnDwonload j_androidMarkBtn j_btnDwonload" :href="AndroidUrl"
                            @click="downloadTA('downloadAndriod_APK', $event, AndroidUrl)">
                            <img src="https://cdn.bitkeep.vip/u_b_337433c0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { InitTime } from '@/tools/common'
export default {
    name: 'JumpPage',
    layout: 'jump/default',
    scrollToTop: false,
    head() {
        const { language } = this.$route.params;
        return {
            title: this.$t('DownlaodPage.Title'),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('DownlaodPage.Keyword') },
                { hid: 'description', name: 'description', content: this.$t('DownlaodPage.Description') },
            ]
        }
    },
    data() {
        return {
            locale: this.$store.state.locale,
            hostIsCom: this.$store.state.hostIsCom,
            Phonesystem: "",
            AndroidUrl: "",
            AndroidVersion: null,
            appStore: 'https://itunes.apple.com/app/bitkeep/id1395301115',
            AFUrl: "https://play.google.com/store/apps/details?id=com.bitkeep.wallet",
            isShowFoot: false,
            update_time: "",
        }
    },
    async asyncData(app) {
        const { params } = app.route;
        if (params.jump.indexOf("jump") == -1) {
            app.redirect(301, '/en/index')
        }
        return {
            jump: params.jump,
            locale: params.language
        }
    },
    mounted() {
        this.getAndroidUrl()
        this.HandleSys()
        window.addEventListener("scroll", this.handleScrollx, true);
        window.scrollTo(0, 0);
        setTimeout(() => {
            switch (this.jump) {
                case 'jump':
                    this.$router.push({
                        path: '/' + this.locale + '/jump1'
                    })
                    break;
                case 'jump1':
                    this.$router.push({
                        path: '/' + this.locale + '/jump2'
                    })
                    break;
                case 'jump2':
                    this.$router.push({
                        path: '/' + this.locale + '/jump3'
                    })
                    break;
                case 'jump3':
                    this.$router.push({
                        path: '/' + this.locale + '/jump4'
                    })
                    break;
                case 'jump4':
                    this.$router.push({
                        path: '/' + this.locale + '/jump5'
                    })
                    break;
                case 'jump5':
                    this.$router.push({
                        path: '/' + this.locale + '/jump6'
                    })
                    break;
                case 'jump6':
                    this.$router.push({
                        path: '/' + this.locale + '/jump7'
                    })
                    break;
                case 'jump7':
                    this.$router.push({
                        path: '/' + this.locale + '/jump8'
                    })
                    break;
                case 'jump8':
                    this.$router.push({
                        path: '/' + this.locale + '/jump9'
                    })
                    break;
                case 'jump9':
                    this.$router.push({
                        path: '/'
                    })
                    break;
                default:
                    this.$router.push({
                        path: '/'
                    })
                    break;
            }
        }, 5000)
    },
    methods: {
        HandleSys() {
            let isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod'),
                isAndroid = navigator.userAgent.match('Android');
            if (isiOS) {
                this.Phonesystem = "IOS"
            } else if (isAndroid) {
                this.Phonesystem = "Android"
            }
        },
        getUrlPramse(version) {
            if (!version) return;
            let versionOne = JSON.parse(JSON.stringify(version)).replace(/[^0-9]/ig, '');
            let url = {
                huawei: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_huawei.apk`,
                one: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_k-one-store.apk`,
                xphoenixswap: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_xphoenixswap.apk`,
                '520club': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_520club.apk`,
                'koc1': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc1.apk`,
                'koc2': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc2.apk`,
                'koc3': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc3.apk`,
                'koc4': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc4.apk`,
                'koc5': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc5.apk`,
                'koc6': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc6.apk`,
                'vivo-store': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_vivo-store.apk`,
            }
            const { channel } = this.$route.query;
            switch (channel) {
                case "huawei":
                    this.AndroidUrl = url.huawei;
                    break;
                case "one":
                    this.AndroidUrl = url.one
                    break;
                case "xphoenixswap":
                    this.AndroidUrl = url.xphoenixswap
                    break;
                case "520club":
                    this.AndroidUrl = url['520club']
                    break;
                case "koc1":
                    this.AndroidUrl = url['koc1']
                    break;
                case "koc2":
                    this.AndroidUrl = url['koc2']
                    break;
                case "koc3":
                    this.AndroidUrl = url['koc3']
                    break;
                case "koc4":
                    this.AndroidUrl = url['koc4']
                    break;
                case "koc5":
                    this.AndroidUrl = url['koc5']
                    break;
                case "koc6":
                    this.AndroidUrl = url['koc6']
                    break;
                case "vivo-store":
                    this.AndroidUrl = url['vivo-store']
                    break;
            }
            this.getAirdrop()
        },
        async getAirdrop() {
            let headers = {
                'language': this.locale,
                'brand': 'web',
                'os': 'ios',
                'package': 'bitKeep',
                'clientversion': '',
                'token': '',
                'im': '23423434324234324234',
                'currency': 'usd',
                'mylanguage': this.locale,
                'seqnum': '',
                'sig': ''
            }
            const { activity } = this.$route.query
            if (activity) {
                const { data, status } = await this.$api.index.airdropDetail({ activityId: activity }, headers)
                if (status == 0) {
                    this.AFUrl = data.af_url == '' ? 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m' : data.af_url;
                } else {
                    this.AFUrl = 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m';
                }
            }
        },
        async getAndroidUrl() {
            const { data, status } = await this.$api.index.androidVersion({})
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
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
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
        downloadTA(name, event, href) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            this.$Ta.track({
                name: 'Download_Click', data: {
                    download_type: name
                }
            })
            window.open(href, '_blank')
        },
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScrollx, true)
    }
}
</script>
<style lang="less" scoped>
.mobiledownloadPage {
    .detail_box {
        padding-bottom: 150px;
    }

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

    .downLoadImg {
        padding: 0 20px;
        margin-top: 16px;

        .downLoadImg_one {
            height: 50px;
            background: #0e0e0e;
            display: flex;
            align-items: center;
            border-radius: 8px;
            justify-content: space-between;
            line-height: 50px;
            position: relative;
            padding: 0 11px;
            margin: 10px 0px;

            a {
                display: flex;
                align-items: center;
            }

            img {
                width: 32px;
                height: 32px;
                vertical-align: middle;
            }

            span {
                font-size: 16px;
                font-weight: 600;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                white-space: nowrap;
            }

            .setFont {
                font-size: 16px;
                font-weight: 600;
            }
        }

        .downLoadImg_two {
            height: 50px;
            display: flex;
            align-items: center;
            border: 1px solid #000000;
            border-radius: 8px;
            justify-content: space-between;
            padding: 0 11px;
            position: relative;

            a {
                display: flex;
                align-items: center;
            }

            img {
                width: 32px;
                height: 32px;
                vertical-align: baseline;
            }

            div {
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                display: flex;
                flex-direction: column;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                display: inline-block;

                span:first-child {
                    font-size: 16px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                span:last-child {
                    font-size: 12px;
                    font-weight: 400;
                }
            }
        }

        .setFont {
            font-size: 16px !important;
            font-weight: 600 !important;
        }
    }

    .detail_bottom {
        padding-bottom: 40px !important;
    }

    .detail_box_text {
        padding: 0 20px;
        text-align: center;
        margin-top: 60px;

        >img {
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
        max-width: 750px;
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
