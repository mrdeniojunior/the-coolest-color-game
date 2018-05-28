var op = document.getElementById("name").innerHTML = window.location.search.substring(3);
var rgbColors = document.querySelector(".rgbColors");
var buttons = document.querySelectorAll("#btnFx");
var colors = getColors();
var index = 0;

buttons[0].style.backgroundColor = colors[99];
buttons[1].style.backgroundColor = colors[98];
buttons[2].style.backgroundColor = colors[97];
buttons[3].style.backgroundColor = colors[99];
buttons[4].style.backgroundColor = colors[98];
buttons[5].style.backgroundColor = colors[97];

setInterval(function() {
	if(index > 100) {
		index = 0;
		colors = getColors();
	} else {
		rgbColors.style.background = colors[index];
		index++;
	}
}, 1000);

if(op === "Multiplayer") {	
	document.querySelector("#single").style.display = "none";
	document.querySelector("#multi").style.display = "block";
} else {
	document.querySelector("#multi").style.display = "none";
	document.querySelector("#single").style.display = "block";
}

function randomColors() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

function getColors() {

	var array = [];

	for(var i = 0; i < 100; i++) {
		array.push(randomColors());
	}

	return array;
}





