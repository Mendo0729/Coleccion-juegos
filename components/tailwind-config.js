// Configuración de Tailwind CSS - Paleta Sunset Vibes
// Este archivo contiene la configuración personalizada de colores y estilos
// para ser reutilizada en todos los archivos HTML del proyecto

// Función para configurar los colores personalizados de Tailwind
function configureTailwindColors() {
    if (window.tailwind) {
        window.tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        peach: '#FF9A76',
                        coral: '#FF6F61',
                        honey: '#FFD56B',
                        pinksoft: '#FFB6B9',
                        lavender: '#D6A4A4',
                        chocolate: '#6B4226',
                    }
                }
            }
        };
    }
}

// Configurar colores cuando Tailwind esté disponible
if (window.tailwind) {
    configureTailwindColors();
} else {
    // Esperar a que Tailwind se cargue
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar periódicamente si Tailwind está disponible
        const checkTailwind = setInterval(() => {
            if (window.tailwind) {
                configureTailwindColors();
                clearInterval(checkTailwind);
            }
        }, 100);
    });
}

// Función para inicializar la configuración de colores (para uso manual)
export function initTailwindColors() {
    configureTailwindColors();
} 