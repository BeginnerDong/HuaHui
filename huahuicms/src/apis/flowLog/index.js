/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
export default [
  {
    name: '获取流水列表',
    method: 'get',
    path: '/Common/FlowLog/get',
    type: 'post'
  },
  {
    name: '添加流水',
    method: 'add',
    path: '/Common/FlowLog/add',
    type: 'post'
  },
  {
    name: '编辑流水',
    method: 'update',
    path: '/Common/FlowLog/update',
    type: 'post'
  },
  {
    name: '删除流水',
    method: 'delete',
    path: '/Common/FlowLog/delete',
    type: 'post'
  },
]
