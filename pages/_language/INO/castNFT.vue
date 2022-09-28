<template>
    <a-modal 
        :visible="visible" 
        :maskClosable="false" 
        width="420px" 
        :footer="null" 
        :centered="true" 
        class="castBoxModal"
        :closable="false"
        :destroyOnClose="true"
    >
    <div class="castBox" v-if="castBtnFlag == 'NotStarted' || castBtnFlag == 'GetTXS'">
        <div class="castBox-title text1">{{$t('INO.castconfirm')}}<img  @click="cancel" :src="iconList[theme]" alt="close"/></div>
        <div class="castBox-img">
            <img :src="detailInfo.icon" alt="nft img"/>
        </div>
        <div class="castBox-nums">
            <p class="castBox-nums-text text1">{{$t('INO.num')}}</p>
            <p :class=" !redFlag ? 'castBox-nums-left lineBG2' : 'castBox-nums-left lineRed'">
                <span class="reduce text3" @click="changeNums('reduce')"><img :src="theme == 'dark' ? 'https://cdn.bitkeep.vip/u_b_c93055d0-f6be-11ec-bedc-0f2ac0829857.png' : 'https://cdn.bitkeep.vip/u_b_5cb41e50-f6be-11ec-bedc-0f2ac0829857.png'"/></span>
                 <input type="text" v-model="castNums" @input="handleChange($event)" min="0" max="5" class="num text1">
                <span class="plus text3" @click="changeNums('plus')"><img :src="theme == 'dark' ? 'https://cdn.bitkeep.vip/u_b_cd48eb50-f6be-11ec-bedc-0f2ac0829857.png' : 'https://cdn.bitkeep.vip/u_b_61bba7b0-f6be-11ec-bedc-0f2ac0829857.png'"/></span>
            </p>
        </div>
         <!-- <div :class="castNums >= inoStatus.userMaxNum  || (inoStatus.userMintNum != 0 && inoStatus.userMintNum + castNums >= inoStatus.userMaxNum)? 'castBox-max Common_red' : 'castBox-max text3'" >{{inoStatus.userMintNum != 0 && inoStatus.userMintNum + castNums >= inoStatus.userMaxNum? $t('INO.addressMax') : `${$t('INO.perAddress')}${inoStatus.userMaxNum} ${$t('INO.individual')}`}} </div> -->
         <div :class="redFlag? 'castBox-max Common_red' : 'castBox-max text3'" >{{inoStatus.userMintNum != 0 && inoStatus.userMintNum + castNums >= inoStatus.userMaxNum? $t('INO.addressMax') : `${$t('INO.perAddress')}${inoStatus.userMaxNum} ${$t('INO.individual')}`}} </div>
         <div class="castBox-price">
             <p class="castBox-price-text text1">{{$t('INO.price')}}</p>
             <p class="castBox-price-left">
                 <img :src="chainList && detailInfo.chain && chainList[detailInfo.chain].icon ? chainList[detailInfo.chain].icon : 'https://cdn.bitkeep.vip/u_b_9f5c6980-e889-11ec-95b1-8dc52464c9ae.png'" :alt="detailInfo && detailInfo.chain"/>
                <span class="chainPrice text1">{{ castNums && detailInfo.price ? toFixed(detailInfo.price * castNums,6) : 0 }} {{ detailInfo.priceCoinName }}</span>
                <span class="doller text3">~{{ detailInfo.symbol }}{{ castNums && detailInfo.price ?toFixed(detailInfo.priceDollar * castNums,3) :0 }}</span>
             </p>
         </div>
         <div class="detatilbutton">
            <a-button  type="primary" class="connectWallet" @click="castingFunc('cast')">
                 {{castBtnFlag == 'GetTXS' ? $t('INO.castpedding') :$t('INO.cast')}}
            </a-button>
         </div>
    </div>
    
    <div class="castBox" v-if="castBtnFlag == 'start'">
        <div class="castBox-title text1">{{$t('INO.castNFT')}}<img  @click="cancel" :src="iconList[theme]" alt="close"/></div>
        <div class="confirm-img">
            <img :src="theme == 'dark' ?'https://cdn.bitkeep.vip/u_b_1ddcdc50-f3b0-11ec-9d2b-c3235a11b7c7.png' : 'https://cdn.bitkeep.vip/u_b_ed16bf00-f3af-11ec-9d2b-c3235a11b7c7.png'" alt="success"/>
            <p class="success text1">{{$t('INO.castapply')}}</p>
            <p class="confim text1">{{$t('INO.wait')}}</p>
        </div>
         <div class="startbutton">
            <a-button  type="primary" class="viewOrder"> 
                <a :href='"/" +  $route.params.language + "/INO/INOHistory"'  title="查看铸造记录"   @click="viewOrder($event)"> 
                    {{$t('INO.viewOrder')}}
                </a>
            </a-button>
             <a-button  type="primary" class="iknow" @click="cancel('iknow')">
                {{$t('INO.iknow')}}
            </a-button>
         </div>
    </div>
    <div class="castBox" v-if="castBtnFlag == 'nobalance'">
        <div class="castBox-title text1">{{$t('INO.castNFT')}}<img  @click="cancel" :src="iconList[theme]" alt="close"/></div>
        <div class="confirm-img">
            <img :src="theme == 'dark' ?'https://cdn.bitkeep.vip/u_b_a7c110c0-f433-11ec-80a8-ad2bab5ff8fc.png' : 'https://cdn.bitkeep.vip/u_b_aa55ec70-f433-11ec-80a8-ad2bab5ff8fc.png'" alt="balance error"/>
            <p :class=" $route.params.language == 'en' ?'success text1 Unablecast enWidth' : 'success text1 Unablecast'">{{$t('INO.your')}} {{detailInfo.priceCoinName}}{{$t('INO.Unablecast')}}</p>
        </div>
         <div class="startbutton">
            <a-button  type="primary" class="viewOrder nobalance" @click="cancel('iknow')">
               {{$t('INO.iknow')}}
            </a-button>
             <!-- <a-button  type="primary" class="iknow" @click="cancel()">
                兑换 MATIC
            </a-button> -->
         </div>
    </div>
    </a-modal>
</template>
<script>
import { mapMutations,mapGetters } from "vuex";
import BigNumber from 'bignumber.js';
export default {
    name: 'castNFT',
    data() {
        return {
            visible: this.castingShow,
            iconList:{
                light:'https://cdn.bitkeep.vip/u_b_3ae63990-f135-11ec-a1ef-dd9435d555c1.png',
                dark:'https://cdn.bitkeep.vip/u_b_3e3c1b50-f135-11ec-a1ef-dd9435d555c1.png'
            },
            castNums:1,
            castBtnFlag:this.castBtn,
            redFlag:false
        }
    },
    props: {
        castingShow: {
            type: Boolean,
            default: false
        },
        detailInfo:{
            type:Object,
            default:{}
        },
        chainList:{
            type:Object,
            default:{}
        },
        address:{
            type:String,
            default:''
        },
        castBtn:{
            type:String,
            default:false
        },
        inoStatus:{
            type:Object,
            default:{}
        },
    },
    watch:{
         castBtn: function (newVal, oldVal) {
            this.castBtnFlag = newVal;
        },
    },
    computed:{
        theme(){
            return this.GetTheme()
        }
    },
    methods: {
        ...mapMutations(['changeIno']),
        ...mapGetters(['GetTheme']),
        toFixed(nums,decimal){
            if(nums && decimal){
                let num = Number(nums).toFixed(decimal);
                num = num.toString();
                if (num.indexOf('.') && !Number(num)) {
                    let num1 = num.split('.');
                    num = BigNumber(0.1).pow(num1[1].length);
                }
                // let num =nums.toString();
                //  num = num.substring(0,num.indexOf(".") + decimal)
                return Number(num)
            }
        },
        viewOrder(event){
            this.$Ta.track({
                name:"Web_Ino",
                data:{
                Action_Location_Name:'inodetatil_castingcompleted',
                Action_Sub_Name:'MintingRecord',
            }})
            if (event && event.preventDefault){
                 event.preventDefault();
            }else{
                window.event.returnValue = false;
            }
            this.changeIno({id:'',series:'',type:'detail'})
            const { ...query } = this.$route.query
            const { language } = this.$route.params
            this.$router.push({
                path: '/' + language + '/INO/INOHistory',
                query: query
            })
        },
        castingFunc(){
            // 1. 超过用户最大的mint数量 2.当前所有的mint总数加上mint的数量超过 总mint数量 3.
            if(!this.castNums ||(this.castNums  > this.inoStatus.userMaxNum) || (this.inoStatus.currencyMint +  this.castNums > this.inoStatus.totalMinted) || (this.inoStatus.userMintNum + this.castNums > this.inoStatus.userMaxNum )){
                return
            }
            this.$emit('cloaseCastNft',{type:'cast',castNums:this.castNums})
        },
        cancel(type){
            this.$emit('cloaseCastNft',{type:type,castNums:''})
        },
        changeNums(type){
            if(type === 'reduce'){
                if( this.castNums == 1){
                    this.castNums = 1;
                    return
                }
                this.castNums = this.castNums -1;
                this.handleChange()
                if(this.inoStatus.userMaxNum == this.castNums || (this.inoStatus.userMintNum != 0 && this.inoStatus.userMintNum  + this.castNums >= this.inoStatus.userMaxNum)){
                    this.redFlag = true;
                        return
                }else{
                    this.redFlag = false;
                }
            }else{
                if(this.inoStatus.userMaxNum == this.castNums || (this.inoStatus.userMintNum != 0 && this.inoStatus.userMintNum  + this.castNums >= this.inoStatus.userMaxNum)){
                    this.redFlag = true;
                    return
                }
                this.castNums = this.castNums + 1;
                this.handleChange()
            }
        },
        handleChange(){
            let text = this.castNums;
            if(text.toString() == "0."){
                text = '0'
            }
            if(!text.toString()){
                return
            }
            text = text.toString().replace(/[^\d]/g,'');
            this.castNums =  Number(text)
            if(this.castNums > this.inoStatus.userMaxNum || (this.inoStatus.userMintNum != 0 && this.inoStatus.userMintNum  + this.castNums >= this.inoStatus.userMaxNum)){
                this.castNums =  this.inoStatus.userMintNum != 0 && this.inoStatus.userMintNum  + this.castNums >= this.inoStatus.userMaxNum ? this.inoStatus.userMaxNum - this.inoStatus.userMintNum  : this.inoStatus.userMaxNum
            }
        }
    },
    watch: {
        castingShow(val) {
            this.visible = val
        },
        castBtn(val) {
            this.castBtnFlag = val;
        },
    }
}
</script>
<style lang="less" scoped>
.theme-light {

    .detatilbuttonDisable {
        /deep/.ant-btn-primary {
            border: none;
            background: #E5E3E9 !important;
            color: #FFFFFF !important;
            border-radius: 8px;
        }
    }
    .viewOrder{
        background: #F8F8F9!important;
        border: 1px solid #F2F2F5!important;
        border-radius: 8px;
        color: #0E0E0E!important;
    }
}

.theme-dark {
    .detatilbuttonDisable {
        .ant-btn-primary {
            border: none;
            background: #2E2D38 !important;
            color: #707076 !important;
            border-radius: 8px;
        }
    }
    .viewOrder{
        background: #202024!important;
        border: 1px solid #252529!important;
        border-radius: 8px;
         color: #E5E5E5!important;
    }
}
.castBoxModal{
    /deep/.ant-modal-body{
        border-radius: 12px;
        padding: 0 20px 20px;
    }
    .castBox{
        width: 100%;
        height: 420px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    .castBox-title{
        line-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 18px;
        position: relative;
        img{
            position: absolute;
            right: 0px;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
    .confirm-img{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        img{
            width: 60px;
            height: 60px;
        }
        .success{
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
        }
        .enWidth{
            width: 200px!important;
        }
        .Unablecast{
            width: 142px;
            text-align: center;
            margin-top: 20px;
        }
        .confim{
            font-size: 14px;
            line-height: 16px;
            margin-top: 8px;
        }
    }
    .castBox-img{
        flex: 1;
        // width: 100%;
        // height: 100%;
        display: flex;
        justify-content: center;
        border-radius: 4px;
        img{
            width: 120px;
            height: 120px;
             border-radius: 4px;
        }
    }
    .castBox-nums{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .castBox-nums-text{
            font-weight: 500;
            font-size: 14px;
        }
        .lineRed{
            border-color: #F36464!important;
        }
        .castBox-nums-left{
            width: 132px;
            height: 36px;
            border: 1px solid;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            .reduce{
                display: inline-block;
                width: 36px;
                height: 36px;
                font-size: 16px;
                line-height: 36px;
                cursor: pointer;
                img{
                    width:16px;
                    height: 16px;
                }
            }
            .plus{
                display: inline-block;
                width: 36px;
                height: 36px;
                font-size: 16px;
                line-height: 36px;
                cursor: pointer;
                img{
                    width:16px;
                    height: 16px;
                }
            }
            .num{
                width: 100%;
                display: inline-block;
                flex: 1;
                line-height: 36px;
                text-align: center;
            }
        }
    }
    .castBox-max{
        font-weight:normal!important;
        // font-family: none;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 8px;
        display: flex;
        justify-content: flex-end;
        padding-bottom: 8px;
    }
    .castBox-price{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        img{
            width: 24px;
            height: 24px;
            margin-right: 4px;
        }
        .castBox-price-text{
            font-weight: 500;
        }
        .chainPrice{
            font-weight: 600;
            font-size: 16px;
        }
        .doller{
            font-size: 14px;
        }
        .castBox-price-left{
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
        .detatilbutton {
        // width: 380px;
        height: 50px;
        margin-top: 20px;

        .ant-btn-primary {
            width: 100%;
            height: 100%;
            font-weight: 600;
            font-size: 15px;
            border-radius: 8px;
        }
    }
    .startbutton{
        display: flex;
        justify-content: space-between;
        .viewOrder{
            width: 185px;
            height: 50px;
            border-radius: 8px;
        }
        .nobalance{
            width: 380px;
        }
        .iknow{
            width: 185px;
            height: 50px;
            border-radius: 8px;
        }
    }
}
}
</style>