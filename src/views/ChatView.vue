<script lang="ts">

import LoginComponent from "@/components/LoginComponent.vue";
import type {User as FirebaseUser} from "firebase/auth";
import type {ChatUser} from "@/types/ChatUser";
import {getAuth, signOut, onAuthStateChanged, getRedirectResult} from "firebase/auth";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {app} from "@/firebase/init";
import RoomComponent from "@/components/RoomComponent.vue";


const auth = getAuth(app);

export default {
  data() {
    return {
      user: null as ChatUser | null,
      loading: true
    };
  },
  components: {
    RoomComponent,
    LoadingSpinner,
    LoginComponent,
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
      if (!this.user) return;
      if (this.user.guest) {
        localStorage.removeItem('username');
        this.user = null;
      } else {
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
        const guestUsername = localStorage.getItem('username');
        if (guestUsername) {
          this.handleGuestUserLogin(guestUsername);
        } else {
          this.user = null;
        }
      }
    });
  }

};
</script>

<template>

  <div v-if="user" class="w-full h-dvh bg-[--medium-color3] dark:bg-[--dark-color2]">
    <RoomComponent :user="user" @userDisconnected="disconnectUser"/>
  </div>
  <div v-else-if="loading" class="flex h-full justify-center items-center bg-[--medium-color3] dark:bg-[--dark-color2]">
    <LoadingSpinner></LoadingSpinner>
  </div>
  <div v-else class="flex h-full justify-center items-center bg-[--medium-color3] dark:bg-[--dark-color2]">
    <LoginComponent @guestLoggedIn="handleGuestUserLogin" @userLoggedIn="handleUserLogin"></LoginComponent>
  </div>
</template>
