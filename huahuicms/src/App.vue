<template>
  <div id="app">
    <transition name="bounce">
      <!--<keep-alive>
        <router-view></router-view>
      </keep-alive>-->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data () {
      return {}
    },
    methods: {

      onTestRestFulApi(){
        this.$$api_test_getArticle({
          pathParams:{
            id:1
          },
          fn:()=>{}
        });
      },
      onUpdateTabs() {
        console.log(this.$route);
        this.$store.dispatch('update_tabs', {
          route: this.$route
        });
      },
      init(){
//        this.onTestRestFulApi();
//        this.onUpdateTabs();
      }

    },
    mounted () {
      this.init()
    },
    watch: {

      $route (to, from) {
        console.log('appjs')
        console.log(to)
        //this.init();
      }

    }
  }
</script>

<style lang="less">
  * {
    
    margin: 0px;
    padding: 0px;
  }

  html,body {
    width:100%;
    height:100%;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
    -webkit-animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .2s;
    -webkit-animation: bounce-out .2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
