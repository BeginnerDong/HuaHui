<template>
  <div class="list">

    <!--<sls-table-head
      @onSearch="onSearch"
      @onBtnEvent="onBtnEvent"
      :Batch="batch"
      :Search="search"
      :BtnInfo="btn_info">
      <span slot="sls-header-after"><slot name="header-after"></slot></span>
      <span slot="sls-header-before"><slot name="header-before"></slot></span>
    </sls-table-head>-->
   
    <el-header>
      <el-button
        v-for='(btn,index) in btn_info'
        v-if="btn.position=='header'&&(!btn.isHide||!btn.isHide(btn,self))&&hasAuth(btn,{
          data : {},
        })"
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
    </el-header>

    <el-table 
      border 
      style="width: 100%" 
      align='center'
      :data="list"
      @filter-change="filter_change"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <slot name="expand"
                :data="scope.row"
                :index="scope.$index"></slot>
        </template>
      </el-table-column>

      <el-table-column v-if='btn_info.batch!==false'
                       type="selection"
                       width="55">
      </el-table-column>

      <template v-for='(field,index) in fields'>
        <el-table-column
          v-if="field.listType=='normal'"
          :prop="field.key"
          :column-key="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :sortable="field.sort || false"
          :formatter='field.formatter'
          :filters='field.select_list'
          :filter-method="field.filter_method"
          :filter-multiple="field.filter_multiple"
          :style='field.style'
          :width='field.width'>
        </el-table-column>
        <el-table-column
          v-if="field.listType=='qrImg'"
          :prop="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :width='field.width'>
          <template slot-scope='scope' >
            <img :style="'width:'+field.width+';'+'height:'+field.height" :src="scope.row[field.key].path" alt="">
          </template>
        </el-table-column>
        <el-table-column
          v-if="field.listType=='headImgUrl'"
          :prop="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :width='field.width'>
          <template slot-scope='scope' >
            <img :style="'width:'+field.width+';'+'height:'+field.height" :src="scope.row[field.key]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          v-if='field.listType=="link"'
          :prop="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :width='field.width'>
          <template slot-scope='scope'>
            <a
              :target="field.link_target || '_self'"
              :href="scope.row[field.key]">{{field.link_text || scope.row[field.key]}}</a>
          </template>
        </el-table-column>
        <el-table-column
          v-if='field.listType=="custom"'
          :prop="field.key"
          :label="field.label"
          :align="field.align || 'center'"
          :width='field.width'>
          <template slot-scope='scope'>
            {{field.custom(scope.row,funcTransfer())}}
          </template>
        </el-table-column>
        <el-table-column
          v-if='field.listType=="deal"'
          :label="field.label || '操作'"
          :width="field.width || 160"
        >
          <template slot-scope='scope'>
            <el-button
              v-for='(btn,index) in btn_info'
              v-if="btn.position=='list'&&(!btn.isHide||!btn.isHide(scope.row,self))&&hasAuth(btn,{
                list     : list,
                data     : scope.row,
                dataIndex: scope.$index,
                btnIndex : index,
                btn      : btn
              })"
              :key='index'
              :type="btn.type || 'info'"
              :icon="btn.icon || 'view'"
              :size="btn.size || 'mini'"
              @click='onBtnEvent({list:list,data:scope.row,dataIndex:scope.$index,btnIndex:index,btn:btn})'>
                {{
                  typeof btn.text === 'string' ? btn.text : (typeof btn.text === 'function' ? btn.text({
                  list     : list,
                  data     : scope.row,
                  dataIndex: scope.$index,
                  btnIndex : index,
                  btn      : btn
                   }) : '')
                }}
            </el-button>
          </template>
        </el-table-column>
      </template>




      <el-table-column type="expand"
                       :context="_self"
                       v-if='expand && expand.show && expand.show===true && expand.position && expand.position==="right"'>
        <template slot-scope="scope">
          <slot name="expand"
                :data="scope.row"
                :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class='btm-action'>
      <el-pagination
        v-if='pagination'
        class='pagination'
        :page-sizes="pagination.page_sizes"
        :page-size="pagination.pagesize"
        :page-count="pagination['page-count']"
        :layout="pagination.layout"
        :total="pagination.count"
        :current-page='pagination.current_page'
        @current-change='onChangeCurrentPage'
        @size-change='onChangePageSize'>
      </el-pagination>
    </el-col>


    <el-dialog  title="项目信息" :visible.sync="dialogFormVisible"  id="dialog">
      <div class="form">
          <form-data
            :FieldList='form_fields'
            :formData="formData"
            :OptionData="optiondata"
            :Token="token"
            @onSubmit='onSubmit'
            @fieldChange='fieldChange'>
          </form-data>
      </div>            
    </el-dialog>


















  </div>
</template>

<script>
  import ListDataJs from './ListData.js'

  export default ListDataJs
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
  }
</style>
