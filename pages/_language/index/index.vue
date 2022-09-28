<template>
    <div v-if="isPC" class="homePage" :style="{ paddingTop: locale === 'zh' ? '104px' : '64px' }">
        <div class="one BG0">
            <div class="contbox">
                <div class="one-box">
                    <div class="one-left">
                        <h1 class="text1" style="font-size: 50px !important">
                            {{ $t('IndexPage.one_1') }}
                        </h1>
                        <p class="text1 InterR">
                            {{ $t('IndexPage.one_2') }}
                        </p>
                        <ul>
                            <li class="text1 InterR">
                                {{ $t('IndexPage.one_3') }}
                            </li>
                            <li class="text1 InterR">
                                {{ $t('IndexPage.one_4') }}
                            </li>
                            <li class="text1 InterR">
                                {{ locale === 'zh' ? $t('IndexPage.one_5') : $t('IndexPage.one_6') }}
                            </li>
                        </ul>
                        <div class="one-btns">
                            <div class="one-btns-top">
                                <div class="one-btn button button-m oncDownLoad BGpurple">
                                    <a :href="`/${$store.state.locale}/download?type=2`" @click="jumpUrl('downloadChrome', $event, 'web3', 1, 'download')">
                                        {{ $t('IndexPage.download') }}
                                    </a>
                                </div>
                                <div class="one-qrcode">
                                    <div class="qrcode-button line-black">
                                        <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_84af8f30-3aab-11ed-9eb9-234fa355d1ff.svg+xml" alt="QRcode" />
                                        <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_86ec38c0-3aab-11ed-9eb9-234fa355d1ff.svg+xml" alt="QRcode" />
                                    </div>
                                    <div class="one-erweima">
                                        <div class="BG4">
                                            <div class="one-erweima-box lineBG2">
                                                <img :src="qrcodeImage" alt="erweima" />
                                            </div>
                                            <div class="text1">{{ $t('IndexPage.downloadApp') }}</div>
                                            <a
                                                :href="`/${$store.state.locale}/download?type=2`"
                                                class="one-download-btn"
                                                @click="jumpUrl('downloadChrome', $event, 'web3', 2, 'other_download')"
                                            >
                                                {{ $t('IndexPage.downloadMore') }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="support-scene-box">
                                <a
                                    class="light_icon"
                                    :href="`/${$store.state.locale}/download?type=1`"
                                    @click="jumpUrl('downloadIOS', $event, 'web3', 3, 'ios')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_047c1380-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="ios" />
                                </a>
                                <a
                                    class="light_icon"
                                    :href="`/${$store.state.locale}/download?type=0`"
                                    @click="jumpUrl('downloadAndroid', $event, 'web3', 4, 'android')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_047c88b0-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="android" />
                                </a>
                                <a
                                    class="light_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 5, 'chrome')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_047c3a90-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                                </a>
                                <!-- <a
                                    class="light_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 6, 'firefox')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_047c61a1-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="firefox" />
                                </a> -->
                                <a
                                    class="light_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 7, 'edge')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_047c61a0-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                                </a>
                                <a
                                    class="dark_icon"
                                    :href="`/${$store.state.locale}/download?type=1`"
                                    @click="jumpUrl('downloadIOS', $event, 'web3', 3, 'ios')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_97426d80-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="ios" />
                                </a>
                                <a
                                    class="dark_icon"
                                    :href="`/${$store.state.locale}/download?type=0`"
                                    @click="jumpUrl('downloadAndroid', $event, 'web3', 4, 'android')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_97424671-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="android" />
                                </a>
                                <a
                                    class="dark_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 5, 'chrome')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_97424670-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                                </a>
                                <!-- <a
                                    class="dark_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 6, 'firefox')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_97424672-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="firefox" />
                                </a> -->
                                <a
                                    class="dark_icon"
                                    :href="`/${$store.state.locale}/download?type=2`"
                                    @click="jumpUrl('downloadChrome', $event, 'web3', 7, 'edge')"
                                >
                                    <img src="https://cdn.bitkeep.vip/u_b_9741f850-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="one-right">
                        <div class="home-preview-box">
                            <div class="home-preview-swiper-box">
                                <client-only>
                                    <div ref="swiperRef" v-swiper="swiperOption">
                                        <div class="swiper-wrapper">
                                            <div v-for="item in dataImage" :key="item.id" class="swiper-slide">
                                                <img class="swiper-is-loading" :src="item.imgUrl" />
                                            </div>
                                        </div>
                                    </div>
                                </client-only>
                            </div>
                            <div v-if="!swiperInitialized" class="swiper-loading-pop">
                                <div class="swiper-is-loading"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="one-animation text1">
                    <div class="animat-item">
                        <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num1" /></div>
                        <div class="animat-label">{{ $t('IndexPage.supportToken') }}</div>
                    </div>
                    <div class="animat-item">
                        <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num2" /></div>
                        <div class="animat-label">{{ $t('IndexPage.supportNFT') }}</div>
                    </div>
                    <div class="animat-item">
                        <div class="animat-title"><ICountUp :options="{ suffix: ' ' + $t('IndexPage.years') }" :endVal="num3" /></div>
                        <div class="animat-label">{{ $t('IndexPage.safeServiceUser') }}</div>
                    </div>
                    <div class="animat-item">
                        <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num4" /></div>
                        <div class="animat-label">{{ $t('IndexPage.five_3') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="two BG1 text1">
            <div class="contbox">
                <div class="two-box">
                    <h2 class="text1">
                        {{ $t('IndexPage.two_1') }}
                    </h2>
                    <p class="InterR">
                        {{ $t('IndexPage.two_2') }}
                    </p>
                    <p class="InterR">
                        {{ $t('IndexPage.two_3') }}
                    </p>
                    <div class="iconBox">
                        <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_00e51cd0-2442-11ed-8ab4-1529f6d53963.png" alt="" />
                        <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_74224d80-2442-11ed-8ab4-1529f6d53963.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="three text1 BG0" v-if="hostIsCom">
            <div class="contbox">
                <div class="three-box">
                    <div class="three-left">
                        <h2 class="text1">{{ $t('IndexPage.three_1') }}</h2>
                        <p class="InterR three_2 text1">
                            {{ $t('IndexPage.three_2') }}
                        </p>
                        <div class="three-btn button button-m oncDownLoad BGpurple">
                            <a :href="'/' + locale + '/swap'" @click="jumpUrl('swap', $event, 'DEX')">{{ $t('IndexPage.three_3') }}</a>
                        </div>
                    </div>
                    <div class="three-right">
                        <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_cac4c2d0-3aa9-11ed-9eb9-234fa355d1ff.png" :alt="$t('IndexPage.imgTitle_2')" />
                        <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_35c6f420-2517-11ed-af92-1dcaef65660e.png" :alt="$t('IndexPage.imgTitle_2')" />
                    </div>
                </div>
            </div>
        </div>
        <div class="four text1 BG1">
            <div class="contbox">
                <div class="four-box">
                    <div class="four-left">
                        <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_d00647f0-3aa9-11ed-9eb9-234fa355d1ff.png" :alt="$t('IndexPage.imgTitle_3')" />
                        <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_648e37b0-eb91-11ec-a8db-d3170cc4425f.png" :alt="$t('IndexPage.imgTitle_3')" />
                    </div>
                    <div class="four-right">
                        <h2 class="text1">{{ $t('IndexPage.four_1') }}</h2>
                        <p class="InterR">
                            {{ $t('IndexPage.four_2') }}
                        </p>
                        <div class="four-btn button button-m oncDownLoad BGpurple">
                            <a :href="'/' + locale + '/download?type=0'" @click="jumpUrl('downloadAndroid', $event, 'NFT')"> {{ $t('IndexPage.three_3') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="four2 BG0 text1">
            <div class="contbox">
                <div class="four2-box text1">
                    <div class="four2-right">
                        <h2 class="text1">{{ $t('IndexPage.four2_1') }}</h2>
                        <p class="InterR">
                            {{ $t('IndexPage.four2_2') }}
                        </p>
                        <p class="InterR">
                            {{ $t('IndexPage.four2_3') }}
                        </p>
                        <div class="four2-btn button BGpurple button-m oncDownLoad">
                            <a :href="'/' + locale + '/dapp'" @click="jumpUrl('dapp', $event, 'DAPP')">{{ $t('IndexPage.three_3') }}</a>
                        </div>
                    </div>
                    <div class="four2-left">
                        <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_04ef5380-1c78-11ed-adcb-97e65edb4409.png" :alt="$t('IndexPage.imgTitle_3')" />
                        <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_04ed7ec0-1c78-11ed-adcb-97e65edb4409.png" :alt="$t('IndexPage.imgTitle_3')" />
                    </div>
                </div>
            </div>
        </div>
        <div class="five">
            <div class="contbox">
                <div class="five-box">
                    <h2>{{ $t('IndexPage.five_1') }}</h2>
                    <p class="InterR">
                        {{ $t('IndexPage.five_2') }}
                    </p>
                    <ul class="five-list">
                        <li>
                            <p class="five-num GB">
                                <span>$</span>{{ $t('IndexPage.five_7') }}<span>{{ $t('IndexPage.five_8') }}</span>
                            </p>
                            <p class="InterR">{{ $t('IndexPage.five_4') }}</p>
                        </li>
                        <li>
                            <p class="five-num GB">168<span>+</span></p>
                            <p class="InterR">{{ $t('IndexPage.five_6') }}</p>
                        </li>
                    </ul>
                </div>
                <img class="five-user" src="https://cdn.bitkeep.vip/u_b_bd267270-9df3-11ec-aac8-bf8a172584ab.png" />
            </div>
        </div>
        <div class="seven BG0 text1">
            <div class="contbox">
                <div class="seven-box">
                    <div class="seven-left">
                        <h2 class="text1">
                            {{ $t('IndexPage.seven_1') }}
                        </h2>
                        <p class="InterR">
                            {{ $t('IndexPage.seven_2') }}
                        </p>
                        <div class="support-scene-box" :style="{ marginTop: '26px' }">
                            <a class="light_icon" :href="`/${$store.state.locale}/download?type=1`" @click="jumpUrl('downloadIOS', $event, 'DOWN', 3, 'ios')">
                                <img src="https://cdn.bitkeep.vip/u_b_047c1380-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="ios" />
                            </a>
                            <a
                                class="light_icon"
                                :href="`/${$store.state.locale}/download?type=0`"
                                @click="jumpUrl('downloadAndroid', $event, 'DOWN', 4, 'android')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_047c88b0-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="android" />
                            </a>
                            <a
                                class="light_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 5, 'chrome')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_047c3a90-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                            </a>
                            <!-- <a
                                class="light_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 6, 'firefox')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_047c61a1-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="firefox" />
                            </a> -->
                            <a
                                class="light_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 7, 'edge')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_047c61a0-358b-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                            </a>
                            <a class="dark_icon" :href="`/${$store.state.locale}/download?type=1`" @click="jumpUrl('downloadIOS', $event, 'DOWN', 3, 'ios')">
                                <img src="https://cdn.bitkeep.vip/u_b_97426d80-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="ios" />
                            </a>
                            <a
                                class="dark_icon"
                                :href="`/${$store.state.locale}/download?type=0`"
                                @click="jumpUrl('downloadAndroid', $event, 'DOWN', 4, 'android')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_97424671-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="android" />
                            </a>
                            <a
                                class="dark_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 5, 'chrome')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_97424670-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="chrome" />
                            </a>
                            <!-- <a
                                class="dark_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 6, 'firefox')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_97424672-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="firefox" />
                            </a> -->
                            <a
                                class="dark_icon"
                                :href="`/${$store.state.locale}/download?type=2`"
                                @click="jumpUrl('downloadChrome', $event, 'DOWN', 7, 'edge')"
                            >
                                <img src="https://cdn.bitkeep.vip/u_b_9741f850-358c-11ed-9c8f-b3595946bff6.svg+xml" alt="edge" />
                            </a>
                        </div>
                    </div>
                    <div class="seven-btns">
                        <div class="seven-btn oncDownLoad BGpurple">
                            <a :href="`/${$store.state.locale}/download?type=2`" @click="jumpUrl('downloadChrome', $event, 'DOWN', 1, 'download')">
                                {{ $t('IndexPage.seven_3') }}
                            </a>
                        </div>
                        <div class="seven-qrcode">
                            <div class="qrcode-button line-black">
                                <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_84af8f30-3aab-11ed-9eb9-234fa355d1ff.svg+xml" alt="QRcode" />
                                <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_86ec38c0-3aab-11ed-9eb9-234fa355d1ff.svg+xml" alt="QRcode" />
                            </div>
                            <div class="one-erweima">
                                <div class="BG4">
                                    <div class="one-erweima-box lineBG2">
                                        <img :src="qrcodeImage" alt="erweima" />
                                    </div>
                                    <div class="text1">{{ $t('IndexPage.downloadApp') }}</div>
                                    <a
                                        :href="`/${$store.state.locale}/download?type=2`"
                                        class="one-download-btn"
                                        @click="jumpUrl('downloadChrome', $event, 'DOWN', 2, 'other_download')"
                                    >
                                        {{ $t('IndexPage.downloadMore') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nine BG0 text1">
            <div class="contbox">
                <div class="nine-box">
                    <h2 class="text1">
                        {{ $t('IndexPage.Investor') }}
                    </h2>
                    <ul class="nine-list">
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_cc85bb30-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_6ce1c730-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_69349ba1-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_54bbd510-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_cc83bf60-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_840c4250-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_cc859420-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_95260170-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                    </ul>
                    <ul class="nine-list">
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_69344d80-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_b0ae3160-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_cc82fc10-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_c368f650-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_69347490-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_db1fd2f0-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_69349ba0-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_eada9e50-fb89-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                    </ul>
                    <ul class="nine-list">
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_51980530-f92b-11ec-b5ab-31538899cb70.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_27324fb0-fb8a-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_6937a8e0-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_0017ef70-fb8a-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                        <li>
                            <img class="light_icon" src="https://cdn.bitkeep.vip/u_b_13a9daa0-c6bd-11ec-84d3-09f9df2bf89a.png" alt="" />
                            <img class="dark_icon" src="https://cdn.bitkeep.vip/u_b_11fe4d60-fb8a-11ec-a1be-c556138ebe7b.png" alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="pop" id="pop" v-if="ChromePopShow">
            <div class="popcont indexPop">
                <span class="close-btn" id="closeBtn" @click="closeChrome"></span>
                <div class="popAdots"><img src="https://cdn.bitkeep.vip/u_b_7cbee220-a038-11ec-a3eb-f758fa002ae8.png" alt="" /></div>
                <div class="indexTitleBox">
                    <h1>
                        {{ $t('IndexPage.pop1') }}
                    </h1>
                    <h1>
                        {{ $t('IndexPage.pop2') }}
                    </h1>
                    <p>
                        {{ $t('IndexPage.pop3') }}
                    </p>
                    <a
                        href="https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak"
                        @click="downloadTA('frist_click', $event, 'https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak')"
                        target="_blank"
                    >
                        <div class="indexBtn1">
                            {{ $t('IndexPage.pop4') }}
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="pop" id="pop1" v-if="YoutubeShow">
            <div class="popcont1 indexPop1">
                <span class="close-btn1" id="closeBtn1" @click="YoutubeShow = false"
                    ><img src="https://cdn.bitkeep.vip/u_b_354593d0-c22a-11ec-a81a-8d7b9dd745b9.png" alt=""
                /></span>
                <div id="videoBox">
                    <iframe
                        width="100%"
                        height="456px"
                        src="https://www.youtube.com/embed/FskRmYjXqbY"
                        frameborder="0"
                        allowfullscreen
                        ng-show="showvideo"
                    ></iframe>
                </div>
            </div>
        </div> -->
    </div>
    <div v-else class="mobilehomePage" :style="{ paddingTop: 44 + ($store.state.headerDownloadTipsIsShow ? 50 : 0) + ($store.state.locale === 'zh' ? 30 : 0) + 'px' }">
        <div class="one BG0">
            <div class="one_banner">
                <div>
                    <div class="home-preview-box">
                        <div class="home-preview-swiper-box">
                            <client-only>
                                <div ref="swiperRef" v-swiper="swiperOption">
                                    <div class="swiper-wrapper">
                                        <div v-for="item in dataImage" :key="item.id" class="swiper-slide">
                                            <img class="swiper-is-loading" :src="item.imgUrl" />
                                        </div>
                                    </div>
                                </div>
                            </client-only>
                        </div>
                        <div v-if="!swiperInitialized" class="swiper-loading-pop">
                            <div class="swiper-is-loading"></div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="text1" style="font-size: 34px !important">{{ $t('IndexPage.one_1') }}</h1>
            <p class="text1 InterR">{{ $t('IndexPage.one_2') }}</p>
            <ul>
                <li class="text1 InterR">{{ $t('IndexPage.one_3') }}</li>
                <li class="text1 InterR">{{ $t('IndexPage.one_4') }}</li>
                <li class="text1 InterR">{{ locale === 'zh' ? $t('IndexPage.one_5') : $t('IndexPage.one_6') }}</li>
            </ul>
            <div class="one-animation text1">
                <div class="animat-item">
                    <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num1" /></div>
                    <div class="animat-label">{{ $t('IndexPage.supportToken') }}</div>
                </div>
                <div class="animat-item">
                    <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num2" /></div>
                    <div class="animat-label">{{ $t('IndexPage.supportNFT') }}</div>
                </div>
                <div class="animat-item">
                    <div class="animat-title"><ICountUp :options="{ suffix: ' ' + $t('IndexPage.years') }" :endVal="num3" /></div>
                    <div class="animat-label">{{ $t('IndexPage.safeServiceUser') }}</div>
                </div>
                <div class="animat-item">
                    <div class="animat-title"><ICountUp :options="{ suffix: '+' }" :endVal="num4" /></div>
                    <div class="animat-label">{{ $t('IndexPage.five_3') }}</div>
                </div>
            </div>
            <div>
                <h5-download-group ref="pronbit" :af-url="AFUrl" :android-url="AndroidUrl" :app-store="iosUrl" source="index" location="web3" />
            </div>
        </div>
        <div class="two BG1">
            <div class="iconBox">
                <img src="https://cdn.bitkeep.vip/u_b_c2042bb0-2445-11ed-8d6c-2fb64574bc22.png" alt="" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_c2027e00-2445-11ed-8d6c-2fb64574bc22.png" alt="" class="dark_icon" />
            </div>
            <h2 class="text1">{{ $t('IndexPage.two_1') }}</h2>
            <p class="text1 InterR">{{ $t('IndexPage.two_2') }}{{ $t('IndexPage.two_3') }}</p>
            <!-- <div class="dots">
                <img src="https://cdn.bitkeep.vip/u_b_b22e0de0-9eb3-11ec-a3eb-f758fa002ae8.png" alt="dots" />
            </div> -->
        </div>
        <div class="three BG0" v-if="hostIsCom">
            <div class="defi">
                <img src="https://cdn.bitkeep.vip/u_b_cac4c2d0-3aa9-11ed-9eb9-234fa355d1ff.png" alt="NFT Market" class="light_icon" />
                <img src="https://cdn.bitkeep.vip/u_b_94074c10-0e42-11ed-95b2-5dd3d55a17bc.png" alt="NFT Market" class="dark_icon" />
            </div>
            <!-- <div class="dots"><img src="https://cdn.bitkeep.vip/u_b_0c5f3230-9eb4-11ec-a3eb-f758fa002ae8.png" alt="dots" /></div> -->
            <h2 bklang="three_1" class="text1">{{ $t('IndexPage.three_1') }}</h2>
            <p bklang="three_2" class="text1 InterR">{{ $t('IndexPage.three_2') }}</p>
            <div class="three-btn button button-m oncDownLoad BGpurple">
                <a :href="'/' + locale + '/swap'" @click="jumpUrl('swap', $event, 'DEX')">{{ $t('IndexPage.three_3') }}</a>
            </div>
        </div>
        <div class="three2 BG1">
            <div class="defi light_icon" style="margin: 4px -10px 16px -10px">
                <img src="https://cdn.bitkeep.vip/u_b_d00647f0-3aa9-11ed-9eb9-234fa355d1ff.png" alt="defi" />
            </div>
            <div class="defi dark_icon" style="margin: -20px -20px -66px -20px">
                <img src="https://cdn.bitkeep.vip/u_b_5a266710-0e42-11ed-95b2-5dd3d55a17bc.png" alt="defi" />
            </div>
            <!-- <div class="dots"><img src="https://cdn.bitkeep.vip/u_b_0c5f3230-9eb4-11ec-a3eb-f758fa002ae8.png" alt="dots" /></div> -->
            <h2 bklang="three2_1" class="text1">{{ $t('IndexPage.four_1') }}</h2>
            <p bklang="three2_2" class="text1 InterR">{{ $t('IndexPage.four_2') }}</p>
            <div class="three-btn button button-m oncDownLoad BGpurple">
                <a :href="'/' + locale + '/download?type=0'" @click="jumpUrl('downloadAndroid', $event, 'NFT')">{{ $t('IndexPage.three_3') }}</a>
            </div>
        </div>
        <div class="four BG0">
            <!-- <div class="dots1"><img src="https://cdn.bitkeep.vip/u_b_2b9e4fa0-9eb4-11ec-a3eb-f758fa002ae8.png" alt="dots" /></div> -->
            <div class="banner">
                <img
                    src="https://cdn.bitkeep.vip/u_b_9778c100-1c78-11ed-adcb-97e65edb4409.png"
                    alt="Bitkeep DApp store on laptop and mobile"
                    class="light_icon"
                />
                <img
                    src="https://cdn.bitkeep.vip/u_b_9779d270-1c78-11ed-adcb-97e65edb4409.png"
                    alt="Bitkeep DApp store on laptop and mobile"
                    class="dark_icon"
                />
            </div>
            <!-- <div class="dots"><img src="https://cdn.bitkeep.vip/u_b_42cac690-9eb4-11ec-a3eb-f758fa002ae8.png" alt="dots" /></div> -->
            <h2 bklang="four_1" class="text1">{{ $t('IndexPage.four2_1') }}</h2>
            <p bklang="four_2" class="text1 InterR">{{ $t('IndexPage.four2_2') }}</p>
            <p bklang="four_3" class="text1 InterR">{{ $t('IndexPage.four2_3') }}</p>
            <div class="three-btn button BGpurple button-m oncDownLoad">
                <a :href="'/' + locale + '/dapp'" @click="jumpUrl('dapp', $event, 'DAPP')">{{ $t('IndexPage.three_3') }}</a>
            </div>
        </div>
        <div class="five">
            <h2 bklang="five_1">{{ $t('IndexPage.five_1') }}</h2>
            <p bklang="five_2" class="InterR">{{ $t('IndexPage.five_2') }}</p>
            <ul>
                <li>
                    <p class="num GB" bklang="five_5">
                        <span>$</span>{{ $t('IndexPage.five_7') }}<span>{{ $t('IndexPage.five_8') }}</span>
                    </p>
                    <p bklang="five_4" class="InterR">{{ $t('IndexPage.five_4') }}</p>
                </li>
                <li>
                    <p class="num GB">168<span>+</span></p>
                    <p bklang="five_6" class="InterR">{{ $t('IndexPage.five_6') }}</p>
                </li>
            </ul>
            <div class="people"><img src="https://cdn.bitkeep.vip/u_b_a0de0710-9eb4-11ec-a3eb-f758fa002ae8.png" alt="people" /></div>
        </div>
        <div class="BG0" style="padding-top: 40px; padding-bottom: 10px">
            <h5-download-group ref="pronbit" :af-url="AFUrl" :android-url="AndroidUrl" :app-store="iosUrl" source="index" location="down" />
        </div>
        <div class="nine BG0">
            <div class="contbox">
                <div class="nine-box">
                    <h2 bklang="Investor" class="text1">{{ $t('IndexPage.Investor') }}</h2>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_cc85bb30-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" /></li>
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_69349ba1-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                    </ul>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_cc83bf60-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" /></li>
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_cc859420-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" /></li>
                    </ul>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_69344d80-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_cc82fc10-c612-11ec-8b1d-6d2d92fa3e80.png" alt="" /></li>
                    </ul>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_69347490-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_69349ba0-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                    </ul>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_6937a8e0-c6ad-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_13a9daa0-c6bd-11ec-84d3-09f9df2bf89a.png" alt="" /></li>
                    </ul>
                    <ul class="nine-list">
                        <li class="lineBG3"><img src="https://cdn.bitkeep.vip/u_b_51980530-f92b-11ec-b5ab-31538899cb70.png" alt="" /></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="download" id="IosBtnzh" v-if="Phonesystem == 'IOS' && locale == 'zh'">
            <div class="version">
                BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
            </div>
            <div class="left">
                <a class="iosUrl" :href="iosUrl" @click="downloadTA('indexIOS_appStore', $event, iosUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_333fb640-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                </a>
            </div>
            <div class="right">
                <a
                    href="https://testflight.apple.com/join/gMNlVK4J"
                    @click="downloadTA('indexIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                    ><img src="https://cdn.bitkeep.vip/u_b_33413ce0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2"
                /></a>
            </div>
        </div>
        <div class="download" id="AndroidBtnzh" v-if="Phonesystem == 'Android' && locale == 'zh'">
            <div class="version">
                BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
            </div>
            <div class="left">
                <a class="AndriodUrl" :href="AFUrl" @click="downloadTA('indexAndriod_GooglePlay', $event, AFUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_33400460-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn3" />
                </a>
            </div>
            <div class="right">
                <a class="btnDwonload j_androidMarkBtn j_btnDwonload" @click="androidDown($event)"
                    ><img src="https://cdn.bitkeep.vip/u_b_333f6820-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn4"
                /></a>
            </div>
        </div>
        <div class="download" id="IosBtnen" v-if="Phonesystem == 'IOS' && locale != 'zh'">
            <div class="version">
                BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
            </div>
            <div class="left">
                <a class="iosUrl" :href="iosUrl" v-if="locale == 'zh'" @click="downloadTA('indexIOS_appStore', $event, iosUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_84764a50-0382-11ed-8571-e19c1147d96c.png" alt="btn1" />
                </a>
                <a class="iosUrl" :href="iosUrl" v-else @click="downloadTA('indexIOS_appStore', $event, iosUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_333f4110-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                </a>
            </div>
            <div class="right">
                <a
                    href="https://testflight.apple.com/join/gMNlVK4J"
                    @click="downloadTA('indexIOS_testflight', $event, 'https://testflight.apple.com/join/gMNlVK4J')"
                >
                    <img src="https://cdn.bitkeep.vip/u_b_d88fa820-040e-11ed-83aa-a9e3ebe6fa34.png" alt="btn2" v-if="locale == 'zh'" />
                    <img src="https://cdn.bitkeep.vip/u_b_33418b00-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" v-else />
                </a>
            </div>
        </div>
        <div class="download" id="AndroidBtnen" v-if="Phonesystem == 'Android' && locale != 'zh'">
            <div class="version">
                BitKeep V <span class="j_v">{{ AndroidVersion }}</span>
            </div>
            <div class="left">
                <a class="AndriodUrl" v-if="locale == 'zh'" :href="AFUrl" @click="downloadTA('indexAndriod_GooglePlay', $event, AFUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_72405050-0383-11ed-8571-e19c1147d96c.png" alt="btn1" />
                </a>
                <a class="AndriodUrl" target="_blank" v-else :href="AFUrl" @click="downloadTA('indexAndriod_GooglePlay', $event, AFUrl)">
                    <img src="https://cdn.bitkeep.vip/u_b_33740cb0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn1" />
                </a>
            </div>
            <div class="right">
                <a class="btnDwonload j_androidMarkBtn j_btnDwonload" v-if="locale == 'zh'" @click="androidDown($event)">
                    <img src="https://cdn.bitkeep.vip/u_b_bb4a9c10-0676-11ed-a3f8-6566c4827ad5.png" alt="btn2" />
                </a>
                <a class="btnDwonload j_androidMarkBtn j_btnDwonload" v-else @click="androidDown($event)">
                    <img src="https://cdn.bitkeep.vip/u_b_337433c0-d0ba-11eb-a1fd-1b9796c35a14.png" alt="btn2" />
                </a>
            </div>
        </div> -->
        <div class="Mark" id="Mark" v-if="MarkShow" @click="MarkShow = false">
            <img class="weixin1" id="Weixin1" src="https://cdn.bitkeep.vip/u_b_8fee9770-1d54-11ed-9958-534ede582d09.png" alt="" v-if="locale == 'zh'" />
            <img class="weixin2" id="Weixin2" src="https://cdn.bitkeep.vip/u_b_90186690-1d54-11ed-9958-534ede582d09.png" alt="" v-else />
        </div>
        <div class="androidMark" id="androidMark" v-if="AndroidMark" @click="AndroidMark = false">
            <div class="androidMarkBox">
                <h3 bklang="androidMark1">{{ $t('IndexPage.Kindtips') }}</h3>
                <p bklang="androidMark2">{{ $t('IndexPage.KindtipsContent') }}</p>
                <a bklang="androidMark3" id="androidHrefBtn">{{ $t('IndexPage.confirm') }}</a>
            </div>
        </div>
        <div class="videoMark" id="videoMark" v-if="YoutubeShow" @click="YoutubeShow = false">
            <div class="videoBox" id="videoBox">
                <iframe
                    width="100%"
                    height="260px"
                    src="https://www.youtube.com/embed/FskRmYjXqbY"
                    frameborder="0"
                    allowfullscreen
                    ng-show="showvideo"
                ></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import { getQrcodeImage } from '@/utils/qrcode';
import { setCookie, getCookie, toUrl } from '@/tools/common';
import h5DownloadGroup from '@/components/downloadButtons/h5DownloadGroup';

import 'swiper/css/swiper.css';
import Add from '../royalties/cert/add.vue';

export default {
    name: 'HomePage',
    layout: 'IndexPage/default',
    scrollToTop: true,
    components: {
        ICountUp,
        h5DownloadGroup,
        Add,
    },
    head() {
        const { language } = this.$route.params;
        const { hostChange } = this.$store.state;
        return {
            title: this.$t('IndexPage.Title'),
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.$t('IndexPage.Keyword') },
                { hid: 'description', name: 'description', content: this.$t('IndexPage.Description') },
            ],
            link: [
                { rel: 'canonical', href: `https://bitkeep${hostChange}/${language}/index` },
                { rel: 'alternate', hreflang: 'zh', href: `https://bitkeep${hostChange}/zh/index` },
                { rel: 'alternate', hreflang: 'en', href: `https://bitkeep${hostChange}/en/index` },
                { rel: 'alternate', hreflang: 'ko', href: `https://bitkeep${hostChange}/ko/index` },
                { rel: 'alternate', hreflang: 'vi', href: `https://bitkeep${hostChange}/vi/index` },
                { rel: 'alternate', hreflang: 'tr', href: `https://bitkeep${hostChange}/tr/index` },
                { rel: 'alternate', hreflang: 'id', href: `https://bitkeep${hostChange}/id/index` },
                { rel: 'alternate', hreflang: 'x-default', href: `https://bitkeep${hostChange}/en/index` },
            ],
        };
    },
    async asyncData(app) {
        const { isPC, locale, hostIsCom, hostChange, isMobile } = app.store.state;
        app.store.commit('addlanguage', true);
        return {
            isPC: isMobile ? !isMobile : isPC,
            locale: locale,
            hostIsCom: hostIsCom,
            hostChange: hostChange,
        };
    },
    computed: {
        todos() {
            return this.$store.state.todos.list;
        },
        qrcodeImage() {
            return getQrcodeImage(this.locale);
        },
    },
    data() {
        return {
            checkYoutube: false,
            YoutubeShow: false,
            ChromePopShow: false,
            AndroidMark: false,
            MarkShow: false,
            Phonesystem: '',
            AndroidUrl: '',
            AndroidVersion: null,
            AFUrl: 'https://play.google.com/store/apps/details?id=com.bitkeep.wallet',
            iosUrl: 'https://itunes.apple.com/app/bitkeep/id1395301115',
            isok: false,
            num1: 223500,
            num2: 100000,
            num3: 5,
            num4: 6000000,
            dataImage: [],
            swiperInitialized: false,
            swiperOption: {
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                speed: 800,
                slidesPerView: 3,
                centeredSlides: true,
                loop: true,
                loopedSlides: 15,
                observer: true,
            },
        };
    },
    beforeMount() {
        this.$Ta.track({
            name: 'Bitkeep__Page',
            data: {
                Page_Enter: '1',
            },
        });
    },
    mounted() {
        this.initDataImage(this.$store.state.theme);
        this.$nextTick(() => {
            this.$refs.swiperRef.swiper.once('onSetTranslate', () => {
                setTimeout(() => {
                    this.swiperInitialized = true;
                }, 500);
            });
        });
        this.isPC = this.$store.state.isPC;
        //深度链接跳转
        const { deep_link_value } = this.$route.query;
        if (deep_link_value && unescape(deep_link_value).indexOf('bitkeep://') != -1) {
            window.location.href = unescape(deep_link_value);
        }
        //第一次插件提示弹窗
        var explorer = window.navigator.userAgent;
        if (explorer.indexOf('Chrome') >= 0) {
            if (!getCookie('bkchromeurl') && !window.isBitKeep) {
                this.ChromePopShow = true;
            }
        }
        this.youtubeload();
        this.HandleSys();
        this.getAndroidUrl();
        //导航透明问题处理
        let w_y = window.scrollTop;
        if (w_y > 100) {
            this.isok = false;
            this.Animate(true);
        }
        window.addEventListener('scroll', this.handleScroll, true);
        window.addEventListener('resize', this.domResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.domResize);
    },
    methods: {
        downloadTA(name, event, href) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            this.$Ta.track({
                name: 'Download_Click',
                data: {
                    download_type: name,
                },
            });
            window.open(href, '_blank');
        },
        closeChrome() {
            this.ChromePopShow = false;
            setCookie('bkchromeurl', true, 1);
        },
        youtubeload() {
            // 判断用户是否可以看视频
            var image = new Image();
            image.src = 'https://youtube.com/favicon.ico';
            image.onload = () => {
                this.checkYoutube = true;
            };

            image.onerror = () => {
                this.checkYoutube = false;
            };
        },
        HandleSys() {
            let isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod'),
                isAndroid = navigator.userAgent.match('Android');
            if (isiOS) {
                this.Phonesystem = 'IOS';
            } else if (isAndroid) {
                this.Phonesystem = 'Android';
            }
        },
        isWeiXin() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true; // 是微信端
            } else {
                return false;
            }
        },
        WeixinDwonLoad() {
            Mark.on('click', function () {
                $(this).removeClass('show');
                Weixin.removeClass('show');
            });
        },
        androidDown(event) {
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                window.event.returnValue = false; //兼容IE8
            }
            if (this.isWeiXin()) {
                this.MarkShow = true;
            } else {
                this.AndroidMark = true;
                this.downloadTA('indexAndriod_APK', event, this.AndroidUrl);
            }
        },
        getUrlPramse(version) {
            if (!version) return;
            let versionOne = JSON.parse(JSON.stringify(version)).replace(/[^0-9]/gi, '');
            let url = {
                huawei: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_huawei.apk`,
                one: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_k-one-store.apk`,
                xphoenixswap: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_xphoenixswap.apk`,
                '520club': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_520club.apk`,
                koc1: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc1.apk`,
                koc2: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc2.apk`,
                koc3: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc3.apk`,
                koc4: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc4.apk`,
                koc5: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc5.apk`,
                koc6: `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_koc6.apk`,
                'vivo-store': `https://cdn.bitkeep.vip/apk/${versionOne}/BitKeep${versionOne}_vivo-store.apk`,
            };
            const { channel } = this.$route.query;
            switch (channel) {
                case 'huawei':
                    this.AndroidUrl = url.huawei;
                    break;
                case 'one':
                    this.AndroidUrl = url.one;
                    break;
                case 'xphoenixswap':
                    this.AndroidUrl = url.xphoenixswap;
                    break;
                case '520club':
                    this.AndroidUrl = url['520club'];
                    break;
                case 'koc1':
                    this.AndroidUrl = url['koc1'];
                    break;
                case 'koc2':
                    this.AndroidUrl = url['koc2'];
                    break;
                case 'koc3':
                    this.AndroidUrl = url['koc3'];
                    break;
                case 'koc4':
                    this.AndroidUrl = url['koc4'];
                    break;
                case 'koc5':
                    this.AndroidUrl = url['koc5'];
                    break;
                case 'koc6':
                    this.AndroidUrl = url['koc6'];
                    break;
                case 'vivo-store':
                    this.AndroidUrl = url['vivo-store'];
                    break;
            }
        },
        async getAndroidUrl() {
            const { data, status } = await this.$api.index.androidVersion({});
            if (status == 0) {
                this.AndroidUrl = data.url;
                this.AndroidVersion = data.version;
                this.getUrlPramse(data.version); //H5下载链接
            }
            this.getAirdrop();
        },
        async getAirdrop() {
            let headers = {
                language: this.locale,
                brand: 'web',
                os: 'ios',
                package: 'bitKeep',
                clientversion: '',
                token: '',
                im: '23423434324234324234',
                currency: 'usd',
                mylanguage: this.locale,
                seqnum: '',
                sig: '',
            };
            const { activity } = this.$route.query;
            if (activity) {
                const { data, status } = await this.$api.index.airdropDetail({ activityId: activity }, headers);
                if (status == 0) {
                    this.AFUrl = data.af_url == '' ? 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m' : data.af_url;
                } else {
                    this.AFUrl = 'https://bitkeep.onelink.me/Nl2e/mkmvpn0m';
                }
            }
        },
        jumpUrl(name, event, TANAME, subId, subName) {
            let Location_Id;
            switch (TANAME) {
                case 'web3':
                    Location_Id = 1;
                    break;
                case 'DEX':
                    Location_Id = 2;
                    break;
                case 'NFT':
                    Location_Id = 3;
                    break;
                case 'DAPP':
                    Location_Id = 4;
                    break;
                case 'DOWN':
                    Location_Id = 4;
                    break;
                default:
                    Location_Id = 1;
                    break;
            }
            this.$Ta.track({
                name: 'Bitkeep__Page',
                data: {
                    Action_Location_Type: 'column',
                    Action_Location_Id: Location_Id,
                    Action_Location_Name: TANAME,
                    Action_Sub_Id: subId,
                    Action_Sub_Name: subName,
                },
            });
            toUrl(name, event, this);
        },
        Animate(i) {
            $('.headerbox').addClass(i ? 'hr' : 'ht');
            $('.headerbox').removeClass(i ? 'ht' : 'hr');
        },
        handleScroll() {
            const top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset);
            if (top > 100 && this.isok) {
                this.isok = false;
                this.Animate(true);
            }
            if (top < 100 && !this.isok) {
                this.isok = true;
                this.Animate(false);
            }
        },
        toThousand(num = 0) {
            if (typeof num === 'undefined') {
                return 0;
            }
            return (num || 0).toString().replace(/\d+/, function (n) {
                var len = n.length;
                if (len % 3 === 0) {
                    return n.replace(/(\d{3})/g, ',$1').slice(1);
                } else {
                    return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1');
                }
            });
        },
        domResize() {
            if (this.innerWidth === window.innerWidth) return;

            this.timer && clearTimeout(this.timer);
            this.innerWidth = window.innerWidth;
            this.swiperInitialized = false;
            this.timer = setTimeout(() => {
                this.swiperInitialized = true;
                this.timer = null;
            }, 1000);
        },
        initDataImage(theme) {
            const _theme = theme || 'light';

            this.swiperInitialized = false;

            if (_theme === 'light') {
                this.dataImage = [
                    {
                        id: 'banner-img-light-1',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_bdeb6c80-3aa9-11ed-9eb9-234fa355d1ff.png',
                    },
                    {
                        id: 'banner-img-light-2',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_2ea9bab0-3d40-11ed-b97d-970ef208dfde.png',
                    },
                    {
                        id: 'banner-img-light-3',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_a446e7b0-3d7d-11ed-b44c-05e37e2aee29.png',
                    },

                    {
                        id: 'banner-img-light-4',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_c7b1dd80-3aa9-11ed-9eb9-234fa355d1ff.png',
                    },
                    {
                        id: 'banner-img-light-5',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_c4161920-3aa9-11ed-9eb9-234fa355d1ff.png',
                    },
                ];
            } else {
                this.dataImage = [
                    {
                        id: 'banner-img-dark-1',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_b876d400-3aaa-11ed-9eb9-234fa355d1ff.png',
                    },
                    {
                        id: 'banner-img-dark-2',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_35914eb0-3d40-11ed-b97d-970ef208dfde.png',
                    },
                    {
                        id: 'banner-img-dark-3',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_a4482030-3d7d-11ed-b44c-05e37e2aee29.png',
                    },

                    {
                        id: 'banner-img-dark-4',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_b3c3d340-3aaa-11ed-9eb9-234fa355d1ff.png',
                    },
                    {
                        id: 'banner-img-dark-5',
                        imgUrl: 'https://cdn.bitkeep.vip/u_b_bb274e00-3aaa-11ed-9eb9-234fa355d1ff.png',
                    },
                ];
            }

            setTimeout(() => (this.swiperInitialized = true), 1000);
        },
    },
    watch: {
        '$store.state.isPC': function (newVal, oldVal) {
            this.isPC = newVal;
        },
        '$store.state.theme': function (val) {
            this.initDataImage(val);
        },
    },
    destroyed() {
        //离开这个界面之后，删除滚动事件，不然容易除bug
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>
<style scoped lang="less">
@import url('./index.less');
</style>
