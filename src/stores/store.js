import Vue from 'vue'
import Vuex from 'vuex'

import apiDomain from '../constant'
import { request } from '../utils/wx'
Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    /**
     * @description 获取首页菜单列表
     */
    async getUserInfo (store, nickname) {
      if (!nickname) {
        return {}
      }
      const { result } = await request({
        url: `${apiDomain}/wechat/business_card?nickname=${nickname}`,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return result
    },
    async getQrCode (store, nickname, page) {
      const { status, result } = await request({
        url: `${apiDomain}/api/wx/acodeunlimit?appid=wx00d26f5daa74e582&scene=${nickname}&page=`,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      var tempResult = ''
      if (status === 'success') {
        tempResult = result
      }
      return tempResult
    }
  }
})
