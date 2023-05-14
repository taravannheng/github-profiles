<template>
  <div class="profile-info" v-if="profileInfoData" :style="profileInfoStyle">
    <small class="profile-info__username"><a
        :href="profileInfoData.html_url" target="_blank">{{ profileInfoData.username }}</a></small>
    <div class="profile-info__follow">
      <small>{{ profileInfoData.followers }} Followers</small>
      <small class="follow__middle-dot">·</small>
      <small>{{ profileInfoData.following }} Following</small>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileInfo',
  props: {
    profileInfoStyle: {
      type: String,
      required: false,
    },
    profileInfoData: {
      type: Object,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.profile-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &__username {
    color: map-get($colors, dark-primary);
    font-size: map-get($font-sizes, body2);
    font-weight: map-get($font-weights, body2);
    text-decoration: underline;

    & a {
      color: inherit;
    }
  }

  &__follow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: map-get($colors, lightest);
    font-size: map-get($font-sizes, body1);
    font-weight: map-get($font-weights, body1);
  }

}

.follow {

  &__middle-dot {
    margin: 0 8px;
  }

}
</style>