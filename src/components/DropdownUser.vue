<script lang="ts">
import {defineComponent} from 'vue'
import {initFlowbite} from "flowbite";

export default defineComponent({
  name: "DropdownUser",
  props: {
    username: String,
    photoUrl: String,
  },
  methods: {
    disconnectUser() {
      this.$emit('userDisconnected');
    }
  },
  mounted(){
    initFlowbite();
  }
})
</script>

<template>

  <div>
    <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdown"
            class="flex items-center text-sm pe-1 font-bold text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button">
      <span class="sr-only">Open user menu</span>
      <img v-if="photoUrl" class="w-8 h-8 me-2 rounded-full" :src="photoUrl" alt="user photo">
      <span v-else class="material-symbols-outlined me-2 md-24 justify-center flex">account_circle</span>
      {{ username }}
      <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
          <a @click="disconnectUser"
             class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Se déconnecter</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>