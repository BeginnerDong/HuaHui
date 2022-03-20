/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取订单列表',
    method: 'get',
    path: '/Common/Order/get',
    type: 'post'
  },

  {
    name: '编辑订单',
    method: 'update',
    path: '/Common/Order/update',
    type: 'post'
  },
  {
    name: '删除订单',
    method: 'delete',
    path: '/Common/Order/delete',
    type: 'post'
  },
  
]
