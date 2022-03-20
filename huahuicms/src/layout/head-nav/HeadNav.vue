<template>
  <div id="headNav" style="height:61px">

    <header class="head-nav" id="header" >
      <el-row>
        <el-col :span="4" class='logo-container'>
            <img style="display:block;margin:0 auto;margin-top:5px;" :src="this.$store.state.user.userinfo.mainImg.length>0?this.$store.state.user.userinfo.mainImg[0].url:'../../assets/logo-sm.png'" class='logo' alt="">
        </el-col>
        <el-col :span="16" >
          <el-menu
            style="background:#324057;color:white!important"
            theme="dark" :default-active="$store.state.router.headerCurRouter" class="el-menu-demo"
            mode="horizontal"
            unique-opened
            router
          >
            <el-menu-item
              v-for='(item,index) in mainData'
              :index="item.path"
              :key='item.path'
              v-if='!item.hidden&&checkInAuth(item.id)&&!isPhone'>
              {{item.name}}
            </el-menu-item>

            <el-submenu index="2" v-if="isPhone">
              <template slot="title">顶部导航</template>
              <el-menu-item
              v-for='(item,index) in mainData'
              :index="item.path"
              :key='item.path'
              v-if='!item.hidden&&checkInAuth(item.id)'>
                {{item.name}}
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-col>
        <el-col :span="4" class="userinfo">
          <!-- <span class='username'><i class='fa fa-user'></i>{{this.$store.state.user.userinfo.username}}</span> -->
          <span class='username' >
            <el-dropdown
              trigger="click"
              @command='setDialogInfo'>
                <span class="el-dropdown-link">
                    {{this.$store.state.user.userinfo.login_name}}
                <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!--<el-dropdown-item command='info'>修改信息</el-dropdown-item>-->
                    <!-- <el-dropdown-item
                      command='pass'
                      >修改密码</el-dropdown-item> -->
                    <!--<el-dropdown-item
                      command='set'
                      >系统设置</el-dropdown-item>-->
                    <el-dropdown-item
                      command='logout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </span>

        </el-col>
      </el-row>
    </header>


    <el-dialog size="small" :title="dialog.title" :visible.sync="dialog.show_pass" >
      <el-form style="margin:20px;width:80%;"
               label-width="100px"
               :model="dialog.user_info"
               :rules="dialog.user_info_rules"
               ref='user_info'>

        <el-form-item class='edit-form' label="登录名" prop='username'>
          <el-input v-model="dialog.user_info.login_name"  placeholder=''>
          </el-input>
        </el-form-item>

        <el-form-item class='edit-form' label="新密码" prop='password'>
          <el-input
            type='password'
            placeholder='新密码'
            auto-complete='off'
            v-model="dialog.user_info.password">
          </el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show_pass = false">取 消</el-button>
                <el-button type="primary" @click="updUserPass('user_info')">确 定</el-button>
            </span>
    </el-dialog>



  </div>
</template>

<script>
  import HeadNavJs from './HeadNav.js'

  export default HeadNavJs
</script>

<style scoped lang='less'>
  .logo-container {
    height: 60px;
  }

  .logo {
    height: 40px;
    width: auto;
    margin-left: 10px;
    margin-top: 10px;
  }

  .fa-user {
    position: relative;
    top: -2px;
    margin-right: 4px;
  }

  .head-nav {
    width: 100%;
    background: #324057;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    color: #FFF;
    border-bottom: 1px solid #1F2D3D;

    .logout {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      float: right;
      cursor: pointer;
    }

  }

  .userinfo {
    text-align: right;
  }

  .username {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    margin-top:60x;
    .el-dropdown {
      color: #FFF;
    };
    margin-right: 30px;

  }
  .el-menu-item{
    color:white!important;
    background-color: #324057!important;
  }
  .el-menu-item:hover {
    background-color: white!important;
    color:#324057!important;
  }

  .el-menu.el-menu--horizontal {
      border-bottom:none;
  }
</style>
