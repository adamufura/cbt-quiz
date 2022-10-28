export default class Time {

    startTimer(duration){
        let start = Date.now(), difference, minutes, seconds;

        function timer(){
            difference = duration - (((Date.now() - start) / 1000) | 0);

            minutes = (difference / 60) | 0;
            seconds = (difference % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;


            let showTimer = `${minutes} <small>Mins</small> : ${seconds} <small>Secs`;
            document.querySelector("#getTimer").innerHTML = showTimer;

            // timer warning
            if (difference <= 120){
                new Time().timerWarning();
            }
            
            if (difference <= 0) {
               // start = Date.now() + 1000;
                new Time().stopTimer();
            }

        }
        timer();
        setInterval(timer, 1000);

    }

    timerWarning(){
        let countdown = document.querySelector(".countdown");
        countdown.classList.toggle("warning");
    }

    stopTimer(){
        document.querySelector("#submitQuiz").click();
    }
}