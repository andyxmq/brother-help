<template>
  <div class="container">
    <div class="body">
      <menu-item v-for="(menu, index) in menuList" :menu="menu" :key="index"/>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/menuItem'
export default {
  components: {
    MenuItem
  },
  data () {
    return {
      menuList: [], // 首页菜单列表
      title: '兄弟帮'
    }
  },

  methods: {
    async getIndexMenu () {
      this.menuList = await this.$store.dispatch('getMenuList')
    }
  },

  mounted () {
    this.getIndexMenu()
  }
}
</script>

<style>
  .body {
    padding: 30rpx;
  }
</style>
