let colors = ["#C0C0C0", "#808080", "#000000", "#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080"];

let pieChart = {
    textHeight:15,
	totalValues:0,

	textDistFromArc:15,
	//>>>>> Generation of Data
	APart:function(title, value){
		this.title = title;
		this.value = value;
	},

	PieObj: function(title, list){
		this.title = title;
		this.list = list;
	},

	listGeneration:function(){
		var listLength = 10;//Math.floor(Math.random()*10 + 1);
		var title = "Chart's Title";
		var pieParts = [];
		for(var i=0 ; i<listLength ; i++){
			var number = Math.floor(Math.random()*10 + 1);
			var text = colors[Math.floor(Math.random()*colors.length + 1)];
			pieParts.push(new pieChart.APart(text, number));
			console.log("title: " + pieParts[i].title + ", value=" + pieParts[i].value + "\n");
		}
		return new pieChart.PieObj(title, pieParts);
	},
	//<<<<<<<<<<<< end of generation of data

	deg2Rad:function(value) {
		return (value * Math.PI)/180;
	},

	setPoints2Deg:function(listValues){
		let l = [];
		pieChart.totalValues = function(){
			var total = 0;
			for(var i=0 ; i<listValues.length ; i++)
				total += listValues[i].value;
			return total;
		}
		
		let unite2Degree = 360/pieChart.totalValues;
		for(let i=0 ; i<listValues.length ; i++)
			l.push(unite2Degree*listValues[i].value);
		return l;
	},

	drawPieChart:function(pieOb, canvas){
		var listValues = pieOb.list;
        let indXPos = canvas.width - 200;
        let indYPos = pieChart.textHeight * 6;

		let centerX = Math.floor(canvas.width / 2) - 110;
		let centerY = Math.floor(canvas.height / 2) + 50;
		let radius = Math.floor(canvas.width / 2) - 200;
		let listDegOfPts = pieChart.setPoints2Deg(listValues);
		let ctx = canvas.getContext("2d");
		ctx.save();
		let angleStart = 0;

        // The Title of the Graph
        ctx.font = "bold 28px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign="center"; 
        ctx.fillText(pieOb.title,canvas.width / 2,40); 
        ctx.restore();
    
        // border for the Graph
        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.rect(1, 75, indXPos-15, canvas.height-75);//canvas.width-68,canvas.height);
        ctx.strokeStyle="black";
        ctx.stroke();
        ctx.restore();

		for(let i=0 ; i<listDegOfPts.length ; i++){
			let angleEnd = angleStart + listDegOfPts[i];
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius,
			pieChart.deg2Rad(angleStart), pieChart.deg2Rad(angleEnd), false);
			ctx.closePath();
			ctx.fillStyle = colors[i];
			ctx.fill();
			ctx.restore();

			// drawing TEXT for the part
			let percentage = listValues[i]/pieChart.totalValues * 100;
			let angle = pieChart.deg2Rad(angleStart - (angleStart - angleEnd)/2);
			let textXCoord = centerX + ((radius + pieChart.textDistFromArc) * Math.cos(angle));
			let textYCoord = centerY + ((radius + pieChart.textDistFromArc) * Math.sin(angle));
			ctx.font = "bold " + pieChart.textHeight + "px Arial";
			let text2Show = listValues[i].toString() + " (" + percentage.toFixed(2).toString() + "%)";
			if(angle>pieChart.deg2Rad(90) && angle<pieChart.deg2Rad(270))
				ctx.fillText(text2Show, textXCoord - ctx.measureText(text2Show).width, textYCoord);
			else
				ctx.fillText(text2Show, textXCoord, textYCoord);
			angleStart = angleEnd;            

			ctx.fillStyle = colors[i];
            ctx.fillText(text2Show, indXPos, indYPos);
            indYPos += pieChart.textHeight * 2;
			ctx.restore();
		}
	}
}
//console.log(JSON.stringify(pieChart.listGeneration(), 2));
pieChart.drawPieChart(pieChart.listGeneration(), document.getElementById("myCanvas"));