<template>
  <button :class="$style.button">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style module>
.button {
  font-size: 1em;
  color: white;
  border-radius: 5px;
  background-color: #428bca;
  border: 1px solid #357ebc;
}

.button:focus {
  outline: none;
  border: 1px solid #74b9ef;
}
</style>
