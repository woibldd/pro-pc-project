<template>
    <header class="headerbox BG0blur" @click="hideClick">
        <div class="headleft">
            <div title="bitkeep">
                <a
                    :href="'/' + $store.state.locale + '/index'"
                    title="BitKeep,  a best crypto wallet"
                    class="seo_href"
                    @click="jumpUrl('bitkeep', $event, 'bitkeep')"
                >
                    <img src="../assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet" class="BitkeepLogo_light" /><img
                        src="../assets/img/header/BK logo_dark.svg"
                        alt="BitKeep,  a best crypto wallet"
                        class="BitkeepLogo_dark"
                    />
                </a>
            </div>
        </div>
        <div class="headright">
            <ul class="list">
                <li class="connectWalletBox" v-click-outside="hideExit">
                    <a-button type="primary" v-if="!address" class="connectWallet" title="connectWallet" @click="connectWallet('click')">
                        {{ $t('header.connectWallet') }}
                    </a-button>
                    <a-button type="primary" v-else class="connectWallet" @click="exitshow = true" title="address">
                        <img src="../assets/img/footer/Tab bar icon.svg" alt="address" />
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
                <li :title="$t('header.download')">
                    <p class="text1" :title="$t('header.download')">
                        <a
                            :title="$t('header.download')"
                            :href="'/' + $store.state.locale + '/download?type=0'"
                            class="seo_href text1"
                            @click="jumpUrl('downloadAndroid', $event, 'Download')"
                        >
                            <img
                                src="https://cdn.bitkeep.vip/u_b_0bf68c40-193d-11ed-a358-7fe0de42a4a9.png"
                                alt=""
                                class="themelight_icon setImg"
                                style="width: 24px; height: 24px"
                            />
                            <img
                                src="https://cdn.bitkeep.vip/u_b_01717ba0-193c-11ed-a358-7fe0de42a4a9.png"
                                class="themedark_icon setImg"
                                alt=""
                                style="width: 24px; height: 24px"
                            />
                        </a>
                    </p>
                </li>
                <li>
                    <div class="language">
                        <div class="language-cur" :title="lang">
                            <p class="text1" :title="lang">
                                <img src="https://cdn.bitkeep.vip/u_b_da4f0510-193b-11ed-a358-7fe0de42a4a9.png" alt="" class="themelight_icon" />
                                <img src="https://cdn.bitkeep.vip/u_b_0170df60-193c-11ed-a358-7fe0de42a4a9.png" alt="" class="themedark_icon" />
                            </p>
                        </div>
                        <div class="language-list BG0 lineBG2">
                            <ul>
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
                                <li class="langItem text1" :title="$t('header.ko')">
                                    <a
                                        :href="$route.path.replace($route.params.language, 'ko')"
                                        class="seo_href text1"
                                        :title="$t('header.ko')"
                                        @click="switchlanguage('ko', '한국인')"
                                        >{{ $t('header.ko') }}</a
                                    >
                                </li>
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
                            </ul>
                        </div>
                    </div>
                </li>
                <li title="theme">
                    <img src="@/assets/img/header/dark.svg" class="themelight_icon" alt="themelight" @click="setTheme('dark')" />
                    <img src="@/assets/img/header/light.svg" class="themedark_icon" alt="themedark" @click="setTheme('light')" />
                </li>
                <li :class="['head_slidemenu', { 'kline-page': klinePage }]" @click="SlideMenushow = true">
                    <img src="@/assets/img/header/slideicon=list_light.svg" alt="" class="themelight_icon" />
                    <img src="@/assets/img/header/slideicon=list_dark.svg" alt="" class="themedark_icon" />
                </li>
            </ul>
            <SlideMenu :SlideMenushow="SlideMenushow" @closeSlideMenushow="closeSlideMenushow" :showallslide="true"> </SlideMenu>
        </div>
        <NotInstalled :InstalledShow="InstalledShow" @closeInstalledShow="closeInstalledShow"></NotInstalled>
        <AlreadyInstalled :AlreadyInstalledShow="AlreadyInstalledShow" @closeAlreadystalledShow="closeAlreadystalledShow"></AlreadyInstalled>
    </header>
</template>
<script>
import '@/filter/filter';
import ClickOutside from 'vue-click-outside';
import { mapMutations, mapGetters } from 'vuex';
import { wallet } from '@/utils/wallet';
import { toUrl } from '@/tools/common';
import NotInstalled from '../components/isInstallModel/notInstalled.vue';
import AlreadyInstalled from '../components/isInstallModel/alreadyInstalled.vue';
import SlideMenu from '../components/slideMenu/slideMenu.vue';
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
            case 'ko':
                lang = '한국인';
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
            lang: lang,
            exitshow: false,
            copyshow: true,
            klinePage: true,
            isPC: this.$store.state.isPC,
            hostIsCom: this.$store.state.hostIsCom,
        };
    },
    head() {
        let bitkeep_theme = this.GetTheme();
        this.$cookies.set('bitkeep_theme', bitkeep_theme);
        return {
            bodyAttrs: {
                class: bitkeep_theme === 'dark' ? 'theme-dark' : 'theme-light',
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
    watch: {
        '$store.state.address': function (newVal, oldVal) {
            if (newVal) {
                this.changeAddress(newVal);
                this.addressinit();
            }
        },
        '$store.state.isPC': function (newVal, oldVal) {
            this.isPC = newVal;
        },
    },
    methods: {
        hideClick() {
            this.$store.commit('swap/Setout');
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
                case 'Download':
                    Location_Id = 10;
                    Action_Location_Name = 'Download';
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
        ...mapGetters(['GetTheme']),
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

    .headerbox .headleft .list.kline-page {
        display: none !important;
    }

    .headerbox .head_slidemenu {
        display: flex !important;
    }
}

@media screen and (max-width: 1250px) {
    .headerbox .headleft .list {
        display: none !important;
    }

    .headright {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .list {
            li {
                display: none !important;
                line-height: 100%;

                &.connectWalletBox {
                    display: flex !important;
                    margin-left: 0px;
                }

                &.head_slidemenu {
                    display: flex !important;
                }
            }
        }
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
    height: 64px;
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
            left: -68px;
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

            > li {
                display: flex;
                align-items: center;
                position: relative;
                height: 100%;
                margin-left: 30px;
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
    }
}

// .min-length{
//     min-width:1280px!important;
// }
</style>
