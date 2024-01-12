<script lang="ts">
import {defineComponent} from 'vue'
import {getDatabase, push, ref, serverTimestamp, set} from "firebase/database";
import {app} from "@/firebase/init";
import GifPicker from "@/components/GifPicker/GifPicker.vue";

const db = getDatabase(app);
const messagesRef = ref(db, 'messages/');

export default defineComponent({
  name: "TextEditor",
  components: {GifPicker},
  props: {
    username: String
  },
  data() {
    return {
      message: '',
      gifPickerOpen: false
    }
  },
  methods: {
    sendMessage() {
      if (this.message === "") {
        return;
      }

      set(push(messagesRef), {
        username: this.username,
        message: this.message,
        timestamp: serverTimestamp(),
      });
      this.message = "";
    },
    sendGif(url: string) {
      set(push(messagesRef), {
        username: this.username,
        message: `gif>${url}`,
        timestamp: serverTimestamp(),
      });
      this.message = "";
    }
  }
})
</script>

<template>
  <!--
  // v0 by Vercel.
  // https://v0.dev/t/4D5CdhA
  -->
  <div class="w-full max-w-[60rem] mx-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg relative">
    <div class="flex space-x-2 p-2 border-b border-gray-200 dark:border-gray-800">
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Bold</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>-->
      <!--          <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Italic</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <line x1="19" x2="10" y1="4" y2="4"></line>-->
      <!--          <line x1="14" x2="5" y1="20" y2="20"></line>-->
      <!--          <line x1="15" x2="9" y1="4" y2="20"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Underline</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>-->
      <!--          <line x1="4" x2="20" y1="20" y2="20"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Left Align</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <line x1="21" x2="3" y1="6" y2="6"></line>-->
      <!--          <line x1="15" x2="3" y1="12" y2="12"></line>-->
      <!--          <line x1="17" x2="3" y1="18" y2="18"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Center Align</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <line x1="21" x2="3" y1="6" y2="6"></line>-->
      <!--          <line x1="17" x2="7" y1="12" y2="12"></line>-->
      <!--          <line x1="19" x2="5" y1="18" y2="18"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Right Align</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <line x1="21" x2="3" y1="6" y2="6"></line>-->
      <!--          <line x1="21" x2="9" y1="12" y2="12"></line>-->
      <!--          <line x1="21" x2="7" y1="18" y2="18"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Bulleted List</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <line x1="8" x2="21" y1="6" y2="6"></line>-->
      <!--          <line x1="8" x2="21" y1="12" y2="12"></line>-->
      <!--          <line x1="8" x2="21" y1="18" y2="18"></line>-->
      <!--          <line x1="3" x2="3.01" y1="6" y2="6"></line>-->
      <!--          <line x1="3" x2="3.01" y1="12" y2="12"></line>-->
      <!--          <line x1="3" x2="3.01" y1="18" y2="18"></line>-->
      <!--        </svg>-->
      <!--      </button>-->
      <!--      <button-->
      <!--          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">-->
      <!--        <span class="sr-only">Add Link</span>-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
      <!--             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">-->
      <!--          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>-->
      <!--          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>-->
      <!--        </svg>-->
      <!--      </button>-->
      <button
          @click="gifPickerOpen = !gifPickerOpen"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">
        <span class="sr-only">Image</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      </button>
      <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 dark:text-gray-400">
        <span class="sr-only">Emoji</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" x2="9.01" y1="9" y2="9"></line>
          <line x1="15" x2="15.01" y1="9" y2="9"></line>
        </svg>
      </button>
    </div>
    <div class="overflow-y-auto relative">
      <div class="absolute bottom-0 right-3">
        <button @click="sendMessage"><span
            class="material-symbols-outlined text-gray-600 dark:text-gray-400">send</span>
        </button>
      </div>
      <input
          class="w-full h-full p-6 py-8 text-gray-600 dark:text-gray-200 dark:bg-gray-700 text-md resize-none outline-none overflow-y-auto"
          placeholder="Type your text here..." maxlength="250" v-model="message"/>
    </div>
    <div v-if="gifPickerOpen" class="gifpicker absolute top-0 shadow-2xl">
      <GifPicker api-key="AIzaSyCVZmVXOO1pCLBjRnjMu3wK_HhFtw6BNwI" @gifSent="sendGif">
      </GifPicker>
    </div>

  </div>
</template>

<style scoped>
.gifpicker {
  transform: translate(0, -100%);
}
</style>