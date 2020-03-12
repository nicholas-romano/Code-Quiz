var time = document.querySelector("#time_remaining");
var content = document.querySelector("#content");
var start_button = document.querySelector("#start_quiz");
var answerChosen;
var answer_result = document.querySelector("#answer-result");
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

var questions = {
    0: {
       question: "All of the following are JavaScript datatypes except:", 
       a1: "boolean",
       a2: "number",
       a3: "array",
       a4: "unit",
       a5: "string",
       c: "a4"
    },
    1: {
        question: "Which of the following JavaScript functions return the position of the first occurence of a specified string?", 
        a1: "find()",
        a2: "indexOf()",
        a3: "contains()",
        a4: "search()",
        a5: "slice()",
        c: "a2"
     }
 };

 var totalQuestions = Object.keys(questions).length;

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

      var end = checkIfEnd();

      if (end) {
        clearInterval(runClock);
        console.log("display Results");
      }
  
    }, 1000);
 
   }

   function nextQuestion() {

            content.innerHTML = '<h3 class="question">' + questions[currentQuestion]['question'] + '</h3>' +
                                '<ul class="answer-choices">' +
                                    '<li><button id="a1" type="button" class="answer btn btn-primary">A. ' + questions[currentQuestion]['a1'] + '</button></li>' +
                                    '<li><button id="a2" type="button" class="answer btn btn-primary">B. ' + questions[currentQuestion]['a2'] + '</button></li>' +
                                    '<li><button id="a3" type="button" class="answer btn btn-primary">C. ' + questions[currentQuestion]['a3'] + '</button></li>' +
                                    '<li><button id="a4" type="button" class="answer btn btn-primary">D. ' + questions[currentQuestion]['a4'] + '</button></li>' +
                                    '<li><button id="a5" type="button" class="answer btn btn-primary">E. ' + questions[currentQuestion]['a5'] + '</button></li>' +
                                '</ul>';
            enableAnswerButtons();
   }

   function recordAnswer(event) {
       var studentAnswer = event.target.id;
       var correctAnswer = questions[currentQuestion]['c'];

       var correct = checkIfCorrect(studentAnswer, correctAnswer);

       if (correct) {
        displayResult("Correct!");
       }
       else {
        displayResult("Wrong!");
       }

   }

   function checkIfCorrect(studentAnswer, correctAnswer) {
        if (studentAnswer === correctAnswer) {
            console.log("Answer is correct");
            correctAnswers++;
            return true;
        }
        else {
            console.log("Answer is incorrect");
            incorrectAnswers++;
            timer.wrongAnswerPenalty();
            return false;
        }
   }

   function displayResult(result) {

       disableAnswerButtons();
       answer_result.innerHTML = "<hr><br><i>" + result + "</i>";

       var resultMessage;
       resultMessage = setTimeout(function() {
            answer_result.innerHTML = "";
            clearTimeout(resultMessage);
            currentQuestion++;

            var end = checkIfEnd();

            if (end) {
                console.log("Display Results");
            }
            else {
                nextQuestion();
            }
       }, 2000);

   }

   function enableAnswerButtons() {
        answerChosen = document.querySelectorAll(".answer");
        for (var i = 0; i < answerChosen.length; i++) {
            answerChosen[i].addEventListener("click", recordAnswer);
        }
   }

   function disableAnswerButtons() {
        answerChosen = document.querySelectorAll(".answer");
        for (var i = 0; i < answerChosen.length; i++) {
            answerChosen[i].removeEventListener("click", recordAnswer);
        }
   }

   function checkIfEnd() {
        var questionNumber = currentQuestion + 1;
        if (questionNumber > totalQuestions || timer.seconds <= 0) {
            return true;
        }
        else {
            return false;
        }
   }

   start_button.addEventListener("click", startQuiz);
   
