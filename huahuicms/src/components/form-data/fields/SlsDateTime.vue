<template>
  <div>
    <el-date-picker
      @change="onChange"
      v-model="modeltime"
      v-bind="date_time_attrs"
      value-format="timestamp"
      type="datetime"
      :placeholder="data.desc">
    </el-date-picker>
    
  </div>
</template>
<script>
  import Common from './js/Common'

  var Js = Common('sls-date-time')
  Js.mixins = [{
   
    computed: {
      date_time_attrs () {
        return this.Data.date_time_attrs || {}
      },
      modeltime: {
        // getter
        get: function () {
          if(parseInt(this.submit_data[this.data.key])<10000000000){
            return parseInt(this.submit_data[this.data.key])*1000;
          }else{
            return this.submit_data[this.data.key];
          }
        },
        // setter
        set: function (newValue) {
          this.submit_data[this.data.key] = newValue
        }
      }
    },
    created () {
      
    },
    methods: {
      onChange (v) {
        this.$emit('onChange', [this.data.key,v]);
        //this.events.change && this.events.change(v)
      }
    }
  }]
  export default Js
</script>
