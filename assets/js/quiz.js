import Display from "./display.js";

export default class Quiz {

    static correct_answers;
    static temp_userAnswers;

    getUserAnswers(userAnswers, isSubmitted = false){
        Quiz.temp_userAnswers = userAnswers;
        if (isSubmitted){
            this.scoreUser(Quiz.correct_answers, userAnswers);
        }
    }

    submitQuiz(){
        const submitQuiz = document.querySelector("#submitQuiz");
        submitQuiz.addEventListener("click", evt => {
            this.getUserAnswers(Quiz.temp_userAnswers, true);
            let linkToStart = document.createElement("a");
            linkToStart.href = `startQuiz.html`;
            linkToStart.click();
        });
    }

    scoreUser(correctAnswers, userAnswers){
        let score = 0;
        for (let answerKey = 1; answerKey < correctAnswers.length; answerKey++){
            let correctAnswer = correctAnswers[answerKey];
            let userAnswer = userAnswers[answerKey];

            if (userAnswer !== undefined){
                let ca = correctAnswer.get(answerKey);
                let ua = userAnswer.get(answerKey);
                if (ca === ua){
                    score++;
                }
            }

        }

        new Display().displayModal(score, correctAnswers.length);

    }

}
