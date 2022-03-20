/**
 * Created by sailengsi on 2017/5/10.
 */
import {
  store
} from 'utils/'

import * as types from './mutations_types'

export default {
  [types.UPDATE_USERINFO] (state, postData) {
    state.userinfo = postData.userinfo || {}
    state.token = postData.token || {}
    store.set('userinfo', state.userinfo)
    store.set('token', state.token)
  },

  [types.REMOVE_USERINFO] (state) {
    store.remove('userinfo')
    store.remove('token')
    state.userinfo = {}
  },

  [types.UPDATE_REMUMBER] (state, userDb) {
    state.remumber.remumber_flag = userDb.remumber_flag
    state.remumber.remumber_login_info = userDb.remumber_login_info

    store.set('remumber_flag', state.remumber.remumber_flag)
    store.set('remumber_login_info', state.remumber.remumber_login_info)
  },

  [types.REMOVE_REMUMBER] (state) {
    store.remove('remumber_flag')
    store.remove('remumber_login_info')

    state.remumber.remumber_flag = false
    state.remumber.remumber_login_info = {
      login_name: '',
      token: ''
    }
    console.log(999)
  }
}
