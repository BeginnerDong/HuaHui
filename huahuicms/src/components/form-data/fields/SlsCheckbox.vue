<template>
  <div>
  
    <!-- 普通CheckBox -->
    <el-checkbox-group
      @change="onChange"
      v-bind="checkbox_group_attrs"
      v-model="submit_data[data.key]">
      
      <el-checkbox
        v-if="data.checkbox_list"
        v-for='(item,index) in data.checkbox_list'
        v-bind="checkbox_attrs"
        :key='index'
        :label="item[data.defaultProps.label]">
        {{item[data.defaultProps.value]}}
      </el-checkbox>
      <el-checkbox
        v-if="optionsData&&optionsData.length>0"
        v-for='(item,index) in optionsData'
        v-bind="checkbox_attrs"
        :key='index'
        :label="item[data.defaultProps.label]">
        {{item[data.defaultProps.value]}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-checkbox')
  Js.mixins = [{
    computed: {
      checkbox_group_attrs () {
        return this.Data.checkbox_group_attrs || {}
      },
      checkbox_attrs () {
        return this.Data.checkbox_attrs || {}
      }
    },
    methods: {
      onChange (v) {
        /*if (Array.isArray(v)) {
          this.submit_info[this.data.key] = []
          v.forEach((item) => {
            this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item])
          })
        }
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]});*/
        this.$emit('onChange', [this.data.key,v]);
      }
    }
  }]
  export default Js
</script>

<style scoped lang="less">

</style>
