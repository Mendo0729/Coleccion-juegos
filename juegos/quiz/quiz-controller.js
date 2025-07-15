import * as model from './quiz-model.js';
import * as view from './quiz-view.js';

let timerInterval = null;
let questionAnswered = false;
let selectedCategory = 'general';

function init() {
    console.log('Inicializando quiz...');
    
    // Vincular botones
    view.bindRestartHandler(handleRestart);
    view.bindNextButton();
    
    // Vincular selector de categoría
    view.bindCategoryHandler(category => {
        selectedCategory = category;
        console.log('Categoría seleccionada:', category);
        // Reiniciar el juego cuando se cambie la categoría
        restartQuiz();
    });
    
    // Vincular manejadores del juego
    view.bindAnswerHandler(handleAnswer);
    view.bindNextHandler(() => {
        if (!questionAnswered) return;
        goToNextQuestion();
    });
    
    // Iniciar el juego directamente
    startQuiz();
    
    console.log('Quiz inicializado correctamente');
}

function restartQuiz() {
    // Limpiar temporizador si existe
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Resetear estado
    questionAnswered = false;
    
    // Reiniciar con nueva categoría
    startQuiz();
}

function handleRestart() {
    console.log('Reiniciando juego...');
    restartQuiz();
}

async function startQuiz() {
    console.log('Iniciando quiz con categoría:', selectedCategory);
    await model.initQuiz(selectedCategory, 10);
    view.showGameScreen();
    renderNextQuestion();
}

function startQuestionTimer() {
    // Limpiar intervalo anterior si existe
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    questionAnswered = false;
    view.updateTimer(model.getCurrentQuestionTime());
    
    timerInterval = setInterval(() => {
        const remainingTime = model.decrementQuestionTime();
        view.updateTimer(remainingTime);
        
        if (model.isQuestionTimeUp() && !questionAnswered) {
            clearInterval(timerInterval);
            timerInterval = null;
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    questionAnswered = true;
    const currentQuestion = model.getCurrentQuestion();
    view.showTimeUpFeedback(currentQuestion.answer);
    
    // Pasar automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
        goToNextQuestion();
    }, 2000);
}

function goToNextQuestion() {
    model.nextQuestion();
    renderNextQuestion();
}

function renderNextQuestion() {
    if (model.hasMoreQuestions()) {
        const currentQuestion = model.getCurrentQuestion();
        view.renderQuestion(currentQuestion);
        view.updateCurrentScore(model.getScore());
        view.updateQuestionNumber(model.getCurrentIndex() + 1);
        startQuestionTimer();
    } else {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        view.showFinalScore(model.getScore(), model.getQuestionsLength());
    }
}

function handleAnswer(selected) {
    if (questionAnswered) return;
    
    questionAnswered = true;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    const current = model.getCurrentQuestion();
    const isCorrect = model.checkAnswer(selected);
    view.showAnswerFeedback(current.answer, selected);
    
    // Actualizar puntuación en tiempo real si la respuesta es correcta
    if (isCorrect) {
        view.updateCurrentScore(model.getScore());
    }
    
    // Pasar automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
        goToNextQuestion();
    }, 2000);
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando quiz...');
    init();
});
