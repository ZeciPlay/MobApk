document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = document.querySelector(".welcome-text");
    const textContent = welcomeText.textContent;
    welcomeText.textContent = "";

    textContent.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        if (char === " ") span.style.marginRight = "5px";
        span.style.animationDelay = `${index * 0.07}s`;
        welcomeText.appendChild(span);
    });

    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        const direction = Math.floor(Math.random() * 4);
        let startX = 0;
        let startY = 0;

        switch (direction) {
            case 0: startY = -100; break; // Cima
            case 1: startY = 100; break;  // Baixo
            case 2: startX = -100; break; // Esquerda
            case 3: startX = 100; break;  // Direita
        }

        button.style.opacity = "1";
        button.style.transform = `translate(${startX}px, ${startY}px)`;

        setTimeout(() => {
            button.style.transform = "translate(0, 0)"; // Mover para a posição final
        }, 100);
    });

    const totalDuration = (textContent.length * 70) + (buttons.length * 200) + 100;
    setTimeout(() => {
        createParticles();
    }, totalDuration);

    // Evento para criar partículas ao clicar/tocar na tela
    document.addEventListener("click", (event) => {
        createClickParticles(event.clientX, event.clientY);
    });
});

function createParticles() {
    const numParticles = 50;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = 'rgba(255, 105, 180, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = '50%';
        particle.style.top = '50%';

        container.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 2;
        const animationDuration = 2000;
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

function createClickParticles(x, y) {
    const numParticles = 30;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // Rosa claro mais suave
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        container.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 2 + 1;
        const animationDuration = 1500;
        const startTime = performance.now();

        function animate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            const xOffset = Math.cos(angle) * speed * progress * 50;
            const yOffset = Math.sin(angle) * speed * progress * 50;

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