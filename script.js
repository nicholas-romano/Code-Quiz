var time = document.querySelector("#time_remaining");
var content = document.querySelector("#content");
var currentQuestion = 0;

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

  function startQuiz() {
    
    start_button.removeEventListener("click", startQuiz);

    var runClock;
 
    runClock = setInterval(function() {
       
      timer.tick();
      time.textContent = timer.seconds;
  
      if (timer.seconds === 0) {
          clearInterval(runClock);
          time.textContent = timer.seconds;
          alert("Time is up!");
          timer.restartQuiz();
          time.textContent = timer.seconds;
      }
  
    }, 1000);

   }

   switch(currentQuestion) {
    case 0:
       content.innerHTML = '<h1>Coding Quiz Challenge</h1> ' +
                           '<p>Press the Start button to begin</p>' +
                           '<button id="start_quiz" type="button" class="btn btn-primary">Start Quiz</button>';
 
       var start_button = document.querySelector("#start_quiz");
 
       start_button.addEventListener("click", startQuiz);
       
    break;
   }

  start_button.addEventListener("click", startQuiz);