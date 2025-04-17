<template>
  <div class="app">
    <h1>📜 Chat Viewer</h1>
    <ChatList :messages="chatMessages" />
  </div>
</template>

<script>
import ChatList from './components/ChatList.vue';

export default {
  name: 'App',
  components: {
    ChatList,
  },
  data() {
    return {
      chatMessages: [],
    };
  },
  mounted() {
    fetch('https://obscure-fortnight-4jjv5g44pxw6c5rx6-3000.app.github.dev/chat?file=mush.rtf') // or chat.rtf
      .then(res => res.json())
      .then(data => {
        this.chatMessages = data;
      })
      .catch(err => {
        console.error('Failed to fetch chat messages:', err);
      });
  },
};
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  background-color: #f0f2f5;
}
.app {
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
