var time = document.querySelector("#time_remaining");
var content = document.querySelector("#content");
var start_button = document.querySelector("#start_quiz");
var currentQuestion = 0;

var questions = {
    0: {
       question: "All of the following are JavaScript datatypes except:", 
       a1: "boolean",
       a2: "number",
       a3: "array",
       a4: "unit",
       a5: "string"
    }
 };

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
 
    nextQuestion();
 
    var runClock;
 
    runClock = setInterval(function() {
       
      timer.tick();
      time.textContent = timer.seconds;
  
      if (timer.seconds === 0) {
          clearInterval(runClock);
          time.textContent = timer.seconds;
          alert("Time is up!");
          timer.restartQuiz();
      }
  
    }, 1000);
 
   }

   function nextQuestion() {

            content.innerHTML = '<h3 class="question">' + questions[currentQuestion]['question'] + '</h3>' +
                                '<ul class="answer-choices">' +
                                    '<li><button id="op1" type="button" class="btn btn-primary">A. ' + questions[currentQuestion]['a1'] + '</button></li>' +
                                    '<li><button id="op2" type="button" class="btn btn-primary">B. ' + questions[currentQuestion]['a2'] + '</button></li>' +
                                    '<li><button id="op3" type="button" class="btn btn-primary">C. ' + questions[currentQuestion]['a3'] + '</button></li>' +
                                    '<li><button id="op4" type="button" class="btn btn-primary">D. ' + questions[currentQuestion]['a4'] + '</button></li>' +
                                    '<li><button id="op5" type="button" class="btn btn-primary">E. ' + questions[currentQuestion]['a5'] + '</button></li>' +
                                '</ul>';
        
   }

   start_button.addEventListener("click", startQuiz);