import { preguntasCristianas } from './preguntas-cristianas.js';
import { preguntasGenerales } from './preguntas-generales.js';

let questions = [];
let currentIndex = 0;
let score = 0;
let questionTime = 30; // 30 segundos por pregunta
let currentQuestionTime = 30;

/**
 * Inicializa el quiz con preguntas según la categoría
 * @param {string} category - 'general' o 'cristiana'
 * @param {number} amount - número de preguntas a cargar (máximo disponible)
 */
export async function initQuiz(category = 'general', amount = 10) {
    currentIndex = 0;
    score = 0;
    currentQuestionTime = questionTime;

    if (category === 'cristiana') {
        questions = shuffle([...preguntasCristianas]);
        // Limitar a 10 preguntas para categoría cristiana también
        questions = questions.slice(0, Math.min(amount, 10));
    } else {
        // Usar preguntas generales locales
        const shuffledQuestions = shuffle([...preguntasGenerales]);
        // Limitar al número solicitado o al máximo disponible, pero máximo 10
        questions = shuffledQuestions.slice(0, Math.min(amount, 10));
    }
}

/**
 * Mezcla el array de preguntas
 */
function shuffle(array) {
    return array
        .map(q => ({ sort: Math.random(), value: q }))
        .sort((a, b) => a.sort - b.sort)
        .map(q => q.value);
}

/**
 * Devuelve la pregunta actual
 */
export function getCurrentQuestion() {
    return questions[currentIndex];
}

/**
 * Verifica si una opción es correcta
 * @param {string} selectedOption
 * @returns {boolean}
 */
export function checkAnswer(selectedOption) {
    const correct = selectedOption === questions[currentIndex].answer;
    if (correct) {
        score++;
    }
    return correct;
}

/**
 * Avanza a la siguiente pregunta
 */
export function nextQuestion() {
    currentIndex++;
    currentQuestionTime = questionTime; // Resetear tiempo para nueva pregunta
}

/**
 * Verifica si quedan preguntas por responder
 */
export function hasMoreQuestions() {
    return currentIndex < questions.length;
}

/**
 * Devuelve el puntaje actual
 */
export function getScore() {
    return score;
}

/**
 * Devuelve el número total de preguntas
 */
export function getQuestionsLength() {
    return questions.length;
}

/**
 * Devuelve el índice actual de la pregunta
 */
export function getCurrentIndex() {
    return currentIndex;
}

/**
 * Obtiene el tiempo restante de la pregunta actual
 */
export function getCurrentQuestionTime() {
    return currentQuestionTime;
}

/**
 * Decrementa el tiempo de la pregunta actual
 */
export function decrementQuestionTime() {
    if (currentQuestionTime > 0) {
        currentQuestionTime--;
    }
    return currentQuestionTime;
}

/**
 * Verifica si se acabó el tiempo de la pregunta actual
 */
export function isQuestionTimeUp() {
    return currentQuestionTime <= 0;
}

/**
 * Resetea el tiempo de la pregunta actual
 */
export function resetQuestionTime() {
    currentQuestionTime = questionTime;
}
