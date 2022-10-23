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

  constructor() {
    super();
    this.reportName = '';
    this.language = '';
    this.minStars = 0;
    this.issueName = '';
  }

  setData(reportName: string, language: string, minStars: number, issueName: string): void {
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