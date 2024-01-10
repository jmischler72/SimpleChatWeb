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
      messages: [] as Message[]
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
  <div class="chat-area">
    <div class="chat-list" id="container">
      <ul>
        <li v-for="item in messages" :class="{ me: item.username === username }" >
          <div class="name">
            <span class="">{{ item.username }}</span>
          </div>
          <div class="message">
            <p>{{
                item.message.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              }}</p>
            <span class="msg-time">{{ item.timestamp ? new Date(item.timestamp).toLocaleString() : '' }}</span>
          </div>
        </li>

      </ul>
    </div>
    <div class="input-container">
      <div class="name">
        <label for="name">{{ username }}</label>

      </div>
      <div class="message">
        <input v-on:keyup.enter="sendMessage" type="text" id="name" name="name" v-model="message"/>
        <button @click="sendMessage"><span class="material-symbols-outlined icon">send</span>
        </button>
      </div>

    </div>
  </div>


</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Chathura:wght@700;800&display=swap');

.chat-area {
  display: flex;
  flex-direction: column;
  border: 1px solid #cfdae1;
  box-shadow: inset 0 1px 3px rgba(207, 218, 225, 0.42);
  margin: 0 100px;
}

.input-container {
  background: #cfdbe3;
}

.input-container input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 10px;
  width: 100%;
  font-size: 15px;
}

.input-container .name {
  color: #465563;
  text-align: center;
  width: 150px;
}

.input-container .message {
  border-left: 2px solid #adbdc7;
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
  border-top: 1px solid #cfdae1;
  overflow: hidden;
  position: relative;
  margin: 0;
}

.chat-area ul > li.me {
  background: #e4eaee;
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
  border-left: 1px solid #cfdae1;
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