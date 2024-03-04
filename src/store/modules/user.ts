import router from '@/router/index'
import * as types from '../mutation-types'
import { LoginParams, UserState } from '@/types/index'
import { ActionContext } from 'vuex'
import { userLogin, userRegister, getUserInfo } from '@/api/user'
import { ERR_OK, ERR_SUCCESS } from '@/api/config'
import { getToken, setToken, removeToken, removeUserInfo, setUserInfo, getUserInfo as getUserCacheInfo } from '@/utils/cache'

const state = {
  token: getToken(),
  userInfo: getUserCacheInfo()
}

const mutations = {
  [types.SET_TOKEN] (state: UserState, token: string) {
    state.token = token
  },
  [types.SET_USER_INFO] (state: UserState, userInfo: object) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login ({ commit }: ActionContext<UserState, any>, params: LoginParams) {
    try {
      const { code, result, message } = await userLogin(params)
      if (code === ERR_SUCCESS) {
        console.log(result)
        commit(`${types.SET_TOKEN}`, setToken(result.token))
        return Promise.resolve(true)
      } else {
        throw new Error(message)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async register ({ commit }: ActionContext<UserState, any>, params: LoginParams) {
    try {
      const { code, data, msg } = await userRegister(params)
      if (code === ERR_OK) {
        commit(`${types.SET_TOKEN}`, setToken(data))
        return Promise.resolve(true)
      } else {
        throw new Error(msg)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async getInfo ({ commit }: ActionContext<UserState, any>) {
    try {
      const { code, result, message } = await getUserInfo()
      if (code === ERR_SUCCESS) {
        commit(`${types.SET_USER_INFO}`, setUserInfo(result))
      } else {
        throw new Error(message)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  },
  logout ({ commit }: ActionContext<UserState, any>) {
    removeToken()
    removeUserInfo()
    commit(`${types.SET_TOKEN}`, '')
    commit(`${types.SET_USER_INFO}`, {})
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
