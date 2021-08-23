<template>
    <div class="chat-room">
        <a-card>
            <div class="people">
                <a-input-search placeholder="输入名称搜索" enter-button @search="onSearch" />
                <a-list item-layout="horizontal" :data-source="data">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-list-item-meta
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        >
                            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                            <a-avatar
                                slot="avatar"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </div>
            <div class="records">
                <div v-show="chatting">
                    <div class="name">王八蛋</div>
                    <div class="content">
                        <div class="main">
                            <a-list-item-meta v-for="(item, index) in Array.from({'length': 110})" :key='index'>
                                <a-avatar
                                    slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <span slot="description" class="chat-pop">哈哈哈</span>
                            </a-list-item-meta>

                            <div class="sendRecord">
                                <span class="chat-pop chat-pop-by-me">哈哈哈</span>
                                <a-avatar
                                    slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                            </div>
                        </div>
                        <div class="inputVal">
                            <a-textarea
                                v-model="inputVal"
                                placeholder="说点什么吧..."
                                :auto-size="{ minRows: 3, maxRows: 5 }"
                            />
                            <a-button type="primary" size="small" style="margin-top: 5px;float: right">
                                发送
                            </a-button>
                        </div>
                    </div>
                </div>
                <a-result v-if="!chatting" status="403" sub-title="目前还没人跟你聊天"></a-result>
            </div>
        </a-card>
    </div>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default {
    data() {
        return {
            data,
            chatting: true,
            popoverVisible: true,
            inputVal: ''
        }
    },
    methods: {
        onSearch(val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less" scoped>
.chat-room {
    /deep/ .ant-card-body {
        display: flex;
        justify-content: space-between;
    }
    .people {
        width: 20%;
        margin-right: 10px;
        /deep/.ant-list {
            max-height: 600px;
            overflow-y: auto;
            overflow-x: hidden;
            &::-webkit-scrollbar {
                width: 4px;
            }
            &::-webkit-scrollbar-thumb {
                background: transparent;
                border-radius: 4px;
            }
            &:hover::-webkit-scrollbar-thumb {
                background: hsla(0,0%,53%,.4);
            }
            &:hover::-webkit-scrollbar-track {
                background: hsla(0,0%,53%,.1);
            }
        }
        /deep/ .ant-list-item-meta-description, .ant-list-item-meta-title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 250px;
        }
    }
    .records {
        width: 80%;
        padding: 0 24px;
        .name {
            font-size: 20px;
        }
        .content {
            padding: 15px 24px;
            border: 1px solid #eee;
            border-radius: 5px;
            height: 500px;
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            /deep/ .ant-list-item-meta {
                align-items: center;
            }
            .chat-pop {
                border: 1px solid #52c41a;
                padding: 2px 10px;
                position: relative;
                border-radius: 4px;
                &::before {
                    content: '';
                    display: inline-block;
                    border: 5px solid transparent;
                    border-right-color: #52c41a;
                    position: absolute;
                    left: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                &::after {
                    content: '';
                    display: inline-block;
                    border: 5px solid transparent;
                    border-right-color: #fff;
                    position: absolute;
                    left: -9px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .sendRecord {
                justify-content: flex-end;
                display: flex;
                align-items: center;
                .chat-pop-by-me {
                    margin-right: 16px;
                    background-color: #52c41a;
                    color: #fff;
                    &::before {
                        border-right-color: transparent;
                    }
                    &::after {
                        border-right-color: transparent;
                        border-left-color: #52c41a;
                        left: 100%;
                    }
                }
            }
            .main {
                flex: 1;
                overflow-y: auto;
                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    background: transparent;
                    border-radius: 4px;
                }
                &:hover::-webkit-scrollbar-thumb {
                    background: hsla(0,0%,53%,.4);
                }
                &:hover::-webkit-scrollbar-track {
                    background: hsla(0,0%,53%,.1);
                }
            }
        }
    }
    .inputVal {
        margin-top: 15px;
    }
}
</style>