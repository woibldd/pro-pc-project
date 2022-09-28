<template>
    <footer class="footer">
        <div class="footer-box contbox" v-if="isPC">
            <div class="footer-listbox">
                <div class="listbox-left">
                    <a :href="'/' + $store.state.locale + '/index'" title="BitKeep,  a best crypto wallet">
                        <img src="@/assets/img/footer/BK logo.svg" alt="BitKeep,  a best crypto wallet">
                    </a>
                </div>
                <div class="listbox-right">
                    <div class="listbox-item">
                        <ul>
                            <li class="cur">{{ $t("footer.footeritem1") }}</li>
                            <li><a :href='"/" + language + "/about"'>{{ $t("footer.footeritem1-item1") }}</a></li>
                            <li><a :href='"/" + language + "/official-verification"'>{{ $t("footer.footeritem1-item4") }}</a></li>
                            <li><a :href='"/" + language + "/jobs"'>{{ $t("footer.footeritem1-item2") }}</a><span
                                    class="footer_3_tip">{{$t("footer.footeritem1-item2-item")}}</span></li>
                            <li><a :href='"/" + language + "/about?Contact_us"'>{{ $t("footer.footeritem1-item3") }}</a></li>
                        </ul>
                    </div>
                    <div class="listbox-item">
                        <ul>
                            <li class="cur">{{ $t("footer.footeritem2") }}</li>
                            <li><a :href='"/" + language + "/about?Contact_us"'>{{ $t("footer.footeritem2-item1") }}</a></li>
                           
                           
                            <li>
                                <a @click="jumpUrl('business', $event)" :href="`https://business.bitkeep.com/`" target="_blank">
                                   Business
                                </a>
                            </li>
                            <li>
                                <a :href="`/${locale=='ko'? 'en': locale}/royalties/dataCenter`" target="_blank">
                                   {{$t("footer.footeritem2-item4")}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="listbox-item">
                        <ul>
                            <li class="cur">{{ $t("footer.footeritem3") }}</li>
                            <li><a :href='"/" + $store.state.locale + "/download?type=1"'>{{ $t("footer.footeritem3-item1") }}</a></li>
                            <li><a :href='"/" + $store.state.locale + "/download?type=0"'>{{ $t("footer.footeritem3-item2") }}</a></li>
                            <li><a :href='"/" + $store.state.locale + "/download?type=2"'>{{ $t("footer.footeritem3-item3") }}</a></li>
                        </ul>
                    </div>
                    <div class="listbox-item">
                        <ul>
                            <li class="cur">{{ $t("footer.footeritem4") }}</li>
                            <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb=how-do-i-change-my-password"'
                                    target="_blank">{{ $t("footer.footeritem4-item1") }}</a></li>
                            <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb=knowledge-base-wordpress-plugin"'
                                    target="_blank">{{ $t("footer.footeritem4-item2") }}</a></li>
                            <li v-if='$store.state.locale!="zh"'><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何交易（买入-卖出）？":"how-to-trade-buy-sell")' target="_blank">
                                    {{ $t("footer.footeritem4-item3") }}</a></li>
                            <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何进行跨链兑换":"how-to-perform-cross-chain-exchange")'
                                    target="_blank">{{ $t("footer.footeritem4-item4") }}</a></li>
                            <li v-if='$store.state.locale!="zh"'><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何在bitkeep钱包交易bored-ape-yacht-club":"how-to-trade-bayc-nfts-with-bitkeep")'
                                    target="_blank">{{ $t("footer.footeritem4-item5") }}</a></li>
                        </ul>
                    </div>
                    <div class="listbox-item" style="margin-right: 0;">
                        <ul>
                            <li class="cur" bklang="footer_13">{{ $t("footer.footeritem5") }}</li>
                            <li><a href="https://github.com/bitkeepwallet/download" target="_blank">{{
                                    $t("footer.footeritem5-item1")
                            }}</a></li>
                            <li>
                                <a href="/resource/privacy" target="_blank">
                                     {{$t("footer.PrivacyAgreement")}}
                                 </a>
                             </li>
                            <li>
                                <a href="/resource/terms" target="_blank">
                                    {{$t("footer.UserAgreement")}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-right">
                <p>© 2018-2022 BitKeep All Rights Reserved</p>
                <ul>
                    <li class="telebox">
                        <a v-if="$store.state.locale=='zh'" href="https://t.me/BitKeep_Official" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                                alt="Bitkeep's official Telegram account"></a>
                        <a v-if="$store.state.locale=='en'" href="https://t.me/bitkeep" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                                alt="Bitkeep's official Telegram account"></a>
                        <a v-if="$store.state.locale=='ko'" href="https://t.me/BitkeepKorea" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                                alt="Bitkeep's official Telegram account"></a>           
                    </li>
                    <li><a href="https://twitter.com/BitKeepOS" target="_blank"><img
                                src="@/assets/img/footer/twitter_logo.svg"
                                alt="Bitkeep's official Twitter account"></a>
                    </li>
                    <li><a href="https://www.youtube.com/c/BitKeepWallet" target="_blank"><img
                                src="@/assets/img/footer/youtube_logo.svg"
                                alt="Bitkeep's official  YouTube account"></a>
                    </li>
                    <li><a href="https://medium.com/@bitkeepblog" target="_blank"><img
                                src="@/assets/img/footer/medium_logo.svg" alt="Bitkeep's official Medium account"></a>
                    </li>
                    <li><a href="https://github.com/bitkeepwallet/download" target="_blank"><img
                                src="@/assets/img/footer/github_logo.svg" alt="Bitkeep's official GitHub account"></a>
                    </li>
                    <li><a href="https://discord.gg/qYTatUzNjM" target="_blank"><img
                                src="@/assets/img/footer/discord_logo.svg"
                                alt="Bitkeep's official Discord account"></a></li>
                    <li><a href="https://instagram.com/bitkeep_global?igshid=YmMyMTA2M2Y=" target="_blank"><img
                                src="@/assets/img/footer/icons flat.svg"
                                alt="Bitkeep's official instagram account"></a></li>
                    <li><a href="https://www.facebook.com/BitKeep" target="_blank"><img
                                src="@/assets/img/footer/facebook_logo.svg"
                                alt="Bitkeep's official facebook account"></a>
                    </li> 
                </ul>
            </div>
        </div>
        <div class="mobilefooter-box" v-else>
            <div class="footer-logo">
                <a :href="'/' + $store.state.locale + '/index'" title="BitKeep,  a best crypto wallet">
                    <img src="@/assets/img/footer/BK logo.svg" alt="BitKeep,  a best crypto wallet">
                </a>
            </div>
            <div class="footerslideMenu">
                <div class="item">
                    <div class="cur j_cur About" @click="slideToggle('About')">
                        <p>{{ $t("footer.footeritem1") }}</p>
                        <span class="jian"></span>
                    </div>
                    <ul class="more">
                        <li><a :href='"/" + language+ "/about"'>{{ $t("footer.footeritem1-item1") }}</a></li>
                        <li><a :href='"/" + language + "/official-verification"'>{{ $t("footer.footeritem1-item4") }}</a></li>
                        <li><a :href='"/" + language + "/jobs"'>{{ $t("footer.footeritem1-item2") }}<span class="footer_3_tip">{{$t("footer.footeritem1-item2-item")}}</span></a>     
                        </li>
                        <li><a :href='"/" + language + "/about?Contact_us"'>{{ $t("footer.footeritem1-item3") }}</a></li>
                    </ul>
                </div>
                <div class="item">
                    <div class="cur j_cur User" @click="slideToggle('User')">
                        <p>{{ $t("footer.footeritem2") }}</p>
                        <span class="jian"></span>
                    </div>
                    <ul class="more">
                        <li><a :href='"/" + $store.state.locale+ "/about?Contact_us"'>{{ $t("footer.footeritem2-item1") }}</a></li>
                        <li><a :href='"https://forms.gle/"+($store.state.locale=="zh"?"VpzYLXeekEsE57xx8":"Tqxy6dHhhhR6CvS9A")' target="_blank">{{
                                $t("footer.footeritem2-item2")
                        }}</a></li>
                        <li><a :href='"https://forms.gle/"+($store.state.locale=="zh"?"FoDvL3fiTabri8Kg8":"jqHpdeZK3Sh2YJ7R9")' target="_blank">{{
                                $t("footer.footeritem2-item3")
                        }}</a></li>
                        <!-- <li><a :href='"https://forms.gle/"+($store.state.locale=="zh"?"iZyndJ7xUFP9Cuu8A":"aTnyNtzNB9aGktA18")' target="_blank">{{
                                $t("footer.footeritem2-item4")
                        }}</a></li>  -->
                        <li>
                            <a :href="`/${locale=='ko'? 'en': locale}/royalties/dataCenter`" target="_blank">
                                {{$t("footer.footeritem2-item4")}}
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- H5底部去除wallet 菜单 -->
                <!-- <div class="item">
                    <div class="cur j_cur Wallet" @click="slideToggle('Wallet')">
                        <p>{{ $t("footer.footeritem3") }}</p>
                        <span class="jian"></span>
                    </div>
                    <ul class="more">
                        <li><a :href='($store.state.locale=="en"?"":"/" + $store.state.locale) + "/download?type=1"'>{{ $t("footer.footeritem3-item1") }}</a></li>
                        <li><a :href='($store.state.locale=="en"?"":"/" + $store.state.locale) + "/download?type=0"'>{{ $t("footer.footeritem3-item2") }}</a></li>
                        <li><a :href='($store.state.locale=="en"?"":"/" + $store.state.locale) + "/download?type=2"'>{{ $t("footer.footeritem3-item3") }}</a></li>
                    </ul>
                </div> -->
                <div class="item">
                    <div class="cur j_cur Learn" @click="slideToggle('Learn')">
                        <p>{{ $t("footer.footeritem4") }}</p>
                        <span class="jian"></span>
                    </div>
                    <ul class="more">
                        <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb=how-do-i-change-my-password"' target="_blank">{{
                                $t("footer.footeritem4-item1")
                        }}</a></li>
                        <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb=knowledge-base-wordpress-plugin"'
                                target="_blank">{{
                                        $t("footer.footeritem4-item2")
                                }}</a></li>
                        <li v-if='$store.state.locale!="zh"'><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何交易（买入-卖出）？":"how-to-trade-buy-sell")' target="_blank">
                                {{ $t("footer.footeritem4-item3") }}</a></li>
                        <li><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何进行跨链兑换":"how-to-perform-cross-chain-exchange")'
                                target="_blank">{{ $t("footer.footeritem4-item4") }}</a></li>
                        <li v-if='$store.state.locale!="zh"'><a :href='`https://study.bitkeep${$store.state.hostChange}/`+($store.state.locale=="zh"?"zh":"en")+"/?ht_kb="+($store.state.locale=="zh"?"如何在bitkeep钱包交易bored-ape-yacht-club":"how-to-trade-bayc-nfts-with-bitkeep")'
                                target="_blank">{{ $t("footer.footeritem4-item5") }}</a></li>
                    </ul>
                </div>
                <div class="item">
                    <div class="cur j_cur Resource" @click="slideToggle('Resource')">
                        <p>{{ $t("footer.footeritem5") }}</p>
                        <span class="jian"></span>
                    </div>
                    <ul class="more">
                        <li><a href="https://github.com/bitkeepwallet/download" target="_blank">{{
                                $t("footer.footeritem5-item1")
                        }}</a></li>
                        <li>
                            <a href="/resource/privacy" target="_blank">
                                 {{$t("footer.PrivacyAgreement")}}
                             </a>
                         </li>
                        <li>
                            <a href="/resource/terms" target="_blank">
                                {{$t("footer.UserAgreement")}}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            <ul class="sharebox">
                <li>
                    <a v-if="$store.state.locale=='zh'" href="https://t.me/BitKeep_Official" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                        alt="Bitkeep's official Telegram account"></a>
                    <a v-if="$store.state.locale=='en'" href="https://t.me/bitkeep" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                        alt="Bitkeep's official Telegram account"></a>
                    <a v-if="$store.state.locale=='ko'" href="https://t.me/BitkeepKorea" target="_blank"><img src="@/assets/img/footer/telegram_logo.svg"
                        alt="Bitkeep's official Telegram account"></a>
                </li>
                
                <li><a href="https://twitter.com/BitKeepOS" target="_blank"><img
                            src="@/assets/img/footer/twitter_logo.svg" alt="Bitkeep's official Twitter account"></a>
                </li>
                <li><a href="https://www.youtube.com/c/BitKeepWallet" target="_blank"><img
                            src="@/assets/img/footer/youtube_logo.svg" alt="Bitkeep's official  YouTube account"></a>
                </li>
                <li><a href="https://medium.com/@bitkeepblog" target="_blank"><img
                            src="@/assets/img/footer/medium_logo.svg" alt="Bitkeep's official Medium account"></a>
                </li>
                <li><a href="https://github.com/bitkeepwallet/download" target="_blank"><img
                            src="@/assets/img/footer/github_logo.svg" alt="Bitkeep's official GitHub account"></a>
                </li>
                <li><a href="https://discord.gg/qYTatUzNjM" target="_blank"><img
                            src="@/assets/img/footer/discord_logo.svg" alt="Bitkeep's official Discord account"></a>
                </li>
                <li><a href="https://instagram.com/bitkeep_global?igshid=YmMyMTA2M2Y=" target="_blank"><img
                            src="@/assets/img/footer/icons flat.svg" alt="Bitkeep's official instagram account"></a>
                </li>
                <li><a href="https://www.facebook.com/BitKeep" target="_blank"><img
                            src="@/assets/img/footer/facebook_logo.svg" alt="Bitkeep's official facebook account"></a>
                </li> 
            </ul>
            <p class="copyright">© 2018-2022 BitKeep All Rights Reserved</p>
        </div>
        <remote-js
            cdn="https://cdn2.bitkeep.vip/files/jquery.min.js"
        ></remote-js>
    </footer>
</template>
<script>
import cndMixins from "@/mixins/cnd.js";
import { toUrl } from '@/tools/common'
export default {
    name: "DefaultFooter",
    mixins: [cndMixins],
    data() {
        return {
            isPC: this.$store.state.isPC
        }
    },
    methods: {
        slideToggle(name) {
            $('.' + name).parent().find($(".more")).slideToggle()
            $('.' + name).find($(".jian")).toggleClass("jian_up")
        },
        jumpUrl(name, event) {
            toUrl(name, event, this)
        },
    },
    watch: {
        "$store.state.isPC": function (newVal, oldVal) {
            this.isPC = newVal
        }
    },
    computed: {
        locale() {
            return  this.$store.state.locale;
        },
        language(){
            return this.locale=="zh"?"zh":(this.locale=="ko"?"ko":"en")
        }
    }
}
</script>
<style scoped lang="less">
@media screen and (max-width: 1920px) and (min-width: 1400px) {
    .footer {
        padding: 80px 196px 198px 188px !important;
    }
}
@media screen and (max-width: 1399px) and (min-width: 1250px) {
    .footer {
        padding: 80px 100px 198px 100px !important;
    }
}
@media screen and (max-width: 1249px)and (min-width: 831px) {
    .footer {
        padding: 80px 20px 188px 20px !important;

        .footer-listbox .listbox-right {
            margin-left: 30px;
        }
    }
}

@media screen and (max-width: 831px) {
    .footer {
        padding: 20px 0px !important;
    }
}

.footer {
    width: 100%;
    min-width: 350px;
    padding: 80px 196px 198px 188px;
    background: #0E0E0E;
    box-sizing: border-box;
}

.footer-listbox {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.footer-listbox .listbox-left img {
    display: block;
    width: 100%;
    height: auto;
}

.footer-listbox .listbox-right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 203px;
}

.footer-listbox .listbox-item {
    font-size: 14px;
    color: #fff;
}

.footer-listbox .listbox-item li {
    line-height: 50px;

    .footer_3_tip {
        background: #7524F9;
        margin-left:15px;
        border-radius: 100px;
        padding: 5px 8px;
        box-sizing: border-box;
        font-weight: 500;
        line-height: 100%;
        font-size: 14px;
        color: #fff;
    }
}

.footer-listbox .listbox-item li a {
    color: #fff !important;
    font-weight: 300 !important;
    font-family: PingFang SC, microsoft yahei !important;
}

.footer-listbox .listbox-item li.cur {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 30px;
}

.footer-box .footer-right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 62px;
}

.footer-box .footer-right p {
    color: rgba(255, 255, 255, .5);
    font-weight: 300;
}

.footer-box .footer-right ul {
    display: flex;
    justify-content: space-between;
}

.footer-box .footer-right ul li {
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: 34px;

    .promptPopBox:hover .promptPop {
        display: block;
    }
}

.footer-box .footer-right ul li span {
    display: block;
    width: 100%;
    height: 100%;
}

.footer-box .footer-right ul li img {
    display: block;
    width: 100%;
    height: auto;
}

.footer-box .telebox {
    position: relative;
}

.footer-box .teleList {
    display: none;
    position: absolute;
    left: -3.55rem;
    top: -5.5rem;
    width: 8rem;
    padding: .5rem 0;
    border-radius: .5rem;
    background: #fff;
    text-align: center;
    line-height: 2.5rem;
}

.footer-box .teleList::after {
    content: '';
    position: absolute;
    display: block;
    left: 3.8rem;
    bottom: -.8rem;
    width: 0;
    height: 0;
    border: .4rem solid transparent;
    border-top: .4rem solid #fff;
}

.footer-box .teleList a {
    display: block;
    height: 2.5rem;
}

.promptPopBox {
    position: relative;

    .promptPop {
        display: none;
        position: absolute;
        top: -165px;
        left: -60px;
        max-width: 16rem;
        height: auto;
        padding: 1rem;
        line-height: 1.5rem;
        font-size: .8rem;
        border-radius: .5rem;
        z-index: 99;
        background: #fff;
        color: #919899;
        box-shadow: 0 3px 6px -4px rgba(16, 38, 71, .05), 0 6px 16px rgba(16, 38, 71, .05), 0 9px 28px 8px rgba(16, 38, 71, .05);

        &::after {
            content: '';
            position: absolute;
            border: 6px solid transparent;
            border-top: 6px solid #fff;
            left: 50%;
            margin-left: -3px;
            bottom: -10px;
        }

        .WeChatPrompt {
            width: 106.4px;
            height: 126px;
            background: #fff;

            img {
                display: block;
                width: 100%;
                height: auto;
            }

            p {
                text-align: center;
                line-height: 20px;
                margin-top: 8px;
                color: #919899;
            }
        }
    }
}

.footer .mobilefooter-box {
    .footer-logo {
        width: 100px;
        margin-left: 20px;
    }

    .footerslideMenu {
        width: 100%;
        cursor: pointer;
        margin-top: 20px;

        .item {
            font-weight: 600;
            font-size: 16px;

            .cur {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 12px 20px;
                align-items: center;
                border-radius: 4px;

                p {
                    flex: 1;
                    color: #E5E5E5;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.14;
                }

                span.jian {
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin-left: 4px;
                    background-size: 100% auto;
                    -webkit-transition: transform .3s ease-in-out;
                    transition: transform .3s ease-in-out;
                    background: url('@/assets/img/footer/arrow icons.svg') no-repeat;
                    background-size: 100% auto;
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


                    a {
                        display: block;
                        width: 100%;
                        padding: 10px 20px;
                        align-items: center;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 1.14;
                        color: #9E9DA6;
                        .footer_3_tip {
                            background: #7524F9;
                            margin-left:15px;
                            border-radius: 100px;
                            padding: 5px 8px;
                            box-sizing: border-box;
                            font-weight: 500;
                            line-height: 100%;
                            font-size: 14px;
                            color: #E5E5E5;
                        }
                    }

                }
            }

        }

    }

    .sharebox { 
        margin: 40px 20px 0px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        li {
            margin-right: 40px;
            margin-bottom: 20px;
        }
    }

    .copyright {
        font-weight: 500;
        font-size: 12px;
        line-height: 1.33;
        color: #E5E5E5;
        opacity: 0.5;
        margin: 0px 20px;
        box-sizing: border-box;

    }

    .footerslideMenu .item .cur:hover,
    .more li:hover {
        background: #202024 !important;
    }

}
</style>