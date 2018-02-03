

// create a function to indicate if the letter has been guessed

var Letter = function(letter) {
	this.letter = letter;
	this.guessed = false;


	// Method returns the letter if it is guessed
	// if not return'_' instead of letter

	this.getLetter = function() {
		var char = '-';
		if(this.guessed == true) {
			return this.letter;
		}

		return char;
	}
}

module.exports = Letter;