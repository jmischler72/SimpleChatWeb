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
  },
};
</script>

<template>

  <h1 v-if="!username">
    <NameInput @name-changed="handleUsernameChange"></NameInput>
  </h1>
  <h1 v-else>
    <ChatMessages :username="username"></ChatMessages>
  </h1>
</template>

<style scoped>

</style>