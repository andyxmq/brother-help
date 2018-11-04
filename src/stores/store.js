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
        url: `${apiDomain}/wechat/business_card?nickname=${encodeURIComponent(nickname)}`,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return result
    },
    async getQrCode (store, nickname, page) {
      if (!nickname) {
        return ''
      }
      let url = `${apiDomain}/api/wx/acodeunlimit?appid=wx00d26f5daa74e582&scene=${encodeURIComponent(nickname)}`
      if (page) {
        url = `${url}&page=${encodeURIComponent(page)}`
      }
      const { status, result } = await request({
        url,
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
