export interface SuggestionData {
  username: string;
  avatarUrl: string;
}

export interface UserBasicData {
  avatarUrl: string;
  htmlUrl: string;
  username: string;
  followers: string;
  following: string;
  name: string;
  email: string;
}

export interface LatestRepoBasicData {
  name: string;
  description: string;
  htmlUrl: string;
}

export interface UserData {
  avatarUrl: string;
  htmlUrl: string;
  username: string;
  followers: string;
  following: string;
  name: string;
  email: string;
  latestRepoName: string | null;
  latestRepoHtmlUrl: string;
  latestRepoDescription: string;
  latestRepoLanguages: string;
  latestCommit: string;
}

export interface AvatarContent {
  avatarUrl: string;
  username: string;
}
