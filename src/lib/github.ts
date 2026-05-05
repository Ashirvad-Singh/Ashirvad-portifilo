import axios from "axios";

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  owner: { login: string; avatar_url: string };
  homepage: string | null;
}

export async function fetchStarredRepos(): Promise<Repo[]> {
  const { data } = await axios.get<Repo[]>(
    "https://api.github.com/users/Ashirvad-Singh/starred?per_page=100&page=1",
    { headers: { Accept: "application/vnd.github.mercy-preview+json" } },
  );
  return data;
}

export function repoImage(repo: Repo) {
  return `https://opengraph.githubassets.com/1/${repo.full_name}`;
}
