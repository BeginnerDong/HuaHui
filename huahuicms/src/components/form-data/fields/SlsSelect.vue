<template>
  <div>
  
    <el-select
      v-model="submit_data[data.key]"
      @change="onChange"
      @visible-change="onVisibleChange"
      @remove-tag="onRemoveTag"
      @clear="onClear"
      v-bind="select_attrs"
      :multiple='data.multiple ? true : false'
      :placeholder="data.desc">
        <template v-if="optionsData&&JSON.stringify(optionsData)!='[]'">
          <el-option
            v-if="optionsData&&JSON.stringify(optionsData)!='[]'"
            v-for='(item,index) in optionsData'
            v-bind="option_attrs"
            :key='index'
            :value="item[data.defaultProps.value]"
            :label="item[data.defaultProps.label]">
          </el-option>
        </template>
        <template v-else>
          <el-option
            v-for='(item,index) in data.options'
            v-bind="option_attrs"
            :key='index'
            :value="item[data.defaultProps.value]"
            :label="item[data.defaultProps.label]">
          </el-option>
        </template> 
    </el-select>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-select')
  Js.mixins = [{
    data () {
      return {
        
      }
    },
    computed: {
      select_attrs () {
        return this.Data.select_attrs || {}
      },
      
      option_attrs () {
        return this.Data.option_attrs || {}
      }
    },
    watch:{
      optionsData(){
        console.log('optionsDataChange',this.optionsData);
        this.submit_data[this.data.key] = '';
      },
      defaultValue(){
        console.log('defaultValue',this.defaultValue);
      },
      Data(){
        console.log('Data',this.Data);
      }
    },
    methods: {
      onChange (v) {
        console.log(v);
        //if (v) {
          //if (Array.isArray(v)) {
            //this.submit_info[this.data.key] = []
            //v.forEach((item) => {
              //this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item])
            //})
          //} else {
            //this.submit_info[this.data.key] = ''
            //this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][v]
          //}
        //}
        this.$emit('onChange', [this.data.key,v]);
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]})
      },
      onVisibleChange () {
        this.events['visible-change'] && this.events['visible-change']()
      },
      onRemoveTag () {
        this.events['remove-tag'] && this.events['remove-tag']()
      },
      onClear () {
        this.events.clear && this.events.clear()
      }
    },
    created () {

    }
  }]
  export default Js
</script>

<style scoped lang="less">

</style>
