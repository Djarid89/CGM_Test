import { GetData } from "src/app/shared/interface/shared";
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

export class GetReposData extends GetData {
  reportName: string;
  language: string;
  minStars: number;
  issueName: string;

  constructor(reportName: string, language: string, minStars: number, issueName: string, repoPage?: number) {
    super(repoPage);
    this.reportName = reportName;
    this.language = language;
    this.minStars = minStars;
    this.issueName = issueName;
  }
}

export interface GetRepoResult {
  repos: Repo[];
  totalRepos: number;
}