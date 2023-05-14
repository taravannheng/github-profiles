<template>
  <div class="avatar" :style="`${avatarStyle}`" v-if="avatarData">
    <img :src="`${avatarData.avatar_url}`" alt="profile picture" class="avatar__img" :style="`${avatarImgStyle}`" />
    <small class="avatar__username"><a
        :href="avatarData.html_url" target="_blank">{{ avatarData.username }}</a></small>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Avatar',
  props: {
    avatarStyle: {
      type: String,
      required: false,
    },
    avatarImgStyle: {
      type: String,
      required: false,
    },
    avatarData: {
      type: Object,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  &__username {
    color: map-get($colors, dark-primary);
    font-size: map-get($font-sizes, body2);
    font-weight: map-get($font-weights, body2);
    text-decoration: underline;

    & a {
      color: inherit;
    }
  }

}

</style>

