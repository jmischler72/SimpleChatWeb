<script lang="ts">

import NameInput from "@/components/NameInput.vue";
import ChatMessages from "@/components/ChatMessages.vue";

export default {
  data() {
    return {
      username: localStorage.getItem('username') || null,
    };
  },
  components: {
    ChatMessages,
    NameInput,
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

  <div v-if="!username">
    <NameInput @name-changed="handleUsernameChange"></NameInput>
  </div>
  <div  v-else>
    <ChatMessages :username="username" @disconnect="disconnectUser"></ChatMessages>
  </div>
</template>

<style scoped>
</style>