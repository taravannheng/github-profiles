<script lang="ts">
import _ from "lodash";

import Header from "./components/header/Header.vue";
import Display from './components/display/Display.vue';
import Card from "./components/card/Card.vue";
import SearchBox from './components/search-box/SearchBox.vue';
import { getUsers, getUserData } from './github';
import { type SuggestionData, type AvatarContent, type UserData } from "@/types";

export default {
  name: 'App',
  components: {
    Header,
    Display,
    SearchBox,
    Card,
  },
  data() {
    return {
      isSearchBoxFocus: false,
      displayStyle: 'max-width: 100%;' as string,
      submitValue: '' as string,
      displayState: "default" as string,
      searchBoxState: "default" as string,
      suggestionData: [] as SuggestionData[] | null,
      profileDisplayData: {} as UserData,
      clickedAvatarContent: {} as AvatarContent,
    };
  },
  methods: {
    clickedAvatarHandler(value: AvatarContent) {
      this.submitValue = value.username;
      this.displayState = 'loading';
      this.submitHandler(this.submitValue);
    },
    getDisplayStyle() {
      return this.displayState === 'profile' ? 'max-width: 382px;' : 'max-width: 100%;';
    },
    delayUpdateDisplayState(state: string) {
      setTimeout(() => {
        this.displayState = state;
      }, 900);
    },
    searchBoxFocusHandler(value: boolean) {
      this.isSearchBoxFocus = value;
      if (this.isSearchBoxFocus) {
        this.displayState = 'default';
        this.displayStyle = this.getDisplayStyle();
      }

      if (!this.isSearchBoxFocus) {
        this.searchBoxState = 'default';
      }
    },
    async getUsers() {
      const users = await getUsers(this.submitValue);
      this.suggestionData = users;
    },
    async getProfileDisplayData() {
      const userData = await getUserData(this.submitValue);

      this.profileDisplayData = userData;
    },
    async searchHandler(value: string) {
      this.submitValue = value;

      if (_.isEmpty(value)) {
        this.searchBoxState = "error";

        if (this.displayState === 'suggestion') {
          this.displayState = 'default';
        }

        setTimeout(() => {
          this.searchBoxState = "default";
        }, 1000);
      }

      if (!_.isEmpty(this.submitValue)) {
        // update Display state to loading
        this.displayState = 'loading'

        // reset display style to default
        this.displayStyle = this.getDisplayStyle();

        if (_.isEmpty(this.submitValue) || this.submitValue == undefined) {
          this.displayState = 'default';
          this.searchBoxState = 'default';
        }

        if (!_.isEmpty(this.submitValue)) {
          const users = await this.getUsers();

          if (users === undefined) {
            this.delayUpdateDisplayState('error');
          } else {
            this.delayUpdateDisplayState('suggestion');
          }

          this.searchBoxState = 'default';
        }
      }

      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    async submitHandler(value: string) {
      this.submitValue = value;

      if (_.isEmpty(value)) {
        this.searchBoxState = "error";

        setTimeout(() => {
          this.searchBoxState = "default";
        }, 1000);
      }

      if (!_.isEmpty(value)) {
        this.displayState = 'loading';

        // get user data
        await this.getProfileDisplayData();

        // update the states for search box and display
        this.displayState = "profile";
        this.searchBoxState = "default";

        // set max width to display component
        this.displayStyle = this.getDisplayStyle();
      }

      // scroll to top
      window.scrollTo({
        top: -100,
        behavior: 'smooth',
      })
    }
  },
};
</script>

<template>
  <div class="container">
    <Header text="GitHub Profiles"></Header>
    <Display :state="displayState" :suggestion-data="suggestionData" :profile-display-data="profileDisplayData"
      :style="this.displayStyle" @update:clicked-avatar-content="clickedAvatarHandler"
      :clicked-avatar-content="clickedAvatarContent" class="container__display" />
    <SearchBox :state="searchBoxState" search-box-style="margin: auto 0;" :is-searchbox-focus="isSearchBoxFocus"
      @update:is-searchbox-focus="searchBoxFocusHandler" :submit-value="submitValue" @update:submit-value="searchHandler"
      class="container__search-box" />
  </div>
</template>

<style scoped lang="scss"> @import '@/assets/scss/main.scss';

 .container {
   display: flex;
   flex-direction: column;
   align-items: center;
   min-width: 100%;
   width: 100%;
   max-width: 1024px;
   height: clamp(100vh, 100vh, 100vh);
   background-color: map-get($colors, darkest);
   padding: 0 24px;
   overflow: hidden;

   @media only screen and (min-width: 640px) {
     padding: 0 40px;
   }

   @media only screen and (min-width: 1024px) {
     padding: 0 80px;
   }

   &__display {
     margin-top: 16px;
   }

   &__search-box {
     position: absolute;
     bottom: 80px;
     left: 0;
     padding: 0 24px;

     @media only screen and (min-width: 640px) {
       padding: 0 40px;
     }

     @media only screen and (min-width: 1024px) {
       padding: 0 80px;
     }
   }
 }
</style>
