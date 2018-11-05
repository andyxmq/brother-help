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
    async getUserInfo (store, {nickname, phone}) {
      let url = `${apiDomain}/wechat/business_card?`
      if (phone !== undefined && phone !== 'undefined') {
        url = `${url}phone=${phone}`
      } else if (nickname !== undefined && phone !== 'undefined') {
        url = `${url}nickname=${nickname}`
      } else {
        return []
      }
      const { result } = await request({
        url,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return result
    },
    async getQrCode (store, phone, page) {
      if (!phone) {
        return ''
      }
      let url = `${apiDomain}/api/wx/acodeunlimit?appid=wx00d26f5daa74e582&scene=${phone}`
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
