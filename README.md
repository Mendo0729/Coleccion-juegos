# 🎮 Juegos Interactivos - Paleta Sunset Vibes

Un conjunto de juegos educativos e interactivos desarrollados con HTML, CSS (Tailwind) y JavaScript vanilla. Diseñado con una paleta de colores cálidos y una interfaz moderna y responsiva.

## 🌟 Características

- **5 juegos diferentes** con mecánicas únicas
- **Diseño responsivo** que funciona en todos los dispositivos
- **Paleta de colores Sunset Vibes** con tonos cálidos y acogedores
- **Configuración centralizada** de Tailwind CSS
- **Arquitectura modular** con separación clara de responsabilidades
- **Sin dependencias externas** (excepto Tailwind CDN)

## 🎯 Juegos Disponibles

### 1. 🧠 Juego de Memoria
**Encuentra las parejas de cartas antes de que se acabe el tiempo**

- **Tiempo límite**: 1 minuto 30 segundos
- **Mecánica**: Encontrar pares de cartas idénticas
- **Características**:
  - Temporizador con cuenta regresiva
  - Cambio de color en los últimos 30 segundos
  - Pantalla de inicio con botón de inicio
  - Botón para volver al menú principal

### 2. ❓ Quiz de Conocimiento
**Responde preguntas de conocimiento general con tiempo límite**

- **Tiempo por pregunta**: 30 segundos
- **Categorías**: General y Cristiana
- **Características**:
  - Puntuación en tiempo real
  - Navegación automática entre preguntas
  - Contador de preguntas (1 de 10)
  - Cambio de color en los últimos 10 segundos
  - Preguntas almacenadas localmente (sin API externa)

### 3. 🔤 Ahorcado
**Adivina la palabra antes de que se complete el muñeco**

- **Intentos**: 6 vidas
- **Características**:
  - Canvas para dibujar el muñeco progresivamente
  - Expresiones faciales según el estado del juego
  - Categorías temáticas de palabras
  - Contador de intentos restantes
  - Botón para volver al menú principal

### 4. 🎭 Charadas
**Actúa y adivina palabras en grupo con temporizador**

- **Tiempo por palabra**: 30 segundos
- **Límite**: Máximo 10 palabras
- **Categorías**: General, Animales, Oficios, Objetos, Cristiana
- **Características**:
  - Sistema de puntuación en tiempo real
  - Contador de progreso (Pregunta X de 10)
  - Botones "Correcto" e "Incorrecto"
  - Puntuación final al completar

### 5. 🔠 Rueda Alfabética (Pasa-Palabra)
**Responde preguntas con cada letra del abecedario**

- **Tiempo límite**: 5 minutos
- **Categorías**: General y Cristiana
- **Características**:
  - Rueda alfabética visual con progreso
  - Selección de categoría antes de iniciar
  - Estados visuales de letras (pendiente, actual, correcta, incorrecta, pasada)
  - Leyenda de colores
  - Botón para volver a selección de categoría

## 🎨 Paleta de Colores

El proyecto utiliza una paleta personalizada "Sunset Vibes":

```css
peach: '#FF9A76'      /* Naranja melocotón */
coral: '#FF6F61'      /* Coral vibrante */
honey: '#FFD56B'      /* Amarillo miel */
pinksoft: '#FFB6B9'   /* Rosa suave */
lavender: '#D6A4A4'   /* Lavanda */
chocolate: '#6B4226'   /* Marrón chocolate */
```

## 📁 Estructura del Proyecto

```
Juegos/
├── index.html                    # Página principal con menú de juegos
├── components/
│   └── tailwind-config.js        # Configuración centralizada de Tailwind
├── juegos/
│   ├── memoria/
│   │   ├── memoria.html
│   │   ├── memoria-controller.js
│   │   ├── memoria-model.js
│   │   └── memoria-view.js
│   ├── quiz/
│   │   ├── quiz.html
│   │   ├── quiz-controller.js
│   │   ├── quiz-model.js
│   │   └── quiz-view.js
│   ├── ahorcado/
│   │   ├── ahorcado.html
│   │   ├── ahorcado-controller.js
│   │   ├── ahorcado-model.js
│   │   └── ahorcado-view.js
│   ├── charadas/
│   │   ├── charadas.html
│   │   ├── charadas-controller.js
│   │   ├── charadas-model.js
│   │   └── charadas-view.js
│   └── pasa-palabra/
│       ├── rueda.html
│       ├── rueda-controller.js
│       ├── rueda-model.js
│       ├── rueda-view.js
│       ├── preguntas-generales.js
│       └── preguntas-cristianas.js
└── README.md
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web local (opcional, pero recomendado)

### Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone https://github.com/Mendo0729/Coleccion-juegos.git
   cd Juegos
   ```

2. **Iniciar servidor local** (recomendado)
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:8000
   ```

### Uso sin servidor
Simplemente abre `index.html` en tu navegador (algunas funciones pueden no funcionar correctamente).

## 🏗️ Arquitectura

### Patrón MVC (Model-View-Controller)
Cada juego sigue el patrón MVC para una organización clara del código:

- **Model**: Lógica de negocio y datos del juego
- **View**: Interfaz de usuario y manipulación del DOM
- **Controller**: Coordinación entre Model y View, manejo de eventos

### Configuración Centralizada
- **Tailwind CSS**: Configuración centralizada en `/components/tailwind-config.js`
- **Colores personalizados**: Paleta Sunset Vibes aplicada consistentemente
- **Estilos reutilizables**: Componentes y clases comunes

## 🎮 Cómo Jugar

### Memoria
1. Haz clic en "Iniciar Juego"
2. Encuentra pares de cartas idénticas
3. Completa antes de que se acabe el tiempo (1:30)

### Quiz
1. Selecciona una categoría
2. Responde cada pregunta en 30 segundos
3. Ve tu puntuación final

### Ahorcado
1. Adivina la palabra letra por letra
2. Tienes 6 intentos antes de perder
3. El muñeco se dibuja progresivamente

### Charadas
1. Selecciona una categoría
2. Actúa la palabra mostrada
3. Marca "Correcto" o "Incorrecto"
4. Completa 10 palabras máximo

### Rueda Alfabética
1. Selecciona una categoría
2. Haz clic en "Iniciar Juego"
3. Responde preguntas con cada letra
4. Completa en 5 minutos máximo

## 🔧 Personalización

### Agregar Nuevas Categorías
Para agregar nuevas categorías a los juegos:

1. **Charadas**: Modifica `charadas-model.js` agregando nuevas categorías
2. **Quiz**: Agrega preguntas en el modelo correspondiente
3. **Rueda Alfabética**: Crea un nuevo archivo de preguntas en `/preguntas/`

### Modificar Colores
Edita `/components/tailwind-config.js` para cambiar la paleta de colores.

### Agregar Nuevos Juegos
1. Crea una nueva carpeta en `/juegos/`
2. Sigue la estructura MVC
3. Agrega el enlace en `index.html`

## 📱 Responsividad

El proyecto está diseñado para funcionar en:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)

## 🌐 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Juegos Interactivos** - Proyecto educativo desarrollado con ❤️

## 🙏 Agradecimientos

- **Tailwind CSS** por el framework de utilidades
- **Comunidad de desarrolladores** por las mejores prácticas
- **Usuarios** por el feedback y sugerencias

---

**¡Disfruta jugando! 🎮✨** 