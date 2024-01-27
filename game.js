const canvas = document.querySelector('#game');
const  game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')


let canvasSize;
let elementsSize;

let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timerInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemiesPosition = [];


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function startGame (){

    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'center';
    if (!maps[level]) {
        setRecordByWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timerInterval = setInterval(showTime,100);
        showRecord();
    }


    const map = maps[level];
    const mapRows = map.trim().split('\n');
    const mapMatrix = mapRows.map(row => row.trim().split(''))
    console.log({map,mapRows,mapMatrix});

    showLives();

    enemiesPosition = [];
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
            } else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X'){
                enemiesPosition.push({
                    x: posX,
                    y: posY,
                });
            }


            game.fillText(emoji, posX, posY)
        });
    });

    
    movePlayer();  



}

function movePlayer (){
    const giftCollisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const giftCollisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        console.log('Subiste de Nivel');
        levelWin();
    }
    
    const enemiesCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(1) == playerPosition.x.toFixed(1);
        const enemyCollisionY = enemy.y.toFixed(1) == playerPosition.y.toFixed(1);
        return enemyCollisionX && enemyCollisionY
    })


    if(enemiesCollision){
        console.log('Perdiste :c');
        levelFail();
        
    }


    game.fillText(emojis['PLAYER'], playerPosition.x , playerPosition.y)

}

function levelWin (){
    level++;
    startGame();
}

function levelFail(){
    lives --;

    if (lives <= 0){
        level = 0;
        lives = 3
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
    
    

}

function showLives() {
    const heartArrays = Array(lives).fill(emojis['HEART']) 
    console.log({heartArrays});
    spanLives.innerHTML = "";
    heartArrays.forEach(heart => spanLives.innerHTML += heart);
    // heartArrays.forEach(heart => spanLives.append(heart));
}

function showTime () {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

function setRecordByWin() {
    
    
    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart;
    console.log('Has ganado');
    clearInterval(timerInterval);

    if (recordTime){
        if (recordTime > playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Has superado el record, sigue intentando tu mejor marca';
        } else {
            pResult.innerHTML = 'Casi logras superar el record, vuelve a intentarlo';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Es tu primer juego, sigue intentando tu mejor marca';
    }
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
    if ((playerPosition.y - elementsSize) < 1){
        console.log('Out');
    } else {
        playerPosition.y -= elementsSize;
    }
    startGame();
} 

function moveLeft() {
    console.log('Movimiento hacia la izquierda');
    if ((playerPosition.x - elementsSize) < 1){
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