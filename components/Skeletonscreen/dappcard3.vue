<template>
    <div class="Skeletoncardlist">
        <div class="cardItem" v-for="item in new Array(cards)">
            <div class="defaultcard BG2">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SkeletonCard3',
    props: {
        cards: {
            type: Number,
            default: 8
        }
    }
}
</script>
<style lang="less" scoped>
.theme-light {
    .defaultcard {
        background: linear-gradient(100deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, .5) 50%,
                rgba(255, 255, 255, 0) 60%) #F2F2F5;
        background-size: 200% 100%;
        background-position-x: 180%;
        animation: 1s loading ease-in-out infinite;
    }

    @keyframes loading {
        to {
            background-position-x: -20%;
        }
    }
}

.theme-dark {
    .defaultcard {
        background: linear-gradient(90deg,rgba(42,41,46,.8) 25%,rgba(255,255,255,.16) 37%,rgba(42,41,46,.8) 63%);
        background-size: 500% 100%;
        animation: ant-skeleton-loading 1.4s ease infinite;
    }

    @keyframes ant-skeleton-loading {
        0% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }

}
.Skeletoncardlist {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .cardItem {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        cursor: pointer;
        .defaultcard {
            width: 100%;
            height: 120px;
            border-radius: 8px;
            padding: 20px;
            box-sizing: border-box;
        }
    }
}
</style>