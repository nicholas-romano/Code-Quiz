# Code-Quiz

![Code-Quiz](/images/Code-Quiz_thumbnail.png)

This code quiz dynamically generates html source code for the UI based on the user's actions. The functions in the JavaScript set the variable values and send data to other functions based on that data, which then trigger certain screen displays. The only text that is always displayed is the "View High Scores" link and the Timer text.

![Code-Quiz-Home](/images/Code-Quiz-Main.png);

For example, when the browser first loads the window, the startScreen() function is called which displays a welcome message and a start button. When the start button is clicked, the startQuiz() function is called which starts the countdown clock and initializes the currentQuesiton variable to 0, which displays the first question of the test and the answer choices. The enableButtons() function is that triggered which assigns event listeners to all of the answer choice buttons. When an answer is clicked, the recordAnswer button is run which checks to see if the user's answer matches the correct answer denoted with a 'c' in the questions object. 

![Code-Quiz-Question](/images/Code-Quiz-Question.png)

The checkIfCorrect() function checks to see if the answer choice is correct by using a conditional to see if the user's answer matches the question object 'c' value, and then the displayResult() function is passed either the "Correct!" text or the "Wrong!" text, and then that function disables the answer choice buttons and displays that text on the screen below the question options, and is then cleared by then setTimeout() function, which then increments the question number by one, and then checks to see if the quiz is over. 

The checkIfEnd() function has a conditional that checks to see if the current question number has exceeded the total questions length, if so, the timer.getScore() function returns the current countdown time which is assigned the user's final score. If this is the case, the checkIfEnd() returns a value of true and the quizComplete() function is run. If the quiz is not complete, the nextQuestion function is run and the following question is displayed on the screen. 

![Code-Quiz-Complete](/images/Code-Quiz-Complete.png)

The nextQuestion() function uses the currentQuestion variable to take data from the correct object within the questions object and display that data to the screen which includes that question, and answer choices. If the currentQuestion is equal to null however, that means the user has not yet clicked the "Start Quiz" button and so the user is redirected to the startScreen() function which displays the welcome message. 

The quizComplete() function sets the testCompleted variable to true and displays the test results including the total correct answers, incorrect answers, and final score. The user is also presented with a small form with just a textbox to enter their initials and a submit button. The form validates whether the user entered alphabetical letters or not and will display a red text error message that says: "Invalid input. Must be one or more letters." This text is created from the addTextToScreen() function which takes a selector, a tag type, and a text string and uses those to create and display an html element with text inside it onto the screen. 

The validation uses the search() function and a regex qualifier searching for one or more letter characters. This validation checking is handled by the handleFormSubmission() function. When the text validates, this function checks whether any local storage data exists. If it does, it adds the new data to the local storage object, and then that new data object is sent to the rankScores() function where the data is rearranged from highest scores, to lowest scores. If does this by copying the values to an array, sorting the array values from highest to lowest, and then assigning the values in the data object to a new object according to the sequence of the array created. This new sorted data object is then set to local storage using the setData() function. If local storage data does not exist, a new highScores object is created, sets the new studentScore property into it, and then sets that new data to local storage using the setData() function. 

![Code-Quiz-Scores](/images/Code-Quiz-Scores.png)

Finally, the user's screen is then shown the High Scores table displayed by the viewHighScores() function. This function retrieves the local storage data using the getData function, loops through it with a for loop, and then adds each property to a data table row and then concatenates it to a combined data string. That string is then added to a dynamically created table which is then output to the screen. The "Go Back" button goes back to the current question (if it exists) or goes to the start screen, displaying the welcome message. To the right of that button is the clear high scores button which removes all of the local storage data and runs the viewHighScores function again, removing the high scores table and all the data within it.