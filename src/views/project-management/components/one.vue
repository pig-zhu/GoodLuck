<template>
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed" @click="addProject">
            <a-icon type="plus"/>
            新增项目
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta style="min-height: 100px">
              <a slot="title">{{ item.name }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large"/>
              <div class="meta-content overflow-text" slot="description">{{ item.description?item.description:'还没有项目简介哦！' }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a @click="viewDetail(item)">查看详情</a>
              <!-- <a>删除项目</a> -->
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
</template>

<script>
import { getProjectList } from '@/api/project'
import CreateForm from '../modules/CreateForm'
const dataSource = []
dataSource.push({})
for (let i = 0; i < 11; i++) {
  dataSource.push({
    id: i,
    title: 'Alipay',
    avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2531261255,3618354290&fm=26&gp=0.jpg',
    content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
}

export default {
  name: 'CardList',
  data () {
    return {
      dataSource: [],
      userInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  created(){
    this.getList()
  },
  methods: {
    addProject() {
      let that = this
      this.$dialog(CreateForm,
        // component props
        {
          record: {},
          on: {
            ok () {
              that.getList()
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '新增项目',
          width: 700,
          centered: true,
          maskClosable: false,
          okText: '提交',
          confirmLoading: false
        })
    },
    getList(){
      getProjectList().then(res=>{
        res.data.data.forEach(element => {
          element.avatar = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2531261255,3618354290&fm=26&gp=0.jpg'
        });
        res.data.data.unshift({})
        this.dataSource = [...res.data.data]
        console.log(res,'全部项目')
      })
    },
    viewDetail(data){
      console.log(data)
      this.$Modal.info('dwad')
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
