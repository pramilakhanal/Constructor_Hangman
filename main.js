

	var inquirer = require("inquirer");
	var Word = require("./word.js");

	
	var words = ['COLORADO', 'TEXAS', 'ARIZONA', 'CALIFORNIA', 'WYOMING', 'MONTANA', 'NEBRASKA'];

// Array to store word Objects that are created based on the words above
	var wordArray = [];


// Function to initalize wordArray with word Objects
	function initWords() {
		for (var i = 0; i < words.length; i++) {
			var newWord = new Word(words[i]);
			wordArray.push(newWord);
	}
}


	function resetGame() {
		console.log("RESET game!");
		for (var i = 0; i < wordArray.length; i++) {
			wordArray[i].resetWord();
	}
}

// Starting with round 1.
// If all words are finished, user gets a choice to replay the game or end it.
	var round = 1;


	function playGame() {
		console.log("ROUND: " + round);

		var display_str = wordArray[round].displayWord();
		console.log(display_str);

		inquirer.prompt([
		{
			name: "guess",
			message: "Guess a letter? "
		}
	]).then(function(answers) {

		if (wordArray[round].checkGuess(answers.guess.toUpperCase())) {
			wordArray[round].updateWord(answers.guess.toUpperCase());	
			if (wordArray[round].wordGuessed()) 
			{

				console.log("You got it right!  NEXT WORD.")
				round++;

			if (round >= wordArray.length) {
					console.log("Game Over!");


					inquirer.prompt([ 
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play again? ",
							default: false
						}
					]).then(function(answer) {
						console.log(answer.play);
						if (answer.play == false) {

							return;
						}
				
						round = 1;
						resetGame();
						playGame();
					});
				} else {
// haven't reached the end of the word list. On to next word.
					playGame();
				}
			} else {
// Successful guess on the letter. On to the next letter to guess.
				playGame();
			}
		} else {
			// Guessed wrong

			wordArray[round].guessCount--;
			if (wordArray[round].guessCount > 0) {

// More guesses left.  Continue guessing letters.
				console.log("INCORRECT!  " + wordArray[round].guessCount + " guesses left.");
				playGame();
			} else {

				console.log("INCORRECT! No guesses left!")
				console.log("Word is: " + wordArray[round].word);
				round++;
				if (round >= wordArray.length) {
					console.log("Game Over!");

					inquirer.prompt([ 
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play again? ",
							default: false
						}
					]).then(function(answer) {
						if (answer.play == false) {
							return;
						}
						
						round = 1;
						resetGame();
						playGame();
					});
				} else {
					
					inquirer.prompt([
						{
							type: "confirm",
							name: "play",
							message: "Do you want to play more?",
							default: true
						}
					]).then(function(answer) {
						if (answer.play == false) {
							return;
						}
						playGame();
					});
				}
			}
		}
	});
}


initWords();

console.log(wordArray);
console.log("WELCOME TO HANGMAN!  LET US START THE GAME.");
console.log("-------------------------------------------\n");


playGame();