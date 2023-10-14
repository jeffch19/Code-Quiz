document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  let timeLeft = 75;
  const timePenalty = 10;
  let timerInterval;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let highScore = 0;

  // Define questions
  const questions = [
    {
      text: "Commonly Used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      correct: 2,
    },
    {
      text: "The condition in an if / else statement is enclosed with __________.",
      choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      correct: 2,
    },
    {
      text: "Arrays in JavaScript can be used to store __________.",
      choices: ["numbers and strings", "other arrays", "booleans", "all the above"],
      correct: 3,
    },
    {
      text: "String values must be enclosed within __________ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parenthesis"],
      correct: 2,
    },
    {
      text: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
      correct: 3,
    },
    {
      text: "What is the correct way to declare a variable in JavaScript?",
      choices: ["var myVariable", "let myVariable", "const myVariable", "All of the above"],
      correct: 3,
    },
  ];

  // Get elements from the HTML
  const questionContainer = document.querySelector('.question-container');
  const questionText = questionContainer.querySelector('.question-text');
  const choices = questionContainer.querySelector('.choices');
  const startContainer = document.querySelector('.start-container');
  const scoreDisplay = document.getElementById("score");
  const highScoreDisplay = document.getElementById("high-score");
  const initialsForm = document.getElementById("initials-form");
  const resultContainer = document.querySelector('.result-container');

  // Initially hide the result container
  resultContainer.style.display = "none";

  // Function to display the current question
  function displayQuestion(index) {
    if (index < questions.length) {
      questionText.textContent = questions[index].text;
      choices.innerHTML = "";

      questions[index].choices.forEach((choice, choiceIndex) => {
        const button = document.createElement("button");
        button.textContent = `${choiceIndex + 1}. ${choice}`;
        choices.appendChild(button);
        button.addEventListener("click", function () {
          if (choiceIndex === questions[index].correct) {
            correctAnswers++;
          } else {
            timeLeft -= timePenalty;
          }

          currentQuestionIndex++;
          displayQuestion(currentQuestionIndex);
        });
      });
    } else {
      endQuiz();
    }
  }

  function updateTimer() {
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    } else {
      timeLeft--;
    }
  }

  function endQuiz() {
    clearInterval(timerInterval);
    highScore = Math.max(highScore, correctAnswers);
    scoreDisplay.textContent = correctAnswers;
    highScoreDisplay.textContent = highScore;
    console.log("Quiz has ended.");
    console.log("Correct Answers: " + correctAnswers);
    console.log("High Score: " + highScore);

    // Display the results form
    questionContainer.style.display = "none";
    initialsForm.style.display = "block";
    
    // Make the result container visible at the end of the quiz
    resultContainer.style.display = "block";
  }

  // Start the quiz when the "Start Quiz" button is clicked
  document.getElementById("start-btn").addEventListener("click", function () {
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion(currentQuestionIndex);
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
  });

  // Handle the form submission to save the score
  initialsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Save initials and score to local storage
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
    localStorage.setItem("playerInitials", initials);
    localStorage.setItem("playerScore", correctAnswers);

    alert("Score saved!");
  });
});








// Makes the questions disappear

// const questionContainers = document.querySelectorAll('.questionContainer');

// questionContainers.forEach(function(questionContainer) {
//   questionContainer.addEventListener('click', function() {
//     questionContainer.style.display = 'none';
//   });
// });