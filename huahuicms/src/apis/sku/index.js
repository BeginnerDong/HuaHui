/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取sku列表',
    method: 'get',
    path: '/Common/Sku/get',
    type: 'post'
  },
  {
    name: '添加sku',
    method: 'add',
    path: '/Common/Sku/add',
    type: 'post'
  },
  {
    name: '编辑sku',
    method: 'update',
    path: '/Common/Sku/update',
    type: 'post'
  },

  {
    name: '删除sku',
    method: 'delete',
    path: '/Common/Sku/delete',
    type: 'post'
  },
  
]
