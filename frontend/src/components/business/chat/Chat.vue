<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <AutoWidthSquare>
        <div :class="$style.avatar" :style="avatarStyle"></div>
      </AutoWidthSquare>
      <div :class="$style.headerBody">
        <h2 :class="$style.name">{{ name }}</h2>
      </div>
    </div>
    <div :class="$style.bodyWrapper">
      <div :class="$style.body">
        <div
          v-for="(message, i) in messages"
          :key="i"
          :class="{
            [$style.message]: true,
            [$style.right]: message.recipient == name
          }"
        >
          <Message
            :author="message.author"
            :text="message.text"
            :left="message.recipient == name"
            :timestamp="message.timestamp"
          />
        </div>
      </div>
    </div>
    <div :class="$style.input">
      <TextInput
        placeholder="Start chatting!"
        @onEnter="onSubmit"
        v-model="input"
      />
      <Button text="Send message" @click="onSubmit" />
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import TextInput from '@/components/generic/TextInput.vue';
import Button from '@/components/generic/Button.vue';
import AutoWidthSquare from '@/components/generic/AutoWidthSquare.vue';

export default {
  components: { Message, TextInput, Button, AutoWidthSquare },
  props: {
    name: String,
    avatar: String
  },
  computed: {
    avatarStyle() {
      return `background-image:url('${this.avatar}')`;
    }
  },
  inject: ['chatService'],

  data() {
    return {
      input: '',
      messages: []
    };
  },
  watch: {
    async name() {
      console.log('updated');
      this.messages = await this.chatService.subscribeOnMessages(
        this.onNewMessage,
        this.name
      );
      console.log('recieved');
      console.log(this.messages);
    }
  },
  methods: {
    onSubmit() {
      console.log({ input: this.input });
      this.chatService.sendMessage({ text: this.input, recipient: this.name });
    },
    onNewMessage(m) {
      this.messages.push(m);
    }
  }
};
</script>

<style module>
.container {
  height: 80vh;
  width: 100%;
  background-color: #d7dfe7;
  display: grid;
  grid-template-rows: 20% 70% 10%;
}

.header {
  background-color: #becbd9;
  display: flex;
}

.headerBody {
  padding: 10px;
}

.bodyWrapper {
  padding-right: 10px;
}

.body {
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
}

.avatar {
  height: 100%;
  background-color: green;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
}

/* .avatar::after {
  display: block;
  content: '';
  padding-top: 100%;
} */

.message {
  margin: 10px;
  width: 70%;
}

.right {
  float: right;
}

.name {
  margin: 5px 0;
}

.input {
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 7fr 3fr;
}
</style>
