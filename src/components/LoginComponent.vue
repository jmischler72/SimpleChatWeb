<script lang="ts">
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";


const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
const auth = getAuth();

export default {
  data() {
    return {
      guestUsername: ''
    }
  },
  methods: {
    handleLoginWithGoogle() {
      signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            this.$emit('userLoggedIn', user);
          }).catch((error) => {
            console.log(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
    },
    handleLoginAsGuest() {
      if(!this.guestUsername) return;
      this.$emit('guestLoggedIn', this.guestUsername);
    }
  },
}
</script>

<template>
  <!--
  // v0 by Vercel.
  // https://v0.dev/t/0RIwE6rcLp9
  -->

  <div class="rounded-lg border border-gray-100 shadow-lg w-full max-w-md mx-auto bg-white">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="font-semibold tracking-tight text-2xl text-center">Simple Chat</h3>
      <p class="text-sm text-muted-foreground text-center">Choose a name to join as guest or login</p>
    </div>
    <div class="px-6 pb-6">
      <div class="space-y-2">

        <div class="flex flex-row items-center justify-center">
          <input
              class="align-middle flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="name"
              v-on:keyup.enter="handleLoginAsGuest"
              v-model="guestUsername"
              placeholder="Your name, ex: Jean"
              required
              type="text"
              maxlength="15"
          />
          <button @click="handleLoginAsGuest"
                  class="ml-2 p-2 flex rounded-lg border hover:border-gray-300 focus:border-gray-600"><span
              class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div class="flex justify-center mt-12 mb-4">
        <p class="text-sm">Or login with Google</p>
      </div>
      <div class="flex justify-center space-x-2 border-t pt-4">
        <button
            class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2"
            @click="handleLoginWithGoogle">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-5 h-5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" x2="12" y1="8" y2="8"></line>
            <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
            <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
          </svg>
          Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>