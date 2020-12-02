export interface APIUserInfo {
  login: string;
  name: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  email?: string;
  location?: string;
}

export interface APIRepositories {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  forks: number;
  html_url: string;
  description?: string;
}
