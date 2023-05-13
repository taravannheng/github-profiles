<template>
  <div class="profile-display" v-if="profileDisplayData" :style="profileDisplayStyle">
    <div class="profile-display__content">
      <Profile :profile-data="profileDisplayData" />
      <Divider style="margin: 40px 0;" />
      <Repo :repo-data="profileDisplayData" />
    </div>
  </div>
</template>

<script lang="ts">
import Profile from '../profile/Profile.vue';
import Repo from '../repo/Repo.vue';
import Divider from '../divider/Divider.vue';

export default {
  name: 'ProfileDisplay',
  props: {
    profileDisplayStyle: {
      type: String,
      required: false,
    },
    profileDisplayData: {
      type: Object,
      required: false,
    }
  },
  components: {
    Profile,
    Repo,
    Divider,
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.profile-display {
  padding-top: 36px;
  margin-left: 24px;
  margin-right: 24px;

}
</style>

