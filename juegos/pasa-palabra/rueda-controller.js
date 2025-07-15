import {
    iniciarRueda,
    obtenerPreguntaActual,
    verificarRespuesta,
    pasarPregunta,
    avanzarPregunta,
    quedanPendientes,
    obtenerCorrectas,
    obtenerIncorrectas,
    obtenerTiempoRestante,
    terminarJuego,
    estaJuegoTerminado,
    iniciarTemporizador,
    detenerTemporizador,
    obtenerEstadoLetra,
    obtenerTodasLasPreguntas,
    cambiarCategoria,
    obtenerCategoriaActual
} from './rueda-model.js';

import {
    mostrarPregunta,
    obtenerRespuestaUsuario,
    actualizarMarcadores,
    mostrarFinDelJuego,
    mostrarFinDelJuegoPorTiempo,
    actualizarTemporizador,
    crearRuedaAlfabetica,
    actualizarLetraEnRueda,
    obtenerCategoriaSeleccionada,
    configurarCambioCategoria,
    configurarSeleccionCategoria,
    mostrarPantallaJuego,
    mostrarPantallaSeleccion
} from './rueda-view.js';

// Elementos del DOM
const btnResponder = document.getElementById('btn-responder');
const btnPasar = document.getElementById('btn-pasar');

// Variables del temporizador
let temporizadorVisualId = null;
let juegoIniciado = false;

// Función para actualizar toda la rueda alfabética
function actualizarRuedaCompleta() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    letras.forEach(letra => {
        const estado = obtenerEstadoLetra(letra);
        actualizarLetraEnRueda(letra, estado);
    });
}

// Función para iniciar el juego con la categoría seleccionada
function iniciarJuegoConCategoria() {
    const categoria = obtenerCategoriaSeleccionada();
    
    if (!categoria) {
        alert('Por favor selecciona una categoría primero');
        return;
    }
    
    // Iniciar el juego con la categoría seleccionada
    iniciarRueda(categoria);
    
    // Configurar la interfaz del juego
    crearRuedaAlfabetica();
    mostrarPregunta(obtenerPreguntaActual());
    actualizarMarcadores(0, 0);
    
    // Mostrar pantalla del juego
    mostrarPantallaJuego();
    
    // Iniciar temporizadores
    iniciarTemporizador();
    temporizadorVisualId = setInterval(() => {
        const tiempoRestante = obtenerTiempoRestante();
        actualizarTemporizador(tiempoRestante);
        
        // Verificar si el juego terminó por tiempo
        if (estaJuegoTerminado() && tiempoRestante <= 0) {
            clearInterval(temporizadorVisualId);
            mostrarFinDelJuegoPorTiempo();
            actualizarMarcadores(obtenerCorrectas(), obtenerIncorrectas());
            actualizarRuedaCompleta();
        }
    }, 1000);
    
    juegoIniciado = true;
}

// Función para reiniciar el juego con nueva categoría
function reiniciarJuegoConNuevaCategoria() {
    // Detener temporizadores
    if (temporizadorVisualId) {
        clearInterval(temporizadorVisualId);
    }
    detenerTemporizador();
    
    // Obtener nueva categoría y reiniciar
    const nuevaCategoria = obtenerCategoriaSeleccionada();
    cambiarCategoria(nuevaCategoria);
    
    // Reiniciar interfaz
    crearRuedaAlfabetica();
    mostrarPregunta(obtenerPreguntaActual());
    actualizarMarcadores(0, 0);
    
    // Reiniciar temporizadores
    iniciarTemporizador();
    temporizadorVisualId = setInterval(() => {
        const tiempoRestante = obtenerTiempoRestante();
        actualizarTemporizador(tiempoRestante);
        
        // Verificar si el juego terminó por tiempo
        if (estaJuegoTerminado() && tiempoRestante <= 0) {
            clearInterval(temporizadorVisualId);
            mostrarFinDelJuegoPorTiempo();
            actualizarMarcadores(obtenerCorrectas(), obtenerIncorrectas());
            actualizarRuedaCompleta();
        }
    }, 1000);
}

// Función para volver a la pantalla de selección
function volverASeleccion() {
    // Detener temporizadores
    if (temporizadorVisualId) {
        clearInterval(temporizadorVisualId);
    }
    detenerTemporizador();
    
    // Mostrar pantalla de selección
    mostrarPantallaSeleccion();
    
    juegoIniciado = false;
}

// Configurar eventos de selección de categoría
configurarSeleccionCategoria(
    (categoria) => {
        // Callback cuando se selecciona una categoría
        console.log('Categoría seleccionada:', categoria);
    },
    iniciarJuegoConCategoria, // Callback cuando se inicia el juego
    volverASeleccion // Callback cuando se quiere volver a selección
);

// Configurar cambio de categoría (solo cuando el juego ya está iniciado)
configurarCambioCategoria(reiniciarJuegoConNuevaCategoria);

// Evento: Responder
btnResponder.addEventListener('click', () => {
    if (estaJuegoTerminado() || !juegoIniciado) return;
    
    const respuesta = obtenerRespuestaUsuario();
    const preguntaActual = obtenerPreguntaActual();
    const esCorrecta = verificarRespuesta(respuesta);
    
    // Actualizar la letra en la rueda según el resultado
    const estado = esCorrecta ? 'correcta' : 'incorrecta';
    actualizarLetraEnRueda(preguntaActual.letra, estado);

    if (!quedanPendientes()) {
        terminarJuego();
        clearInterval(temporizadorVisualId);
        mostrarFinDelJuego();
        actualizarMarcadores(obtenerCorrectas(), obtenerIncorrectas());
        return;
    }

    avanzarPregunta();
    mostrarPregunta(obtenerPreguntaActual());
    actualizarMarcadores(obtenerCorrectas(), obtenerIncorrectas());
});

// Evento: Pasar
btnPasar.addEventListener('click', () => {
    if (estaJuegoTerminado() || !juegoIniciado) return;
    
    const preguntaActual = obtenerPreguntaActual();
    pasarPregunta();
    
    // Actualizar la letra en la rueda como pasada
    actualizarLetraEnRueda(preguntaActual.letra, 'pasada');
    
    // Avanzar a la siguiente pregunta
    avanzarPregunta();

    if (!quedanPendientes()) {
        terminarJuego();
        clearInterval(temporizadorVisualId);
        mostrarFinDelJuego();
        actualizarMarcadores(obtenerCorrectas(), obtenerIncorrectas());
        return;
    }

    // Mostrar la nueva pregunta
    const nuevaPregunta = obtenerPreguntaActual();
    mostrarPregunta(nuevaPregunta);
});

// Evento: Enter en el input para responder
document.getElementById('respuesta-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !estaJuegoTerminado() && juegoIniciado) {
        btnResponder.click();
    }
});
