<template>
    <div>
        <div class="BG0  box box-small">
            <div class="jobs">
                <div class="one">
                    <div class="one-box contbox">
                        <div class="left GB text1">
                            <div class="leftcontent">
                                <h2 bklang="one_1"  :class="locale == 'en' ?'text1 LeftfontSize h5GB' : 'text1 LeftfontSizezh h5GB'">{{$t('jobslang.JoinOne')}}</h2>
                                <h2 bklang="one_1"  :class="locale == 'en' ?'text1 LeftfontSize h5GB' : 'text1 LeftfontSizezh h5GB'">{{$t('jobslang.JoinTwo')}}</h2>
                                <h2 bklang="one_1"  :class="locale == 'en' ?'text1 LeftfontSize h5GB' : 'text1 LeftfontSizezh h5GB'">{{$t('jobslang.JoinThree')}}</h2>
                                <h2 bklang="one_1"  :class="locale == 'en' ?'text1 LeftfontSize h5GB' : 'text1 LeftfontSizezh h5GB'">{{$t('jobslang.JoinFour')}}</h2>
                            </div>
                        </div>
                        <div class="right">
                            <div class="bander">
                                <img src="https://cdn2.bitkeep.vip/web/pro-www/images/light.b12f3.svg" alt="" class="light_icon">
                                <img src="https://cdn2.bitkeep.vip/web/pro-www/images/dark.be16c.svg" alt="" class="dark_icon">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="two">
                    <div class="two-box">
                        <div class="left BG1">
                            <img src="https://cdn2.bitkeep.vip/web/pro-www/images/Global Community banner light 375x140.42098.svg" alt=""
                                class="light_icon">
                            <img src="https://cdn2.bitkeep.vip/web/pro-www/images/Global Community banner dark 375x140.2b619.png" alt=""
                                class="dark_icon">
                        </div>
                        <div class="right BG1">
                            <img v-show="$store.state.isPC" src="https://cdn.bitkeep.vip/u_b_36a43a40-19de-11ed-9eb2-a138029a75a4.png"  class="dark_icon"  alt="">
                            <img v-show="$store.state.isPC" src="https://cdn.bitkeep.vip/u_b_9f90aa50-1d0a-11ed-b6b0-efdd72fa37a6.png"
                               class="light_icon"  alt="">
                            <div class="rightcontent">
                                <h3 class="text1 GB1 h5GB ">{{$t('jobslang.JoinFive')}}</h3>
                                <h3 class="text1 GB1 h5GB ">{{$t('jobslang.JoinSix')}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="three" id="JoinUs" v-if="$store.state.isPC">
                    <div class="three-box contbox">
                        <h2 bklang="three_1" class="text1 h5GB">{{$t('jobslang.Openpositions')}}</h2>
                        <div class="hr text1 GL email h5GL">
                           {{$t('jobslang.resumeDelivery')}}
                           <a class="GL"  href="mailto:hr@bitkeep.com">hr@bitkeep.com</a>
                        </div>
                        <div class="three-itembox">
                            <h3 class="c GB text1" bklang="three_2"><span></span>{{$t('jobslang.ProductandR&D')}}</h3>
                            <div class="show-box">
                                <div class="j-item show-item ji BG1 text1" data="Node" bklang="three_4" @click="viewPop('node')">
                                    <h3 class="GB text1">{{$t('jobslang.node')}}</h3>
                                    <div class="j-icon_team GL1"><span class="icon_team"></span> 6 {{$t('jobslang.Person')}}</div>
                                    <span class="jian"></span>
                                </div>
                                <div class="j-item show-item o BG1 text1" data="Fe" bklang="three_5"  @click="viewPop('Fe')">
                                    <h3 class="GB text1">{{$t('jobslang.Fe')}}</h3>
                                    <div class="j-icon_team GL1"><span class="icon_team"></span> 6 {{$t('jobslang.Person')}}</div>
                                    <span class="jian"></span>
                                </div>
                                <div class="j-item show-item ji BG1 text1" data="Solidity" bklang="three_6" @click="viewPop('Solidity')">
                                    <h3 class="GB text1">{{$t('jobslang.Solidity')}}</h3>
                                    <div class="j-icon_team GL1"><span class="icon_team"></span> 4 {{$t('jobslang.Person')}}</div>
                                    <span class="jian"></span>
                                </div>
                                <div class="j-item show-item o BG1 text1" data="Golang" bklang="three_6" @click="viewPop('Golang')">
                                    <h3 class="GB text1">{{$t('jobslang.Go')}}</h3>
                                    <div class="j-icon_team GL1"><span class="icon_team"></span> 3 {{$t('jobslang.Person')}}</div>
                                    <span class="jian"></span>
                                </div>
                                <div class="j-item show-item ji BG1 text1" data="Financial" bklang="three_12"  @click="viewPop('Financial')">
                                    <h3 class="GB GL1 text1">{{$t('jobslang.productManager')}}
                                    </h3>
                                    <div class="j-icon_team"><span class="icon_team"></span> 2 {{$t('jobslang.Person')}}</div>
                                    <span class="jian"></span>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-JoinUs" v-if="!$store.state.isPC">
                    <h2 class="text1 h5GB en_letter-space jointitle">{{$t('jobslang.Openpositions')}}</h2>
                    <div class="hr text1 h5GL en_letter-space joinHref">
                        {{$t('jobslang.resumeDelivery')}}
                        <a href="mailto:hr@bitkeep.com" class="h5GL hrmailto en_letter-space" style="color:#7524F9">hr@bitkeep.com</a>
                    </div>
                    <div class="m-three-itembox">
                        <h3 class="c h5GB text1 en_letter-space" bklang="three_2"><span></span>{{$t('jobslang.ProductandR&D')}}</h3>
                        <div class="show-box">
                            <div class="m-j-item show-item ji BG1" data="Node" bklang="three_4" ref="NodeItembox"  @click="changeNav('Node')">
                                <h3 class="h5GB text1 en_letter-space">{{$t('jobslang.node')}}</h3>
                                <div class="j-icon_team h5GL text1 en_letter-space"><span class="icon_team"></span>6 {{$t('jobslang.Person')}}</div>
                                <span :class="activeItemBox != 'Node'? 'jian' :' jian activejian'"></span>
                                <div class="item-content" v-show="activeItemBox == 'Node'">
                                    <div class="titBoxline BG3"></div>
                                    <div class="titBox">
                                        <h4 class="h5GB text1 en_letter-space">{{$t('jobslang.nodeThree')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.nodeFour')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.nodeFive')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.nodesix')}}</p>
                                        <h4 class="h5GB text1 marginTop en_letter-space">{{$t('jobslang.nodeseven')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.nodeEight')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.nodeNine')}}</p>
                                    </div>
                                    <div class="pop-btn">
                                        <a href="mailto:hr@bitkeep.com" bklang='popBtn' class="h5GB en_letter-space">{{$t('jobslang.Applynow')}}</a>   
                                    </div>
                                </div>    
                            </div>
                            <div class="m-j-item show-item o BG1" data="Fe"  ref="FeItembox"  bklang="three_5" @click="changeNav('Fe')">
                                <h3 class="h5GB text1 en_letter-space">{{$t('jobslang.Fe')}}</h3>
                                <div class="j-icon_team h5GL text1 en_letter-space"><span class="icon_team"></span> 6 {{$t('jobslang.Person')}}</div>
                                <span :class="activeItemBox != 'Fe'? 'jian' :' jian activejian'"></span>
                                <div class="item-content" v-show="activeItemBox == 'Fe'">
                                    <div class="titBoxline BG3"></div>
                                    <div class="titBox">
                                        <h4 class="h5GB text1 en_letter-space">{{$t('jobslang.feThree')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.feFive')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.feSix')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.feSeven')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.feEight')}}</p>
                                        <h4 class="h5GB text1 marginTop en_letter-space">{{$t('jobslang.responsibilities')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.responsibilitiesOne')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.responsibilitiesTwo')}} </p>
                                    </div>
                                    <div class="pop-btn">
                                        <a href="mailto:hr@bitkeep.com" bklang='popBtn' class="h5GB en_letter-space">{{$t('jobslang.Applynow')}}</a>   
                                    </div>
                                </div>    
                            </div>
                            <div class="m-j-item show-item ji BG1" data="Solidity" ref="SolidityItembox"  bklang="three_6" @click="changeNav('Solidity')">
                                <h3 class="h5GB text1 en_letter-space">{{$t('jobslang.Solidity')}}</h3>
                                <div class="j-icon_team h5GL text1 en_letter-space"><span class="icon_team"></span> 4 {{$t('jobslang.Person')}}</div>
                                <span :class="activeItemBox != 'Solidity'? 'jian' :' jian activejian'"></span>
                                <div class="item-content" v-show="activeItemBox == 'Solidity'">
                                    <div class="titBoxline BG3"></div>
                                    <div class="titBox">
                                        <h4 class="h5GB text1 en_letter-space">{{$t('jobslang.SoliditytileThree')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditytileFour')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditytileFive')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditytileSix')}}</p>
                                        <h4 class="h5GB text1 marginTop en_letter-space">{{$t('jobslang.SoliditycontentOne')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditycontentTwo')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditycontentThree')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditycontentFour')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.SoliditycontentFive')}}</p>
                                    </div>
                                    <div class="pop-btn">
                                        <a href="mailto:hr@bitkeep.com" bklang='popBtn' class="en_letter-space h5GB">{{$t('jobslang.Applynow')}}</a>   
                                    </div>
                                </div>    
                            </div>
                            <div class="m-j-item show-item o BG1" data="Golang" bklang="three_6" ref="GolangItembox" @click="changeNav('Golang')">
                                <h3 class="h5GB text1 en_letter-space">{{$t('jobslang.Go')}}</h3>
                                <div class="j-icon_team h5GL text1 en_letter-space"><span class="icon_team"></span>3 {{$t('jobslang.Person')}}</div>
                                <span :class="activeItemBox != 'Golang'? 'jian' :' jian activejian'"></span>
                                <div class="item-content"  v-show="activeItemBox == 'Golang'">
                                    <div class="titBoxline BG3"></div>
                                    <div class="titBox">
                                        <h4 class="h5GB text1 en_letter-space">{{$t('jobslang.golangtitleTwo')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.golangtitleThree')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.golangtitleFour')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.golangtitleFive')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.golangtitleSix')}}</p>
                                    </div>
                                    <div class="pop-btn">
                                        <a href="mailto:hr@bitkeep.com" bklang='popBtn' class="h5GB en_letter-space">{{$t('jobslang.Applynow')}}</a>   
                                    </div>
                                </div>    
                            </div>
                            <div class="m-j-item show-item ji BG1" data="Financial" ref="FinancialItembox"  bklang="three_12" @click="changeNav('Financial')">
                                <h3 class="h5GB text1 en_letter-space">{{$t('jobslang.productManager')}}
                                </h3>
                                <div class="j-icon_team h5GL text1 en_letter-space"><span class="icon_team"></span>2 {{$t('jobslang.Person')}}</div>
                                <span :class="activeItemBox != 'Financial'? 'jian' :' jian activejian'"></span>
                                <div class="item-content" v-show="activeItemBox == 'Financial'">
                                    <div class="titBoxline BG3"></div>
                                    <div class="titBox">
                                        <h4 class="h5GB text1 en_letter-space">{{$t('jobslang.FinancialTitleOne')}}</h4>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleTwo')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleThree')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleFour')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleFive')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleSix')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialTitleSeven')}}</p>
                                        <h4 class="h5GB text1 marginTop en_letter-space">{{$t('jobslang.FinancialContent')}}</h4>
                                        <p class="Gh5GLL1 text1 en_letter-space">{{$t('jobslang.FinancialContentOne')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialContentTwo')}}</p>
                                        <p class="h5GL text1 en_letter-space">{{$t('jobslang.FinancialContentThree')}}</p>
                                    </div>
                                    <div class="pop-btn">
                                        <a href="mailto:hr@bitkeep.com" bklang='popBtn' class="h5GB en_letter-space">{{$t('jobslang.Applynow')}}</a>   
                                    </div>
                                </div>    
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop" id="pop" v-show="popconfirm.flag">
                <div class="popcont BG0">
                    <span class="close-btn" id="closeBtn" @click="close()"></span>
                    <div class="titBox text1" id="titBox">
                        <div v-show="popconfirm.type == 'node'">
                            <h3 class="GB text1">{{$t('jobslang.nodeOne')}}</h3><div class="quantity"><img src="https://cdn.bitkeep.vip/u_b_1e8c4dc0-1921-11ed-a358-7fe0de42a4a9.svg+xml"> {{$t('jobslang.nodeTWO')}}</div> <h4 class="text1">{{$t('jobslang.nodeThree')}}</h4><p>{{$t('jobslang.nodeFour')}}</p><p>{{$t('jobslang.nodeFive')}}</p><p>{{$t('jobslang.nodesix')}}</p><h4 class="marginTop text1">{{$t('jobslang.nodeseven')}}</h4><p>{{$t('jobslang.nodeEight')}} </p><p>{{$t('jobslang.nodeNine')}}</p>
                        </div>
                        <div v-show="popconfirm.type == 'Fe'">
                            <h3 class="GB text1">{{$t('jobslang.feOne')}}</h3><div class="quantity"><img src="https://cdn.bitkeep.vip/u_b_1e8c4dc0-1921-11ed-a358-7fe0de42a4a9.svg+xml"> {{$t('jobslang.feTwo')}}</div><h4 class="text1">{{$t('jobslang.feThree')}}</h4><p>{{$t('jobslang.feFive')}}</p><p>{{$t('jobslang.feSix')}}</p><p>{{$t('jobslang.feSeven')}}</p><p>{{$t('jobslang.feEight')}}</p><h4 class="GB marginTop text1">{{$t('jobslang.responsibilities')}}</h4><p>{{$t('jobslang.responsibilitiesOne')}}</p><p>{{$t('jobslang.responsibilitiesTwo')}}</p>
                        </div>
                        <div v-show="popconfirm.type == 'Solidity'">
                            <h3 class="GB text1">{{$t('jobslang.Soliditytileone')}}</h3><div class="quantity"><img src="https://cdn.bitkeep.vip/u_b_1e8c4dc0-1921-11ed-a358-7fe0de42a4a9.svg+xml"> {{$t('jobslang.Soliditytiletwo')}}</div><h4 class="text1">{{$t('jobslang.SoliditytileThree')}}</h4><p>{{$t('jobslang.SoliditytileFour')}}</p><p>{{$t('jobslang.SoliditytileFive')}}</p><p>{{$t('jobslang.SoliditytileSix')}}</p><h4 class="GB marginTop text1">{{$t('jobslang.SoliditycontentOne')}}</h4><p>{{$t('jobslang.SoliditycontentTwo')}}</p><p>{{$t('jobslang.SoliditycontentThree')}}</p><p>{{$t('jobslang.SoliditycontentFour')}}</p><p>{{$t('jobslang.SoliditycontentFive')}}</p>
                        </div>
                        <div v-show="popconfirm.type == 'Golang'">
                            <h3 class="GB text1">{{$t('jobslang.golangtitle')}}</h3><div class="quantity"><img src="https://cdn.bitkeep.vip/u_b_1e8c4dc0-1921-11ed-a358-7fe0de42a4a9.svg+xml">{{$t('jobslang.golangtitleOne')}}</div><h4 class="text1">{{$t('jobslang.golangtitleTwo')}}</h4><p>{{$t('jobslang.golangtitleThree')}}</p><p>{{$t('jobslang.golangtitleFour')}}</p><p>{{$t('jobslang.golangtitleFive')}}</p><p>{{$t('jobslang.golangtitleSix')}}</p>
                        </div>
                        <div v-show="popconfirm.type == 'Financial'">
                            <h3 class="GB text1">{{$t('jobslang.FinancialTitle')}}</h3><div class="quantity"><img src="https://cdn.bitkeep.vip/u_b_1e8c4dc0-1921-11ed-a358-7fe0de42a4a9.svg+xml">{{$t('jobslang.FinancialContentFour')}}</div><h4 class="text1">{{$t('jobslang.FinancialTitleOne')}}</h4><p>{{$t('jobslang.FinancialTitleTwo')}}</p><p>{{$t('jobslang.FinancialTitleThree')}}</p><p>{{$t('jobslang.FinancialTitleFour')}}</p><p>{{$t('jobslang.FinancialTitleFive')}}</p><p>{{$t('jobslang.FinancialTitleSix')}}</p><p>{{$t('jobslang.FinancialTitleSeven')}}</p><h4 class="GB marginTop text1">{{$t('jobslang.FinancialContent')}}</h4><p>{{$t('jobslang.FinancialContentOne')}}</p><p>{{$t('jobslang.FinancialContentTwo')}}</p><p>{{$t('jobslang.FinancialContentThree')}}</p>
                        </div>
                    </div>
                    <div class="pop-btn BG0">
                        <a href="mailto:hr@bitkeep.com" bklang='popBtn'>{{$t('jobslang.Applynow')}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from "vuex";
    export default{
        layout: 'jobs/default',
        scrollToTop: true,
        data(){
            return{
                popconfirm:{
                    flag:false,
                    type:''
                },
                screenWidth:0,
                activeItemBox:'',
                locale:this.$store.state.locale,
            }
        },
        head() {
            const { language } = this.$route.params;
            return {
                title: this.$t('jobslang.title'),
                meta: [
                    { name: 'keywords', content:this.$t('jobslang.Keyword') },
                    { name: 'description', content:this.$t('jobslang.Description') },
                    { name: 'title', content:this.$t('jobslang.title') },
                    { name: 'og:title', content:this.$t('jobslang.title') },
                    { name: 'og:description', content:this.$t('jobslang.Description') },
                    { name: 'twitter:title', content:this.$t('jobslang.title') },
                    { name: 'twitter:description', content:this.$t('jobslang.Description') },
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
                    { rel: 'canonical', href: `https://bitkeep.com/${language}/jobs` },
                    { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep.com/zh/jobs` },
                    { rel: 'alternate', hreflang: 'en', href: `https://bitkeep.com/en/jobs` },
                    { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep.com/ko/jobs` },
                    { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep.com` },
                ]
            }
        },
        beforeMount() {
            window.scrollTo(0,0);
        },
        methods: {
            ...mapMutations(['changeIsPC']),
            changeNav(type){
                if(this.activeItemBox == type){
                    this.activeItemBox = ''
                }else{
                    this.activeItemBox = type;
                }
            },
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
        font-weight: 600;
    }
 @media only screen and (max-width: 830px) {
     .box-small{
         .one{
             padding: 80px 20px 0 20px;
             .one-box{
                 display: flex;
                 flex-direction: column;
                 align-items: center;
                 justify-content: center;
                 .left{
                     width: 100%;
                     .leftcontent{
                         margin-top: 0px;
                         h2{
                            font-size: 20px;
                            font-weight: 600;
                         }
                     }
                 }
                 .right{
                     width: 100%;
                     height: 100%;
                     margin-top: 40px;
                     .bander{
                         height: 100%;
                     }
                 }
             }
         }
         .two{
             height: 100%;
             .two-box{
                 display: flex;
                 flex-direction: column-reverse;
                 .left{
                     width: 100%;
                 }
                 .right{
                     .rightcontent{
                         padding: 53px 20px 20px 20px;
                         h3{
                             font-size: 16px;
                             font-weight: 600;
                         }
                     }
                 }
             }
         }
         .three{
             .three-box {
                 h2{
                     font-size: 24px;
                     margin-bottom: 0;
                 }
                 .hr{
                     font-size: 12px;
                     a{
                         font-size: 12px!important;
                     }
                 }
                 .three-itembox{
                     padding: 0 20px;
                     h3{
                         font-size: 16px;
                         margin-bottom: 8px;
                     }
                 }
             }
         }
         .m-JoinUs{
             margin-top: 40px;
             h2{
                 text-align: center;
             }
             .hr{
                 text-align: center;
             }
             .m-three-itembox{
                 margin-top: 28px;
             }
             .jointitle{
                font-size: 24px;
             }
             .joinHref{
                font-size: 12px;
             }
         }
     }
  }

  @media only screen and  (max-width: 350px) {
    .box-small {
        width: 350px;
    }
  }
  @media only screen and (min-width: 830px) and (max-width: 1000px) {
    .contbox {
      max-width: 1000px;
      min-width: 960px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .leftcontent .LeftfontSizezh{
        font-size: 40px !important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .leftcontent .LeftfontSize{
        font-size: 35px!important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .one-box{
        .right {
            width: 460px!important;
            height: 512px!important;
        }
        .bander{
            width: 460px!important;
            height: 480px!important;
        }
    }
    .two{
        height: 260px!important;
    }
    .two-box{
        min-width: 1000px;
    }
    .two-box .left{
        width: 540px!important;
    }
    .two-box .right .rightcontent h3{
        font-size: 24px!important;
    }
    .two-box .right .rightcontent{
        padding: 64px 0 0 160px!important;
    } 
    .JoinUs{
        min-width: 1000px;
    }
  }
  @media only screen and (min-width: 1000px) and (max-width: 1100px) {
    .contbox {
      max-width: 1000px;
      margin: 0 auto;
    }
    .leftcontent .LeftfontSizezh{
        font-size: 40px !important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .leftcontent .LeftfontSize{
        font-size: 35px!important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .one-box{
        .right {
            width: 500px!important;
            height: 512px!important;
        }
        .bander{
            width: 500px!important;
            height: 512px!important;
        }
    } 
    .two{
        height: 260px!important;
    }
    .two-box .left{
        width: 558px!important;
    }
    .two-box .right .rightcontent h3{
        font-size: 24px!important;
    }
    .two-box .right .rightcontent{
        padding: 64px 0 0 160px!important;
    }

  }
  @media only screen and (min-width: 1100px) and (max-width: 1200px) {
    .contbox {
      max-width: 1000px;
      margin: 0 auto;
    }
    .leftcontent .LeftfontSizezh{
        font-size: 40.6px !important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .leftcontent .LeftfontSize{
        font-size: 36px!important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .two-box .right .rightcontent h3{
        font-size: 26px!important;
    }
    .two-box .right .rightcontent{
        padding: 64px 0 0 166px!important;
    }
    .two{
        height: 269px!important;
    }
    .two-box .left{
        width: 576px!important;
    }
    .one-box .right {
        height: 512px!important;
    }

    .one-box{
        .right {
            width: 500px!important;
            height: 512px!important;
        }
        .bander{
            width: 500px!important;
            height: 512px!important;
        }
    } 
    
  }
@media only screen and (min-width: 1200px)  {
    .leftcontent .LeftfontSizezh{
        font-size:40.6px !important;
        line-height: 1.2;
        letter-spacing: -1px;
        font-weight: 600;
    }
    .leftcontent .LeftfontSize{
        font-size: 36px!important;
        line-height: 1.2;
        letter-spacing: -1px;
    }
    .two-box .right .rightcontent h3{
        font-size: 31.996px !important;
    }

}
@media only screen and (min-width: 1200px) and (max-width: 1500px)  {
    .one-box .left .leftcontent h2{
        font-size: 40.6px!important;
        font-weight: 600;
    }
}
@media only screen and (min-width: 1500px)  {
    .one-box .left .leftcontent h2{
        font-size: 40.6px!important;
        font-weight: 600;
    }
}

  @media only screen and (min-width: 1300px) and (max-width: 1400px) {
    .contbox {
      max-width: 1100px;
    }
  }
  @media only screen and (min-width: 1400px) and (max-width: 1500px) {
    .contbox {
      max-width: 1200px;
    }
    .two-box .right .rightcontent h3{
        font-size: 29.47px!important;
    }
  }
  @media only screen and (min-width: 1500px) and (max-width: 1600px) {
    .contbox {
      max-width: 1300px;
    }
      .two-box .left{
        width:648px!important;
    }
    .two-box .right .rightcontent h3{
        font-size: 30.312px!important;
    }
  }
  @media only screen and (min-width: 1700px) {
    .contbox {
      max-width: 1500px;
    }
    .two-box .left{
        width:684px!important;
    }
  }
.theme-light{
    .pop .close-btn {
        position: absolute;
        width:21px;
        height:21px;
        background: url(https://cdn.bitkeep.vip/u_b_d884a420-1921-11ed-a358-7fe0de42a4a9.png) no-repeat;
        background-size: 100% auto;
        top: 14px;
        right: 14px;
        cursor: pointer;
    }
    .m-three-itembox .show-item .jian {
        background: url("https://cdn.bitkeep.vip/u_b_81dbf8b0-1a31-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;
    }
    .m-three-itembox .show-item .activejian {
        background: url("https://cdn.bitkeep.vip/u_b_08e4f010-1aa9-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;
    }
}
.theme-dark{
    .three-box .show-item .jian {
        width: 29.54px;
        height: 29.54px;
        position: absolute;
        right: 36.82px;
        top: 58.94px;
        background: url("https://cdn.bitkeep.vip/u_b_c48c4520-19dc-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;
    }
    .pop .close-btn {
        position: absolute;
        width:21px;
        height:21px;
        background: url("https://cdn.bitkeep.vip/u_b_99cc8a20-1a09-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;
        top: 14px;
        right: 14px;
        cursor: pointer;
    }
    .m-three-itembox .show-item .jian {
        background: url("https://cdn.bitkeep.vip/u_b_d3c8c9a0-1aa9-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;
    }
    .m-three-itembox .show-item .activejian {
        background: url("https://cdn.bitkeep.vip/u_b_a8a58b50-1aa9-11ed-9eb2-a138029a75a4.png") no-repeat;
        background-size: 100% auto;

    }
}

.en_letter-space {
  letter-spacing: -0.5px;
}
body {
    min-width:300px;
}
.one {
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    padding: 80px 0 0 0 ;
}
.one-box {
    overflow: hidden;
    margin: 0 auto;
}
.one-box .left {
    width: 50%;
    float: left;
    height: 100%;
    overflow: hidden;
}
.one-box .left .leftcontent {
   width: 100%;
   margin-top: 84px;
}
.one-box .left .leftcontent {
    width: 100%;
    margin-top: 140px;
 }
 .one-box .left .leftcontent .jobsentext1{
    font-size: 40.46px !important;
    line-height: 1.2;
    letter-spacing: -0.5px;
 }
 .one-box .left .leftcontent :nth-child(3){
     display: inline-block;
     background: url("https://cdn.bitkeep.vip/u_b_4b39e110-19db-11ed-9eb2-a138029a75a4.png") no-repeat;
     background-size: 100% 100%;
 }
.one-box .right {
    box-sizing: border-box;
    width: 50%;
    height: 560px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-end;
}
.one-box .right .bander{
    width: 100%;
    height: 560px;
    display: flex;
    align-items: flex-end;
    // display: flex;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
    // img{
    //     box-sizing: border-box;
    //     width: 100%;
    //     height: 100%;
    // }
}
.two {
    box-sizing: border-box;
    width: 100%;
    height: 294.7px;
    background: #F7F9FA;
}
.two-box{
    width: 100%;
    height: 100%;
    display: flex;
}
.two-box .left{
  width: 630px;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
}
}
.two-box .right{
    position: relative;
    flex: 1;
}
.two-box .right img{
    width:152.88px;
    height: auto;
    position: absolute;
    left: 0;
    bottom: 0;
}
.two-box .right .rightcontent{
    width: 100%;
    padding:79px 0 0 182px;
    line-height: 1.5;
    box-sizing: border-box;
}
.two-box .right .rightcontent h3{
    font-size: 36.82px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;    //将对象作为弹性伸缩盒子模型显示。
    -webkit-box-orient:vertical;  // 从上到下垂直排列子元素
    -webkit-line-clamp:3; //显示的行数
    font-weight: 600;
}
.two-box .right .rightcontent .jobsentext2{
    font-size: 29.47px !important;
    letter-spacing: -0.5px;
    line-height: 1.3;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;    //将对象作为弹性伸缩盒子模型显示。
    -webkit-box-orient:vertical;  // 从上到下垂直排列子元素
    -webkit-line-clamp:2; //显示的行数
 }
 .three{
    margin: 0 auto;
 }
.three-box {
    box-sizing: border-box;
    padding: 94.5px 0px; 
    margin: 0 auto;
}
.three-box h2 {
    text-align: center;
    font-size: 41px;
    margin-bottom:14px;
}
.three-box .hr{
    text-align: center;
    font-size: 24px;
    margin-bottom:55.26px;
}
.three-box .hr a{
    color:#7524F9;
    font-size: 22.12px !important;
}
.three-box .ji {
    width: 49%;
    // margin-right: 1%;
}
.three-box .show-box {
    width: 100%;
    height: auto;
    margin-bottom: 42px;
    // display: flex;
    // flex-wrap: wrap;
}
.three-box .show-box::after,
.three-box .show-box::before {
    content: '';
    display: table;
}
.three-box .show-box::after {
    clear: both;
}
.three-box .three-itembox > h3 {
    position: relative;
    margin-bottom: 28px;
    text-indent: 35px;
    line-height: 31.5px;
    font-size: 22.12px;
}
.three-box .three-itembox > h3 span {
    display: block;
    position: absolute;
    left: 0;
    width: 31.5px;
    height: 31.5px;
}
.three-box .three-itembox > h3.c span
{
    background: url(https://cdn.bitkeep.vip/u_b_5b613ec0-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.three-box .three-itembox > h3.s span
{
    background: url(https://cdn.bitkeep.vip/u_b_5b6165d0-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.three-box .three-itembox > h3.y span
{
    background: url(https://cdn.bitkeep.vip/u_b_84281680-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.three-box .show-item {
    box-sizing: border-box;
    padding: 42.6px 46.2px;
    margin-bottom: 14px;
    float: left;
    cursor: pointer;
}

.three-box .show-item:hover {
    color: #fff;
    background: #7524F9!important;
    box-shadow: 3px 10px 30px rgba(16, 38, 71, .1);
    h3{
        color: #fff!important;
    }
}
.three-box .show-item h3 {
    margin-bottom: 22.12px;
    line-height:22.12px;
    font-size: 22.12px;
}
.three-box .show-item  .j-icon_team{
    display: flex;
    justify-content: flex-s tart;
    align-items: center;
    font-size: 18.48px;
    line-height: 18.48px;
    font-weight: 300;
}

.three-box .show-item  .j-icon_team .icon_team{
    display: block;
    width: 22.4px;
    height: 22.4px;
    margin-right: 11px;
    background: url("https://cdn.bitkeep.vip/u_b_683a63b0-19dc-11ed-9eb2-a138029a75a4.png") no-repeat;
    background-size: 100% 100%;
}
.three-box .show-item {
    position: relative;
}

.three-box .show-item .jian {
    width: 29.54px;
    height: 29.54px;
    position: absolute;
    right: 36.82px;
    top: 58.94px;
    background: url("https://cdn.bitkeep.vip/u_b_bf16dec0-19dc-11ed-9eb2-a138029a75a4.png") no-repeat;
    background-size: 100% auto;
}
.three-box .show-item p span {
    position: absolute;
    display: block;
    width: 16.8px;
    height: 16.8px;
    background: url("https://cdn.bitkeep.vip/u_b_d999e260-1d0b-11ed-b6b0-efdd72fa37a6.png") no-repeat;
    background-size: 100% auto;
}
.three-box .show-item:hover p span {
    background: url("https://cdn.bitkeep.vip/u_b_a1d4b170-1d0b-11ed-b6b0-efdd72fa37a6.png") no-repeat;
    background-size: 100% auto;
}
.three-box .show-item:hover .j-icon_team .icon_team {
    background: url("https://cdn.bitkeep.vip/u_b_17008830-1d0b-11ed-b6b0-efdd72fa37a6.png") no-repeat;
    background-size: 100% auto;
}
.three-box .show-item:hover .jian {
    width: 29.54px;
    height: 29.54px;
    position: absolute;
    right: 36.82px;
    top: 58.94px;
    background: url("https://cdn.bitkeep.vip/u_b_5a372490-1d17-11ed-b6b0-efdd72fa37a6.png") no-repeat;
    background-size: 100% auto;
}
.three-box .show-item p {
    text-indent: 21px;
}
.three-box .o {
    width: 49%;
    margin-left: 1%;
}
.m-top{
    width: 100%;
    padding:23.333324px 23.333324px 0 23.333324px;
    box-sizing: border-box;
    margin-top: 20px;
}
.m-top h2{
    font-size: 30.33px !important;
    line-height: 1.5;
}
.m-top .m-jobsentext1{
    font-size: 23.333324px !important;
    line-height: 1.2;
    letter-spacing: -0.5px;
}
.m-top :nth-child(3){
    display: inline-block;
    // background: url("../images/jobs2/圆圈2.png") no-repeat;
    background-size: 100% 100%;
}
.m-top .m-BG1{
    width: 100%;
    margin-top:32.6px;
    img{
        width: 100%;
        height: auto;
    }
}
.m-job .content1{
   width: 100%;
   line-height: 1.5;
   padding: 56px 23.33px 28px 23.33px;
   box-sizing: border-box;
}
.m-job .content1 h3{
    font-size: 23.33px;
}
.m-job .content1 .m-jobsentext2{
    font-size: 18.6px;
    line-height: 1.2;
    letter-spacing: -0.5px;
}
.m-job .m-BG2{
   width: 100%;
   img{
    width: 100%;
    height: auto;
  }
}
.m-job .m-JoinUs{
    width: 100%;
    padding: 23.33px 0;
}
.m-job .m-JoinUs h2{
    width: 100%;
    line-height: 1.5;
    font-size: 28px;
    padding: 23.33px 0 0;
    text-align: center;
}
.m-job .m-JoinUs .hr{
    font-size: 14.7px;
    line-height: 28px;
    text-align: center;
}
.m-job .m-JoinUs .hr a{
    line-height: 28px;
    font-size: 14.7px;
    color: #7524F9;
}
.m-three-itembox{
    width: 100%;
    box-sizing: border-box;
    padding: 14px 23.33px;
}
.m-three-itembox>h3{
    position: relative;
    margin-bottom: 9.3px;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.m-three-itembox .show-box {
    width: 100%;
    height: auto;
    margin-bottom:42px;
}
.m-three-itembox > h3 span {
    display: block;
    width: 23.33px;
    height:23.33px;
    margin-right: 11.66px;
}
.m-three-itembox  > h3.c span
{
    background: url(https://cdn.bitkeep.vip/u_b_5b613ec0-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.m-three-itembox  > h3.s span
{
    background: url(https://cdn.bitkeep.vip/u_b_5b6165d0-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.m-three-itembox  > h3.y span
{
    background: url(https://cdn.bitkeep.vip/u_b_84281680-9df9-11ec-aac8-bf8a172584ab.png) no-repeat;
    background-size: 100% auto;
}
.m-three-itembox .show-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding:17.5px 11.66px 24.5px 17.5px;
    margin-bottom: 11.66px;
    // float: left;
    cursor: pointer;
}
.m-three-itembox .show-item h3{
    font-size: 16px;
    line-height: 1.5;
}
.m-three-itembox .show-item  .j-icon_team{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    margin-top: 07px;
}
.m-three-itembox .show-item .jian {
    width: 18.6px;
    height: 18.6px;
    position: absolute;
    right: 11.66px;
    top: 37.3px;
}
.m-three-itembox .show-item  .j-icon_team .icon_team{
    display: block;
    width: 18.6px;
    height: 18.6px;
    margin-right: 7px;
    background: url("https://cdn.bitkeep.vip/u_b_683a63b0-19dc-11ed-9eb2-a138029a75a4.png") no-repeat;
    background-size: 100% 100%;
}
.m-three-itembox .item-content{
    margin-top: 24.5px;
}
.m-three-itembox .titBoxline{
    width: 100%;
    height: 1px;
}
.m-three-itembox .titBox {
    box-sizing: border-box;
    padding: 17.5px 0 70px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.m-three-itembox .titBox .marginTop{
    margin-top: 28px;
}
.m-three-itembox .titBox p {
    font-size: 14px;
    line-height: 1.5;
}
.m-three-itembox .titBox h3 {
    font-size: 17.5px;
    margin-bottom: 7px;
}
.m-three-itembox .titBox h4 {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 7px;
}
.m-three-itembox  .pop-btn {
    display: flex;
    justify-content: flex-end;
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    -ms-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
.m-three-itembox  .pop-btn a {
    display: block;
    min-width: 116px;
    padding: 0px 14px;
    height: 40px;
    border-radius: 4.6px;
    background: #7524F9;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
}
.header-drawer{
    .smallPage{
      margin: 0;
    }
}
.headerBar-box .common_download_btn{
    min-width: 137px;
    height: 40px;
    line-height: 40px;
}
@media screen and (min-width: 375px) and (max-width: 768px) {
    .headerBar-box .accountBox::before{
        top: 3px!important;
    }
}
@media screen and (min-width: 768px) {
    .headerBar-box .accountBox::before{
        top: 9px!important;
    }
}
.headerBar-box .logo img{
    width: 125px;
    height: 40px;
}
.header-drawer .close-img{
    padding-right: 0;
}
.headerBar-box .logo{
    height: 40px;
}

/* 弹框 */
.pop {
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .45);
    color: #0E1B40;
}
.pop .popcont {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    width: 658px;
    height: 504px;
    border-radius: 11.2px;
    margin-top: -252px;
    margin-left: -329px;
    padding-top: 43.75px;
    overflow: hidden;
}
.pop .confirmPopcont {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    width: 420px;
    min-height: 210px;
    background: #fff;
    border-radius: 11.2px;
    margin-top: -252px;
    margin-left: -210px;
    padding-top: 46.06px;
    overflow: hidden;
}
.pop .confirmBtnBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height:42px;
    border-top: 1px solid rgba(244, 245, 250, 1);
    .btn {
        width: 50%;
        float: left;
        line-height:42px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        font-size: 1.28px;
        &.cancel {
            border-right: 1px solid rgba(244, 245, 250, 1);
            &:active {
                background: #F3F5F6;
            }
        }
        &.confirm {
            color: #7524F9;
            &:active {
                background: #F3F5F6;
            }
        }
    }
}
.pop .confirmMsg {
    padding: 28px;
    font-size: 14px;
}
.pop .popHeader {
    position: absolute;
    top: 0;
    padding: 14px;
    font-size: 1.28px;
    left: 0;
    right: 70px;
}
.pop .titBox {
    box-sizing: border-box;
    padding: 0 46.06px 84px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.pop .titBox .quantity img{
    margin-right: 4.2px;
}
.pop .titBox .quantity{
    font-size: 0.9214px;
    line-height:1.0528px;
    display: flex;
    align-items: center;
    margin-bottom: 18.4px;
}
.pop .titBox p {
    font-size: 14px;
    line-height: 2;
}
.pop .titBox h3 {
    font-size: 20px;
    margin-bottom: 7px;
}
.pop .titBox h4 {
    font-size: 14px;
    line-height: 2;
    font-weight: bolder;
}
.pop .titBox .marginTop{
margin-top: 28px;
}
.pop .titBox .address {
    width: 100%;
    height: 17px;
    margin: 14px 0 17px;
    overflow: hidden;
}
.pop .titBox .address span {
    display: block;
    float: left;
    width: 11.2px;
    height: 11.2px;
    background: url(https://cdn.bitkeep.vip/u_b_e4e56f10-1921-11ed-a358-7fe0de42a4a9.png) no-repeat;
    background-size: 100% auto;
    margin-top: 4.2px;
}
.pop .titBox .address a {
    display: block;
    float: left;
    width: 140px;
    float: left;
    padding-left: 7px;
    padding-top: 2.1px;
}
.pop .pop-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5.263rem;
    border-top: 1px solid rgba(16, 38, 71, .1);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    -ms-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
.pop .pop-btn a {
    display: block;
    width: 180px;
    height: 50px;
    border-radius: 7px;
    background: #7524F9;
    color: #fff;
    margin: 14px auto;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
}
</style>