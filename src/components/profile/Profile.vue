<template>
  <div class="profile" v-if="profileData" :style="profileStyle">
    <Avatar :avatar-data="profileData" style="margin-bottom: 8px;" />
    <ProfileInfo :profile-info-data="profileData" />
    <Bio :bio-data="profileData" style="margin-top: 32px;" />
  </div>
</template>

<script lang="ts">
import Avatar from '../avatar/Avatar.vue';
import ProfileInfo from '../profile-info/ProfileInfo.vue';
import Bio from '../bio/Bio.vue';

export default {
  name: 'Profile',
  props: {
    profileStyle: {
      type: String,
      required: false,
    },
    profileData: {
      type: Object,
      required: false,
    }
  },
  components: {
    Avatar,
    ProfileInfo,
    Bio,
  }
};
</script>

<style lang="scss" scoped>

</style>

