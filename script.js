// Timer Starts when start quiz is clicked
let timeLeft = 75;

function updateTimer() {
  document.getElementById("timer").textContent = timeLeft;
}











// Make an array of the questions
var questions = document.getElementsByClassName("question-container")

// Makes the questions disappear

// const questionContainers = document.querySelectorAll('.questionContainer');

// questionContainers.forEach(function(questionContainer) {
//   questionContainer.addEventListener('click', function() {
//     questionContainer.style.display = 'none';
//   });
// });