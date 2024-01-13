<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {push, serverTimestamp, set} from "firebase/database";
import GifPicker from "@/components/GifPicker/GifPicker.vue";
import type {ResponseObject} from "@/components/GifPicker/types/ResponseObject";
import type {ChatUser} from "@/types/ChatUser";
import {messagesRef} from "@/firebase/init";


export default defineComponent({
  name: "TextEditor",
  components: {GifPicker},
  props: {
    user: {
      type: Object as PropType<ChatUser>,
      required: true,
    },
  },
  data() {
    return {
      message: '',
      gifDropdownOpened: false,
      gifDropdownInitiated: false, // is used to render only once and then only use v-show so api is called only once
      tenorAPIKey: import.meta.env.VITE_TENOR_API_KEY,
    }
  },
  methods: {
    closeGifDropdown() {
      this.gifDropdownOpened = false;
    },
    toggleGifDropdown() {
      this.gifDropdownInitiated = true;
      this.gifDropdownOpened = !this.gifDropdownOpened;
    },
    sendMessage() {
      if (this.message === "") {
        return;
      }
      set(push(messagesRef), {
        user: this.user,
        message: this.message,
        timestamp: serverTimestamp(),
      });
      this.message = "";
    },
    sendGif(gif: ResponseObject) {
      set(push(messagesRef), {
        user: this.user,
        gif: {
          content_description: gif.content_description,
          url: gif.media_formats['gif'].url,
        },
        timestamp: serverTimestamp(),
      });
      this.gifDropdownOpened = false;
    }
  },
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
          @click.stop="toggleGifDropdown"
          class="editor-button">
        <span class="sr-only">Image</span>
        <span class="material-symbols-outlined md-36">gif</span>
      </button>
      <button
          class="editor-button !px-4">
        <span class="sr-only">Emoji</span>
        <span class="material-symbols-outlined md-18">mood</span>
      </button>
    </div>
    <div class="overflow-y-auto relative">
      <div class="absolute bottom-0 right-3">
        <button @click="sendMessage"><span
            class="material-symbols-outlined text-gray-600 dark:text-gray-400">send</span>
        </button>
      </div>
      <input
          v-on:keyup.enter="sendMessage"
          class="w-full h-full p-6 py-8 text-gray-600 dark:text-gray-200 dark:bg-gray-700 text-md resize-none outline-none overflow-y-auto"
          placeholder="Type your text here..." maxlength="250" v-model="message"/>
    </div>
    <div v-if="gifDropdownInitiated" v-show="gifDropdownOpened" class="translate-y-[-100%] absolute top-0 shadow-2xl">
      <div v-click-outside="closeGifDropdown">
        <GifPicker :api-key="tenorAPIKey" @gifSent="sendGif">
        </GifPicker>
      </div>
    </div>

  </div>
</template>

<style scoped>
.editor-button {
  @apply inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-[--hover-color] active:bg-[--active-color] dark:hover:bg-[--dark-hover-color] dark:active:bg-[--dark-active-color] h-10 px-2 py-2 text-gray-600 dark:text-gray-400;
}

</style>