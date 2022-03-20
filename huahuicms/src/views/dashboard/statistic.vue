<template>
    <div>
        
        <el-row :gutter="10">
          <el-col :xs="24"  :md="11" class="basicBox" >
              
                <div id="myChart" class="chartBox" ></div>
              
          </el-col>
          <el-col :xs="24"  :md="11"  class="basicBox">
                <div id="pie" class="chartBox" ></div>
          </el-col >
          <el-col :xs="24"  :md="11"  class="basicBox">
            <div id="line" class="chartBox" ></div>
          </el-col>
          <el-col :xs="24"  :md="11" class="basicBox" ></el-col>
        </el-row>
    </div>
</template>

<script>
  import statisticJs from './statistic.js'
  export default statisticJs
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
    }
    .basicBox {
        margin-top:20px;
        margin-left:50px;
        min-height:350px;
        background:#fdfdfd;
        border:2px solid #edf3fb;
        border-radius:2%;
    }
    .chartBox {
        width:500px;
        height:300px;
        margin:0 auto;
        margin-top:30px!important;
    }
    

</style>
