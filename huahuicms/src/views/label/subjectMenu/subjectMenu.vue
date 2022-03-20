<template>
  <div class="list">
  <el-header style="border-bottom: 1px solid #e4e7ed;">
    
    <el-select 
      v-model="searchForm.status"  
      @change="(value) => {
        if(searchForm.status){searchItem.status = searchForm.status;}else{delete searchItem.status};
        initMainData();
      }" 
      placeholder="请选择状态" 
    >
      <el-option value="1" label="开启"></el-option>
      <el-option value="-1" label="关闭"></el-option>

    </el-select>
  </el-header>
  <el-main>
    <tree-data
      ref='tree-data'
      @onClickBtnAdd="onClickBtnAdd"
      @onClickBtn="onClickBtn"
      @onClickBtnDelete="onClickBtnDelete"
      @onClickBtnBatchDelete="onClickBtnBatchDelete"
      @onClickBtnUpdate="onClickBtnUpdate"
      @onClickBtnSelect="onClickBtnSelect"
      @pageChange="pageChange"
      @onChangePageSize="onChangePageSize"
      @onSelectionChange="onSelectionChange"
      @onSearch="onSearch"
      @filtersChange="filtersChange"
      @initMainData="initMainData"
      :MainData='mainData'
      :Pagination="paginate"
      :Search="search_data"
      :BtnInfo="btn_info"
      :FieldList='fields'
      :pagination='paginate'
      :optionData='optionData'
      :otherData='otherData'
      :defaultProps='defaultProps'
    >
      <!--<span slot="header-after">我是自定义的header-after内容</span>-->
      <!--<span slot="header-before">我是自定义的header-before内容</span>-->
    </tree-data>
  </el-main>
    
  </div>
</template>

<script>
  import subjectMenuJs from './subjectMenu.js'
  export default subjectMenuJs
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
    height: 46px;
  }

  .pagination {
    display: inline-block;
  }
</style>
