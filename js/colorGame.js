var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var hearts = document.querySelectorAll("#health");
var heartP1 = document.querySelectorAll("#health1");
var heartP2 = document.querySelectorAll("#health2");
var points = document.querySelector("#score");
var playAgain = document.querySelector(".playAgain");
var playAgain2 = document.querySelector(".playAgain2");
var menu1 = document.querySelector(".menu1");
var menu2 = document.querySelector(".menu2");
var playerTurn = document.querySelector("#playerTurn");
var scoreP1 = document.querySelector("#scoreP1");
var scoreP2 = document.querySelector("#scoreP2");
var backGround = document.querySelector("#title");
var letters = document.querySelectorAll("#letter");
var letters2 = document.querySelectorAll("#letter2");
var btnColor = document.querySelectorAll("#btnFx");
var name_player = document.querySelector("#name_player");
var points_player = document.querySelector("#points_player");
var name_player1 = document.querySelector("#name_player1");
var points_player1 = document.querySelector("#points_player1");
var name_player2 = document.querySelector("#name_player2");
var points_player2 = document.querySelector("#points_player2");

var teaser = new Audio("soundTrack//laugh.mp3");
var gameOver = new Audio("soundTrack//gameOver.mp3");
var chances = hearts.length - 1;
var chancesP2 = hearts.length - 1;

var score = 0;
var scorePlay1 = 0;
var scorePlay2 = 0;
var isPlayer1 = true;

var numColor;
var colors;
var currentColor;
var colorLetters;

// Get informations from another page
var string = window.location.search.split("=");
var player1 = string[1].split("&+")[0];
var player2 = string[2].split("&")[0];
var numPlayer = string[2].split("&")[1];
var level = string[3];
var numColor;

btnColor[0].style.backgroundColor =  "rgb(0, 200, 0)";
btnColor[1].style.backgroundColor =  "rgb(200, 0, 0)";
btnColor[2].style.backgroundColor =  "rgb(0, 200, 0)";
btnColor[3].style.backgroundColor =  "rgb(200, 0, 0)";

colorDisplay.textContent = currentColor;

points.textContent = score;

playAgain.addEventListener("click", function() {
	location.reload();
});

playAgain2.addEventListener("click", function() {
	location.reload();
});

menu1.addEventListener("click", function() {
	location.assign("index.html");
});

menu2.addEventListener("click", function() {
	location.assign("index.html");
});


var game = {};

game.init = function() {
	if(numPlayer !== "multiplayer") {
 		player1 = string[1].split("&")[0];
 		if(player1 === "") {
 			player1 = "You";
 		}

		level = string[2];
		document.querySelector(".multiPlayer").style.display = "none";
		document.querySelector(".singlePlayer").style.display = "block";
		document.getElementById("name").innerHTML = player1;
		game.health(); 
		
		game.singlePlayer();
		
		colorLetters = game.getColor(9);
		for(var i = 0; i < letters.length; i++) {
			letters[i].style.color =  colorLetters[i];
		}
	} else {
		if(player1 === "") {
 			player1 = "Player 1";
 		} 
 		if(player2 === "") {
 			player2 = "Player 2";
 		}	

		document.querySelector(".multiPlayer").style.display = "block";
		document.querySelector(".singlePlayer").style.display = "none";
		document.getElementById("name1").innerHTML = player1;
		document.getElementById("name2").innerHTML = player2;
		game.health2(); 
		game.multiPlayer();

		colorLetters = game.getColor(9);
		for(var i = 0; i < letters2.length; i++) {
			letters2[i].style.color =  colorLetters[i];
		}
	}
}

game.health = function() {
	for(var i = 0; i < hearts.length; i++) {
		hearts[i].innerHTML = "<img class=\"heart\" src=\"img//full.png\">";
	}
}

game.health2 = function() {
	for(var i = 0; i < heartP1.length; i++) {
		heartP1[i].innerHTML = "<img class=\"heart\" src=\"img//full.png\">";
	}

	for(var i = 0; i < heartP2.length; i++) {
		heartP2[i].innerHTML = "<img class=\"heart\" src=\"img//full.png\">";
	}
}

game.pickColor = function() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Add random color to the array of colors
game.getColor = function(num) {
	var array = [];

	for(var i = 0; i < num; i++) {
		array.push(game.randomColors());
	}

	return array;
}

// Set random colors
game.randomColors = function() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}


game.singlePlayer = function() {

	if(level === "Easy") {
		numColor = 3;
		colors = game.getColor(numColor);
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	} else if(level === "Normal"){
		numColor = 6;
		colors = game.getColor(numColor);
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	} else {
		numColor = 9;
		colors = game.getColor(numColor);
		for(var i = 0; i < squares.length; i++) {
			squares[i].style.paddingBottom = "19%";
		}
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	}
	
	for(var i = 0; i < squares.length; i++) {
		// Set a random color to each square according to the level
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}

		squares[i].addEventListener("click", function() {
			var thisColor = this.style.backgroundColor;

			if((thisColor === currentColor)) {
				score += 100;
				var correct = new Audio("soundTrack//correct.mp3");
				correct.play();
				points.textContent = score;
				game.winning(numColor);
				// gradientColor[i] = thisColor;
				backGround.style.background = thisColor;
			} else if( (thisColor !== currentColor) && (chances >= 0)){
		 		this.classList.toggle("broken");
		 		var wrong = new Audio("soundTrack//wrong.mp3");
		 		wrong.play();
		 		hearts[chances].innerHTML = "<img class=\"heart\" src=\"img//empty.png\">";
		 	
		 		if(chances == 1) {
		 			teaser.play();		
		 		} else if(chances == 0) {
		 	   		gameOver.play();
		 	   		name_player.textContent = player1;
					points_player.textContent = score;
					document.getElementById("multi_player").style.display = "none";
		 	   		document.getElementById("single_player").style.display = "block";
		 		}
		 	
		 		chances--;
			}
		});
	}
}

game.multiPlayer = function() {
	playerTurn.textContent = player1;

	if(level === "Easy") {
		numColor = 3;
		colors = game.getColor(numColor);
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	} else if(level === "Normal"){
		numColor = 6;
		colors = game.getColor(numColor);
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	} else {
		numColor = 9;
		colors = game.getColor(numColor);
		for(var i = 0; i < squares.length; i++) {
			squares[i].style.paddingBottom = "19%";
		}
		currentColor = game.pickColor();
		colorDisplay.textContent = currentColor;
	}

	for(var i = 0; i < squares.length; i++) {
		// Set a random color to each square according to the level
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		

		squares[i].addEventListener("click", function() {
			
			var thisColor = this.style.backgroundColor;
			var correct = new Audio("soundTrack//correct.mp3");
			var wrong = new Audio("soundTrack//wrong.mp3");
			
			if(isPlayer1) {
				console.log(playerTurn);
				thisColor = this.style.backgroundColor;
				if((thisColor === currentColor)) {
					scorePlay1 += 100;
					
					correct.play();
					scoreP1.textContent = scorePlay1;
					game.winning(numColor);
				} else if( (thisColor !== currentColor) && (chances >= 0)){
		 			this.classList.toggle("broken");
		 			wrong.play();
		 			heartP1[chances].innerHTML = "<img class=\"heart\" src=\"img//empty.png\">";
		 	
		 			if(chances == 1) {
		 				teaser.play();		
		 			} else if(chances == 0) {
		 	   			gameOver.play();
		 	   			name_player1.textContent = player1;
						points_player1.textContent = scorePlay1;
						name_player2.textContent = player2;
						points_player2.textContent = scorePlay2;
						document.getElementById("single_player").style.display = "none";
		 	   			document.getElementById("multi_player").style.display = "block";
		 			}
		 			chances--;

		 			isPlayer1 = false;
		 			playerTurn.textContent = player2;
				}
			} else if(!isPlayer1) {
				thisColor = this.style.backgroundColor;
				if((thisColor === currentColor)) {
					scorePlay2 += 100;
					correct.play();
					scoreP2.textContent = scorePlay2;
					game.winning();
				} else if( (thisColor !== currentColor) && (chancesP2 >= 0)){
		 			this.classList.toggle("broken");
		 			wrong.play();
		 			heartP2[chancesP2].innerHTML = "<img class=\"heart\" src=\"img//empty.png\">";
		 	
		 			if(chancesP2 == 1) {
		 				teaser.play();		
		 			} else if(chancesP2 == 0) {
		 	   			gameOver.play();
		 	   			name_player1.textContent = player1;
						points_player1.textContent = scorePlay1;
						name_player2.textContent = player2;
						points_player2.textContent = scorePlay2;
		 	   			document.getElementById("single_player").style.display = "none";
		 	   			document.getElementById("multi_player").style.display = "block";
		 			}
		 			chancesP2--;

		 			isPlayer1 = true;
		 			playerTurn.textContent = player1;
				}
			}
		});
	}
}

game.winning = function (num) {
	colors = game.getColor(numColor);
	currentColor = game.pickColor();
	colorDisplay.textContent = currentColor;

	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].classList.remove("broken");
	}
}


game.init();