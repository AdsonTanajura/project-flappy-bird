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
    valocidade: 0,
    gravidade: 0.25,
    atualiza() {
        flappybird.valocidade = flappybird.valocidade + flappybird.gravidade
        console.log(flappybird.valocidade)
        flappybird.localY = flappybird.localY + flappybird.valocidade
    },

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

const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 665,
    altura: 203,
    localX: 0,
    localY: canvas.height - 203,
    
    desenha() {
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX,
            background.spriteY,
            background.largura,
            background.altura,
            background.localX,
            background.localY,
            background.largura,
            background.altura,
        );
        
        contexto.drawImage(
            sprites,
            background.spriteX,
            background.spriteY,
            background.largura,
            background.altura,
            (background.localX + background.altura),
            background.localY,
            background.largura,
            background.altura,
        );
    }
};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 223,
    altura: 721,
    localX: 0,
    localY: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX,
            chao.spriteY,
            chao.largura,
            chao.altura,
            chao.localX,
            chao.localY,
            chao.largura,
            chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX,
            chao.spriteY,
            chao.largura,
            chao.altura,
            (chao.localX + chao.largura),
            chao.localY,
            chao.largura,
            chao.altura,
        );
        
    }
};

function loop() {

    flappybird.atualiza();
    background.desenha();
    chao.desenha();
    flappybird.desenha();

    requestAnimationFrame(loop);
 }

 loop();