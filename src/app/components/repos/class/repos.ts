export class Repo {
  name: string;
  avatar: string;
  creationDate: Date;

  constructor(name: string, avatar: string, creationDate: Date) {
    this.name = name;
    this.avatar = avatar;
    this.creationDate = creationDate;
  }
}
