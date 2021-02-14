alert('Добрый день, уважаемый игрок! В этой сложной игре тебе придется управлять иголкой, которая будет лопать шарики. Ты увидишь, сколько шариков ты пропустил, а сколько лопнул за отведенные 60 секунд. Для управления иглой используй кнопки "LEFT & RIGHT", или стрелочки на клавиатуре. УДАЧИ!')

const spine = document.getElementById('spine');
const spineLeft = document.getElementById('spine-left');
const spineRight = document.getElementById('spine-right');

const offer = document.getElementById('offer')
const redBox = document.getElementById('red-box');

const controlOffer = document.getElementById('control-offer')
const startGame = document.getElementById('startGame');
const stopGame = document.getElementById('stopGame');

const counterOffer = document.getElementById('counter-offer');
const timerOffer = document.getElementById('timer-offer');
const lostOffer = document.getElementById('lost-offer');

const yourScore = document.getElementById('your-score');



//движение иглы
spineLeft.addEventListener('click', ()=> {
    let placeSpine = spine.getBoundingClientRect();
    let size = placeSpine.left;
    spine.style.left = (size - 70) + 'px';
})

spineRight.addEventListener('click', ()=> {
    let placeSpine = spine.getBoundingClientRect();
    let size = placeSpine.left;
    spine.style.left = (size + 70) + 'px';
})

//движение иглы на стрелочки
document.addEventListener('keydown', (event)=> {
    if(event.code == 'ArrowLeft') {
        let placeSpine = spine.getBoundingClientRect();
        let size = placeSpine.left;
        spine.style.left = (size - 70) + 'px'; 
    } else if(event.code == 'ArrowRight') {
        let placeSpine = spine.getBoundingClientRect();
        let size = placeSpine.left;
        spine.style.left = (size + 70) + 'px';
    }
})


//таймер

let timerCount = 60;
const timerBack = () => {
    if(timerCount !=0) {
        timerCount--;
        timerOffer.innerHTML = "Time: " + timerCount; 
    } else {
        yourScore.classList.add('active')
        yourScore.innerHTML = 'Твой счет: ' + countTouch + '<br/> Шариков упущено: ' + lostChanse;
        clearInterval(timer);
        clearInterval(moveball);
        clearInterval(timerCount);
    }
}


//получение координат шарика
const getClietnHeightAndWidth = () => {
    let clientHeight = document.documentElement.clientHeight;
    let clientWidth = document.documentElement.clientWidth;
    let data = [clientHeight, clientWidth];
    
    return data;
}
const sizeWindow = getClietnHeightAndWidth();

redBox.style.top = sizeWindow[0] + 'px';
controlOffer.style.top = (sizeWindow[0]-100) + 'px';



let count = 0;
let colorArray = ['yellow', 'pink', 'blue', 'black', 'cornflowerblue', 'coral', 'red']
//создание шариков
const createBall = () => {
    const ball = document.createElement('div');
    ball.classList.add('red-box');
    const colorBall = randomInteger(0,6);
    ball.classList.add(colorArray[colorBall]);
    count += 1;
    ball.setAttribute('id', count)
    ball.style.left = randomInteger(0, (sizeWindow[1]-200)) + 'px';
    ball.style.top = sizeWindow[0] + 'px';
    offer.append(ball);    
}

let countTouch = 0;
let lostChanse = 0;


const moveBalls = () => {
    const redBoxClass = document.querySelectorAll('.red-box')
    for(item of redBoxClass) {
        if(timerCount<=60 && timerCount >=40) {
            let size = parseInt(item.style.top, 10);
            item.style.top = (size - 10) + 'px';
        } else if(timerCount <40) {
            let size = parseInt(item.style.top, 10);
            item.style.top = (size - 20) + 'px';
        }
        const ballTopPlace = item.getBoundingClientRect();
        const checkBallTopPlace = ballTopPlace.top;
        const checkBallLeft = ballTopPlace.left;
        const checkBallRight = ballTopPlace.right;
        const checkBallBottom = ballTopPlace.bottom;
        //-------------------------------
        const placeSpine = spine.getBoundingClientRect();
        const checkSpineLeftCoord = placeSpine.left;
        if(checkBallTopPlace <= 120 && checkBallTopPlace >=70 && checkSpineLeftCoord>checkBallLeft && (checkSpineLeftCoord+5) < checkBallRight) {
            countTouch++;
            item.remove();
            counterOffer.innerHTML = "Score: " + countTouch;
        } 
        if(checkBallBottom <= 0) {
            lostChanse++;
            item.remove();
            lostOffer.innerHTML = "Runaway balls: " + lostChanse;
        }
    }
}



//создание рандомных координат
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }



let timer;
let moveball;
let timerBackCount;

startGame.addEventListener('click', () => {
    startGame.classList.add('invisible');
    spineLeft.classList.remove('invisible');
    spineRight.classList.remove('invisible');
    spine.classList.add('active');
    timerBackCount = setInterval(timerBack,1000);
    timer = setInterval(createBall,2700);
    moveball = setInterval(moveBalls,200);
})

stopGame.addEventListener('click', () => {
    startGame.classList.remove('invisible');
    spineLeft.classList.add('invisible');
    spineRight.classList.add('invisible');
    spine.classList.remove('active');
    clearInterval(timer);
    clearInterval(moveball);
    clearInterval(timerBackCount);
})




