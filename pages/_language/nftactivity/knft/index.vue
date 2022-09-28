<template>
  <div class="knft-container"> 
    <div class="knft-banner">
      <div class="knft-banner-flex" flex="cross:center main:center">
        <div class="knft-banner-box">
          <img class="pc banner-pc" src="https://cdn.bitkeep.vip/u_b_04386690-237e-11ed-ade4-19cc431cdcc8.png" alt="" />
          <img class="mobile banner-mobile" src="https://cdn.bitkeep.vip/u_b_04386690-237e-11ed-ade4-19cc431cdcc8.png" alt="" />
          <div class="knft-banner-text text-pc pc"> 
              {{$t('knft.banner.text1')}}
              {{$t('knft.banner.text2')}}
          </div> 
          <div class="knft-banner-text text-mobile mobile">
            <div>
              {{$t('knft.banner.text1')}}
            </div>
            <div>
              {{$t('knft.banner.text2')}}
            </div> 
          </div>
        </div>
        <div class="knft-banner-footer pc">
          <div class="roll-box" flex="cross:center">
            <div class="roll-item" v-for="item in 10" :key="item" flex>
              <div flex="cross:center">BitKeep Korean NFT Week</div>
              <div class="fg" flex="cross:center">
                <img
                  class="roll-fg"
                  src="@/assets/img/activity/knft/icon-earth.svg"
                  alt=""
                />
              </div>
            </div>
          </div> 
        </div>
        <div class="knft-banner-footer mobile"> 
          <div class="roll-box" flex="cross:center">
            <div class="roll-item" v-for="item in 10" :key="item" flex>
              <div flex="cross:center">BitKeep Korean NFT Week</div>
              <div class="fg">
                <img
                  class="roll-fg"
                  src="@/assets/img/activity/knft/icon-earth.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="knft-body">
      <div id="panel1" class="knft-panel panel1 pc" flex>
        <div class="panel-left">
          <!-- <img src="https://cdn.bitkeep.vip/u_b_83e066e0-1d34-11ed-a41b-4786938abce6.png" alt="" /> -->
          <img src="https://cdn.bitkeep.vip/u_b_1c043950-2835-11ed-a903-bfcaa074fcc9.png" alt="" />
        </div>
        <div class="panel-right" flex="cross:center">
          <article class="panel-text-box">
            <div class="title">
              <div>{{$t('knft.panel1.title1')}}</div>
              <div class="title-color">{{$t('knft.panel1.title2')}}</div>
              <div>{{$t('knft.panel1.title3')}}</div>
              <div>{{$t('knft.panel1.title4')}}</div>
            </div>
            <p class="text">
              {{$t('knft.panel1.text')}}
            </p>
          </article>
        </div>
      </div>
      <div  class="knft-panel panel1 mobile">
        <div class="panel-left">
          <!-- <img src="https://cdn.bitkeep.vip/u_b_83e066e0-1d34-11ed-a41b-4786938abce6.png" alt="" /> -->
          <img src="https://cdn.bitkeep.vip/u_b_1c043950-2835-11ed-a903-bfcaa074fcc9.png" alt="" />
        </div>
        <div class="panel-right" >
          <article class="panel-text-box">
            <div class="title">
              <div>{{$t('knft.panel1.title1')}}</div>
              <div class="title-color">{{$t('knft.panel1.title2')}}</div>
              <div>{{$t('knft.panel1.title3')}}</div>
              <div>{{$t('knft.panel1.title4')}}</div>
            </div>
            <p class="text">
              {{$t('knft.panel1.text')}}
            </p>
          </article>
        </div>
      </div>
      <div class="roll-content">
        <div class="roll-box" flex="cross:center">
          
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e000-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KLAY DICE</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b4ce90-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KlayCity District</span>
            </div>
          </div> 
          <!-- <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="@/assets/img/activity/knft/icon-9.jpg"
                  alt=""
                />
              </div>
              <span>Sunmiya Club Official</span>
            </div>
          </div> -->
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e001-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>SuperWalk</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0be9290-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>DAVA</span>
            </div>
          </div> 
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b67c40-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>Altava</span>
            </div>
          </div>
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e000-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KLAY DICE</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b4ce90-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KlayCity District</span>
            </div>
          </div> 
          <!-- <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="@/assets/img/activity/knft/icon-9.jpg"
                  alt=""
                />
              </div>
              <span>Sunmiya Club Official</span>
            </div>
          </div> -->
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e001-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>SuperWalk</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0be9290-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>DAVA</span>
            </div>
          </div> 
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b67c40-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>Altava</span>
            </div>
          </div>
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e000-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KLAY DICE</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b4ce90-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KlayCity District</span>
            </div>
          </div> 
          <!-- <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="@/assets/img/activity/knft/icon-9.jpg"
                  alt=""
                />
              </div>
              <span>Sunmiya Club Official</span>
            </div>
          </div> -->
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e001-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>SuperWalk</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0be9290-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>DAVA</span>
            </div>
          </div> 
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b67c40-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>Altava</span>
            </div>
          </div>
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e000-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KLAY DICE</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b4ce90-2846-11ed-b2cd-b52fcb4557f4.jpeg"
                  alt=""
                />
              </div>
              <span>KlayCity District</span>
            </div>
          </div> 
          <!-- <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="@/assets/img/activity/knft/icon-9.jpg"
                  alt=""
                />
              </div>
              <span>Sunmiya Club Official</span>
            </div>
          </div> -->
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b5e001-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>SuperWalk</span>
            </div>
          </div>    
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0be9290-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>DAVA</span>
            </div>
          </div> 
          <div class="roll-item-bg">
            <div class="roll-item" flex="cross:center">
              <div class="roll-logo-box">
                <img
                  class="roll-logo"
                  src="https://cdn.bitkeep.vip/u_b_c0b67c40-2846-11ed-b2cd-b52fcb4557f4.png"
                  alt=""
                />
              </div>
              <span>Altava</span>
            </div>
          </div>
          
        </div> 
      </div>
      <div id="panel2" class="knft-panel panel2 pc">
        <div class="phase-list" flex>
          <div class="phase-list-left">
            <div class="phase-bg phase-1" @click="handleClickPhasePC">
              <div class="phase-box" >
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_dae37e70-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box1.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box1.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box1.text')}}
                  </div>
                </div>
              </div> 
            </div>
            <div class="phase-bg phase-3" @click="handleClickPhasePC">
              <div class="phase-box ">
                <div class="phase-logo" flex="main:center">
                  <img src="https://cdn.bitkeep.vip/u_b_dadffc00-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box3.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box3.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box3.text')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="phase-list-right">
            <div class="phase-bg phase-2" @click="handleClickPhasePC">
              <div class="phase-box phase-2">
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_dae68bb0-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box2.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box2.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box2.text')}}
                  </div>
                </div>
              </div>
            </div>
            <div class="phase-bg phase-4" @click="handleClickPhasePC">
              <div class="phase-box phase-4">
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_daebe2e0-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box4.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box4.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box4.text')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="knft-panel panel2 mobile">
         <div class="phase-list"> 
            <div class="phase-bg phase-1" @click="handleClickPhaseMobile">
              <div class="phase-box" >
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_dae37e70-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box1.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box1.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box1.text')}}
                  </div>
                </div>
              </div> 
            </div>
            <div class="phase-bg phase-2"  @click="handleClickPhaseMobile">
              <div class="phase-box phase-2">
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_dae68bb0-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box2.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box2.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box2.text')}}
                  </div>
                </div>
              </div>
            </div>
            <div class="phase-bg phase-3"  @click="handleClickPhaseMobile">
              <div class="phase-box ">
                <div class="phase-logo" flex="main:center">
                  <img src="https://cdn.bitkeep.vip/u_b_dadffc00-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box3.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box3.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box3.text')}}
                  </div>
                </div>
              </div>
            </div> 
            <div class="phase-bg phase-4"  @click="handleClickPhaseMobile">
              <div class="phase-box phase-4">
                <div class="phase-logo">
                  <img src="https://cdn.bitkeep.vip/u_b_daebe2e0-2845-11ed-b2cd-b52fcb4557f4.png" alt="" />
                </div>
                <div class="phase-content">
                  <div class="title1">{{$t('knft.panel2.box4.title1')}}</div>
                  <div class="title2">{{$t('knft.panel2.box4.title2')}}</div>
                  <div class="text">
                    {{$t('knft.panel2.box4.text')}}
                  </div>
                </div>
              </div>
            </div> 
        </div>

      </div>
      <div id="panel3" class="knft-panel" :class="isMobile ? 'mobile': 'pc'">
        <swiper-video/>
      </div> 
    </div>
  </div>
</template>

<script> 
const SwiperVideo = ()=>import('@/components/knft/swiper-video.vue');
 
// import "@/plugins/vue-awesome-swiper.js";
// import "swiper/css/swiper.css";
export default {
  layout: "activity/default",
  name: "KNFTPage",
  scrollToTop: true,
  components: {
    "swiper-video": SwiperVideo
  },
  head() {  
      const { language } = this.$route.params;
      // const language = this.$route.query.lang
      // console.log('pathLang', pathLang)
      if (language == 'ko') {
        return{
            title: "비트킵 K-NFT 위크",
            meta: [
                {hid: 'keywords', name: 'keywords', content: "K-NFT" },
                {hid: 'description', name: 'description', content: "한국의 여러 NFT 프로젝트가 참여하여 열리는 이벤트입니다.비트킵을 다운로드하여 비트킵 K-NFT 위크에 참여하고 USDT 보상을 받으세요." },
                {hid:'og:title',name: 'og:title', content:"비트킵 K-NFT 위크"},
                {hid:'og:description', name: 'og:description', content:"한국의 여러 NFT 프로젝트가 참여하여 열리는 이벤트입니다.비트킵을 다운로드하여 비트킵 K-NFT 위크에 참여하고 USDT 보상을 받으세요." },
                {hid:'og:url', name: 'og:url', content:"https://bitkeep.com/ko/nftactivity/knft" },
                {hid:'og:type', name: 'og:type', content:"website"},
                {hid:'og:image', name: 'og:image', content:"https://cdn.bitkeep.vip/u_b_b233e3f0-237e-11ed-a71c-19b6a0304ce1.png"},
                {hid:'og:image_src', name: 'og:image_src', content:"https://cdn.bitkeep.vip/u_b_b233e3f0-237e-11ed-a71c-19b6a0304ce1.png"},
                {hid:'og:image_alt', name: 'og:type', content:"K-NFT"},
                {hid:'twitter:title',name: 'twitter:title', content: "비트킵 K-NFT 위크"},
                {hid:'twitter:description', name: 'twitter:description', content:"한국의 여러 NFT 프로젝트가 참여하여 열리는 이벤트입니다.비트킵을 다운로드하여 비트킵 K-NFT 위크에 참여하고 USDT 보상을 받으세요." },
                {hid:'twitter:url', name: 'twitter:url', content:"https://bitkeep.com/ko/nftactivity/knft" },
                {hid:'twitter:image', name: 'twitter:image', content:"https://cdn.bitkeep.vip/u_b_b233e3f0-237e-11ed-a71c-19b6a0304ce1.png"},
                {hid:'twitter:image_src', name: 'twitter:image_src', content:"https://cdn.bitkeep.vip/u_b_b233e3f0-237e-11ed-a71c-19b6a0304ce1.png"},
                {hid:'twitter:image_alt', name: 'twitter:type', content:"K-NFT"},
                {hid:'twitter:site', name: 'twitter:site', content:"bitkeep"},
                {hid:'twitter:card', name: 'twitter:card', content:"summary_large_image"},
            ],
            link: [
                // {hid:'icon', rel: 'icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
                // {hid:'shortcut icon', rel: 'shortcut icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
            ]       
        }  
      } else {
        return{
            title: "BitKeep K-NFT Week",
            meta: [
                {hid: 'keywords', name: 'keywords', content: "K-NFT" },
                {hid: 'description', name: 'description', content: "An event jointly held by BitKeep and multiple South Korean NFT teams. Download BitKeep to join us and get USDT rewards." },
                {hid:'og:title',name: 'og:title', content:"BitKeep K-NFT Week"},
                {hid:'og:description', name: 'og:description', content:"An event jointly held by BitKeep and multiple South Korean NFT teams. Download BitKeep to join us and get USDT rewards." },
                {hid:'og:url', name: 'og:url', content:"https://bitkeep.com/en/nftactivity/knft" },
                {hid:'og:type', name: 'og:type', content:"website"},
                {hid:'og:image', name: 'og:image', content:"https://cdn.bitkeep.vip/u_b_b76a9400-1c75-11ed-b320-59d228561609.png"},
                {hid:'og:image_src', name: 'og:image_src', content:"https://cdn.bitkeep.vip/u_b_b76a9400-1c75-11ed-b320-59d228561609.png"},
                {hid:'og:image_alt', name: 'og:type', content:"K-NFT"},
                {hid:'twitter:title',name: 'twitter:title', content: "BitKeep K-NFT Week"},
                {hid:'twitter:description', name: 'twitter:description', content:"An event jointly held by BitKeep and multiple South Korean NFT teams. Download BitKeep to join us and get USDT rewards." },
                {hid:'twitter:url', name: 'twitter:url', content:"https://bitkeep.com/en/nftactivity/knft" },
                {hid:'twitter:image', name: 'twitter:image', content:"https://cdn.bitkeep.vip/u_b_b76a9400-1c75-11ed-b320-59d228561609.png"},
                {hid:'twitter:image_src', name: 'twitter:image_src', content:"https://cdn.bitkeep.vip/u_b_b76a9400-1c75-11ed-b320-59d228561609.png"},
                {hid:'twitter:image_alt', name: 'twitter:type', content:"K-NFT"},
                {hid:'twitter:site', name: 'twitter:site', content:"bitkeep"},
                {hid:'twitter:card', name: 'twitter:card', content:"summary_large_image"},
            ],
            link: [
                // {hid:'icon', rel: 'icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
                // {hid:'shortcut icon', rel: 'shortcut icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
            ]       
        } 
      }
  },
  data() {
    return {
      list1: [{}],
      isPc: false,
      isMobile: this.$store.state.isMobile,
      screenWidth: 0,
      showvideo: true,
      // swiperOptionPc: {
      //   slidesPerView: 3,
      //   spaceBetween: 10,
      //   loop: true, 
      //   prevButton: '.button-prev1',
      //   nextButton: '.button-next1', 
      //   pagination: '.swiper-pagination1',
      // },
      // swiperOptionMobile: {
      //   slidesPerView: 1.25,
      //   spaceBetween: 10,
      //   loop: true, 
      //   prevButton: '.button-prev2',
      //   nextButton: '.button-next2',
      //   pagination: '.swiper-pagination2',
      //   paginationType: 'bullets',
      // }
    };
  },
  methods: {
    handleClickPhasePC() { 
        const { language } = this.$route.params;
        if (language == 'ko') {
          location.href='https://bitkeep.io/ko/download?type=0&theme=light'
        } else {
          location.href='https://bitkeep.io/en/download?type=0&theme=light'
        } 
    },
    handleClickPhaseMobile() {
        // EN：https://blog.bitkeep.com/en/?p=1667
        // KR：https://blog.bitkeep.com/kr/?p=1184
        const { language } = this.$route.params;
        if (language == 'ko') {
          location.href='https://blog.bitkeep.com/kr/?p=1184'
        } else {
          location.href='https://blog.bitkeep.com/en/?p=1667'
        } 
    }
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
    setTimeout(() => {
      this.showvideo = true
    }, 5000)
  },
  watch: {
    screenWidth: {
      handler(val) { 
        if (val >= 800) {
          this.isPc = true
        } else {
          this.isPc = false
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.knft-container {
  background: #17171a;
  .knft-banner {
    position: relative;
    height: calc(100vh - 64px);
    // height: 100vh;
    .knft-banner-flex {
      height: calc(100vh - 80px - 64px);
      .knft-banner-box {
        padding: 0 20px;
        text-align: center;
        img.banner-pc {
          width: 755px;
        }
        img.banner-mobile {
          // width: 344px; 
          width: 100%;
        }
        .knft-banner-text {
          position: relative;
          margin-top: 14px;
          padding: 8px 0;
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 150%;
          color: #ece4cc;
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: calc(50% - 2px);
            width: 4px;
            height: 4px;
            background: #ece4cc;
            border-radius: 4px;
          }
          &::before {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: calc(50% - 2px);
            width: 4px;
            height: 4px;
            background: #ece4cc;
            border-radius: 4px;
          }
        }
      }
    }
    .knft-banner-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 80px;
      width: 100%;
      overflow: hidden;
      background-color: #ae7cff;
      color: #0e0e0e;
      .roll-box {
        position: absolute;
        display: flex;
        height: 80px;
        animation: move2 30s infinite linear;
        -webkit-animation: move2 30s infinite linear;
        .roll-item {
          white-space: nowrap;
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 100%;
          color: #0e0e0e;
          .fg {
            margin: 0 25.5px;
            width: 33px;
            img {
              width: 33px;
            }
          }
        }
      }
      &.mobile {
        display: none;
        height: 60px;
        .roll-box { 
          height: 60px;
          .roll-item {
            font-size: 24px;
          }
        }
      }  
    }
  }
  .knft-body {
    color: #ece4cc;
    .knft-panel {
      margin: 0 auto;
      padding: 100px 0;
      max-width: 1530px;
      &.panel1 {
        .panel-left {
          // img {
          //   width: 760px;
          //   height: 880px;
          // }
        }
        &.pc {
          .panel-right {
          width: 626px;
            margin-left: 148px;
          }
        }
        &.mobile {
          .panel-right {
            margin-top: 40px;
            .title {
              font-size: 28px;
            } 
            .text {
              font-size: 14px;
            }

          }
        }
        .panel-right { 
          // width: 626px;
          .title {
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            font-size: 48px;
            line-height: 110%;
            .title-color { 
              position: relative;
              display:inline-block ;
              background: linear-gradient(87.89deg, #9C60FF 2.73%, #00E1FF 28.27%, #00DDA7 66.49%, #FFF598 87.26%);

              // background: linear-gradient(87.89deg, #9C60FF 2.73%, #00E1FF 18.27%, #00DDA7 31.49%, #FFF598 47.26%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text; 
              text-fill-color: transparent; 
              &::after {
                content: "";
                position:absolute;
                top: 0;
                right: -0.6em;
                width: 0.5em;
                height: 0.6em;
                background-image: url('@/assets/img/activity/knft/icon-union.svg');
                background-repeat: no-repeat; 
                background-size: contain;
              }
            }
          }
          .text {
            margin-top: 20px;
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
          }
        }
      }
      &.panel2 {
        .phase-bg {
          border-radius: 36px;
          padding: 4px;
          box-sizing: border-box;
          // width: 755px;
          height: 760px;
          overflow: hidden; 
          &.phase-1 {
            background: linear-gradient(34.41deg, #9C60FF 1.54%, #FFFFFF 75.42%, #00E1FF 99.9%);  
            .title1 {
              color:  #AE7CFF;
              &::after {
                background-image: url('@/assets/img/activity/knft/icon-union-1.svg')!important;
              }
            }
          }
          &.phase-2 {
            margin-top: 130px;
            background: linear-gradient(34.32deg, #00E1FF 1.54%, #FEFFD6 88.17%, #FFCD4D 97.57%);
            .title1 {
              color:  #00E1FF;
              &::after {
                background-image: url('@/assets/img/activity/knft/icon-union-2.svg')!important;
              }
            }
          }
          &.phase-3 {
            margin-top: 20px;
            background: linear-gradient(34.32deg, #FFCD4D 1.54%, #FFECB1 82.56%, #00DDA7 97.57%);
            .title1 {
              color:  #FFCD4D;
              &::after {
                background-image: url('@/assets/img/activity/knft/icon-union-3.svg')!important;
              }
            }

          }
          &.phase-4 {
            margin-top: 20px;
            background: linear-gradient(34.32deg, #00DDA7 1.54%, #A2F4FF 83.56%, #9C60FF 97.57%);
            .title1 {
              color:  #00DDA7;
              &::after {
                background-image: url('@/assets/img/activity/knft/icon-union-4.svg')!important;
              }
            }
          }
          .phase-box {
            width: 100%;
            height: 100%;
            // padding: 100px 84px 0;
            background-color: #0E0E0F;
            border-radius: 36px;
            text-align: center;
            .phase-logo {
              width: 300px;
              height: 300px; 
              margin:0 auto;
              background: #AE7CFF;
              // border: 6px solid #ECE4CC;
              border-radius: 1000px;
            }
            .phase-content {
              text-align: center;
              .title1 {
                display:inline-block ;
                position: relative;
                margin-top: 80px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                // color: #AE7CFF; 
                &::after {
                  content: "";
                  position:absolute;
                  top: 0.2em;
                  right: -0.6em;
                  width: 0.5em;
                  height: 0.6em;
                  background-image: url('@/assets/img/activity/knft/icon-union.svg');
                  background-repeat: no-repeat; 
                  background-size: contain;
                }
              } 
              .title2 {
                margin-top: 2px;
                font-family: 'Inter'; 
                font-weight: 700;
                font-size: 48px;
                line-height: 110%;  
                color: #ECE4CC;
              }
              .text { 
                margin-top: 20px;
                font-family: 'Inter'; 
                font-weight: 700;
                font-size: 24px;
                line-height: 150%;  
                color: #ECE4CC;
              }
            }
          }
        }
        &.mobile {
          .phase-bg {
            height: 450px;
            padding: 2px;
          }
          .phase-box {
            .phase-logo {
              width: 180px;
              height: 180px; 
            } 
            .phase-content {
              .title1 {
                margin-top: 40px;
                font-size: 20px;
              }
              .title2 {
                font-size: 28px;
              }
              .text { 
                font-size: 16px;
              }

            }

          }
        }
        .phase-list-left {
          margin-right: 20px;
        }
      }
      &.about {
        // .about-title {
        //   text-align: center;
        //   font-family: 'Inter';
        //   font-style: normal;
        //   font-weight: 700;
        //   font-size: 48px;
        //   line-height: 110%;
        // }
        // &.mobile {
        //   .about-title {
        //     font-size: 28px;
        //   }
        //   .myswiper {
        //     .bander {
        //       margin-top: 20px;
        //     } 
        //   }
        // }
        // .myswiper {
        //   position: relative;
        //   .bander {
        //     margin-top: 60px;
        //     overflow: hidden;
        //     .occupy-img {
        //       width: 100%;
        //     }
        //     .swiper-wrapper {
        //       width: 100%;
        //       .swiper-slide { 
        //         position: relative; 
        //         .myIframe {
        //           position: absolute;
        //           top: 0;
        //           left: 0;
        //           width: 100%;
        //           height: 100%;
        //         }
        //         .occupy-img {
        //           width: 100%;
        //           height: 100%;
        //         }
        //       }
        //     }
        //   }
        //   .button-prev1 {
        //     position: absolute;
        //     left: -95px;
        //     top: 50%;
        //     margin-top: -50px;
        //     z-index: 100;
        //     cursor: pointer;
        //   }
        //   .button-next1 { 
        //     position: absolute;
        //     right: -95px;
        //     top: 50%;
        //     margin-top: -50px;
        //     transform:rotate(180deg); 
        //     width: 25px;
        //     height: 100px;
        //     z-index: 100;
        //     cursor: pointer;
        //   }
        //   &.swiper2 { 
        //     .button-prev2 { 
        //       position: absolute; 
        //       bottom: -48px;
        //       left: 0;
        //       width: 28px;
        //       z-index: 99;
        //       cursor: pointer;
        //       img {
        //         display: block;
        //         width: 28px;
        //         height: auto;
        //       }

        //     }
        //     .button-next2  { 
        //       position: absolute; 
        //       bottom: -48px;
        //       right: 0;
        //       width: 28px;
        //       z-index: 99;
        //       cursor: pointer;
        //       img {
        //         display: block;
        //         width: 28px;
        //         height: auto;
        //       }
        //     }
        //     .swiper-pagination2 {
        //       position: absolute; 
        //       bottom: -48px; 
        //       left: 50%;
        //       margin-left: -129.5px;
        //       width: 259px; 
        //       height: 28px;
        //     }
        //     // :deep(.swiper-pagination-bullet) {
        //     /deep/ .swiper-pagination-bullet {
        //         display: block;
        //         width: 50%!important;
        //         height: 2px!important;
        //         background: #49494d!important;
        //         border-radius: 0;
        //         margin: 0!important;
        //         &-active {
        //           background: #ECE4CC!important; 
        //           border-color: #ECE4CC!important;
        //         } 
        //     }
        //   }

        // }
      }
    }
    .roll-content {
      position: relative;
      width: 100%;
      height: 100px;
      background: #0e0e0f;
      overflow: hidden;
      .roll-box {
        position: absolute;
        display: flex;
        height: 100px;
        background: #0e0e0f;
        animation: move2 30s infinite linear;
        -webkit-animation: move2 30s infinite linear;
        .roll-item-bg {
          height: 60px;
          padding: 2px;
          margin-left: 20px;
          background: linear-gradient(
            145deg,
            #9c60ff 25.34%,
            #00e1ff 46.19%,
            #00dda7 56.81%,
            #ece4cc 69.45%,
            #fff495 81.8%
          );
          border-radius: 100px;
          // overflow: hidden;
        }
        .roll-item {
          height: 100%;
          padding: 8px 14px 8px 8px;
          background: #0e0e0f;
          white-space: nowrap;
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 100%;
          color: #ffffff;
          border-radius: 100px;
          // border: 2px solid ;
          //           background: linear-gradient(0deg, #0E0E0F, #0E0E0F),
          // linear-gradient(112.97deg, #9C60FF 25.34%, #00E1FF 46.19%, #00DDA7 56.81%, #ECE4CC 69.45%, #FFF495 81.8%);

          .roll-logo-box {
            margin-right: 8px;
            border: 1px solid #707076;
            width: 40px;
            height: 40px;
            border-radius: 100px;
            overflow: hidden;
          }
        }
      }
    }
  }
} 

@keyframes move2 {
  0% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);  
  }
  100% {
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0); 
  }
}


@media screen and (min-width: 1570px) {  
  .knft-container {  
    .knft-banner {
      .knft-banner-box {
        .banner-mobile {
          display: none;
        }
        .text-mobile {
          display: none;
        }
      }
    }
    .knft-body {
      .knft-panel.mobile {
        display: none;
      }
      .knft-panel.pc { 
        width: 1530px;
        &.panel2 {
          .phase-bg { 
            width: 755px;
            .phase-box { 
              padding: 100px 84px 0;
            }
          }
        } 
        &.about { 
          // .swiper-slide {  
          //   height: 279px;
          // }
        } 
      }
    }  
  }
}
@media screen and (max-width: 1569px) and (min-width: 1100px) {
  .knft-container {  
    .knft-banner {
      .knft-banner-box {
        .banner-mobile {
          display: none;
        }
        .text-mobile {
          display: none;
        }
      }
    }
    .knft-body { 
      .knft-panel.mobile {
        display: none;
      }
      .text-mobile {
        display: none;
      }
      .knft-panel.pc {
        &.panel1 {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
          .panel-right {
            margin-left: 100px;
          }
        }
        &.panel2 {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
          .phase-bg { 
            width: calc(100vw / 2 - 30px); 
            .phase-box {
              padding: 80px 40px;
            }
          }
        }
        &.about {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
 
          .myswiper {
            .button-prev1 { 
              left: 30px;
            }
            .button-next1 {
              right: 30px;
            }
          }
          // .swiper-slide {  
          //   height: 260px;
          // }
        } 
      }
    }  
  }
}
@media screen and (max-width: 1099px) and (min-width: 800px) {
  .knft-container {  
    .knft-banner {
      .knft-banner-box {
        .banner-mobile {
          display: none;
        }
        .text-mobile {
          display: none;
        }
      }
    }
    .knft-body {
      .knft-panel.pc {
        &.panel1 {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
          .panel-right {
            margin-left: 50px;
          }
        }
        &.panel2 {
          display: none;
        }
        &.about {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
          // .swiper-slide {  
          //   height: 195px;
          // }
          .myswiper {
            .button-prev1 { 
              left: 30px;
            }
            .button-next1 {
              right: 30px;
            }
          }
        } 
      }
      .knft-panel.mobile { 
        &.panel1 {
          display: none;
        }
        &.panel2 {
          box-sizing: border-box;
          padding: 80px 20px; 
          width: 100%; 
          .phase-bg { 
            width: calc(100vw - 40px); 
            &.phase-2 {
              margin-top: 20px;
            }
            .phase-box {
              padding: 80px 40px;
            }
          }
        } 
        &.about {
          display: none;
        }
      }
    }  
  }
}
@media screen and (max-width: 799px)  {  
  .pc {
    display: none !important;
  }
  .knft-container {  
    .knft-banner {
      height: calc(100vh - 51px);
      .knft-banner-box {
        .banner-pc {
          display: none;
        }
        .text-pc {
          display: none;
        }
      }
      .knft-banner-footer.mobile {
        display: block!important;
      }
    }
    .knft-body {
      .knft-panel.pc {
        display: none;
      }
      .knft-panel.mobile { 
        &.panel1 { 
          box-sizing: border-box;
          padding: 40px 20px; 
          width: 100%; 
        }
        &.panel2 {
          box-sizing: border-box;
          padding: 40px 20px; 
          width: 100%; 
          .phase-bg { 
            width: calc(100vw - 40px); 
            &.phase-2 {
              margin-top: 20px;
            }
            .phase-box {
              padding: 36.6px 20px 67px;
            }
          }
        } 
        &.about {
          box-sizing: border-box;
          padding: 40px 20px 120px; 
          width: 100%; 
        }
      }
    }  
  }
}
</style>