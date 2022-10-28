import Questions from "./questions.js";
import Display from "./display.js";
import Quiz from "./quiz.js";
import Time from "./time.js";
import Navigation from "./navigation.js";

class Main {
  constructor(url) {
    this.url = url;
  }
  main() {
    let url = this.url;
    new Questions(url).getQuestions().then((questions_data) => {
      let idisplay = new Display(questions_data);
      idisplay.displayQuestions();
      idisplay.displayNavigation();
      new Quiz().submitQuiz();
      let quizDuration = questions_data.results.length * 0.5;
      new Time().startTimer(60 * quizDuration);
      new Navigation().takeUserToQuestion(questions_data);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let category, numberOfQuestions, url, domain;
  let getUserInfo = sessionStorage.getItem("currentQuizUserInfo");
  getUserInfo = JSON.parse(getUserInfo);
  if (getUserInfo == null) {
    let linkToStart = document.createElement("a");
    linkToStart.href = `startQuiz.html`;
    linkToStart.click();
  }
  document.querySelector("#username").textContent =
    "'" + getUserInfo.username.toUpperCase() + "'";
  category = getUserInfo.category;
  numberOfQuestions = getUserInfo.numberOfQuestions;
  domain = `https://opentdb.com/api.php?`;
  url = `${domain}amount=${numberOfQuestions}&category=${category}&type=multiple`;
  // url = `api.json`;
  const RUN_MAIN = new Main(url);
  RUN_MAIN.main();
});
// https://opentdb.com/api.php?amount=20&category=18&type=multiple
