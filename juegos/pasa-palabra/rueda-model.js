import { preguntasGenerales } from './preguntas-generales.js';
import { preguntasCristianas } from './preguntas-cristianas.js';

// Estados del juego
let preguntas = [];
let indexActual = 0;
let correctas = 0;
let incorrectas = 0;
let tiempoRestante = 300; // 5 minutos en segundos
let temporizadorId = null;
let juegoTerminado = false;
let categoriaActual = 'general';

/**
 * Obtiene las preguntas según la categoría seleccionada
 * @param {string} categoria - 'general' o 'cristiana'
 */
function obtenerPreguntasPorCategoria(categoria) {
    switch (categoria) {
        case 'cristiana':
            return preguntasCristianas;
        case 'general':
        default:
            return preguntasGenerales;
    }
}

/**
 * Inicializa el juego mezclando las preguntas
 * @param {string} categoria - Categoría de preguntas a usar
 */
export function iniciarRueda(categoria = 'general') {
    categoriaActual = categoria;
    const preguntasBase = obtenerPreguntasPorCategoria(categoria);
    preguntas = preguntasBase.map(p => ({ ...p, estado: 'pendiente' })); // pendiente, correcta, incorrecta, pasada
    indexActual = 0;
    correctas = 0;
    incorrectas = 0;
    tiempoRestante = 300; // 5 minutos
    juegoTerminado = false;
}

/**
 * Cambia la categoría de preguntas
 * @param {string} nuevaCategoria - Nueva categoría a usar
 */
export function cambiarCategoria(nuevaCategoria) {
    iniciarRueda(nuevaCategoria);
}

/**
 * Obtiene la categoría actual
 */
export function obtenerCategoriaActual() {
    return categoriaActual;
}

/**
 * Devuelve la pregunta actual
 */
export function obtenerPreguntaActual() {
    return preguntas[indexActual];
}

/**
 * Marca una pregunta como correcta o incorrecta
 */
export function verificarRespuesta(respuestaUsuario) {
    if (juegoTerminado) return false;
    
    const actual = preguntas[indexActual];
    if (actual.estado !== 'pendiente') return false;

    const esCorrecta = respuestaUsuario.trim().toLowerCase() === actual.respuesta.toLowerCase();

    if (esCorrecta) {
        actual.estado = 'correcta';
        correctas++;
    } else {
        actual.estado = 'incorrecta';
        incorrectas++;
    }

    return esCorrecta;
}

/**
 * Pasa la pregunta actual (la mueve al final)
 */
export function pasarPregunta() {
    if (juegoTerminado) return;
    
    const actual = preguntas[indexActual];
    if (actual.estado === 'pendiente') {
        actual.estado = 'pasada';
    }
    
    // No mover la pregunta al final, solo cambiar su estado
    // Esto evita problemas con el índice
}

/**
 * Avanza a la siguiente pregunta pendiente
 */
export function avanzarPregunta() {
    if (preguntas.length === 0 || juegoTerminado) return;

    // Buscar la siguiente pregunta pendiente
    let intentos = 0;
    const maxIntentos = preguntas.length;
    
    do {
        indexActual = (indexActual + 1) % preguntas.length;
        intentos++;
        
        // Evitar bucle infinito
        if (intentos >= maxIntentos) {
            break;
        }
    } while (preguntas[indexActual].estado !== 'pendiente' && quedanPendientes());
}

/**
 * Verifica si aún quedan preguntas sin responder
 */
export function quedanPendientes() {
    return preguntas.some(p => p.estado === 'pendiente');
}

/**
 * Obtiene el estado de una letra específica
 * @param {string} letra - La letra a consultar
 * @returns {string} - 'pendiente', 'correcta', 'incorrecta', 'pasada'
 */
export function obtenerEstadoLetra(letra) {
    const pregunta = preguntas.find(p => p.letra === letra);
    return pregunta ? pregunta.estado : 'pendiente';
}

/**
 * Obtiene todas las preguntas con sus estados
 */
export function obtenerTodasLasPreguntas() {
    return preguntas;
}

/**
 * Obtiene el tiempo restante en segundos
 */
export function obtenerTiempoRestante() {
    return tiempoRestante;
}

/**
 * Actualiza el tiempo restante
 */
export function actualizarTiempoRestante(nuevoTiempo) {
    tiempoRestante = nuevoTiempo;
}

/**
 * Marca el juego como terminado
 */
export function terminarJuego() {
    juegoTerminado = true;
    if (temporizadorId) {
        clearInterval(temporizadorId);
        temporizadorId = null;
    }
}

/**
 * Verifica si el juego ha terminado
 */
export function estaJuegoTerminado() {
    return juegoTerminado;
}

/**
 * Inicia el temporizador
 */
export function iniciarTemporizador() {
    temporizadorId = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            terminarJuego();
        }
    }, 1000);
}

/**
 * Detiene el temporizador
 */
export function detenerTemporizador() {
    if (temporizadorId) {
        clearInterval(temporizadorId);
        temporizadorId = null;
    }
}

export function obtenerCorrectas() {
    return correctas;
}

export function obtenerIncorrectas() {
    return incorrectas;
}
