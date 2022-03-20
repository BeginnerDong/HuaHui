import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../../router/'
import { Message } from 'element-ui';
import store from 'store/'
Vue.use(VueAxios, axios)

// 导入封装的回调函数
import {
  cbs,
  gbs
} from 'config/'

// 动态设置本地和线上接口域名
Vue.axios.defaults.baseURL = gbs.host
Vue.axios.defaults.timeout = 1800000;











/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */
export default function ({
                           type,
                           pathParams,
                           path,
                           data,
                           fn,
                           errFn,
                           tokenFlag,
                           headers,
                           opts
                         } = {}) {
  var p = path
  if (typeof path === 'function') {
    p = path(pathParams || {})
  }
  console.log(p);

  if(tokenFlag!='false'){
    data.token = store.getters.getToken;
  };
  var options = {
    method: type,
    url: p,
    headers: headers && typeof headers === 'object' ? headers : {}
  };

  options[type === 'get' ? 'params' : 'data'] = data
  
  // 分发显示加载样式任务
  store.dispatch('show_loading');
  console.log('tokenFlag',tokenFlag);
  
  // axios内置属性均可写在这里
  if (opts && typeof opts === 'object') {
    for (var f in opts) {
      options[f] = opts[f]
    }
  }

  //return Vue.axios(options);
  // console.log(options);

  // 发送请求
  return Vue.axios(options).then((res) => {

    store.dispatch('hide_loading')
    if (res.data[gbs.api_status_key_field] === gbs.api_status_value_field) {
      return res.data;
    } else {

      if(res.data[gbs.api_status_key_field] == 200000){
        router.push('/login')
      }else{
        return res.data;
      };
      
      /*if (gbs.api_custom[res.data[gbs.api_status_key_field]]) {
        gbs.api_custom[res.data[gbs.api_status_key_field]].call(this, res.data)
      } else {
        if (errFn) {
          errFn.call(this, res.data)
        } else {
          cbs.statusError.call(this, res.data)
        }
      }*/

    }
  }).catch((err) => {

    Message({
      showClose: true,
      message: '网络故障：',
      type: 'error'
    });
    
    
    //this.$store.dispatch('hide_loading')
    // cbs.requestError.call(this, err);
  });

  








};
