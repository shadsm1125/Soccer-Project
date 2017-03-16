var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var colors = {
	Silver:"#C0C0C0",
	Gray:"#808080",
	Black:"#000000",
	Red:"#FF0000",
	Maroon:"#800000",
	Yellow:"#FFFF00",
	Olive:"#808000",
	Lime:"#00FF00",
	Green:"#008000",
	Aqua:"#00FFFF",
	Teal:"#008080",
	Blue:"#0000FF",
	Navy:"#000080",
	Fuchsia:"#FF00FF",        
	Purple:"#800080"
}
ctx.fillStyle = "#FF0000";
ctx.fillRect(100,300,150,150);