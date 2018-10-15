import Vue from 'vue'
import Vuex from 'vuex'

// import apiDomain from '../constant'
// import { request } from '../utils/wx'
import { menuList, craneType } from '../data/data'
Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    /**
     * @description 获取首页菜单列表
     */
    async getMenuList () {
      return menuList
    },

    /**
     * @description 获取装卸吊车的tabs表
     */
    async getCraneType () {
      return craneType
    }
  }
})
