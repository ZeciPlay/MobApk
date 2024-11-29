document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = document.querySelector(".welcome-text");
    const textContent = welcomeText.textContent;
    welcomeText.textContent = "";

    // Dividir a frase em letras, preservando os espaços
    textContent.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        if (char === " ") span.style.marginRight = "5px"; // Preserva espaços visuais entre as palavras
        span.style.animationDelay = `${index * 0.07}s`; // Ajuste de tempo para efeito mais lento
        welcomeText.appendChild(span);
    });

    // Animação dos botões
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        const direction = Math.floor(Math.random() * 4); // 0: cima, 1: baixo, 2: esquerda, 3: direita
        let startX = 0;
        let startY = 0;

        switch (direction) {
            case 0: // Cima
                startY = -100; // Começa acima da tela
                break;
            case 1: // Baixo
                startY = 100; // Começa abaixo da tela
                break;
            case 2: // Esquerda
                startX = -100; // Começa à esquerda da tela
                break;
            case 3: // Direita
                startX = 100; // Começa à direita da tela
                break;
        }

        button.style.opacity = "1"; // Torna o botão visível
        button.style.transform = `translate(${startX}px, ${startY}px)`; // Move para fora da tela

        setTimeout(() => {
            button.style.transform = `translate(0, 0)`; // Mover para a posição final
            button.style.transition = "transform 0.5s, opacity 0.5s"; // Suavizar a transição
            button.classList.add("button-glow"); // Adiciona classe de animação glow
        }, 100);
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 70) + (buttons.length * 100);
    setTimeout(() => {
        createParticles();
    }, totalDuration);

    // Adiciona um evento de clique para criar novas partículas
    document.addEventListener("click", createInteractionParticles);
});

// Função para gerar uma cor vermelha aleatória
function getRandomRedColor() {
    const redShades = [
        'rgba(255, 0, 0, 0.8)',   // Vermelho puro
        'rgba(220, 20, 60, 0.8)',  // Vermelho escuro
        'rgba(255, 99, 71, 0.8)',  // Tomate
        'rgba(255, 127, 80, 0.8)', // Coral
        'rgba(255, 182, 193, 0.8)', // Rosa claro
        'rgba(178, 34, 34, 0.8)',   // Vermelho escuro 2
        'rgba(255, 69, 0, 0.8)',    // Vermelho laranja
        'rgba(255, 0, 255, 0.8)',   // Magenta
        'rgba(205, 92, 92, 0.8)'    // Vermelho claro
    ];
    return redShades[Math.floor(Math.random() * redShades.length)];
}

// Função para criar partículas existentes
function createParticles() {
    const numParticles = 50;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = getRandomRedColor(); // Cor vermelha aleatória
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = '50%';
        particle.style.top = '50%';

        container.appendChild(particle);

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Animação da partícula
        const animationDuration = 1550;
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            const xOffset = Math.cos(angle) * speed * progress * 100;
            const yOffset = Math.sin(angle) * speed * progress * 100;

            particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            particle.style.opacity = 1 - progress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animate);
    }
}

// Função para criar partículas de interação
function createInteractionParticles(event) {
    const numInteractionParticles = 20;
    const container = document.body;

    for (let i = 0; i < numInteractionParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px'; // Tamanho da nova partícula
        particle.style.height = '5px'; // Tamanho da nova partícula
        particle.style.backgroundColor = getRandomRedColor(); // Cor vermelha aleatória
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';

        // Posição inicial aleatória em torno do ponto clicado
        const x = event.clientX + (Math.random() - 0.5) * 100; // Variar em torno do ponto de clique
        const y = event.clientY + (Math.random() - 0.5) * 100;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Animação da partícula de interação
        const animationDuration = 1000; // Duração mais curta
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Movimento para fora do ponto de clique
            const xOffset = Math.cos(angle) * speed * progress * 80;
            const yOffset = Math.sin(angle) * speed * progress * 80;

            particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            particle.style.opacity = 1 - progress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animate);
    }
}

// Animação "glow" para os botões
const style = document.createElement("style");
style.textContent = `
@keyframes glow {
    0% { box-shadow: 0 0 5px #ff4d4d, 0 0 10px #ff4d4d, 0 0 15px #ff4d4d; }
    50% { box-shadow: 0 0 20px #ff3333, 0 0 30px #ff3333, 0 0 40px #ff3333; }
    100% { box-shadow: 0 0 5px #ff4d4d, 0 0 10px #ff4d4d, 0 0 15px #ff4d4d; }
}

.button-glow {
    animation: glow 2s ease-in-out infinite;
    background-color: #8B0000; /* Cor vermelho escuro */
    border: 2px solid #660000; /* Borda escura */
    color: #fff; /* Cor do texto branco */
}
`;
document.head.appendChild(style);