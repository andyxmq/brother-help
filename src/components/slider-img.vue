<template>
  <div id="slider" class="root">
    <div class="container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div v-for="(item, index) in sliders" :key="index" :class="{
        'center': index === currentIndex % 3,
        'left': index === (currentIndex+2) % 3,
        'right': index === (currentIndex+1) % 3}"
        @click="selectHandle"
        :id="index"
      >
        <img style="height:100%;width:100%;" :src="sliders[index].img" alt=""> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      sliders: [
        {
          img: 'http://img3.imgtn.bdimg.com/it/u=2200166214,500725521&fm=26&gp=0.jpg'
        },
        {
          img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg'
        },
        {
          img: 'http://c.hiphotos.baidu.com/image/pic/item/77c6a7efce1b9d16efbcc03afedeb48f8c546475.jpg'
        }
      ],
      currentIndex: 1,
      touchDot: 0, // 触摸原点
      time: 0, // 时间记录，用于滑动时且时间小于1s则执行左右滑动
      interval: '', // 记录或清理时间记录
      tmpFlag: true
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    touchStart (e) {
      this.touchDot = e.touches[0].pageX // 获取触摸时的原点
      this.interval = setInterval(function () {
        this.time++
      }, 100)
    },
    touchMove (e) {
      var touchMove = e.touches[0].pageX
      // 向右滑动
      if (touchMove - this.touchDot <= -40 && this.time < 10) {
        if (this.tmpFlag) {
          this.tmpFlag = false
          this.currentIndex += 1
        }
      }
      if (touchMove - this.touchDot >= 40 && this.time < 10) {
        if (this.tmpFlag) {
          this.tmpFlag = false
          this.currentIndex -= 1
          if (this.currentIndex < 0) {
            this.currentIndex = 2
          }
        }
      }
    },
    touchEnd (e) {
      clearInterval(this.interval)
      this.time = 0
      this.tmpFlag = true
    },
    selectHandle (e) {
      let index = e && e.currentTarget && e.currentTarget.id
      if (index) {
        this.currentIndex = index
      }
    }
  }
}
</script>

<style lang="scss">
  .container {
    position: relative;
    height: 300rpx;
    text-align: center;
    >div {
      position: absolute;
      width: 50%;
      height: 250rpx;
      z-index: 10;
      transition: top 3s,left 3s;
    }
    .left {
      top: 25rpx;
      z-index: 11;
    }
    .center {
      left: 25%;
      height: 100%;
      z-index: 12;
    }
    .right {
      top: 25rpx;
      right: 0;
      z-index: 11;
    }
  }
</style>
