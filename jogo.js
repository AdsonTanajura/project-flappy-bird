console.log('Flappy Bird');

let frames = 0;
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
            // console.log("PULOUUU")
            puloSom.play();
            flappybird.valocidade = - flappybird.pulu
        },
        atualiza() {
            if(fazColisao(flappybird, globais.chao)){
                console.log("Colidiu")
                hitSom.play();
                mudarParaTela(Telas.GAMER_OVER);
                return;
            }
    
            flappybird.valocidade = flappybird.valocidade + flappybird.gravidade
            flappybird.localY = flappybird.localY + flappybird.valocidade
        },

        movimentos: [
            {spriteX: 0, spriteY: 0}, //Primeiro Movimento
            {spriteX: 0, spriteY: 26}, //Segundo Movimento
            {spriteX: 0, spriteY: 52}, //Terceiro Movimento
        ],

        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloFrames = 10;
            const passouOIntervalo = frames % intervaloFrames === 0;
            if(passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappybird.frameAtual;
                const baseRepeticao = flappybird.movimentos.length;
                flappybird.frameAtual = incremento % baseRepeticao;
            };
        },
        
        desenha() {
            flappybird.atualizaOFrameAtual();
            const {spriteX, spriteY} = flappybird.movimentos[flappybird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY,
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
function criarChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 223,
        altura: 721,
        localX: 0,
        localY: canvas.height - 112,
        atualiza(){
            // console.log('O chão esta se movendo✅')
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.localX - movimentoDoChao;
            const movimento = movimentacao % repeteEm;
            chao.localX = movimento;
            // console.log('Movimento', chao.localX)
            // console.log('RepeteEm', repeteEm)
            // console.log('MOVIMENTACAO', movimentacao % repeteEm)
        },
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
    return chao;
};

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualiza() {
            const intervaloFrames = 20;
            const passouOIntervalo = frames % intervaloFrames === 0;
            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1;
            };
        },
    };
    return placar;
};

const getreadyView = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    localX: 74,
    localY: 164,
    desenha() {
        contexto.drawImage(
            sprites,
            getreadyView.spriteX, getreadyView.spriteY,
            getreadyView.largura, getreadyView.altura,
            getreadyView.localX, getreadyView.localY,
            getreadyView.largura, getreadyView.altura,
        );
    },
};

const gamerOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    localX: (canvas.width / 2) - 226 / 2,
    localY: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            gamerOver.spriteX, gamerOver.spriteY,
            gamerOver.largura, gamerOver.altura,
            gamerOver.localX, gamerOver.localY,
            gamerOver.largura, gamerOver.altura,
        );
    },
};

function criarObstaculos(){
    const obstaculos = {
        largura: 52,
        altura: 400,
        obstCao: {
            spriteX: 0,
            spriteY: 169,
        },
        obstCeu: {
            spriteX: 52,
            spriteY: 169
        },
        espaco: 80,
    
        desenha(){ 
            obstaculos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreObstaculo = 90;
    
                const obstCeuX = par.x;
                const obstCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    obstaculos.obstCeu.spriteX, obstaculos.obstCeu.spriteY,
                    obstaculos.largura, obstaculos.altura,
                    obstCeuX, obstCeuY,
                    obstaculos.largura, obstaculos.altura,
                );
                const obstCaoX = par.x;
                const obstCaoY = obstaculos.altura + espacamentoEntreObstaculo + yRandom;
                contexto.drawImage(
                    sprites,
                    obstaculos.obstCao.spriteX, obstaculos.obstCao.spriteY,
                    obstaculos.largura, obstaculos.altura,
                    obstCaoX, obstCaoY,
                    obstaculos.largura, obstaculos.altura,
                );

                par.obstCeu = {
                    x: obstCeuX,
                    y: obstaculos.altura + obstCeuY
                };
                par.obstCao = {
                    x: obstCaoX,
                    y: obstCaoY
                };

            });
        },

        temColisao(par) {
            const topFlappybird = globais.flappybird.localY;
            const downFlappybird = globais.flappybird.localY + globais.flappybird.altura;

            if((globais.flappybird.localX + globais.flappybird.largura) >= par.x) {
                if(topFlappybird <= par.obstCeu.y) {
                    // console.log('Bateu!!!!!')
                    return true;
                };

                if(downFlappybird >= par.obstCao.y) {
                    // // console.log('Bateu!!!!!')
                    return true;
                };
            }
        },

        pares: [
        ],
        atualiza() {
            const passou100frames = frames % 100 === 0;
            if(passou100frames) {
                // console.log('Passou 100 frames');
                obstaculos.pares.push(
                    {
                        x:canvas.width,
                        y:-150 * (Math.random() + 1),
                    },
                );
            }
        

            obstaculos.pares.forEach(function(par) {
                par.x = par.x - 2;
                
                if(obstaculos.temColisao(par)) {
                    mudarParaTela(Telas.GAMER_OVER);
                    hitSom.play();
                    // console.log('Você Perdeu')
                }

                if(par.x + obstaculos.largura <= 0) {
                    obstaculos.pares.shift();
                }
            });

        },
    };
    return obstaculos;
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
            globais.chao = criarChao();
            globais.obstaculos = criarObstaculos();
        },
        desenha() {
            background.desenha();
            globais.chao.desenha();
            globais.flappybird.desenha();
            getreadyView.desenha();
            
        },
        click() {
            mudarParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        },
    }
};

Telas.JOGO = {
    inicializa(){
        globais.placar = criaPlacar();
    },
    desenha() {
        background.desenha();
        globais.obstaculos.desenha();
        globais.chao.desenha();
        globais.flappybird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappybird.pular();
    },
    atualiza() {
        globais.obstaculos.atualiza();
        globais.chao.atualiza();
        globais.flappybird.atualiza();
        globais.placar.atualiza();
    },
};
Telas.GAMER_OVER = {
    desenha() {
        gamerOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudarParaTela(Telas.INICIO);
    },
};

function loop() {
    Telas.INICIO.atualiza

    requestAnimationFrame(loop);
 }
function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener("click", function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});


mudarParaTela(Telas.INICIO);
 loop();