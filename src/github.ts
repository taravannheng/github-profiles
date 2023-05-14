import axios from "axios";
import _ from "lodash";

const baseURL = "https://api.github.com";

import {
  type UserBasicData,
  type LatestRepoBasicData,
  type UserData,
} from "@/types";

const getUsers = async (username: string) => {
  try {
    if (!_.isEmpty(username)) {
      const response = await axios.get(`${baseURL}/search/users?q=${username}`);
      let users = response.data.items.map((item: any) => {
        const user = {
          username: item.login,
          avatarUrl: item.avatar_url,
        };
        return user;
      });

      return users;
    }
  } catch (error) {
    console.error(error);
  }
};

const getUserData = async (username: string) => {
  try {
    let userData: UserData = {
      avatarUrl: "",
      htmlUrl: "",
      username: "",
      followers: "",
      following: "",
      name: "",
      email: "",
      latestRepoName: null,
      latestRepoHtmlUrl: "",
      latestRepoDescription: "",
      latestRepoLanguages: "",
      latestCommit: "",
    };
    const basicData = await getUserBasicData(username);

    if (!_.isEmpty(basicData)) {
      userData = {
        ...userData,
        avatarUrl: basicData?.avatarUrl ?? "",
        htmlUrl: basicData?.htmlUrl ?? "",
        username: basicData?.username ?? "",
        followers: basicData?.followers ?? "0",
        following: basicData?.following ?? "0",
        name: basicData?.name ?? "N/A",
        email: basicData?.email ?? "N/A",
      };
    }

    const repos = await getRepos(username);

    if (!_.isEmpty(repos)) {
      const latestRepoBasicData = await getLatestRepoBasicData(username);
      const latestRepoLanguages = await getLatestRepoLanguages(username);
      const latestCommit = await getLatestCommit(username);

      if (latestRepoBasicData) {
        userData = {
          ...userData,
          latestRepoName: latestRepoBasicData.name,
          latestRepoHtmlUrl: latestRepoBasicData.htmlUrl,
          latestRepoDescription: latestRepoBasicData.description,
        };
      }

      if (latestRepoLanguages) {
        userData = {
          ...userData,
          latestRepoLanguages: latestRepoLanguages,
        };
      }

      if (latestCommit) {
        userData = {
          ...userData,
          latestCommit: latestCommit,
        };
      }
    }

    return userData;
  } catch (error) {
    console.error(error);
  }
};

const getUserBasicData = async (username: string) => {
  try {
    if (!_.isEmpty(username)) {
      const response = await axios.get(`${baseURL}/users/${username}`);
      const { avatar_url, html_url, login, followers, following, name, email } =
        response.data;
      const userBasicData: UserBasicData = {
        avatarUrl: avatar_url,
        htmlUrl: html_url,
        username: login,
        followers: followers ?? "0",
        following: following ?? "0",
        name: name ?? "N/A",
        email: email ?? "N/A",
      };

      return userBasicData;
    }
  } catch (error) {
    console.error(error);
  }
};

const getRepos = async (username: string) => {
  try {
    if (!_.isEmpty(username)) {
      const response = await axios.get(`${baseURL}/users/${username}/repos`);

      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getLatestRepoName = async (username: string) => {
  const repos = await getRepos(username);

  // get the latest repo
  let latestRepo = repos[0];
  if (repos) {
    for (let i = 1; i < repos.length; i++) {
      const currentRepo = repos[i];
      const currentRepoDate = new Date(currentRepo.updated_at);
      const latestRepoDate = new Date(latestRepo.updated_at);

      if (currentRepoDate.getTime() > latestRepoDate.getTime()) {
        latestRepo = currentRepo;
      }
    }
  }

  return latestRepo?.name ?? null;
};

const getLatestRepoBasicData = async (username: string) => {
  const latestRepoName = await getLatestRepoName(username);

  try {
    if (!_.isEmpty(username) && !_.isEmpty(latestRepoName)) {
      const response = await axios.get(
        `${baseURL}/repos/${username}/${latestRepoName}`
      );
      const { name, html_url, description } = response.data;
      const latestRepo: LatestRepoBasicData = {
        name: name ?? null,
        description: description ?? "N/A",
        htmlUrl: html_url ?? "N/A",
      };

      return latestRepo;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

const getLatestRepoLanguages = async (username: string) => {
  const latestRepoName = await getLatestRepoName(username);

  try {
    let languages: string = "N/A";

    if (!_.isEmpty(username) && !_.isEmpty(latestRepoName)) {
      const response = await axios.get(
        `${baseURL}/repos/${username}/${latestRepoName}/languages`
      );

      if (response.data) {
        const languageList = Object.keys(response.data);

        if (languageList.length) {
          languages = languageList.join(" · ");
        } else {
          languages = "N/A";
        }
      }

      return languages;
    }

    return languages;
  } catch (error) {
    console.error(error);
  }
};

const getLatestCommit = async (username: string) => {
  const latestRepoName = await getLatestRepoName(username);

  try {
    if (!_.isEmpty(username) && !_.isEmpty(latestRepoName)) {
      const response = await axios.get(
        `${baseURL}/repos/${username}/${latestRepoName}/commits?per_page=1`
      );
      const commits = response.data;

      commits.sort((a: any, b: any) => {
        const dateA = new Date(a.commit.author.date);
        const dateB = new Date(b.commit.author.date);
        return dateB.getTime() - dateA.getTime();
      });

      // get the latest commit
      const latestCommit = commits[0].commit.message ?? "N/A";

      return latestCommit;
    }

    return "N/A";
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getUserData };
