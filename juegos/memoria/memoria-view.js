// memoria-view.js

const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const timerElement = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');
const countdownScreen = document.getElementById('countdown-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const countdownNumber = document.getElementById('countdown-number');

export function showStartScreen() {
    startScreen.classList.remove('hidden');
    countdownScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
}

export function showCountdownScreen() {
    startScreen.classList.add('hidden');
    countdownScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

export function showGameScreen() {
    startScreen.classList.add('hidden');
    countdownScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

export function updateCountdown(number) {
    countdownNumber.textContent = number;
}

export function bindStartButton(handler) {
    startBtn.addEventListener('click', handler);
}

export function renderBoard(deck, onCardClick) {
    board.innerHTML = ''; // Limpiar tablero
    deck.forEach((card) => {
        const cardEl = document.createElement('div');
        cardEl.className =
            'card bg-pinksoft text-2xl font-bold cursor-pointer flex justify-center items-center ' +
            'rounded-lg h-20 sm:h-24 md:h-28 border-2 border-coral shadow hover:scale-105 transition-transform';
        cardEl.dataset.id = card.id;
        cardEl.textContent = ''; // Comienza oculta

        // Escuchador de clic
        cardEl.addEventListener('click', () => onCardClick(card.id));

        board.appendChild(cardEl);
    });
}

export function revealCard(cardId, emoji) {
    const cardEl = getCardElement(cardId);
    if (cardEl) {
        cardEl.textContent = emoji;
        cardEl.classList.add('bg-honey');
    }
}

export function hideCard(cardId) {
    const cardEl = getCardElement(cardId);
    if (cardEl) {
        cardEl.textContent = '';
        cardEl.classList.remove('bg-honey');
    }
}

export function markMatched(cardId) {
    const cardEl = getCardElement(cardId);
    if (cardEl) {
        cardEl.classList.remove('bg-honey');
        cardEl.classList.add('bg-coral', 'text-white');
        cardEl.classList.add('pointer-events-none'); // 👈 evita clics en cartas ya emparejadas
    }
}

export function updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    // Cambiar color cuando queden menos de 30 segundos
    if (seconds <= 30) {
        timerElement.parentElement.classList.add('bg-red-500');
        timerElement.parentElement.classList.remove('bg-coral');
    } else {
        timerElement.parentElement.classList.remove('bg-red-500');
        timerElement.parentElement.classList.add('bg-coral');
    }
}

export function showWinMessage() {
    const msg = document.createElement('div');
    msg.className = 'text-center mt-8 text-2xl font-bold text-chocolate';
    msg.textContent = '🎉 ¡Ganaste! Todas las parejas fueron encontradas.';
    board.after(msg);
}

export function showLoseMessage() {
    const msg = document.createElement('div');
    msg.className = 'text-center mt-8 text-2xl font-bold text-red-600';
    msg.textContent = '⏰ ¡Se acabó el tiempo! No pudiste encontrar todas las parejas.';
    board.after(msg);
}

export function bindRestart(handler) {
    restartBtn.addEventListener('click', handler);
}

// Utilidad privada
function getCardElement(cardId) {
    return board.querySelector(`[data-id="${cardId}"]`);
}
