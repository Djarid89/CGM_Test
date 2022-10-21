export class Commit {
  author: string;
  url: string;
  message: string;

  constructor(author: string, url: string, message: string) {
    this.author = author;
    this.url = url;
    this.message = message;
  }
}
