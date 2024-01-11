<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ChatList",
  data() {
    return {
      messages: [
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        },
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        },
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        },
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        },
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        },
        {
          username: 'Alice',
          message: 'Hello, how are you?',
          timestamp: '10:00 AM'
        }
      ]
    }
  }
})
</script>

<template>
  <div class="w-full max-w-[90rem] mx-auto bg-white dark:bg-gray-800 shadow rounded-md overflow-hidden">
    <div class="px-4 py-6 divide-y divide-gray-300 dark:divide-gray-700">
      <div v-for="message of messages" class="flex items-center space-x-4">
        <div class="h-full border-r border-gray-300 dark:border-gray-700 p-4">
          <h3 class="text-md font-semibold dark:text-gray-200 pr-4">
            Alice</h3>
        </div>
        <div class="w-full flex flex-row items-center justify-between float-left p-4">
          <p class="text-md text-gray-800 dark:text-gray-200 p-4">Hello, how are you? gsoufpgosuqgdfou bdfuoq sguogfouqsoufqd</p>
          <span class="text-sm text-gray-500 dark:text-gray-400">10:00 AM</span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>