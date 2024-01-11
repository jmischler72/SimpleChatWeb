<script lang="ts">
import {app} from '@/firebase/init';
import {getDatabase, set, ref, onChildAdded, push, query, limitToLast} from "firebase/database";
import type {Message} from "@/components/message";

const db = getDatabase(app);
const messagesRef = ref(db, 'messages/');
const queryMessages = query(messagesRef, limitToLast(5));


export default {
  props: {
    username: String
  },

  data() {
    return {
      message: '',
      messages: [] as Message[],
      dropdown: false,
    }
  },
  methods: {
    sendMessage() {
      const newMessageRef = push(messagesRef);

      set(newMessageRef, {
        username: this.username,
        message: this.message,
        timestamp: Date.now(),
      });
      this.message = "";
    },
    disconnectUser() {
      this.$emit("disconnect");
    },
    async updateScroll() {
      await this.$nextTick();
      const element: HTMLElement | null = document.getElementById("container");
      if (element) element.scrollTop = element.scrollHeight;
      console.log("f");
    }
  },
  mounted() {
    this.updateScroll()
    onChildAdded(queryMessages, (data) => {
      this.messages.push(data.val() as Message);
      this.updateScroll();
    });
  }
}


</script>

<template>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
  <div class="chat">
    <div class="chat-area">
      <div class="chat-list" id="container">
        <ul>
          <li v-for="item in messages" :class="{ me: item.username === username }">
            <div class="name">
              <span class="">{{ item.username }}</span>
            </div>
            <div class="message">
              <p>{{
                  item.message.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                }}</p>
              <span class="msg-time">{{ item.timestamp ? new Date(item.timestamp).toLocaleString('fr-FR') : '' }}</span>
            </div>
          </li>

        </ul>
      </div>
      <div class="input-container">
        <div v-if="dropdown" class="dropdown">
          <button @click="disconnectUser">Deco</button>
        </div>
        <div class="name" @click="dropdown = !dropdown">
          <span class="material-symbols-outlined">expand_more</span>
          <span>{{ username }}</span>
        </div>
        <div class="message">
          <input v-on:keyup.enter="sendMessage" type="text" id="name" name="name" v-model="message" autocomplete="off"/>
          <button @click="sendMessage"><span class="material-symbols-outlined icon">send</span>
          </button>
        </div>

      </div>
    </div>
  </div>


</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Chathura:wght@700;800&display=swap');

.chat{

  width: 100vw;
  height: 100vh;
}
.chat-area {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  box-shadow: 0 0 5px var(--dark-color);
  background-color: var(--chat-background-color);
  border-radius: 20px;
  overflow: hidden;
  font-size: 2em;
  justify-content: center;
  width: 80%;
}

.dropdown {
  background-color: white;
  position: absolute;
  display: block;
}

@media (max-width: 800px) {
  .chat-area {
    width: 95%;
    font-size: 1.5em;
  }

  .name {
    min-width: 80px;
  }
}

.input-container {
  background-color: var(--input-background-color);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.input-container input {
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  margin: 10px;
  width: 100%;
  font-size: 15px;
  background-color: var(--light-color);
}

.input-container .name {
  color: #465563;
  text-align: center;
  width: 150px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: space-around;
}

.input-container .message {
  background-color: var(--input-background-color);
  border-left: 2px solid var(--color-border);
  padding: 0 !important;
  padding-right: 20px !important;
}

.input-container .message > button {
  background-color: transparent;
  border: none;
  color: white;
  text-shadow: 3px 2px 2px #adbdc7;
}

.icon {
  font-size: 40px;
}

.chat-area .chat-list {
  overflow-y: auto;
  overflow-x: hidden;
  outline: none;
  height: 80vh;
  width: 100%;
}

.chat-area ul {
  margin: 0;
  padding: 0;
}

.chat-area ul > li, .input-container {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
  margin: 0;
}

.chat-area ul > li:last-child {
  border-bottom: 1px solid var(--color-border);
}

.chat-area ul > li:first-child {
  border: none;
}

.chat-area ul > li.me {
  background: var(--me-background-color);
}


.name {
  padding: 14px;
  text-align: right;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #5d7185;
  line-height: 30px;
  font-family: 'Chathura', sans-serif;
  font-weight: bold;
  font-size: 1.3em;
}

.message {
  display: flex;
  flex-direction: row;
  padding: 0 50px;
  border-left: 1px solid var(--color-border);
  float: left;
  color: #333f4d;
  width: 100%;
  font-family: 'Chathura', sans-serif;
  align-items: center;
  justify-content: space-between;
}

.chat-area ul .message > p {
  line-height: 20px;
  font-size: 1.1em;
}

.chat-area ul .message .msg-time {
  color: #738ba3;
  font-size: 0.8em;
  text-wrap: nowrap;
  margin-left: 5px;
}
</style>