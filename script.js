// Timer Starts when start quiz is clicked
let timeLeft = 75;
const timePenalty = 10;
let timerInterval; 

function endQuiz() {
  clearInterval(timerInterval);
  console.log("Quiz has ended.");
  
}

function updateTimer() {
  document.getElementById("timer").textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  } else {
    timeLeft--;
  }
}

function handleWrongAnswer() {
  timeLeft -= timePenalty;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

document.getElementById("start-btn").addEventListener("click", function () {
  timerInterval = setInterval(updateTimer, 1000); 
  handleWrongAnswer();
});









// Make an array of the questions
var questions = document.getElementsByClassName("question-container")

// Makes the questions disappear

// const questionContainers = document.querySelectorAll('.questionContainer');

// questionContainers.forEach(function(questionContainer) {
//   questionContainer.addEventListener('click', function() {
//     questionContainer.style.display = 'none';
//   });
// });