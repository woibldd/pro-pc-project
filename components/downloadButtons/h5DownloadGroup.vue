<template>
    <div v-if="phoneSystem === 'IOS'" class="downLoadImg">
        <div v-if="locale === 'zh'" class="isChina">
            <div class="downLoadImg_one">
                <a
                    href="https://testflight.apple.com/join/gMNlVK4J"
                    target="_blank"
                    @click="downloadTA('IOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                >
                    <img src="https://cdn.bitkeep.vip/u_b_7d078e10-0408-11ed-ab63-99e82465c3d2.png" alt="" />
                    <span>{{ $t('DownlaodPage.h5Page.TestFlightDown') }}</span>
                    <span></span>
                </a>
            </div>
            <div class="downLoadImg_two">
                <a :href="appStore" target="_blank" @click="downloadTA('IOS_appStore', $event, appStore)">
                    <img src="https://cdn.bitkeep.vip/u_b_95786be0-0408-11ed-ab63-99e82465c3d2.png" alt="" class="light_icon" />
                    <img src="https://cdn.bitkeep.vip/u_b_42c180c0-2227-11ed-ac51-451ad2fa7963.png" alt="" class="dark_icon" />
                    <div>
                        <div class="text1">{{ $t('DownlaodPage.h5Page.AppStore') }}</div>
                        <div class="text2">{{ $t('DownlaodPage.h5Page.AppStorehai') }}</div>
                    </div>
                    <span></span>
                </a>
            </div>
        </div>
        <div v-else class="isOverseas">
            <div class="downLoadImg_one">
                <a :href="appStore" @click="downloadTA('IOS_appStore', $event, appStore)">
                    <img src="https://cdn.bitkeep.vip/u_b_95786be0-0408-11ed-ab63-99e82465c3d2.png" alt="" class="dark_icon" />
                    <img src="https://cdn.bitkeep.vip/u_b_42c180c0-2227-11ed-ac51-451ad2fa7963.png" alt="" class="light_icon" />
                    <span class="setFont">{{ $t('DownlaodPage.h5Page.AppStore') }}</span>
                    <span></span>
                </a>
            </div>
            <div class="downLoadImg_two">
                <a
                    href="https://testflight.apple.com/join/gMNlVK4J"
                    @click="downloadTA('IOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                >
                    <img src="https://cdn.bitkeep.vip/u_b_7d078e10-0408-11ed-ab63-99e82465c3d2.png" alt="" />
                    <div>
                        <span class="setFont">{{ $t('DownlaodPage.h5Page.TestFlightDown') }}</span>
                    </div>
                    <span></span>
                </a>
            </div>
        </div>
    </div>
    <div v-else class="downLoadImg">
        <div v-if="locale === 'zh'" class="isChina">
            <div class="downLoadImg_one">
                <a :href="androidUrl" @click="downloadTA('Andriod_APK', $event, androidUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_781d5e70-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                    <span>{{ $t('DownlaodPage.h5Page.AndroidAPK') }}</span>
                    <span></span>
                </a>
            </div>

            <div class="downLoadImg_two">
                <a :href="afUrl" @click="downloadTA('Andriod_GooglePlay', $event, afUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_8d3ca040-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                    <div>
                        <div class="text1">{{ $t('DownlaodPage.h5Page.GooglePlay') }}</div>
                        <div class="text2">{{ $t('DownlaodPage.h5Page.GooglePlayUser') }}</div>
                    </div>
                    <span></span>
                </a>
            </div>
        </div>
        <div v-else class="isOverseas">
            <div class="downLoadImg_one">
                <a :href="afUrl" @click="downloadTA('Andriod_GooglePlay', $event, afUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_8d3ca040-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                    <span class="setFont">{{ $t('DownlaodPage.h5Page.GooglePlay') }}</span>
                    <span></span>
                </a>
            </div>
            <div class="downLoadImg_two">
                <a :href="androidUrl" @click="downloadTA('Andriod_APK', $event, androidUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_781d5e70-040d-11ed-ae8f-99ab1749e74a.png" alt="" />
                    <div>
                        <span class="text1 setFont">{{ $t('DownlaodPage.h5Page.AndroidAPK') }}</span>
                    </div>
                    <span></span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'H5DownloadGroup',
    props: {
        androidUrl: {
            type: String,
            default: '',
        },
        afUrl: {
            type: String,
            default: '',
        },
        appStore: {
            type: String,
            default: '',
        },
        source: {
            type: String,
            default: 'index',
        },
        location: {
            type: String,
            default: 'web3',
        },
    },
    data() {
        return {
            phoneSystem: '',
        };
    },
    computed: {
        locale() {
            return this.$store.state.locale;
        },
    },
    mounted() {
        this.initPhoneSystem();
    },
    methods: {
        initPhoneSystem() {
            const isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod');
            const isAndroid = navigator.userAgent.match('Android');

            if (isiOS) this.phoneSystem = 'IOS';
            else if (isAndroid) this.phoneSystem = 'Android';
        },
        downloadTA(name, event, href) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; // 兼容IE8
            }

            this.$Ta.track({
                name: 'Download_Click',
                data: {
                    download_type: 'index' + name + '_' + this.source + '_' + this.location,
                },
            });

            window.open(href, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.theme-light {
    .downLoadImg {
        .downLoadImg_one {
            background-color: @theme-light-text1;
            span {
                color: @theme-light-bg0;
            }
        }
        .downLoadImg_two {
            background-color: @theme-light-bg0;
            border-color: #000;
            > a > div {
                div:first-child {
                    color: #000;
                }
            }
        }
    }
    .isOverseas .setFont {
        color: #000;
    }
}
.theme-dark {
    .downLoadImg {
        .downLoadImg_one {
            background-color: @theme-light-bg0;
            span {
                color: @theme-light-text1;
            }
        }
        .downLoadImg_two {
            background-color: @theme-dark-bg0;
            border-color: @theme-light-bg0;
            > a > div {
                div:first-child {
                    color: @theme-light-bg0;
                }
            }
        }
    }
    .isOverseas .setFont {
        color: @theme-light-bg0;
    }
}
.downLoadImg {
    padding: 0 20px;
    font-family: InterRegular;
    > div > div {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .downLoadImg_one {
        height: 52px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        justify-content: space-between;
        position: relative;
        padding: 0 10px;
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
            white-space: nowrap;
        }
        .setFont {
            font-size: 16px;
            font-weight: 600;
        }
    }
    .downLoadImg_two {
        height: 52px;
        display: flex;
        align-items: center;
        border: 1px solid #000000;
        border-radius: 8px;
        justify-content: space-between;
        padding: 0 10px;
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
        > a > div {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            div:first-child {
                font-size: 16px;
                line-height: 1;
                font-weight: 600;
                white-space: nowrap;
                margin-bottom: 4px;
            }
            div:last-child {
                font-size: 12px;
                line-height: 1.5;
                font-weight: 400;
            }
        }
        .setFont {
            font-size: 16px !important;
            font-weight: 600 !important;
        }
    }
}
</style>
