const getUsername = document.querySelector("#getUsername"),
  getCategory = document.querySelector("#getCategory"),
  getQuestionNo = document.querySelector("#getQuestionNo"),
  startQuiz = document.querySelector("#startQuiz");

startQuiz.addEventListener("click", (evt) => {
  evt.preventDefault();

  let userInfo = {
    username: getUsername.value,
    category: getCategory.value,
    numberOfQuestions: getQuestionNo.value,
  };

  sessionStorage.setItem("currentQuizUserInfo", JSON.stringify(userInfo));
  let linkToQuiz = document.createElement("a");
  linkToQuiz.href = `quiz.html`;
  linkToQuiz.click();
});
