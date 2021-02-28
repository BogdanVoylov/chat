<template>
  <div :class="$style.container">
    <AutoWidthSquare>
      <div
        :class="{ [$style.avatar]: true, [$style.avatarOnline]: online }"
        :style="avatarStyle"
      ></div>
    </AutoWidthSquare>
    <div :class="$style.text">
      <h3>{{ name }}</h3>
    </div>
  </div>
</template>

<script>
import AutoWidthSquare from '@/components/generic/AutoWidthSquare.vue';

export default {
  components: { AutoWidthSquare },
  props: {
    name: String,
    avatar: String,
    online: Boolean
  },
  computed: {
    avatarStyle() {
      return `background-image:url('${this.avatar}')`;
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
  width: 100%;
  display: flex;
}

.avatar {
  height: 100%;
  width: 100%;
  background-color: green;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
}

.avatarOnline::after {
  --size: 20px;
  position: absolute;
  display: block;
  content: '';
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: #20d63e;
  margin-top: calc(100% - var(--size));
  margin-left: calc(100% - var(--size));
}
</style>
