// Configuración de Tailwind CSS - Paleta Sunset Vibes
// Este archivo contiene la configuración personalizada de colores y estilos
// para ser reutilizada en todos los archivos HTML del proyecto

// Función para configurar Tailwind
function configureTailwind() {
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

// Verificar si Tailwind ya está cargado
if (window.tailwind) {
    configureTailwind();
} else {
    // Cargar Tailwind CSS desde CDN si no está presente
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tailwindScript);
    
    // Configurar Tailwind cuando se cargue
    tailwindScript.onload = function() {
        configureTailwind();
    };
}

// Función para inicializar la configuración de Tailwind (para uso manual)
export function initTailwindConfig() {
    configureTailwind();
} 