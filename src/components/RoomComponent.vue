<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from 'vue';
import type {ChatUser} from "@/types/ChatUser";
import type {ChatMessage} from "@/types/ChatMessage";
import {dbRoomsPath, getRefFromPath} from "@/firebase/database";
import {onValue, push, set} from "firebase/database";
import TextEditor from "@/components/ChatComponents/TextEditor.vue";
import ChatList from "@/components/ChatComponents/ChatList.vue";
import type {ChatRoom} from "@/types/ChatRoom";
import DropdownUser from "@/components/ActionsComponents/DropdownUser.vue";
import DropdownChatRoom from "@/components/ActionsComponents/DropdownChatRoom.vue";
import ToggleDarkMode from "@/components/ActionsComponents/ToggleDarkMode.vue";

export default defineComponent({
  name: "RoomComponent",
  components: {ToggleDarkMode, DropdownChatRoom, DropdownUser, ChatList, TextEditor},
  props: {
    user: {
      type: Object as PropType<ChatUser>,
      required: true,
    },
  },
  data() {
    return {
      roomId: 2 as string,
      room: {} as ChatRoom,
    }
  },
  methods: {
    sendMessageToDb(message: ChatMessage) {
      const messagesRef = getRefFromPath(dbRoomsPath + this.roomId + '/messages');
      set(push(messagesRef), message);
    },
    switchRoom(roomId: string){
      console.log("t")
      this.roomId = roomId;
    }
  },
  mounted() {
    const roomRef = getRefFromPath(dbRoomsPath + this.roomId);
    onValue(roomRef, (snapshot) => {
      this.room = snapshot.val();
    });
  }
})
</script>

<template>
  <div
      class="flex flex-row absolute sm:right-6 right-2 sm:my-6 my-2 justify-end gap-3 items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
    <DropdownChatRoom :current-room="room" @roomSwitched="switchRoom"/>
    <DropdownUser :username="user.displayName" :photo-url="user.userInfo?.photoURL"
                  @userDisconnected="$emit('userDisconnected')"></DropdownUser>
    <ToggleDarkMode></ToggleDarkMode>
  </div>
  <div class="w-full h-full justify-center chat">
    <ChatList :user="user" :messages="room.messages"></ChatList>
    <TextEditor :user="user" @messageSent="sendMessageToDb"></TextEditor>
  </div>
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