import {
    iniciarJuego,
    obtenerPalabraOculta,
    obtenerIntentosRestantes,
    adivinarLetra,
    verificarVictoria,
    esJuegoTerminado,
    obtenerPalabraSecreta,
} from './ahorcado-model.js';

import {
    renderizarLetras,
    mostrarPalabra,
    mostrarIntentos,
    mostrarMensajeFinal,
    mostrarBotonReiniciar,
    resetearVista,
} from './ahorcado-view.js';

function iniciar() {
    iniciarJuego();
    resetearVista();
    mostrarPalabra(obtenerPalabraOculta());
    mostrarIntentos(obtenerIntentosRestantes());

    renderizarLetras(letra => {
        adivinarLetra(letra);
        mostrarPalabra(obtenerPalabraOculta());
        mostrarIntentos(obtenerIntentosRestantes());

        if (verificarVictoria()) {
            mostrarMensajeFinal('¡Felicidades! Adivinaste la palabra 🎉', 'green');
            mostrarBotonReiniciar();
        } else if (obtenerIntentosRestantes() <= 0) {
            const palabra = obtenerPalabraSecreta();
            mostrarMensajeFinal(`Perdiste 😢 La palabra era: ${palabra}`, 'red');
            mostrarBotonReiniciar();
        }
    });
}

// Evento para reiniciar el juego
document.getElementById('restart-btn').addEventListener('click', () => {
    iniciar();
});

// Iniciar automáticamente al cargar
iniciar();
