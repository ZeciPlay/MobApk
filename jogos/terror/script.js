document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = document.querySelector(".welcome-text");
    const textContent = welcomeText.textContent;
    welcomeText.textContent = "";

    // Dividir a frase em letras, preservando os espaço
    textContent.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        if (char === " ") span.style.marginRight = "5px"; // Preserva espaços visuais entre as palavras
        span.style.animationDelay = `${index * 0.1}s`; // Ajuste de tempo para efeito mais lento e sinistro
        welcomeText.appendChild(span);
    });

    // Animação dos botões
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        const direction = Math.floor(Math.random() * 4); // 0: cima, 1: baixo, 2: esquerda, 3: direita
        let startX = 0;
        let startY = 0;

        switch (direction) {
            case 0: startY = -100; break; // Cima
            case 1: startY = 100; break;  // Baixo
            case 2: startX = -100; break; // Esquerda
            case 3: startX = 100; break;  // Direita
        }

        button.style.opacity = "1"; // Torna o botão visível
        button.style.transform = `translate(${startX}px, ${startY}px)`; // Move para fora da tela

        setTimeout(() => {
            button.style.transform = `translate(0, 0)`; // Mover para a posição final
            button.style.transition = "transform 0.7s, opacity 0.7s"; // Suavizar a transição
            button.classList.add("button-glow"); // Adiciona classe de animação glow
        }, 200);
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 100) + (buttons.length * 200);
    setTimeout(() => {
        createParticles();
    }, totalDuration);

    // Adiciona um evento de clique para criar novas partículas
    document.addEventListener("click", createInteractionParticles);
});

// Função para gerar uma cor vermelha aleatória
function getRandomDarkColor() {
    const darkShades = [
        'rgba(139, 0, 0, 0.9)',   // Vermelho escuro
        'rgba(128, 0, 0, 0.9)',   // Marrom
        'rgba(105, 0, 0, 0.9)',   // Vinho
        'rgba(55, 0, 0, 0.9)',    // Vinho escuro
        'rgba(45, 0, 0, 0.9)',    // Marrom escuro
        'rgba(80, 0, 0, 0.9)'     // Vermelho profundo
    ];
    return darkShades[Math.floor(Math.random() * darkShades.length)];
}

// Função para criar partículas sombrias
function createParticles() {
    const numParticles = 30;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = getRandomDarkColor(); // Cor sombria
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = '50%';
        particle.style.top = '50%';

        container.appendChild(particle);

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Animação da partícula
        const animationDuration = 2000;
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

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

// Função para criar partículas de interação sombrias
function createInteractionParticles(event) {
    const numInteractionParticles = 15;
    const container = document.body;

    for (let i = 0; i < numInteractionParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px'; // Tamanho reduzido
        particle.style.height = '5px'; // Tamanho reduzido
        particle.style.backgroundColor = getRandomDarkColor(); // Cor sombria
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';

        // Posição inicial aleatória em torno do ponto clicado
        const x = event.clientX + (Math.random() - 0.5) * 80; // Variar em torno do ponto de clique
        const y = event.clientY + (Math.random() - 0.5) * 80;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Animação da partícula de interação
        const animationDuration = 1500;
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            const xOffset = Math.cos(angle) * speed * progress * 70;
            const yOffset = Math.sin(angle) * speed * progress * 70;

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
    0% { box-shadow: 0 0 5px #8B0000, 0 0 10px #8B0000, 0 0 15px #8B0000; }
    50% { box-shadow: 0 0 20px #660000, 0 0 30px #660000, 0 0 40px #660000; }
    100% { box-shadow: 0 0 5px #8B0000, 0 0 10px #8B0000, 0 0 15px #8B0000; }
}

.button-glow {
    animation: glow 2s ease-in-out infinite;
    background-color: #4B0000; /* Cor vermelho escuro */
    border: 2px solid #330000; /* Borda escura */
    color: #fff; /* Cor do texto branco */
}
`;
document.head.appendChild(style);
