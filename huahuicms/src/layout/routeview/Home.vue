<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
  <div class="home">
    <head-nav ref="headNav"></head-nav>
    <div class="left-fixed-right-auto">
      <left-menu></left-menu>
      <div class="right-content">
        <div class="content" :style="{marginLeft:$store.state.leftmenu.width}">
          <tabs></tabs>
          <bread></bread>
          <div style="margin-top:10px;padding-top:5px">
            <!--<keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>-->
            <router-view ></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import HeadNav from '../head-nav/HeadNav.vue'
  import LeftMenu from '../left-menu/LeftMenu.vue'
  import Bread from '../bread/Bread.vue'
  import Tabs from '../tabs/Tabs.vue';

  export default {
    name: 'home',
    data () {
      return {
        
      }
    },
    components: {
      HeadNav, LeftMenu, Bread, Tabs
    },
    mounted () {
      const self = this;
      
      setTimeout(function(){
        document.getElementById("headNav").style.height = document.getElementById("header").clientHeight+'px';
        document.getElementById("admin-left").style.top = document.getElementById("header").clientHeight+'px';
      },300);
      window.addEventListener('resize', function(){

        if(document.body.clientWidth<=1200){
          self.$refs.headNav.isPhone = true;
        }else{
          self.$refs.headNav.isPhone = false;
        };
        
        document.getElementById("headNav").style.height = document.getElementById("header").clientHeight+'px';
        document.getElementById("admin-left").style.top = document.getElementById("header").clientHeight+'px';
      });
      
    },
    beforeDestroy() {
      window.removeEventListener('resize', function(){
        if(document.body.clientWidth<=1200){
          self.isPhone = true;
        }else{
          self.isPhone = false;
        };
        
        document.getElementById("headNav").style.height = document.getElementById("header").clientHeight+'px';
        document.getElementById("admin-left").style.top = document.getElementById("header").clientHeight+'px';
      });
    },
  }
</script>
<style scoped lang='less'>

  .content {
    /*background: #f1f2f7;*/
    background: #FFF;
    padding: 0px 16px;
  }

  .right-content {
    margin-bottom: 60px;
  }

.ql-editor{height: 500px;}
</style>
