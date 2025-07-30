/**
 * Limpia y renderiza las letras del abecedario como botones
 * @param {function} onLetraClick - función que se ejecuta al hacer clic en una letra
 */
export function renderizarLetras(onLetraClick) {
    const container = document.getElementById('letters-container');
    container.innerHTML = '';

    const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ,. '.split('');

    abecedario.forEach(letra => {
        const btn = document.createElement('button');
        btn.textContent = letra;
        btn.className = 'bg-peach text-white font-bold py-1 px-2 rounded hover:bg-peach/80 transition';
        btn.addEventListener('click', () => {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            onLetraClick(letra);
        });
        container.appendChild(btn);
    });
}

/**
 * Dibuja el muñequito del ahorcado según los intentos restantes
 * @param {number} intentosRestantes - número de intentos restantes (0-6)
 */
export function dibujarAhorcado(intentosRestantes) {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar estilo
    ctx.strokeStyle = '#6B4226'; // chocolate
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Dibujar base (siempre visible)
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(250, 250);
    ctx.stroke();
    
    // Dibujar poste vertical
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 50);
    ctx.stroke();
    
    // Dibujar poste horizontal
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();
    
    // Dibujar cuerda
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 80);
    ctx.stroke();
    
    // Dibujar partes del muñeco según intentos restantes
    const partesDibujadas = 6 - intentosRestantes;
    
    if (partesDibujadas >= 1) {
        // Cabeza
        ctx.beginPath();
        ctx.arc(200, 100, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    if (partesDibujadas >= 2) {
        // Cuerpo
        ctx.beginPath();
        ctx.moveTo(200, 120);
        ctx.lineTo(200, 180);
        ctx.stroke();
    }
    
    if (partesDibujadas >= 3) {
        // Brazo izquierdo
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(170, 160);
        ctx.stroke();
    }
    
    if (partesDibujadas >= 4) {
        // Brazo derecho
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(230, 160);
        ctx.stroke();
    }
    
    if (partesDibujadas >= 5) {
        // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(170, 220);
        ctx.stroke();
    }
    
    if (partesDibujadas >= 6) {
        // Pierna derecha
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(230, 220);
        ctx.stroke();
    }
    
    // Si el juego terminó, dibujar cara triste o feliz
    if (intentosRestantes === 0) {
        // Cara triste (derrota)
        ctx.strokeStyle = '#FF6F61'; // coral
        ctx.beginPath();
        ctx.arc(200, 95, 3, 0, 2 * Math.PI); // Ojo izquierdo
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(200, 105, 3, 0, 2 * Math.PI); // Ojo derecho
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(200, 110, 8, 0, Math.PI); // Boca triste
        ctx.stroke();
    } else if (intentosRestantes > 0 && intentosRestantes < 6) {
        // Cara neutral durante el juego
        ctx.strokeStyle = '#FF6F61'; // coral
        ctx.beginPath();
        ctx.arc(195, 95, 2, 0, 2 * Math.PI); // Ojo izquierdo
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(205, 95, 2, 0, 2 * Math.PI); // Ojo derecho
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(200, 105, 3, 0, Math.PI); // Boca neutral
        ctx.stroke();
    }
}

/**
 * Muestra la palabra oculta parcialmente revelada
 * @param {string} palabra - palabra con espacios entre letras o guiones
 */
export function mostrarPalabra(palabra) {
    document.getElementById('word-display').textContent = palabra;
}

/**
 * Muestra los intentos restantes
 * @param {number} intentos
 */
export function mostrarIntentos(intentos) {
    document.getElementById('attempts-left').textContent = intentos;
    // Actualizar dibujo del ahorcado
    dibujarAhorcado(intentos);
}

/**
 * Muestra un mensaje de victoria o derrota
 * @param {string} mensaje
 * @param {string} color - 'green' o 'red'
 */
export function mostrarMensajeFinal(mensaje, color = 'green') {
    const mensajeElem = document.getElementById('result-message');
    mensajeElem.textContent = mensaje;
    mensajeElem.className = `text-center text-xl font-bold text-${color}-600 my-4`;
    mensajeElem.classList.remove('hidden');
}

/**
 * Muestra el botón de reinicio
 */
export function mostrarBotonReiniciar() {
    document.getElementById('restart-btn').classList.remove('hidden');
}

/**
 * Oculta el mensaje final y botón de reinicio
 */
export function resetearVista() {
    document.getElementById('result-message').classList.add('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    // Dibujar ahorcado inicial
    dibujarAhorcado(6);
}
