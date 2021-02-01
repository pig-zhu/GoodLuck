<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input v-model="queryParam.name" placeholder="" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">未开始</a-select-option>
                <a-select-option value="1">进行中</a-select-option>
                <a-select-option value="2">已上线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="负责人">
                <a-input-number v-model="queryParam.leader" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="开始日期">
                <a-date-picker v-model="queryParam.start_date" style="width: 100%" placeholder="请选择日期" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否公开">
                <a-select v-model="queryParam.isPublic" placeholder="请选择" default-value="0">
                  <a-select-option value="0">否</a-select-option>
                  <a-select-option value="1">是</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="del"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />结束项目</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /> </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="50" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleSub(record)">订阅报警</a>
        </template>
      </span>
    </s-table>
    <a-modal
      title="编辑项目"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <label for="">选择项目状态：</label>
      <a-select style="width: 100%; margin-bottom: 15px" v-model="status">
        <a-select-option value="0">未开始</a-select-option>
        <a-select-option value="1">进行中</a-select-option>
        <a-select-option value="2">已上线</a-select-option>
      </a-select>
      <label for="">添加项目成员：</label>
      <a-select mode="multiple" :labelInValue="true" v-model="member" style="width: 100%">
        <a-select-option v-for="item in memberList" :labelInValue="true" :key="item.id" :value="item.id">
          {{ item.nickname }}
        </a-select-option>
      </a-select>
    </a-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getProjectList, delProject, getUserList, editProject, alarms } from '@/api/project'

import StepByStepModal from '../modules/StepByStepModal'
import CreateForm from '../modules/CreateForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' },
  },
  {
    title: '项目名称',
    dataIndex: 'name',
  },
  {
    title: '项目成员',
    dataIndex: 'partner_name',
  },
  {
    title: '项目描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    customRender: (text) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '预计结束时间',
    dataIndex: 'end_time',
    customRender: (text) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' },
  },
]

const statusMap = {
  0: {
    status: 'default',
    text: '未开始',
  },
  1: {
    status: 'processing',
    text: '进行中',
  },
  2: {
    status: 'success',
    text: '已上线',
  },
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
  },
  data() {
    this.columns = columns
    return {
      // create model
      confirmLoading: false,
      status: null,
      member: [],
      memberList: [],
      userList: [],
      visible: false,
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        requestParameters.id = this.userInfo.id
        console.log('loadData request parameters:', requestParameters)
        return getProjectList(requestParameters).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      project_id: ''
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
  },
  created() {
    getUserList({ username: this.userInfo.username }).then((res) => {
      if (res.code == 200) {
        this.userList = [...res.data]
        this.userListCopy = [...res.data]
      }
    })
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  methods: {
    handleAdd() {
      let that = this
      this.$dialog(
        CreateForm,
        // component props
        {
          record: {},
          on: {
            ok() {
              that.loadData()
              that.$refs.table.refresh(true)
            },
          },
        },
        // modal props
        {
          title: '新增项目',
          width: 700,
          centered: true,
          maskClosable: false,
          okText: '提交',
        }
      )
    },
    handleEdit(record) {
      this.project_id = record.id
      this.mdl = record.partner_id.split(',')
      this.mdl.forEach((ele) => {
        this.userList.forEach((item, index) => {
          if (item.id == ele) {
            this.userList.splice(index, 1)
          }
        })
      })
      this.status = record.status
      this.memberList = [...this.userList]
      this.userList = [...this.userListCopy]
      this.visible = true
    },
    handleOk() {
      this.confirmLoading = true
      let params = {}
      params.status = this.status
      params.id = this.project_id
      if (this.member.length) {
        let keys = []
        let values = []
        params.partner_id = this.member.map(ele => {
          keys.push(ele.key)
          values.push(ele.label)
        })
        params.partner_id = keys.join(',')
        params.partner_name = values.join(',')
      } 
        editProject(params).then((res) => {
          this.confirmLoading = false
          this.visible = false
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$refs.table.refresh()
            this.member = []
          }else{
            this.$message.error(res.msg)
          }          
        })
    },
    del() {
      let del_id = this.selectedRowKeys.join(',')
      delProject({ id: del_id }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.member = []
      //   const form = this.$refs.createModal.form
      //   form.resetFields() // 清理表单数据（可不做）
    },
    handleSub(record) {
      if (record.status != 0) {
        alarms({
          id: record.id,
          userId: this.userInfo.id,
          content: record.name+'订阅报警',
          type: "0",
          createTime: this.$moment(new Date()).format('YYYY-MM-DD')
        }).then(res=>{
          if(res.code == 200 ){
            this.$socket.send('我发的')
            this.$message.success(`${record.name} 订阅成功！`)
          }else{
            this.$message.error(res.msg)
          }
        }) 
      } else {
        this.$message.error(`${record.name} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      }
    },
  },
}
</script>
