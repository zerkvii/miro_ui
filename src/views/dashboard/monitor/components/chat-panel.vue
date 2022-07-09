<template>
  <a-card
    class="general-card chat-panel"
    :title="$t('monitor.title.chatPanel')"
    :bordered="false"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
    }"
  >
    <a-space :size="8">
      <a-select style="width: 86px" default-value="all">
        <a-option value="all">
          {{ $t("monitor.chat.options.all") }}
        </a-option>
      </a-select>
      <a-input-search
        :placeholder="$t('monitor.chat.placeholder.searchCategory')"
      />
      <a-button type="text">
        <icon-download />
      </a-button>
    </a-space>
    <div class="chat-panel-content">
      <a-spin :loading="loading" style="width: 100%">
        <ChatList :render-list="chatData" />
      </a-spin>
    </div>
    <div class="chat-panel-footer">
      <a-space :size="8">
        <a-Input v-model="instantMsg">
          <template #suffix>
            <icon-face-smile-fill />
          </template>
        </a-Input>
        <a-button type="primary" @click="sendMessage">{{
            $t("monitor.chat.update")
          }}
        </a-button>
      </a-space>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { queryChatList, ChatRecord } from "@/api/message";
import useLoading from "@/hooks/loading";
import { getToken } from "@/utils/auth";
import ChatList from "./chat-list.vue";

const { loading, setLoading } = useLoading(true);
const chatData = ref<ChatRecord[]>([]);
const ws = new WebSocket("ws://localhost:8000/ws-apis/chat");
const instantMsg = ref("");

const sendMessage = () => {
  if (instantMsg.value) {
    setLoading(true);
    ws.send(
      JSON.stringify({
        "msg_type": 20000,
        "x-token": getToken(),
        "content": instantMsg.value,
        "time": Date.now()
      })
    );
    instantMsg.value = "";
  }
};
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const ret = data.data;
  let count = 0;
  const chatList: any[] = [];
  ret.forEach((ele: any) => {
    ele.id = count;
    ele.time = new Date(ele.time).toLocaleString();
    count += 1;
    ele.isCollect = true;
    delete ele.msg_type;
    chatList.push(ele);
  });
  chatData.value = chatList;
  setLoading(false);
};
// const fetchData = async () => {
//   try {
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log(data.data);
//       const ret = data.data;
//       let count = 0;
//       const chatList: any[] = [];
//       ret.forEach((ele: any) => {
//         ele.id = count;
//         ele.time = new Date(ele.time).toLocaleString();
//         count += 1;
//         ele.isCollect = true;
//         delete ele.msg_type;
//         chatList.push(ele);
//       });
//       chatData.value = chatList;
//     };
//   } catch (err) {
//     // you can report use errorHandler or other
//   } finally {
//     setLoading(false);
//   }
// };
// fetchData();
</script>

<style scoped lang="less">
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  // padding: 20px;
  background-color: var(--color-bg-2);

  &-content {
    flex: 1;
    margin: 20px 0;
  }
}
</style>
