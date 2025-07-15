// Palabras por categoría
const palabrasPorCategoria = {
    general: [
        'Pelota', 'Bicicleta', 'Escuela', 'Computadora', 'Avión',
        'Dentista', 'Libro', 'Teléfono', 'Cine', 'Maestro',
    ],
    animales: [
        'Perro', 'Gato', 'Elefante', 'Jirafa', 'Tiburón',
        'Pingüino', 'Zorro', 'Delfín', 'Cangrejo', 'Caballo',
    ],
    oficios: [
        'Doctor', 'Bombero', 'Maestro', 'Panadero', 'Ingeniero',
        'Mecánico', 'Chef', 'Policía', 'Arquitecto', 'Electricista',
    ],
    objetos: [
        'Silla', 'Lámpara', 'Cepillo', 'Taza', 'Cuchara',
        'Reloj', 'Cama', 'Cámara', 'Llave', 'Mochila',
    ],
    cristiana: [
        'Biblia', 'Iglesia', 'Pastor', 'Oración', 'Bautismo',
        'Comunión', 'Cruz', 'Altar', 'Coro', 'Púlpito',
        'Cáliz', 'Vela', 'Incienso', 'Confesión', 'Misa',
        'Evangelio', 'Apóstol', 'Discípulo', 'Milagro', 'Fe'
    ]
};

const MAX_PREGUNTAS = 10;

let palabrasDisponibles = [];
let categoriaActual = 'general';
let preguntaActual = 0;

/**
 * Inicializa el set de palabras de una categoría
 * @param {string} categoria
 */
export function iniciarCharadas(categoria = 'general') {
    categoriaActual = categoria;
    palabrasDisponibles = [...palabrasPorCategoria[categoria]];
    mezclarArray(palabrasDisponibles);
    preguntaActual = 0;
}

/**
 * Devuelve una palabra aleatoria y la elimina del array
 * @returns {string|null}
 */
export function obtenerSiguientePalabra() {
    if (palabrasDisponibles.length === 0 || preguntaActual >= MAX_PREGUNTAS) return null;
    const palabra = palabrasDisponibles.shift();
    preguntaActual++;
    return palabra;
}

/**
 * Indica si aún quedan palabras y no se ha alcanzado el límite
 */
export function quedanPalabras() {
    return palabrasDisponibles.length > 0 && preguntaActual < MAX_PREGUNTAS;
}

/**
 * Obtiene el número de pregunta actual
 */
export function obtenerPreguntaActual() {
    return preguntaActual;
}

/**
 * Obtiene el máximo de preguntas permitidas
 */
export function obtenerMaxPreguntas() {
    return MAX_PREGUNTAS;
}

/**
 * Mezcla un array (Fisher-Yates)
 */
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
