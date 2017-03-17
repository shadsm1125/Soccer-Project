var colors = ["#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];

// var graphObj = {
// 	title:"string",
// 	v_line:{
// 		legend:"string",
// 		unite:"string"
// 	}
// 	h_line:{
// 		legend:"string",
// 		unite:"string"
// 	}
// 	lines:[
// 		{ // one line
// 			color:"string",
// 			legend:"string",
// 			lineType:"string", // straight, dotted, etc.
// 			points:[(val_x1, val_y1), (val_x2, val_y2), ...]
// 		}
// 	],
// };

var listValues = [2,8, 6, 5, 3, 4, 5];
var totalValues = 0;

var textDistFromArc = 15;

var deg2Rad = function(value) {
	return (value * Math.PI)/180;
}

function setPoints2Deg(values){
	var l = [];
	totalValues = listValues.reduce((a,b) => a+b);
	var unite2Degree = 360/totalValues;
	for(var i=0 ; i<values.length ; i++)
		l.push(unite2Degree*values[i]);
	return l;
}

function drawPieChart(canvas){
	var centerX = Math.floor(canvas.width / 2) - 120;
	var centerY = Math.floor(canvas.height / 2) + 50;
	var radius = Math.floor(canvas.width / 2) - 200;
	var listDegOfPts = setPoints2Deg(listValues);
	var context = canvas.getContext("2d");
	context.save();
	var angleStart = 0;
	for(var i=0 ; i<listDegOfPts.length ; i++){
		let angleEnd = angleStart + listDegOfPts[i];
		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, radius,
		deg2Rad(angleStart), deg2Rad(angleEnd), false);
		context.closePath();
		context.fillStyle = colors[i];
		context.fill();
		context.restore();

		// drawing TEXT
		var percentage =(listValues[i] / totalValues) * 100;
		var angle = deg2Rad(angleStart - (angleStart - angleEnd)/2);
		var textXCoord = centerX + ((radius + textDistFromArc) * Math.cos(angle));
		var textYCoord = centerY + ((radius + textDistFromArc) * Math.sin(angle));
		context.font = "bold 14px Arial";
		var text2Show = listValues[i].toString() + " (" + percentage.toFixed(2).toString() + "%)";
		if(angle>deg2Rad(90) && angle<deg2Rad(270))
			context.fillText(text2Show, textXCoord - context.measureText(text2Show).width, textYCoord);
		else
			context.fillText(text2Show, textXCoord, textYCoord);
		angleStart = angleEnd;
	}
}

drawPieChart(document.getElementById("myCanvas"));