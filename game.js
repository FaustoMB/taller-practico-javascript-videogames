const canvas = document.querySelector('#game');
const  game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame (){

    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'center';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapMatrix = mapRows.map(row => row.trim().split(''))
    console.log({map,mapRows,mapMatrix});

    game.clearRect(0,0,canvasSize,canvasSize)

    mapMatrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col]
            const posX  = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
                
            }
            game.fillText(emoji, posX, posY)
        });
    });

    
    movePlayer();
    // for (let x = 1; x <= 10; x++) {
    //     for (let y = 1; y <= 10 ; y++)
    //     game.fillText(emojis[mapMatrix[x - 1][y - 1]] , elementsSize * y , elementsSize * x);
    // }
    

}

function movePlayer (){
    game.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y)
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

window.addEventListener('keydown', moveByKeys)

btnUp .addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

function moveByKeys(event){
    if (event.key == 'ArrowUp')moveUp();
    else if (event.key == 'ArrowLeft')moveLeft();
    else if (event.key == 'ArrowRight')moveRight();
    else if (event.key == 'ArrowDown')moveDown();

}

function moveUp() {
    console.log('Movimiento hacia arriba');
    if ((playerPosition.y - elementsSize) < elementsSize){
        console.log('Out');
    } else {
        playerPosition.y -= elementsSize;
    }
    startGame();
} 

function moveLeft() {
    console.log('Movimiento hacia la izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize){
        console.log('Out');
    } else {
        playerPosition.x -= elementsSize;
    }
    startGame();
}

function moveRight() {
    console.log('Movimiento hacia la derecha');
    if ((playerPosition.x + elementsSize) > elementsSize * 10 ){
        console.log('Out');
    } else {
        playerPosition.x += elementsSize;
    }
    
    startGame();
}

function moveDown() {
    console.log('Movimiento hacia abajo');
    if ((playerPosition.y + elementsSize) > elementsSize * 10 ){
        console.log('Out');
    } else {
        playerPosition.y += elementsSize;
    }
    startGame();
}