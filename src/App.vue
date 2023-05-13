<script lang="ts">
import _ from "lodash";

import Header from "./components/header/Header.vue";
import Display from './components/display/Display.vue';
import Card from "./components/card/Card.vue";
import SearchBox from './components/search-box/SearchBox.vue';
import { getUsers, getUserInfo, getLatestRepo, getRepoLanguages, getLatestCommit } from './github';

interface ProfileDisplayData {
  avatar_url: string;
  html_url: string;
  username: string;
  followers: string;
  following: string;
  name: string;
  email: string;
  latestRepoName: string;
  latestRepoHTMLURL: string;
  latestRepoDescription: string;
  latestRepoLanguages: object;
  latestRepoLatestCommit: string;
}


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
      displayStyle: 'margin-top: 52px; max-width: 100%;' as string,
      searchValue: '' as string,
      submitValue: '' as string,
      displayState: "default" as String,
      searchBoxState: "default" as String,
      suggestionData: [] as any[] | null,
      userInfo: {} as any,
      userLatestRepo: {} as any,
      userLatestRepoLanguages: {} as any,
      userLatestCommit: {} as any,
      profileDisplayData: {} as ProfileDisplayData,
    };
  },
  methods: {
    getDisplayStyle() {
      return this.displayState === 'profile' ? 'margin-top: 52px; max-width: 382px;' : 'margin-top: 52px; max-width: 100%;';
    },
    delayUpdateDisplayState(state: string) {
      setTimeout(() => {
        this.displayState = state;
      }, 900);
    },
    searchBoxFocusHandler(value: boolean) {
      this.isSearchBoxFocus = value;
      if (this.isSearchBoxFocus) {

        // update display state to default and reset display style to default
        this.displayState = 'default';
        this.displayStyle = this.getDisplayStyle();
      }
    },
    async getUsers() {
      const response = await getUsers(this.searchValue);
      this.suggestionData = response.items;
    },
    async getUserInfo() {
      this.userInfo = await getUserInfo(this.submitValue);
    },
    async getLatestRepo() {
      this.userLatestRepo = await getLatestRepo(this.submitValue);
    },
    async getRepoLanguages() {
      const response = await getRepoLanguages(this.submitValue);
      let languages = Object.keys(response).join(" · ");

      if (_.isEmpty(languages)) {
        languages = 'N/A';
      }

      this.userLatestRepoLanguages = languages;
    },
    async getLatestCommit() {
      const response = await getLatestCommit(this.submitValue);
      this.userLatestCommit = response.commit.message;
    },
    async searchHandler(value: string) {
      this.searchValue = value;

      // reset display style to default
      this.displayStyle = this.getDisplayStyle();

      // update Display state to loading
      this.displayState = 'loading'

      if (_.isEmpty(value) || value == undefined) {
        this.displayState = 'default';
        this.searchBoxState = 'default';
      }

      if (!_.isEmpty(value)) {
        await this.getUsers();
        this.delayUpdateDisplayState('suggestion');
        this.searchBoxState = 'suggestion';
      }
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
        // get user info
        await this.getUserInfo();

        // get the latest repo
        await this.getLatestRepo();

        // get the latest repo
        await this.getRepoLanguages();

        // get the latest commit
        await this.getLatestCommit();

        // add details to profileData
        this.profileDisplayData.avatar_url = this.userInfo.avatar_url;
        this.profileDisplayData.html_url = this.userInfo.html_url;
        this.profileDisplayData.username = this.userInfo.login;
        this.profileDisplayData.followers = this.userInfo.followers;
        this.profileDisplayData.following = this.userInfo.following;
        this.profileDisplayData.name = this.userInfo?.name ?? 'N/A';
        this.profileDisplayData.email = this.userInfo?.email ?? 'N/A';
        this.profileDisplayData.latestRepoName = this.userLatestRepo?.name ?? 'N/A';
        this.profileDisplayData.latestRepoHTMLURL = this.userLatestRepo?.html_url ?? 'N/A';
        this.profileDisplayData.latestRepoDescription = this.userLatestRepo?.description ?? 'N/A';
        this.profileDisplayData.latestRepoLanguages = this.userLatestRepoLanguages ?? 'N/A';
        this.profileDisplayData.latestRepoLatestCommit = this.userLatestCommit ?? 'N/A';

        // update the states for search box and display
        this.displayState = "profile";
        this.searchBoxState = "default";

        // set max width to display component
        this.displayStyle = this.getDisplayStyle();
      }
    }
  },
};
</script>

<template>
  <div class="container">
    <Header text="GitHub Profiles"></Header>
    <Display :state="displayState" :suggestion-data="suggestionData" :profile-display-data="profileDisplayData"
      :style="this.displayStyle" />
    <SearchBox :state="searchBoxState" search-box-style="margin: auto 0;" :is-searchbox-focus="isSearchBoxFocus" @update:is-searchbox-focus="searchBoxFocusHandler"  :search-value="searchValue"
      @update:search-value="searchHandler" :submit-value="submitValue" @update:submit-value="submitHandler" />
  </div>
</template>

<style scoped lang="scss"> 

@import '@/assets/scss/main.scss';

 .container {
   display: flex;
   flex-direction: column;
   align-items: center;
   min-width: 100%;
   width: 100%;
   max-width: 1024px;
   height: 100%;
   background-color: map-get($colors, darkest);
   padding: 0 24px;

   @media only screen and (min-width: 640px) {
     padding: 0 40px;
   }

   @media only screen and (min-width: 1024px) {
     padding: 0 80px;
   }
 }
</style>
