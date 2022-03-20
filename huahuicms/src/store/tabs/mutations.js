/**
 * Created by sailengsi on 2017/5/10.
 */
import {store} from 'utils/'
import _ from 'underscore'
import * as types from './mutations_types'

export default {
  [types.UPDATE_TABS](state, {route}) {
    console.log(route)
    console.log('UPDATE_TABS',route)
    state.tabs_cur = route.path;
    if ((route.meta.application&&route.meta.application.indexOf('notInTab')==-1)||!route.meta.application){
      var hasOne = false;
      for(var j = 0,len = state.list.length; j < len; j++){

          if(_.isMatch(state.list[j], {name: route.name,path: route.fullPath})){
            hasOne = true
          };
          
      };

      if (!hasOne) {
        
        state.list.push({
          name: route.name,
          path: route.fullPath,
          params: route.params,
          query: route.query,
          hash: route.hash
        })
        // console.log('更新tabs route', route)
        
        store.set('tabs_list', state.list)
        
      }
    }
  },

  [types.REMOVE_TABS](state, {path}) {

    
    for(var j = 0,len = state.list.length; j < len; j++){
        if(_.isMatch(state.list[j], {path: path})){
          var index = j
        };
    };

    if (!index) {
      console.error('没有在缓存的tabs中找到path：', path);
    }else{
      state.list.splice(index, 1);
      store.set('tabs_list', state.list)
    }
  },


  [types.CLEAR_TABS](state, {route}) {

      state.list = [{
          name: route.name,
          path: route.fullPath,
          params: route.params,
          query: route.query,
          hash: route.hash
        }];
      store.set('tabs_list', state.list);
      
  },


}
