<template>
  <div class="display" :class="['state', state]">
    <div v-if="state === 'default'">
      <ProgressIndicator progress-indicator-text="Start your search below..."/>
    </div>
    <div v-if="state === 'error'">
      <ProgressIndicator progress-indicator-text="An error has occured, please try again later..."/>
    </div>
    <div v-if="state === 'loading'">
      <ProgressIndicator is-rotating progress-indicator-text="Loading..." />
    </div>
    <div v-if="state === 'suggestion'">
      <Suggestion v-if="suggestionData" :suggestion-data="suggestionData" :clicked-avatar-content="clickedAvatarContent"
        @update:clicked-avatar-content="clickHandler" />
    </div>
    <div v-if="state === 'profile'">
      <ProfileDisplay v-if="profileDisplayData" :profile-display-data="profileDisplayData" />
    </div>
  </div>
</template>

<script lang="ts">
import ProgressIndicator from '../progress-indicator/ProgressIndicator.vue';
import Suggestion from '../suggestion/Suggestion.vue';
import ProfileDisplay from '../profile-display/ProfileDisplay.vue';

export default {
  name: 'Display',
  components: {
    ProgressIndicator,
    Suggestion,
    ProfileDisplay,
  },
  props: {
    state: {
      type: String,
      validator: function (value: string) {
        return ['default', 'loading', 'suggestion', 'profile', 'error'].includes(value);
      },
      default: 'default'
    },
    suggestionData: {
      type: Array,
      required: false,
    },
    profileDisplayData: {
      type: Object,
      required: false,
    },
  },
  emits: ['update:clicked-avatar-content'],
  methods: {
    clickHandler(value: string) {
      if (this.state === 'suggestion') {
        this.clickedAvatarContent = value;
        this.$emit('update:clicked-avatar-content', this.clickedAvatarContent);
      }
    }
  },
  data() {
    return {
      clickedAvatarContent: '' as string,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.display {
  width: 100%;
  max-width: 100%;
  height: 560px;
  max-height: 560px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 36px;
  background-color: transparent;
}

.state.default,
.state.error,
.state.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.state.profile {
  background-color: map-get($colors, light-primary);
}
</style>

