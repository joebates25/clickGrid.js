var Grid = function (canvas, dict){
	var self = this;
	this.context = canvas.getContext('2d');
	this.rows = dict.rows;
	this.columns = dict.columns;
	this.xLineColor = dict.xLineColor;
	this.yLineColor = dict.yLineColor;
	this.fillColor = dict.fillColor;
	this.drawOnClick = dict.drawOnClick;
	this.canvasHeight = canvas.height;
	this.canvasWidth = canvas.width; 
	this.dotHeight = this.canvasHeight / this.columns;
	this.dotWidth = this.canvasWidth / this.rows;
	this.squareClicked = dict.onGridSquareClicked;
	this.clickFillColor = dict.clickFillColor;
	this.resetClickFill = dict.resetClickFill;

	if (this.clickFillColor){
		var t = this;
		canvas.addEventListener('click', function(e){
			var rect = canvas.getBoundingClientRect();
			gridX = Math.floor((e.clientX - rect.left) / row);
			gridY = Math.floor((e.clientY - rect.top) / col);
			if (t.elementArray[gridX][gridY] == t.clickFillColor){
				if (t.resetClickFill){
					t.fill(gridX, gridY, t.fillColor);
				}
			} else{
				t.fill(gridX, gridY, t.clickFillColor);
			}
			t.draw();
		});
	}

	this.elementArray = new Array(this.rows);
	for (var i = 0; i < this.rows; i++){
		this.elementArray[i] = new Array(this.columns);
		for (var j = 0; j < this.columns; j++){
			this.elementArray[i][j] = this.fillColor;
		}
	}

	this.fill = function(x,y,color){
		this.elementArray[x][y] = color;
	}


	this.draw = function(){
		for (var x = 0; x < this.rows; x++){
			for (var y = 0; y < this.columns; y++){
				this.context.fillStyle = this.elementArray[x][y];
				this.context.fillRect(x*this.dotWidth,y*this.dotHeight,this.dotWidth,this.dotHeight);		
			}
		}
		//Draw grid
		for (var i = 0; i <= this.columns; i++){
      		this.context.beginPath();
      		this.context.moveTo(this.dotWidth * i,0);
      		this.context.lineTo(this.dotWidth * i,this.columns  * this.dotWidth);
      		this.context.lineWidth = 1;
      		this.context.strokeStyle = this.xLineColor;
      		this.context.stroke();
      	}

		for (var j = 0; j <= this.rows; j++){
      		this.context.beginPath();
      		this.context.moveTo(0,this.dotHeight * j);
      		this.context.lineTo(this.rows * this.dotHeight,this.dotHeight * j);
      		this.context.strokeStyle = this.yLineColor;
      		this.context.lineWidth = 1;
      		this.context.stroke();
		}
	}

	
	var sq = this.squareClicked;
	var row = this.dotWidth;
	var col = this.dotHeight;
	var rect = canvas.getBoundingClientRect();
	canvas.addEventListener('click', function(e){
		sq(Math.floor((e.clientX - rect.left) / row), Math.floor((e.clientY - rect.top) / col));
	}, false);
}
