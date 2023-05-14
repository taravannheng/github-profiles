export interface UserBasicInfo {
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
  followers: string;
  following: string;
}

export interface ProfileDisplayData {
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

export interface AvatarContent {
  avatar_url: string;
  username: string;
}