let cols = 30;
let rows = 30;
let game = [];
let playerPosition = [];
let player = '🙂';

for(let i = 0; i < rows; i++) {
	let row = [];
	for(let j = 0; j < cols; j++) {
		row.push(0);
	}
	game.push(row);
}

function renderField(rows, cols) {
	document.getElementById('game').innerHTML = '';
	let row = "<div class='row'>";
	let block = "<div class='block'>";
	let field = '';

	for(let i = 0; i < rows; i++) {
		field += row;

		for(let j = 0; j < cols; j++) {
			field += block;
			if(game[i][j] != 0) field += game[i][j];
			field += '</div>';

		}

		field += '</div>';
	}

	document.getElementById('game').innerHTML += field;
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setPlayer(rows, cols) {
	x = getRandom(0, rows);
	y = getRandom(0, cols);
	try{
		game[y][x] = player;
		playerPosition.push(y);
		playerPosition.push(x);
		console.log("Player position: " + playerPosition);
	}catch{
		setPlayer(rows, cols);
	}
	
}

function printMatrix(){
	let out = '';
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			out += game[i][j];
		}
		out += '\n';
	}	
	console.log(out);
}

function movePlayer(position) {
    switch(position){
         
        case "Left": 
            if(playerPosition[1] > 0) {
            	y = playerPosition[0];
            	x = playerPosition[1];
            	game[y][x] = 0;
            	game[y][x - 1] = player;
            	playerPosition[1] = x - 1;
            	renderField(rows, cols);
            }
            break;

        case "Top":   
            if(playerPosition[0] > 0) {
            	y = playerPosition[0];
            	x = playerPosition[1];
            	game[y][x] = 0;
            	game[y - 1][x] = player;
            	playerPosition[0] = y - 1;
            	renderField(rows, cols);
            }
            break;

        case "Right":  
            if(playerPosition[1] < cols - 1) {
            	y = playerPosition[0];
            	x = playerPosition[1];
            	game[y][x] = 0;
            	game[y][x + 1] = player;
            	playerPosition[1] = x + 1;
            	renderField(rows, cols);
            }
            break;

        case "Down":   
            if(playerPosition[0] < rows - 1) {
            	y = playerPosition[0];
            	x = playerPosition[1];
            	game[y][x] = 0;
            	game[y + 1][x] = player;
            	playerPosition[0] = y + 1;
            	renderField(rows, cols);
            }
            break;
    }
}

function moveRect(e){
    switch(e.key){
         
        case "ArrowLeft": 
            movePlayer("Left");
            break;

        case "ArrowUp":   
            movePlayer("Top");
            break;

        case "ArrowRight":  
            movePlayer("Right");
            break;

        case "ArrowDown":   
            movePlayer("Down");
            break;
    }
}
 
addEventListener("keydown", moveRect);


setPlayer(rows, cols);
printMatrix();
renderField(rows, cols);

