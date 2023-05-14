<template>
  <div class="progress-indicator" :style="`${progressIndicatorStyle}`">
    <img src="../../assets/images/invertocat.png" alt="invertocat" class="progress-indicator__logo"
      :class="{ 'rotate': isRotating }" :style="`${progressIndicatorLogoStyle}`">
    <p class="progress-indicator__text-container" :style="`${progressIndicatorTextContainerStyle}`"><span
        class="progress-indicator__text" :style="`${progressIndicatorTextStyle}`">{{ progressIndicatorText }}</span></p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProgressIndicator',
  props: {
    progressIndicatorStyle: {
      type: String,
      required: false
    },
    progressIndicatorLogoStyle: {
      type: String,
      required: false
    },
    progressIndicatorTextContainerStyle: {
      type: String,
      required: false
    },
    progressIndicatorTextStyle: {
      type: String,
      required: false
    },
    progressIndicatorText: {
      type: String,
      required: true
    },
    isRotating: {
      type: Boolean,
      required: false
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.progress-indicator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__logo {
    height: clamp(64px, 64px, 64px);
    margin-bottom: 32px;

    @media only screen and (min-width: 1024px) {
      height: clamp(80px, 80px, 80px);
    }
  }

  &__text {
    color: map-get($colors, light);
    font-size: map-get($font-sizes, body1);
    font-weight: map-get($font-weights, body1);
  }

  .rotate {
    animation: spin 2s infinite linear forwards;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>

