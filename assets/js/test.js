class Questions {
  getQuestions() {
    return {
      response_code: 0,
      results: [{
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "What does the &quot;MP&quot; stand for in MP3?",
          correct_answer: "Moving Picture",
          incorrect_answers: ["Music Player", "Multi Pass", "Micro Point"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
          correct_answer: "1000",
          incorrect_answers: ["512", "1024", "500"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "What is the most preferred image format used for logos in the Wikimedia database?",
          correct_answer: ".svg",
          incorrect_answers: [".png", ".jpeg", ".gif"],
        },
        {
          category: "Science: Computers",
          type: "multiple",
          difficulty: "easy",
          question: "In computing, what does MIDI stand for?",
          correct_answer: "Musical Instrument Digital Interface",
          incorrect_answers: [
            "Musical Interface of Digital Instruments",
            "Modular Interface of Digital Instruments",
            "Musical Instrument Data Interface",
          ],
        },
      ],
    };
  }
}
class DisplayQuestion {
  getQuestion() {
    let get_questions;
    get_questions = new Questions().getQuestions();
    get_questions.results.unshift(null);
    return get_questions;
  }

  displayQuestion(questions) {
    var get_question, get_options, get_answer;
    get_question = questions.results[1].question;
    get_options = questions.results[1].incorrect_answers;
    get_answer = questions.results[1].correct_answer;

    var getNextBtn = document.getElementById("next");
    var getPrevBtn = document.getElementById("prev");
    var qs = ["HTML?", "CSS", "JS"];
    var tex = 0;

    function NextQuestion(current, messages) {
      var questionIndex = messages.indexOf(current);
      if (questionIndex === messages.length - 1) {
        return messages[0];
      }
      return messages[questionIndex + 1];
    }

    function prev(current, messages) {
      var idx = messages.indexOf(current);
      if (idx === 0) {
        return messages[messages.length - 1];
      }
      return messages[idx - 1];
    }


    // shuffle option
    get_options.push(get_answer);
    get_options.sort((a, b) => 0.5 - Math.random());
    let display = `<h2>Question ${1}:</h2>
          <h3>${get_question}</h3>
          <ol type="A">
            <li>
              <label for="optA"
                ><input type="radio" name="options" id="optA" />${
                  get_options[0]
                }</label>
            </li>
            <li>
              <label for="optB"
                ><input type="radio" name="options" id="optB" />${
                  get_options[1]
                }</label
              >
            </li>
            <li>
              <label for="optC"
                ><input type="radio" name="options" id="optC" />${
                  get_options[2]
                }</label
              >
            </li>
            <li>
              <label for="optD"
                ><input type="radio" name="options" id="optD" />${
                  get_options[3]
                }</label
              >
            </li>
          </ol>`;
    let ParentEle = document.querySelector(".middle");
    ParentEle.insertAdjacentHTML("afterbegin", display);
    return questions;
  }
  timerCountdown() {
    // "Jan 5, 2021 15:37:25"
    let countDown = new Date("June 19, 2020 00:05:00").getTime();
    let timerInterval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDown - now;
      // time calc
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // display timer
      let formatedTimer = `${minutes}<small>Mins</small> : ${seconds}<small>Secs</small>`;
      document.querySelector(".timer").innerHTML = formatedTimer;
      if (minutes < 2) {
        setInterval(() => {
          let getWarning = document.querySelector(".countdown");
          getWarning.classList.toggle("warning");
        }, 500);
      }
      if (distance < 0) {
        clearInterval(timerInterval);
        alert("Submitted");
        // submit quiz and show result
      }
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let getDisplayQuestion = new DisplayQuestion().getQuestion();
  let display_Question = new DisplayQuestion(getDisplayQuestion);
  console.log(display_Question.displayQuestion(getDisplayQuestion));
  let countdown = new DisplayQuestion().timerCountdown();
});
