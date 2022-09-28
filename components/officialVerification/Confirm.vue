<template>
    <a-modal v-model:visible="visible" :maskClosable="false" width="420px" :footer="null" :centered="true"
        class="modal-box" :closable="false">
        <div class="Confirm">
            <img class="Verifystatus" src="https://cdn.bitkeep.vip/u_b_2893b780-2dea-11ed-8234-ffeb64e2fb1d.png" alt="" v-show="Verifystatus==0">
            <img class="Verifystatus" src="https://cdn.bitkeep.vip/u_b_28c500b0-2dea-11ed-8234-ffeb64e2fb1d.png" alt="" v-show="Verifystatus!=0">
            <div class="offical-check-title text1" v-show="Verifystatus==0">{{$t('official-verification.verifysuccessTitle')}} </div>
            <div class="offical-check-title text1" v-show="Verifystatus!=0">{{$t('official-verification.verifyfailTitle')}} </div>
            <div class="Confirm-content text2">
                {{$t('official-verification.verifyText')}}
                <span class="Colorpurple" v-show="Verifystatus==0">{{VerifyText}}</span>
                <span class="Common_red" v-show="Verifystatus!=0">{{VerifyText}}</span>
                <span v-show="Verifystatus==0">{{$t('official-verification.verifysuccessDescription')}}</span>
                <span v-show="Verifystatus!=0">{{$t('official-verification.verifyfailDescription')}}</span>
            </div>
            <div class="Confirm-btn">
                <a-button type="primary"  class="Common_white" @click="afterClose">{{$t('official-verification.iknow')}}</a-button>
            </div>
        </div>
    </a-modal>
</template>
<script>
export default {
    name: 'VerifyConfirm',
    data() {
        return {
            visible: false
        }
    },
    props: {
        ConfirmShow: {
            type: Boolean,
            default: false
        },
        Verifystatus: {
            type: Number,
            default: 1
        },
        VerifyData:{
            type:String,
            default:""
        }
    },
    methods: {
        afterClose() {
            this.visible=false
            this.$emit('closeConfirm')
        }
    },
    computed:{
        VerifyText(){
            return this.VerifyData
        }
    },
    watch:{
        ConfirmShow(newVal){
            this.visible=newVal
        }
    }
}
</script>
<style lang="less" scoped>
.Confirm {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px -4px !important;
    box-sizing: border-box;
    .Verifystatus{
        display: block;
        width: 60px;
        min-height: 60px;
    }
    .offical-check-title{
        margin: 20px 0px;
        font-weight: 600;
        font-size: 24px;
        line-height: 100%;
    }
    .Confirm-content {
        width: 100%;
        word-wrap: break-word;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        /* or 24px */
        text-align: center;
        .verifyPass{
            color: #F36464;
        }
    }

    .Confirm-btn {
        text-align: center;
        margin-top: 30px;

        button {
            min-width: 164px;
            height: 44px;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            border-radius: 6px;
            color: #FFFFFF;
        }
    }
}
</style>