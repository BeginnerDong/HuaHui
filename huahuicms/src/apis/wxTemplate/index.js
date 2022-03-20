/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 微信模板消息
 * @type {Object}
 */
export default [

  {
    name: '获取模板信息',
    method: 'get',
    path: '/Common/WxTemplate/get',
    type: 'post',
  },
  {
    name: '新增模板信息',
    method: 'add',
    path: '/Common/WxTemplate/add',
    type: 'post',
  },
  {
    name: '删除模板信息',
    method: 'delete',
    path: '/Common/WxTemplate/delete',
    type: 'post',
  },
  {
    name: '更新模板信息',
    method: 'update',
    path: '/Common/WxTemplate/update',
    type: 'post',
  },

]
