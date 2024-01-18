<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {limitToLast, onChildAdded, query} from "firebase/database";
import type {ChatMessage} from "@/types/ChatMessage";
import type {ChatUser} from "@/types/ChatUser";
import {messagesRef} from "@/firebase/init";


const queryMessages = query(messagesRef, limitToLast(25));

export default defineComponent({
  name: "ChatList",
  props: {
    user: {
      type: Object as PropType<ChatUser>,
      required: true,
    },
  },
  data() {
    return {
      messages: [] as ChatMessage[],
    }
  },
  methods: {
    isMessageFromCurrentUser(message: ChatMessage) {
      if (message.user.guest && this.user.guest) {
        return message.user.displayName === this.user.displayName;
      } else if (!message.user.guest && !this.user.guest) {
        return message.user.userInfo?.uid === this.user.userInfo?.uid;
      }
      return false;
    },
    async updateScroll() {
      await this.$nextTick();
      const element: HTMLElement | null = document.getElementById("container");
      if (element) element.scrollTop = element.scrollHeight;
    }
  },
  mounted() {
    onChildAdded(queryMessages, (data) => {
      this.messages.push(data.val() as ChatMessage);
      this.updateScroll();
    });
  }
})
</script>

<template>
  <div id="container"
       class="w-full max-w-[90rem] h-[70vh] mx-auto bg-white dark:bg-gray-800 shadow rounded-lg overflow-y-auto overflow-x-hidden">
    <div class="sm:px-2 px-1 divide-y divide-gray-300 dark:divide-gray-700">
      <div v-for="(message, m) of messages" :key="m">
        <div class="flex items-center space-x-4 rounded-lg sm:m-2 mx-0 my-2"
             :class="{ [`bg-[--medium-color2] dark:bg-gray-700`]: isMessageFromCurrentUser(message)}">
          <div
              class="flex flex-row items-center h-full justify-between sm:w-[260px] min-w-[120px] border-r border-gray-300 dark:border-gray-700 p-4 sm:px-8 dark:text-gray-200"
              :class="{ [`dark:border-gray-800`]: isMessageFromCurrentUser(message) }">
            <span v-if="message.user.guest" class="text-gray-400 italic text-base">Guest</span>
            <div v-else class="pr-1">
              <img v-if="message.user.userInfo?.photoURL" class="w-6 h-6 me-2 rounded-full"
                   :src="message.user.userInfo?.photoURL" alt="user photo">
              <span v-else class="material-symbols-outlined md-24 me-2 justify-center flex">account_circle</span>
            </div>
            <h3 class="text-xs sm:text-base font-semibold truncate">{{ message.user.displayName }}</h3>
          </div>
          <div class="w-full flex flex-row items-center justify-between float-left p-0 sm:p-4">

            <img
                v-if="message.gif"
                :src="message.gif.url"
                :alt="message.gif.content_description"
                class="h-full max-h-64 w-auto object-cover rounded-lg overflow-hidden"
                data-state="closed"
                @load="updateScroll"
            />
            <p v-else-if="message.message" class="text-sm sm:!text-base  text-gray-800 dark:text-gray-200 p-4">{{
                message.message
              }}</p>
            <span class="sm:text-sm text-xs text-gray-500 dark:text-gray-400 ml-2">{{
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