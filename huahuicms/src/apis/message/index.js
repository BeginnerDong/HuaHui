/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取留言列表',
    method: 'get',
    path: '/Common/Message/get',
    type: 'post'
  },
  {
    name: '添加留言',
    method: 'add',
    path: '/Common/Message/add',
    type: 'post'
  },
  {
    name: '编辑留言',
    method: 'update',
    path: '/Common/Message/update',
    type: 'post'
  },

  {
    name: '删除留言',
    method: 'delete',
    path: '/Common/Message/delete',
    type: 'post'
  },
  
]
