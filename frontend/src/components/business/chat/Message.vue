<template>
  <div :class="{ [$style.container]: true, [$style.right]: !left }">
    <div :class="$style.body">
      <div :class="left ? $style.headerSelf : $style.headerNotSelf">
        <p :class="$style.paragraph">
          {{ author }}
          <span style="float:right">{{ time }}</span>
        </p>
      </div>
      <div :class="$style.text">
        <p :class="$style.paragraph">{{ text }}</p>
      </div>
    </div>
    <div :class="left ? $style.arrowRight : $style.arrowLeft"></div>
  </div>
</template>

<script>
import { formatAMPM } from '@/utils/time';
export default {
  props: {
    author: String,
    text: String,
    left: Boolean,
    timestamp: Number
  },
  computed: {
    time() {
      return formatAMPM(new Date(this.timestamp));
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 99fr 1fr;
  align-items: end;
}

.right {
  direction: rtl;
}

.paragraph {
  margin: 0;
  padding: 1em;
}

.headerSelf {
  background-color: #f0cbb3;
}

.headerNotSelf {
  background-color: #becbd9;
}

.body {
  overflow: hidden;
  direction: ltr;
  border-radius: 15px;
  background-color: white;
}

.arrowRight {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid white;
  margin-bottom: 10px;
}

.arrowLeft {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  margin-bottom: 10px;
}
</style>
