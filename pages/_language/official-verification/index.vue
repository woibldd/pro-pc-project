<template>
    <div class="verificationBox BG0">
        <div class="box">
            <div class="noticeBar">
                {{ $t('official-verification.noticeBar')}}{{hostChange}}
            </div>
            <h1 class="Title text1">
                <img src="@/assets/img/header/BK logo_light.svg" alt="BitKeep,  a best crypto wallet"
                    class="light_icon">
                <img src="@/assets/img/header/BK logo_dark.svg" alt="BitKeep,  a best crypto wallet" class="dark_icon">
                {{ $t('official-verification.Title')}}
            </h1>
            <div class="offical-check-form">
                <input type="text" class="text2" :class="verifyfoucs?'linetext1':'lineBG4'" v-model="channelverify"
                    :placeholder="$t('official-verification.placeholder')" maxlength="255" @focus="verifyfoucs=true" @blur="verifyfoucs=false" @keyup.enter="verify(channelverify)">
                <div class="verify BGpurple" @click="verify(channelverify)">{{$t('official-verification.verify')}}</div>
            </div>
        </div>
        <VerificationModel :ConfirmShow="ConfirmShow" :Verifystatus="Verifystatus" @closeConfirm="closeConfirm" :VerifyData="channelverify">
        </VerificationModel>
    </div>
</template>
<script>
import VerificationModel from '../../../components/officialVerification/Confirm'
export default {
    name: 'official-verificationPage',
    layout: 'IndexPage/default',
    scrollToTop: true,
    head() {
        const locale = this.locale;
        const hostChange = this.hostChange;
        return {
            title: this.$t('official-verification.pageTitle'),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('official-verification.Keyword') },
                { hid: 'description', name: 'description', content: this.$t('official-verification.Description') },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep${hostChange}/${locale}/official-verification` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep${hostChange}/zh/official-verification` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep${hostChange}/en/official-verification` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep${hostChange}/ko/official-verification` },
                { rel: 'alternate', hreflang: 'vi', href: `https://bitkeep${hostChange}/vi/official-verification` },
                { rel: 'alternate', hreflang: 'tr', href: `https://bitkeep${hostChange}/tr/official-verification` },
                { rel: 'alternate', hreflang: 'id', href: `https://bitkeep${hostChange}/id/official-verification` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep${hostChange}/en/official-verification` },
            ]
        }

    },
    async asyncData(app) {
        const {locale, hostChange } = app.store.state;
        return {
            locale: locale,
            hostChange: hostChange,
            verifyfoucs:false
        }
    },
    data() {
        return {
            channelverify: "",
            ConfirmShow: false,
            Verifystatus: 1
        }
    },
    beforeMount() {
        this.$Ta.track({name:'Official_Channel_Verification',data:{
            Page_Enter:'1'
        }})
    },
    mounted() {

    },
    components: { VerificationModel },
    methods: {
        async verify(verifydata) {
            if (!verifydata) {
                this.$message.warn(this.$t('official-verification.noData'));
                return false
            }
            //过滤格式
            // const Chinese = new RegExp("[\\u4E00-\\u9FFF]+","g");
            // const Mail = /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,8}$/;
            // const URL=/^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(:\d+)?(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/
            // if (verifydata.length<8&&(!URL.test(verifydata))) {
            //     this.$message.warn(this.$t('official-verification.Datarule'));
            //     return false
            // }
            const {data,status}=await this.$api.index.officialcheckChannel({content:verifydata})
            if(status==0){
                this.Verifystatus = data?0:1;
                this.$Ta.track({name:'Official_Channel_Verification',data:{
                    Page_Enter:'',
                    Verification_Content:verifydata,
                    Verification_result:data?"sucess":"fail"
                }})
                this.ConfirmShow = true;
            }else{
                this.$message.error(data);
            } 
        },
        closeConfirm() {
            this.ConfirmShow = false;
        }
    }
}
</script>
<style scoped lang="less">
.verificationBox {
    width: 100%;
    min-width: 350px !important;
    min-height: 100vh;
    padding-top: 80px;
    box-sizing: border-box !important;

    .box {
        width: 100%;
        max-width: 1530px;
        margin: 0 auto;
        text-align: center;

        .noticeBar {
            display: inline-block;
            padding: 8px 20px;
            gap: 8px;
            /* Common/light oringe */
            background: rgba(255, 129, 70, 0.1);
            /* Common/oringe */
            border: 1px solid #FF8146;
            border-radius: 4px;
            font-weight: 500;
            font-size: 16px;
            line-height: 1.5;
            color: #FF8146;
            margin: 0 auto;
        }

        .Title {
            margin-top: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 32px;
            line-height: 1.56;

            img {
                display: block;
                width: 180px;
                height: auto;
                min-height: 40px;
                margin-right: 10px;
            }
        }

        .offical-check-form {
            display: flex;
            justify-content: center;
            height: 48px;
            margin-top: 25px;

            input {
                width: 515px;
                height: 100%;
                border-radius: 6px 0px 0px 6px;
                border: 1px solid #C7CBCB;
                box-sizing: border-box;
                padding: 12px 10px;
                font-weight: 400;
                font-size: 16px;
                line-height: 1.5;
            }
            .verify {
                min-width: 109px;
                height: 100%;
                padding: 12px;
                font-weight: 400;
                font-size: 16px;
                line-height: 1.5;
                text-align: center;
                color: #FFFFFF;
                box-sizing: border-box;
                border-radius: 0px 6px 6px 0px;
                cursor: pointer;
            }
        }
    }
}

@media screen and (max-width: 750px) {
    .verificationBox {
        min-height: 100%;
        padding: 60px 20px;
        box-sizing: border-box !important;

        .noticeBar {
            width: 100% !important;
            font-size: 14px !important;
        }
        .Title{
            margin-top: 104px !important;
            font-size: 22px !important;
            line-height: 1 !important;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            img{
                width: 121px !important;
                min-height: 35px !important;
                height: auto !important;
                margin: 0px 0px 12px 0px;
            }
        }
        .offical-check-form{
            flex-direction: column !important;
            margin-top: 22px !important;
            height: auto !important;
            justify-content: center;
            align-items: center;
            input{
                width: 100% !important;
                border-radius: 6px !important;
            }
            .verify{
                display: inline-block !important;
                margin-top: 30px !important;
                min-width: 105px !important;
                border-radius: 4px !important;
            }
        }
    }

}
</style>