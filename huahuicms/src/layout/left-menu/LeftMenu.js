export default {
  name: 'left-menu',
  data () {
    return {
      menu_list: [],
      win_size: {
        height: ''
      },
      active_path:'',
      nbPath:'/adv/article/list'
    }
  },
  methods: {

    checkInAuth(item){

      var index = this.$store.state.user.userinfo.auth.indexOf(item);
      if(index>=0){
        return true;
      }else{
        return false;
      };
      
    },




    setSize () {
      this.win_size.height = (this.$$lib_$(window).height() - 50) + 'px'
    },
    toggleMenu () {
      console.log(99635)
      this.active_path = this.$route.path;
      this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open')
    },
    updateCurMenu (route) {
      const self = this;

      self.active_path = '';
      route = route||self.$route;
      if (route.matched.length) {
        var rootPath = route.matched[0].path;
        var fullPath = route.fullPath;
        self.$store.dispatch('set_cur_route', {
          rootPath,
          fullPath
        });
        var routes = self.$router.options.routes;
        for (var i = 0; i < routes.length; i++) {
          if (routes[i].path === rootPath && !routes[i].hidden) {
            self.menu_list = routes[i];
          };
        };
        this.active_path = this.$route.fullPath;
        this.nb_array = [route.matched[1].path];
      } else {
        self.$router.push('/404');
      };
    }

  },


  created () {
    this.setSize()
    this.$$lib_$(window).resize(() => {
      this.setSize()
    })
    this.updateCurMenu()
  },

  mounted () {
    // console.log(this.$store.state.user.userinfo.access);
  },


  watch: {

    $route (to, from) {
      
      this.updateCurMenu(to)
    }


  }

}
