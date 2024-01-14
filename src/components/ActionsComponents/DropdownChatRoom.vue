<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {initFlowbite} from "flowbite";
import {dbRoomsPath, getRefFromPath} from "@/firebase/database";
import {onValue} from "firebase/database";
import type {ChatRoom} from "@/types/ChatRoom";

export default defineComponent({
  name: "DropdownChatRoom",
  props: {
    username: String,
    photoUrl: String,
    currentRoom: {
      type: Object as PropType<ChatRoom>,
      required: true,
    },
  },
  data() {
    return {
      rooms: [] as ChatRoom[],
    }
  },
  methods: {
    disconnectUser() {
      this.$emit('userDisconnected');
    }
  },
  mounted() {
    initFlowbite();

    const roomRef = getRefFromPath(dbRoomsPath);
    onValue(roomRef, (snapshot) => {
      const rooms = snapshot.val() as ChatRoom[];
      this.rooms = rooms.filter(room => {
        // console.log(room.uid);
        console.log(this.currentRoom);

        // console.log(this.currentRoom.uid);
        return room.uid != this.currentRoom.uid
      })
    });
  }
})
</script>

<template>

  <div>
    <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdown-chat-room"
            class="flex items-center text-sm pe-1 font-bold text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button">
      <span class="sr-only">Open chat-room menu</span>
      <span class="material-symbols-outlined me-2 md-24">meeting_room</span>
      {{ currentRoom.name }}
      <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdown-chat-room"
         class="z-10 hidden  bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="room in rooms">
          <a class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
             @click="$emit('roomSwitched',room.uid )">
            {{ room.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>