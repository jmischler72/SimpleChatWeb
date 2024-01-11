<script lang="ts">

import ToggleDarkMode from "@/components/ToggleDarkMode.vue";
import TextEditor from "@/components/TextEditor.vue";
import ChatList from "@/components/ChatList.vue";
import GifPicker from "@/components/GifPicker.vue";

export default {
  data() {
    return {
      username: localStorage.getItem('username') || null,
    };
  },
  components: {
    GifPicker,
    ChatList,
    TextEditor,
    ToggleDarkMode,
  },
  methods: {
    handleUsernameChange(value: string) {
      this.username = value;
      localStorage.setItem('username', value);
    },
    disconnectUser() {
      localStorage.removeItem('username');
      this.username = null;
    }
  },
};
</script>

<template>
  <div class="w-full h-full bg-[--medium-color2] dark:bg-[--dark-color2]">
    <div class="flex flex-row absolute right-3 my-6 justify-end gap-2 items-center">
      <ToggleDarkMode></ToggleDarkMode>
    </div>
    <div class="w-full h-full justify-center chat">
      <ChatList :username="username"></ChatList>
      <TextEditor :username="username"></TextEditor>
    </div>
  </div>

<!--  <GifPicker api-key="AIzaSyCVZmVXOO1pCLBjRnjMu3wK_HhFtw6BNwI"></GifPicker>-->

</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 15px;
}
</style>