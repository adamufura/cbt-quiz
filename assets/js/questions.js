export default class Questions {
  constructor(url) {
    this.url = url;
  }
  async getQuestions() {
    try {
      let url = this.url;
      return await fetch(url).then((value) => value.json());
    } catch (err) {
      console.error(err);
    }
  }
}
