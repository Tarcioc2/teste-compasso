import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
});

export default class GitHubApi {
  static getUserInfo(username: string) {
    return api.get(`users/${username}`);
  }

  static getUserRepositories(username: string) {
    return api.get(`users/${username}/repos`);
  }

  static getUserRepositorie(username: string, repositorie: string) {
    return api.get(`repos/${username}/${repositorie}`);
  }

  static getUserFavorites(username: string) {
    return api.get(`users/${username}/starred`);
  }
}
