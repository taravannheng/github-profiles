<template>
  <div class="bio" :style="`${bioStyle}`" v-if="bioData">
    <div class="bio__name"><font-awesome-icon icon="user" class="name__icon" /><span class="name__text">{{ bioData.name
    }}</span></div>
    <div class="bio__email"><font-awesome-icon icon="paper-plane" class="email__icon" /><span class="email__text">{{
      bioData.email }}</span></div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Bio',
  props: {
    bioData: {
      type: Object,
      required: false,
    },
    bioStyle: {
      type: String,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.bio {

  color: map-get($colors, lightest);
  font-size: map-get($font-sizes, body1);
  font-weight: map-get($font-weights, body1);

  &__name {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }

  &__email {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

}

.name {
  &__icon {
    margin-right: 12px;
  }
}

.email {
  &__icon {
    margin-right: 12px;
  }
}
</style>

