<template>
  <div class="left" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
    <div id='left-menu' style="text-align:center">

      <el-menu style="background:#324057;color:white!important"  class="el-menu-vertical-demo " theme="dark" unique-opened router 
      :default-openeds="nb_array"
      >
            <template v-for="item in menu_list['children']">
                <template v-if="item.children&&checkInAuth(item.id)">
                    <el-submenu
                     :index="menu_list.path+'/'+item.path"
                    >
                        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
                        <el-menu-item  v-for="(subItem,i) in item.children" v-if="!subItem.hide&&checkInAuth(subItem.id)" :key="i" :index="menu_list.path+'/'+item.path+'/'+subItem.path" :style="{'padding-left':$store.state.leftmenu.menu_flag? '40px' : '23px'}"
                        :class="$route.path==(menu_list.path+'/'+item.path+'/'+subItem.path)?'is-active':''" 
                        >{{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item v-if="!item.hide&&checkInAuth(item.id)" :index="menu_list.path+'/'+item.path" :style="{'padding-left':$store.state.leftmenu.menu_flag? '40px' : '23px'}" >
                        <i :class="item.icon"></i>
                        <span v-if="$store.state.leftmenu.menu_flag">
                          {{item.name}}
                        </span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        

       

      
      <div class="toggle-menu"
           @click='toggleMenu'
           :style='{left:$store.state.leftmenu.width}'>
        <i
          :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftMenu from './LeftMenu.js'

  export default LeftMenu
</script>
<style>
  .el-submenu__title{
    color:white!important;
    background-color: #324057!important;
  }
  .el-submenu__title:hover {
    background-color: #324057!important;
  }
  .el-menu-item{
    color:white!important;
    background-color: #324057!important;
  }
  .el-menu-item:hover {
    background-color: white!important;
    color:#324057!important;
  }


  .el-menu-item.is-active{
    background-color: white!important;
    color: #324057!important;
  }
</style>

<style scoped lang='less'>
  @import url(./LeftMenu.less);
</style>

