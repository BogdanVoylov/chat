<template>
  <input
    :class="$style.input"
    type="text"
    v-on:input="onChange"
    v-on:keyup.enter="$emit('enter')"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    placeholder: String,
    modelValue: String
  },
  emits: ['update:modelValue'],
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style module>
.input {
  padding-right: 10px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid gray;
}

.input[type='text'] {
  padding-left: 10px;
}

.input:focus {
  outline: none;
  border: 1px solid #74b9ef;
}
</style>
