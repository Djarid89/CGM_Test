export class Repo {
  name: string;
  avatar: string;
  creationDate: Date;
  url: string;

  constructor(name: string, avatar: string, creationDate: Date, url: string) {
    this.name = name;
    this.avatar = avatar;
    this.creationDate = creationDate;
    this.url = url;
  }
}
