console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './assets/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappybird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    localX: 10,
    localY: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            flappybird.spriteX, flappybird.spriteY,
            flappybird.largura, flappybird.altura,
            flappybird.localX, flappybird.localY,
            flappybird.largura, flappybird.altura,
         );
    }
};

function loop() {

    flappybird.desenha();
    
     requestAnimationFrame(loop);

 }

 loop();