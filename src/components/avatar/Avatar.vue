<template>
  <div class="avatar" v-if="avatarData" :style="`cursor: ${isClickable ? 'pointer;' : 'default;'} ${avatarStyle}}`" @click="clickHandler">
    <img :src="`${avatarData.avatar_url}`" alt="profile picture" class="avatar__img" :style="`${avatarImgStyle}`" />
    <small v-if="avatarData.username" class="avatar__username" :style="`${avatarUsernameStyle}`"><a
        :href="avatarData.html_url" target="_blank">{{ avatarData.username }}</a></small>
    <small v-if="avatarData.login" class="avatar__username is-clickable" :style="`${avatarUsernameStyle}`">{{ avatarData.login }}</small>
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
    avatarUsernameStyle: {
      type: String,
      required: false,
    },
    avatarData: {
      type: Object,
      required: false,
    },
    isClickable: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    clickHandler() {
      if (this.isClickable) {
        const avatarContent = {avatar_url: this.avatarData?.avatar_url ?? null, username: this.avatarData?.login ?? ''}
        this.$emit('update:clicked-avatar-content', avatarContent);
      }
    }
  }
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

    &.is-clickable {
      text-decoration: none;
      color: map-get($colors, lightest);
    }
  }

}

</style>

