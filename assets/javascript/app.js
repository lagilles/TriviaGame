$(document).ready(function() {
  var startScreen;
  var gameHTML;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;
  var questionCounter = 0;
  var counter = 20;
  var clock;
  var selecterAnswer;
  var questionArray = [
    {
      question: "True or Flase: A janitor invented the Game Boy",
      answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false }
      ]
    },
    {
      question: "When was Nintendo founded?",
      answers: [
        { text: "1960", isCorrect: false },
        { text: "1889", isCorrect: true },
        { text: "1992", isCorrect: false },
        { text: "2014", isCorrect: false }
      ]
    },
    {
      question: "Which famous Nintendo game invented jumping?",
      answers: [
        { text: "Mario Kart", isCorrect: false },
        { text: "Super Mario Brothers", isCorrect: false },
        { text: "Donkey Kong", isCorrect: true }
      ]
    },
    {
      question: "Which of the following is NOT a Koopaling?",
      answers: [
        { text: "Ludwig von Koopa", isCorrect: false },
        { text: "Lemmy Koopa", isCorrect: false },
        { text: "Wendy O. Koopa", isCorrect: false },
        { text: "Izzie Koopa", isCorrect: true }
      ]
    },
    {
      question: "Who was Mario named after?",
      answers: [
        { text: "Mario Lopez", isCorrect: false },
        { text: "Mario Batali", isCorrect: false },
        { text: "Mario Segale", isCorrect: true }
      ]
    },
    {
      question: "What is the best selling Nintendo game ever?",
      answers: [
        { text: "The Legend of Zelda: Breath of the Wild", isCorrect: false },
        { text: "Mario Kart", isCorrect: false },
        { text: "Pokemon", isCorrect: false },
        { text: "Wii Sports", isCorrect: true }
      ]
    },
    {
      question:
        "What was the first Nintendo game that allowed you to save your progress?",
      answers: [
        { text: "Pokemon", isCorrect: false },
        { text: "The Legend of Zelda", isCorrect: true },
        { text: "Super Mario Bros", isCorrect: false },
        { text: "Duck Hunt", isCorrect: false }
      ]
    },
    {
      question: "Who is the founder of Nintendo?",
      answers: [
        { text: "Fusajiro Yamuchi", isCorrect: true },
        { text: "Shigeru Miyamoto", isCorrect: false },
        { text: "Shuntaro Furukawa", isCorrect: false }
      ]
    },
    {
      question: "What is the best selling Nintendo console of all time?",
      answers: [
        { text: "SNES", isCorrect: false },
        { text: "Gamecube", isCorrect: false },
        { text: "Nintendo DS", isCorrect: true },
        { text: "Switch", isCorrect: false }
      ]
    },
    {
      question: "True or False: Nintendo started as a playing card company.",
      answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false }
      ]
    }
  ];

  function generateHTML() {
    var timeRemainingText =
      "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
    var questionText =
      "<p class='questionText text-center'>" +
      questionArray[questionCounter].question +
      "</p>";
    gameHTML = timeRemainingText + questionText;
    $(".mainArea").html(gameHTML);
    for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
      var answerButton = $("<button>");
      answerButton.addClass("answer btn btn-block text-center");
      answerButton.attr(
        "isCorrect",
        questionArray[questionCounter].answers[i].isCorrect
      );
      answerButton.html(questionArray[questionCounter].answers[i].text);
      $(".mainArea").append(answerButton);
    }
  }

  function generateWin() {
    correct++;
    var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
    var imgHTML =
      "<img class='center-block imgCorrect' src='assets/images/check.png'>";
    gameHTML = correctAnswerText + imgHTML;
    $(".mainArea").html(gameHTML);
    setTimeout(nextDisplay, 3000);
  }

  function generateLoss() {
    incorrect++;
    var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
    var imgHTML =
      "<img class='center-block imgWrong' src='assets/images/x.png'>";
    gameHTML = wrongAnswerText + imgHTML;
    $(".mainArea").html(gameHTML);
    setTimeout(nextDisplay, 3000);
  }

  function generateLossAtTimeOut() {
    unanswered++;
    var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
    var imgHTML =
      "<img class='center-block imgWrong' src='assets/images/clock.png'>";
    gameHTML = timeOutText + imgHTML;
    $(".mainArea").html(gameHTML);
    setTimeout(nextDisplay, 3000);
  }

  function timer() {
    clock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
      if (counter === 0) {
        clearInterval(clock);
        generateLossAtTimeOut();
      } else if (counter > 0) {
        counter--;
      }
      $("#timer").html(counter);
    }
  }

  // function that generates html for the next screen, increments the question counter, and resets timer
  function nextDisplay() {
    if (questionCounter < questionArray.length - 1) {
      questionCounter++;
      generateHTML();
      counter = 20;
      timer();
    } else {
      finalScreen();
    }
  }

  function finalScreen() {
    var finishedText =
      "<p class='finishedText text-center'>Here's how you did!</p>";
    var summaryCorrectHTML =
      "<p class='summaryCorrect text-center'>Correct Answers: " +
      correct +
      "</p>";
    var summaryWrongHTML =
      "<p class='summaryWrong text-center'>Wrong Answers: " +
      incorrect +
      "</p>";
    var summaryUnansweredHTML =
      "<p class='summaryUnanswered text-center'>Unanswered: " +
      unanswered +
      "</p>";
    var resetButtonHTML =
      "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
    gameHTML =
      finishedText +
      summaryCorrectHTML +
      summaryWrongHTML +
      summaryUnansweredHTML +
      resetButtonHTML;
    $(".mainArea").html(gameHTML);
  }

  function resetGame() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    counter = 20;
    generateHTML();
    timer();
  }

  // Function that creates the start button and initial screen
  function initialScreen() {
    var initialText =
      "<p class='initialText text-center'>How much do you know about Nintendo? Let's find out!</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
    var startButtonHTML =
      "<button class='startButton btn btn-primary btn-lg btn-block text-center' type='button'>Start Quiz</button>";
    startScreen = initialText + startButtonHTML;
    $(".mainArea").html(startScreen);
  }

  // When the start button is clicked:
  $("body").on("click", ".startButton", function(event) {
    generateHTML();
    timer();
  });

  // When an answer is clicked:
  $("body").on("click", ".answer", function(event) {
    selectedAnswer = $(this).attr("isCorrect");
    console.log(selectedAnswer);

    if (selectedAnswer === "true") {
      // evaluates if this is the correct answer
      clearInterval(clock);
      generateWin();
    } else {
      // then it's the wrong answer
      clearInterval(clock);
      generateLoss();
    }
  });

  // When the Play Again button is clicked:
  $("body").on("click", ".resetButton", function(event) {
    resetGame();
  });

  initialScreen();
});
