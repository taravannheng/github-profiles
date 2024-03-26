<template>
  <div class="card" :style="`${cardStyle}`" :class="['type-card', type]">
    <p class="card__text"
      :style="`cursor: ${isClickable ? 'pointer;' : 'default;'} ${cardTextStyle}}`" @click="clickHandler"
      :class="['type-card__text', type]">{{ content }}
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
    },
    type: {
      type: String,
      validator: function (value: string) {
        return ['default', 'error'].includes(value);
      },
      default: 'default'
    }
  },
  emits: ['update:clicked-card-content'],
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
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  border-left: 4px solid map-get($colors, dark-primary);
  border-radius: 0;
  background-color: map-get($colors, medium-primary);
  color: map-get($colors, lightest);
  overflow-x: scroll;
  overflow-y: hidden;

  &__text {
    display: flex;
    flex-direction: row;
    align-items: center;
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

.type-card {
  transition: background-color 0.3s linear;

  &.default {
    background-color: map-get($colors, medium-primary);
  }

  &.error {
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    background-color: map-get($colors, light-error);
    border-left-color: map-get($colors, dark-error);
  }

  &__text {
    transition: background-color 0.3s linear;

    &.default {
      background-color: map-get($colors, light-primary);

      &:hover {
        background-color: map-get($colors, dark-primary);
      }
    }

    &.error {
      background-color: map-get($colors, light-error);

      &:hover {
        background-color: map-get($colors, dark-error);
      }
    }
  }
}
</style>

