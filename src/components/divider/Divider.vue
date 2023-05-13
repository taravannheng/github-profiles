<template>
  <div class="divider" :style="`${dividerStyle}`">
  </div>
</template>

<script lang="ts">

export default {
  name: 'Divider',
  props: {
    dividerStyle: {
      type: String,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.divider {
  width: clamp(100%, 100%, 100%);
  height: 1px;
  background-color: map-get($colors, dark-primary);
}
</style>

