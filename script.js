var time = document.querySelector("#time_remaining");
var start_button = document.querySelector("#start_quiz");

 var Clock = {

    seconds: 75,

    tick: function() {
       return this.seconds--;
    },

    wrongAnswerPenalty: function() {
       return this.seconds -= 15;
    },

    restartQuiz: function() {
       this.seconds = 75;
    },

  };
  
  var timer = Object.create(Clock);

  console.log(timer.seconds);

  function startQuiz() {
    
    start_button.removeEventListener("click", startQuiz);

    var runClock;
 
    runClock = setInterval(function() {
       
      timer.tick();
      time.textContent = timer.seconds;
      console.log(timer.seconds);
  
      if (timer.seconds === 0) {
          clearInterval(runClock);
          console.log(timer.seconds);
          alert("Time is up!");
          timer.restartQuiz();
          time.textContent = timer.seconds;
          console.log(timer.seconds);
      }
  
    }, 1000);

   }

  start_button.addEventListener("click", startQuiz);