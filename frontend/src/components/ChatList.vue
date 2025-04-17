<template>
    <div class="chat-list">
      <ChatCard v-for="(msg, index) in messages" :key="index" :message="msg" />
    </div>
  </template>
  
  <script>
  import ChatCard from './ChatCard.vue';
  
  export default {
    name: 'ChatList',
    components: {
      ChatCard,
    },
    props: {
      messages: Array,
    },
  };
  </script>
  
  <style scoped>
  .chat-list {
    max-height: 90vh;
    overflow-y: auto;
    padding: 1rem;
  }
  </style>
  