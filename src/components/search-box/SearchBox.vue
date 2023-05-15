<template>
  <div class="search-box" :style="`${searchBoxStyle}`">
    <img src="../../assets/images/github.png" alt="github logo" class="search-box__logo" :style="`${searchBoxLogoStyle}`">
    <form class="search-box__form" @submit.prevent="submitHandler" :class="['state-search-box__form', state]">
      <div class="search-box__field-container">
        <input @focus="focusHandler" @blur="blurHandler" v-model="searchValue" type="text" class="search-box__field"
          :style="`${searchBoxFieldStyle}`" placeholder="username" :class="['state-search-box__field', state]" />
        <button type="submit" @click="submitHandler" class="search-box__button" :class="['state-search-box__button', state]"
          :style="`${searchBoxButtonStyle}`">Search</button>
        <p class="search-box__caption" :style="`${searchBoxCaptionStyle}`" :class="['state-search-box__caption', state]">
          {{ captionText }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">

import _ from "lodash";

export default {
  name: 'SearchBox',
  props: {
    searchBoxStyle: {
      type: String,
      required: false
    },
    searchBoxLogoStyle: {
      type: String,
      required: false
    },
    searchBoxFieldStyle: {
      type: String,
      required: false
    },
    searchBoxButtonStyle: {
      type: String,
      required: false
    },
    searchBoxCaptionStyle: {
      type: String,
      required: false
    },
    state: {
      type: String,
      validator: function (value: string) {
        return ['default', 'error'].includes(value);
      },
      default: 'default'
    },
  },
  computed: {
    captionText() {
      switch (this.state) {
        case 'error':
          return 'User not found';
        default:
          return 'Enter username to get user info';
      }
    }
  },
  data() {
    return {
      searchValue: '',
    }
  },
  methods: {
    focusHandler() {
      this.$emit('update:is-searchbox-focus', true);
    },
    blurHandler() {
      this.$emit('update:is-searchbox-focus', false);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    submitHandler() {
      this.$emit('update:submit-value', this.searchValue);

      // if (!_.isEmpty(this.searchValue)) {
      //   this.searchValue = '';
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.search-box {
  width: clamp(100%, 100%, 100%);
  background-color: map-get($colors, darkest);
  border-radius: 0;
  overflow: hidden;

  &__logo {
    margin-top: 16px;
    margin-left: -4px;
    margin-bottom: 8px;
    height: clamp(40px, 40px, 40px);
  }

  &__form {
    position: relative;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }

    10%,
    90% {
      transform: translateX(-10px);
    }

    20%,
    80% {
      transform: translateX(10px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-10px);
    }

    40%,
    60% {
      transform: translateX(10px);
    }

    100% {
      transform: translateX(0);
    }
  }

  &__field-container {}

  &__field {
    display: flex;
    align-items: center;
    width: clamp(100%, 100%, 100%);
    height: clamp(56px, 56px, 56px);
    padding-left: 18px;
    border: 0;
    border-radius: 0;
    margin-bottom: 4px;
    color: map-get($colors, light);
    background-color: map-get($colors, dark);
    font-size: map-get($font-sizes, body2);
    font-weight: map-get($font-weights, body2);
    transition: background-color 0.3s linear;

    &:focus {
      outline: none;
      color: map-get($colors, lightest);
      background-color: map-get($colors, light-primary) !important;
    }
  }

  &__caption {
    color: map-get($colors, light);
    font-size: map-get($font-sizes, body1);
    font-weight: map-get($font-weights, body1);
    font-style: italic;
  }

  &__button {
    position: absolute;
    top: 0;
    right: 0;
    width: clamp(112px, 112px, 112px);
    height: clamp(56px, 56px, 56px);
    border: 0;
    background-color: map-get($colors, light);
    color: map-get($colors, lightest);
    font-size: map-get($font-sizes, h5);
    font-weight: map-get($font-weights, h5);
    cursor: pointer;
    transition: background-color 0.3s linear;

    &:hover {
      background-color: map-get($colors, dark-primary);
    }
  }



}

.search-box__field:focus+.search-box__button {
  background-color: map-get($colors, dark-primary);
}

// SEARCH BOX FORM
.state-search-box__form {

  &.default {}

  &.suggestion {}

  &.error {
    animation: shake 0.1s ease-in-out 9ms;
  }

}

// SEARCH BOX FIELD

.state-search-box__field {

  &.default {
    color: map-get($colors, lightest);
    background-color: map-get($colors, dark);
  }

  &.suggestion {
    color: map-get($colors, lightest);
    background-color: map-get($colors, light-primary);
  }

  &.error {
    color: map-get($colors, lightest);
    background-color: map-get($colors, light-error);
  }

}


// SEARCH BOX CAPTION

.state-search-box__caption {

  &.default {}

  &.suggestion {}

  &.error {
    color: map-get($colors, dark-error);
  }

}

// SEARCH BOX BUTTON

.state-search-box__button {

  &.default {
    color: map-get($colors, lightest);
    background-color: map-get($colors, light);
  }

  &.suggestion {
    color: map-get($colors, lightest);
    background-color: map-get($colors, dark-primary);
  }

  &.error {
    color: map-get($colors, lightest);
    background-color: map-get($colors, dark-error);
  }

}
</style>

