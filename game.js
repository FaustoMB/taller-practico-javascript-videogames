const canvas = document.querySelector('#game');
const  game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame (){

    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'center';

    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapMatrix = mapRows.map(row => row.trim().split(''))
    console.log({map,mapRows,mapMatrix});

    for (let x = 1; x <= 10; x++) {
        for (let y = 1; y <= 10 ; y++)
        game.fillText(emojis[mapMatrix[x - 1][y - 1]] , elementsSize * y , elementsSize * x);
    }
    
    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,100,50);
    // game.clearRect(50,50,50,50);
    // game.clearRect(0,0,50,50);
    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign = 'left'
    // game.fillText('Juego',100,100)
}

function setCanvasSize () {

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }
    
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 11;

    startGame();
}