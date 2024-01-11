<script lang="ts">

import ToggleDarkMode from "@/components/ToggleDarkMode.vue";
import TextEditor from "@/components/TextEditor.vue";
import ChatList from "@/components/ChatList.vue";
import DropdownUser from "@/components/DropdownUser.vue";
import router from "@/router";
import NameInput from "@/components/NameInput.vue";

export default {
  data() {
    return {
      username: localStorage.getItem('username') || null,
    };
  },
  components: {
    DropdownUser,
    ChatList,
    TextEditor,
    ToggleDarkMode,
    NameInput
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
  mounted(){
    if(!this.username){
      router.push("/");
    }
  }

};
</script>

<template>
  <div v-if="username" class="w-full h-full bg-[--medium-color2] dark:bg-[--dark-color2]">

    <div class="flex flex-row absolute right-6 my-6 justify-end gap-3 items-center">
      <DropdownUser :username="username" @userDisconnected="disconnectUser"></DropdownUser>
      <ToggleDarkMode></ToggleDarkMode>
    </div>
    <div class="w-full h-full justify-center chat">
      <ChatList :username="username"></ChatList>
      <TextEditor :username="username"></TextEditor>
    </div>
  </div>
  <div v-else>
    <NameInput @usernameChanged="handleUsernameChange"></NameInput>
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