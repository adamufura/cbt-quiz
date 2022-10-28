import Quiz from "./quiz.js";
import Navigation from "./navigation.js";

export default class Display {
  constructor(data) {
    this.data = data;
  }

  static questionLength;

  displayQuestions() {
    let questions = this.data.results;
    Display.questionLength = questions.length;

    const nextQuestion = document.querySelector("#next"),
      prevQuestion = document.querySelector("#prev");

    document.querySelector("#qLen").textContent = Display.questionLength;
    let remainingMsg = `Questions Remaining: ${Display.questionLength}`;
    document.querySelector("#qRemaining").textContent = remainingMsg;

    let CORRECT_ANSWERS = [];
    questions.forEach((value, index, arr) => {
      index++;
      const options = value.incorrect_answers.push(value.correct_answer);
      value.incorrect_answers.sort();
      let Correct_answerMap = new Map();
      CORRECT_ANSWERS[index] = Correct_answerMap.set(
        index,
        value.correct_answer
      );
      return options;
    });

    Quiz.correct_answers = CORRECT_ANSWERS;

    let current_question = 0;
    displayCurrentQuestion(
      questions[current_question],
      current_question,
      false
    );
    nextQuestion.addEventListener("click", (evt) => {
      current_question++;
      if (current_question === questions.length) {
        current_question = 0;
      }
      displayCurrentQuestion(
        questions[current_question],
        current_question,
        true
      );
    });

    prevQuestion.addEventListener("click", (evt) => {
      current_question--;
      if (current_question === -1) {
        current_question = questions.length - 1;
      }
      displayCurrentQuestion(
        questions[current_question],
        current_question,
        true
      );
    });
  }

  displayNavigation() {
    let questionsNav = this.data.results;
    const questionNavigation = document.querySelector("#questionNavigation");

    let RowLength = Display.questionLength / 5;

    let questionNavArr = [];
    questionsNav.forEach((value, index) => {
      index++;
      questionNavArr.push(index);
    });

    for (let i = 1; i <= RowLength; i++) {
      let currentRow = questionNavArr.slice(0, 5);
      let markup = `
                <tr>
                    <td><a href="#">${currentRow[0]}</a></td>
                    <td><a href="#">${currentRow[1]}</a></td>
                    <td><a href="#">${currentRow[2]}</a></td>
                    <td><a href="#">${currentRow[3]}</a></td>
                    <td><a href="#">${currentRow[4]}</a></td>
                </tr>
                `;
      questionNavigation.insertAdjacentHTML("beforeend", markup);

      questionNavArr.splice(0, 5);
    }
  }

  checkAnswered(user_answers, currentQuestionNo) {
    let userAnswered = user_answers[currentQuestionNo];

    if (userAnswered !== undefined) {
      document.querySelectorAll(".ans_options").forEach((value) => {
        if (userAnswered.get(currentQuestionNo) === value.textContent.trim()) {
          value.style.backgroundColor = "lawngreen";
        }
      });
    }
  }

  checkCurrentAnswered(element) {
    let getParentElement;

    let tag = element.target.tagName;
    switch (tag) {
      case "INPUT":
        getParentElement = element.target.parentElement.parentElement;
        break;
      case "LABEL":
        getParentElement = element.target.parentElement;
        break;
      case "LI":
        getParentElement = element.target;
        break;
    }

    if (getParentElement !== undefined) {
      getParentElement.style.backgroundColor = "lawngreen";
    }
  }

  displayModal(score, outOf) {
    outOf--;
    let message = `You got ${score} out of ${outOf} Questions`;
    window.alert(message);
    sessionStorage.clear();
  }
}

let USER_ANSWERS = [];
export function displayCurrentQuestion(
  current_question,
  questionNo,
  isClicked
) {
  questionNo++;

  const question_number = document.querySelector("#question_number"),
    question_text = document.querySelector("#question_text"),
    answerOptions = document.querySelector("#answerOptions"),
    category = document.querySelector("#category"),
    curQ = document.querySelector("#curQ");

  question_number.textContent = `Question ${questionNo}:`;
  question_text.textContent = current_question.question;
  category.textContent = `Category ${current_question.category}`;
  curQ.textContent = questionNo;

  // display options
  let ans_options = document.querySelectorAll("#answerOptions .ans_options");
  if (isClicked) {
    ans_options.forEach((value) => value.remove());
  }

  current_question.incorrect_answers.forEach((value, index, array) => {
    let answersMarkup = `<li class="ans_options bg-white rounded p-2" id="${value}">
              <label for="opt${index}">
              <input type="radio" name="options${questionNo}" id="opt${index}" 
              data-cur_questionno="${questionNo}" data-useranswer="${value}"/>
                ${value}</label>
            </li>`;

    answerOptions.insertAdjacentHTML("beforeend", answersMarkup);
  });

  answerOptions.addEventListener("click", (e) => {
    new Display().checkCurrentAnswered(e);

    if (e.target.tagName === "INPUT" || e.target.tagName === "LI") {
      let cur_questionNo = e.target.dataset.cur_questionno;
      let cur_UserAnswer = e.target.dataset.useranswer;
      let User_answerMap = new Map();
      USER_ANSWERS[cur_questionNo] = User_answerMap.set(
        parseInt(cur_questionNo),
        cur_UserAnswer
      );

      // send to navigation
      new Navigation().checkAnsweredQuestion(USER_ANSWERS);
    }

    let q_answered = USER_ANSWERS.filter((value) => value !== "");
    let msg = `Questions Answered: ${q_answered.length}`;
    document.querySelector("#qAnswered").textContent = msg;

    let remainingMsg = `Questions Remaining: ${
      Display.questionLength - q_answered.length
    }`;
    document.querySelector("#qRemaining").textContent = remainingMsg;
  });

  new Display().checkAnswered(USER_ANSWERS, questionNo);
  new Quiz().getUserAnswers(USER_ANSWERS);
}
