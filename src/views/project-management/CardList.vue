<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {     
      this.tabActiveKey = key
      this.$router.push({name:key})
    }"
    content="tip：这是全宇宙最厉害的团队，拥有着无可比拟的凝聚力和执行力，任何企图击败他们的人都尝到了苦头，他们有一句响亮的口号：I can do it all day!"
  >
    <template v-slot:extraContent>
      <div style="width: 155px; margin-top: -20px;"><img style="width: 100%" :src="extraImage" /></div>
    </template>
    <router-view/>
    
  </page-header-wrapper>
</template>

<script>

const getActiveKey = (path) => {
  if(path.indexOf('one') > -1){
    return 'one'
  }else if(path.indexOf('two') > -1){
    return 'two'
  }else if(path.indexOf('three') > -1){
    return 'three'
  }
}
export default {
  name: 'CardList',
  data () {
    this.tabList = [
      { key: 'card_one', tab: '全部列表' },
      { key: 'card_two', tab: '团队列表' },
      { key: 'card_three', tab: '我的项目' }
    ]
    return {
      tabActiveKey: 'card_one',

      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png'
    }
  },
  created(){
    this.$watch('$route', (val) => {
      this.tabActiveKey = 'card_'+ getActiveKey(val.path)
    })
  },
  methods: {
    changeTab (val) {
      this.tabActiveKey = val
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/components/index.less";

  .card-list {
    /deep/ .ant-card-body:hover {
      .ant-card-meta-title>a {
        color: @primary-color;
      }
    }

    /deep/ .ant-card-meta-title {
      margin-bottom: 12px;

      &>a {
        display: inline-block;
        max-width: 100%;
        color: rgba(0,0,0,.85);
      }
    }

    /deep/ .meta-content {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      margin-bottom: 1em;
    }
  }

  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

</style>
