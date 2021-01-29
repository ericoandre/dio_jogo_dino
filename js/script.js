const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let jumpState = false;
let score = 0;
let gameOver = false;

const handKeyUp = (event)=>{
    //console.log(event.keyCode);
    if(event.keyCode === 32){
        //console.log(event.keyCode);
        if(!jumpState) jump();
    }
}


const  jump = () => {
    jumpState = true;
    let upInterval = setInterval(()=>{
        if(position>=150){
            clearInterval(upInterval);
            let downInterval= setInterval(()=>{
                if (position<=0) {
                    clearInterval(downInterval);
                    jumpState = false;
                }else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        }else{
            position += 20;
            dino.style.bottom = position + 'px';
        } 
        
    }, 20);
}


const crearCactus = () =>{
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randonTimes = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    if(gameOver) return;

    let leftInterval = setInterval(()=>{
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            gameOver = true;
            document.body.innerHTML = '<div class="game-over"><h1>Fim de jogo</h1><br><span>Score: '+score+'</span></div>';
        }else if(!gameOver){
            score+=1;
            cactusPosition-=10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(crearCactus, randonTimes);
}
crearCactus();
document.addEventListener('keyup', handKeyUp);