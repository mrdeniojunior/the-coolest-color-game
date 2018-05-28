var rgbColors = document.querySelector(".rgbColors");
var buttons = document.querySelectorAll("#btnFx");
var colors = getColors();
var index = 0;

buttons[0].style.backgroundColor = colors[99];
buttons[1].style.backgroundColor = colors[98];

setInterval(function() {
	if(index > 100) {
		index = 0;
		colors = getColors();
	} else {
		rgbColors.style.background = colors[index];
		index++;
	}
}, 1000);


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