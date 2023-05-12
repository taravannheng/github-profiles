import axios from "axios";

const baseURL = "https://api.github.com";

const getUserInfo = async (username: string) => {
  const response = await axios.get(`${baseURL}/users/${username}`);
  return response.data;
};

const getRepos = async (username: string) => {
  const response = await axios.get(`${baseURL}/users/${username}/repos`);
  https: return response.data;
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

  const response = await axios.get(`${baseURL}/repos/${username}/${mostRecentRepo.name}`);
  return response.data;
};

const getLatestCommit = async (username: string) => {
  const latestRepo = await getLatestRepo(username);
  const response = await axios.get(`${baseURL}/repos/${username}/${latestRepo.name}/commits?per_page=1`);
  const commits = response.data;

  commits.sort((a: any, b: any) => {
    const dateA = new Date(a.commit.author.date);
    const dateB = new Date(b.commit.author.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // get the latest commit
  const latestCommit = commits[0];

  return latestCommit;
};

export { getUserInfo, getLatestRepo, getLatestCommit };
