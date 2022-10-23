import { GetData } from "src/app/shared/interface/shared";
import { Commit } from "../class/commits";

export class GetCommitData extends GetData {
  repoName: string;

  constructor(repoName: string) {
    super();
    this.repoName = repoName
  }
}

export interface GetCommitResult {
  commits: Commit[];
  totalCommits: number;
}
