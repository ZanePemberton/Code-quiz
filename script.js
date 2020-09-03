//arrray for questions, choices and answers
var questions = [{
    title: "What ISN'T a Javascript data type",
    choices: ["init", "string", "boolean", "variable"],
    answer: "variable"
},
{
    title: "What is negative infinity",
    choices: ["number", "tag", "function", "string"],
    answer: "number"
},
{
    title: "Which company developed Javascript?",
    choices: ["barcamp", "skynet", "netscape", "None of the above."],
    answer: "netscape"
},
{
    title: "What is a prompt box?",
    choices: ["allows user input", "allows AI output", "sends message to user", "logs users input"],
    answer: "allows user input"
},
{
    title: "Which of the following function of Strings combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//loops through the questions 
function next() {
    currentQuestion++;
    
    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    
    
    document.querySelector(".quizBody").innerHTML = quizContent;
    }

//setting number values for score, questions, time and timer
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// minus 15 seconds if user chooses wrong answer
function incorrect() {
    timeLeft -= 15; 
    next();
    }
    
    //plus 1 score points if answer is correct
    function correct() {
    score +=1;
    next();
    }

//starts timer countdown when clicked
function start() {

timeLeft = 60;
document.querySelector(".timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.querySelector(".timeLeft").innerHTML = timeLeft;
    //end game if timer reaches 0
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//function to stop timer at end of game
function endGame() {
clearInterval(timer);

var quizContent = `
    <h2>Times Up!</h2>
    <h2>You got a ` + score +  ` /5!</h2>
    <h2>You got ` + score / 1 +  ` answers correct!</h2>
    <input type="text" class="name" placeholder="Name"> 
    <button onclick="setScore()">Save score!</button>`;
document.querySelector(".quizBody").innerHTML = quizContent;
}

//sends scores to local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.querySelector('.name').value);
getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") +`'s highscore is:</h2>
    <h2>` + localStorage.getItem("highscore") + `</h2><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.querySelector(".quizBody").innerHTML = quizContent;
}

//clears the score and name if user chooses too
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.querySelector(".timeLeft").innerHTML = timeLeft;

var quizContent = `
<h2>
    Good job!
</h2>    
<h2>
    Want to play again?
</h2>
<button onclick="start()">Start!</button>`;

document.querySelector(".quizBody").innerHTML = quizContent;
}