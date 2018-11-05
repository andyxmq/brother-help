<template>
  <div class="container">
    <div class="first" v-if="!nickNameIsEmpty">
      <img src="../../../static/images/backgrand_1@1x.png" style="height: 100%;width:100%;position:absolute;z-index:-11;"/>
      <div class="business-card">
        <div class="company-logo">
          <img src="../../../static/images/icon_logo@1x.png" style="height: 56rpx;width:229rpx;"/>
        </div>
        <div class="user-name">{{userInfo.name}}</div>
        <div class="user-title">
          {{userInfo.depart}}
          <span class="divider" v-if="userInfo.depart"></span>
          {{userInfo.position}}
        </div>
        <div class="user-detail">
          <div class="phone">{{userInfo.phone}}</div>
          <div class="email">{{userInfo.email}}</div>
          <div class="address">{{userInfo.address}}</div>
        </div>
      </div>
      <div class="qr-code" v-if="qrToken">
        <img :src="qrToken" style="width:194rpx;height:194rpx;margin-left:278rpx;"/>
      </div>
      <div class="down-arrow">
        <div>
          <img src="../../../static/images/icon_jt@1x.png" style="width:52rpx;height:25rpx;"/>
        </div>
      </div>
    </div>
    <!-- <div class="user-handle">
      <img src="../../../static/images/icon_txl@1x.png" style="width: 23rpx; height: 23rpx;"/> <span>导入到通讯录</span>
    </div> -->
    <div class="second">
      <img src="../../../static/images/backgrand_2@1x.png" style="height: 100%; width:100%;position:absolute;z-index:-11;"/>
      <div class="second-main" :style="showBotton?'padding-top: 314rpx':'padding-top:334rpx'">
        <div class="theme" >
          <img src="../../../static/images/theme@1x.png" style="width:477rpx;height:277rpx;"/>
        </div>
        <div class="slogan" v-if="!nickNameIsEmpty">
          <img src="../../../static/images/slogan@1x.png" style="width:272rpx;height:106rpx;"/>
        </div>
        <div class="go-to-official" @click="goToOfficial" :style="showBotton?'margin-top: 200rpx':'margin-top: 160rpx'">
          <p></p><span></span>
        </div>
        <div class="login-button" v-if="showBotton" :style="showBotton?'margin-top: 159rpx':'margin-top: 179rpx'"> 
          <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">一点员工登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      qrToken: '',
      nickName: '',
      phone: ''
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
    },
    showBotton () {
      return this.nickNameIsEmpty || !this.nickName
    }
  },
  methods: {
    async getEmployeeInfo (phone) { // 获取一点员工信息
      let userInfo = await this.$store.dispatch('getUserInfo', {nickname: this.nickName, phone})
      if (userInfo.length > 0) {
        this.userInfo = userInfo[0]
        this.phone = userInfo[0].phone
        this.getQrCode(userInfo[0].phone)
      }
    },
    goToOfficial () {
      wx.navigateToMiniProgram({
        appId: 'wx58cac81e092ad159'
      })
    },
    async getQrCode (phone) {
      this.qrToken = await this.$store.dispatch('getQrCode', phone, `pages/index/main`)
    },
    onGotUserInfo: function (e) {
      this.nickName = e.target && e.target.userInfo && e.target.userInfo.nickName
      wx.setStorageSync('nickName', this.nickName)
      this.getEmployeeInfo()
    }
  },
  onShareAppMessage: function (res) { // menu的分享
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      return {
        title: '智能时代的价值阅读',
        path: `/pages/index/main?phone=${this.phone}`
      }
    }
  },
  created (options) {
    let nickName = wx.getStorageSync('nickName')
    if (nickName) {
      this.nickName = nickName
      this.getEmployeeInfo()
    }
  },
  onShow (options) {
    if (!this.phone) {
      let nickName = wx.getStorageSync('nickName')
      if (nickName) {
        this.nickName = nickName
        this.getEmployeeInfo()
      }
    }
  },
  onLoad (options) {
    if (options) {
      let phone = options.phone || decodeURIComponent(options.scene) || ''
      if (phone) {
        this.phone = phone
        this.getEmployeeInfo(phone)
      }
    }
  },
  onHide () {
    this.userInfo = {}
    this.nickname = ''
    this.phone = ''
  }
}
</script>

<style lang="scss">
  .divider {
    display: inline-block;
    height: 28rpx;
    margin-bottom: -2rpx; 
    border-left: 1rpx solid #1b1b1b;
  }
  .container {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    .first {
      position: relative;
      box-sizing: border-box; 
      height: 100%; 
      width:750rpx;
      overflow:hidden;
      .business-card {
        margin: 50rpx 50rpx 0rpx;
        box-sizing: border-box;
        width: 650rpx;
        height: 800rpx;
        background: #fff;
        border-radius: 16rpx;
        padding-left:  60rpx; 
        padding-top: 64rpx;
        box-shadow: 0rpx 0rpx 50rpx rgba(0,0,0,0.2);
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
        height:194rpx;
        margin-top: 40rpx;
      }
      .down-arrow {
        position: absolute;
        bottom: 67rpx;
        height: 23rpx;
        width: 100%;
        text-align: center;
        animation: myArrow 1.5s infinite alternate;
        >div {
          display: inline-block;
        }
      }
    }
    .second {
      position: relative;
      box-sizing: border-box;
      width: 750rpx;
      height: 100%;
      margin-top: 9rpx;
      overflow: hidden;
      .second-main {
        .theme {
          margin: 0 136rpx;
          width: 750rpx;
          height: 277rpx;
        }
        .slogan {
          margin-top: 120rpx;
          padding-left: 239rpx;
          height: 106rpx;
        }
        .go-to-official {
          background:#e90026;
          margin-left: 363rpx;
          width: 23rpx;
          height: 23rpx;
          border-radius:50%;
          position: relative;
          p {
            position: absolute;
            width: 23rpx;height: 23rpx;
            border-radius:50%;
            animation: myfirst 1s infinite alternate;
            background: rgba($color: #c9c9c9, $alpha: 0.15)
          }
          span {
            position: absolute;
            display:block;
            width: 23rpx;height: 23rpx;
            border-radius:50%;
            animation: second 1s infinite alternate;
            background: rgba($color:#e6e6e6, $alpha:0.17);
          }
        }
        .login-button {
          button {
            width: 464rpx;
            background:#f9f9f9;
            color: #e90026;
            border: 3rpx solid #e90026;
            border-radius: 50rpx;
            outline: transparent;
          }
          button::after {
            border: 0;
          } 
        }
      }
    }
  } 
  @keyframes myfirst{
    100% {transform: scale(5);}
  }
  @keyframes second{
    100% {transform: scale(10);}
  }
  @keyframes myArrow {
    from {}
    to {bottom: 40rpx;}
  } 
</style>
