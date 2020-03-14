var time = document.querySelector("#time_remaining");
var viewHighScoresLink = document.querySelector("#view-high-scores");
var content = document.querySelector("#content");
var start_button;
var answerChosen;
var answer_result = document.querySelector("#answer-result");
var currentQuestion = null;
var correctAnswers;
var incorrectAnswers;
var finalscore;
var testResultsForm;
var initialsInput;
var errorMessage;
var studentName;
var testCompleted = false;

viewHighScoresLink.addEventListener("click", viewHighScores);

getData();
startScreen();

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

    getScore: function() {
        return this.seconds;
    }

  };
  
  var timer = Object.create(Clock);

  function startQuiz() {
    resetData();
    currentQuestion = 0;
    nextQuestion();
 
    var runClock;
 
    runClock = setInterval(function() {
       
      timer.tick();
      time.textContent = timer.seconds;

      var end = checkIfEnd();

      if (end) {
        clearInterval(runClock);
        console.log("display Results");
        quizComplete();
      }
  
    }, 1000);
 
   }

   function startScreen() {
            
            content.innerHTML = '<h1>Coding Quiz Challenge</h1>' +	
                                '<p>Press the Start button to begin</p>' +	
                                '<button id="start_quiz" type="button" class="btn btn-primary">Start Quiz</button>';
            start_button = document.querySelector("#start_quiz");
            start_button.addEventListener("click", startQuiz);
    }

   function nextQuestion() {
            if (currentQuestion !== null) {
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
            else {
                startScreen();
            }         
   }

   function resetData() {
        studentName = "";
        currentQuestion = null;
        correctAnswers = 0;
        incorrectAnswers = 0;
        finalscore = 0;
        answerChosen = "";
        timer.restartQuiz();
        time.textContent = timer.seconds;
        testCompleted = false;
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
       answer_result.innerHTML = "<hr><br>" + result;

       var resultMessage;
       resultMessage = setTimeout(function() {
            answer_result.innerHTML = "";
            clearTimeout(resultMessage);
            currentQuestion++;

            var end = checkIfEnd();

            if (end) {
                console.log("Display Results");
                quizComplete();
            }
            else {
                nextQuestion();
            }
       }, 1000);

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
            finalscore = timer.getScore();
            return true;
        }
        else {
            return false;
        }
   }

   function handleFormSubmission(element) {
        element.preventDefault();
        var input = event.srcElement.elements[0].value;
        var validInitials = validateInput(input);
        if (validInitials) {
            console.log("valid input");
            studentName = input.toUpperCase();
            var studentScore = timer.getScore();

            var scoresData = getData();

            if (scoresData !== null) {
                scoresData[studentName] = studentScore; 
                scoresData = rankScores(scoresData);
                setData(scoresData);
            }
            else {
                var highScores = {};
                highScores[studentName] = studentScore;
                setData(highScores);
            }

            testCompleted = true;
            viewHighScores();
        }
        else {
            console.log("invalid input");
            if (errorMessage === undefined) {
                addTextToScreen(testResultsForm, "p", "Invalid input. Must be one or more letters.", "error");
                errorMessage = document.querySelector(".error");
            }
            
        }
   }

   function validateInput(input) {
        var rmSp = input.trim();
        var result = rmSp.search(/^[A-Za-z]+$/);
        return (result === 0 ? true : false);
   }

   function addTextToScreen(element, tag, text, attrVal) {
        var node = document.createElement(tag);
        var textNode = document.createTextNode(text);
        node.appendChild(textNode);
        var attr = document.createAttribute("class");
        attr.value = attrVal;
        node.setAttributeNode(attr);
        element.appendChild(node);
   }

   function clearErrorMessage() {
       if (errorMessage !== undefined) {
            errorMessage.parentNode.removeChild(errorMessage);
            errorMessage = undefined;
       }
   }

   function quizComplete() {
       
        content.innerHTML = '<h2>Quiz Complete</h2>' +
                            '<p>You answered ' + correctAnswers + ' questions correctly</p>' +
                            '<p>And answered ' + incorrectAnswers + ' questions incorrectly</p>' +
                            '<p>Your final score is: ' + finalscore + '</p>' +
                            '<form id="test-results" class="form-inline">' +
                                '<div class="form-group mx-sm-3 mb-2">' +
                                  '<input required type="text" maxlength="3" class="form-control" id="initials" name="initials" placeholder="Enter Your Initials">' +
                                '</div>' +
                                '<button type="submit" class="btn btn-primary mb-2">Save</button>' +
                            '</form>';
        testResultsForm = document.querySelector("#test-results");
        testResultsForm.addEventListener("submit", handleFormSubmission);
        initialsInput = document.querySelector("#initials");
        initialsInput.addEventListener("change", clearErrorMessage);
   }

   function viewHighScores() {

        var scoresData = getData();

        var tableData = "";

        var rank = 1;

        for (var index in scoresData) {

            tableData += '<tr>' +
                            '<th scope="row">' + rank + '</th>' +
                            '<td>' + index + '</td>' +
                            '<td>' + scoresData[index] + '</td>' +
                         '</tr>';
            rank++;
        }

        content.innerHTML = '<button id="go-back" type="button" class="btn btn-primary selection">Go Back</button>' +
                            '<button id="clear-high-scores" type="button" class="btn btn-primary selection">Clear High Scores</button>' +
                            '<h2>High Scores</h2>' +
                            '<table class="table table-bordered">' +
                                '<thead class="thead-light">' +
                                    '<tr>' +
                                        '<th scope="col">Rank</th>' +
                                        '<th scope="col">Name</th>' +
                                        '<th scope="col">Score</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    tableData +
                                '</tbody>' +
                            '</table>';
                            
        
        var goBack = document.querySelector("#go-back");
        var clearScoresLink = document.querySelector("#clear-high-scores");
        clearScoresLink.addEventListener("click", clearScores);

        if (testCompleted) {
            resetData();
            goBack.addEventListener("click", startScreen);
        }
        else {
            goBack.addEventListener("click", nextQuestion);
        }

   }

   function rankScores(data) {

            var sortedArray = [];

            for (var i in data) {
                sortedArray.push(data[i]);
            }
            sortedArray.sort();
            sortedArray.reverse();

            var sortedScores = {};

            for (var j = 0; j < sortedArray.length; j++) {
                for (var k in data) {
                    if (sortedArray[j] === data[k]) {
                        sortedScores[k] = data[k];
                    }
                }
            }

            return sortedScores;
            
   }

   function getData() {
        return JSON.parse(localStorage.getItem("scores"));
   }

   function setData(data) {
        localStorage.setItem("scores", JSON.stringify(data));
   }

   function clearScores() {
        localStorage.clear();
        viewHighScores();
   }

   
   
