<template>
  <div class="top-nav-wrap">
    <div class="nav-box" flex="main:justify">
      <div class="nav-box-left" flex>
        <div class="nav-item " v-for="item in navList" :key="item.name">
          <nuxt-link class="text2" :to="`/${locale}${item.url}`">
            {{item.name}}
          </nuxt-link>
        </div>
      </div>
      <div class="nav-box-right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: this.$t('royalties.nav.dataCenter'), //'数据中心',
          url: '/royalties/dataCenter'
        },
        {
          name: this.$t('royalties.nav.projectList'),//'合集列表',
          url: '/royalties/project'
        },
        {
          name:  this.$t('royalties.nav.certList'),//'认证列表',
          url: '/royalties/cert'
        },
        {
          name:  this.$t('royalties.nav.royaltiesCenter'),//'版税中心',
          url: '/royalties/royaltiesCenter'
        },
        {
          name:  this.$t('royalties.nav.authorityManager'),//'权限管理',
          url: '/royalties/authorityManager'
        },
      ],
      active: ''
    }
  },
  computed: {
    locale() {
      return  this.$store.state.locale;
    }
  }
}

</script>

<style lang="less" scoped>
.top-nav-wrap {
  height: 40px;
  margin-bottom: 30px;
  .nav-box {
    .nav-box-left {
        height: 40px;
        gap: 30px;
      .nav-item {
        line-height: 36px; 
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 16px; 
        
        a {
          padding: 6px 0;
          &:hover {
            color: #0E0E0E;
          }
        }
        .nuxt-link-active {
          border-bottom: 2px solid;
          color: #0E0E0E;
        }
      }
    }
    .nav-box-right {

    }
  }
}
</style>