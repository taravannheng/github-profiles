<template>
  <div class="avatar" :style="`${avatarStyle}`" v-if="avatarData">
    <img :src="`${avatarData.avatar_url}`" alt="profile picture" class="avatar__img" :style="`${avatarImgStyle}`" />
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
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &__img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

}

</style>

