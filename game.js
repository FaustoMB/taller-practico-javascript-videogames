const canvas = document.querySelector('#game');
const  game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame (){

    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'center';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapMatrix = mapRows.map(row => row.trim().split(''))
    console.log({map,mapRows,mapMatrix});

    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX  = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY)
        });
    });

    // for (let x = 1; x <= 10; x++) {
    //     for (let y = 1; y <= 10 ; y++)
    //     game.fillText(emojis[mapMatrix[x - 1][y - 1]] , elementsSize * y , elementsSize * x);
    // }
    

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