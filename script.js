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
        setTimeout(() => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
        }, index * 200); // Tempo aumentado entre cada botão
    });

    // Espera até que todas as animações terminem antes de criar partículas
    const totalDuration = (textContent.length * 70) + (buttons.length * 200); // Tempo total da animação
    setTimeout(() => {
        createParticles();
    }, totalDuration); // Inicia partículas após o total de animação
});

// Função para criar partículas
function createParticles() {
    const numParticles = 30; // Número de partículas a serem criadas
    const container = document.body; // Usar o corpo do documento como contêiner

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = 'rgba(128, 0, 128, 0.8)'; // Cor roxa
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none'; // Para não bloquear cliques
        particle.style.left = '50%'; // Posição inicial no centro
        particle.style.top = '50%'; // Posição inicial no centro

        container.appendChild(particle);

        // Angulo e velocidade aleatórios
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2; // Velocidade entre 2 e 5

        // Animação da partícula
        const animationDuration = 2000; // Duração da animação em ms
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Cálculo da nova posição
            const xOffset = Math.cos(angle) * speed * progress * 100; // Multiplicador para a distância
            const yOffset = Math.sin(angle) * speed * progress * 100;

            particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            particle.style.opacity = 1 - progress; // Fade out

            if (progress < 1) {
                requestAnimationFrame(animate); // Continuar animação
            } else {
                particle.remove(); // Remover partícula após animação
            }
        }

        requestAnimationFrame(animate); // Iniciar animação
    }
}
