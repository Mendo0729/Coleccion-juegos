let onAnswerSelected = null;
let onNext = null;
let onTimeUp = null;
let onRestart = null;

// Función para obtener elementos del DOM de forma segura
function getElement(id) {
    return document.getElementById(id);
}

export function bindAnswerHandler(callback) {
    onAnswerSelected = callback;
}

export function bindNextHandler(callback) {
    onNext = callback;
}

export function bindTimeUpHandler(callback) {
    onTimeUp = callback;
}

export function bindRestartHandler(callback) {
    onRestart = callback;
}

export function bindCategoryHandler(callback) {
    const categorySelect = getElement("category-select");
    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
            callback(categorySelect.value);
        });
    }
}

export function showGameScreen() {
    // No necesitamos cambiar pantallas, el juego ya está visible
}

export function bindRestartButton() {
    const restartBtn = getElement("restart-btn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            if (onRestart) onRestart();
        });
    }
}

export function updateCurrentScore(score) {
    const currentScoreElement = getElement("current-score");
    if (currentScoreElement) currentScoreElement.textContent = score;
}

export function updateQuestionNumber(questionNumber) {
    const questionNumberElement = getElement("question-number");
    if (questionNumberElement) questionNumberElement.textContent = questionNumber;
}

export function updateTimer(seconds) {
    const timerElement = getElement("timer");
    if (timerElement) {
        timerElement.textContent = seconds;
        
        // Cambiar color cuando queden menos de 10 segundos
        if (seconds <= 10) {
            timerElement.parentElement.classList.add('bg-red-500');
            timerElement.parentElement.classList.remove('bg-coral');
        } else {
            timerElement.parentElement.classList.remove('bg-red-500');
            timerElement.parentElement.classList.add('bg-coral');
        }
    }
}

export function renderQuestion(questionObj) {
    const questionContainer = getElement("question-container");
    const questionText = getElement("question-text");
    const optionsList = getElement("options-list");
    const nextButton = getElement("next-button");
    const scoreContainer = getElement("score-container");
    
    if (!questionContainer || !questionText || !optionsList || !nextButton || !scoreContainer) {
        console.error('Elementos del DOM no encontrados');
        return;
    }
    
    // Mostrar contenedores
    questionContainer.classList.remove("hidden");
    scoreContainer.classList.add("hidden");
    
    // Mostrar y deshabilitar el botón siguiente
    nextButton.style.display = "inline-block";
    nextButton.disabled = true;

    // Insertar pregunta
    questionText.textContent = questionObj.question;

    // Limpiar opciones anteriores
    optionsList.innerHTML = "";

    questionObj.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className =
            "w-full text-left bg-white border-2 border-chocolate/20 rounded-lg p-3 mb-2 hover:bg-honey/30 transition-all";
        btn.textContent = option;

        btn.addEventListener("click", () => {
            if (!btn.classList.contains("pointer-events-none")) {
                onAnswerSelected(option);
            }
        });

        optionsList.appendChild(btn);
    });
}

export function showAnswerFeedback(correctOption, selectedOption) {
    const optionsList = getElement("options-list");
    const nextButton = getElement("next-button");
    
    if (!optionsList || !nextButton) return;
    
    const buttons = optionsList.querySelectorAll("button");

    buttons.forEach(btn => {
        const option = btn.textContent;

        btn.classList.add("pointer-events-none");

        if (option === correctOption) {
            btn.classList.add("bg-green-200", "border-green-500");
        }

        if (option === selectedOption && option !== correctOption) {
            btn.classList.add("bg-red-200", "border-red-500");
        }
    });

    // Ocultar el botón siguiente ya que la navegación es automática
    nextButton.style.display = "none";
}

export function showTimeUpFeedback(correctOption) {
    const optionsList = getElement("options-list");
    const nextButton = getElement("next-button");
    
    if (!optionsList || !nextButton) return;
    
    const buttons = optionsList.querySelectorAll("button");

    buttons.forEach(btn => {
        const option = btn.textContent;
        btn.classList.add("pointer-events-none");

        if (option === correctOption) {
            btn.classList.add("bg-green-200", "border-green-500");
        }
    });

    // Ocultar el botón siguiente ya que la navegación es automática
    nextButton.style.display = "none";
}

export function bindNextButton() {
    const nextButton = getElement("next-button");
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (onNext) onNext();
        });
    }
}

export function showFinalScore(score, total) {
    const questionContainer = getElement("question-container");
    const scoreContainer = getElement("score-container");
    const scoreText = getElement("score-text");
    
    if (!questionContainer || !scoreContainer || !scoreText) return;
    
    questionContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreText.textContent = `Tu puntuación: ${score} / ${total}`;
}
