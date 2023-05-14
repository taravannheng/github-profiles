import axios from "axios";
import _ from "lodash";

const baseURL = "https://api.github.com";


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

const getUserInfo = async (username: string) => {
  try {
    if (!_.isEmpty(username)) {
      const response = await axios.get(`${baseURL}/users/${username}`);
      return response.data;
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

const getLatestRepo = async (username: string) => {
  const repos = await getRepos(username);

  // get the latest repo
  let mostRecentRepo = repos[0];
  if (repos) {
    for (let i = 1; i < repos.length; i++) {
      const currentRepo = repos[i];
      const currentRepoDate = new Date(currentRepo.updated_at);
      const mostRecentRepoDate = new Date(mostRecentRepo.updated_at);

      if (currentRepoDate.getTime() > mostRecentRepoDate.getTime()) {
        mostRecentRepo = currentRepo;
      }
    }
  }

  try {
    if (!_.isEmpty(username) && !_.isEmpty(mostRecentRepo)) {
      const response = await axios.get(`${baseURL}/repos/${username}/${mostRecentRepo.name}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getRepoLanguages = async (username: string) => {
  const latestRepo = await getLatestRepo(username);
  const latestRepoName = latestRepo?.name ?? null;

  try {
    if (!_.isEmpty(username) && !_.isEmpty(latestRepoName)) {
      const response = await axios.get(`${baseURL}/repos/${username}/${latestRepoName}/languages`);
      return response.data;
    }

    return null;
  } catch(error) {
    console.error(error);
  }
}

const getLatestCommit = async (username: string) => {
  const latestRepo = await getLatestRepo(username);
  const latestRepoName = latestRepo?.name ?? null;

  try {
    if (!_.isEmpty(username) && !_.isEmpty(latestRepoName)) {
      const response = await axios.get(`${baseURL}/repos/${username}/${latestRepoName}/commits?per_page=1`);
      const commits = response.data;
    
      commits.sort((a: any, b: any) => {
        const dateA = new Date(a.commit.author.date);
        const dateB = new Date(b.commit.author.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      // get the latest commit
      const latestCommit = commits[0];
    
      return latestCommit;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getUserInfo, getLatestRepo, getRepoLanguages, getLatestCommit };
