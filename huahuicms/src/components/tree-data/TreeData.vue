<template>
  <div class="list" >
  <el-header style="border-bottom: 1px solid #e4e7ed;height:60px;padding:10px;">
      <el-button
        v-for='(btn,index) in btn_info'
        v-if="btn.position=='header'"
        :key='index'
        :type="btn.type || 'info'"
        :icon="btn.icon || 'view'"
        :size="btn.size || 'mini'"
        @click='onBtnEvent({data:{},btnIndex:index,btn:btn})'>
          {{
            typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
            data     : {},
            btnIndex : index,
            btn      : btn
             }) : '')
          }}
      </el-button>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText" style="width:260px!important">
    </el-input>
  </el-header>
  <el-main style="border-bottom: 1px solid #e4e7ed;height:500px">
    <el-tree
      class="filter-tree"
      :node-key="treeData_defaultProps.value"
      :data="treeData_mainData"
      :props="treeData_defaultProps"
      :default-checked-keys="treeData_defaultChecked"
      
      show-checkbox
      accordion
      check-strictly
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>
    
  </el-main>
  <el-footer style="padding-top:10px;border-bottom: 1px solid #e4e7ed;height:50px">
    <el-button
        v-for='(btn,index) in btn_info'
        v-if="btn.position=='footer'"
        :key='index'
        :type="btn.type || 'info'"
        :icon="btn.icon || 'view'"
        :size="btn.size || 'mini'"
        @click='onBtnEvent({data:{},btnIndex:index,btn:btn})'>
          {{
            typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
            data     : {},
            btnIndex : index,
            btn      : btn
             }) : '')
          }}
      </el-button>
  </el-footer>

  <el-dialog  title="项目信息" :visible.sync="dialogFormVisible"  id="dialog">
    <div class="form">
        <form-data
          :FieldList='form_fields'
          :formData="formData"
          :OptionData="optiondata"
          :Token="token"
          @onSubmit='onSubmit'>
        </form-data>
    </div>            
  </el-dialog>


















  </div>
</template>

<script>
  import TreeDataJs from './TreeData.js'

  export default TreeDataJs
</script>
<style scoped lang='less'>
  .demo-form-inline {
    display: inline-block;
    float: right;
  }

  .btm-action {
    margin-top: 20px;
    text-align: center;
  }

  .actions-top {
    /*line-height : 46px;*/
  }

  .pagination {
    display: inline-block;
  }

  .list {

    table {

      img {
        max-width: 100%;
        height: auto;
      }

    }
    border: 1px solid #e4e7ed;

  }
</style>
