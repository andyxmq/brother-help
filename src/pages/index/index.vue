<template>
  <div class="container">
    <div class="first" v-if="!nickNameIsEmpty" style="height: 1196rpx; width:750rpx;">
      <img src="../../../static/images/backgrand_1@1x.png" style="height: 1196rpx; width:750rpx;position:absolute;z-index:-11;top:-50rpx"/>
      <div class="business-card">
        <div class="company-logo">
          <img src="../../../static/images/icon_logo@1x.png" style="height: 56rpx;width:229rpx;"/>
        </div>
        <div class="user-name">{{userInfo.name}}</div>
        <div class="user-title">
          {{userInfo.depart}}
          {{userInfo.position}}
        </div>
        <div class="user-detail">
          <div class="phone">{{userInfo.phone}}</div>
          <div class="email">{{userInfo.email}}</div>
          <div class="address">{{userInfo.address}}</div>
        </div>
        <div class="user-handle">
          <!-- <img src="../../../static/images/icon_txl@1x.png" style="width: 23rpx; height: 23rpx;"/> <span>导入到通讯录</span> -->
        </div>
      </div>
      <div v-if="qrToken" class="qr-code">
        <img :src="qrToken" style="width:194rpx;height:194rpx;margin-left:278rpx;"/>
      </div>
    </div>
    <div class="second" style="width:750rpx;height: 1284rpx;">
      <img src="../../../static/images/backgrand_2@1x.png" style="height: 1334rpx; width:750rpx;position:absolute;z-index:-11;top:-50rpx"/>
      <div class="theme" >
        <img src="../../../static/images/theme@1x.png" style="width:477rpx;height:277rpx;"/>
      </div>
      <!-- <div class="slogan">
        <img src="../../../static/images/slogan@1x.png" style="width:272rpx;height:106rpx;"/>
      </div> -->
      <div class="go-to-official" @click="goToOfficial">
        <p></p><span></span>
      </div>
      <div class="login-button" v-if="!nickName"> 
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">一点员工登录</button>
      </div>
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
      userInfo: {},
      qrToken: '',
      nickName: ''
    }
  },
  computed: {
    nickNameIsEmpty () {
      let userInfo = this.userInfo
      for (var key in userInfo) {
        if (userInfo.hasOwnProperty(key) && userInfo[key]) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    async getEmployeeInfo (fromShareNickName) { // 获取一点员工信息
      var nickName = this.nickName || fromShareNickName || ''
      let userInfo = await this.$store.dispatch('getUserInfo', encodeURIComponent(nickName))
      if (userInfo.length === 1) {
        this.userInfo = userInfo[0]
      }
    },
    goToOfficial () {
      wx.navigateToMiniProgram({
        appId: 'wx58cac81e092ad159'
      })
    },
    async getQrCode () {
      // this.qrToken = await this.$store.dispatch('getQrCode', this.nickName, `pages/index/main?nickName=${this.nickName}`)
      this.qrToken = await this.$store.dispatch('getQrCode', this.nickName)
    },
    onGotUserInfo: function (e) {
      this.nickName = e.target && e.target.userInfo && e.target.userInfo.nickName
      wx.setStorageSync('nickName', this.nickName)
      this.getEmployeeInfo()
      this.getQrCode()
    }
  },
  onShareAppMessage: function (res) { // menu的分享
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      return {
        title: '智能时代的价值阅读',
        path: `/pages/index/main?nickName=${this.nickName}`
      }
    }
  },
  created () {
    let nickName = wx.getStorageSync('nickName')
    if (nickName) {
      this.nickName = nickName
      this.getEmployeeInfo()
      this.getQrCode()
    }
  },
  onLoad (options) {
    if (options && options.nickName) {
      this.getEmployeeInfo(options.nickName)
    }
  }
}
</script>

<style lang="scss">
  .container {
    box-sizing: border-box;
    .first {
      position: relative;
      box-sizing: border-box;
      .business-card {
        margin: 50rpx 50rpx 0rpx;
        box-sizing: border-box;
        width: 650rpx;
        height: 800rpx;
        background: #fff;
        border-radius: 16rpx;
        padding-left:  60rpx; 
        padding-top: 64rpx;
        box-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,0.2);
        .company-logo {
          height: 56rpx;
        }
        .user-name {
          color: #222;
          font-size: 62rpx;
          margin-top: 98rpx;
        }
        .user-title {
          margin-top: 40rpx;
          color: #1b1b1b;
          font-size: 28rpx;
        }
        .user-detail {
          margin-top: 140rpx;
          font-size: 28rpx;
          color: #1b1b1b;
        }
        .user-handle {
          margin-top: 46rpx;
          margin-bottom: 76rpx;
          span {
            margin-left: 8rpx;
            font-size: 26rpx;
            color: #888888;
          }
        }
      }
      .qr-code {
        margin-top: 40rpx;
      }
    }
    .second {
      position: relative;
      box-sizing: border-box;
      margin-top: 9rpx;
      padding-top: 334rpx; 
      .theme {
        margin: 0 136rpx;
        width: 750rpx;
        height: 277rpx;
      }
      .slogan {
        margin: 241rpx 239rpx 0;
        width: 750rpx;
        height: 106rpx;
      }
      .go-to-official {
        background:#e90026;
        margin: 85rpx 345rpx 0;
        width: 23rpx;height: 23rpx;
        border-radius:50%;
        position: relative;
        p {
          position: absolute;
          width: 23rpx;height: 23rpx;
          border-radius:50%;
          animation: myfirst 1.5s infinite;
          background: rgba($color: #c9c9c9, $alpha: 0.15)
        }
        span {
          position: absolute;
          display:block;
          width: 23rpx;height: 23rpx;
          border-radius:50%;
          animation: second 1.5s infinite;
          background: rgba($color:#e6e6e6, $alpha:0.17);
        }
      }
      .login-button {
        margin-top: 200rpx;
        button {
          width: 50%;
          background: #e90026;
          color: #fff;
        }
      }
    }
  } 
  @keyframes myfirst{
    100% {transform: scale(3);}
  }
  @keyframes second{
    100% {transform: scale(6);}
  }
</style>
