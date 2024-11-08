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
        button.style.opacity = "1"; // Torna o botão visível
        button.style.transform = `scale(0.9) rotate(-10deg)`; // Posição inicial do botão

        setTimeout(() => {
            button.style.transform = `scale(1) rotate(0deg)`; // Mover para a posição final
            button.style.transition = "transform 0.8s ease, opacity 0.5s"; // Suavizar a transição
            button.classList.add("unique-animation"); // Adiciona classe de animação única
        }, 100);
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 70) + (buttons.length * 100);
    setTimeout(() => {
        createParticles();
    }, totalDuration);

    // Adiciona um evento de clique para criar novas partículas
    document.addEventListener("click", createSpecialParticles);
});

// Função para gerar uma cor verde aleatória
function getRandomGreenColor() {
    const greenShades = [
        'rgba(0, 128, 0, 0.8)',   // Verde puro
        'rgba(34, 139, 34, 0.8)', // Verde floresta
        'rgba(50, 205, 50, 0.8)', // Verde lima
        'rgba(144, 238, 144, 0.8)', // Verde claro
        'rgba(60, 179, 113, 0.8)',  // Verde mar
        'rgba(0, 255, 127, 0.8)'    // Verde primavera
    ];
    return greenShades[Math.floor(Math.random() * greenShades.length)];
}

// Função para criar partículas
function createParticles() {
    const numParticles = 50;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = getRandomGreenColor(); // Cor verde aleatória
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

// Função para criar partículas especiais ao clicar
function createSpecialParticles(event) {
    const numInteractionParticles = 30;
    const container = document.body;

    for (let i = 0; i < numInteractionParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px'; // Tamanho da nova partícula
        particle.style.height = '5px'; // Tamanho da nova partícula
        particle.style.backgroundColor = getRandomGreenColor(); // Cor verde aleatória
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';

        // Posição inicial ao redor do ponto de clique
        const x = event.clientX + (Math.random() - 0.5) * 80; // Variação em torno do ponto de clique
        const y = event.clientY + (Math.random() - 0.5) * 80;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        // Ângulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Animação especial para a partícula de interação
        const animationDuration = 1200; // Duração mais longa
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Movimento para fora do ponto de clique em espiral
            const xOffset = Math.cos(angle + progress * Math.PI) * speed * progress * 70;
            const yOffset = Math.sin(angle + progress * Math.PI) * speed * progress * 70;

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

// Animação única para os botões
const style = document.createElement("style");
style.textContent = `
@keyframes uniqueAnimation {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(5deg); } /* Gira levemente */
    100% { transform: scale(1) rotate(0deg); }
}

.unique-animation {
    animation: uniqueAnimation 0.8s ease-in-out forwards; /* Repetição única */
    background-color: #006400; /* Cor verde escuro */
    border: 2px solid #003300; /* Borda escura */
}
`;
document.head.appendChild(style);