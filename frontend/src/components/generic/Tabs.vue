<template>
  <div :class="$style.container">
    <div
      v-for="(v, i) in values"
      :key="i"
      :class="{ [$style.tab]: true, [$style.selectedTab]: selected == i }"
      @click="() => changeSelected(i)"
    >
      <span>{{ v }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    values: Array
  },
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    changeSelected(i) {
      this.selected = i;
      this.$emit('changedSelected', this.values[i]);
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  cursor: pointer;
}

.selectedTab {
  background-color: white;
  border: 1px solid #dddddd;
}
</style>
