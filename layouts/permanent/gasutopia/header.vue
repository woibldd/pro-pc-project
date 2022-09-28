<template>
    <header class="headerbox">
        <div class="headercontent">
            <a href="/permanent/gasutopia">
                <img src="https://cdn.bitkeep.vip/u_b_d2971900-146a-11ed-8090-d19620c9dd6a.svg+xml" alt="GASUtopia"
                class="GASULogo">
            </a>
            <img src="https://cdn.bitkeep.vip/u_b_074a00e0-146b-11ed-8090-d19620c9dd6a.svg+xml" alt="GASUtopia"
                class="Exchangerate">
        </div>
    </header>
</template>
<script>
export default {
    name: "GASUtopiaHeader",
    data() {

        return {

        }
    },
    head() {

    },
    beforeMount() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.headerbox {
    width: 100%;
    padding: 43px 185px 0px 185px;
    background-color: #f6f2ef;
    box-sizing: border-box;

    .headercontent {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 0px;
        border-bottom: 1px solid #000000;

        .GASULogo {
            display: block;
            width: 212px;
            height: auto;
        }

        .Exchangerate {
            display: block;
            width: 255px;
            height: auto;
        }
    }
}

@media screen and (max-width: 1540px) and (min-width: 900px) {
    .headerbox {
        padding: 43px 120px 0px 120px !important;
    }
}

@media screen and (max-width: 900px) and (min-width: 300px) {
    .headerbox {
        padding: 20px 20px 0px 20px !important;

        .headercontent {
            padding: 10px 0px !important;
        }
    }
}

@media screen and (max-width: 500px) and (min-width: 300px) {
    .GASULogo {
        width: 127px !important;
    }

    .Exchangerate {
        width: 115px !important;
    }
}
</style>