<script lang="ts">

import ToggleDarkMode from "@/components/ToggleDarkMode.vue";
import TextEditor from "@/components/TextEditor.vue";
import ChatList from "@/components/ChatList.vue";
import DropdownUser from "@/components/DropdownUser.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import type {User as FirebaseUser} from "firebase/auth";
import type {ChatUser} from "@/types/ChatUser";
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


const auth = getAuth();

export default {
  data() {
    return {
      user: null as ChatUser | null,
      loading: true
    };
  },
  components: {
    LoadingSpinner,
    LoginComponent,
    DropdownUser,
    ChatList,
    TextEditor,
    ToggleDarkMode,
  },
  methods: {
    handleUserLogin(user: FirebaseUser) {
      this.user = {
        guest: false,
        displayName: user.displayName || '',
        userInfo: {
          email: user.email || '',
          uid: user.uid || '',
          photoURL: user.photoURL || '',
        }
      };
    },
    handleGuestUserLogin(username: string) {
      this.user = {guest: true, displayName: username, userInfo: null}
      localStorage.setItem('username', username);
    },
    disconnectUser() {
      if(!this.user) return;
      if (this.user.guest) {
        localStorage.removeItem('username');
        this.user = null;
      }else{
        signOut(auth);
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.loading = false;
      if (user) {
        this.handleUserLogin(user);
      } else {
        this.user = null;
      }
    });
    const guestUsername = localStorage.getItem('username');
    if (guestUsername) {
      this.handleGuestUserLogin(guestUsername);
    }
  }

};
</script>

<template>

  <div v-if="user" class="w-full h-dvh bg-[--medium-color3] dark:bg-[--dark-color2]">
    <div
        class="flex flex-row absolute sm:right-6 right-2 sm:my-6 my-2 justify-end gap-3 items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
      <DropdownUser :username="user.displayName" :photo-url="user.userInfo?.photoURL"
                    @userDisconnected="disconnectUser"></DropdownUser>
      <ToggleDarkMode></ToggleDarkMode>
    </div>
    <div class="w-full h-full justify-center chat">
      <ChatList :user="user"></ChatList>
      <TextEditor :user="user"></TextEditor>
    </div>
  </div>
  <div v-else-if="loading" class="flex h-full justify-center items-center bg-[--medium-color3] dark:bg-[--dark-color2]">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div v-else class="flex h-full justify-center items-center bg-[--medium-color3] dark:bg-[--dark-color2]">
    <LoginComponent @guestLoggedIn="handleGuestUserLogin" @userLoggedIn="handleUserLogin"></LoginComponent>
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