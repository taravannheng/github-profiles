<template>
  <div class="card" :style="`${cardStyle}`">
    <p class="card__text d-flex flex-row align-items-center"
      :style="`cursor: ${isClickable ? 'pointer;' : 'default;'} ${cardTextStyle}}`" @click="clickHandler">{{ content }}
    </p>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Card',
  props: {
    cardStyle: {
      type: String,
      required: false,
    },
    cardTextStyle: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    isClickable: {
      type: Boolean,
      required: false,
    }
  },
  methods: {
    clickHandler() {
      if (this.isClickable) {
        this.$emit('update:clicked-card-content', this.content);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: clamp(100%, 100%, 100%);
  height: clamp(56px, 56px, 56px);
  margin: 0;
  border-left-width: 4px;
  border-left-color: map-get($colors, dark-primary);
  border-radius: 0;
  background-color: map-get($colors, medium-primary);
  color: map-get($colors, lightest);
  overflow-x: scroll;
  overflow-y: hidden;

  &__text {
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
    padding-left: 18px;
    padding-right: 18px;
    margin: 0;
    transition: background-color 0.3s linear;

    &:hover {
      background-color: map-get($colors, dark-primary);
    }
  }
}
</style>

