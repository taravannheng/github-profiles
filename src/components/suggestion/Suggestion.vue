<template>
  <div class="suggestion" :style="`${suggestionStyle}`">
    <h1 class="suggestion__title">Users</h1>
    <small class="suggestion__caption" v-if="suggestionData.length">Here's what we found...</small>
    <div class="suggestion__card-container d-flex flex-column gap-1">
      <div class="suggestion__card" v-for="(item, index) in suggestionData" v-if="suggestionData" :key="index">
        <Card :content="item.login" />
        <!-- add is-clickable prop to the card component when able to fill the searchbox with the content of the card -->
      </div>
      <div class="suggestion__card-empty" v-if="!suggestionData.length"><span class="card-empty__text"></span>We couldn't
        find any users...</div>
    </div>
  </div>
</template>

<script lang="ts">

import Card from "../card/Card.vue";

export default {
  name: 'Suggestion',
  props: {
    suggestionStyle: {
      type: String,
      required: false,
    },
    suggestionData: {
      type: Array,
      required: true,
    },
  },
  components: {
    Card,
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.suggestion {
  width: clamp(100%, 100%, 100%);
  height: clamp(100%, 100%, 100%);

  &__title {
    color: map-get($colors, lightest);
    font-size: map-get($font-sizes, h4);
    font-weight: map-get($font-weights, h4);
  }

  &__caption {
    color: map-get($colors, light);
    font-size: map-get($font-sizes, body1);
    font-weight: map-get($font-weights, body1);
  }

  &__card-container {
    margin-top: 24px;
  }

  &__card-empty {
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
  }
}

.card-empty {

  &__text {
    color: map-get($colors, light);
  }
}
</style>

