<template>
  <div>
    <!-- 导航 -->
    <navigation :navList="navList" :activitedIndex="0"></navigation>
    <div id="FreeMint">
      <!-- banner -->
      <div class="FreeMint_banner">
        <div class="mintdefault-box">
          <div class="mintdefault-left">
            <h1 class="mintdefault-title text1" title="Free Mints">
              Free Mints
            </h1>
            <p class="mintdefault-des text2">
              {{ FreeMint.banner.description }}
            </p>
          </div>
          <div class="mintdefault-right">
            <div class="mintdefault-right_background">
              <img
                :src="
                  FreeMint.banner.link
                    ? FreeMint.banner.link
                    : 'https://cdn.bitkeep.vip/u_b_cd5c6cc0-3aed-11ed-b52b-cd40fba2fbe8.png'
                "
                class="seth5"
                alt="defaultr img"
                v-if="FreeMint.banner.link"
              />
            </div>
            <img
              :src="
                FreeMint.banner.link
                  ? FreeMint.banner.link
                  : 'https://cdn.bitkeep.vip/u_b_cd5c6cc0-3aed-11ed-b52b-cd40fba2fbe8.png'
              "
              class="bannerimg"
              alt="defaultr img"
              v-if="FreeMint.banner.link"
            />
          </div>
        </div>
      </div>
      <!-- Tools -->
      <div class="FreeMint_tool" v-if="(FreeMint.tools || {}).length > 0">
        <div>
          <h3 class="text1">{{ $t("FreeMints.Tools") }}</h3>
        </div>
        <div>
          <swiperMint :toolsList="FreeMint.tools || []"></swiperMint>
        </div>
      </div>
      <div
        class="WhitelistRaffle"
        v-if="FreeMint.recent_coming && FreeMint.recent_coming.length > 0"
      >
        <div class="WhitelistRaffle_title">
          <h3 class="text1">{{ $t("FreeMints.commingSoon") }}</h3>
        </div>
        <!-- Comming Soon -->
        <recent-events
          :dataList="FreeMint.recent_coming || []"
          type="Comming Soon"
        ></recent-events>
      </div>
      <div
        class="WhitelistRaffle"
        v-if="FreeMint.recent_write && FreeMint.recent_write.length > 0"
      >
        <div class="WhitelistRaffle_title">
          <h3 class="text1">{{ $t("FreeMints.Whitelist") }}</h3>
        </div>
        <!-- recent_write -->
        <recent-events
          :dataList="FreeMint.recent_write || []"
          type="WhiteList Raffle"
        ></recent-events>
      </div>
      <div
        class="WhitelistRaffle"
        v-if="FreeMint.recent_free && FreeMint.recent_free.length > 0"
      >
        <div class="WhitelistRaffle_title">
          <h3 class="text1">{{ $t("FreeMints.FreeMints") }}</h3>
        </div>
        <!-- Free Mint -->
        <recent-events
          :dataList="FreeMint.recent_free || []"
          type="Free Mint"
        ></recent-events>
      </div>
      <div class="WhitelistRaffle">
        <div class="WhitelistRaffle_title">
          <h3 class="text1">{{ $t("FreeMints.PastEvents") }}</h3>
        </div>
        <past-events :pastData="FreeMint.past || []"></past-events>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "@/components/navigation";
import swiperMint from "@/components/FreeMint/swiper";
import RecentEvents from "@/components/FreeMint/RecentEvents";
import PastEvents from "@/components/FreeMint/PastEvents";
export default {
  layout: "nft/freeMint",
  name: "FreeMintPage",
  scrollToTop: true,
  async asyncData(app) {
    let FreeMint = {
      banner: {
        image: "",
        description: "",
      },
      tools: [],
      recent: [],
      past: [],
      recent_coming: [],
    };
    let { status, data } = await app.$api.INOApi.getFreeMintInfo();
    if (status == 0) {
      FreeMint = data;
    }
    return { FreeMint: FreeMint };
  },
  data() {
    return {
      navList: [
        {
          id: "1",
          name: "Free Mints",
          link: `/${this.$route.params.language}/nft/freeMint`,
          activited: "0",
        },
        {
          id: "2",
          name: "INO",
          link: `/${this.$route.params.language}/INO`,
          activited: "1",
        },
      ],
    };
  },
  components: {
    navigation,
    swiperMint,
    RecentEvents,
    PastEvents,
  },
  head() {
    const { language } = this.$route.params || "en";
    return {
      title: this.$t("INO.shareTitle"),
      meta: [
        { name: "keywords", content: this.FreeMint.banner.description },
        { name: "description", content: this.FreeMint.banner.description },
        { name: "title", content: this.FreeMint.banner.description },
        { name: "og:title", content: this.FreeMint.banner.description },
        { name: "og:description", content: this.FreeMint.banner.description },
        { name: "twitter:title", content: this.FreeMint.banner.description },
        {
          name: "twitter:description",
          content: this.FreeMint.banner.description,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "BitKeep" },
        { name: "og:type", content: "website" },
        { name: "og:site_name", content: "BitKeep" },
        {
          hid: "og:image:src",
          content: this.FreeMint.banner.image || "",
        },
        {
          hid: "og:image",
          content: this.FreeMint.banner.image || "",
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          content: "BitKeep, a Best Crpto Wallet",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.FreeMint.banner.image || "",
        },
        {
          hid: "twitter:image:src",
          name: "twitter:image:src",
          content: this.FreeMint.banner.image || "",
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "BitKeep, a Best Crpto Wallet",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `https://bitkeep.com/${language}/nft/freeMint`,
        },
        {
          rel: "alternate",
          hreflang: "zh",
          href: `https://bitkeep.com/zh/nft/freeMint`,
        },
        {
          rel: "alternate",
          hreflang: "en",
          href: `https://bitkeep.com/en/nft/freeMint`,
        },
        {
          rel: "alternate",
          hreflang: "ko",
          href: `https://bitkeep.com/ko/nft/freeMint`,
        },
        {
          rel: "alternate",
          hreflang: "x-default",
          href: `https://bitkeep.com/en/nft/freeMint`,
        },
      ],
    };
  },
  mounted() {
    this.$Ta.track({
      name: "FreeMint_Page",
      data: {
        source: "PC",
        Page_Enter: "1",
      },
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#FreeMint {
  margin: 0 auto;
  min-width: 820px;
  max-width: 1530px;
  padding: 0 20px 100px 20px;
  .FreeMint_banner {
    margin: 100px 84px;
    .mintdefault-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mintdefault-left {
        max-width: 496px;
        min-width: 243px;
        h1 {
          font-size: 50px;
        }
        .mintdefault-des {
          font-size: 16px;
          margin-right: 40px;
        }
      }
      .mintdefault-right {
        position: relative;
        display: flex;
        justify-content: center;
        .mintdefault-right_background {
          width: 500px;
          height: 236px;
          filter: blur(60px);
          border-radius: 8px;
          position: absolute;
          bottom: 0;
          z-index: 1;
          .seth5 {
            position: absolute;
            bottom: 0;
          }
          .bannerimg {
            height: 236px;
            width: 100%;
            z-index: 2;
          }
        }
        .bannerimg {
          max-height: 366px;
          object-fit: cover;
          vertical-align: inherit;
          border-radius: 8px;
          z-index: 1;
        }
      }
    }
  }
  .FreeMint_tool {
    line-height: 64px;
    h3 {
      font-size: 32px;
    }
  }
  .WhitelistRaffle {
    margin-top: 88px;
    .WhitelistRaffle_title {
      height: 64px;
      line-height: 64px;
    }
    h3 {
      font-size: 32px;
    }
  }
}
@media only screen and (max-width: 900px) {
  #FreeMint {
    padding: 0 20px 26px 20px !important;
    height: 100% !important;
    max-height: 100% !important;
    max-width: 820px !important;
    min-width: 100% !important;
  }
  .FreeMint_banner{
    margin:55px 0!important;
  }
  .mintdefault-box {
    flex-direction: column-reverse;
  }
  .mintdefault-left {
    text-align: left;
  }
  .mintdefault-right {
    min-width: 335px;
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 1300px) {
  .mintdefault-right_background {
    width: 267px !important;
    height: 129px !important;
    filter: blur(30px) !important;
  }
}
@media screen and (max-width: 830px) {
  .mintdefault-right {
    transform: scale(1);
  }
  .mintdefault-right_background {
    width: 267px !important;
    height: 129px !important;
    filter: blur(30px) !important;
  }
  .mintdefault-title {
    font-size: 28px !important;
    line-height: 32px !important;
    margin-top: 10px;
  }
  .arrow {
    width: 32px !important;
    height: 32px !important;
  }
}
</style>