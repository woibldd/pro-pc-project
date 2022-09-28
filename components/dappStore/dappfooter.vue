<template>
<div class="dappstoreFooter" title="dappstoreFooter">
<span class="text2" :title='$t("DappStore.footerTips")'>{{$t("DappStore.footerTips")}}</span>
<span class="text3" :title='$t("DappStore.footer")'>{{$t("DappStore.footer")}}</span>
</div>
</template>
<script>
export default{
    name:"Dappstorefooter"
}
</script>
<style lang="less" scoped>
.dappstoreFooter{
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    line-height: 17px;
}
</style>