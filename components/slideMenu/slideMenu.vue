<template>
    <a-drawer placement="right" :closable="false" :visible="visible" @close="onClose">
        <div class="slideMenu_head">
            <img src="@/assets/img/components/dappStore/search/light/delete_history_cions.svg" class="light_icon" alt="close" @click="onClose" />
            <img src="@/assets/img/components/dappStore/search/dark/delete_history_cions.svg" class="dark_icon" alt="close" @click="onClose" />
        </div>
        <div class="slideMenu">
            <div class="item">
                <div class="cur j_cur">
                    <p class="text1">
                        <a
                            :title="$t('header.homeitem')"
                            :href="'/' + $store.state.locale + '/index'"
                            class="seo_href text1"
                            @click="jumpUrl('bitkeep', $event, 'bitkeep')"
                        >
                            {{ $t('header.homeitem') }}
                        </a>
                    </p>
                </div>
            </div>
            <div class="item" v-if="showallslide">
                <div class="cur j_cur download" @click="slideToggle('download')" :title="$t('header.headeritem1')">
                    <p class="text1" :title="$t('header.headeritem1')">{{ $t('header.headeritem1') }}</p>
                    <span class="jian"></span>
                </div>
                <ul class="more">
                    <li class="text1" :title="$t('header.headeritem1-item1')">
                        <a
                            :title="$t('header.headeritem1-item1')"
                            :href="'/' + $store.state.locale + '/download?type=1'"
                            class="seo_href text1"
                            @click="jumpUrl('downloadIOS', $event, 'downloadIOS')"
                        >
                            {{ $t('header.headeritem1-item1') }}
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.headeritem1-item2')">
                        <a
                            :title="$t('header.headeritem1-item2')"
                            :href="'/' + $store.state.locale + '/download?type=0'"
                            class="seo_href text1"
                            @click="jumpUrl('downloadAndroid', $event, 'downloadAndroid')"
                        >
                            {{ $t('header.headeritem1-item2') }}
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.headeritem1-item3')">
                        <a
                            :title="$t('header.headeritem1-item3')"
                            :href="'/' + $store.state.locale + '/download?type=2'"
                            class="seo_href text1"
                            @click="jumpUrl('downloadChrome', $event, 'downloadChrome')"
                        >
                            {{ $t('header.headeritem1-item3') }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="item" v-if="$store.state.hostIsCom">
                <div class="cur j_cur">
                    <p class="text1">
                        <a
                            :title="$t('header.headeritem3')"
                            :href="'/' + $store.state.locale + '/swap'"
                            class="seo_href text1"
                            @click="jumpUrl('swap', $event, 'SWAP')"
                        >
                            {{ $t('header.headeritem9') }}
                        </a>
                    </p>
                </div>
            </div>
            <div class="item" v-if="$store.state.hostIsCom">
                <div class="cur j_cur NFT"  @click="slideToggle('NFT')">
                    <p class="text1" :title="$t('header.headeritem8')">{{$t('header.headeritem8')}}</p>
                    <span class="jian">
                        <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png" alt="triangle" class="light_icon" />
                    </span>
                </div>
                <ul class="more lineBG2">
                    <li class="text1" title="Free Mints">
                        <a
                            title="Free Mints"
                            @click="jumpUrl('FreeMint', $event, 'NFT')"
                            :href='"/" + $store.state.locale + "/nft/freeMint"'
                            class="seo_href text1"
                        >
                            Free Mints
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.headeritem7-item1')">
                        <a
                            title="INO"
                            @click="jumpUrl('INO', $event, 'NFT')" :href='"/" + $store.state.locale + "/INO"'
                            class="seo_href text1" 
                        >
                        INO
                        </a>
                    </li>
                </ul>
            </div>
            <div class="item">
                <div class="cur j_cur" :title="$t('header.headeritem3')">
                    <p class="text1">
                        <a
                            :title="$t('header.headeritem3')"
                            :href="'/' + $store.state.locale + '/dapp'"
                            class="seo_href text1"
                            @click="jumpUrl('dapp', $event, 'DAPP')"
                        >
                            {{ $t('header.headeritem3') }}
                        </a>
                    </p>
                </div>
            </div>
            <div class="item" v-if="$store.state.hostIsCom">
                <div class="cur j_cur" title="GASU">
                    <p class="text1">
                        <a title="GASU" href="https://gasutopia.com" target="_blank" class="seo_href text1" @click="jumpUrl('GASU', $event, 'GASU')"> GASU </a>
                    </p>
                </div>
            </div>
            <!-- 暂时下架BKB -->
            <!-- <div class="item">
                <div class="cur j_cur" title='BKB'>
                    <p class="text1">
                        <a title='BKB'
                            :href='($store.state.locale == "en" ? "/bkb" : "/" + $store.state.locale + "/bkb")'
                            class="seo_href text1" @click="jumpUrl('bkb', $event)">
                            BKB
                        </a>
                    </p>
                </div>
            </div> -->
            <div class="item">
                <div class="cur j_cur business" data="" @click="slideToggle('business')">
                    <p class="text1" title="Business">Business</p>
                    <span class="jian">
                        <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png" alt="triangle" class="light_icon" />
                        <!-- <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt=""> -->
                    </span>
                </div>
                <ul class="more lineBG2">
                    <li class="text1" title="Business">
                        <a
                            title="Business"
                            @click="jumpUrl('business', $event, 'Business')"
                            :href="`https://business.bitkeep${$store.state.hostChange}?lang=${$store.state.locale != 'zh' ? 'en' : $store.state.locale}`"
                            class="seo_href text1"
                        >
                            Business
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.headeritem7-item1')">
                        <a
                            :title="$t('header.headeritem6')"
                            :href="`https://docs.bitkeep${$store.state.hostChange}/guide/`"
                            class="seo_href text1"
                            @click="jumpUrl('Developers', $event, 'Developers')"
                        >
                            {{ $t('header.headeritem6') }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="item">
                <div class="cur j_cur" :title="$t('header.KnightRecruitment')">
                    <p class="text1">
                        <a
                            :title="$t('header.KnightRecruitment')"
                            :href="'/' + $store.state.locale + '/recruiting'"
                            class="seo_href text1"
                            @click="jumpUrl('recruiting', $event, 'recruiting')"
                        >
                            {{ $t('header.KnightRecruitment') }}
                        </a>
                    </p>
                </div>
            </div>
            <div class="item">
                <div class="cur j_cur about" data="about" @click="slideToggle('about')">
                    <p class="text1" :title="$t('header.headeritem11')">{{ $t('header.headeritem11') }}</p>
                    <span class="jian">
                        <img src="https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png" alt="triangle" class="light_icon" />
                        <!-- <img src="../assets/img/header/icon_Triangle.svg" class="dark_icon" alt=""> -->
                    </span>
                </div>
                <ul class="more lineBG2">
                    <li class="text1" :title="$t('header.headeritem7-item1')">
                        <a
                            :title="$t('header.headeritem5')"
                            :href="`https://study.bitkeep${$store.state.hostChange}` + ($store.state.locale == 'ko' ? '/en' : '/' + $store.state.locale)"
                            class="seo_href text1"
                            target="_blank"
                            @click="jumpUrl('study', $event, 'study')"
                        >
                            {{ $t('header.headeritem5') }}
                        </a>
                    </li>

                    <li class="text1" :title="$t('header.headeritem7-item2')">
                        <a
                            :title="$t('header.headeritem4')"
                            :href="`https://blog.bitkeep${$store.state.hostChange}` + ($store.state.locale == 'ko' ? '/kr' : '/' + $store.state.locale)"
                            class="seo_href text1"
                            @click="jumpUrl('blog', $event, 'blog')"
                            target="_blank"
                        >
                            {{ $t('header.headeritem4') }}
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.headeritem7-item2')">
                        <a
                            :title="$t('header.headeritem7-item2')"
                            :href="'/' + $store.state.locale + '/jobs'"
                            class="seo_href text1"
                            @click="jumpUrl('jobs', $event, 'jobs')"
                        >
                            {{ $t('header.headeritem7-item2') }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="item lineBG3" :class="showallslide ? 'swapmobile' : 'mobile'" style="bordertop: 1px solid">
                <div class="cur light_icon" :title="$t('header.theme')" @click="setTheme('dark')">
                    <p class="text1">{{ $t('header.theme') }}</p>
                    <img src="@/assets/img/header/dark.svg" class="light_icon" alt="themelight" />
                </div>
                <div class="cur dark_icon" :title="$t('header.theme')" @click="setTheme('light')">
                    <p class="text1">{{ $t('header.theme') }}</p>
                    <img src="@/assets/img/header/light.svg" class="dark_icon" alt="themedark" />
                </div>
            </div>
            <div class="item" :class="showallslide ? 'swapmobile' : 'mobile'">
                <div class="cur" :title="$t('header.download')">
                    <p class="text1">
                        <a
                            :title="$t('header.download')"
                            :href="'/' + $store.state.locale + '/download?type=0'"
                            class="seo_href text1"
                            @click="jumpUrl('downloadAndroid', $event, 'Download')"
                        >
                            {{ $t('header.download') }}
                        </a>
                    </p>
                </div>
            </div>
            <div class="item" :class="showallslide ? 'swapmobile' : 'mobile'">
                <div class="cur j_cur language" :title="$t('header.language')" @click="slideToggle('language')">
                    <!-- 默认语言显示标题 -->
                    <p class="text1" v-if="locale == 'zh' && !lang">{{ $t('header.zh') }}</p>
                    <p class="text1" v-else-if="locale == 'en' && !lang">{{ $t('header.en') }}</p>
                    <p class="text1" v-else-if="locale == 'ko' && !lang">{{ $t('header.ko') }}</p>
                    <p class="text1" v-else-if="locale == 'vi' && !lang">{{ $t('header.vi') }}</p>
                    <p class="text1" v-else-if="locale == 'tr' && !lang">{{ $t('header.tr') }}</p>
                    <p class="text1" v-else-if="locale == 'id' && !lang">{{ $t('header.id') }}</p>
                    <p class="text1" v-if="lang">{{ lang }}</p>
                    <span class="jian"></span>
                </div>
                <ul class="more">
                    <li class="text1" :title="$t('header.en')">
                        <a
                            :href="$route.path.replace($route.params.language, 'en')"
                            :title="$t('header.en')"
                            class="seo_href text1"
                            @click="switchlanguage('en', 'English')"
                        >
                            {{ $t('header.en') }}
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.ko')">
                        <a
                            :href="$route.path.replace($route.params.language, 'ko')"
                            class="seo_href text1"
                            :title="$t('header.ko')"
                            @click="switchlanguage('ko', '한국인')"
                            >{{ $t('header.ko') }}</a
                        >
                    </li>
                    <li class="text1" :title="$t('header.zh')">
                        <a
                            :href="$route.path.replace($route.params.language, 'zh')"
                            :title="$t('header.zh')"
                            class="seo_href text1"
                            @click="switchlanguage('zh', '简体中文')"
                        >
                            {{ $t('header.zh') }}
                        </a>
                    </li>
                    <li class="text1" :title="$t('header.tr')" v-if="addlanguage">
                        <a
                            :href="$route.path.replace($route.params.language, 'tr')"
                            class="seo_href text1"
                            :title="$t('header.tr')"
                            @click="switchlanguage('tr', 'Türkçe')"
                            >{{ $t('header.tr') }}</a
                        >
                    </li>
                    <li class="text1" :title="$t('header.vi')" v-if="addlanguage">
                        <a
                            :href="$route.path.replace($route.params.language, 'vi')"
                            class="seo_href text1"
                            :title="$t('header.vi')"
                            @click="switchlanguage('vi', 'Tiếng Việt')"
                            >{{ $t('header.vi') }}</a
                        >
                    </li>
                    <li class="text1" :title="$t('header.id')" v-if="addlanguage">
                        <a
                            :href="$route.path.replace($route.params.language, 'id')"
                            class="seo_href text1"
                            :title="$t('header.id')"
                            @click="switchlanguage('id', 'Indonesian')"
                            >{{ $t('header.id') }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <remote-js cdn="https://cdn2.bitkeep.vip/files/jquery.min.js"></remote-js>
    </a-drawer>
</template>
<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import cndMixins from '@/mixins/cnd.js';
import { toUrl } from '@/tools/common';
import { Drawer } from 'ant-design-vue';
Vue.use(Drawer);
export default {
    name: 'slideMenu',
    mixins: [cndMixins],
    scrollToTop: true,
    props: {
        showallslide: {
            type: Boolean,
            default: false,
        },
        SlideMenushow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            visible: this.SlideMenushow,
            locale: this.$store.state.locale,
            addlanguage: this.$store.state.addlanguage,
            lang: '',
        };
    },
    methods: {
        slideToggle(name) {
            $('.' + name)
                .parent()
                .find($('.more'))
                .slideToggle();
            $('.' + name)
                .find($('.jian'))
                .toggleClass('jian_up');
        },
        onClose() {
            this.$emit('closeSlideMenushow');
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
            setTimeout(() => {
                this.onClose();
            }, 200);
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
            this.onClose();
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
            this.onClose();
        },
        ...mapMutations(['changeLocal', 'changeTheme']),
    },
    watch: {
        SlideMenushow(val) {
            this.visible = val;
        },
        '$store.state.addlanguage': function (newVal, oldVal) {
            this.addlanguage = newVal;
        },
    },
};
</script>
<style lang="less" scoped>
.theme-light {
    @media (any-hover: hover) {
        .slideMenu .item .cur:hover,
        .more li:hover {
            background: @theme-light-bg1 !important;
        }
    }

    .slideMenu .item .cur span.jian {
        background: url(https://cdn.bitkeep.vip/u_b_00aa7b10-da7a-11eb-bd2f-03aa2946fb23.png) no-repeat;
        background-size: 100% auto;
    }
}

.theme-dark {
    @media (any-hover: hover) {
        .slideMenu .item .cur:hover,
        .more li:hover {
            background: @theme-dark-bg1 !important;
        }
    }

    .slideMenu .item .cur span.jian {
        background: url('@/assets/img/header/icon_Triangle.svg') no-repeat;
        background-size: 100% auto;
    }
}

@media screen and (max-width: 750px) {
    .mobile {
        display: block !important;
    }
}
@media screen and (max-width: 1250px) {
    .swapmobile {
        display: block !important;
    }
}
.slideMenu_head {
    display: flex;
    justify-content: flex-end;
    // padding: 0px 20px;
    cursor: pointer;
}

.slideMenu {
    cursor: pointer;
    margin-top: 20px;
    padding-bottom: 100px;
    height: 100%;
    overflow: auto;

    .seo_href {
        display: block;
        width: 100%;
        height: 100%;
        font-weight: 600 !important;

        .footer_3_tip {
            background: #7524f9;
            margin-left: 10px;
            border-radius: 100px;
            padding: 3px 8px;
            box-sizing: border-box;
            font-weight: 500;
            line-height: 100%;
            font-size: 14px;
            color: #fff;
        }
    }

    .item {
        font-weight: 600;
        font-size: 16px;
        font-family: InterRegular;
        .cur {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 15px 10px;
            align-items: center;
            border-radius: 4px;

            p {
                flex: 1;
                font-weight: 600 !important;
            }

            span.jian {
                display: block;
                width: 8px;
                height: 8px;
                margin-left: 4px;
                background-size: 100% auto;
                -webkit-transition: transform 0.3s ease-in-out;
                transition: transform 0.3s ease-in-out;
            }

            span.jian_up {
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
            }
        }

        .more {
            width: 100%;
            display: none;

            li {
                width: 100%;
                align-items: center;
                font-size: 14px;
                font-weight: 600 !important;

                .seo_href {
                    padding: 15px 24px;
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .mobile {
        display: none;
    }
    .swapmobile {
        display: none;
    }
}

.slideMenu::-webkit-scrollbar {
    width: 0 !important;
}
</style>
