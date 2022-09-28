<template>
    <div class="Skeletoncardlist">
        <div class="cardItem" v-for="item in new Array(cards)">
            <div class="defaultcard">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SkeletonCard',
    props: {
        cards: {
            type: Number,
            default: 8
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 1201px) {
    .cardItem {
        &:nth-child(4n+4) {
            margin-right: 0 !important;
        }
    }
}


@media screen and (max-width: 1200px) {
    .cardItem {
        width: 32% !important;

        &:nth-child(3n+3) {
            margin-right: 0;
        }
    }
}

@media screen and (max-width: 890px) {
    .cardItem {
        width: 100% !important;
        margin-right: 0 !important;
        margin-bottom: 10px !important;
    }
}

@media screen and (max-width: 845px) {
    .cardItem {
        width: 100% !important;
        margin-bottom: 10px !important;
        margin-right: 0 !important;
    }
}

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
        width: 24%;
        margin-right: 4/3%;
        position: relative;
        margin-bottom: 20px;
        cursor: pointer;

        .defaultcard {
            width: 100%;
            height: 126px;
            border-radius: 8px;
            padding: 20px;
            box-sizing: border-box;
        }
    }
}
</style>