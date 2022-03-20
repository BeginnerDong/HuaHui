/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '登录',
    method: 'login',
    path: '/Func/Common/loginByUp',
    tokenFlag:'false',
    type: 'post'
  },

  {
    name: '获取用户',
    method: 'get',
    path: '/Base/User/get',
    type: 'post'
  },
  {
    name: '删除用户',
    method: 'delete',
    path: '/Base/User/delete',
    type: 'post'
  },
  {
    name: '更新用户',
    method: 'update',
    path: '/Base/User/update',
    type: 'post'
  },
  {
    name: '新增用户',
    method: 'add',
    path: '/Base/User/add',
    type: 'post'
  },
  {
    name: '更新权限',
    method: 'auth',
    path: '/Project/Solely/setAuth',
    type: 'post'
  },
  
]
