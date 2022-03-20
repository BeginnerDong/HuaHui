<template>
  <div>
    <el-radio-group
      v-model="submit_data[data.key]"
      :placeholder="data.desc"
      @change="onChange"
      v-bind="radio_group_attrs">
      
      <el-radio
        v-if="data.radio_list"
        v-for='(item,index) in data.radio_list'
        v-bind="radio_attrs"
        :key='index'
        :label="item[data.defaultProps.label]">
        {{item[data.defaultProps.value]}}
      </el-radio>
      <el-radio
        v-if="optionsData&&optionsData.length>0"
        v-for='(item,index) in optionsData'
        v-bind="radio_attrs"
        :key='index'
        :label="item[data.defaultProps.label]">
        {{item[data.defaultProps.value]}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  import Common from './js/Common'

  var Js = Common('sls-radio')
  Js.mixins = [{
    computed: {
      radio_group_attrs () {
        return this.Data.radio_group_attrs || {}
      },
      radio_attrs () {
        return this.Data.radio_attrs || {}
      }
    },
    methods: {
      onChange (v) {
        //this.submit_info[this.data.key] = '';
        //this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][v];
        //this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]});
        this.$emit('onChange', [this.data.key,v]);
      }
    }
  }]
  export default Js
</script>
