const scenes = document.querySelectorAll(".scene");

const tl = new TimelineMax();


// =====================================================
// CONFIGURAÇÃO
// =====================================================

const normalTime = 2.5;
const fadeTime = 0.8;


// =====================================================
// INICIALIZAÇÃO
// =====================================================

TweenMax.set(scenes, {
  autoAlpha: 0
});


// =====================================================
// CENAS 1 ATÉ 10
// =====================================================

for (let i = 0; i < 10; i++) {

  tl.to(scenes[i], 1, {
    autoAlpha: 1,
    ease: Power2.easeOut
  })

  .to(scenes[i], fadeTime, {
    autoAlpha: 0,
    ease: Power2.easeIn
  }, `+=${normalTime}`);

}


// =====================================================
// FOTO
// =====================================================

tl.to(scenes[10], 1.2, {
  autoAlpha: 1,
  ease: Power2.easeOut
})

.to(scenes[10], 0.8, {
  autoAlpha: 0,
  ease: Power2.easeIn
}, "+=5");


// =====================================================
// MENSAGEM "HOJE FAZ 1 ANO"
// =====================================================

tl.to(scenes[11], 1.2, {
  autoAlpha: 1,
  ease: Power2.easeOut
})

.to(scenes[11], 0.8, {
  autoAlpha: 0,
  ease: Power2.easeIn
}, "+=4");


// =====================================================
// "QUE BOM QUE AQUELE DIA ACONTECEU"
// =====================================================

tl.to(scenes[12], 1.2, {
  autoAlpha: 1,
  ease: Power2.easeOut
})

.to(scenes[12], 0.8, {
  autoAlpha: 0,
  ease: Power2.easeIn
}, "+=3");


// =====================================================
// "EU TE AMO, MINHA PRINCESA"
// =====================================================

tl.to(scenes[13], 1.5, {
  autoAlpha: 1,
  ease: Power2.easeOut
})


// =====================================================
// FOGOS
// =====================================================

// Espera a declaração aparecer
tl.to({}, 1, {});

tl.call(startFireworks);


// =====================================================
// MANTÉM A CENA DOS FOGOS
// =====================================================

tl.to(scenes[14], 0.5, {
  autoAlpha: 1
});

tl.to({}, 8, {});


// =====================================================
// REINICIAR
// =====================================================

tl.eventCallback("onComplete", () => {

  stopFireworks();

  tl.restart();

});


// =====================================================
// CANVAS DOS FOGOS
// =====================================================

const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let fireworks = [];

let fireworksRunning = false;

let animationFrame;

let fireworksInterval;


// =====================================================
// TAMANHO DO CANVAS
// =====================================================

function resizeCanvas() {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =====================================================
// CRIAR EXPLOSÃO
// =====================================================

function createFirework(x, y) {

  const particles = [];

  const particleCount = 70;

  const hue =
    Math.floor(Math.random() * 360);


  for (let i = 0; i < particleCount; i++) {

    const angle =
      Math.random() * Math.PI * 2;

    const speed =
      Math.random() * 5 + 2;


    particles.push({

      x: x,

      y: y,

      vx: Math.cos(angle) * speed,

      vy: Math.sin(angle) * speed,

      life: 1,

      size:
        Math.random() * 2 + 1,

      hue: hue

    });

  }


  fireworks.push(particles);

}


// =====================================================
// DESENHAR FOGOS
// =====================================================

function updateFireworks() {

  if (!fireworksRunning) return;


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  fireworks.forEach((explosion, index) => {

    explosion.forEach(particle => {

      particle.x += particle.vx;

      particle.y += particle.vy;

      particle.vy += 0.035;

      particle.vx *= 0.985;

      particle.vy *= 0.985;

      particle.life -= 0.012;


      if (particle.life > 0) {

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          `hsla(
            ${particle.hue},
            90%,
            70%,
            ${particle.life}
          )`;


        ctx.fill();

      }

    });


    fireworks[index] =
      explosion.filter(
        particle => particle.life > 0
      );


    if (fireworks[index].length === 0) {

      fireworks.splice(index, 1);

    }

  });


  animationFrame =
    requestAnimationFrame(updateFireworks);

}


// =====================================================
// INICIAR FOGOS
// =====================================================

function startFireworks() {

  fireworksRunning = true;


  fireworksInterval =
    setInterval(() => {

      const x =
        Math.random() *
        (canvas.width * 0.8)
        +
        canvas.width * 0.1;


      const y =
        Math.random() *
        (canvas.height * 0.45)
        +
        canvas.height * 0.08;


      createFirework(x, y);

    }, 650);


  updateFireworks();

}


// =====================================================
// PARAR FOGOS
// =====================================================

function stopFireworks() {

  fireworksRunning = false;


  clearInterval(
    fireworksInterval
  );


  cancelAnimationFrame(
    animationFrame
  );


  fireworks = [];


  if (ctx) {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

  }

}