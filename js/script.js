function startReading() {
    // Oculta la pantalla de inicio
    document.getElementById('splashScreen').style.display = 'none';

    // Muestra el contenido principal
    document.getElementById('mainContent').style.display = 'block';
}

// Array de cartas con imágenes y significados
const tarotDeck = [
    { name: "El Loco", image: "/images/el-loco.jpg", meaning: "nuevo comienzo, aventura, libertad" },
    { name: "El Mago", image: "images/el-mago.jpg", meaning: "manifestación, habilidad, poder personal" },
    { name: "La Sacerdotisa", image: "images/la-sacerdotisa.jpg", meaning: "intuición, misterio, sabiduría oculta" },
    { name: "La Emperatriz", image: "images/la-emperatriz.jpg", meaning: "fertilidad, creatividad, abundancia" },
    { name: "El Emperador", image: "images/el-emperador.jpg", meaning: "autoridad, estructura, estabilidad" },
    { name: "El Hierofante", image: "images/el-hierofante.jpg", meaning: "tradición, orientación espiritual, conformidad" },
    { name: "Los Enamorados", image: "images/los-enamorados.jpg", meaning: "amor, decisiones, relaciones" },
    { name: "El Carro", image: "images/el-carro.jpg", meaning: "victoria, determinación, control" },
    { name: "La Fuerza", image: "images/la-fuerza.jpg", meaning: "coraje, fortaleza interior, paciencia" },
    { name: "El Ermitaño", image: "images/el-ermitaño.jpg", meaning: "reflexión, búsqueda interior, soledad" },
    { name: "La Rueda de la Fortuna", image: "images/la-rueda-de-la-fortuna.jpg", meaning: "cambio, ciclos, destino" },
    { name: "La Justicia", image: "images/la-justicia.jpg", meaning: "equilibrio, justicia, verdad" },
    { name: "El Colgado", image: "images/el-colgado.jpg", meaning: "sacrificio, nueva perspectiva, pausa" },
    { name: "La Muerte", image: "images/la-muerte.jpg", meaning: "transformación, final, nuevos comienzos" },
    { name: "La Templanza", image: "images/la-templanza.jpg", meaning: "equilibrio, moderación, paciencia" },
    { name: "El Diablo", image: "images/el-diablo.jpg", meaning: "tentación, adicción, ataduras" },
    { name: "La Torre", image: "images/la-torre.jpg", meaning: "cambio repentino, ruptura, revelación" },
    { name: "La Estrella", image: "images/la-estrella.jpg", meaning: "esperanza, inspiración, serenidad" },
    { name: "La Luna", image: "images/la-luna.jpg", meaning: "confusión, intuición, sueños" },
    { name: "El Sol", image: "images/el-sol.jpg", meaning: "éxito, vitalidad, alegría" },
    { name: "El Juicio", image: "images/el-juicio.jpg", meaning: "renacimiento, juicio, resolución" },
    { name: "El Mundo", image: "images/el-mundo.jpg", meaning: "cumplimiento, realización, armonía" }
];

// Función para barajar las cartas
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Intercambiar
    }
}

// Barajar el mazo al cargar la página
shuffleDeck(tarotDeck);

// Asignar cartas aleatorias a los elementos
function setupCards() {
    shuffleDeck(tarotDeck); // Barajar nuevamente al configurar las cartas
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const cardData = tarotDeck[index];
        card.setAttribute('data-name', cardData.name);
        const img = card.querySelector('img');
        img.src = 'images/card-back.jpg'; // Imagen de reverso
        img.alt = cardData.name;
    });
}

// Función para revelar carta
function revealCard(cardElement) {
    const cardName = cardElement.getAttribute('data-name');
    const card = tarotDeck.find(c => c.name === cardName);

    if (card) {
        cardElement.querySelector('img').src = card.image;
        cardElement.classList.add('revealed');
        checkAllCardsRevealed(); // Verifica si todas las cartas están reveladas
    }
}

// Función para reiniciar las cartas
function resetCards() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('revealed');
        card.querySelector('img').src = 'images/card-back.jpg'; // Imagen de reverso
    });

    document.getElementById('narrative').style.display = 'none';
    setupCards(); // Reconfigura las cartas al reiniciar
}

// Verificar si todas las cartas están reveladas
function checkAllCardsRevealed() {
    const allCards = document.querySelectorAll('.card');
    const revealedCards = document.querySelectorAll('.card.revealed');

    if (allCards.length === revealedCards.length) {
        displayNarrative();
    }
}

// Función para generar la narrativa basada en los significados de las cartas
function generateNarrative(cards) {
    const meanings = cards.map(card => card.meaning);
    let narrative = "Las cartas reveladas sugieren lo siguiente: ";

    // Construir la narrativa utilizando los significados
    if (meanings.includes("nuevo comienzo, aventura, libertad")) {
        narrative += "Un nuevo comienzo está en el horizonte, lleno de aventura y libertad. ";
    }
    if (meanings.includes("manifestación, habilidad, poder personal")) {
        narrative += "Tus habilidades y poder personal están a su máximo potencial, ayudándote a manifestar tus deseos. ";
    }
    if (meanings.includes("intuición, misterio, sabiduría oculta")) {
        narrative += "Confía en tu intuición y sabiduría oculta para descubrir los misterios que te rodean. ";
    }
    if (meanings.includes("fertilidad, creatividad, abundancia")) {
        narrative += "La fertilidad y creatividad están a tu favor, brindándote abundancia y nuevas oportunidades. ";
    }
    if (meanings.includes("autoridad, estructura, estabilidad")) {
        narrative += "La autoridad y estructura te ofrecen estabilidad, ayudándote a mantener el rumbo hacia tus objetivos. ";
    }
    if (meanings.includes("tradición, orientación espiritual, conformidad")) {
        narrative += "La orientación espiritual y la conformidad con las tradiciones te proporcionarán claridad y propósito. ";
    }
    if (meanings.includes("amor, decisiones, relaciones")) {
        narrative += "Las decisiones relacionadas con el amor y las relaciones jugarán un papel crucial en tu camino. ";
    }
    if (meanings.includes("victoria, determinación, control")) {
        narrative += "Con determinación y control, alcanzarás la victoria en tus esfuerzos actuales. ";
    }
    if (meanings.includes("coraje, fortaleza interior, paciencia")) {
        narrative += "El coraje y la fortaleza interior te permitirán enfrentar desafíos con paciencia y confianza. ";
    }
    if (meanings.includes("reflexión, búsqueda interior, soledad")) {
        narrative += "Un tiempo de reflexión y búsqueda interior te ayudará a encontrar respuestas importantes. ";
    }
    if (meanings.includes("cambio, ciclos, destino")) {
        narrative += "Estás en medio de un cambio significativo que influye en tu destino. Acepta los ciclos naturales. ";
    }
    if (meanings.includes("equilibrio, justicia, verdad")) {
        narrative += "Buscar el equilibrio y la justicia será clave para alcanzar la verdad en tu situación actual. ";
    }
    if (meanings.includes("sacrificio, nueva perspectiva, pausa")) {
        narrative += "Un sacrificio puede ser necesario para obtener una nueva perspectiva y encontrar claridad. ";
    }
    if (meanings.includes("transformación, final, nuevos comienzos")) {
        narrative += "Una transformación profunda está ocurriendo, marcando el final de un ciclo y el comienzo de otro. ";
    }
    if (meanings.includes("equilibrio, moderación, paciencia")) {
        narrative += "La moderación y la paciencia te ayudarán a mantener el equilibrio en tiempos de incertidumbre. ";
    }
    if (meanings.includes("tentación, adicción, ataduras")) {
        narrative += "Enfrentarás tentaciones y ataduras que requieren un enfoque consciente para superar. ";
    }
    if (meanings.includes("cambio repentino, ruptura, revelación")) {
        narrative += "Un cambio repentino y revelador está en camino, trayendo consigo una ruptura con el pasado. ";
    }
    if (meanings.includes("esperanza, inspiración, serenidad")) {
        narrative += "La esperanza y la inspiración te ofrecerán serenidad y una visión clara de tus próximos pasos. ";
    }
    if (meanings.includes("confusión, intuición, sueños")) {
        narrative += "Confusión puede surgir, pero tu intuición y sueños te guiarán hacia la claridad. ";
    }
    if (meanings.includes("éxito, vitalidad, alegría")) {
        narrative += "El éxito, la vitalidad y la alegría te rodean, marcando una etapa positiva en tu vida. ";
    }
    if (meanings.includes("renacimiento, juicio, resolución")) {
        narrative += "Un período de renacimiento y resolución te permitirá avanzar con claridad y propósito. ";
    }
    if (meanings.includes("cumplimiento, realización, armonía")) {
        narrative += "La realización de tus objetivos y la armonía en tu vida están a la vista. ";
    }

    return narrative;
}

// Función para mostrar la narrativa
function displayNarrative() {
    const revealedCards = document.querySelectorAll('.card.revealed');
    const cardObjects = Array.from(revealedCards).map(card => {
        const cardName = card.getAttribute('data-name');
        return tarotDeck.find(c => c.name === cardName);
    });

    const narrative = generateNarrative(cardObjects);
    const narrativeElement = document.getElementById('narrative');
    narrativeElement.textContent = narrative;
    narrativeElement.style.display = 'block';
}

function showNarrative(text) {
    const narrativeContainer = document.getElementById('narrative');
    narrativeContainer.innerHTML = text; // Establece el texto narrativo
    narrativeContainer.style.display = 'flex'; // Asegúrate de que el contenedor esté visible
    narrativeContainer.classList.add('fade-in'); // Añade la clase de animación
}


// Configurar cartas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setupCards();
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => revealCard(card));
    });
    document.getElementById('reset-button').addEventListener('click', resetCards);
});
