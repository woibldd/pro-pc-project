<template>
    <a-modal :visible="visible" :mask-closable="false" width="420px" :footer="null" :centered="true" :closable="false" :body-style="{ padding: 0 }">
        <div class="notinstallbox">
            <div class="BG0">
                <div class="header-box">
                    <div class="close-button" @click="afterClose">
                        <a-icon type="close" class="text1" :style="{ fontSize: '18px', cursor: 'pointer' }" />
                    </div>
                </div>
                <div class="body-box">
                    <img src="https://cdn.bitkeep.vip/u_b_a75085e0-3c17-11ed-b97d-970ef208dfde.png" alt="" />
                    <h1 class="notinstallbox-content text1">
                        {{ $t('isInstallModel.alreadyinstall') }}
                    </h1>
                    <a class="notinstallbox-btn Common_white BGpurple" @click="Refresh">{{ $t('isInstallModel.refresh') }}</a>
                    <div class="netinstallTips">
                        <span class="text1">{{ $t('isInstallModel.noinstalltext1') }}</span>
                        <span class="color-purple" @click="handleOk">{{ $t('isInstallModel.noinstalltext2') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>
<script>
export default {
    name: 'notInstalled',
    data() {
        return {
            visible: this.InstalledShow,
            browserType: '',
        };
    },
    props: {
        AlreadyInstalledShow: {
            type: Boolean,
            default: false,
        },
        source: {
            type: String,
            default: 'header',
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
        Refresh() {
            window.location.reload();
        },
        handleOk() {
            this.$Ta.track({
                name: 'Download_Click',
                data: {
                    download_type: this.source === 'swap' ? 'swap_sellbuy' : 'download_' + this.browserType.toLowerCase(),
                },
            });
            window.open('https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak', '_blank');
        },
        afterClose() {
            this.$emit('closeAlreadystalledShow');
        },
    },
    watch: {
        AlreadyInstalledShow(val) {
            this.visible = val;
        },
    },
};
</script>
<style lang="less" scoped>
.notinstallbox {
    box-sizing: border-box;
    .header-box {
        display: flex;
        padding: 18px 20px 0 20px;
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
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        > img {
            width: 280px;
            height: 200px;
        }
    }
    .notinstallbox-content {
        font-size: 20px;
        line-height: 1.5;
        margin-top: 10px;
        font-weight: 600;
    }
    .notinstallbox-btn {
        margin-top: 40px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 185px;
        height: 50px;
        padding: 0 12px;
        font-size: 16px;
        font-weight: 600;
        box-sizing: border-box;
        border-radius: 6px;
    }
    .netinstallTips {
        margin-bottom: 46px;
        display: flex;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        :first-child {
            margin-right: 10px;
        }
        :last-child {
            cursor: pointer;
        }
    }
}
.theme-light {
    .color-purple {
        color: @theme-light-purple;
    }
    .light-img {
        display: inline-block;
    }
    .dark-img {
        display: none;
    }
}
.theme-dark {
    .color-purple {
        color: @theme-dark-purple;
    }
    .light-img {
        display: none;
    }
    .dark-img {
        display: inline-block;
    }
}
</style>
