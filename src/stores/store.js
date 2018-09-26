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
    async getMenuList () {
      return [
        {businessId: '1', businessName: '装卸业务', description: '各类大型装吊设备'},
        {businessId: '2', businessName: '搬家业务', description: '各类大型装吊设备'},
        {businessId: '3', businessName: '其它业务', description: '各类大型装吊设备'}
      ]
    },
    /**
     * @description 获取首页视频播放列表 文章列表
     */
    async getIndexOriginData () {
      const res = await request({
        method: 'get',
        url: `${apiDomain}/Website/refute_rumour/refute-rumour-list`,
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return res
    },
    /**
     * @description 获取文章列表
     */
    async getArticleList (store, page) {
      let url = `${apiDomain}//Website/refute_rumour/rumour-history?type=hot_list&start=${page}`
      const res = await request({
        url,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return res
    },
    /**
     * @description 获取视频列表
     */
    async getVideosList (store, page) {
      let url = `${apiDomain}//Website/refute_rumour/rumour-history?type=video_list&start=${page}`
      const res = await request({
        url,
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return res
    },
    /**
     * @param  {} {commit}
     * @param  { String } userId 用户ID
     * 检查用户是否已经存在于某一拼单中
     */
    async getDetail (store, docid) {
      let url = `${apiDomain}/Website/contents/content?docid=${docid}`
      const res = await request({
        method: 'get',
        url,
        header: {
          'content-type': 'application/json' // 默认值
        }
      })
      return res
    }
  }
})
