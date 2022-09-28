<template>
  <div class="BG0">
    <div class="bodycontent">
      <Nuxt />
    </div>
  </div>

</template>
<script>
export default {
  name: 'JumpLayout'
}
</script>
<style lang="less" scoped>
.body_box,.bodycontent {
  width: 100%;
  min-height: 100vh;
  max-width: 750px;
  margin: 0 auto;
}

</style>
