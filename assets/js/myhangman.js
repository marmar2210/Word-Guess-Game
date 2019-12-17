"use strict";

var wordList =
  // Word Guess list
  [
    "function",
    "variable",
    "event",
    "method",
    "ifelse",
    "loops",
    "array",
    "elements",
    "booleans",
    "operators",
    "console",
    "comment",
    "syntax",
    "objects"
  ];

const maxGuesses = 10; // Number of guesses allowed

var lettersGuessed = []; // Stores letters the user guessed
var currentWordIndex; // Index of the current word array
var wordBeingGuessed = []; // This will be the word we matches the current word
var guessesRemaining = 0; // How many tries the user has left
var finishedGame = false; // Flag to 'game over play again'
var wins = 0; // Holds many wins has the user has

// Game sounds will go here as soon as I figure out how to include them.
//var keySound = new Audio("");
//var winSound = new Audio("");
//var loseSound = new Audio("");

// Reset the game variables
function gameDone() {
  guessesRemaining = maxGuesses;

  // Use Math.floor to round the random number down.
  currentWordIndex = Math.floor(Math.random() * wordList.length);

  // Clear word and letter arrays
  lettersGuessed = [];
  wordBeingGuessed = [];

  // Clear hangman image to default entry image
  document.getElementById("hangmanPic").src = "assets/images/0.png";

  // Build the wordBeingGuessed and clear it
  for (var i = 0; i < wordList[currentWordIndex].length; i++) {
    wordBeingGuessed.push("_");
  }

  // Hide game over and win images/text
  document.getElementById("keyPressPlayAgain").style.cssText = "display: none";
  document.getElementById("gameover-pic").style.cssText = "display: none";
  document.getElementById("youwin-pic").style.cssText = "display: none";

  // Show display
  updateGame();
}

//  Updates the display on index Page
function updateGame() {
  document.getElementById("totalWins").innerText = wins;

  // Display  the word  on screen.
  // Printing the array  we concatenate a string from values of the array.
  var guessingWordText = "";
  for (var i = 0; i < wordBeingGuessed.length; i++) {
    guessingWordText += wordBeingGuessed[i];
  }

  // Display values for the following elements.
  document.getElementById("currentWord").innerText = guessingWordText;
  document.getElementById("guessesRemaining").innerText = guessesRemaining;
  document.getElementById("lettersGuessed").innerText = lettersGuessed;
}

// Image updates depending on how many guesses.
function updateHangmanPic() {
  document.getElementById("hangmanPic").src =
    "assets/images/" + (maxGuesses - guessesRemaining) + ".png";
}

function checkTheGuess(letter) {
  // Array to store positions of letters.
  var positions = [];

  // Loop through word finding all instances of letter being guessed, store in an array.
  for (var i = 0; i < wordList[currentWordIndex].length; i++) {
    if (wordList[currentWordIndex][i] === letter) {
      positions.push(i);
    }
  }

  // If there are no matches, remove a guess and update the image.
  if (positions.length <= 0) {
    guessesRemaining--;
    updateHangmanPic();
  } else {
    // Loop through and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
      wordBeingGuessed[positions[i]] = letter;
    }
  }
}
// Checks for a win.
function theWinner() {
  if (wordBeingGuessed.indexOf("_") === -1) {
    document.getElementById("youwin-pic").style.cssText = "display: block";
    document.getElementById("keyPressPlayAgain").style.cssText =
      "display: block";
    wins++;
    finishedGame = true;
  }
}

// Checks for losses.
function theLoser() {
  if (guessesRemaining <= 0) {
    document.getElementById("gameover-pic").style.cssText = "display: block";
    document.getElementById("keyPressPlayAgain").style.cssText =
      "display:block";
    finishedGame = true;
  }
}

// Makes a guess.
function makeGuess(letter) {
  if (guessesRemaining > 0) {
    // Makes sure we didn't use this letter.
    if (lettersGuessed.indexOf(letter) === -1) {
      lettersGuessed.push(letter);
      checkTheGuess(letter);
    }
  }
}

// On click event
document.onkeydown = function(event) {
  // If user finished a game, clear and reset.
  if (finishedGame) {
    gameDone();
    finishedGame = false;
  } else {
    // Check to make sure a-z was pressed. used keycode standard. set to lower case
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      makeGuess(event.key.toLowerCase());
      updateGame();
      theWinner();
      theLoser();
    }
  }
};
