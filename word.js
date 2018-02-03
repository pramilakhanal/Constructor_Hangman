

var  Letter = require("./letter.js");

function makeLetterArray(word) {
	var array = [];
	for (var char of word) {
		var newLetter = new Letter(char); // stored in upper case
		array.push(newLetter);
	}
	return array;
}

// Method to check the correct word
var Word = function(word) {

	this.word = word;

	this.guessCount = word.length + 3; // total length + 3 additional guesses

	// Make an array of letter objects based on the word

	this.letterArray = makeLetterArray(this.word);

//Method that displays word for the game
//Calls letter object's method to decide whether to display " _" or letter based on user's guess.

	this.displayWord = function() {
		var str='';
		for (var letter of this.letterArray) {
			str = str + letter.getLetter() + ' ';
		}

		return (str.trim());

	}

// Method to update the letters based on user's guess

	this.updateWord = function(guess) {
		for (var letter of this.letterArray) {
			if (letter.letter == guess) {
				letter.guessed = true;
			}
		}
	}
// Method to check if the user's guess is right or not
	this.checkGuess = function(guess) {
		for (var letter of this.letterArray) {
			if (letter.letter == guess) {
				return true;
			}

		}
		return false;
	}	

// Method to check if the word guessed completely or not
	this.wordGuessed = function() {
		for (var letter of this.letterArray) {
			if (letter.guessed == false) {
				return false;
			}
		}
		return true;
	}



// Method to reset the word Properties to restart the game
	this.resetWord = function() {
		for (var letter of this.letterArray) {
			letter.guessed = false;
		}
		this.guessCount = word.length;
	}



}

module.exports = Word;


