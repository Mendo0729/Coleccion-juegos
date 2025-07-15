// memoria-controller.js

import * as model from './memoria-model.js';
import * as view from './memoria-view.js';

let isProcessing = false;
let timerInterval = null;
let gameStarted = false;

function init() {
    // Mostrar pantalla de inicio
    view.showStartScreen();
    
    // Vincular botón de inicio
    view.bindStartButton(handleStartGame);
    
    // Vincular botón de reinicio
    view.bindRestart(() => {
        resetGame();
        view.showStartScreen();
    });
}

function handleStartGame() {
    // Iniciar conteo regresivo
    startCountdown();
}

function startCountdown() {
    view.showCountdownScreen();
    
    let count = 3;
    view.updateCountdown(count);
    
    const countdownInterval = setInterval(() => {
        count--;
        view.updateCountdown(count);
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    const deck = model.initGame();
    
    view.showGameScreen();
    view.renderBoard(deck, handleCardClick);
    view.updateTimer(model.getGameTime());
    
    isProcessing = false;
    gameStarted = true;
    
    // Iniciar temporizador
    startTimer();
}

function resetGame() {
    // Limpiar temporizador
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Resetear estado
    isProcessing = false;
    gameStarted = false;
    
    // Limpiar mensajes de victoria/derrota
    const messages = document.querySelectorAll('.text-center.mt-8');
    messages.forEach(msg => msg.remove());
}

function startTimer() {
    // Limpiar intervalo anterior si existe
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        const remainingTime = model.decrementTime();
        view.updateTimer(remainingTime);
        
        if (model.isTimeUp()) {
            clearInterval(timerInterval);
            timerInterval = null;
            view.showLoseMessage();
            isProcessing = true; // Deshabilitar clics
        }
    }, 1000);
}

async function handleCardClick(cardId) {
    if (isProcessing || model.isCardRevealed(cardId) || model.isTimeUp() || !gameStarted) return;

    model.revealCard(cardId);
    const card = model.getCardById(cardId);
    view.revealCard(cardId, card.emoji);

    const revealed = model.getRevealedCards();

    if (revealed.length === 2) {
        isProcessing = true;

        if (model.isMatch()) {
            setTimeout(() => {
                model.markMatch();
                revealed.forEach(id => view.markMatched(id));
                endTurn();
            }, 500);
        } else {
            setTimeout(() => {
                revealed.forEach(id => view.hideCard(id));
                model.resetRevealed();
                endTurn();
            }, 1000);
        }
    }
}

function endTurn() {
    if (model.isGameComplete()) {
        clearInterval(timerInterval);
        timerInterval = null;
        view.showWinMessage();
        isProcessing = true; // Deshabilitar clics
    } else {
        isProcessing = false;
    }
}

// Inicializar al cargar
init();
