// Referencias al DOM
const palabraContenedor = document.getElementById('palabra-contenedor');
const temporizadorElemento = document.getElementById('temporizador');
const btnEmpezar = document.getElementById('btn-empezar');
const btnOpciones = document.getElementById('btn-opciones');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');
const btnReiniciar = document.getElementById('btn-reiniciar');
const selectCategoria = document.getElementById('categoria');
const progresoElemento = document.getElementById('progreso');
const puntuacionElemento = document.getElementById('puntuacion');

// Mostrar la palabra en pantalla
export function mostrarPalabra(palabra) {
    palabraContenedor.textContent = palabra;
}

// Mostrar mensaje cuando no hay más palabras
export function mostrarFinDelJuego(puntuacion = 0, total = 0) {
    if (total > 0) {
        palabraContenedor.textContent = `🎉 ¡Juego completado!\n\nPuntuación: ${puntuacion} de ${total} palabras correctas`;
    } else {
        palabraContenedor.textContent = '🎉 ¡Has completado todas las palabras!';
    }
    ocultarElemento(btnOpciones);
    mostrarElemento(btnReiniciar);
}

// Actualizar progreso del juego
export function actualizarProgreso(actual, maximo) {
    if (progresoElemento) {
        progresoElemento.textContent = `Pregunta ${actual} de ${maximo}`;
    }
}

// Actualizar puntuación en tiempo real
export function actualizarPuntuacion(correctas, total) {
    if (puntuacionElemento) {
        puntuacionElemento.textContent = `Puntuación: ${correctas}/${total}`;
    }
}

// Temporizador visual (en segundos)
export function actualizarTemporizador(segundos) {
    temporizadorElemento.textContent = `⏱️ ${segundos}s`;
}

export function limpiarTemporizador() {
    temporizadorElemento.textContent = '';
}

// Utilidades de botones
export function mostrarElemento(elem) {
    elem.classList.remove('hidden');
}

export function ocultarElemento(elem) {
    elem.classList.add('hidden');
}

// Mostrar botones de opciones (Correcto/Incorrecto)
export function mostrarOpciones() {
    ocultarElemento(btnEmpezar);
    mostrarElemento(btnOpciones);
}

// Reset visual
export function resetVista() {
    palabraContenedor.textContent = '';
    limpiarTemporizador();
    ocultarElemento(btnOpciones);
    ocultarElemento(btnReiniciar);
    mostrarElemento(btnEmpezar);
    
    // Limpiar progreso y puntuación
    if (progresoElemento) progresoElemento.textContent = '';
    if (puntuacionElemento) puntuacionElemento.textContent = '';
}

// Accesos para el controller
export const botones = {
    btnEmpezar,
    btnCorrecto,
    btnIncorrecto,
    btnReiniciar
};

export function obtenerCategoriaSeleccionada() {
    return selectCategoria.value;
}
