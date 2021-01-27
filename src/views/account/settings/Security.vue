<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
    <a-modal
      title="修改密码"
      :after-close="onClose"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <a-input-password v-model="params.oldPassword" placeholder="你的旧密码" />
    <a-input-password v-model="params.newPassword" placeholder="你的新密码" class="mt20"/>
    <a-input-password v-model="params.newPassword2" placeholder="确认你的新密码" />
    </a-modal>
  </a-list>
</template>

<script>
import { changePwd } from '@/api/setting'
import md5 from 'md5'
export default {
  data () {
    return {
      data: [
        { title: '账户密码', description: '当前密码强度', value: '强', actions: { title: '修改', callback: () => { this.visible = true } } },
        { title: '密保手机', description: '已绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.$message.success('This is a message of success') } } },
        { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } },
        { title: '备用邮箱', description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
        { title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认', value: '', actions: { title: '绑定', callback: () => { this.$message.info('This is a normal message') } } }
      ],
      visible: false,
      confirmLoading: false,
      params:{
        oldPassword: null,
        newPassword: null,
        newPassword2: null
      },
      userInfo:JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  methods: {
    handleOk(e) {
      console.log(this.userInfo)
      if(this.params.newPassword !== this.params.newPassword2){
        this.$notification.error({
          message:'两次输入的密码不一致！'
        })
        return
      }
      this.params.id = this.userInfo.id
      this.params.oldPassword  = md5(this.params.oldPassword)
      console.log(this.params.oldPassword)
      this.confirmLoading = true;
      changePwd(this.params).then(res=>{
        if(res.code == 200){
          this.visible = false;
          this.confirmLoading = false;
          this.$notification.success({
            message:res.msg
          })
        }else{
          this.confirmLoading = false;
          this.$notification.error({
            message:res.msg
          })
        }
      }).catch(err=>{
            this.$notification.error({
              message: err.msg
            })
        })
    },
    handleCancel(e) {
      this.visible = false;
    },
    onClose(){
      this.params = {}
    }
  }
}
</script>

<style scoped>
.mt20{
  margin: 20px 0;
}
</style>
