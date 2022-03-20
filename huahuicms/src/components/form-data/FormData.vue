<template>
 
  <el-form style=""
           label-width="100px"
           ref='form-data'
           :inline="setting.inline"
           :rules='rules'
           :model='FormData'>
    <el-form-item
      class='edit-form'
      v-for='(field,index) in fields'
      v-bind="field.attrs || {}"
      :key='index'
      :label="field.label"
      :prop='field.key'>
      <component
        :Data="field"
        :defaultValue="FormData"
        :SubmitInfo="submit_info"
        :TempFieldObj="temp_field_obj"
        :is="components[field.type] || 'SlsInput'"
        :options="typeof field.options === 'object'?field.options:(typeof option_Data[field.options]=== 'object'?option_Data[field.options]:[])"
        @onChange="onChange"
      >
      </component>
      
    </el-form-item>
    <el-form-item>

      <el-button type="primary" @click='onSubmit("form-data")'>提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import FormDataJs from './FormData.js'
  export default FormDataJs
</script>

<style scoped lang='less'>
  .demo-form-inline {
    display: inline-block;
    float: right;
  }
</style>
