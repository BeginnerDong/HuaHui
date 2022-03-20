<template>
  <div class="">
    <transition name="fade">
      <!--<keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>-->
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'content',
    data () {
      return {}
    },
    methods: {},
    created () {

    },
    mounted () {

    }
  }
</script>

<style scoped lang='less'>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
