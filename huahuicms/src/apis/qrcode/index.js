/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 邀请码管理
 * @type {Object}
 */
export default [
  {
    name: '获取邀请码列表',
    method: 'get',
    path: '/Common/Qrcode/get',
    type: 'post'
  },
  {
    name: '添加邀请码',
    method: 'add',
    path: '/Common/Qrcode/add',
    type: 'post'
  },
  {
    name: '编辑邀请码',
    method: 'update',
    path: '/Common/Qrcode/update',
    type: 'post'
  },

  {
    name: '删除邀请码',
    method: 'delete',
    path: '/Common/Qrcode/delete',
    type: 'post'
  },

]
