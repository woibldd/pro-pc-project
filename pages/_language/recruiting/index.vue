<template>
    <div class="recruiting-layout-wrap BG0">
        <div class="recruiting-header">
            <div class="recruiting-header-wrap">
                <img src="https://cdn.bitkeep.vip/u_b_92d0f280-332f-11ed-851a-6fddb3c7ec6c.png" alt=""
                    class="m-main-img light_icon">
                <img src="https://cdn.bitkeep.vip/u_b_91864a10-332f-11ed-851a-6fddb3c7ec6c.png" alt=""
                    class="m-main-img dark_icon">
                <div class="recruiting-header-left">
                    <h1 class="title text1">{{$t("recruiting.header-title")}} {{$t("recruiting.header-title2")}}</h1>
                    <h1 class="m-title text1">{{$t("recruiting.header-title")}}<br />{{$t("recruiting.header-title2")}}
                    </h1>
                    <div class="desc text1 InterR">{{$t("recruiting.header-description")}}</div>
                    <div class="join-us BGpurple">
                        <a href="https://forms.gle/CcFKF1rfnw8CJ1jA9" target="_blank" class="seo_href"
                            rel="noopener noreferrer"
                            @click="joinus($event,'join_us','https://forms.gle/CcFKF1rfnw8CJ1jA9')">
                            {{$t("recruiting.join-us")}}
                        </a>
                    </div>
                </div>
                <img src="https://cdn.bitkeep.vip/u_b_92d0f280-332f-11ed-851a-6fddb3c7ec6c.png" alt=""
                    class="main-img light_icon">
                <img src="https://cdn.bitkeep.vip/u_b_91864a10-332f-11ed-851a-6fddb3c7ec6c.png" alt=""
                    class="main-img dark_icon">
            </div>
        </div>
        <div class="recruiting-about BG1">
            <div class="content-about">
                <h1 class="title text1">
                    {{$t("recruiting.about-title")}}
                </h1>
                <div class="desc text1 InterR">
                    {{$t("recruiting.about-description")}}
                </div>
                <div class="aboutlist">
                    <div class="aboutItem" v-for='(item,index) in $t("recruiting.aboutlist")' :key="index">
                        <img src="https://cdn.bitkeep.vip/u_b_a3ae6e00-2fe4-11ed-b9a4-5f928a660577.png" alt="like"
                            class="light_icon" v-if="index==0">
                        <img src="https://cdn.bitkeep.vip/u_b_66dade60-3330-11ed-851a-6fddb3c7ec6c.png" alt="like"
                            class="dark_icon" v-if="index==0">
                        <img src="https://cdn.bitkeep.vip/u_b_aca64460-2fe4-11ed-b9a4-5f928a660577.png" alt="user"
                            class="light_icon" v-if="index==1">
                        <img src="https://cdn.bitkeep.vip/u_b_61fe83b0-3330-11ed-851a-6fddb3c7ec6c.png" alt="user"
                            class="dark_icon" v-if="index==1">
                        <img src="https://cdn.bitkeep.vip/u_b_a7b61390-2fe4-11ed-b9a4-5f928a660577.png"
                            alt="communication" class="light_icon" v-if="index==2">
                        <img src="https://cdn.bitkeep.vip/u_b_763a6a60-3330-11ed-851a-6fddb3c7ec6c.png"
                            alt="communication" class="dark_icon" v-if="index==2">
                        <img src="https://cdn.bitkeep.vip/u_b_1709d510-2fe5-11ed-b9a4-5f928a660577.png" alt="resource"
                            class="light_icon" v-if="index==3">
                        <img src="https://cdn.bitkeep.vip/u_b_602ea5b0-3330-11ed-851a-6fddb3c7ec6c.png" alt="resource"
                            class="dark_icon" v-if="index==3">
                        <div class="content">
                            <h2 class="title text1">{{item.title}}</h2>
                            <div class="desc text1 InterR">{{item.description}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recruiting-duty BG0">
            <div class="duty-content">
                <div class="titleBox">
                    <div class="left">
                        <img src="@/assets/img/recruiting/pointleft.png" alt="pointleft">
                        <div class="title">
                            <h1>{{$t("recruiting.duty-title")}}</h1>
                            <img src="@/assets/img/recruiting/pointstar.png" alt="pointstar">
                        </div>
                    </div>
                    <img src="@/assets/img/recruiting/pointright.png" alt="pointright">
                </div>
                <div class="desc">
                    <p v-for='(item,index) in $t("recruiting.duty-desclist")' class="InterR" :key="index">
                        {{item.content}}</p>
                </div>
                <div class="bottom">
                    <div class="m-left">
                        <img src="@/assets/img/recruiting/pointright.png" alt="" class="pointright">
                        <img src="@/assets/img/recruiting/pointjian.png" alt="pointjian" class="left">
                    </div>
                    <img src="@/assets/img/recruiting/pointjian.png" alt="pointjian" class="left">
                    <img src="https://cdn.bitkeep.vip/u_b_25c2d4f0-2ff2-11ed-aa29-b9c15047f619.png" alt="pointjian"
                        class="right">
                </div>
            </div>
            <div class="Welfare-content">
                <h1 class="text1">{{$t("recruiting.Welfare-title")}}</h1>
                <div class="Welfarelist">
                    <div class="WelfareItem" :style="index|getBackgroundColor"
                        v-for='(item,index) in $t("recruiting.Welfarelist")' :key="index">
                        <img src="@/assets/img/recruiting/welfare_salary.png" alt="salary" v-if="index==0">
                        <img src="@/assets/img/recruiting/welfare_prospect.png" alt="prospect" v-if="index==1">
                        <img src="@/assets/img/recruiting/welfare_whitelist.png" alt="whitelist" v-if="index==2">
                        <img src="@/assets/img/recruiting/welfare_honor.png" alt="honor" v-if="index==3">
                        <h2>{{item.title}}</h2>
                        <div class="desc InterR">{{item.description}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recruiting-content BG1">
            <div class="recruiting">
                <div class="desc text1">
                    <div class="left">
                        <h2 class="title text1">
                            {{$t("recruiting.recruiting-title")}}
                        </h2>
                        <p class="text1 InterR" v-for='(item,index) in $t("recruiting.recruiting-list")'>
                            {{item.content}}</p>
                        <div class="join-us BGpurple">
                            <a href="https://forms.gle/CcFKF1rfnw8CJ1jA9" target="_blank" class="seo_href"
                                rel="noopener noreferrer"
                                @click="joinus($event,'join_us','https://forms.gle/CcFKF1rfnw8CJ1jA9')">
                                {{$t("recruiting.join-us")}}
                            </a>
                        </div>
                    </div>
                    <div class="right">
                        <div class="content">
                            <div class="recruiting-info" v-for='(item,index) in $t("recruiting.recruiting-info")'
                                :style="'recruitinginfo'+index|getBackgroundColor" :key="index">
                                {{item.content}}
                            </div>
                        </div>
                        <div class="m-conetnt">
                            <div class="recruitinginfo-list">
                                <div class="infoitem" v-for='(item,index) in $t("recruiting.recruiting-info")'
                                    :key="index">
                                    <div class="itemLeft">
                                        <div :style="'recruitinginfo'+index|getBackgroundColor"
                                            v-if="index==1||index==4||index==6">
                                            {{item.content}}
                                        </div>
                                    </div>
                                    <div class="itemRight">
                                        <div :style="'recruitinginfo'+index|getBackgroundColor"
                                            v-if="index==0||index==2||index==3||index==5">
                                            {{item.content}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="process-content BG0">
            <div class="processBox">
                <h2 class="title text1">{{$t("recruiting.process-title")}}</h2>
                <div class="processlist">
                    <div class="processItem linetext1 text1">
                        {{$t("recruiting.process-list")[0].content}}
                    </div>
                    <img class="light_icon" src="@/assets/img/recruiting/Arrow_05_light.png" alt="" />
                    <img class="dark_icon" src="@/assets/img/recruiting/Arrow_05_dark.png" alt="" />
                    <div class="processItem linetext1 text1">
                        {{$t("recruiting.process-list")[1].content}}
                    </div>
                    <img class="light_icon" src="@/assets/img/recruiting/Arrow_11_light.png" alt="" />
                    <img class="dark_icon" src="@/assets/img/recruiting/Arrow_11_dark.png" alt="" />
                    <div class="processItem linetext1 text1">
                        {{$t("recruiting.process-list")[2].content}}
                    </div>
                    <img class="light_icon" src="@/assets/img/recruiting/Arrow_12_light.png" alt="" />
                    <img class="dark_icon" src="@/assets/img/recruiting/Arrow_12_dark.png" alt="" />
                    <div class="processItem linetext1 text1 lastprocessItem Colorpurple">
                        <img src="@/assets/img/recruiting/activeflag.png" class="activeflag" alt="">
                        {{$t("recruiting.process-list")[3].content}}
                        <img src="@/assets/img/recruiting/High_light.png" class="High light_icon" alt="High">
                        <img src="@/assets/img/recruiting/High_dark.png" class="High dark_icon" alt="High">
                    </div>
                </div>
                <div class="join-us BGpurple">
                    <a href="https://forms.gle/CcFKF1rfnw8CJ1jA9" target="_blank" class="seo_href"
                        rel="noopener noreferrer"
                        @click="joinus($event,'register_now','https://forms.gle/CcFKF1rfnw8CJ1jA9')">
                        {{$t("recruiting.join-us2")}}
                    </a>
                </div>
            </div>
            <div class="aboutBk BG1 linetext1">
                <div class="aboutBkbox">
                    <img src="https://cdn.bitkeep.vip/u_b_ff7f5cd0-302a-11ed-a1f1-432d3f4c191d.png" alt=""
                        class="light_icon">
                    <img src="https://cdn.bitkeep.vip/u_b_a4be95b0-332a-11ed-8264-7b5e42b9e730.png" alt=""
                        class="dark_icon">
                    <div class="about-content">
                        <h2 class="title text1">{{$t("recruiting.aboutBK-title")}} </h2>
                        <div class="desc text1 InterR">
                            {{$t("recruiting.aboutBK-description")}}
                        </div>
                    </div>
                </div>
                <div class="aboutlist">
                    <div class="infoitem lineBG3" v-for='(item,index) in $t("recruiting.aboutBK-infolist")'>
                        <div class="title text1">
                            {{item.title}}
                        </div>
                        <h3 class="text1">{{item.desc}}</h3>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapMutations,mapState } from "vuex";
export default {
    name: 'recruitingPage',
    layout: 'IndexPage/default',
    scrollToTop: true,
    head() {
        const { language } = this.$route.params;
        const { hostChange } = this.$store.state;
        return {
            title: this.$t("recruiting.header-title")+' '+this.$t("recruiting.header-title2"),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('IndexPage.Keyword') },
                { hid: 'description', name: 'description', content: this.$t('IndexPage.Description') },
                { name: 'og:title', content:this.$t("recruiting.header-title")+' '+this.$t("recruiting.header-title2") },
                { name: 'og:description', content:this.$t('IndexPage.Description') },
                { name: 'twitter:title', content:this.$t("recruiting.header-title")+' '+this.$t("recruiting.header-title2") },
                { name: 'twitter:description', content:this.$t('IndexPage.Description') },
                { name:'twitter:card', content: "summary_large_image"},
                { name:'twitter:site', content: "BitKeep"},
                { name:'og:type', content: "website"},
                { name:'og:site_name', content: "BitKeep"},
                { hid:'og:image:src', content:"https://cdn.bitkeep.vip/u_b_9a18fe10-3966-11ed-9958-95ecb253e25e.png"},
                { hid:'og:image', content: "https://cdn.bitkeep.vip/u_b_9a18fe10-3966-11ed-9958-95ecb253e25e.png" },
                {hid:'og:image:alt', name: 'og:image:alt', content:'BitKeep, a Best Crpto Wallet' },
                {hid:'twitter:image', name: 'twitter:image', content:"https://cdn.bitkeep.vip/u_b_9a18fe10-3966-11ed-9958-95ecb253e25e.png"},
                {hid:'twitter:image:src', name: 'twitter:image:src', content:"https://cdn.bitkeep.vip/u_b_9a18fe10-3966-11ed-9958-95ecb253e25e.png" },
                {hid:'twitter:image:alt', name: 'twitter:image:alt', content:'BitKeep, a Best Crpto Wallet' },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep${hostChange}/${language}/recruiting` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep${hostChange}/zh/recruiting` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep${hostChange}/en/recruiting` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep${hostChange}/ko/recruiting` },
                { rel: 'alternate', hreflang: 'vi', href: `https://bitkeep${hostChange}/vi/recruiting` },
                { rel: 'alternate', hreflang: 'tr', href: `https://bitkeep${hostChange}/tr/recruiting` },
                { rel: 'alternate', hreflang: 'id', href: `https://bitkeep${hostChange}/id/recruiting` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep${hostChange}/en/recruiting` },
            ]
        }

    },
    data() {
        const { language } = this.$route.params;
        return {
            locale: language
        }
    },
    filters: {
        getBackgroundColor: function (val) {
            switch (val) {
                case 0: return 'background: #FFF7E0'; break
                case 1: return 'background: #F4FFD5'; break
                case 2: return 'background: #DBFBFF'; break
                case 3: return 'background: #F3EBFF'; break
                case "recruitinginfo0": return 'background: #F4FFD5'; break
                case "recruitinginfo1": return 'background: #FBE4D5'; break
                case "recruitinginfo2": return 'background: #F3EBFF'; break
                case "recruitinginfo3": return 'background: #FFF9C6'; break
                case "recruitinginfo4": return 'background: #FCEBFF'; break
                case "recruitinginfo5": return 'background: #FFF7E0'; break
                case "recruitinginfo6": return 'background: #DBFBFF'; break
                default: return 'background: #FFF7E0';
            }
        }
    },
    beforeMount() {
        this.setIcon()
        this.$Ta.track({
            name: 'Knight_Recruitment', data: {
                Page_Enter: '1'
            }
        })
    },
    mounted() {

    },
    computed: {
        ...mapState(["isBitkeep"]),
    },
    methods: {
        ...mapMutations(['SET_ISBitkeep']),
        joinus(event, name, href) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            this.$Ta.track({
                name: 'Knight_Recruitment', data: {
                    Action_Location_Name: name
                }
            })
            if (this.isBitkeep) {
                window.BitKeepInvoke.openUrl(href);
            } else {
                window.open(href, '_blank')
            }
            
        },
        setIcon() {
            window.BitKeepInvoke.onLoadReady(() => {
                window.BitKeepInvoke.getHeader((err, data) => {
                    this.SET_ISBitkeep(true)
                    console.log(err)
                });
                //设置主题
                this.$nextTick(() => {
                    window.BitKeepInvoke.appMode((err, res) => {
                        let body = document.getElementsByTagName("body")[0];
                        if (res == 1) {
                            body.setAttribute("class", "theme-dark");
                        } else {
                            body.setAttribute("class", "theme-light");
                        }
                    });
                });
            });
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .lastprocessItem {
        background: rgba(117, 36, 249, 0.1);
    }
}

.theme-dark {
    .lastprocessItem {
        background: rgba(156, 96, 255, 0.2);
    }
}

.join-us {
    display: inline-block;
    line-height: 50px;
    border-radius: 6px;

    a {
        display: block;
        min-width: 238px;
        height: 50px;
        color: #fff !important;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        padding: 0px 10px;
    }
}

.recruiting-layout-wrap {
    width: 100%;
    padding: 100px 0px;
    overflow: hidden;
    box-sizing: border-box;

    .recruiting-header {
        width: 100%;
        padding-bottom: 153px;

        .recruiting-header-wrap {
            width: 100%;
            max-width: 1276px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .m-main-img {
                display: none;
            }

            .recruiting-header-left {
                .title {
                    font-weight: 600;
                    font-size: 50px;
                    line-height: 50px;
                }

                .m-title {
                    display: none;
                }

                .desc {
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 1.5;
                    margin: 40px 0px;
                }
            }

            .main-img {
                width: 626px;
                height: auto;
                min-height: 626px;
            }
        }
    }

    .recruiting-about {
        width: 100%;
        padding: 100px 0px 70px 0px;
        box-sizing: border-box;

        .content-about {
            width: 100%;
            max-width: 1530px;
            box-sizing: border-box;
            margin: 0 auto;

            >.title {
                width: 100%;
                max-width: 762px;
                margin: 0 auto;
                font-weight: 600;
                font-size: 50px;
                line-height: 50px;
                text-align: center;
            }

            >.desc {
                width: 100%;
                max-width: 642px;
                margin: 0 auto;
                font-weight: 400;
                font-size: 20px;
                line-height: 1.5;
                text-align: center;
                padding: 20px 40px 70px 20px;
                box-sizing: border-box;
            }

            .aboutlist {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .aboutItem {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 160px;
                        height: auto;
                    }

                    .title {
                        width: 100%;
                        text-align: center;
                        font-weight: 600;
                        font-size: 32px;
                        line-height: 1;
                        margin-top: 30px;
                    }

                    .desc {
                        max-width: 248px !important;
                        width: 100%;
                        height: auto;
                        text-align: center;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 10px 0px;
                        overflow: hidden;
                        word-wrap: break-word;
                        // display: -webkit-box;
                        // -webkit-line-clamp: 3;
                        // -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }

    .recruiting-duty {
        width: 100%;
        padding: 80px 0px 100px 0px;
        box-sizing: border-box;

        .duty-content {
            width: 100%;
            max-width: 1530px;
            background-color: #9C60FF;
            border-radius: 20px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 40px 40px 80px 40px;
            position: relative;

            .titleBox {
                display: flex;
                justify-content: space-between;

                .left {
                    display: flex;
                    align-items: center;

                    >img {
                        width: 124px;
                        height: auto;
                        min-height: 100px;
                    }

                    .title {
                        margin-left: -15px;
                        display: flex;
                        justify-content: flex-start;

                        h1 {
                            font-weight: 600;
                            font-size: 50px;
                            line-height: 1;
                            color: #fff;
                        }

                        >img {
                            width: 77px;
                            height: 60px;
                            margin-left: 40px !important;
                        }
                    }
                }

                >img {
                    width: 144px;
                    height: 104px;
                }
            }

            .desc {
                width: 100%;
                border-radius: 8px;
                max-width: 1098px;
                box-sizing: border-box;
                padding: 20px;
                border: 1px solid #fff;
                color: #fff;
                font-weight: 400;
                font-size: 18px;
                line-height: 1.8;
                margin-left: 124px;
            }

            .bottom {
                width: 100%;
                padding: 40px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                position: absolute;
                left: 0;
                bottom: 0;

                .m-left {
                    display: none;
                }

                .left {
                    width: 60px;
                    height: 28px;
                }

                .right {
                    width: 300px;
                    height: 300px;
                    margin-right: -80px;
                    margin-bottom: -40px;
                }
            }

        }

        .Welfare-content {
            width: 100%;
            max-width: 1530px;
            box-sizing: border-box;
            margin: 0 auto;
            padding-top: 80px;
            text-align: center;

            >h1 {
                margin: 0 auto;
                font-weight: 600;
                font-size: 50px;
                line-height: 1;
                text-align: center;
            }

            .Welfarelist {
                margin-top: 40px;
                display: flex;
                justify-content: space-between;

                .WelfareItem {
                    flex: 1;
                    min-height: 300px;
                    margin-right: 20px;
                    background-color: #F4FFD5;
                    border-radius: 10px;
                    padding: 43px;
                    box-sizing: border-box;
                    border: 1px solid #000000;

                    img {
                        display: block;
                        width: 40px;
                        height: auto;
                    }

                    h2 {
                        font-weight: 600;
                        font-size: 28px;
                        line-height: 1;
                        text-align: left;
                        margin: 23px 0px;
                        color: #0E0E0E;
                    }

                    .desc {
                        font-weight: 400;
                        font-size: 18px;
                        line-height: 1.5;
                        text-align: left;
                        overflow: hidden;
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-line-clamp: 20;
                        -webkit-box-orient: vertical;
                        color: #0E0E0E;
                    }
                }

                :last-child {
                    margin-right: 0px !important;
                }
            }
        }
    }

    .recruiting-content {
        width: 100%;
        padding: 60px 0px;
        box-sizing: border-box;

        .recruiting {
            width: 100%;
            max-width: 1530px;
            box-sizing: border-box;
            margin: 0 auto;

            .desc {
                width: 100%;
                font-weight: 400;
                font-size: 20px;
                line-height: 1.8;
                display: flex;
                justify-content: space-between;

                .left {
                    flex: 1;
                }

                .title {
                    font-weight: 600;
                    font-size: 50px;
                    line-height: 1;
                    margin-bottom: 40px;
                }

                p {
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 1.8;
                    word-wrap: break-word;
                }

                .join-us {
                    margin-top: 40px;
                }

                .right {
                    width: 650px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .content {
                        width: 1px;
                        height: 100%;
                        position: relative;

                        .recruiting-info {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 130%;
                            color: #0E0E0E;
                            border-radius: 100px;
                            padding: 10px 24px !important;
                            border: 1px solid #0E0E0E;
                            white-space: nowrap;
                            position: absolute;
                        }

                        :nth-child(1) {
                            top: 0;
                            left: 20px;
                        }

                        :nth-child(2) {
                            top: 30px;
                            right: -40px;
                            z-index: 12;
                        }

                        :nth-child(3) {
                            top: 75px;
                            left: -25px;
                            z-index: 11;
                        }

                        :nth-child(4) {
                            top: 120px;
                            left: 60px;
                            z-index: 10;
                        }

                        :nth-child(5) {
                            top: 155px;
                            right: -85px;
                            z-index: 9;
                        }

                        :nth-child(6) {
                            top: 195px;
                            left: 55px;
                        }

                        :nth-child(7) {
                            top: 230px;
                            right: -80px;
                            z-index: 9;
                        }
                    }

                    .m-conetnt {
                        display: none;
                    }

                    // img {
                    //     width: 100%;
                    //     height: auto;
                    // }
                }
            }
        }
    }

    .process-content {
        width: 100%;
        padding: 100px 0px;
        box-sizing: border-box;

        .processBox {
            width: 100%;
            max-width: 1530px;
            box-sizing: border-box;
            margin: 0 auto;
            text-align: center;

            .title {
                font-weight: 600;
                font-size: 50px;
                line-height: 1;
                text-align: center;
            }

            .processlist {
                margin: 60px 0px auto;
                display: flex;
                justify-content: center;
                align-items: center;

                .processItem {
                    padding: 20px 40px;
                    box-sizing: border-box;
                    border: 2px solid #0E0E0E;
                    border-radius: 100px;
                    font-weight: 500;
                    font-size: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    line-height: 1.2;

                    .activeflag {
                        width: 40px;
                        min-height: 40px;
                        height: auto;
                        margin-right: 10px;
                    }

                    .High {
                        position: absolute;
                        width: 24px;
                        height: 24px;
                        right: -10px;
                        top: -10px;
                    }
                }

                >img {
                    width: 80px;
                    height: auto;
                }
            }

            .join-us {
                margin: 60px 0px 100px 0px;
            }
        }

        .aboutBk {
            width: 100%;
            max-width: 1530px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 80px 20px;
            border-radius: 20px;
            border: 1px solid #0E0E0E;

            .aboutBkbox {
                display: flex;
                align-items: center;

                img {
                    width: auto;
                    min-width: 200px;
                    height: 340px;
                }

                .about-content {
                    flex: 1;
                    padding: 0px 20px 0px 46px;

                    >.title {
                        font-weight: 600;
                        font-size: 50px;
                        line-height: 1;
                        margin-bottom: 20px;
                    }

                    .desc {
                        font-weight: 400;
                        font-size: 20px;
                        line-height: 180%;
                        word-wrap: break-word;
                        margin-bottom: 60px;
                    }


                }
            }

            .aboutlist {
                width: 100%;
                display: flex;
                justify-content: space-betweens;
                align-items: center;
                margin-top: 50px;

                .infoitem {
                    flex: 1;
                    padding-left: 80px;
                    border-right: 1px solid #E5E3E9;

                    .title {
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 1;
                        margin-bottom: 10px;
                    }

                    h3 {
                        font-weight: 700;
                        font-size: 40px;
                        line-height: 1;
                    }
                }

                :last-child {
                    border: none;
                }
            }

        }
    }
}

@media only screen and (min-width: 1430px) and (max-width:1610px) {
    .recruiting-about {
        .content-about {
            max-width: 1350px !important;
        }
    }

    .recruiting-duty {
        .duty-content {
            max-width: 1350px !important;

            .desc {
                max-width: 998px !important;
            }
        }

        .Welfare-content {
            max-width: 1350px !important;
        }
    }

    .recruiting-content {
        .recruiting {
            max-width: 1350px !important;
        }
    }

    .process-content {
        .processBox {
            max-width: 1350px !important;
        }

        .aboutBk {
            max-width: 1350px !important;

            .infoitem {
                padding-left: 40px !important;

                h3 {
                    font-size: 32px !important;
                }
            }

            img {
                height: 250px !important;
            }
        }
    }

}

@media only screen and (min-width: 1200px) and (max-width:1430px) {
    .recruiting-header {
        .recruiting-header-wrap {
            max-width: 1100px !important;

            .main-img {
                width: 526px !important;
                min-height: 526px !important;
            }
        }
    }

    .recruiting-about {
        .content-about {
            max-width: 1150px !important;
        }
    }

    .recruiting-duty {
        .duty-content {
            max-width: 1150px !important;
            padding: 20px 20px 80px 20px !important;

            .titleBox {
                .left {
                    >img {
                        width: 100px !important;
                    }

                    .title {
                        >img {
                            width: 77px;
                            height: 60px;
                            margin-left: 40px !important;
                        }
                    }
                }

                >img {
                    width: 120px !important;
                    height: auto !important;
                    min-height: 80px !important;
                }
            }

            .desc {
                max-width: 950px !important;
                margin-left: 100px !important;
            }

            .bottom {
                .right {
                    width: 200px !important;
                    height: 200px !important;
                    margin-right: -60px !important;
                }
            }
        }

        .Welfare-content {
            max-width: 1150px !important;
        }
    }

    .recruiting-content {
        .recruiting {
            max-width: 1150px !important;
        }
    }

    .process-content {
        .processBox {
            max-width: 1150px !important;

            .processlist {
                .processItem {
                    padding: 10px 20px !important;
                    font-size: 20px !important;

                    .activeflag {
                        width: 35px !important;
                        min-height: 35px !important;
                        margin-right: 10px !important;
                    }
                }
            }
        }

        .aboutBk {
            max-width: 1150px !important;

            .infoitem {
                padding-left: 40px !important;

                h3 {
                    font-size: 32px !important;
                }
            }

            img {
                height: 230px !important;
            }

            .about-content {
                padding: 0px 15px 0px 15px !important;
            }
        }
    }
}

@media only screen and (min-width: 900px) and (max-width:1200px) {
    .recruiting-header {
        padding-bottom: 100px !important;

        .recruiting-header-wrap {
            max-width: 900px !important;

            .main-img {
                width: 426px !important;
                min-height: 426px !important;
            }

            .title {
                font-size: 40px !important;
            }

            .desc {
                font-size: 18px !important;
                margin: 30px 0px !important;
            }
        }
    }

    .recruiting-about {
        padding: 70px 0px 40px 0px !important;

        .content-about {
            max-width: 900px !important;

            >.title {
                font-size: 40px !important;
            }

            >.desc {
                font-size: 18px !important;
            }

            .aboutlist {
                .aboutItem {
                    img {
                        width: 120px !important;
                        height: 120px !important;
                        min-height: 120px !important;
                    }

                    .title {
                        font-size: 18px !important;
                        margin-top: 15px !important;
                    }

                    .desc {
                        font-size: 14px !important;
                    }
                }
            }
        }
    }

    .recruiting-duty {
        padding: 60px 0px 60px 0px !important;

        .duty-content {
            max-width: 900px !important;
            padding: 20px 20px 80px 20px !important;

            .titleBox {
                .left {
                    >img {
                        width: 80px !important;
                    }

                    .title {
                        >h1 {
                            font-size: 40px !important;
                        }

                        >img {
                            width: 57px !important;
                            height: auto !important;
                            margin-left: 20px !important;
                        }
                    }
                }

                >img {
                    width: 90px !important;
                    height: auto !important;
                    min-height: 90px !important;
                }
            }

            .desc {
                max-width: 750px !important;
                margin-left: 70px !important;
            }

            .bottom {
                .right {
                    width: 200px !important;
                    height: 200px !important;
                    margin-right: -40px !important;
                }
            }
        }

        .Welfare-content {
            max-width: 900px !important;

            h1 {
                font-size: 40px !important;
            }

            .WelfareItem {
                padding: 23px !important;

                img {
                    width: 34px !important;
                    height: 34px !important;
                }

                h2 {
                    font-size: 25px !important;
                }
            }
        }
    }

    .recruiting-content {
        .recruiting {
            max-width: 900px !important;

            h2 {
                font-size: 40px !important;
            }

            p {
                font-size: 18px !important;
            }

            .right {
                width: 600px !important;
                padding-top: 20% !important;
                padding-right: 10%;
            }
        }
    }

    .process-content {
        padding: 60px 0px !important;

        .processBox {
            max-width: 900px !important;

            .title {
                font-size: 40px !important;
            }

            .processlist {
                margin: 40px 0px auto !important;

                .processItem {
                    padding: 10px 20px !important;
                    font-size: 16px !important;

                    .activeflag {
                        width: 30px !important;
                        min-height: 30px !important;
                        margin-right: 10px !important;
                    }
                }

                >img {
                    width: 40px !important;
                    height: auto !important;
                }
            }
        }

        .aboutBk {
            width: 98% !important;
            max-width: auto !important;
            padding: 20px !important;
            box-sizing: border-box !important;

            .infoitem {
                padding: 0px 25px !important;

                h3 {
                    font-size: 28px !important;
                }
            }

            img {
                height: 200px !important;
            }

            .about-content {
                padding: 0px 15px 0px 15px !important;
                box-sizing: border-box !important;

                .title {
                    font-size: 40px !important;
                }

                .desc {
                    font-size: 18px !important;
                    margin-bottom: 40px !important;
                }
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width:900px) {
    .join-us {
        width: 100% !important;
        min-width: 100% !important;
        line-height: 44px !important;
        border-radius: 4px !important;

        a {
            width: 100 !important;
            height: 44px !important;
        }
    }

    .recruiting-layout-wrap {
        width: 100%;
        padding: 60px 0px !important;

        .recruiting-header {
            padding-bottom: 60px !important;

            .recruiting-header-wrap {
                width: 100%;
                padding: 0px 20px !important;
                display: flex;
                flex-direction: column;
                text-align: center;
                box-sizing: border-box;

                .m-main-img {
                    display: block;
                    width: 100% !important;
                    min-height: 300px !important;
                    height: auto !important;
                    margin: 0 auto !important;
                }

                .recruiting-header-left {
                    margin-top: 30px !important;
                    width: 100% !important;

                    .title {
                        display: none;
                    }

                    .m-title {
                        display: block;
                        font-weight: 600;
                        font-size: 32px !important;
                        line-height: 1.2 !important;
                        letter-spacing: -1px !important;
                    }

                    .desc {
                        font-size: 15px !important;
                        line-height: 1.5 !important;
                        margin: 16px 0px !important;
                    }
                }

                .main-img {
                    display: none !important;
                }
            }
        }

        .recruiting-about {
            padding: 40px 0px !important;

            .content-about {
                width: 100% !important;
                box-sizing: border-box;
                padding: 0px 20px;

                >.title {
                    width: 100% !important;
                    font-size: 24px !important;
                    line-height: 1 !important;
                    letter-spacing: -1px !important;
                }

                >.desc {
                    width: 100% !important;
                    font-size: 15px !important;
                    padding: 10px 0px 40px 0px !important;
                }

                .aboutlist {
                    width: 100% !important;
                    display: flex;
                    flex-direction: column !important;

                    .aboutItem {
                        width: 100% !important;
                        flex-direction: row !important;
                        justify-content: flex-start !important;
                        align-items: center !important;
                        box-sizing: border-box !important;

                        img {
                            width: 80px !important;
                            min-height: 80px !important;
                            height: auto;
                            margin-right: 15px !important;
                        }

                        .content {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            padding-top: 20px !important;
                            vertical-align: middle;

                            .title {
                                width: 100%;
                                text-align: left !important;
                                font-size: 20px !important;
                                margin: 0px !important;
                                letter-spacing: -1px !important;
                            }

                            .desc {
                                height: auto !important;
                                min-height: 42px !important;
                                text-align: left !important;
                                font-size: 14px !important;
                                // -webkit-line-clamp: 2 !important;
                            }
                        }
                    }
                }
            }
        }

        .recruiting-duty {
            width: 100%;
            padding: 40px 20px !important;
            box-sizing: border-box;

            .duty-content {
                width: 100% !important;
                background-color: #9C60FF;
                border-radius: 16px !important;
                padding: 10px !important;
                position: unset !important;

                .titleBox {
                    display: flex;
                    justify-content: flex-start !important;

                    .left {
                        display: flex;
                        align-items: center;

                        >img {
                            width: 62px !important;
                            height: auto;
                            min-height: 52px !important;
                        }

                        .title {
                            margin-left: -52px !important;
                            display: flex;
                            justify-content: flex-start;

                            h1 {
                                font-size: 24px !important;
                                letter-spacing: -1px !important;
                            }

                            >img {
                                width: 38.5px !important;
                                height: 30px !important;
                                margin-left: 10px !important;
                            }
                        }
                    }

                    >img {
                        display: none !important;
                    }
                }

                .desc {
                    width: 100%;
                    border-radius: 8px;
                    box-sizing: border-box;
                    padding: 10px !important;
                    font-size: 15px !important;
                    line-height: 1.6 !important;
                    margin-left: 0 !important;
                }

                .bottom {
                    width: 100%;
                    padding: 20px 10px !important;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    position: unset !important;
                    margin-top: -40px !important;

                    .m-left {
                        display: flex;
                        align-items: flex-end;

                        .pointright {
                            display: block;
                            width: 62px !important;
                            height: 52px !important;
                        }

                        .left {
                            width: 38.57px;
                            height: 18px;
                            margin-left: 20px !important;
                        }
                    }

                    >.left {
                        display: none;
                    }

                    .right {
                        width: 148px !important;
                        height: 148px !important;
                        margin-right: -30px !important;
                        margin-bottom: -30px !important;
                    }
                }

            }

            .Welfare-content {
                width: 100%;
                padding-top: 40px !important;

                >h1 {
                    font-size: 24px !important;
                    letter-spacing: -1px !important;
                }

                .Welfarelist {
                    margin-top: 20px !important;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start !important;
                    text-align: center;

                    .WelfareItem {
                        width: 100% !important;
                        min-height: 113px !important;
                        padding: 18px !important;
                        margin: 5px auto !important;

                        img {
                            display: block;
                            width: 24px !important;
                            min-height: 24px !important;
                            height: auto;
                        }

                        h2 {
                            font-size: 20px !important;
                            margin: 10px 0px !important;
                            letter-spacing: -1px;
                        }

                        .desc {
                            font-size: 14px !important;
                        }
                    }
                }
            }
        }

        .recruiting-content {
            width: 100%;
            padding: 40px 20px !important;
            box-sizing: border-box;

            .recruiting {
                width: 100% !important;

                .desc {
                    font-size: 15px !important;
                    flex-direction: column;
                    justify-content: flex-start !important;

                    .title {
                        font-size: 24px !important;
                        margin-bottom: 16px !important;
                    }

                    p {
                        font-size: 15px !important;
                        line-height: 1.6 !important;
                    }

                    .join-us {
                        margin-top: 16px !important;
                    }

                    .right {
                        width: 100% !important;
                        margin-top: 20px !important;

                        .content {
                            display: none !important;
                        }

                        .m-conetnt {
                            display: block;
                            width: 100% !important;
                            .recruitinginfo-list {
                                width: 100%;
                                .infoitem {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;

                                    .itemLeft {
                                        display: flex;
                                        flex: 1;
                                        width: 50% !important;
                                        justify-content: flex-end;
                                        >div {
                                            display: block;
                                            font-size: 15px !important;
                                            line-height: 1.3 !important;
                                            color: #0E0E0E;
                                            border-radius: 100px;
                                            padding: 10px 24px !important;
                                            border: 1px solid #0E0E0E;
                                            white-space: normal;
                                            position: unset !important;
                                            max-width: 120% !important;
                                            box-sizing: border-box;
                                            letter-spacing: -1px !important;
                                        }
                                    }

                                    .itemRight {
                                        flex: 1;
                                        width: 50% !important;
                                        display: flex;
                                        justify-content: flex-start;
                                        >div {
                                            display: block;
                                            font-size: 15px !important;
                                            line-height: 1.3 !important;
                                            color: #0E0E0E;
                                            border-radius: 100px;
                                            padding: 10px 24px !important;
                                            border: 1px solid #0E0E0E !important;
                                            white-space: normal;
                                            max-width: 120% !important;
                                            box-sizing: border-box;
                                            letter-spacing: -1px !important;
                                        }
                                    }
                                }
                                :nth-child(1) {
                                    >div>div{
                                        margin-left: -25px;
                                    }
                                }
                                :nth-child(2) {
                                    >div>div{
                                        margin-top: -15px;
                                        margin-right: 10px;
                                        z-index: 5;
                                    }
                                }

                                :nth-child(3) {
                                    >div>div{
                                        margin-left: -70px;
                                        margin-top: -5px;
                                        z-index: 4;
                                    }
                                }

                                :nth-child(4) {
                                    >div>div{
                                        margin-left: 20px;
                                        margin-top: -5px; 
                                        z-index: 3;
                                    } 
                                }

                                :nth-child(5) {
                                    >div>div{
                                        margin-right: -45px;
                                        margin-top: -10px; 
                                        z-index: 2; 
                                    }
                                }

                                :nth-child(6) {
                                    >div>div{
                                        margin-top: -5px;
                                        z-index: 1;
                                    }   
                                }

                                :nth-child(7) {
                                    >div>div{
                                        margin-right: -20px;
                                        margin-top: -10px;
                                        z-index: 2;
                                    }
                                }
                            }
                        }

                        img {
                            width: 100%;
                            min-height: 200px !important;
                            height: auto;
                        }
                    }
                }

            }
        }

        .process-content {
            padding: 40px 10px !important;

            .processBox {
                width: 100%;
                padding: 0px 10px;
                box-sizing: border-box;
                margin: 0 auto;
                text-align: center;

                .title {
                    font-size: 24px !important;
                    letter-spacing: -1px !important;
                }

                .processlist {
                    margin: 20px auto !important;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .processItem {
                        font-weight: 600 !important;
                        padding: 10px 20px !important;
                        font-size: 15px !important;
                        line-height: 2 !important;
                        letter-spacing: -1px !important;

                        .activeflag {
                            width: 24px !important;
                            min-height: 24px !important;
                            height: 24px !important;
                            margin-right: 4px !important;
                        }

                        .High {
                            position: absolute;
                            width: 18px !important;
                            height: 18px !important;
                            right: -10px;
                            top: -10px;
                        }
                    }

                    >img {
                        width: 40px !important;
                        min-height: 40px !important;
                        height: auto !important;
                        transform: rotate(90deg);
                    }
                }

                .join-us {
                    margin: 40px 0px 60px 0px !important;
                }
            }

            .aboutBk {
                width: 100%;
                flex-direction: column !important;
                padding: 20px 0px !important;
                border-radius: 16px !important;

                .aboutBkbox {
                    display: flex;
                    flex-direction: column !important;

                    img {
                        width: 100% !important;
                        height: auto;
                    }

                    .about-content {
                        flex: 1;
                        padding: 40px 20px 20px 20px !important;

                        >.title {
                            font-size: 24px !important;
                            letter-spacing: -1px !important;
                        }

                        .desc {
                            font-size: 15px !important;
                            line-height: 1.6 !important;
                            margin-bottom: 0px !important;
                        }
                    }
                }

                .aboutlist {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 0px !important;
                    padding: 40px 20px 20px 20px !important;

                    .infoitem {
                        flex: unset !important;
                        width: 50% !important;
                        padding: 0 !important;
                        text-align: left !important;
                        margin-bottom: 20px !important;
                        border-right: none !important;

                        .title {
                            font-size: 15px !important;
                            line-height: 1.33 !important;
                            margin-bottom: 5px !important;
                            letter-spacing: -1px !important;
                        }

                        h3 {
                            font-size: 20px !important;
                            line-height: 1 !important;
                        }
                    }
                }
            }
        }
    }
}
</style>