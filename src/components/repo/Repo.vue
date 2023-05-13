<template>
  <div class="repo" :style="`${repoStyle}`" v-if="repoData">
    <h1 class="repo__title">Latest Repository</h1>
    <div class="repo__body">
      <div class="body__icon"><font-awesome-icon icon="book-bookmark" class="repo__icon" /></div>
      <div class="body__details">
        <h2 class="details__repo-name"><a :href="`${repoData.latestRepoHTMLURL}`" target="_blank">{{
          repoData.latestRepoName }}</a></h2>
        <p class="details__repo-description">{{ repoData.latestRepoDescription }}</p>
        <div class="details__repo-language">
          <h3 class="repo-language__title">Languages</h3>
          <Card :content="repoData.latestRepoLanguages" style="max-height: 24px; padding: 14px 0; max-width: 300px; white-space: nowrap;" />
        </div>
        <div class="details__repo-commit">
          <h3 class="repo-commit__title">Latest Commit</h3>
          <Card :content="repoData.latestRepoLatestCommit" style="max-height: 24px; padding: 14px 0; max-width: 300px; white-space: nowrap;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../card/Card.vue';

export default {
  name: 'Repo',
  props: {
    repoStyle: {
      type: String,
      required: false
    },
    repoData: {
      type: Object,
      required: false,
    }
  },
  computed: {
    getLanguagesLength() {
      let length = 0;

      if (this.repoData) {
        length = Object.keys(this.repoData.latestRepoLanguages).length;
      }


      return length;
    }
  },
  method: {
    getLanguageText(obj: any): string {
      const keys = Object.keys(obj);
      return keys.join(" . ");
    },
  },
  components: {
    Card,
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.repo {

  color: map-get($colors, lightest);

  &__title {
    color: map-get($colors, lightest);
    font-size: map-get($font-sizes, h4);
    font-weight: map-get($font-weights, h4);
    margin-bottom: 18px;
  }

  &__body {
    display: flex;
    flex-direction: row;
  }

  &__icon {
    // font-size: map-get($font-sizes, h4);
    margin-right: 16px;
  }

}

.details {

  &__repo-name {
    color: map-get($colors, dark-primary);
    font-size: map-get($font-sizes, h5);
    font-weight: map-get($font-weights, h5);
    margin: 0;
    margin-bottom: 8px;
    padding: 0;
    padding-top: 1px;

    & a {
      color: inherit;
    }
  }

  &__repo-description {
    font-size: map-get($font-sizes, body1);
    font-weight: map-get($font-weights, body1);
    margin-bottom: 16px;
  }

  &__repo-language {
    width: clamp(100%, 100%, 100%);
    margin-bottom: 24px;
  }

}

.repo-language {

  &__title {
    font-size: map-get($font-sizes, body2);
    font-weight: map-get($font-weights, h5);
    margin-bottom: 12px;
  }

}

.repo-commit {

  &__title {
    font-size: map-get($font-sizes, body2);
    font-weight: map-get($font-weights, h5);
    margin-bottom: 12px;
  }

}

.body {
  &__details {
    width: clamp(100%, 100%, 100%);
  }
}
</style>

