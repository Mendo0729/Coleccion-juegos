// memoria-model.js

const emojis = ['🍕', '🐶', '🌈', '🚗', '🎵', '⚽', '🐱', '🍓']; // 8 pares (16 cartas)

let deck = [];
let revealedCards = [];
let matchedCards = [];
let gameTime = 90; // 1 minuto y 30 segundos

export function initGame() {
    const doubled = [...emojis, ...emojis]; // duplicar los emojis
    deck = shuffle(doubled).map((emoji, index) => ({
        id: index,
        emoji,
        matched: false,
    }));
    revealedCards = [];
    matchedCards = [];
    gameTime = 90; // Resetear tiempo a 1:30
    return deck;
}

export function getCardById(id) {
    return deck.find((card) => card.id === id);
}

export function revealCard(cardId) {
    if (revealedCards.length < 2 && !revealedCards.includes(cardId)) {
        revealedCards.push(cardId);
    }
}

export function getRevealedCards() {
    return [...revealedCards];
}

export function isMatch() {
    if (revealedCards.length === 2) {
        const [first, second] = revealedCards.map(getCardById);
        return first.emoji === second.emoji;
    }
    return false;
}

export function markMatch() {
    matchedCards.push(...revealedCards);
    revealedCards = [];
}

export function resetRevealed() {
    revealedCards = [];
}

export function isCardRevealed(cardId) {
    return revealedCards.includes(cardId) || matchedCards.includes(cardId);
}

export function isGameComplete() {
    return matchedCards.length === deck.length;
}

export function getGameTime() {
    return gameTime;
}

export function decrementTime() {
    if (gameTime > 0) {
        gameTime--;
    }
    return gameTime;
}

export function isTimeUp() {
    return gameTime <= 0;
}

// Función utilitaria
function shuffle(array) {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}
