var time = document.querySelector("#time_remaining");
var viewHighScoresLink = document.querySelector("#view-high-scores");
var content = document.querySelector("#content");
var start_button;
var answerChosen;
var answer_result = document.querySelector("#answer-result");
var currentQuestion = null;
var correctAnswers;
var incorrectAnswers;
var testResultsForm;
var initialsInput;
var errorMessage;
var studentName;
var studentScore;
var testCompleted = false;

viewHighScoresLink.addEventListener("click", viewHighScores);

//When application loads, get data and display start screen:
getData();
startScreen();
//Questions List:
var questions = {
    0: {
       question: "All of the following are JavaScript datatypes except:", 
       a1: 'boolean',
       a2: 'number',
       a3: 'array',
       a4: 'unit',
       a5: 'string',
       c: 'a4'
    },
    1: {
        question: "Which of the following JavaScript functions return the position of the first occurence of a specified string?", 
        a1: 'find()',
        a2: 'indexOf()',
        a3: 'contains()',
        a4: 'search()',
        a5: 'slice()',
        c: 'a2'
     },
    2: {
        question: "Given a hidden selected element: 'el', Which of the following Javascript style declarations displays this element?", 
        a1: 'el.style.display = "block"',
        a2: 'el.style.display = "visible"',
        a3: 'el.style.display = "element"',
        a4: 'el.style.visible = true',
        a5: 'el.style.hidden = false',
        c: 'a1'
    },
    3: {
        question: "Which of the following operators returns a data type?", 
        a1: 'datatype',
        a2: 'type',
        a3: 'typeof',
        a4: 'element-type',
        a5: 'data-category',
        c: 'a3'
    },
    4: {
        question: "All of the following are considered JavaScript loops except:", 
        a1: 'for',
        a2: 'forEach',
        a3: 'while',
        a4: 'do while',
        a5: 'do until',
        c: 'a5'
    },
    5: {
        question: "Given an array named 'cars', how do I access the value of the last item in the array?", 
        a1: 'cars.lastEl',
        a2: 'cars.itemEnd',
        a3: 'cars[cars.end]',
        a4: 'cars[cars.length - 1]',
        a5: 'cars[cars.length]',
        c: 'a4'
    },
 };

 //total questions length:
 var totalQuestions = Object.keys(questions).length;

 //Clock object used to keep time and record score:
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
  
  //Instance of Clock object is stored in a variable named timer:
  var timer = Object.create(Clock);

  function startQuiz() {
    resetData();
    currentQuestion = 0; //first question number
    nextQuestion(); //display first question
 
    var runClock; //start the count-down clock
 
    runClock = setInterval(function() {
       
      timer.tick();
      time.textContent = timer.seconds;

      var end = checkIfEnd(); //check if the quiz has ended

      if (end) { 
          //if the quiz has ended stop the clock and display the quiz results screen:
        clearInterval(runClock);
        quizComplete();
      }
  
    }, 1000);
 
   }

   function startScreen() {         
            content.innerHTML = '<h1>Coding Quiz Challenge</h1>' +	
                                '<p>Press the Start button to begin</p>' +	
                                '<button id="start_quiz" type="button" class="btn btn-primary">Start Quiz</button>';
            //start button begins the quiz
            start_button = document.querySelector("#start_quiz");
            start_button.addEventListener("click", startQuiz);
    }

   function nextQuestion() {
            if (currentQuestion !== null) { //only display a question when the quiz is in progress:
                content.innerHTML = '<h3 class="question">' + questions[currentQuestion]['question'] + '</h3>' +
                                '<ul class="answer-choices">' +
                                    '<li><button id="a1" type="button" class="answer btn btn-primary">A. ' + questions[currentQuestion]['a1'] + '</button></li>' +
                                    '<li><button id="a2" type="button" class="answer btn btn-primary">B. ' + questions[currentQuestion]['a2'] + '</button></li>' +
                                    '<li><button id="a3" type="button" class="answer btn btn-primary">C. ' + questions[currentQuestion]['a3'] + '</button></li>' +
                                    '<li><button id="a4" type="button" class="answer btn btn-primary">D. ' + questions[currentQuestion]['a4'] + '</button></li>' +
                                    '<li><button id="a5" type="button" class="answer btn btn-primary">E. ' + questions[currentQuestion]['a5'] + '</button></li>' +
                                '</ul>';
            //enable all question answer options
            enableAnswerButtons();
            }
            else {
                startScreen();
            }         
   }

   function resetData() {
       //when the quiz is complete, and a name is recorded, reset all test data except final score:
        studentName = "";
        currentQuestion = null;
        correctAnswers = 0;
        incorrectAnswers = 0;
        studentScore = 0;
        answerChosen = "";
        timer.restartQuiz();
        time.textContent = timer.seconds;
        testCompleted = false;
   }

   function recordAnswer(event) {
       //Record the user's answer
       var studentAnswer = event.target.id;
       var correctAnswer = questions[currentQuestion]['c'];

       //compare the user's answer to the correct answer:
       var correct = checkIfCorrect(studentAnswer, correctAnswer);

       //display on the screen whether the answer is correct or incorrect
       if (correct) {
        displayResult("Correct!");
       }
       else {
        displayResult("Wrong!");
       }

   }

   function checkIfCorrect(studentAnswer, correctAnswer) {
        if (studentAnswer === correctAnswer) { //answer is correct, return true
            correctAnswers++; //add to correct answer total
            return true;
        }
        else { //answer is incorrect, return false
            incorrectAnswers++; //add to wrong answer total
            timer.wrongAnswerPenalty(); //subtract 15 seconds for wrong answer penalty
            return false;
        }
   }

   function displayResult(result) {

       disableAnswerButtons(); //disable answer option buttons when an answer is selected
       answer_result.innerHTML = "<hr><br>" + result;

       //display whether the answer chosen is correct or wrong for 1 second
       var resultMessage;
       resultMessage = setTimeout(function() {
            answer_result.innerHTML = "";
            clearTimeout(resultMessage);
            currentQuestion++; //increment the question number and then proceed to the next question.

            var end = checkIfEnd(); //check if the last question was anwered

            if (end) {
                //if the last question was anwered, end the quiz
                quizComplete();
            }
            else { //if there are still more questions, proceed to the next one:
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
            studentScore = timer.getScore();
            return true;
        }
        else {
            return false;
        }
   }

   function handleFormSubmission(element) {
        element.preventDefault();
        //get the value of the the text submitted:
        var input = event.srcElement.elements[0].value;

        //validate that the data is alphabetical:
        var validInitials = validateInput(input);
        if (validInitials) {
            //input is valid:
            studentName = input.toUpperCase(); //convert to uppercase
            studentScore = timer.getScore(); //assign the time as the 

            var scoresData = getData();

            if (scoresData !== null) { //if local storage data exists, add the new score to it
                scoresData[studentName] = studentScore; 
                scoresData = rankScores(scoresData); //rearrange the scores in descending order
                setData(scoresData); //set the local storage data
            }
            else {//if local storage data does not exist, create a new object and assign the data to it
                var highScores = {};
                highScores[studentName] = studentScore;
                setData(highScores); //set the new data to local storage
            }

            viewHighScores(); //Go to the High Scores page
        }
        else {
            //invalid input, display error:
            if (errorMessage === undefined) {
                addTextToScreen(testResultsForm, "p", "Invalid input. Must be one or more letters.", "error");
                errorMessage = document.querySelector(".error");
            }
            
        }
   }

   function validateInput(input) {
        var rmSp = input.trim();
        var result = rmSp.search(/^[A-Za-z]+$/); //check to make sure the input is alphabetical
        return (result === 0 ? true : false); //return true if it is alphabetical, false if not
   }

   function addTextToScreen(element, tag, text, attrVal) {
        //add error text to the screen:
        var node = document.createElement(tag);
        var textNode = document.createTextNode(text);
        node.appendChild(textNode);
        var attr = document.createAttribute("class");
        attr.value = attrVal;
        node.setAttributeNode(attr);
        element.appendChild(node);
   }

   function clearErrorMessage() {
       //if initials textbox is valid, remove error:
       if (errorMessage !== undefined) {
            errorMessage.parentNode.removeChild(errorMessage);
            errorMessage = undefined;
       }
   }

   function quizComplete() {
        testCompleted = true;
        content.innerHTML = '<h2>Quiz Complete</h2>' +
                            '<p>You answered ' + correctAnswers + ' question(s) correctly</p>' +
                            '<p>And answered ' + incorrectAnswers + ' question(s) incorrectly</p>' +
                            '<p>Your final score is: ' + studentScore + '</p>' +
                            '<form id="test-results" class="form-inline">' +
                               '<div class="row">' +
                                    '<div class="col-xs-12 col-sm-9 col-md-9">' +
                                        '<input required type="text" maxlength="3" class="form-control" id="initials" name="initials" placeholder="Enter Your Initials">' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-3 col-md-3">' +
                                        '<button type="submit" class="btn btn-primary mb-2">Save</button>' +
                                    '</div>' +
                                '</div>' +
                            '</form>';
                
        //add button events for form submission and error checking:
        testResultsForm = document.querySelector("#test-results");
        testResultsForm.addEventListener("submit", handleFormSubmission);
        initialsInput = document.querySelector("#initials");
        initialsInput.addEventListener("change", clearErrorMessage);
   }

   function viewHighScores() {
        //when the "View High Scores" link is pressed, display the saved local storage data:
        var scoresData = getData();

        var tableData = "";

        var rank = 1;

        for (var index in scoresData) {
            //loop through each score and add it to a table row:
            tableData += '<tr>' +
                            '<th scope="row">' + rank + '</th>' +
                            '<td>' + index + '</td>' +
                            '<td>' + scoresData[index] + '</td>' +
                         '</tr>';
            rank++;
        }

        //add all of the data rows to the table:
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
                            
        //add button listeners for the 'Go Back' and 'Clear High Scores' buttons:
        var goBack = document.querySelector("#go-back");
        var clearScoresLink = document.querySelector("#clear-high-scores");
        clearScoresLink.addEventListener("click", clearScores);

        if (testCompleted && studentName === "") { 
            //the user completed the test, but has not yet submitted their initials:
            goBack.addEventListener("click", quizComplete);
        }
        else if (testCompleted) {
            //the user completed the test and has already submitted their initials
            resetData();
            goBack.addEventListener("click", startScreen);
        }
        else {
            //the user has not yet completed the test:
            goBack.addEventListener("click", nextQuestion);
        }

   }

   function rankScores(data) {

            //create an array of scores in descending order:
            var sortedArray = [];

            for (var i in data) {
                sortedArray.push(data[i]);
            }
            //sort the array in descending order:
            sortedArray.sort(function(a, b) {return b - a});

            //loop through the array and compare it to each score object,
            //if they match, add that value to the new sorted object:
            var sortedScores = {};

            for (var j = 0; j < sortedArray.length; j++) {
                for (var k in data) {
                    if (sortedArray[j] === data[k]) {
                        sortedScores[k] = data[k];
                    }
                }
            }

            return sortedScores; //returned ranked scores
            
   }

   function getData() { //get local storage data
        return JSON.parse(localStorage.getItem("scores"));
   }

   function setData(data) { //set local storage data
        localStorage.setItem("scores", JSON.stringify(data));
   }

   function clearScores() { //clear all local storage data
        localStorage.clear();
        viewHighScores();
   }

   
   
