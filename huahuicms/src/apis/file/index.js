/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取file列表',
    method: 'get',
    path: '/Common/File/get',
    type: 'post'
  },
  {
    name: '添加file',
    method: 'add',
    path: '/Common/File/add',
    type: 'post'
  },
  {
    name: '编辑file',
    method: 'update',
    path: '/Common/File/update',
    type: 'post'
  },

  {
    name: '删除file',
    method: 'delete',
    path: '/Common/File/delete',
    type: 'post'
  },
  
]
