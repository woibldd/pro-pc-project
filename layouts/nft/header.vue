<template>
    <div>
        <header class="headerbox BG0blur">
            <div class="headleft">
                <div title="bitkeep">
                    <a :href="'/' + $store.state.locale + '/index'" title="BitKeep,  a best crypto wallet" class="seo_href" @click="toUrl('bitkeep', $event)">
                        <img src="@/assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_light" /><img
                            src="@/assets/img/header/BK logo_dark.svg"
                            alt="BitKeep,  a best crypto wallet"
                            class="BitkeepLogo_dark"
                        />
                    </a>
                </div>
                <div :class="['list', { 'kline-page': klinePage }]"></div>
            </div>
            <div class="headright">
                <ul class="list">
                    <li :title="$t('header.download')">
                        <p class="text1" :title="$t('header.download')">
                            <a
                                :title="$t('header.download')"
                                :href="
                                    $store.state.locale == 'en'
                                        ? 'https://bitkeep.com/download?type=2'
                                        : 'https://bitkeep.com/' + $store.state.locale + '/download?type=2'
                                "
                                class="seo_href text1"
                            >
                                {{ $t('header.download') }}
                            </a>
                        </p>
                    </li>
                    <li>
                        <div class="language">
                            <div class="language-cur" :title="lang">
                                <p class="text1" :title="lang">{{ lang }}</p>
                                <span>
                                    <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png" alt="triangle" class="languagejian_light" />
                                    <img src="@/assets/img/header/icon_Triangle.svg" class="languagejian_dark" alt="triangle" />
                                </span>
                            </div>
                            <div class="language-list">
                                <ul>
                                    <li class="langItem text1" :title="$t('header.zh')">
                                        <a
                                            :href="$route.path.replace($route.params.language, 'zh')"
                                            :title="$t('header.zh')"
                                            class="seo_href text1"
                                            @click="switchlanguage('zh', '简体中文')"
                                        >
                                            {{ $t('header.zh') }}
                                        </a>
                                    </li>
                                    <li class="langItem text1" :title="$t('header.en')">
                                        <a
                                            :href="$route.path.replace($route.params.language, 'en')"
                                            :title="$t('header.en')"
                                            class="seo_href text1"
                                            @click="switchlanguage('en', 'English')"
                                        >
                                            {{ $t('header.en') }}
                                        </a>
                                    </li>
                                    <!-- <li class="langItem text1" :title='$t("header.ko")'>
                                        <a :href='$route.path.replace($route.params.language,"ko")' class="seo_href text1" :title='$t("header.ko")' @click="switchlanguage('ko', '한국인')">{{ $t("header.ko") }}</a>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="connectWalletBox" v-click-outside="hideExit">
                        <a-button type="primary" v-if="!address" class="connectWallet" title="connectWallet" @click="connectWallet('click')">
                            {{ $t('header.connectWallet') }}
                        </a-button>
                        <a-button type="primary" v-else class="connectWallet" @click="exitshow = true" title="address">
                            <img src="@/assets/img/footer/Tab bar icon.svg" alt="address" />
                            {{ address | blurredDisplay }}
                        </a-button>
                        <div class="Exitconnection BG0 lineBG2" v-show="exitshow && address">
                            <div class="address BG1" @click="handleCopy(address)">
                                <span class="text1" :title="address">{{ address | blurredDisplay }}</span>
                                <img src="@/assets/img/header/copy_dark_icons.svg" alt="copy" v-show="copyshow" class="dark_icon" />
                                <img src="@/assets/img/header/copy_light_icons.svg" alt="copy" v-show="copyshow" class="light_icon" />
                                <span v-show="!copyshow" class="text3 copyed">{{ $t('header.copied') }}</span>
                            </div>
                            <div class="ExitBtn lineBG2" @click="Disconnect" :title="$t('header.exit')">
                                <img src="@/assets/img/header/exit.svg" alt="exit" />
                                {{ $t('header.exit') }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <NotInstalled :InstalledShow="InstalledShow" @closeInstalledShow="closeInstalledShow"></NotInstalled>
            <AlreadyInstalled :AlreadyInstalledShow="AlreadyInstalledShow" @closeAlreadystalledShow="closeAlreadystalledShow"></AlreadyInstalled>
        </header>
    </div>
</template>
<script>
import '@/filter/filter';
import ClickOutside from 'vue-click-outside';
import { mapMutations, mapGetters } from 'vuex';
import { wallet } from '@/utils/wallet';
import NotInstalled from '@/components/isInstallModel/notInstalled.vue';
import AlreadyInstalled from '@/components/isInstallModel/alreadyInstalled.vue';
// import SlideMenu from '@/components/slideMenu/slideMenu.vue'
import copy from 'copy-to-clipboard';
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
            // case 'ko':
            //     lang = '한국인'
            //     break;
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
            lang: lang,
            exitshow: false,
            copyshow: true,
            klinePage: false,
            isPC: this.$store.state.isPC,
            showFirstModal: false,
            chainIdList: [1, 56, 137],
            myModal: null,
            myModal2: null,
        };
    },
    components: { NotInstalled, AlreadyInstalled },
    head() {
        return {
            bodyAttrs: {
                class: 'theme-light',
            },
        };
    },
    beforeMount() {
        setTimeout(() => {
            // if (localStorage.getItem('connectorId')) {
            //     this.addressinit()
            // } else {
            //     this.init()
            //     this.connectWallet('click')
            // }
            this.init();
            this.connectWallet('click');
        }, 500);
        // this.$nextTick(() => {
        //默认连接关闭
        // this.connectWallet()
        // })

        this.$nuxt.$on('connectWallet', () => {
            this.connectWallet('click');
        });
    },
    watch: {
        '$store.state.address': function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal);
                this.addressinit();
            }
        },
        $route: {
            handler(val) {
                if (val.name === 'language-swap-chain-contract') {
                    this.klinePage = true;
                }
            },
            deep: true,
            immediate: true,
        },
        '$store.state.isPC': function (newVal, oldVal) {
            this.isPC = newVal;
        },
    },
    methods: {
        ...mapGetters(['GetTheme']),
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
        toUrl(name, event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            const { locale } = this.$store.state;
            switch (name) {
                case 'bitkeep':
                    this.$router.push({
                        path: '/' + locale + '/index',
                    });
                    break;
                case 'downloadIOS':
                    this.$router.push({
                        path: '/' + locale + '/download',
                        query: { type: 1 },
                    });
                    break;
                case 'downloadAndroid':
                    this.$router.push({
                        path: '/' + locale + '/download',
                        query: { type: 0 },
                    });
                    break;
                case 'downloadChrome':
                    this.$router.push({
                        path: '/' + locale + '/download',
                        query: { type: 2 },
                    });
                    break;
                default:
                    this.$router.push({
                        path: '/' + locale + '/index',
                        query: { ...query },
                    });
                    break;
            }
        },
        switchlanguage(Local, lang) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            this.changeLocal(Local);
            let { fullPath } = this.$route;
            fullPath = fullPath.split('/');
            fullPath.splice(1, 1, Local);

            this.$router.push({
                path: fullPath.join('/'),
            });
            this.lang = lang;
        },
        setTheme(theme) {
            this.$cookies.set('bitkeep_theme', theme);
            const theme_Local = theme == 'dark' ? 'theme-dark' : 'theme-light';
            document.getElementsByTagName('body')[0].setAttribute('class', theme_Local);
        },
        ...mapMutations(['changeLocal', 'changeAddress', 'changeChainId', 'changeWalletID']),
        async connectWallet(click) {
            const that = this;
            console.log('connectWallet', this);
            // 是否有 bitkeep 处理
            if (!wallet.isInstall()) {
                if (click) {
                    if (this.isPC) {
                        this.InstalledShow = true;
                    } else {
                        this.toUrl('downloadIOS');
                        return false;
                    }
                } else {
                    if (sessionStorage.getItem('bitkeep_installed') && sessionStorage.getItem('bitkeep_installed') == 'true') {
                        this.InstalledShow = false;
                    } else {
                        if (this.isPC) {
                            this.InstalledShow = true;
                        } else {
                            this.toUrl('downloadIOS');
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
                // const bitkeepaddress = await bitkeep.ethereum.request({
                //     method: "wallet_addEthereumChain",
                //     params: [{
                //         chainId: '0x1',
                //         chainName: 'ETH',
                //         nativeCurrency: {
                //             name: "ETH",
                //             symbol: "ETH",
                //             decimals: 18
                //         }
                //     }]
                // })
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
                wallet.on('chainChanged', async chainId => {
                    // console.log("chainChanged",this.chainIdList, Number(chainId));
                    // console.log(this.chainIdList.includes(Number(chainId)))
                    // if (!this.chainIdList.includes(Number(chainId))) {
                    //     this.switchEthChain()
                    //     return
                    // }
                    this.chainId = await wallet.getChainId();
                    this.changeChainId(this.chainId);
                });
                wallet.on('accountsChanged', async add => {
                    // console.log("accountsChanged", add);
                    // this.pageReload()
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
                if (typeof error == 'object' && error.code != -32002) {
                    console.log(error);
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
                wallet.on('chainChanged', async chainId => {
                    // console.log("chainChanged", this.chainIdList,  Number(chainId));
                    // console.log(this.chainIdList.includes(Number(chainId)))
                    // if (!this.chainIdList.includes(Number(chainId))) {
                    //     this.switchEthChain()
                    //     return
                    // }
                    this.chainId = await wallet.getChainId();
                    this.changeChainId(this.chainId);
                });
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
                wallet.on('accountsChanged', async () => {
                    // console.log("accountsChanged", add);
                    // this.pageReload()
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
            } catch (error) {}
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
        switchEthChain() {
            if (this.myModal) {
                this.myModal.destroy();
            }
            if (this.myModal2) {
                this.myModal2.destroy();
            }
            const that = this;
            this.myModal = this.$warning({
                title: '不支持当前主网！',
                // content: h => <div style="color:red;">Some descriptions</div>,
                onOk() {
                    wallet.switchChainId('0x1', null, true);
                },
                class: 'myModal',
            });
        },
        async pageReload() {
            // window.location.reload()
            if (this.myModal) {
                this.myModal.destroy();
            }
            if (this.myModal2) {
                this.myModal2.destroy();
            }

            const chainId = await wallet.getChainId('bitkeep');
            // console.log(chainId)

            this.myModal2 = this.$warning({
                title: '不支持当前主网2222222！',
                // content: h => <div style="color:red;">Some descriptions</div>,
                onOk() {
                    // window.location.reload()
                },
                class: 'myModal',
            });
        },
    },
    directives: {
        ClickOutside,
    },
};
</script>
<style lang="less" scoped>
@import '@/assets/css/theme.less';

@media screen and (min-width: 1321px) {
    .headerbox .headleft .list {
        display: flex !important;
    }

    .headerbox .head_slidemenu {
        display: none !important;
    }
}

@media screen and (max-width: 1370px) {
    .headerbox .headleft .list {
        display: none !important;
    }

    .headerbox .head_slidemenu {
        display: flex !important;
    }
}
@media screen and (min-width: 1370px) and (max-width: 1950px) {
    .headerbox .headleft .list.kline-page {
        display: none !important;
    }

    .headerbox .head_slidemenu.kline-page {
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
                font-size: 16px;
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

                        .connectWallet {
                            min-width: 80px;
                            height: 28px;
                            border-radius: 6px;

                            img {
                                margin-right: 9px;
                            }
                        }
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

.headerbox {
    width: 100%;
    min-width: 350px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    z-index: 121;
    top: 0;
    left: 0;
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
            font-size: 16px;
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
                margin-left: 40px;

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

            .item:hover p,
            .item:hover p a {
                color: #7524f9 !important;
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
            left: -82.4px;
            width: 200px;
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
            font-size: 16px;
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
            font-size: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: 500;

            > li {
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                margin-left: 40px;
                cursor: pointer;
                font-weight: 600;

                > a {
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
                    width: 76px;
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
                    width: 200px;
                    line-height: 55px;
                    border-radius: 8px;
                    text-align: center;
                    margin-left: -65px;
                    ul {
                        background: #ffffff;
                    }

                    ul li {
                        display: block;
                        text-align: center;
                        width: 100%;
                        height: 55px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 600;
                        .seo_href {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .language-cur {
                    height: 100%;
                    font-size: 16px;
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
                min-width: 137px;
                height: 33px;
                font-size: 16px;
                border-radius: 6px;
                border: none;

                img {
                    margin-right: 9px;
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
                    font-size: 16px;
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
    }
}
</style>
