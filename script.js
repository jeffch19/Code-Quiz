document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  let timeLeft = 75;
  const timePenalty = 10;
  let timerInterval;
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let highScores = [];

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
  const highScoresButton = document.getElementById("high-scores");

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
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
          if (choiceIndex === questions[index].correct) {
            correctAnswers++;
          } else {
            // Display feedback for incorrect answers and deduct time
            feedbackDiv.textContent = "Incorrect! You lose 10 seconds.";
            timeLeft -= timePenalty;
          }

          // Show feedback for a brief moment
          setTimeout(() => {
            feedbackDiv.textContent = "";
          }, 1000);

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

    if (correctAnswers > 0) {
      // Add the player's score and initials to the highScores array
      const playerInitials = localStorage.getItem("playerInitials");
      highScores.push({ initials: playerInitials, score: correctAnswers });

      // Sort highScores in descending order
      highScores.sort((a, b) => b.score - a.score);

      // Keep only the top 10 scores
      highScores = highScores.slice(0, 10);
    }

    scoreDisplay.textContent = correctAnswers;
    highScoreDisplay.textContent = highScores.length > 0 ? highScores[0].score : 0;

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

    // Save initials to local storage
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
    localStorage.setItem("playerInitials", initials);

    alert("Score saved!");
  });

  // Display high scores when "View High Scores" button is clicked
  highScoresButton.addEventListener("click", function () {
    // Retrieve high scores from local storage
    const playerInitials = localStorage.getItem("playerInitials");

    if (highScores.length > 0) {
      // Display the top 10 high scores
      const highScoreList = highScores.slice(0, 10);
      alert("Top 10 High Scores:\n\n" + highScoreList.map((score, index) => `${index + 1}. ${score.initials}: ${score.score}`).join("\n"));
    } else {
      alert("No high scores found.");
    }
  });

  // Display feedback to the user
  const feedbackDiv = document.createElement("div");
  questionContainer.appendChild(feedbackDiv);
});



// starting at line 148
// Display high scores when “View High Scores” button is clicked
  // highScoresButton.addEventListener(“click”, function () {
  //   // Retrieve high scores from local storage
  //   const playerInitials = localStorage.getItem(“playerInitials”);
  //   console.log(“highScoreList”, highScores)
  //   if (highScores.length > 0) {
  //     // Display the top 10 high scores
  //     const highScoreList = highScores.slice(0, 10);
  //     console.log(“highScoreList”, highScoreList)
  //     alert(“Top 10 High Scores:\n\n” + highScoreList.map((score, index) => ${index + 1}. ${score.initials}: ${score.score}).join(“\n”));
  //   } else {
  //     alert(“No high scores found.“);
  //   }
  // });






// // Handle the form submission to save the score

// initialsForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   // Save initials to local storage
//   const initialsInput = document.getElementById("initials");
//   const initials = initialsInput.value;
//   var highscores =
//     JSON.parse(window.localStorage.getItem("highscores")) || [];
//   // format new score object for current user
//   var newScore = {
//     total: correctAnswers,
//     initials: initials,
//   };
//   // save to localstorage
//   highscores.push(newScore);
//   window.localStorage.setItem("highscores", JSON.stringify(highscores));
//   alert("Score saved!");
// });
// // Display high scores when "View High Scores" button is clicked
// highScoresButton.addEventListener("click", function () {
//   // Retrieve high scores from local storage
//   var highscores =
//     JSON.parse(window.localStorage.getItem("highscores")) || [];
//   console.log(highscores);
//   for (const score of highscores) {
//     console.log(score.total);
//     console.log(score.initials);
//   }
//   // if (highscores.length > 0) {
//   //   // Display the top 10 high scores
//   //   const highScoreList = highScores.slice(0, 10);
//   //   alert(
//   //     "Top 10 High Scores:\n\n" +
//   //       highScoreList
//   //         .map(
//   //           (score, index) =>
//   //             ${index + 1}. ${score.initials}: ${score.score}
//   //         )
//   //         .join("\n")
//   //   );
//   // } else {
//   //   alert("No high scores found.");
//   // }
// });
// }); 