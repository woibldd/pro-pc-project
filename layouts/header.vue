<template>
    <header class="header-container">
        <div class="noticeBar pc-mode" v-if="showTips && isPC">
            <div>
                <span>
                    <img src="https://cdn.bitkeep.vip/u_b_7942d550-188a-11ed-8ccc-418f24cba528.png" alt="" />
                    {{ $t('IndexPage.noticeBar') }}
                </span>
            </div>
        </div>
        <div class="noticeBar h5-mode" v-if="showTips && !isPC">
            <div>
                <img src="https://cdn.bitkeep.vip/u_b_7942d550-188a-11ed-8ccc-418f24cba528.png" alt="" />
            </div>
            <span class="sport-son">{{ $t('IndexPage.noticeBar') }}</span>
            <p class="rightBox"></p>
        </div>
        <div v-if="$store.state.headerDownloadTipsIsShow && !isPC && showDownload" class="download-tooltips-box">
            <div class="logo-box">
                <img src="https://cdn.bitkeep.vip/u_b_def93a00-3aaa-11ed-9eb9-234fa355d1ff.svg+xml" alt="" />
            </div>
            <div class="info-box">
                <div class="title-logo-box">
                    <img src="https://cdn.bitkeep.vip/u_b_dc6792a0-3aaa-11ed-9eb9-234fa355d1ff.png" alt="" />
                </div>
                <div>
                    <span class="desc-box">{{ $t('IndexPage.one_1') }}</span>
                </div>
            </div>
            <a class="download-button" :href="`/${$store.state.locale}/download?type=${phoneSystem === 'IOS' ? 1 : 0}`"
                @click="jumpDownloadPage($event)"><span>{{ $t('INO.down') }}</span></a>
            <div class="close-button" @click="() => setHeaderDownloadTipsIsShow(false)">
                <a-icon type="close" :style="{ fontSize: '14px' }" />
            </div>
        </div>
        <div class="headerbox BG0blur">
            <div class="headleft">
                <div title="bitkeep">
                    <a :href="'/' + $store.state.locale + '/index'" title="BitKeep,  a best crypto wallet"
                        class="seo_href" @click="jumpUrl('bitkeep', $event, 'bitkeep')">
                        <img src="../assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet"
                            class="BitkeepLogo_light" /><img src="../assets/img/header/BK logo_dark.svg"
                            alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_dark" />
                    </a>
                </div>
                <div class="list">
                    <div class="item">
                        <div class="cur j_cur">
                            <p class="text1" :title="$t('header.headeritem1')">{{ $t('header.headeritem1') }}</p>
                            <span class="jian">
                                <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png"
                                    alt="triangle" class="light_icon" />
                                <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt="" />
                            </span>
                        </div>
                        <ul class="more BG0 lineBG2">
                            <li class="text1" :title="$t('header.headeritem1-item1')">
                                <a :title="$t('header.headeritem1-item1')"
                                    :href="$store.state.locale == 'en' ? '/download?type=1' : '/' + $store.state.locale + '/download?type=1'"
                                    class="seo_href text1" @click="jumpUrl('downloadIOS', $event, 'downloadIOS')">
                                    {{ $t('header.headeritem1-item1') }}
                                </a>
                            </li>
                            <li class="text1" :title="$t('header.headeritem1-item2')">
                                <a :title="$t('header.headeritem1-item2')"
                                    :href="$store.state.locale == 'en' ? '/download?type=0' : '/' + $store.state.locale + '/download?type=0'"
                                    class="seo_href text1"
                                    @click="jumpUrl('downloadAndroid', $event, 'downloadAndroid')">
                                    {{ $t('header.headeritem1-item2') }}
                                </a>
                            </li>
                            <li class="text1" :title="$t('header.headeritem1-item3')">
                                <a :title="$t('header.headeritem1-item3')"
                                    :href="$store.state.locale == 'en' ? '/download?type=2' : '/' + $store.state.locale + '/download?type=2'"
                                    class="seo_href text1" @click="jumpUrl('downloadChrome', $event, 'downloadChrome')">
                                    {{ $t('header.headeritem1-item3') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="item" v-if="hostIsCom">
                        <div class="cur j_cur">
                            <p :title="$t('header.headeritem9')">
                                <a :title="$t('header.headeritem9')" :href="'/' + $store.state.locale + '/swap'"
                                    class="seo_href text1" @click="jumpUrl('swap', $event, 'SWAP')">
                                    {{ $t('header.headeritem9') }}
                                </a>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="item" v-if="hostIsCom">
                        <div class="cur j_cur">
                            <p class="text1" :title='$t("header.headeritem8")'>
                                <a :title='$t("header.headeritem8")' :href='"/" + $store.state.locale + "/nft/freeMint"'
                                    class="seo_href text1"
                                    @click="jumpUrl('FreeMint', $event, 'NFT')">
                                    {{
                                    $t("header.headeritem8")
                                    }}
                                </a>
                            </p>
                        </div>
                    </div> -->
                    <div class="item" v-if="hostIsCom">
                        <div class="cur j_cur">
                            <p class="text1" :title='$t("header.headeritem8")'>{{$t("header.headeritem8")}}</p>
                            <span class="jian">
                                <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png"
                                    alt="triangle" class="light_icon" />
                                <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt="" />
                            </span>
                        </div>
                        <ul class="more BG0 lineBG2">
                            <li class="text1" title="Free Mints">
                                <a title="Free Mints" @click="jumpUrl('FreeMint', $event, 'NFT')" :href='"/" + $store.state.locale + "/nft/freeMint"' class="seo_href text1">
                                    Free Mints
                                </a>
                            </li>
                            <li class="text1" title="INO">
                                <a title="INO"
                                    @click="jumpUrl('INO', $event, 'NFT')" :href='"/" + $store.state.locale + "/INO"'
                                    class="seo_href text1">
                                    INO
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="item">
                        <div class="cur j_cur">
                            <p class="text1" :title="$t('header.headeritem3')">
                                <a :title="$t('header.headeritem3')" :href="'/' + $store.state.locale + '/dapp'"
                                    class="seo_href text1" @click="jumpUrl('dapp', $event, 'DAPP')">
                                    {{ $t('header.headeritem3') }}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="item" v-if="hostIsCom">
                        <div class="cur j_cur">
                            <p class="text1" title="GASU">
                                <a title="GASU" href="https://gasutopia.com" target="_blank" class="seo_href text1"
                                    @click="jumpUrl('GASU', $event, 'GASU')">
                                    GASU
                                </a>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="item">
                    <div class="cur j_cur">
                        <p class="text1" title='BKB' :class="$route.path.indexOf('bkb') != -1 ? 'Colorpurple' : ''">
                            <a title='BKB'
                                :href='($store.state.locale == "en" ? "/bkb" : "/" + $store.state.locale + "/bkb")'
                                class="seo_href text1" @click="jumpUrl('bkb', $event)">
                                BKB
                            </a>
                        </p>
                    </div>
                </div> -->
                    <div class="item">
                        <div class="cur j_cur" data="about">
                            <p class="text1" title="Business">Business</p>
                            <span class="jian">
                                <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png"
                                    alt="triangle" class="light_icon" />
                                <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt="" />
                            </span>
                        </div>
                        <ul class="more BG0 lineBG2">
                            <li class="text1" :title="$t('footer.footeritem2-item4')">
                                <a title="Business" @click="jumpUrl('business', $event, 'Business')" :href="`https://business.bitkeep${$store.state.hostChange}?lang=${
                                    $store.state.locale != 'zh' ? 'en' : $store.state.locale
                                }`" class="seo_href text1">
                                    Business
                                </a>
                            </li>
                            <li class="text1" :title="$t('header.headeritem7-item1')">
                                <a :title="$t('header.headeritem6')"
                                    :href="`https://docs.bitkeep${$store.state.hostChange}/guide/`"
                                    class="seo_href text1" @click="jumpUrl('Developers', $event, 'Developers')">
                                    {{ $t('header.headeritem6') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="item">
                        <div class="cur j_cur">
                            <p class="text1" title="GASU">
                                <a :title="$t('header.KnightRecruitment')"
                                    :href="'/' + $store.state.locale + '/recruiting'" target="_blank"
                                    class="seo_href text1" @click="jumpUrl('recruiting', $event, 'recruiting')">
                                    {{ $t('header.KnightRecruitment') }}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="cur j_cur" data="about">
                            <p class="text1" :title="$t('header.headeritem11')">{{ $t('header.headeritem11') }}</p>
                            <span class="jian">
                                <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png"
                                    alt="triangle" class="light_icon" />
                                <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt="" />
                            </span>
                        </div>
                        <ul class="more BG0 lineBG2">
                            <li class="text1" :title="$t('header.headeritem7-item1')">
                                <a :title="$t('header.headeritem5')" :href="
                                    `https://study.bitkeep${$store.state.hostChange}` + ($store.state.locale == 'ko' ? '/en' : '/' + $store.state.locale)
                                " class="seo_href text1" target="_blank"
                                    @click="jumpUrl('study', $event, 'study')">
                                    {{ $t('header.headeritem5') }}
                                </a>
                            </li>

                            <li class="text1" :title="$t('header.headeritem7-item2')">
                                <a :title="$t('header.headeritem4')"
                                    :href="`https://blog.bitkeep${$store.state.hostChange}` + ($store.state.locale == 'ko' ? '/kr' : '/' + $store.state.locale)"
                                    class="seo_href text1" @click="jumpUrl('blog', $event, 'blog')" target="_blank">
                                    {{ $t('header.headeritem4') }}
                                </a>
                            </li>
                            <li class="text1" :title="$t('header.headeritem7-item2')">
                                <a :title="$t('header.headeritem7-item2')" :href="'/' + $store.state.locale + '/jobs'"
                                    class="seo_href text1" @click="jumpUrl('jobs', $event, 'jobs')">
                                    {{ $t('header.headeritem7-item2') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="headright">
                <ul class="list">
                    <li class="connectWalletBox" v-click-outside="hideExit">
                        <div v-if="!address && isPC" class="connectWallet BGpurple Common_white" title="connectWallet"
                            @click="connectWallet('click')">
                            {{ $t('header.connectWallet') }}
                        </div>
                        <div v-if="address && isPC" class="connectWallet BGpurple Common_white" title="address"
                            @click="exitshow = true">
                            <img src="../assets/img/footer/Tab bar icon.svg" alt="address" />
                            {{ address | blurredDisplay }}
                        </div>
                        <div class="Exitconnection BG0 lineBG2" v-show="exitshow && address">
                            <div class="address BG1" @click="handleCopy(address)">
                                <span class="text1" :title="address">{{ address | blurredDisplay }}</span>
                                <img src="@/assets/img/header/copy_dark_icons.svg" alt="copy" v-show="copyshow"
                                    class="dark_icon" />
                                <img src="@/assets/img/header/copy_light_icons.svg" alt="copy" v-show="copyshow"
                                    class="light_icon" />
                                <span v-show="!copyshow" class="text3 copyed">{{ $t('header.copied') }}</span>
                            </div>
                            <div class="ExitBtn lineBG2" @click="Disconnect" :title="$t('header.exit')">
                                <img src="@/assets/img/header/exit.svg" alt="exit" />
                                {{ $t('header.exit') }}
                            </div>
                        </div>
                    </li>
                    <li :title="$t('header.download')" class="one-qrcode">
                        <div class="text1 downloadImg" :title="$t('header.download')">
                            <a :title="$t('header.download')" :href="'/' + $store.state.locale + '/download?type=0'"
                                class="seo_href text1" @click="jumpUrl('downloadAndroid', $event, 'Download')">
                                <img src="https://cdn.bitkeep.vip/u_b_0bf68c40-193d-11ed-a358-7fe0de42a4a9.png" alt=""
                                    class="themelight_icon" />
                                <img src="https://cdn.bitkeep.vip/u_b_01717ba0-193c-11ed-a358-7fe0de42a4a9.png"
                                    class="themedark_icon" alt="" />
                            </a>
                            <div class="one-erweima BG4">
                                <div class="one-erweima-box lineBG2">
                                    <img :src="qrcodeImage" alt="erweima" />
                                </div>
                                <div class="text1">{{ $t('IndexPage.downloadApp') }}</div>
                                <div class="one-download-btn" @click="jumpUrl('downloadChrome', $event, 'topQrcode')">{{ $t('IndexPage.downloadMore') }}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="language">
                            <div class="language-cur" :title="lang">
                                <p class="text1" :title="lang">
                                    <img src="https://cdn.bitkeep.vip/u_b_da4f0510-193b-11ed-a358-7fe0de42a4a9.png"
                                        alt="" class="themelight_icon" />
                                    <img src="https://cdn.bitkeep.vip/u_b_0170df60-193c-11ed-a358-7fe0de42a4a9.png"
                                        alt="" class="themedark_icon" />
                                </p>
                                <!-- <span>
                                <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png"
                                    alt="triangle" class="languagejian_light" />
                                <img src="../assets/img/header/icon_Triangle.svg" class="languagejian_dark"
                                    alt="triangle">
                            </span> -->
                            </div>
                            <div class="language-list BG0 lineBG2">
                                <ul>
                                    <li class="langItem text1" :title="$t('header.en')">
                                        <a :href="$route.path.replace($route.params.language, 'en')"
                                            :title="$t('header.en')" class="seo_href text1"
                                            @click="switchlanguage('en', 'English')">
                                            {{ $t('header.en') }}
                                        </a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.ko')">
                                        <a :href="$route.path.replace($route.params.language, 'ko')"
                                            class="seo_href text1" :title="$t('header.ko')"
                                            @click="switchlanguage('ko', '한국인')">{{ $t('header.ko') }}</a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.zh')">
                                        <a :href="$route.path.replace($route.params.language, 'zh')"
                                            :title="$t('header.zh')" class="seo_href text1"
                                            @click="switchlanguage('zh', '简体中文')">
                                            {{ $t('header.zh') }}
                                        </a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.tr')" v-if="addlanguage">
                                        <a :href="$route.path.replace($route.params.language, 'tr')"
                                            class="seo_href text1" :title="$t('header.tr')"
                                            @click="switchlanguage('tr', 'Türkçe')">{{ $t('header.tr') }}</a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.vi')" v-if="addlanguage">
                                        <a :href="$route.path.replace($route.params.language, 'vi')"
                                            class="seo_href text1" :title="$t('header.vi')"
                                            @click="switchlanguage('vi', 'Tiếng Việt')">{{ $t('header.vi') }}</a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.id')" v-if="addlanguage">
                                        <a :href="$route.path.replace($route.params.language, 'id')"
                                            class="seo_href text1" :title="$t('header.id')"
                                            @click="switchlanguage('id', 'Indonesian')">{{ $t('header.id') }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li title="theme">
                        <img src="@/assets/img/header/dark.svg" class="themelight_icon" alt="themelight"
                            @click="setTheme('dark')" />
                        <img src="@/assets/img/header/light.svg" class="themedark_icon" alt="themedark"
                            @click="setTheme('light')" />
                    </li>

                    <li class="head_slidemenu" @click="SlideMenushow = true">
                        <img src="@/assets/img/header/slideicon=list_light.svg" alt="" class="themelight_icon" />
                        <img src="@/assets/img/header/slideicon=list_dark.svg" alt="" class="themedark_icon" />
                    </li>
                </ul>
                <SlideMenu :SlideMenushow="SlideMenushow" @closeSlideMenushow="closeSlideMenushow"></SlideMenu>
            </div>
            <NotInstalled :InstalledShow="InstalledShow" @closeInstalledShow="closeInstalledShow"></NotInstalled>
            <AlreadyInstalled :AlreadyInstalledShow="AlreadyInstalledShow"
                @closeAlreadystalledShow="closeAlreadystalledShow"></AlreadyInstalled>
        </div>
    </header>
</template>
<script>
import '@/filter/filter';
import ClickOutside from 'vue-click-outside';
import { mapMutations, mapGetters } from 'vuex';
import copy from 'copy-to-clipboard';
import NotInstalled from '../components/isInstallModel/notInstalled.vue';
import AlreadyInstalled from '../components/isInstallModel/alreadyInstalled.vue';
import SlideMenu from '../components/slideMenu/slideMenu.vue';
import { wallet } from '@/utils/wallet';
import { toUrl } from '@/tools/common';
import { getQrcodeImage } from '@/utils/qrcode';

export default {
    name: 'DefaultHeader',
    data() {
        let lang;
        const { language } = this.$route.params;
        switch (language) {
            case 'zh':
                lang = '简体中文';
                break;
            case 'en':
                lang = 'English';
                break;
            case 'ko':
                lang = '한국인';
                break;
            case 'vi':
                lang = 'Tiếng Việt';
                break;
            case 'id':
                lang = 'Indonesian';
                break;
            case 'tr':
                lang = 'Türkçe';
                break;
            default:
                lang = 'English';
                break;
        }
        return {
            address: '',
            chainId: '',
            InstalledShow: false,
            AlreadyInstalledShow: false,
            SlideMenushow: false,
            lang,
            exitshow: false,
            copyshow: true,
            isPC: this.$store.state.isPC,
            hostIsCom: this.$store.state.hostIsCom,
            addlanguage: this.$store.state.addlanguage,
            language,
            showTips: false,
            showDownload: false,
            phoneSystem: '',
        };
    },
    head() {
        let bitkeep_theme = this.GetTheme();
        this.$cookies.set('bitkeep_theme', bitkeep_theme);
        return {
            bodyAttrs: {
                class:
                    bitkeep_theme === 'dark'
                        ? this.language == 'en'
                            ? 'theme-dark ENletter'
                            : 'theme-dark'
                        : this.language == 'en'
                            ? 'theme-light ENletter'
                            : 'theme-light',
            },
        };
    },
    components: { NotInstalled, AlreadyInstalled, SlideMenu },
    beforeMount() {
        setTimeout(() => {
            if (localStorage.getItem('connectorId')) {
                this.addressinit();
            } else {
                this.init();
            }
        }, 500);
        // this.$nextTick(() => {
        //默认连接关闭
        // this.connectWallet()
        // })
    },
    mounted() {
        this.showTips = this.needShowTips();
        this.showDownload = this.needShowDownload();
        this.initPhoneSystem();
    },
    computed: {
        qrcodeImage() {
            return getQrcodeImage(this.$store.state.locale);
        },
    },
    watch: {
        $route() {
            this.showTips = this.needShowTips();
            this.showDownload = this.needShowDownload();
        },
        '$store.state.address': function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal);
                this.addressinit();
            }
        },
        '$store.state.isPC': function (newVal, oldVal) {
            this.isPC = newVal;
        },
        '$store.state.addlanguage': function (newVal, oldVal) {
            this.addlanguage = newVal;
        },
    },
    methods: {
        ...mapGetters(['GetTheme']),
        ...mapMutations({ setHeaderDownloadTipsIsShow: 'setHeaderDownloadTipsIsShow' }),
        initPhoneSystem() {
            const isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod');
            const isAndroid = navigator.userAgent.match('Android');

            if (isiOS) this.phoneSystem = 'IOS';
            else if (isAndroid) this.phoneSystem = 'Android';
        },
        needShowDownload() {
            const path = window.location.pathname;
            return path === '/' || /\/[a-zA-Z]{2}\/index$/.test(path);
        },
        needShowTips() {
            const path = window.location.pathname;
            return this.$store.state.locale === 'zh' && (path === '/' || /\/[a-zA-Z]{2}\/index$/.test(path));
        },
        hideExit() {
            this.exitshow = false;
        },
        Disconnect() {
            this.exitshow = false;
            localStorage.removeItem('connectorId');
            this.init();
        },
        handleCopy(data) {
            if (!data) {
                this.$message.warning(this.$t('header.Nocopy'));
                return;
            }
            this.copyshow = false;
            copy(data);
            setTimeout(() => {
                this.copyshow = true;
            }, 500);
            // this.$message.success(this.$t('header.copySuccess'))
        },
        init() {
            this.address = '';
            this.changeWalletID('');
            this.changeAddress('');
            this.changeChainId('');
            if (window.bitkeep) {
                window.bitkeep.ethereum.removeAllListeners && window.bitkeep.ethereum.removeAllListeners();
            }
        },
        jumpDownloadPage(event) {
            const name = this.phoneSystem === 'IOS' ? 'downloadIOS' : 'downloadAndroid';
            this.$Ta.track({
                name: 'Bitkeep__Page',
                data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: 102,
                    Action_Location_Name: 'h5_download_nav',
                    Action_Sub_Id: 1,
                    Action_Sub_Name: 'download',
                },
            });
            toUrl(name, event, this);
        },
        jumpUrl(name, event, TANAME) {
            let Location_Id, Action_Location_Name, Action_Sub_Id, Action_Sub_Name;
            switch (TANAME) {
                case 'bitkeep':
                    Location_Id = 1;
                    Action_Location_Name = TANAME;
                    break;
                case 'downloadIOS':
                    Location_Id = 2;
                    Action_Location_Name = 'wallet';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 1;
                    break;
                case 'downloadAndroid':
                    Location_Id = 2;
                    Action_Location_Name = 'wallet';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 2;
                    break;
                case 'downloadChrome':
                    Location_Id = 2;
                    Action_Location_Name = 'wallet';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 3;
                    break;
                case 'SWAP':
                    Location_Id = 3;
                    Action_Location_Name = TANAME;
                    break;
                case 'NFT':
                    Location_Id = 4;
                    Action_Location_Name = TANAME;
                    break;
                case 'DAPP':
                    Location_Id = 5;
                    Action_Location_Name = TANAME;
                    break;
                case 'GASU':
                    Location_Id = 6;
                    Action_Location_Name = TANAME;
                    break;
                case 'Business':
                    Location_Id = 7;
                    Action_Location_Name = 'Business';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 1;
                    break;
                case 'SubmitNFT':
                    Location_Id = 7;
                    Action_Location_Name = 'Business';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 2;
                    break;
                case 'Developers':
                    Location_Id = 7;
                    Action_Location_Name = 'Business';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 3;
                    break;
                case 'recruiting':
                    Location_Id = 11;
                    Action_Location_Name = 'Recruiting';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 1;
                    break;
                case 'study':
                    Location_Id = 8;
                    Action_Location_Name = 'More';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 1;
                    break;
                case 'blog':
                    Location_Id = 8;
                    Action_Location_Name = 'More';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 2;
                    break;
                case 'jobs':
                    Location_Id = 8;
                    Action_Location_Name = 'More';
                    Action_Sub_Name = TANAME;
                    Action_Sub_Id = 3;
                    break;
                case 'Download':
                    Location_Id = 10;
                    Action_Location_Name = 'Download';
                    break;
                case 'topQrcode':
                    Location_Id = 13;
                    Action_Location_Name = 'other_download';
                    break;
                default:
                    Location_Id = 1;
                    Action_Location_Name = 'bitkeep';
                    break;
            }
            const { ...Action_Sub } = {
                Action_Sub_Name: Action_Sub_Name,
                Action_Sub_Id: Action_Sub_Id,
            };
            if (Action_Sub_Name) {
                this.$Ta.track({
                    name: 'Bitkeep__Page',
                    data: {
                        Action_Location_Type: 'top',
                        Action_Location_Id: Location_Id,
                        Action_Location_Name: Action_Location_Name,
                        ...Action_Sub,
                    },
                });
            } else {
                this.$Ta.track({
                    name: 'Bitkeep__Page',
                    data: {
                        Action_Location_Type: 'top',
                        Action_Location_Id: Location_Id,
                        Action_Location_Name: Action_Location_Name,
                    },
                });
            }
            toUrl(name, event, this);
        },
        switchlanguage(Local, lang) {
            this.$Ta.track({
                name: 'Bitkeep__Page',
                data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: 11,
                    Action_Location_Name: 'switchlanguage',
                },
            });
            const { ...query } = this.$route.query;
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            let { path } = this.$route;
            if (path != '/') {
                path = path.split('/');
                path.splice(1, 1, Local);
                this.$router.push({
                    path: path.join('/'),
                });
                this.changeLocal(Local);
            } else {
                this.$router.push({
                    path: '/' + Local + '/index',
                });
                this.changeLocal(Local);
            }
            this.lang = lang;
        },
        setTheme(theme) {
            this.$Ta.track({
                name: 'Bitkeep__Page',
                data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: 12,
                    Action_Location_Name: 'switchTheme',
                },
            });
            this.$cookies.set('bitkeep_theme', theme);
            this.changeTheme(theme);
            const theme_Local = theme == 'dark' ? 'theme-dark' : 'theme-light';
            document.getElementsByTagName('body')[0].setAttribute('class', theme_Local);
        },
        ...mapMutations(['changeLocal', 'changeTheme', 'changeAddress', 'changeChainId', 'changeWalletID']),
        async connectWallet(click) {
            this.$Ta.track({
                name: 'Bitkeep__Page',
                data: {
                    Action_Location_Type: 'top',
                    Action_Location_Id: 9,
                    Action_Location_Name: 'connectWallet',
                },
            });
            // 是否有 bitkeep 处理
            if (!wallet.isInstall()) {
                if (click) {
                    if (this.isPC) {
                        this.InstalledShow = true;
                    } else {
                        const { locale } = this.$store.state;
                        this.$router.push({
                            path: '/' + locale + '/download',
                            query: { type: 0 },
                        });
                        return false;
                    }
                } else {
                    if (sessionStorage.getItem('bitkeep_installed') && sessionStorage.getItem('bitkeep_installed') == 'true') {
                        this.InstalledShow = false;
                    } else {
                        if (this.isPC) {
                            this.InstalledShow = true;
                        } else {
                            const { locale } = this.$store.state;
                            this.$router.push({
                                path: '/' + locale + '/download',
                                query: { type: 0 },
                            });
                            return false;
                        }
                    }
                }
                sessionStorage.setItem('bitkeep_installed', 'true');
                this.init();
                return false;
            }
            try {
                if (!wallet.selectedAddress('bitkeep')) {
                    this.init();
                }
                const bitkeepaddress = await wallet.connect('bitkeep');
                this.chainId = await wallet.getChainId('bitkeep');
                const [address] = await wallet.getAccounts('bitkeep');
                //先这样实现功能 后续优化
                const walletID = await wallet.getWalletID('bitkeep');
                if (walletID) {
                    this.changeWalletID(walletID);
                } else {
                    window.BitKeepInvoke.getHeader(async (err, data) => {
                        if (data) {
                            const walletID = data.TOKEN;
                            this.changeWalletID(walletID);
                        }
                    });
                }
                this.address = address;
                this.changeAddress(this.address);
                this.changeChainId(this.chainId);
                localStorage.setItem('connectorId', 'injected');
                wallet.on('chainChanged', async () => {
                    this.chainId = await wallet.getChainId();
                    this.changeChainId(this.chainId);
                });
                wallet.on('accountsChanged', async () => {
                    const [address] = await wallet.getAccounts('bitkeep');
                    if (!address) {
                        this.init();
                        return false;
                    }
                    this.address = address;
                    this.changeAddress(this.address);
                    //先这样实现功能 后续优化
                    const walletID = await wallet.getWalletID('bitkeep');
                    if (walletID) {
                        this.changeWalletID(walletID);
                    } else {
                        window.BitKeepInvoke.getHeader(async (err, data) => {
                            if (data) {
                                const walletID = data.TOKEN;
                                this.changeWalletID(walletID);
                            }
                        });
                    }
                });
            } catch (error) {
                console.log(error);
                if (typeof error == 'object' && error.code != -32002) {
                    console.log(error);
                    this.init();
                    this.$message.error(typeof error == 'object' ? error.message : error);
                }
            }
        },
        async addressinit() {
            try {
                const [address] = await wallet.getAccounts('bitkeep');
                if (!address) {
                    this.init();
                    return false;
                }
                this.chainId = await wallet.getChainId('bitkeep');
                // 先这样实现功能 后续优化
                const walletID = await wallet.getWalletID('bitkeep');
                if (walletID) {
                    this.changeWalletID(walletID);
                } else {
                    window.BitKeepInvoke.getHeader(async (err, data) => {
                        if (data) {
                            const walletID = data.TOKEN;
                            this.changeWalletID(walletID);
                        }
                    });
                }
                this.address = address;
                this.changeAddress(this.address);
                this.changeChainId(this.chainId);
                wallet.initEvent();
                wallet.on('chainChanged', async () => {
                    this.chainId = await wallet.getChainId();
                    this.changeChainId(this.chainId);
                });
                wallet.on('accountsChanged', async () => {
                    const [address] = await wallet.getAccounts('bitkeep');
                    this.address = address;
                    this.changeAddress(this.address);
                    // 先这样实现功能 后续优化
                    const walletID = await wallet.getWalletID('bitkeep');
                    if (walletID) {
                        this.changeWalletID(walletID);
                    } else {
                        window.BitKeepInvoke.getHeader(async (err, data) => {
                            if (data) {
                                const walletID = data.TOKEN;
                                this.changeWalletID(walletID);
                            }
                        });
                    }
                });
            } catch (error) { }
        },
        closeSlideMenushow() {
            this.SlideMenushow = false;
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
    directives: {
        ClickOutside,
    },
};
</script>
<style lang="less" scoped>
@import '../assets/css/theme.less';

@media screen and (min-width: 1251px) {
    .headerbox .headleft .list {
        display: flex !important;
    }

    .headerbox .head_slidemenu {
        display: none !important;
    }
}

@media screen and (max-width: 1250px) {
    .headerbox .headleft .list {
        display: none !important;
    }

    .headerbox .head_slidemenu {
        display: flex !important;
    }
}

@media screen and (max-width: 750px) {
    .headerbox {
        width: 100%;
        height: 44px !important;

        .headleft {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 90px;
            height: 30px;

            img {
                margin-right: 0px !important;
            }

            .list {
                display: none;
            }
        }

        .headright {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .list {
                height: 100%;
                font-size: 14px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-weight: 500;

                li {
                    display: none !important;
                    line-height: 100%;

                    &.connectWalletBox {
                        display: flex !important;
                        margin-left: 0px;
                    }

                    &.head_slidemenu {
                        display: flex !important;
                        margin-left: 20px !important;
                    }
                }
            }
        }
    }
}

.theme-light {
    .noticeBar.pc-mode>div>span {
        color: #f76239;
    }

    .sport-son {
        color: #f76239;
    }

    .noticeBar {
        background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #ffffff !important;

        div,
        .rightBox {
            background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #ffffff !important;
        }
    }

    .BitkeepLogo_light {
        display: block;
    }

    .BitkeepLogo_dark {
        display: none;
    }

    .themedark_icon {
        display: none;
    }

    .themelight_icon {
        display: block;
    }

    .headerbox .more li:hover {
        background: @theme-light-bg1;
    }

    .headerbox .language-list li:hover {
        background: @theme-light-bg1;
    }

    .headerbox .headright .languagejian_light {
        display: block;
    }

    .headerbox .headright .languagejian_dark {
        display: none;
    }

    .more {
        box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.08);
    }

    .language-list {
        box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.08);
    }
}

.theme-dark {
    .noticeBar.pc-mode>div>span {
        color: #f76239;
    }

    .sport-son {
        color: #f76239;
    }

    .noticeBar {
        background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #17171a !important;

        div,
        .rightBox {
            background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #17171a !important;
        }
    }

    .BitkeepLogo_light {
        display: none;
    }

    .BitkeepLogo_dark {
        display: block;
    }

    .themedark_icon {
        display: block;
    }

    .themelight_icon {
        display: none;
    }

    .headerbox .more li:hover {
        background: @theme-dark-bg1;
    }

    .headerbox .language-list li:hover {
        background: @theme-dark-bg1;
    }

    .headerbox .headright .languagejian_light {
        display: none;
    }

    .headerbox .headright .languagejian_dark {
        display: block;
    }

    .more {
        box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.8);
    }

    .language-list {
        box-shadow: 0px 10px 30px -4px rgba(0, 0, 0, 0.8);
    }
}

.header-container {
    position: fixed;
    top: 0;
    z-index: 121;
    width: 100%;

    .noticeBar.pc-mode {
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: relative;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;

            span {
                overflow: auto;
                white-space: nowrap;
            }

            img {
                width: 20px;
                height: 20px;
            }

            img:first-child {
                margin-right: 8px;
            }
        }
    }

    .download-tooltips-box {
        box-sizing: border-box;
        background: @theme-dark-bg3;
        display: flex;
        align-items: center;
        padding: 10px 20px;
        margin: -1px 0;

        .logo-box {
            width: 32px;
            height: 32px;
            margin-right: 10px;

            >img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .info-box {
            flex: 1;
            padding-right: 8px;
        }

        .title-logo-box {
            width: 51px;
            height: 14px;
            margin-bottom: 4px;

            >img {
                display: block;
                object-fit: contain;
            }
        }

        .desc-box {
            font-size: 11px;
            line-height: 1;
            display: block;
            color: @theme-dark-text2;
        }

        .download-button {
            background-color: @theme-dark-purple;
            min-width: 83px;
            line-height: 30px;
            border-radius: 100px;
            padding: 0 8px;
            margin-right: 8px;
            font-weight: 500;
            font-size: 12px;
            color: @theme-light-bg0;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
        }

        .close-button {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: @theme-light-bg0;
            cursor: pointer;
        }
    }

    .noticeBar.h5-mode {
        width: 100%;
        height: 30px;
        line-height: 30px;
        position: relative;
        white-space: nowrap;
        display: flex;
        background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #ffffff;
        margin-top: -1px;

        div {
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
            height: 29px;
            display: flex;
            align-items: center;
            padding: 0 8px 0 10px;
            background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #ffffff;
            z-index: 9;
            font-size: 12px;

            img {
                display: block;
                width: 16px;
                height: 16px;
            }
        }

        .rightBox {
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 30px;
            background: linear-gradient(0deg, rgba(255, 129, 70, 0.1), rgba(255, 129, 70, 0.1)), #ffffff;
        }

        .sport-son {
            z-index: 1;
            font-size: 12px;
            animation: sport 10s linear infinite;
        }

        @keyframes sport {
            0% {}

            100% {
                transform: translateX(calc(25px - 100%));
            }
        }
    }
}

.headerbox {
    width: 100%;
    min-width: 350px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    -webkit-backdrop-filter: blur(20px);
    -moz-backdrop-filter: blur(20px);
    -ms-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);

    .headleft {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
            margin-right: 51px;
        }

        .list {
            height: 40px;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: 500;

            .item {
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                min-width: 32px;
                flex-wrap: nowrap;
                margin-left: 30px;

                div {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    a {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                p {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                &:nth-child(1) {
                    margin-left: 0;
                }
            }
        }

        .cur {
            width: 100%;
            height: 2.1rem;
            line-height: 2.1rem;
        }

        .cur p {
            float: left;
            cursor: pointer;
            font-weight: 600;
        }

        .cur span.jian {
            display: block;
            width: 8px;
            height: 8px;
            margin-left: 4px;
            background-size: 100% auto;
            -webkit-transition: transform 0.3s ease-in-out;
            transition: transform 0.3s ease-in-out;
        }

        .more {
            overflow: hidden;
            display: none;
            position: absolute;
            top: 40px;
            left: -55px;
            width: 180px;
            border-radius: 8px;
            line-height: 55px;
            text-align: center;
            cursor: pointer;
        }

        .more li {
            display: block;
            width: 100%;
            height: 55px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
        }

        .list .item:hover .more {
            display: block;
        }

        .list .item:hover span.jian {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
        }
    }

    .headright {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .list {
            height: 40px;
            font-size: 14px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: 500;

            >li {
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                margin-left: 30px;
                cursor: pointer;
                font-weight: 600;

                >a {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    position: relative;
                }

                &:nth-child(1) {
                    margin-left: 0;
                }

                .language {
                    position: relative;
                    // width: 76px;
                    height: 100%;
                }

                .language:hover span {
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }

                .language:hover .language-list {
                    display: block;
                }

                .language-list {
                    display: none;
                    overflow: hidden;
                    width: 147px;
                    line-height: 55px;
                    border-radius: 8px;
                    text-align: center;
                    margin-left: -65px;
                    position: absolute;

                    ul li {
                        display: block;
                        text-align: center;
                        width: 100%;
                        height: 55px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;

                        .seo_href {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .downloadImg {
                    position: relative;

                    img {
                        width: 24px;
                        height: 24px;
                    }
                }

                &.one-qrcode {
                    // position: relative;
                    z-index: 11;
                    cursor: pointer;

                    .one-erweima {
                        position: absolute;
                        bottom: -230px;
                        left: 12px;
                        transform: translateX(-50%);
                        height: 226px;
                        padding: 20px 10px 10px 10px;
                        border-radius: 8px;
                        display: none;
                        flex-flow: column;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);

                        .one-erweima-box {
                            width: 120px;
                            height: 120px;
                            border-radius: 2px;
                            border-style: solid;
                            border-width: 1px;
                            overflow: hidden;

                            >img {
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .text1 {
                            font-size: 14px;
                            flex: 1;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight: 600;
                            line-height: 1.2;
                        }

                        .one-download-btn {
                            display: flex;
                            height: 37px;
                            font-size: 14px;
                            justify-content: center;
                            align-items: center;
                            border-radius: 4px;
                            padding: 0 10px;
                            white-space: nowrap;
                            cursor: pointer;
                            font-weight: 400;
                            min-width: 164px;
                            box-sizing: border-box;
                        }
                    }
                }

                &.one-qrcode:hover .one-erweima {
                    display: flex;
                }

                .language-cur {
                    height: 100%;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    p {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        float: left;
                    }

                    img {
                        width: 24px;
                        height: 24px;
                    }

                    span {
                        display: block;
                        float: left;
                        width: 8px;
                        height: 8px;
                        -webkit-transition: transform 0.3s ease-in-out;
                        transition: transform 0.3s ease-in-out;

                        img {
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }
        }

        .connectWalletBox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;

            .connectWallet {
                box-sizing: border-box;
                min-width: 90px;
                white-space: nowrap;
                box-sizing: border-box;
                height: 33px;
                font-size: 14px;
                border-radius: 4px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 16px;

                img {
                    margin-right: 4px;
                    display: block;
                    width: 20px;
                    height: 20px;
                    object-fit: contain;
                }
            }

            .Exitconnection {
                position: absolute;
                bottom: -130px;
                right: 0;
                box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                border: 1px solid;
                padding: 10px 0px 0px;
                box-sizing: border-box;

                .address {
                    width: 220px;
                    padding: 13px 10px;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0px 10px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 4px;

                    .copyed {
                        font-weight: 500;
                        font-size: 12px;
                        line-height: 1.5;
                    }
                }

                .ExitBtn {
                    width: 100%;
                    margin-top: 10px;
                    padding: 13px 0px;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 1.5;
                    text-align: center;
                    cursor: pointer;
                    color: #f36464;
                    border-top: 1px solid;
                }
            }
        }
    }

    .seo_href {
        display: block;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.theme-light {
    .one-download-btn {
        background-color: #0e0e0e;
        color: #ffffff;
    }
}

.theme-dark {
    .one-download-btn {
        background-color: #ffffff;
        color: #0e0e0e;
    }
}
</style>
