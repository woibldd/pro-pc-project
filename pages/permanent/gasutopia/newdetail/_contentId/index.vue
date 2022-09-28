<template>
    <div class="contentBox">
        <h1>{{ detail.title }}</h1>
        <div class="describe">{{ detail.describe }}</div>
        <img :src="detail.banner" class="banner" alt="banner">
        <div class="detailBox">
            <div class="Top">
                <div v-for="item in detail.content.top">
                    {{ item.text }}
                </div>
            </div>
            <div class="Middle">
                <div v-for="item in detail.content.middle">
                    {{ item.text }}
                </div>
            </div>
            <div class="Bottom">
                <div v-for="item in detail.content.bottom">
                    {{ item.text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import detail from '../../detail.json'
export default {
    layout: 'permanent/gasutopia/default',
    name: 'GAUStopiaDetailPage',
    scrollToTop: true,
    async asyncData(app) {
        return {
            params: app.params,
            contentId: app.params.contentId
        }
    },
    data() {
        return {
            detail: detail[this.contentId] ? detail[this.contentId] : detail.New1
        }
    },
    head() {
        return{
            title: this.detail.title,
            meta: [
                {hid: 'keywords', name: 'keywords', content:"gasutopia, gasu, stablecoin"},
                {hid: 'description', name: 'description', content: this.detail.describe},
                {hid:'og:title',name: 'og:title', content:this.detail.title},
                {hid:'og:description', name: 'og:description', content:this.detail.describe },
                {hid:'og:url', name: 'og:url', content:"https://gasutopia.com" },
                {hid:'og:type', name: 'og:type', content:"website"},
                {hid:'og:image', name: 'og:image', content:"https://cdn.bitkeep.vip/u_b_f01ef770-1705-11ed-aa23-8f000e627696.png"},
                {hid:'og:image_src', name: 'og:image_src', content:"https://cdn.bitkeep.vip/u_b_f01ef770-1705-11ed-aa23-8f000e627696.png"},
                {hid:'og:image_alt', name: 'og:type', content:"GASU"},
                {hid:'twitter:title',name: 'twitter:title', content: this.detail.title},
                {hid:'twitter:description', name: 'twitter:description', content:this.detail.describe },
                {hid:'twitter:url', name: 'twitter:url', content:"https://gasutopia.com" },
                {hid:'twitter:image', name: 'twitter:image', content:"https://cdn.bitkeep.vip/u_b_f01ef770-1705-11ed-aa23-8f000e627696.png"},
                {hid:'twitter:image_src', name: 'twitter:image_src', content:"https://cdn.bitkeep.vip/u_b_f01ef770-1705-11ed-aa23-8f000e627696.png"},
                {hid:'twitter:image_alt', name: 'twitter:type', content:"GASU"},
                {hid:'twitter:site', name: 'twitter:site', content:"gasutopia"},
                {hid:'twitter:card', name: 'twitter:card', content:"summary_large_image"},
            ],
            link: [
                {hid:'icon', rel: 'icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
                {hid:'shortcut icon', rel: 'shortcut icon', type:"image/x-icon", href: "https://cdn.bitkeep.vip/u_b_f01d22b0-1705-11ed-aa23-8f000e627696.png" },
            ]        
        }
    }
}
</script>
<style lang="less" scoped>
.contentBox {
    width: 100%;
    padding: 80px 250px;
    background-color: #f6f2ef;

    h1 {
        width: 100%;
        font-weight: 400;
        font-size: 70px;
        line-height: 1.1;
        color: #261F1F;
    }

    .describe {
        width: 100%;
        margin: 40px 0px;
        font-weight: 400;
        font-size: 45px;
        line-height: 1.2;
        color: #261F1F;
        border-left: 4px solid #000000;
        padding-left: 27px;
        box-sizing: border-box;
    }

    .banner {
        display: block;
        width: 100%;
        height: auto;
        margin: 50px 0px;
    }

    .detailBox {
        width: 100%;

        .Top {
            font-weight: 400;
            font-size: 24px;
            line-height: 1.5;
            color: #261F1F;

            div {
                margin-bottom: 30px;
            }
        }

        .Middle {
            font-weight: 400;
            font-size: 24px;
            line-height: 1.5;
            color: #7D7D7D;
            border-left: 2px solid #7D7D7D;
            padding-left: 25px;
            margin-top: 15px;
            box-sizing: border-box;

            div {
                margin-bottom: 30px;
            }
        }

        .Bottom {
            font-weight: 400;
            font-size: 24px;
            line-height: 1.5;
            color: #261F1F;

            div {
                margin-bottom: 30px;
            }
        }
    }
}

@media screen and (max-width: 1540px) and (min-width: 1200px) {
    .contentBox {
        padding: 80px 180px !important;

        h1 {
            font-size: 60px !important;
        }

    }
}

@media screen and (max-width: 1200px) and (min-width: 900px) {
    .contentBox {
        padding: 80px !important;

        h1 {
            font-size: 50px !important;
        }

        .describe {
            font-size: 35px !important;
        }

    }
}

@media screen and (max-width: 900px) and (min-width: 300px) {
    .contentBox {
        padding: 50px 20px !important;

        h1 {
            font-size: 22px !important;
        }

        .describe {
            font-size: 15px !important;
        }

    }
}
@media screen and (max-width: 750px) and (min-width: 300px) {
    .contentBox {
        padding: 50px 20px !important;

        h1 {
            font-size: 22px !important;
        }

        .describe {
            font-size: 15px !important;
        }
        .detailBox{
           div{
             font-size: 12px !important;
           }
           
        }

    }
}
</style>