<template>
    <footer class="footerbox">
        <div class="footercontent">
            <a href="/permanent/gasutopia">
                <img src="https://cdn.bitkeep.vip/u_b_499facc0-146f-11ed-a89a-2fe545e4c068.svg+xml" alt="GASUtopia"
                    class="GASULogo">
            </a>
            <div class="footerdescription">
                <div class="textInfo">
                    It was the best of times, it was the worst of times
                </div>
                <ul class="shareBox">
                    <li><a href="https://twitter.com/GASUofficial/status/1556611912644718593" target="_blank"><img
                                src="https://cdn.bitkeep.vip/u_b_8a3d4100-1476-11ed-a89a-2fe545e4c068.svg+xml"
                                alt="GASU's official Twitter account"></a>
                    </li>
                      <li><a href="https://medium.com/@gasutopia/cross-chain-gas-infra-gasutopia-receives-a-3m-investment-from-bitkeep-gasu-will-build-a-universal-dcb61ea59474" target="_blank"><img
                                src="https://cdn.bitkeep.vip/u_b_f7909010-1712-11ed-a508-1378161eeddd.svg+xml"
                                alt="GASU's official Twitter account"></a>
                    </li>
                    <!-- <li><a href="https://discord.gg/qYTatUzNjM" target="_blank"><img
                                src="https://cdn.bitkeep.vip/u_b_8a3ddd40-1476-11ed-a89a-2fe545e4c068.svg+xml"
                                alt="Bitkeep's official Discord account"></a>
                    </li>
                    <li>
                        <a href="https://t.me/bitkeep" target="_blank"><img
                                src="https://cdn.bitkeep.vip/u_b_8a3d6810-1476-11ed-a89a-2fe545e4c068.svg+xml"
                                alt="Bitkeep's official Telegram account"></a>
                    </li>
                    <li><a href="https://www.facebook.com/BitKeep" target="_blank"><img
                                src="https://cdn.bitkeep.vip/u_b_8a3d8f20-1476-11ed-a89a-2fe545e4c068.svg+xml"
                                alt="Bitkeep's official facebook account"></a>
                    </li> -->
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "GASUtopiaFooter",
}
</script>
<style lang="less" scoped>
.footerbox {
    width: 100%;
    padding: 157px 192px 157px 192px;
    background-color: #000000;
    box-sizing: border-box;

    .footercontent {
        width: 100%;

        .GASULogo {
            display: block;
            width: 425px;
            height: auto;
            margin-bottom: 146px;
        }

        .footerdescription {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .textInfo {
                font-style: normal;
                font-weight: 400;
                font-size: 27.7429px;
                line-height: 32px;
                color: #F5F2EF;
            }

            .shareBox {
                display: flex;
                justify-content: space-between;

                li {
                    padding: 0px 37.5px;
                    box-sizing: border-box;
                    border-right: 1.11758px solid #F5F2EF;

                    a {
                        display: block;
                        width: 50px;
                        height: 100%;
                        cursor: pointer;

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                :last-child {
                    border-right: none;
                }
            }
        }

    }
}

@media screen and (max-width: 1540px) and (min-width: 1000px) {
    .footerbox {
        padding: 157px 120px 157px 120px !important;

        .GASULogo {
            width: 373px !important;
            margin-bottom: 146px !important;
        }

        .textInfo {
            font-size: 24px !important;
            line-height: 28px !important;
        }
    }
}

@media screen and (max-width: 1000px) and (min-width: 300px) {
    .footerbox {
        padding: 37px 20px 37px 20px !important;

        .GASULogo {
            width: 237px !important;
            margin-bottom: 36px !important;
        }

        .textInfo {
            font-size: 24px !important;
            line-height: 28px !important;
        }

        .shareBox {

            li {

                a {
                    width: 28px !important;
                }
            }
        }
    }
}

@media screen and (max-width: 750px) and (min-width: 300px) {

    .footerbox {
        padding: 37px 20px 37px 20px !important;

        .footercontent {
            display: flex;
            justify-content: space-between;

            .GASULogo {
                width: 137px !important;
                margin-bottom: 0px !important;
            }

            .footerdescription {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                .textInfo {
                    display: none !important;
                }

                .shareBox {

                    li {
                        padding: 0px 14px !important;

                        a {
                            width: 26px !important;
                        }
                    }

                    :first-child {
                        padding-left: 0px !important;
                    }
                }
            }
        }

    }
}
</style>