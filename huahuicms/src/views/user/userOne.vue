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
            <el-option  :value="option_item.value" :label="option_item.label"></el-option>
          </template>
        </el-select>

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
      <list-data
        ref='list-data'
        @onClickBtn="onClickBtn"
        @pageChange="pageChange"
        @filtersChange="filtersChange"
        @initMainData="initMainData"
        @fieldChange="fieldChange"
        :mainData='mainData'
        :Pagination="paginate"
        :BtnInfo="btn_info"
        :FieldList='fields'
        :pagination='paginate'
        :optionData='optionData'
        :otherData='otherData'
      >
        <template slot="expand" slot-scope="slotProps">
        </template>
      </list-data>
    </el-main>
  </div>
</template>

<script>
  import userOneJs from './userOne.js'
  export default userOneJs
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
