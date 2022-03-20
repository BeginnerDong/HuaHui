<template>
    <div>
        <div style="width:100%;min-height:700px;margin-bottom:30px;overflow:hidden">
          <el-row>
            <el-col  :xs="20" :sm="6" :md="3" :span="3" v-for="(item, index) in mainData" :offset="1" style="margin-bottom:15px;">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.path" class="image">
                <div style="padding: 10px;">
                  <span class="time">{{item.create_time}}</span>
                  <div class="bottom clearfix">
                    <span class="time">{{ item.relation_table }}-{{item.relation_id}}-{{item.relation_status}}</span>
                    <el-button type="text" class="button" ><i class="el-icon-delete"   :data-id="item.id"@click="delImg"></i></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        
        <div style="width:100%;overflow-x:scroll;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
        
      </div>
</template>

<script>
  import picManageJs from './picManage.js'
  export default picManageJs
</script>

<style scoped>

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height:135px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
    

</style>
