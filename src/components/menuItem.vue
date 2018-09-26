<template>
  <div @click="goToLoading">
    <wux-wing-blank size="default">
      <wux-card :title="getBusinessName">
        <div slot="body">{{getBusinessName}}</div>
        <div slot="footer">{{menu.description}}</div>
      </wux-card>
    </wux-wing-blank>
  </div>
</template>

<script>
export default {
  props: ['menu'],
  computed: {
    getBusinessName () {
      return this.menu.businessName
    }
  },
  methods: {
    goToLoading () {
      let { businessId } = this.menu
      wx.navigateTo({
        url: `/pages/loading/main?bId=${businessId}`
      })
    }
  }
}
</script>

<style>

</style>
