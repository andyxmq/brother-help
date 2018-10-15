<template>
  <div class="container">
    <wux-tabs wux-class="bordered" auto="false" current="current" @change="onTabsChange">
      <block v-for="(item,index) in tabs" :key="index">
          <wux-tab :key="item.key" :title="item.title"></wux-tab>
      </block>
    </wux-tabs>
    <div class="main">
      <div>图片轮播</div>
      <div class="car-info">
        车辆信息及价格标准
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 'eight',
      tabs: []
    }
  },
  methods: {
    onTabsChange (e) {
      console.log(e, 'aa')
    },
    async getCraneTypes () {
      this.tabs = await this.$store.dispatch('getCraneType')
    }
  },
  mounted () {
    this.getCraneTypes()
  }
}
</script>
<style lang="scss">
  .container {
    .bordered {
      border-bottom: 1rpx solid #ddd;
    }
    .main {
      div {
        background: #efefef;
      }
      .car-info {
        margin-top: 10px;
      }
    }
  }
</style>

