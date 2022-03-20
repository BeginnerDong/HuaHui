<template>

  
  <div class='tabs' >
    <div  @click="clearTab" style="width:30px;padding-top:10px" >
      <i class="el-icon-delete" style="display:block;width:16px;margin:0 auto;"></i>
    </div>
    
      <div>
        <el-tabs
          :value="$route.fullPath"
          type="card"
          closable
          @tab-click="onTabClick"
          @tab-remove="onRemoveTab">
          <el-tab-pane
            v-for="(route, index) in $store.state.tabs.list"
            :key="route.path"
            :label="route.name"
            :name="route.path">

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sls-tabs',
    data() {
      return {}
    },
    methods: {

      clearTab(){
        console.log(this.$route)
        var res = this.$store.dispatch('clear_tabs', {route:this.$route});
      },

      onTabClick(tab) {
        console.log('this.$store.state.tabs.list',this.$store.state.tabs.list);
        for(var j = 0,len = this.$store.state.tabs.list.length; j < len; j++){
        console.log('tabtest',this.$$lib__.isMatch(this.$store.state.tabs.list[j], {path:tab.name}))
          if(this.$$lib__.isMatch(this.$store.state.tabs.list[j], {path:tab.name})){
            var path = this.$store.state.tabs.list[j].path
          };
        };

        if(path){
          this.$router.push(path);
        }else{
          this.$message({
            showClose: true,
            message: 'tabpath不存在',
            type: 'error'
          });
        };
      },

      onRemoveTab(targetName) {
//        console.log(targetName);
        this.$store.dispatch('remove_tabs', {
          path: targetName
        }).then(() => {
          if (this.$route.path === targetName) {
            if (this.$store.state.tabs.list.length) {
              this.$router.push({
                path: this.$store.state.tabs.list[0].fullPath,
                params: this.$store.state.tabs.list[0].params,
                query: this.$store.state.tabs.list[0].query
              });
            } else {
              this.$router.push('/');
            }
          }
        });
      }
    },
    mounted() {
//      console.log('this.$store.state.tabs.list', this.$store.state.tabs.list);
//      console.log('this.$store.state.tabs.pathList', this.$store.state.tabs.pathList);
//      console.log('this.$store.state.tabs.tabs_cur', this.$store.state.tabs.tabs_cur);
    },
    created() {
    },
    watch: {
      $route (to, from) {
       
      }
    }
  }
</script>

<style scoped lang='less'>
  .tabs{
    padding: 0px 23px;
    display:flex;
  }

  .clear{
    padding: 0 16px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #8391a5;
    position: relative;
    border:1px solid #d1dbe5;
  }

  
  .el-tabs__item.is-active {
    color: #409EFF!important;
  }
</style>
