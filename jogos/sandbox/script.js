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
            button.style.animation = "pulse 1s infinite"; // Efeito de "pulsar"
        }, 100);
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 70) + (buttons.length * 100);
    setTimeout(() => {
        createParticles();
    }, totalDuration);
});

// Função para criar partículas originais com cor marrom terra
function createParticles() {
    const numParticles = 50;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = 'rgba(139, 69, 19, 0.8)'; // Cor marrom terra
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

// Função para criar partículas que caem ao clicar
function createFallingParticles(x, y) {
    const numParticles = 20; // Número de partículas por clique
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = 'rgba(139, 69, 19, 0.9)'; // Cor marrom terra
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';

        // Posição inicial aleatória no topo da tela
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `${Math.random() * 10}px`; // Início próximo ao topo

        container.appendChild(particle);

        // Configuração da velocidade de queda
        const speed = Math.random() * 3 + 2; // Velocidade vertical

        // Animação da partícula
        const animationDuration = 2000; // Duração da animação
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            const yPos = speed * progress * 100;

            particle.style.transform = `translateY(${yPos}px)`;
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

// Adiciona um ouvinte de clique para criar partículas caindo
document.addEventListener("click", (event) => {
    createFallingParticles(event.clientX, event.clientY);
});

// Animação "pulse" para os botões em cor marrom
const style = document.createElement("style");
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); background-color: rgba(139, 69, 19, 0.9); } /* Marrom para efeito de ação */
    100% { transform: scale(1); background-color: transparent; }
}
`;
document.head.appendChild(style);