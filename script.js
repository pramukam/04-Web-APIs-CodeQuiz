// Declaration of variables

var startButton = document.getElementById('start-quiz');
var qTitle = document.getElementById('q-title');
var qChoice = document.getElementById('sq-choice');
var qPage = document.getElementById('q-page');
var sPage = document.getElementById('s-page');
var fPage = document.getElementById('f-page')
var fscore = document.getElementById('final-score')
var timeLeft = document.getElementById('time-left');
var initial = document.getElementById('initials');
var reults = document.getElementById('result');

var q1 = document.getElementById('q1')
var q2 = document.getElementById('q2')
var q3 = document.getElementById('q3')
var q4 = document.getElementById('q4')

var qlist = document.querySelector('#q-choice');

var allAnswerButtons = document.querySelectorAll('qbutton')

var nextQuestion = 0;

score = 0;

var secondsLeft = questions.length * 20;

var userInfo = []


// WHEN I click the start button I get the first question displayed

startButton.addEventListener('click', function () {
  console.log('yourname');
  sPage.classList.add('hide');
  qPage.classList.remove('hide');
  // qTitle.textContent=questions[0].title;
  getQuestions();
  // nextQuestion = nextQuestion+1;

  console.log(nextQuestion);





})

function getQuestions() {

  if (nextQuestion < 5) {

    var viewT = questions[nextQuestion].title;

    qTitle.textContent = viewT;

    var viewQ1 = questions[nextQuestion].choices[0]
    var viewQ2 = questions[nextQuestion].choices[1]
    var viewQ3 = questions[nextQuestion].choices[2]
    var viewQ4 = questions[nextQuestion].choices[3]

    q1.textContent =viewQ1
    q2.textContent =viewQ2
    q3.textContent =viewQ3
    q4.textContent =viewQ4

  }


}
// When the user click on an answer this function will be triggered

qlist.addEventListener("click", function (event) {
 
  if (event.target.matches("button")) {

    var test = event.target.textContent
    console.log(test)


    // if the user selects a correct answer

    if (test === questions[nextQuestion].answer) {
      console.log(questions[nextQuestion].answer);
      console.log('correct');
      score++;
      console.log('this is my score ' + score);
      reults.textContent = "Correct";
      // feedback - Correct
      reults.setAttribute("class", "feedback");
      setTimeout(function () {
        reults.setAttribute("class", "feedback hide");
      }, 1000);


      // If the user selects a wrong answer

    } else {

      // console.log to test
      console.log('wrong')

      reults.textContent = "wrong";
      secondsLeft = secondsLeft - 10;

      // feedback - Wrong
      reults.setAttribute("class", "feedback");
      setTimeout(function () {
        reults.setAttribute("class", "feedback hide");
      }, 10000);

    }
    nextQuestion++
    getQuestions()

    // console.log to test the arrey index working properly
    console.log(nextQuestion)
  }


// If user finishes all the question before the time

  if (nextQuestion == questions.length) {
    qPage.classList.add('hide');
    fPage.classList.remove('hide');
    fscore.textContent = secondsLeft

  }

});


// When the user clicks the start button the timer starts. This fucntion is triggered once the user click on the start button

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeLeft.textContent = secondsLeft;
      // if time complted or time is less than 0 or user finished all the question before the time stop the time and got submision page
    if (secondsLeft === 0 || secondsLeft < 0 || nextQuestion == questions.length) {
      clearInterval(timerInterval);
      qPage.classList.add('hide');
      fPage.classList.remove('hide');
    }

  }, 1000);
}

// This function to save the user score will be triggered when the user submit the user info at the final page of the quiz

function saveHighscore() {
  // get value of input box in the user info submission page
  var initials = initial.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var userInfo =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      userscore: secondsLeft,
      initials: initials
    };

    // save the new score to localstorage
    userInfo.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(userInfo));

    // redirect to next page
    window.location.href = "Highscore.html";

    // if userInputs are empty alert the user
  }else{
    alert("Initials can not be empty!!")
  }

}
