/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 系统设置
 * @type {Object}
 */
export default [

  {
    name: '获取微信账号信息',
    method: 'get',
    path: '/Common/Wechat/get',
    type: 'post',
    
  },
  {
    name: '新增微信账号信息',
    method: 'add',
    path: '/Common/Wechat/add',
    type: 'post',
    
  },
  {
    name: '删除微信账号信息',
    method: 'delete',
    path: '/Common/Wechat/delete',
    type: 'post',
    
  },
  {
    name: '更新微信账号信息',
    method: 'update',
    path: '/Common/Wechat/update',
    type: 'post',
    
  },
  
]