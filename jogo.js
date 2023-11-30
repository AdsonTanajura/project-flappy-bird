console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './assets/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const hitSom = new Audio();
hitSom.src = './effect/hit.mp3';
const puloSom = new Audio();
puloSom.src = './effect/pulo.mp3';

function fazColisao(flappybird, chao) {
    flappybird = flappybird.localY + flappybird.altura;
    ondeColide = chao.localY

    if(flappybird >= ondeColide){
        return true;
    }
    return false;
}
function criaFlappyBird() {
    const flappybird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        localX: 10,
        localY: 50,
        valocidade: 0,
        gravidade: 0.25,
        pulu: 4.6,
        pular() {
            console.log("PULOUUU")
            puloSom.play();
            flappybird.valocidade = - flappybird.pulu
        },
        atualiza() {
            if(fazColisao(flappybird, chao)){
                console.log("Colidiu")
                hitSom.play();
                mudarParaTela(Telas.INICIO);
                return;
            }
    
            flappybird.valocidade = flappybird.valocidade + flappybird.gravidade
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
    return flappybird;
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

const getreadyView = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    localX: 74,
    localY: 164,
    desenha(){
        contexto.drawImage(
            sprites,
            getreadyView.spriteX, getreadyView.spriteY,
            getreadyView.largura, getreadyView.altura,
            getreadyView.localX, getreadyView.localY,
            getreadyView.largura, getreadyView.altura,
        );
    }
};

let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela 
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
};

const globais = {};

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappybird = criaFlappyBird();
        },
        desenha() {
            background.desenha();
            chao.desenha();
            globais.flappybird.desenha();
            getreadyView.desenha();
        },
        click() {
            mudarParaTela(Telas.JOGO);
        },
        atualiza() {

        },
    }
};

Telas.JOGO = {
    desenha() {
        background.desenha();
        chao.desenha();
        globais.flappybird.desenha();
    },
    click() {
        globais.flappybird.pular();
    },
    atualiza() {
       globais.flappybird.atualiza();
    },
};

function loop() {
    Telas.INICIO.atualiza

    requestAnimationFrame(loop);
 }
function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
};

window.addEventListener("click", function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});


mudarParaTela(Telas.INICIO);
 loop();