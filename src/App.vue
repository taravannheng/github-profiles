<script lang="ts">
import _ from "lodash";

import Header from "./components/header/Header.vue";
import Display from './components/display/Display.vue';
import Card from "./components/card/Card.vue";
import SearchBox from './components/search-box/SearchBox.vue';
import { getUsers, getUserInfo, getLatestRepo, getLatestCommit } from './github';

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
      users: null as any[] |  null,
      user: null as any[] |  null,
      repo: null as any[] |  null,
      commit: null as any[] |  null,
      searchValue: '',
      submitValue: '',
      displayState: "default" as String,
      searchBoxState: "default" as String,
      suggestionData: [] as any[] | null,
    };
  },
  methods: {
    delayUpdateDisplayState(state: string) {
      setTimeout(() => {
          this.displayState = state;
        }, 900);
    },
    async getUsers() {
      this.users = await getUsers(this.searchValue);
      this.suggestionData = this.users.items;
    },
    searchHandler(value: string) {
      this.searchValue = value;

      // update Display state to loading
      this.displayState = 'loading'

      if (_.isEmpty(value) || value == undefined) {
        this.displayState = 'default';
        this.searchBoxState = 'default';
      }

      if (!_.isEmpty(value)) {
        this.getUsers();
        this.delayUpdateDisplayState('suggestion');
        this.searchBoxState = 'suggestion';
      }
    },
    submitHandler(value: string) {
      this.searchBoxState = "error";

      setTimeout(() => {
        this.searchBoxState = "default";
      }, 1000);
    }
  },
};
</script>

<template>
  <div class="container">
    <Header text="GitHub Profiles"></Header>
    <Display :state="displayState" :suggestion-data="suggestionData" />
    <SearchBox :state="searchBoxState" search-box-style="margin: auto 0;" :search-value="searchValue" @update:search-value="searchHandler" :submit-value="submitValue" @update:submit-value="submitHandler" />
  </div>

  <!-- <button class="btn btn-primary" @click="getUser">Get User Info</button> -->
</template>

<style scoped lang="scss"> @import '@/assets/scss/main.scss';

 .container {
  display: flex;
  flex-direction: column;
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
