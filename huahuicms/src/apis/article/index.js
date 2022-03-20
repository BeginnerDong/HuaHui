/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取文章列表',
    method: 'get',
    path: '/Common/Article/get',
    type: 'post'
  },
  {
    name: '添加文章',
    method: 'add',
    path: '/Common/Article/add',
    type: 'post'
  },
  {
    name: '编辑文章',
    method: 'update',
    path: '/Common/Article/update',
    type: 'post'
  },

  {
    name: '删除文章',
    method: 'delete',
    path: '/Common/Article/delete',
    type: 'post'
  },
  
]
