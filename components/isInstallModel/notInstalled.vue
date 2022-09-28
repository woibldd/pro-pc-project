<template>
    <a-modal :visible="visible" :mask-closable="false" :closable="false" width="754px" :footer="null" :centered="true" :body-style="{ padding: 0 }">
        <div class="notinstallbox">
            <div class="BG0">
                <div class="header-box">
                    <div class="close-button" @click="afterClose">
                        <a-icon type="close" class="text1" :style="{ fontSize: '18px', cursor: 'pointer' }" />
                    </div>
                </div>
                <div class="body-box">
                    <h1 class="notinstallbox-title text1">{{ $t('isInstallModel.title') }}</h1>
                    <ul class="notinstallbox-content text2">
                        <li>{{ $t('isInstallModel.text1') }}</li>
                        <li>{{ $t('isInstallModel.text2') }}</li>
                    </ul>
                    <a v-if="!isNotSupport" class="notinstallbox-btn Common_white BGpurple" @click="handleOk">
                        <span>{{ $t('isInstallModel.downloadBtn') + (/zh|ko/.test($store.state.locale) ? '' : ` ${browserType}`) }}</span>
                        <img v-if="browserType === 'Chrome'" src="https://cdn.bitkeep.vip/u_b_9398c030-3b4f-11ed-b8cb-77fa3c579506.svg+xml" alt="chrome" />
                        <img v-if="browserType === 'Edge'" src="https://cdn.bitkeep.vip/u_b_d264a5e0-3b4f-11ed-b8cb-77fa3c579506.svg+xml" alt="edge" />
                    </a>
                    <div v-else class="not-support-box">
                        <h1 class="title Common_red">{{ $t('isInstallModel.notSupportTitle') }}</h1>
                        <p class="sub-title Common_red">{{ $t('isInstallModel.notSupportSubTitle') }}</p>
                        <div class="support-list">
                            <div class="support-item">
                                <img class="light-img" src="https://cdn.bitkeep.vip/u_b_047c3a90-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                                <img class="dark-img" src="https://cdn.bitkeep.vip/u_b_97424670-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                                <div class="text1">Chrome</div>
                            </div>
                            <div class="support-item">
                                <img class="light-img" src="https://cdn.bitkeep.vip/u_b_047c61a0-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                                <img class="dark-img" src="https://cdn.bitkeep.vip/u_b_9741f850-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                                <div class="text1">Edge</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-box BG1">
                    <div class="download-methods-desc">
                        <h2 class="title text1">{{ $t('isInstallModel.orScanCodeDownload') }}</h2>
                        <div class="sub-title text1">iOS & Android</div>
                    </div>
                    <div class="qr-code Common_white">
                        <img :src="qrcodeImage" alt="erweima" />
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>
<script>
import { getQrcodeImage } from '@/utils/qrcode';

export default {
    name: 'notInstalled',
    props: {
        InstalledShow: {
            type: Boolean,
            default: false,
        },
        source: {
            type: String,
            default: 'header',
        },
    },
    data() {
        return {
            visible: this.InstalledShow,
            browserType: '',
        };
    },
    computed: {
        qrcodeImage() {
            return getQrcodeImage(this.$store.state.locale);
        },
        isNotSupport() {
            return !/(Chrome|Edge)/.test(this.browserType);
        },
    },
    watch: {
        InstalledShow(val) {
            this.visible = val;
        },
    },
    mounted() {
        this.browserType = this.getOS();
    },
    methods: {
        getOS() {
            const ua = navigator.userAgent;
            if (/(Android)/i.test(ua)) return 'Android';
            if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) return 'iOS';
            if (/Edg/i.test(ua)) return 'Edge';
            if (/(Chrome)/i.test(ua)) return 'Chrome';
            return 'PC';
        },
        handleOk() {
            window.open('https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak', '_blank');
            this.$Ta.track({
                name: 'Download_Click',
                data: {
                    download_type: this.source === 'swap' ? 'swap_sellbuy' : 'download_' + this.browserType.toLowerCase(),
                },
            });
            this.$emit('closeInstalledShow', 'AlreadystalledShow');
        },
        afterClose() {
            this.$emit('closeInstalledShow');
        },
    },
};
</script>
<style lang="less" scoped>
.notinstallbox {
    padding-left: 50%;
    box-sizing: border-box;
    background: url(https://cdn.bitkeep.vip/u_b_d2b0ca00-3c13-11ed-b97d-970ef208dfde.jpeg) left top no-repeat;
    background-size: 50% 101%;
    .header-box {
        display: flex;
        padding: 14px 20px;
        justify-content: flex-end;
        .close-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
        }
    }
    .body-box {
        padding: 0 30px 22px 30px;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: flex-start;
        min-height: 302px;
        > img {
            width: 80px;
            height: 80px;
        }
        .notinstallbox-title {
            line-height: 1.2;
            margin-top: 8px;
            font-size: 28px;
            font-weight: 600;
        }
        .notinstallbox-content {
            font-size: 14px;
            line-height: 1.5;
            margin-top: 20px;
            text-align: left;
            list-style-type: disc;
            padding-left: 20px;
        }
        .notinstallbox-btn {
            margin-top: 20px;
            height: 44px;
            justify-content: center;
            align-items: center;
            min-width: 234px;
            padding: 0 12px;
            font-weight: 500;
            font-size: 15px;
            box-sizing: border-box;
            display: flex;
            border-radius: 6px;
            margin-bottom: 38px;
            > img {
                width: 24px;
                height: 24px;
                margin-left: 10px;
            }
        }
        .not-support-box {
            margin-top: 14px;
            > h1 {
                font-weight: 600;
                font-size: 18px;
                line-height: 22px;
            }
            > p {
                font-size: 12px;
                line-height: 1.2;
            }
            .support-list {
                display: flex;
                margin-top: 10px;
                .support-item {
                    text-align: center;
                    margin-right: 10px;
                    width: 56px;
                    height: 46px;
                    &:last-child {
                        margin-right: 0;
                    }
                    > img {
                        width: 28px;
                        height: 28px;
                    }
                    > div {
                        font-size: 12px;
                        line-height: 1.5;
                        text-align: center;
                    }
                }
            }
        }
    }
    .footer-box {
        padding: 10px;
        display: flex;
        align-items: flex-end;
        .qr-code {
            width: 80px;
            height: 80px;
            border-radius: 2px;
            overflow: hidden;
            margin-left: 10px;
            > img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .download-methods-desc {
            flex: 1;
            text-align: right;
            .title {
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
            }
            .sub-title {
                font-size: 14px;
                line-height: 1.3;
                margin-top: 4px;
            }
        }
    }
}
.theme-light {
    .light-img {
        display: inline-block;
    }
    .dark-img {
        display: none;
    }
}
.theme-dark {
    .light-img {
        display: none;
    }
    .dark-img {
        display: inline-block;
    }
}
</style>
