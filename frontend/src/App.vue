<template>
  <div :class="$style.container">
    <h1 :class="$style.header">
      Chat bots 2.0
    </h1>
    <div :class="$style.chatContainer">
      <Chat self="User 1" />
      <Contacts />
    </div>
  </div>
</template>

<script>
import Contacts from '@/components/business/contacts/Contacts.vue';
import Chat from '@/components/business/chat/Chat.vue';
export default {
  name: 'App',
  components: { Chat, Contacts }
};
</script>
<style>
* {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
#app {
  height: 100vh;
  width: 100%;
}

*::-webkit-scrollbar {
  border-radius: 5px;
  width: 12px; /* width of the entire scrollbar */
  background-color: #becbd9;
}

*::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #9daab9;
}
</style>

<style module>
.header {
  margin: 1em;
}
.container {
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 10vh 90vh;
}
.chatContainer {
  max-height: 80vh;
  padding: 2em 6em 6em 6em;
  background-color: #586670;
  display: grid;
  grid-template-columns: 80fr 25fr;
}
</style>
