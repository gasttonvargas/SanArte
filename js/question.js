$(document).ready(function() {
    // Lista de cartas con sus resultados y rutas de imágenes
    const cards = [
        { name: 'El loco', result: 'negativa', image: '/images/el-loco.jpg' },
        { name: 'El mago', result: 'positiva', image: '/images/el-mago.jpg' },
        { name: 'La sacerdotisa', result: 'positiva', image: '/images/la-sacerdotisa.jpg' },
        { name: 'La emperatriz', result: 'positiva', image: '/images/la-emperatriz.jpg' },
        { name: 'El emperador', result: 'positiva', image: '/images/el-emperador.jpg' },
        { name: 'El sacerdote', result: 'positiva', image: '/images/el-hierofante.jpg' },
        { name: 'Los enamorados', result: 'positiva', image: '/images/los-enamorados.jpg' },
        { name: 'El carro', result: 'positiva', image: '/images/el-carro.jpg' },
        { name: 'La fuerza', result: 'positiva', image: '/images/la-fuerza.jpg' },
        { name: 'El ermitaño', result: 'negativa', image: '/images/el-ermitaño.jpg' },
        { name: 'La rueda de la fortuna', result: 'positiva', image: '/images/la-rueda-de-la-fortuna.jpg' },
        { name: 'La justicia', result: 'positiva', image: '/images/la-justicia.jpg' },
        { name: 'El colgado', result: 'negativa', image: '/images/el-colgado.jpg' },
        { name: 'La muerte', result: 'negativa', image: '/images/la-muerte.jpg' },
        { name: 'La templanza', result: 'positiva', image: '/images/la-templanza.jpg' },
        { name: 'El diablo', result: 'negativa', image: '/images/el-diablo.jpg' },
        { name: 'La torre', result: 'negativa', image: '/images/la-torre.jpg' },
        { name: 'La estrella', result: 'positiva', image: '/images/la-estrella.jpg' },
        { name: 'La luna', result: 'negativa', image: '/images/la-luna.jpg' },
        { name: 'El juicio', result: 'positiva', image: '/images/el-juicio.jpg' },
        { name: 'El sol', result: 'positiva', image: '/images/el-sol.jpg' },
        { name: 'El mundo', result: 'positiva', image: '/images/el-mundo.jpg' }
    ];

    let revealedCards = 0;

    $('#askQuestion').on('click', function() {
        const question = $('#userQuestion').val().trim();
        if (question === '') {
            alert('Por favor, escribe una pregunta.');
            return;
        }
    
        $('#question-container').hide(); // Oculta el contenedor del formulario
        $('#promo-container').hide();    // Oculta el contenedor de promoción si es necesario
        $('#loading').show();
    
        // Simular una respuesta del Tarot después de 2 segundos
        setTimeout(() => {
            $('#loading').hide();
            $('#cards-container').show();
    
            // Barajar las cartas y seleccionar 5 al azar
            const shuffledCards = cards.sort(() => 0.5 - Math.random());
            const selectedCards = shuffledCards.slice(0, 5);
    
            // Mostrar las cartas
            $('#cards-container').empty();
            selectedCards.forEach(card => {
                $('#cards-container').append(`
                    <div class="card" onclick="revealCard(this, '${card.image}', '${card.result}')">
                        <img src="/images/card-back.jpg" alt="Carta">
                    </div>
                `);
            });
    
            // Guardar las cartas seleccionadas
            $('#cards-container').data('selectedCards', selectedCards);
        }, 2000);
    });

    window.revealCard = function(card, image, result) {
        $(card).find('img').attr('src', image);
        revealedCards++;

        if (revealedCards === 5) {
            showResult();
        }
    };

    function showResult() {
        const selectedCards = $('#cards-container').data('selectedCards');
        const resultCounts = selectedCards.reduce((counts, card) => {
            counts[card.result] = (counts[card.result] || 0) + 1;
            return counts;
        }, {});
        const isPositive = resultCounts.positiva >= resultCounts.negativa;

        const resultMessage = isPositive 
            ? '¡La respuesta es positiva! Todo saldrá bien.'
            : 'La respuesta es negativa. ¡Tú tienes el poder de cambiar las cosas!';

        // Mostrar la pregunta y el resultado
        $('#userQuestionDisplay').text(`Tu pregunta: "${$('#userQuestion').val()}"`);
        $('#resultMessage').text(resultMessage);
        $('#result-container').show();

        setTimeout(() => {
            $('#resultMessage').addClass('animate__animated animate__pulse');
            $('#resetButton').fadeIn();
        }, 500);
    }

    // Reiniciar la página al hacer clic en el botón de reinicio
    $('#resetButton').on('click', function() {
        location.reload();  // Recarga la página para empezar desde cero
    });
});
