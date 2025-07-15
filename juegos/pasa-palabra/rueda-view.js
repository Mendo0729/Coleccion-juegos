// Elementos del DOM
const letraElemento = document.getElementById('letra-actual');
const preguntaElemento = document.getElementById('pregunta-texto');
const inputRespuesta = document.getElementById('respuesta-input');
const btnResponder = document.getElementById('btn-responder');
const btnPasar = document.getElementById('btn-pasar');
const correctasElemento = document.getElementById('correctas');
const incorrectasElemento = document.getElementById('incorrectas');
const temporizadorElemento = document.getElementById('temporizador');
const ruedaAlfabeticaElemento = document.getElementById('rueda-alfabetica');
const categoriaSelect = document.getElementById('categoria-select');
const btnCambiarCategoria = document.getElementById('btn-cambiar-categoria');
const btnVolverSeleccion = document.getElementById('btn-volver-seleccion');
const pantallaSeleccion = document.getElementById('pantalla-seleccion');
const pantallaJuego = document.getElementById('pantalla-juego');
const btnIniciarJuego = document.getElementById('btn-iniciar-juego');
const categoriaGeneral = document.getElementById('categoria-general');
const categoriaCristiana = document.getElementById('categoria-cristiana');

// Variable para la categoría seleccionada
let categoriaSeleccionada = null;

/**
 * Configura los eventos de selección de categoría
 * @param {Function} onCategoriaSeleccionada - Callback cuando se selecciona una categoría
 * @param {Function} onIniciarJuego - Callback cuando se inicia el juego
 * @param {Function} onVolverSeleccion - Callback cuando se quiere volver a selección
 */
export function configurarSeleccionCategoria(onCategoriaSeleccionada, onIniciarJuego, onVolverSeleccion) {
    // Eventos para las tarjetas de categoría
    categoriaGeneral.addEventListener('click', () => {
        seleccionarCategoria('general');
        onCategoriaSeleccionada('general');
    });
    
    categoriaCristiana.addEventListener('click', () => {
        seleccionarCategoria('cristiana');
        onCategoriaSeleccionada('cristiana');
    });
    
    // Evento para el botón de iniciar juego
    btnIniciarJuego.addEventListener('click', onIniciarJuego);
    
    // Evento para el botón de volver a selección
    btnVolverSeleccion.addEventListener('click', onVolverSeleccion);
}

/**
 * Selecciona visualmente una categoría
 * @param {string} categoria - La categoría seleccionada
 */
function seleccionarCategoria(categoria) {
    categoriaSeleccionada = categoria;
    
    // Remover selección previa
    categoriaGeneral.classList.remove('border-coral', 'bg-coral/5');
    categoriaCristiana.classList.remove('border-coral', 'bg-coral/5');
    
    // Aplicar selección actual
    if (categoria === 'general') {
        categoriaGeneral.classList.add('border-coral', 'bg-coral/5');
    } else if (categoria === 'cristiana') {
        categoriaCristiana.classList.add('border-coral', 'bg-coral/5');
    }
    
    // Mostrar botón de iniciar
    btnIniciarJuego.classList.remove('hidden');
}

/**
 * Muestra la pantalla del juego y oculta la de selección
 */
export function mostrarPantallaJuego() {
    pantallaSeleccion.classList.add('hidden');
    pantallaJuego.classList.remove('hidden');
}

/**
 * Muestra la pantalla de selección y oculta la del juego
 */
export function mostrarPantallaSeleccion() {
    pantallaJuego.classList.add('hidden');
    pantallaSeleccion.classList.remove('hidden');
    
    // Limpiar selección
    categoriaGeneral.classList.remove('border-coral', 'bg-coral/5');
    categoriaCristiana.classList.remove('border-coral', 'bg-coral/5');
    btnIniciarJuego.classList.add('hidden');
    categoriaSeleccionada = null;
}

/**
 * Obtiene la categoría seleccionada
 */
export function obtenerCategoriaSeleccionada() {
    return categoriaSeleccionada || categoriaSelect.value;
}

/**
 * Configura el evento para cambiar categoría
 * @param {Function} callback - Función a ejecutar cuando se cambie la categoría
 */
export function configurarCambioCategoria(callback) {
    btnCambiarCategoria.addEventListener('click', callback);
}

/**
 * Crea la rueda alfabética visual
 */
export function crearRuedaAlfabetica() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    ruedaAlfabeticaElemento.innerHTML = '';
    
    letras.forEach(letra => {
        const letraElemento = document.createElement('div');
        letraElemento.id = `letra-${letra}`;
        letraElemento.className = 'w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all duration-300 letra-rueda';
        letraElemento.textContent = letra;
        
        // Estado inicial: pendiente
        letraElemento.classList.add('bg-gray-200', 'border-gray-300', 'text-gray-600');
        
        ruedaAlfabeticaElemento.appendChild(letraElemento);
    });
}

/**
 * Actualiza el estado visual de una letra en la rueda
 * @param {string} letra - La letra a actualizar
 * @param {string} estado - 'pendiente', 'actual', 'correcta', 'incorrecta'
 */
export function actualizarLetraEnRueda(letra, estado) {
    const elemento = document.getElementById(`letra-${letra}`);
    if (!elemento) return;
    
    // Remover todas las clases de estado
    elemento.classList.remove(
        'bg-gray-200', 'border-gray-300', 'text-gray-600',
        'bg-coral', 'border-coral', 'text-white',
        'bg-green-500', 'border-green-500', 'text-white',
        'bg-red-500', 'border-red-500', 'text-white',
        'bg-yellow-400', 'border-yellow-500', 'text-white'
    );
    
    // Aplicar el estado correspondiente
    switch (estado) {
        case 'pendiente':
            elemento.classList.add('bg-gray-200', 'border-gray-300', 'text-gray-600');
            break;
        case 'actual':
            elemento.classList.add('bg-coral', 'border-coral', 'text-white');
            // Agregar efecto de pulso
            elemento.classList.add('animate-pulse');
            break;
        case 'correcta':
            elemento.classList.add('bg-green-500', 'border-green-500', 'text-white');
            elemento.classList.remove('animate-pulse');
            break;
        case 'incorrecta':
            elemento.classList.add('bg-red-500', 'border-red-500', 'text-white');
            elemento.classList.remove('animate-pulse');
            break;
        case 'pasada':
            elemento.classList.add('bg-yellow-400', 'border-yellow-500', 'text-white');
            elemento.classList.remove('animate-pulse');
            break;
    }
}

/**
 * Muestra la pregunta actual en el DOM
 * @param {Object} pregunta - Objeto con letra y pregunta
 */
export function mostrarPregunta(pregunta) {
    letraElemento.textContent = `Letra: ${pregunta.letra}`;
    preguntaElemento.textContent = pregunta.pregunta;
    inputRespuesta.value = '';
    inputRespuesta.focus();
    
    // Actualizar la letra actual en la rueda
    actualizarLetraEnRueda(pregunta.letra, 'actual');
}

/**
 * Obtiene la respuesta escrita por el usuario
 */
export function obtenerRespuestaUsuario() {
    return inputRespuesta.value;
}

/**
 * Actualiza el contador de aciertos y fallos
 * @param {number} correctas
 * @param {number} incorrectas
 */
export function actualizarMarcadores(correctas, incorrectas) {
    correctasElemento.textContent = correctas;
    incorrectasElemento.textContent = incorrectas;
}

/**
 * Actualiza el temporizador en formato MM:SS
 * @param {number} segundos - Tiempo restante en segundos
 */
export function actualizarTemporizador(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    
    temporizadorElemento.textContent = tiempoFormateado;
    
    // Cambiar color cuando queden menos de 1 minuto
    if (segundos <= 60) {
        temporizadorElemento.parentElement.classList.remove('bg-coral');
        temporizadorElemento.parentElement.classList.add('bg-red-500');
    }
}

/**
 * Muestra el final del juego
 */
export function mostrarFinDelJuego() {
    letraElemento.textContent = "¡Juego Terminado!";
    preguntaElemento.textContent = "Has completado todas las letras.";
    inputRespuesta.disabled = true;
    btnResponder.disabled = true;
    btnPasar.disabled = true;
}

/**
 * Muestra el fin del juego por tiempo agotado
 */
export function mostrarFinDelJuegoPorTiempo() {
    letraElemento.textContent = "⏰ ¡Tiempo Agotado!";
    preguntaElemento.textContent = "Se acabó el tiempo de 5 minutos. ¡Inténtalo de nuevo!";
    inputRespuesta.disabled = true;
    btnResponder.disabled = true;
    btnPasar.disabled = true;
    
    // Cambiar color del temporizador a rojo
    temporizadorElemento.parentElement.classList.remove('bg-coral');
    temporizadorElemento.parentElement.classList.add('bg-red-500');
}
