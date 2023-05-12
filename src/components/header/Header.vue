<template>
  <header class="header d-flex justify-content-center align-items-center" :style="headerStyle">
    <h1 class="header__text" :style="headerTextStyle">{{ text }}</h1>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
  props: {
    text: {
      type: String,
      required: true
    },
    headerStyle: {
      type: Object,
      required: false
    },
    headerTextStyle: {
      type: Object,
      required: false
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.header {

  &__text {
    color: map-get($colors, dark-primary);
    font-size: map-get($font-sizes, h3);
    font-weight: map-get($font-weights, h3);
    padding-top: 52px;

    @media only screen and (min-width: 640px) {
      font-size: map-get($font-sizes, h2);
      font-weight: map-get($font-weights, h2);
    }

    @media only screen and (min-width: 768px) {
      padding-top: 80px;
    }

    @media only screen and (min-width: 1024px) {
      font-size: map-get($font-sizes, h1);
      font-weight: map-get($font-weights, h1);
    }
  }

}
</style>

