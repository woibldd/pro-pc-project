<template>
    <div  class="BG0 box about box-small">
       <div class="one text1 BG0">
            <div class="one-box oneContent">
                <div class="left">
                    <img src="https://cdn.bitkeep.vip/u_b_3aba6990-1940-11ed-a358-7fe0de42a4a9.png" alt="" class="light-img light_icon">
                    <img src="https://cdn2.bitkeep.vip/web/pro-www/images/about_dark.75c78.png" alt="" class="dark-img dark_icon">
                </div>
                <div class="right">
                    <h1 bklang="about_one_1" class="text1">{{$t('aboutLang.aboutwe')}}</h1>
                    <p bklang="about_one_2 text1">{{$t('aboutLang.aboutText')}}</p>
                </div>
            </div>
       </div>
       <div class="two text1 BG1">
           <div class="two-box contbox">
                <h2 bklang="about_two_1" class="text1">{{$t('aboutLang.abouttitle')}}</h2>
                <p bklang="about_two_2">{{$t('aboutLang.aboutContent')}}</p>
                <p bklang="about_two_3">{{$t('aboutLang.aboutContentOne')}}</p>
                <div class="itembox">
                    <div class="item">
                        <div class="imgBox">
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_72646d30-1947-11ed-a358-7fe0de42a4a9.png" alt="">
                            <img class="dark_icon"  src="https://cdn.bitkeep.vip/u_b_a8f91a40-e6fb-11ec-bb8e-bf60e185c598.png" alt="More than 4 Millions users">
                        </div>
                        <div class="tit" bklang="about_two_4">{{$t('aboutLang.aboutuv')}}</div>
                        <div class="num GB">6,000,000<span>+</span></div>
                    </div>
                    <div class="item">
                        <div class="imgBox">
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_ff70be90-9df5-11ec-aac8-bf8a172584ab.png" alt="More than 1 Billion accumulated assets of users">
                            <img class="dark_icon"  src="https://cdn.bitkeep.vip/u_b_a8fac7f0-e6fb-11ec-bb8e-bf60e185c598.png" alt="More than 1 Billion accumulated assets of users">
                        </div>
                        <div class="tit" bklang="about_two_5">{{$t('aboutLang.aboutassets')}}</div>
                        <div class="num GB" v-if="locale == 'ko'" bklang="about_two_6"><span>$</span>10<span style="display: inline-block;margin-left: 8px;">{{$t('aboutLang.aboutBillion')}}</span><span>+</span></div>
                         <div class="num GB" v-else-if="locale == 'en'" bklang="about_two_6"><span>$</span>1<span style="display: inline-block;margin-left: 8px;">{{$t('aboutLang.aboutBillion')}}</span><span>+</span></div>
                        <div class="num GB" v-else bklang="about_two_6"><span>$</span>10<span>+</span><span style="display: inline-block;margin-left: 8px;">{{$t('aboutLang.aboutBillion')}}</span></div>
                    </div>
                    <div class="item">
                        <div class="imgBox">
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_ff70e5a0-9df5-11ec-aac8-bf8a172584ab.png" alt="More than 5 Billions transactions amount">
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_a8f63410-e6fb-11ec-bb8e-bf60e185c598.png" alt="More than 5 Billions transactions amount">
                        </div>
                        <div class="tit" bklang="about_two_7">{{$t('aboutLang.aboutmoney')}}</div>
                        <div v-if="locale == 'ko'" class="num GB" bklang="about_two_8"><span>$</span>5,000<span style="display: inline-block;margin-left: 8px;">{{$t('aboutLang.aboutBillion')}}</span><span>+</span></div>  
                        <div v-else  class="num GB" bklang="about_two_8"><span>$</span>500<span>+</span><span style="display: inline-block;margin-left: 8px;">{{$t('aboutLang.aboutBillion')}}</span></div>     
                    </div>
                    <div class="item">
                        <div class="imgBox">
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_ff707070-9df5-11ec-aac8-bf8a172584ab.png" alt="Covering more than 160 countries and regions">
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_a8f7e1c0-e6fb-11ec-bb8e-bf60e185c598.png" alt="Covering more than 160 countries and regions">
                        </div>
                        <div class="tit" bklang="about_two_9">{{$t('aboutLang.aboutcountry')}}</div>
                        <div class="num GB">168<span>+</span></div>
                    </div>
                </div>
           </div>
       </div>
       <div class="three text1 BG0" >
            <div class="adots"></div>
            <div class="bdots"></div>
            <div class="three-box contbox">
                <h2 bklang="about_three_1" class="text1">{{$t('aboutLang.aboutMajor')}}</h2>
                <div class="cardBox">
                    <div class="card">
                        <div class="cont">
                            <div class="titBox titOne BG1">
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_2"><span class='num'>{{$t('aboutLang.aboutMajorfivemon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_3" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutMajorcompany')}}</li>
                                </ul>
                                 <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_2"><span class='num'>{{$t('aboutLang.aboutMajortenmon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_3" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutMajor90w')}}</li>
                                </ul>
                                <!-- <ul>
                                    <li class="GB" bklang="about_three_4"><span class='num'></span>{{$t('aboutLang.aboutMajortenmon')}}</li>
                                    <li bklang="about_three_5">{{$t('aboutLang.aboutMajor90w')}}</li>
                                </ul> -->
                            </div>
                            <div class="line GB">
                                2018
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="cont">
                            <div class="titBox titTwo BG1">
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_6"><span class='num'>{{$t('aboutLang.aboutMajorfivemon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_7" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutoverseas')}}</li>
                                </ul>
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_8"><span class='num'>{{$t('aboutLang.aboutMajorsixmon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_9" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutGlobal')}}</li>
                                </ul>
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_10"><span class='num'>{{$t('aboutLang.aboutMajortenmon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_11" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutPublicchain')}}</li>
                                </ul>
                            </div>
                            <div class="line GB">
                                2019
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="cont">
                            <div class="titBox titThree BG1">
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_12"><span class='num'>{{$t('aboutLang.aboutMajortwomon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_13" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.about40')}}</li>
                                </ul>
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_14"><span class='num'>{{$t('aboutLang.aboutEightmon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_15" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutDefi')}}</li>
                                </ul>
                            </div>
                            <div class="line GB">
                                2020
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="cont">
                            <div class="titBox titFour BG1">
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_16"><span class='num'>{{$t('aboutLang.aboutMajortwomon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_17" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.aboutSwap')}}</li>
                                </ul>
                                <ul :class="locale == 'en' ? 'enBox' : ''">
                                    <li class="GB" bklang="about_three_18"><span class='num'>{{$t('aboutLang.aboutMajorfivemon')}}</span>{{$t('aboutLang.month')}}</li>
                                    <li bklang="about_three_19" :class="locale== 'zh' ?''  :'threecontent'">{{$t('aboutLang.about60')}}</li>
                                </ul>
                            </div>
                            <div class="line GB">
                                2021
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <div class="four text1 BG1" id="Contact_us" ref="Contact_us">
            <div class="four-box contbox">
                <h2 bklang="about_four_1" class="text1">{{$t('aboutLang.aboutcontactus')}}</h2>
                <div class="itemBox">
                    <div class="item">
                        <div class="cont">
                            <a href="mailto:product@bitkeep.com">
                                <span class="imgbox"><img src="https://cdn.bitkeep.vip/u_b_ad9c9ac1-9df6-11ec-aac8-bf8a172584ab.png" alt="Contact Bitkeep for product feedback"></span>
                                <h2 class="GB text1" bklang="about_four_2">{{$t('aboutLang.aboutfeedback')}}</h2>
                                <p class="text1">product@bitkeep.com</p>
                            </a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="cont">
                            <a href="mailto:business@bitkeep.com">
                                <span class="imgbox"><img src="https://cdn.bitkeep.vip/u_b_ad982df0-9df6-11ec-aac8-bf8a172584ab.png" alt="Contact Bitkeep for business cooperation"></span>
                                <h2 class="GB text1" bklang="about_four_3">{{$t('aboutLang.aboutBusiness')}}</h2>
                                <p class="text1">business@bitkeep.com</p>
                            </a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="cont">
                            <a href="mailto:business@bitkeep.com">
                                <span class="imgbox"><img src="https://cdn.bitkeep.vip/u_b_ad9c9ac0-9df6-11ec-aac8-bf8a172584ab.png" alt="Contact Bitkeep for media cooperation"></span>
                                <h2 class="GB text1" bklang="about_four_4">{{$t('aboutLang.aboutMedia')}}</h2>
                                <p class="text1">business@bitkeep.com</p>
                            </a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="cont">
                            <a href="mailto:support@bitkeep.com">
                                <span class="imgbox"><img src="https://cdn.bitkeep.vip/u_b_ad9c4ca0-9df6-11ec-aac8-bf8a172584ab.png" alt="Customer service"></span>
                                <h2 class="GB text1" bklang="about_four_5">{{$t('aboutLang.aboutsupport')}}</h2>
                                <p class="text1">support@bitkeep.com</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    export default{
        layout: 'jobs/default',
        scrollToTop: true,
        data(){
            return{
                popconfirm:{
                    flag:false,
                    type:''
                },
                activeItemBox:'',
                locale:this.$store.state.locale,
            }
        }, 
        head() {
            const { language } = this.$route.params;
            return {
                title: this.$t('aboutLang.title'),
                meta: [
                    { name: 'keywords', content:this.$t('aboutLang.Keyword') },
                    { name: 'description', content:this.$t('aboutLang.Description') },
                    { name: 'title', content:this.$t('aboutLang.title') },
                    { name: 'og:title', content:this.$t('aboutLang.title') },
                    { name: 'og:description', content:this.$t('aboutLang.Description') },
                    { name: 'twitter:title', content:this.$t('aboutLang.title') },
                    { name: 'twitter:description', content:this.$t('aboutLang.Description') },
                    { name:'twitter:card', content: "summary_large_image"},
                    { name:'twitter:site', content: "BitKeep"},
                    { name:'og:type', content: "website"},
                    { name:'og:site_name', content: "BitKeep"},
                    { hid:'og:image:src', content: "https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png"  },
                    { hid:'og:image', content: "https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png"  },
                    {hid:'og:image:alt', name: 'og:image:alt', content:'BitKeep, a Best Crpto Wallet' },
                    {hid:'twitter:image', name: 'twitter:image', content:'https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png' },
                    {hid:'twitter:image:src', name: 'twitter:image:src', content:'https://cdn.bitkeep.vip/u_b_26e281b0-a509-11ec-a3eb-f758fa002ae8.png' },
                    {hid:'twitter:image:alt', name: 'twitter:image:alt', content:'BitKeep, a Best Crpto Wallet' },
                ],
                link: [
                    { rel: 'canonical', href: `https://bitkeep.com/${language}/about` },
                    { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/about` },
                    { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/about` },
                    { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/about` },
                    { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com/en/about` },
                ]
            }
        },
        mounted(){
            // Contact_us
            this.$nextTick(() => {
                if(window.location.href.includes('about?Contact_us')) {
                    let current = this.$refs.Contact_us;
                    console.log(current,'dldldk')
                    if(current){
                        window.scrollTo(0,current.getBoundingClientRect().top);
                    }else{
                        window.scrollTo(0,0);
                    }
                }else{
                    window.scrollTo(0,0);
                }
            })
        },
        methods: {
            close(){
                this.popconfirm={
                    flag:false,
                    type:''
                }
            },
            viewPop(type){
                this.popconfirm={
                    flag:true,
                    type:type
                }
            }
        }
    }
</script>
<style lang="less" scoped>
  .h5GB {
    font-weight: 600;
  }
  .GB {
    font-weight: 600;
}
.GL {
    font-family: GilroyLight;
    font-weight: 600;
}
   @media only screen and (max-width: 375px) {
    .box-small {
        .one{
            .one-box{
                .left{
                    width: 310px!important;
                    height: 324px!important;
                }
            }
        }
    }
   }

  @media only screen and  (max-width: 350px) {
    .box-small {
        width: 350px;
    }
  }
   @media only screen and (max-width: 420px) {
    .box-small {
        .one{
            .one-box{
                .left{
                    width: 100%!important;
                    height: 324px!important;
                }
            }
        }
    }
   }
    @media only screen and (max-width: 830px) {
        .box-small {
            .one{
                height: 100%;
                padding-bottom: 50px;
                padding: 0 20px;
                .one-box {
                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: center;
                    padding-bottom: 100px;
                    .right{
                        position: unset;
                        margin: 0 auto;
                        max-width: 596.4px;
                        width: 100%;
                        h1{
                            font-size: 50px;
                        }
                        p{
                            font-size: 14px;
                        }
                    }
                    .left{
                        margin: 0 auto;
                        margin-top: 70px;
                        // width: 98%!important;
                        background-size: 100% 100%;
                    }
                }
            }
            .two{
                padding: 0 20px;
                height: 100%;
                .two-box {
                    h2{
                        font-size: 32px;
                    }
                    p{
                        font-size: 16px;
                    }
                    .itembox{
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                        margin-top: 60px;
                        padding-bottom: 80px;
                        .item{
                            width: 100%;
                            margin-top: 113px;
                            &:nth-child(1){
                                margin-top: 0px;
                            }
                        }
                    }
                }
            }
            .three{
                width: 100%;
                height: 100%;
                .three-box {
                    padding-bottom: 100px;
                    ::-webkit-scrollbar {display:none}
                    h2{
                        font-size: 30px;
                    }
                    .cont{
                        width: 295px;
                        height: 337px;
                    }
                    .cardBox{
                        width: 345px;
                        margin: 0 auto;
                        overflow-x: auto;
                        display: flex;
                        }
                        .titBox{
                            height: 100%;
                            .num{
                                font-size: 40px;
                            }
                            li{
                                font-size: 20px;
                                line-height: 28px;
                            }
                            .enBox{
                                .num{
                                    font-size: 34px;
                                }
                                li{
                                    font-size: 16px;
                                    line-height: 25px;
                                }
                            }
                        }
                        .cardBox{
                            height: 540px;
                        .card{
                            width: unset;
                            float: unset;
                            .line{
                            width: 295px;
                            font-size: 40px;
                            }
                        }
                    }
                }
            }
            .four{
                width: 100%;
                height: 100%;
                padding: 0 20px;
                h2{
                    font-size: 30px;
                }
                .itemBox{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-top: 85px;
                    padding-bottom: 80px;
                    .item{
                        margin-top: 104px;
                        width: 100%;
                        height: 100%;
                        &:nth-child(1){
                            margin-top: 0px;
                        }
                        h2{
                            font-size: 24px;
                        }
                        p{
                            font-size: 20px;
                        }
                    }
                }
            }
        }  
  }
  @media only screen and (min-width: 830px) and (max-width: 1000px) {

    .contbox {
      width: 1000px;
    }
    .oneContent {
      max-width: 1000px;
    }
    .one-box .right{
        width: 490px!important;
    }
    .one-box .left{
        width: 324px!important;
        height: 324px!important;
    }
    .three-box{
        .titBox{
            width: 216px!important;
            height: 258px!important;
        }
        .line{
            width: 216px!important;
        }
    } 
    .three-box .titBox li:nth-child(1) {
        line-height: 20px;
    }
    .three-box .titBox .num{
          font-size: 24px!important;
    }
    .three-box .titBox li:nth-child(2) {
        font-size: 13px;
        line-height: 20px;
    }
  }
  @media only screen and (min-width: 1000px) and (max-width: 1100px) {
    .contbox {
      max-width: 1000px;
    } 
    .oneContent {
      max-width: 1000px;
    }
    .one-box .left{
        width: 334px!important;
        height: 334px!important;
    }
    .one-box .right{
        width: 490px!important;
    }
    .three-box{
        .titBox{
            width: 223px!important;
            height: 266px!important;
        }
        .line{
            width: 223px!important;
        }
    } 
    .three-box .titBox li:nth-child(1) {
        line-height: 20px;
    }
    .three-box .titBox li:nth-child(2) {
        font-size: 14px;
        line-height: 20px;
    }
  }
  @media only screen and (min-width: 1100px) and (max-width: 1200px) {

    .oneContent {
      max-width: 1000px;
    }
    .one-box .left{
        width: 345px!important;
        height: 345px!important;
    }
        .one-box .right{
            width: 534px!important;
        }
    .three-box{
        .titBox{
            width: 230px!important;
            height: 275px!important;
        }
        .line{
            width: 230px!important;
        }
    } 
  }
@media only screen and (min-width: 1300px) and (max-width: 1400px) {
    .oneContent {
      max-width: 1100px;
    }
  }
@media only screen and (min-width: 1400px) and (max-width: 1500px) {
    .oneContent {
      max-width: 1200px;
    }
    .contbox{
         max-width: 1200px;
         margin: 0 auto;
    }
    .three-box .titBox .num{
        font-size: 28px!important;
    }
    // .three-box .titBox li{
    //     font-size: 20px;
    //     line-height: 23px!important;
    // }
    // .threecontent{
    //     line-height: 22px!important;
    // }
  }
  @media only screen and (min-width: 1500px) and (max-width: 1600px) {
    .oneContent {
      max-width: 1300px;
    }
    .three-box .titBox .num{
        font-size: 28px!important;
    }
  }
  @media only screen and (min-width: 1700px) {
    .oneContent {
      max-width: 1500px;
    }
    .contbox{
        max-width: 1500px;
        margin: 0 auto;
    }
    .one-box .left{
        width: 410px!important;
        height: 410px!important;
    }
    .one-box .right h1{
    font-size: 41px;
    }
    .one-box .right{
        width: 648px!important;
        top: 190px!important;
    }
    .three-box .titBox .num{
        font-size: 30px!important;
    }
    .three-box .cardBox .card{
        width: 345px!important;
        height: 540px!important;
    }
    .three-box .titBox{
        width: 273px!important;
        height: 326px!important;
    }
    .three-box .cardBox .card .line{
         width: 273px!important;
    }
    .three-box .titBox li{
        line-height: 25px!important;
    }
   .three-box .titBox li {
    font-weight: 400;
    line-height: 20px;
    font-size: 16.72px;
}
  }

.theme-light{
    .three-box .cardBox .card .line {
        border-top: 7px solid #0E1B40;
    }
    .three-box .cardBox .card:hover .line {
        color: #7524F9;
        border-color: #7524F9;
    }
    .one-box .left {
        position: relative;
        width: 378px;
        height: 378px;
        margin-left: 112px;
        // background: url("https://cdn.bitkeep.vip/u_b_3aba6990-1940-11ed-a358-7fe0de42a4a9.png") no-repeat;
        // background-size: 100% auto;
    }
}
.theme-dark{
    .three-box .cardBox .card .line {
        border-top: 7px solid #E5E5E5;
    }
    .three-box .cardBox .card:hover .line {
        color: #7524F9;
        border-color: #7524F9;
    }

    .one-box .left {
        position: relative;
        width: 378px;
        height: 378px;
        margin-left: 112px;
        // background: url("https://cdn.bitkeep.vip/u_b_46127710-1940-11ed-a358-7fe0de42a4a9.png") no-repeat;
        // background-size: 100% auto;
    }
}
.one {
    height: 683.1px;
    width: 100%;
}
.one-box  {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    overflow: hidden;
    padding-top: 130.7px;
    margin: 0 auto;
}
.one-box .left .adots {
    position: absolute;
    left: 784px;
    top: 42px;
    width: 151.2px;
    height: 92.3px;
    // background: url(https://cdn.bitkeep.vip/u_b_ab91f320-9df5-11ec-aac8-bf8a172584ab.png) no-repeat;
    // background-size: 100% auto;
}
.one-box .left .bdots {
    position: absolute;
    right: -74.2px;
    bottom: -35px;
    width: 151.2px;
    height: 54px;
    // background: url(https://cdn.bitkeep.vip/u_b_ab91f321-9df5-11ec-aac8-bf8a172584ab.png) no-repeat;
    // background-size: 100% auto;
}
.one-box .right {
    position: absolute;
    right: 0;
    top: 163px;
    width: 596.4px;
}
.one-box .right h1{
    font-size: 38px;
}
.one-box .right p {
    margin-top: 14px;
    font-size: 18px;
    line-height: 26.25px;
    font-weight: 400;
}
.two {
    width: 100%;
    height: 596.4px;
}
.two-box {
    box-sizing: border-box;
    padding-top: 70px;
}
.two-box h2 {
    text-align: center;
    margin-bottom: 7px;
    font-size: 41px;
}
.two-box p {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
}
.two-box .itembox {
    box-sizing: border-box;
    width: 100%;
    height: 210px;
    overflow: hidden;
    margin-top: 112px;
}
.two-box .itembox .item {
    width: 25%;
    float: left;
}
.two-box .itembox .item .imgBox {
    width: 70px;
    height: 70px;
    margin: 0 auto;
}
.two-box .itembox .item .imgBox img {
    // display: block;
    width: 100%;
}
.two-box .itembox .item .tit {
    text-align: center;
    font-size: 14px;
    line-height:14px;
    margin-top: 7px;
}
.two-box .itembox .item .num {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    margin-top:7px;
}
.two-box .itembox .item .num span {
    font-size: 26.25px;
}

.three {
    position: relative;
    width: 100%;
    height: 770px;
}
.three .adots {
    position: absolute;
    right:42px;
    top: -35px;
    width: 121.7px;
    height: 74.2px;
    background-size: 100% auto;
}
.three .bdots {
    position: absolute;
    left: 28px;
    bottom: -58.1px;
    width: 145.6px;
    height: 121.79px;
    background-size: 100% auto;
}
.three-box {
    box-sizing: border-box;
    padding-top:87.5px;
    height: 100%;
}
.three-box h2 {
    text-align: center;
    font-size: 41px;
}
.three-box .cardBox {
    height: 497.69px;
    margin-top: 42px;
}
.three-box .cardBox .card {
    cursor: pointer;
    position: relative;
    width: 23%;
    height: 100%;
    float: left;
    margin: 0 1%;
}
.three-box .cardBox .card:hover .titBox {
    color: #fff;
    background: #7524F9;
    box-shadow: 0px 30px 40px 0px #0e1b4031;
}
.three-box .cardBox .card:hover .line {
    color: #7524F9;
    border-color: #7524F9;
}
.activeCard .titBox{
    color: #fff;
    background: #7524F9;
    box-shadow: 0px 30px 40px 0px #0e1b4031;
}
.activeCard .line{
    color: #7524F9;
    border-color: #7524F9;
}
.three-box .cardBox .card .line {
    position: absolute;
    bottom: 0;
    width: 252px;
    height: 70px;
    border-top: 7px solid #0E1B40;
    text-align: center;
    font-size: 28px;
    line-height: 70px;
}
.three-box .cont {
    width: 252px;
    margin: 0 auto;
}
.three-box .titBox {
    box-sizing: border-box;
    height: 301px;
    width: 100%;
    padding: 24px;
    margin: 0 auto;
    // background: #F7F9FA;
    font-size: 14px;
}
.three-box .titBox .num {
    font-size: 25.6px;
    font-weight: 600;
}
.three-box .titBox .yue {
    font-size: 14px;
    font-weight: normal;
}
.three-box .titBox li {
    font-weight: 400;
    line-height: 20px;
    font-size: 15.4px;
}
.three-box .titOne {
    margin-top: 105px;
}
.three-box .titOne ul {
    margin-bottom: 42px;
}
.three-box .titTwo {
    margin-top: 78.75px;
}
.three-box .titTwo ul {
    margin-bottom: 28px;
}
.three-box .titThree {
    margin-top: 52.5px;
}
.three-box .titThree ul {
    margin-bottom: 42px;
}
.three-box .titFour {
    margin-top: 26.25px;
}
.three-box .titFour ul {
    margin-bottom: 42px;
}

.four {
    width: 100%;
    height: 392px;
    // background: #F7F9FA;
}
.four-box {
    box-sizing: border-box;
    padding-top: 70px;
}
.four-box h2 {
    text-align: center;
    font-size: 41px;
}
.four-box .itemBox {
    width: 100%;
    margin-top: 72.8px;
}
.four-box .itemBox .item {
    width: 25%;
    float: left;
}
.four-box .itemBox .item .cont {
    height: 154px;
    margin: 0 auto;
}
.four-box .itemBox .item .cont a {
    display: block;
    width: 100%;
    height: 100%;
}
.four-box .itemBox .item .imgbox {
    display: block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    margin: 0 auto;
}
.four-box .itemBox .item .imgbox img {
    display: block;
    width: 100%;
    height: auto;
}
.four-box .itemBox .item .cont h2 {
    font-size: 17.5px;
    text-align: center;
    height: 24px;
    line-height: 28px;
    margin-top: 14px;
}
.four-box .itemBox .item .cont p {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
}
</style>