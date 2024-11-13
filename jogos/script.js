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
    buttons.forEach((button, index) => {
        button.style.opacity = "1"; // Torna o botão visível
        button.style.animationDelay = `${index * 0.2}s`; // Atraso para animação de cada botão

        button.classList.add("unique-animation"); // Adiciona classe de animação única
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 70) + (buttons.length * 100);
    setTimeout(() => {
        createParticles();
    }, totalDuration);

    // Adiciona um evento de clique para criar novas partículas
    document.addEventListener("click", createSpecialParticles);
});

// Função para criar partículas
function createParticles() {
    const numParticles = 50;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;

        // Posição aleatória
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;

        // Definir as variáveis CSS para o movimento das partículas
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);

        container.appendChild(particle);

        // Remover a partícula após a animação
        setTimeout(() => particle.remove(), 1500);
    }
}

// Função para criar partículas especiais ao clicar
function createSpecialParticles(event) {
    const numInteractionParticles = 30;
    const container = document.body;

    for (let i = 0; i < numInteractionParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Calculando o vetor de direção a partir do clique
        const angle = Math.random() * 2 * Math.PI; // direção aleatória para dispersão
        const speed = Math.random() * 3 + 2; // velocidade aleatória para dispersão

        // Movimento em direção ao clique (com variação aleatória ao redor do clique)
        const dx = (event.clientX + (Math.random() - 0.5) * 50) - event.clientX;
        const dy = (event.clientY + (Math.random() - 0.5) * 50) - event.clientY;

        // Definir as variáveis CSS para o movimento das partículas
        particle.style.setProperty('--x', `${dx}px`);
        particle.style.setProperty('--y', `${dy}px`);

        // Definir o início da posição da partícula
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;

        container.appendChild(particle);

        // Remover a partícula após a animação
        setTimeout(() => particle.remove(), 1500);
    }
}