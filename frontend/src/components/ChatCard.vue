<template>
  <div class="chat-card">
    <div class="chat-header">
      <span class="chat-timestamp">{{ message.timestamp }}</span>
      <span class="chat-sender">{{ message.sender }}</span>
    </div>
    <div class="chat-body">{{ message.message }}</div>
  </div>
</template>

<script>
export default {
  name: 'ChatCard',
  props: {
    message: Object,
  },
};
</script>

<style scoped>
.chat-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.chat-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.chat-timestamp {
  color: #888;
  font-size: 0.85rem;
}
.chat-sender {
  color: #333;
}
.chat-body {
  white-space: pre-line;
}
</style>
