/*const palabras = [
    'JUEGO',
    'PROGRAMAR',
    'AHORCADO',
    'LENGUAJE',
    'VARIABLE',
    'FUNCION',
    'CODIGO',
    'ANIMACION',
    'MEMORIA',
    'ALGORITMO',
];*/
const palabras = [
  "Cielo, la pieza en el rompecabezas",
  "Mi querido Shim",
  "La fiesta de los trece",
  "El hombre de los zapatos de charol",
  "Solo imagina",
  "Presta atencion y entenderas",
  "Mama Grande",
  "Los zapatos viejos",
  "El inquilino",
  "Aire que contamina"
];

let palabraSecreta = '';
let letrasAdivinadas = new Set();
let intentosRestantes = 6;
let juegoTerminado = false;

export function iniciarJuego() {
    const aleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = aleatoria.toUpperCase();
    letrasAdivinadas = new Set();
    intentosRestantes = 6;
    juegoTerminado = false;
}

export function obtenerPalabraOculta() {
    return palabraSecreta
        .split('')
        .map(letra => (letrasAdivinadas.has(letra) ? letra : '_'))
        .join(' ');
}

export function obtenerIntentosRestantes() {
    return intentosRestantes;
}

export function esJuegoTerminado() {
    return juegoTerminado;
}

export function adivinarLetra(letra) {
    if (juegoTerminado || letrasAdivinadas.has(letra)) return;

    letrasAdivinadas.add(letra);

    if (!palabraSecreta.includes(letra)) {
        intentosRestantes--;
    }

    if (verificarVictoria() || intentosRestantes <= 0) {
        juegoTerminado = true;
    }
}

export function verificarVictoria() {
    return palabraSecreta.split('').every(letra => letrasAdivinadas.has(letra));
}

export function obtenerPalabraSecreta() {
    return palabraSecreta;
}
