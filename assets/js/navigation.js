import {displayCurrentQuestion} from "./display.js";

export default class Navigation {

    checkAnsweredQuestion(user_answers){
        let answeredMap = user_answers;

        let navTable = document.querySelectorAll("table tbody tr td");

        navTable.forEach((value, key, parent) => {
            key++;

            if (answeredMap[key] !== undefined){
                if (answeredMap[key].has(key)){
                    value.classList.add("answered");
                }
            }

        });

    }

    takeUserToQuestion(questions){
        let setCurrentQuestions = questions.results;
        let getTableData = document.querySelector("table");
        getTableData.addEventListener("click", e => {
            let getData = e.target.textContent;
            getData--;

            if (!isNaN(getData)){
                displayCurrentQuestion(setCurrentQuestions[getData], getData, true);
            }
        })

    }

}