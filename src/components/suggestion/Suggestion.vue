<template>
  <div class="suggestion" :style="`${suggestionStyle}`">
    <h1 class="suggestion__title">Users</h1>
    <small class="suggestion__caption" v-if="suggestionData.length">Here's what we found...</small>
    <div class="suggestion__avatar-container">
      <div class="suggestion__avatar" v-for="(item, index) in suggestionData" v-if="suggestionData" :key="index">
        <Avatar :avatar-data="item" is-clickable :clicked-avatar-content="clickedAvatarContent"
          @update:clicked-avatar-content="clickHandler" class="suggestion__avatar-content" />
      </div>
      <div class="suggestion__avatar-empty" v-if="!suggestionData.length"><span class="card-empty__text"></span>We couldn't
        find any users...</div>
    </div>
  </div>
</template>

<script lang="ts">

import Avatar from "../avatar/Avatar.vue";

export default {
  name: 'Suggestion',
  data() {
    return {
      clickedAvatarContent: '' as string,
    }
  },
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
  methods: {
    clickHandler(value: string) {
      this.clickedAvatarContent = value;
      this.$emit('update:clicked-avatar-content', this.clickedAvatarContent);
    }
  },
  components: {
    Avatar,
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

  &__avatar-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 100%;
    margin-top: 24px;
  }

  &__avatar {
    flex-grow: 1;
    height: auto;
    
    &:hover {
      background-color: map-get($colors, light-primary);
    }
  }

  &__avatar-content {
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
    padding: 24px;
  }

  &__avatar-empty {
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
  }
}

.avatar-empty {

  &__text {
    color: map-get($colors, light);
  }
}
</style>

