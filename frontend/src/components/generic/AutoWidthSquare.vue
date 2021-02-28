<template>
  <div :class="$style.container">
    <!-- the viewbox will provide the desired aspect ratio -->
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
    <div :class="$style.content"><slot></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style module>
.container {
  display: inline-block;
  height: 100%;
  position: relative;
}

.container > svg {
  height: 100%;
}

.container .content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
