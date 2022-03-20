<template>
  <div class="list">
    <el-header>
      <template v-for="item in fields">
        <el-input v-if="item.header_search&&item.header_search_type=='input'" :style="item.header_search_style"  @blur="(e)=>{item.changeFunc(e,self)}" :placeholder="item.placeholder" clearable>
        </el-input>
        <el-select 
          v-if="item.header_search&&item.header_search_type=='select'"
          :style="item.header_search_style"
          v-model="item.value"  
          @change="(value) => {
            item.changeFunc(value,self)
          }" 
          :placeholder="item.placeholder"
          clearable
        >
          <template v-for="option_item in item.options">
            <el-option  :value="option_item[item.defaultProps['value']]" :label="option_item[item.defaultProps['label']]"></el-option>
          </template>
        </el-select>
        <el-cascader
          v-if="item.header_search&&item.header_search_type=='cascader'"
          :options="typeof item.options === 'function'?item.options(self):optionData[item.options]"
          :props="item.defaultProps"
          :placeholder="item.placeholder"
          @change="(value) => {
            item.changeFunc(value,self)
          }" 
          change-on-select
          clearable
        >
        </el-cascader>
        <el-date-picker
          v-if="item.header_search&&item.header_search_type=='datePicker'"
          is-range
          v-model="item.header_search_value"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始"
          end-placeholder="结束"
          :placeholder="item.placeholder"
          @change="(value) => {
            item.changeFunc(value,self)
          }" 
        >
        </el-date-picker>

      </template>
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
  import dataJs from './data.js'
  export default dataJs
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
