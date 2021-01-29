<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="项目名称"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
    >
      <a-input
        v-decorator="['name', { rules: [{ required: true, message: '请输入项目名称' }] }]"
        name="name"
        placeholder="给项目起个漂亮的名字"
      />
    </a-form-item>
    <a-form-item
      label="起止日期"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
    >
      <a-range-picker
        name="buildTime"
        style="width: 100%"
        valueFormat="yyyy-MM-DD"
        v-decorator="['buildTime', { rules: [{ required: true, message: '请选择起止日期' }] }]"
      />
    </a-form-item>
    <a-form-item
      label="目标描述"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
    >
      <a-textarea
        rows="4"
        placeholder="要达到什么目标或目的"
        v-decorator="['target', { rules: [{ required: true, message: '请输入目标描述' }] }]"
      />
    </a-form-item>
    <a-form-item
      label="项目描述"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
    >
      <a-textarea
        rows="4"
        placeholder="描述一下项目吧~"
        v-decorator="['description', { rules: [{ required: true, message: '请输入项目描述' }] }]"
      />
    </a-form-item>
    <a-form-item
      label="参与人员"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
    >
      <a-select mode="multiple"
        :filterOption="filterOption"
        :labelInValue='true'
        placeholder="请选择你的伙伴，至少选择你自己"
        v-decorator="['partner', { rules: [{ required: true, message: '请选择参与人员' }] }]"
        >
          <a-select-option v-for="item in userList" :key="item.id" :value="item.id">{{item.nickname}}</a-select-option>
        </a-select>
    </a-form-item>
    <a-form-item
      label="目标公开"
      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
      :required="false"
      help="公开代表能被所有人看见"
    >
      <a-radio-group v-decorator="['isPublic', { initialValue: 1 }]">
        <a-radio :value="1">公开</a-radio>
        <!-- <a-radio :value="2">部分公开</a-radio> -->
        <a-radio :value="3">不公开</a-radio>
      </a-radio-group>
      <a-form-item v-show="form.getFieldValue('target') === 2">
        <a-select mode="multiple">
          <a-select-option value="4">同事一</a-select-option>
          <a-select-option value="5">同事二</a-select-option>
          <a-select-option value="6">同事三</a-select-option>
        </a-select>
      </a-form-item>
    </a-form-item>
    <!-- <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
      <a-button htmlType="submit" type="primary">提交</a-button>
      <a-button style="margin-left: 8px">保存</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { getUserList,addProject } from '@/api/project'
export default {
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    }
    return {
      form: this.$form.createForm(this),
      userInfo: JSON.parse(localStorage.getItem('userInfo')),
      userList: []
    }
  },
  created(){
    getUserList({username: this.userInfo.username}).then(res=>{
      console.log(res)
      if(res.code == 200){
        this.userList = res.data
      }
    })
  },
  methods: {
    async onOk () {
      console.log('监听了 modal ok 事件')
      let flag = await this.handleSubmit()
      return new Promise(resolve => {
        resolve(flag)
      })
    },
    onCancel () {
      return new Promise(resolve => {
        resolve(true)
      })
    },
    async handleSubmit () {
      const { form: { validateFields } } = this
      return new Promise(resolve => {
          validateFields((errors, values) => {
            if (!errors) {
              values.startTime = values.buildTime[0]
              values.endTime = values.buildTime[1]
              values.partner_id = values.partner.map(ele=>ele.key).join(',')
              values.partner_name = values.partner.map(ele=>ele.label).join(',')
              values.leader_id = this.userInfo.id
              console.log('values', values)
              addProject(values).then(res=>{
                if(res.code == 200){
                  this.$message.success(res.msg)
                  resolve(true)
                }else{
                  this.$message.error(res.msg)
                  resolve(false)
                }
              }).catch(err=>{
                this.$message.error(res.msg)
                resolve(false)
              })
            }else{
              resolve(false)
            }
          })
      })
      
    },
    filterOption(inputValue, option){
      let val = option.componentOptions.children[0].text
      return val.indexOf(inputValue) > -1
    }
  }
}
</script>
