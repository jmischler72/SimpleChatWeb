<script lang="ts">

import ToggleDarkMode from "@/components/ToggleDarkMode.vue";
import TextEditor from "@/components/TextEditor.vue";
import ChatList from "@/components/ChatList.vue";

export default {
  data() {
    return {
      username: localStorage.getItem('username') || null,
    };
  },
  components: {
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
  <div class="bg-[--medium-color2] dark:bg-[--dark-color2]">
    <ToggleDarkMode class="toggle"></ToggleDarkMode>
    <div class="chat">
      <ChatList></ChatList>
      <TextEditor></TextEditor>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  margin: 20px;
  right: -10px;
  position: absolute;
}

.chat {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>