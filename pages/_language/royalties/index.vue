<template>
  <div class="royalties-wrap">
    <nav class="nav-list">
      <div class="nav-item" v-for="item in navList" :key="item.name">
        {{item.name}}
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  layout: 'nft/default',
  name: 'royalties', 
  data() {
    return {
      navList: [
        {
          name: '数据中心',
          url: '/dataCenter'
        },
        {
          name: '合集列表',
          url: '/projectList'
        },
        {
          name: '认证列表',
          url: '/authentication'
        },
        {
          name: '版税中心',
          url: '/royaltiesCenter'
        },
        {
          name: '权限管理',
          url: '/authorityManager'
        },

      ],
      active: '' 
    }
  },
  methods: {

  },
  beforeRouteEnter(to, from, next) { 
    // console.log('beforeRouteEnter', from.matched[0], from)
    const { language } = from.params 
    next(`/${language}/royalties/dataCenter`) 
  }
  
}
</script>



