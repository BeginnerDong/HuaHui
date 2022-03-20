/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import func from '../register/func.js'
Vue.use(Router)

// import { Home } from 'layout/'
import { Login } from 'views/'

import Adv from './adv/'
import Function from './function/'
import Demo from './demo/'
import components from './components/'
import User from './user/'
import Label from './label/'
import Article from './article/'
import Product from './product/'
import FlowLog from './flowLog/'
import ThirdApp from './thirdApp/'
import Order from './order/'
import Message from './message/'
import Dashboard from './dashboard/'

const router = new Router({


  routes: [
    {
      path: '/',
      name: 'Hello',
      hidden: true,
      meta: {
        noRequireAuth: true,
        application:['notInTab','notInAuth']
      },
      redirect (to) {
        return 'login'
      }
    }, 
   

    {
      path: '/login',
      name: '登录',
      hidden: true,
      meta: {
        noRequireAuth: true,
        application:['notInTab','notInAuth']
      },
      component: Login
    },
    Dashboard,
    User,
    Label,
    Article,
    Product,
    FlowLog,
    ThirdApp,
    Order,
    Message,
  ]
});

router.beforeEach((to, from, next) => {
    console.log('router.beforeEach',to)
    var length = to.matched.length;
    var checkAuth = length+'-'+to.path;
    var auth = store.getters.getUserinfo.auth;
    
    var routes = router.options.routes;
    console.log('router.beforeEach_array',routes);
    
    if(to.meta.children){
      for (var i = 0; i < to.meta.children.length; i++) {
        var index = auth.indexOf(to.meta.children[i]);
        if(index>=0){
          var path = auth[index].split("-")[1];
          next({
              path:path,
          });
          return;
        }
      };
      func.notify('无权限','error');
      from();
      return;
    }else if((to.meta&&to.meta.application&&to.meta.application.indexOf('notInAuth')==-1)||!to.meta.application){

      if(auth&&!(auth.indexOf(checkAuth)>=0)){
        func.notify('无权限','error');
        return;
      };
    };
    




    if (to.matched.some(r => r.meta.noRequireAuth)) {
        store.dispatch('update_tabs', {
          route: to
        });
        next();

    }else{
        console.log(store.getters.getToken);
        if (store.getters.getToken) {
            store.dispatch('update_tabs', {
              route: to
            });
            next();
        }else {
            store.dispatch('update_tabs', {
              route: to
            });
            next({
                path: '/login',
                noRequireAuth: true,
            })
        }
    }
});

export default router
