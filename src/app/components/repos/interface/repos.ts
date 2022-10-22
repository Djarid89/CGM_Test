import { Repo } from "../class/repos";

export interface RepoData {
  reportName: string;
  language: string;
  minStars: number;
  issueName: string;
  optionalData: boolean;
  totalReports: number;
  page: number;
}

export interface GetReposData {
  reportName: string;
  language: string;
  minStars: number;
  issueName: string;
  page: number;
}

export interface RepoResult {
  repos: Repo[];
  totalRepos: number;
}