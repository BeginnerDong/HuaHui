/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 优惠券管理
 * @type {Object}
 */
export default [
  {
    name: '获取优惠券列表',
    method: 'get',
    path: '/Common/Coupon/get',
    type: 'post'
  },
  {
    name: '添加优惠券',
    method: 'add',
    path: '/Common/Coupon/add',
    type: 'post'
  },
  {
    name: '编辑优惠券',
    method: 'update',
    path: '/Common/Coupon/update',
    type: 'post'
  },

  {
    name: '删除优惠券',
    method: 'delete',
    path: '/Common/Coupon/delete',
    type: 'post'
  },
  
]
