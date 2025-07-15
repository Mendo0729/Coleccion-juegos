import {
    iniciarCharadas,
    obtenerSiguientePalabra,
    quedanPalabras,
    obtenerPreguntaActual,
    obtenerMaxPreguntas
} from './charadas-model.js';

import {
    mostrarPalabra,
    mostrarFinDelJuego,
    actualizarTemporizador,
    limpiarTemporizador,
    mostrarElemento,
    ocultarElemento,
    resetVista,
    mostrarOpciones,
    botones,
    obtenerCategoriaSeleccionada,
    actualizarProgreso,
    actualizarPuntuacion
} from './charadas-view.js';

let tiempoPorPalabra = 30; // segundos
let temporizadorId = null;
let puntuacion = 0;
let totalPalabras = 0;

/**
 * Inicia el juego desde cero
 */
function manejarInicio() {
    const categoria = obtenerCategoriaSeleccionada();
    iniciarCharadas(categoria);
    resetVista();
    puntuacion = 0;
    totalPalabras = 0;
    mostrarSiguientePalabra();
}

/**
 * Muestra la siguiente palabra y arranca el temporizador
 */
function mostrarSiguientePalabra() {
    limpiarTemporizador();

    const palabra = obtenerSiguientePalabra();
    if (palabra) {
        mostrarPalabra(palabra);
        iniciarTemporizador(tiempoPorPalabra);
        mostrarOpciones();
        totalPalabras++;
        
        // Actualizar progreso y puntuación (después de obtener la palabra)
        actualizarProgreso(obtenerPreguntaActual(), obtenerMaxPreguntas());
        actualizarPuntuacion(puntuacion, totalPalabras);
    } else {
        mostrarFinDelJuego(puntuacion, totalPalabras);
    }
}

/**
 * Maneja cuando se marca como correcto
 */
function manejarCorrecto() {
    clearInterval(temporizadorId);
    puntuacion++;
    actualizarPuntuacion(puntuacion, totalPalabras);
    mostrarSiguientePalabra();
}

/**
 * Maneja cuando se marca como incorrecto
 */
function manejarIncorrecto() {
    clearInterval(temporizadorId);
    mostrarSiguientePalabra();
}

/**
 * Inicia y actualiza el temporizador visual
 */
function iniciarTemporizador(segundos) {
    let tiempoRestante = segundos;
    actualizarTemporizador(tiempoRestante);

    temporizadorId = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorId);
            actualizarTemporizador(0);
            // Si se acaba el tiempo, contar como incorrecto
            manejarIncorrecto();
        } else {
            actualizarTemporizador(tiempoRestante);
        }
    }, 1000);
}

/**
 * Reinicia el juego completamente
 */
function manejarReinicio() {
    resetVista();
    mostrarElemento(botones.btnEmpezar);
    limpiarTemporizador();
    clearInterval(temporizadorId);
    puntuacion = 0;
    totalPalabras = 0;
}

// Listeners
botones.btnEmpezar.addEventListener('click', manejarInicio);
botones.btnCorrecto.addEventListener('click', manejarCorrecto);
botones.btnIncorrecto.addEventListener('click', manejarIncorrecto);
botones.btnReiniciar.addEventListener('click', manejarReinicio);
