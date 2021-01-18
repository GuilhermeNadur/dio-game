let megaman = document.querySelector('#megaman2');
const background = document.querySelector('.background');

var timesJumped = 0;
let megamanPosition = 0;
let isJumping = false;
let isPlaying = false;

function jogar() {
    if (!isPlaying) {
        isPlaying = true;
        createBox();
        document.getElementById('divButtonJogar').remove();
        document.getElementById('megaman1').remove();
        document.getElementById('instruction').remove();
        document.getElementById('megaman2').style.display = 'block';
    }
}

function reiniciar() {
    document.location.reload(true);
}

function congratulations() {
    document.getElementById('megaman2').remove();
    document.getElementById('megaman3').style.display = 'block';
    document.getElementById('congratulations').style.display = 'block';
}

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();  
        }
    }
}

function jump() {
    isJumping = true;
    timesJumped++;
    let upInterval = setInterval(() => {
        if (megamanPosition >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (megamanPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    megamanPosition -= 15;
                    megaman.style.bottom = megamanPosition + 'px';
                }
            }, 20);
        } else {
            megamanPosition += 15;
            megaman.style.bottom = megamanPosition + 'px';
        }
    }, 20);
}

function createBox() {
    const box = document.createElement('div');
    let boxPosition = 1870;
    let randomTime = Math.random() * (1500 - 500) + 500;

    box.classList.add('box');
    box.style.left = 1870 + 'px';
    background.appendChild(box);

    let leftInterval = setInterval(() => {
        if (boxPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(box);
        } else if (boxPosition > 0 && boxPosition < 160 && megamanPosition < 20) {
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">FIM DE JOGO</h1>' + 
                '<div class="divButtonReiniciar"><button class="buttonReiniciar" onclick="reiniciar()">REINICIAR</button></div>';
        } else {
            boxPosition -= 15;
            box.style.left = boxPosition + 'px';
        }
    }, 10);
    if (timesJumped <= 15) {
        setTimeout(createBox, randomTime); 
    } else {
        setTimeout(congratulations, 3200);
    }
}

document.addEventListener('keydown', handleKeyDown);