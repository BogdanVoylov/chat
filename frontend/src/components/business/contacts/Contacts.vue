<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <Tabs :values="['Online', 'All']" @changedSelected="changeMode" />
    </div>
    <div :class="$style.body">
      <div v-for="(c, i) in filteredContacts" :key="i" :class="$style.row">
        <Contact
          @click="$emit('selected', c)"
          :name="c.name"
          :avatar="c.avatar"
          :online="c.online"
        />
      </div>
    </div>
    <div :class="$style.input">
      <TextInput placeholder="Search..." v-model="nameFilter" />
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/generic/Tabs.vue';
import TextInput from '@/components/generic/TextInput.vue';
import Contact from './Contact.vue';
export default {
  components: { Tabs, Contact, TextInput },
  inject: ['chatService'],
  methods: {
    changeMode(newMode) {
      console.log({ newMode });
      this.tabFilter = newMode;
    },
    setUsers(users) {
      console.log({ users });
      this.contacts = users;
    }
  },
  async created() {
    this.contacts = await this.chatService.subscribeOnUsers(this.setUsers);
  },
  computed: {
    filteredContacts() {
      console.log(this.contacts);
      const online =
        this.tabFilter === 'Online'
          ? this.contacts.filter(c => c.online)
          : this.contacts;
      return online.filter(c => c.name.startsWith(this.nameFilter));
    }
  },
  data() {
    return {
      nameFilter: '',
      tabFilter: 'Online',
      contacts: []
    };
  }
};
</script>

<style module>
.container {
  height: 80vh;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  background-color: white;
}

.header {
  background-color: red;
}

.body {
  max-height: 100%;
  overflow-y: auto;
}

.row {
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  margin: 10px 0;
}

.input {
  padding: 10px;
}

.input > * {
  width: calc(100% - 20px);
  height: 100%;
}
</style>
