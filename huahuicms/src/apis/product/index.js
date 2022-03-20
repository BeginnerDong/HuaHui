/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取产品列表',
    method: 'get',
    path: '/Common/Product/get',
    type: 'post'
  },
  {
    name: '添加产品',
    method: 'add',
    path: '/Common/Product/add',
    type: 'post'
  },
  {
    name: '编辑产品',
    method: 'update',
    path: '/Common/Product/update',
    type: 'post'
  },

  {
    name: '删除产品',
    method: 'delete',
    path: '/Common/Product/delete',
    type: 'post'
  },
  
]
