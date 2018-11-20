<template>
  <div id="slider" class="root">
    <div class="container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div v-for="(item, index) in sliders" :key="index" :class="{
        'center-part': index === currentIndex % 3,
        'left-part': index === (currentIndex-1) % 3,
        'right-part': index === (currentIndex+1) % 3}"
      >
        <img style="height:100%;width:100%;" :src="sliders[index].img" alt="">
      </div>
<!--       
      <div class="left-part">
        <img style="height:100%;width:100%;" :src="sliders[0].img" alt="">
      </div>
      <div class="center-part">
        <img style="height:100%;width:100%;" :src="sliders[1].img" alt="">
      </div>
      <div class="right-part">
        <img style="height:100%;width:100%;" :src="sliders[2].img" alt="">
      </div> -->
    </div>
    <!-- <div class="window" @mouseover="stop" @mouseleave="play">
      <ul class="container-index" :style="containerStyle" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <li>
          <img :style="{width:imgWidth+'rpx'}" :src="sliders[sliders.length - 1].img" alt="">
        </li>
        <li  v-for="(item, index) in sliders" :key="index">
          <img :style="{width:imgWidth+'rpx'}" :src="item.img" alt="">
        </li>
        <li>
          <img :style="{width:imgWidth+'rpx'}" :src="sliders[0].img" alt="">
        </li>
      </ul>
    </div> -->
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
      imgWidth: 600,
      currentIndex: 1,
      distance: -600,
      transitionEnd: true,
      speed: this.initialSpeed,
      touchDot: 0, // 触摸原点
      time: 0, // 时间记录，用于滑动时且时间小于1s则执行左右滑动
      interval: '', // 记录或清理时间记录
      tmpFlag: true
    }
  },
  computed: {
    containerStyle () {
      return `transform: translate3d(${this.distance}rpx, 0, 0)`
    },
    interval () {
      return this.initialInterval * 1000
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.play()
      // this.onblur = function () { this.stop() }.bind(this)
      // this.onfocus = function () { this.play() }.bind(this)
    },
    touchStart (e) {
      this.touchDot = e.touches[0].pageX // 获取触摸时的原点
      this.interval = setInterval(function () {
        this.time++
      }, 100)
    },
    touchMove (e) {
      var touchMove = e.touches[0].pageX
      console.log('touchMove:' + touchMove + ' touchDot:' + this.touchDot + ' diff:' + (touchMove - this.touchDot))
      // 向右滑动
      if (touchMove - this.touchDot <= -40 && this.time < 10) {
        if (this.tmpFlag) {
          this.tmpFlag = false
          this.currentIndex += 1
          // this.jump(this.currentIndex + 1)
          console.log('右滑')
        }
      }
      if (touchMove - this.touchDot >= 40 && this.time < 10) {
        if (this.tmpFlag) {
          this.tmpFlag = false
          this.currentIndex -= 1
          // this.jump(this.currentIndex - 1)
          console.log('左滑')
        }
      }
    },
    touchEnd (e) {
      clearInterval(this.interval)
      this.time = 0
      this.tmpFlag = true
    },
    move (offset, direction, speed) {
      console.log(speed, this.transitionEnd)
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction === -1 ? this.currentIndex += offset / 600 : this.currentIndex -= offset / 600
      if (this.currentIndex > 5) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = 5

      const destination = this.distance + offset * direction
      console.log(destination, direction, speed)
      this.animate(destination, direction, speed)
    },
    animate (des, direc, speed) {
      if (this.temp) {
        clearInterval(this.temp)
        this.temp = null
      }
      this.temp = setInterval(() => {
        if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true
          clearInterval(this.temp)
          this.distance = des
          if (des < -3000) this.distance = -600
          if (des > -600) this.distance = -3000
        }
      }, 20)
    },
    jump (index) {
      console.log(index)
      const direction = index - this.currentIndex >= 0 ? -1 : 1
      const offset = Math.abs(index - this.currentIndex) * 600
      const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    play () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(() => {
        console.log('aaa', 'aa')
        this.move(600, -1, this.speed)
      }, this.interval)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
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
      background: #eee;
    }
    .left-part {
      top: 25rpx;
      z-index: 11
    }
    .center-part {
      width: 50%;
      left: 25%;
      right: 25%;
      height: 100%;
      background: #ccc;
      z-index: 12;
    }
    .right-part {
      top: 25rpx;
      right: 0;
      z-index: 11;
    }
  }
  ol,ul{
    list-style: none;
  }
  .window{
    position: relative;
    width: 600rpx;
    height: 400rpx;
    margin:0 auto;
    overflow:hidden;
  }
  .container-index{
    display:flex;
    position:absolute;
  }
  .left, .right{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    width: 50rpx;
    height: 50rpx;
    background-color:rgba(0,0,0,.3);
    border-radius:50%;
    cursor:pointer;
  }
  .left{
    left:3%;
    padding-left:12rpx;
    padding-top:10rpx;
  }
  .right{
    right:3%;
    padding-right:12rpx;
    padding-top:10rpx;
  }
  img{
    user-select: none;
  }
</style>
