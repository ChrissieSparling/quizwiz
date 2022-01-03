//quizQuestions[0].title = "Commonly used data types etc"
quizQuestions = [

    {
     title: "Commonly used data types DO NOT include:",
     choices: ["strings", "booleans", "alerts", "numbers"],
     answer: "alerts"
    },
    {
     title: "The condition in an if / else statement is enclosed within ____.",
     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
     answer: "parentheses"
    },
    {
         title: "what was the street slang term of the TandyRadioShack80(TRS80):",
         choices: ["the 80's", "Trash80", "Trisha80", "what the heck are you talking about, you old, old, pink haired lady!"],
         answer: "Trash80"
        },
        {
         title: "what was the first gaming system?",
         choices: ["the magnavox odyssey", "nintendo entertainment system", "atari 2600", "sega genesis"],
         answer: "the magnavox odyssey"
        },
        {
         title: "what was the name of the first computer invented?",
         choices: ["ENIAC-electronic numerical integrater and computer", "ENIA-electronic numerical integrater association", "ENI-electronic numerical integrater", "HAL"],
         answer: "ENIAC-electronic numerical integrater and computer"
        },

   ]
   //add variables to point to html elements and keep timer state
var questionIndex = 0;
var time = quizQuestions.length * 15;
var timerState;
var questions = document.getElementById("questions");
var timerDisplay = document.getElementById("time");
var answerchoices = document.getElementById("choices");
var startbutton = document.getElementById("startBtn");
var startScreen = document.getElementById ("start-screen")
var questionTitle = document.getElementById ("question-title")
var endQuiz = document.getElementById ("end-screen")
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function add (num1, num2){
var total = num1 + num2
return total
}
add(3, 4)

//start quiz function that hides start screen starts timer and unhides questions
function startQuiz(){
    startScreen.setAttribute("class","hide");
    //end portion needs to say questions.setattribute("class", "hide")
    questions.removeAttribute("class");
    timerState=setInterval(function(){
         time=time-1;
         timerDisplay.textContent=time;

    },1000)
//place cycle questions here
cycleQuestions()
}   

   //function to cycle questions
function cycleQuestions(){
    var displayQuestion = quizQuestions[questionIndex]
    questionTitle.textContent=displayQuestion.title
answerchoices.innerHTML=""
    displayQuestion.choices.forEach((choice, i) => {
         // create new button for each choice
         var answerbutton = document.createElement("button");
         answerbutton.setAttribute("class", "choice");
         answerbutton.setAttribute("value", choice);
         answerbutton.textContent = choice;
    //check answer function here
answerbutton.onclick=checkAnswer

         // display on the page
         answerchoices.appendChild(answerbutton);
       });
}
   //function to check right or wrong
function checkAnswer(){
    if (this.value===quizQuestions[questionIndex].answer
    ){
         console.log("Yeah. You got it!")
         //add right or wrong feedback here
         

    } else{
         console.log("You are Sooo Wrong")
    //add feeback 
    time=time-10
    timerDisplay.textContent=time
    }

questionIndex=questionIndex+1;

if(questionIndex===quizQuestions.length){
    //quiz end function here
    endQuiz();
         console.log ("Your done!")
} else {
    cycleQuestions();
}
//stop timer.clearInterval(timerState)
function endQuiz(){
    clearInterval(time);
    timerDisplay.textContent = time;


    // show end screen
 var endScreenEl = document.getElementById("end-screen");
 endScreenEl.setAttribute("class", " ");

 // show final score
 var finalScoreEl = document.getElementById("final-score");
 finalScoreEl.textContent = time;

 // hide questions section
 questionsEl.setAttribute("class", "hide");
}

function clockTick() {
 // update time
 time--;
timerDisplay.textContent = time;

 // check if user ran out of time
 if(time <= 0)
   quizEnd();
 
}

function saveHighscore() {
 // get value of input box
 var initials = initialsEl.value.toUpperCase();
 // make sure value wasn't empty
 if(initials === ""){ 
   alert("Input mustn't be blank'");
   return;
 }
 else if(initials.length > 3){
   alert("Input must be no more than 3 characters");
   return;
 }
 else{
   // get saved scores from localstorage, or if not any, set to empty array
   var highscores;
   if(JSON.parse(localStorage.getItem("highscores")) != null)
     highscores = JSON.parse(window.localStorage.getItem("highscores"));
   else
     highscores = [];
   // format new score object for current user
   var newScore = {
     initials: initials,
     score: time
   };
   highscores.push(newScore);
   // save to localstorage
   localStorage.setItem("highscores", JSON.stringify(highscores));
   // redirect to next page 
   location.href = "highscores.html";
 }
}
      //why are you not working right?

function checkForEnter(event) {
 // check if event key is enter
   // saveHighscore
   if(event.keyCode === 13)
     saveHighscore();
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
}
   
   
//start button
startbutton.onclick=startQuiz