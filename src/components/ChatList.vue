<script lang="ts">
import {defineComponent} from 'vue'
import {getDatabase, limitToLast, onChildAdded, query, ref} from "firebase/database";
import type {Message} from "@/components/message";
import {app} from "@/firebase/init";

const db = getDatabase(app);
const messagesRef = ref(db, 'messages/');
const queryMessages = query(messagesRef, limitToLast(20));

export default defineComponent({
  name: "ChatList",
  props: {
    username: String
  },
  data() {
    return {
      messages: [] as Message[],
    }
  },
  methods: {
    async updateScroll() {
      await this.$nextTick();
      const element: HTMLElement | null = document.getElementById("container");
      if (element) element.scrollTop = element.scrollHeight;
    }
  },
  mounted() {
    onChildAdded(queryMessages, (data) => {
      this.messages.push(data.val() as Message);
      this.updateScroll();
    });
  }
})
</script>

<template>
  <div id="container"
       class="w-full max-w-[90rem] sm:h-[70vh] h-[78vh] mx-auto bg-white dark:bg-gray-800 shadow rounded-lg overflow-y-auto overflow-x-hidden">
    <div class="sm:px-2 px-1 divide-y divide-gray-300 dark:divide-gray-700">
      <div v-for="message of messages">
        <div class="flex items-center space-x-4 rounded-lg sm:m-2 mx-0 my-2"
             :class="{ [`bg-[--medium-color2] dark:bg-gray-700`]: message.username === username }">
          <div
              class="h-full text-center sm:w-[160px] w-[90px] border-r border-gray-300 dark:border-gray-700 p-4 overflow-hidden pl-6"
              :class="{ [`dark:border-gray-800`]: message.username === username }">
            <h3 class="text-lg font-semibold dark:text-gray-200 truncate">{{ message.username }}</h3>
          </div>
          <div class="w-full flex flex-row items-center justify-between float-left p-4">

            <img
                v-if="message.gif"
                :src="message.gif.url"
                :alt="message.gif.content_description"
                class="h-full max-h-64 w-auto object-cover rounded-lg overflow-hidden"
                data-state="closed"
                @load="updateScroll"
            />

            <p v-else-if="message.message" class="text-md text-gray-800 dark:text-gray-200 p-4">{{
                message.message
              }}</p>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{
                message.timestamp ? new Date(message.timestamp).toLocaleString('fr-FR') : ''
              }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">

</style>