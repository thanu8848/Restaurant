// Funktion zum Aktualisieren der Sterne basierend auf dem Slider-Wert
function updateStarRating(value) {
    const starDisplay = document.getElementById('starDisplay');
    starDisplay.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= value) {
            starDisplay.innerHTML += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= value) {
            starDisplay.innerHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starDisplay.innerHTML += '<i class="far fa-star"></i>';
        }
    }
}

// Initialisiere den Regler
const ratingSlider = document.getElementById('ratingSlider');
ratingSlider.addEventListener('input', function() {
    const rating = parseFloat(this.value); // Aktueller Wert des Sliders
    document.getElementById('rating').value = rating; // Den Wert im versteckten Feld speichern
    updateStarRating(rating); // Sterneanzeige aktualisieren
});

// Event Listener für das Formular
document.getElementById('restaurantForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // Werte aus dem Formular holen
    const selectedDistrict = document.getElementById('districtSelect').value;
    const restaurantName = document.getElementById('restaurantName').value.trim();
    const rating = parseFloat(document.getElementById('rating').value); // Sterne-Bewertung holen

    // Den Bezirk auf der Seite finden
    const districtSections = document.querySelectorAll('section');
    let targetSection = null;

    districtSections.forEach(function(section) {
        const heading = section.querySelector('h2').textContent;
        if (heading === selectedDistrict) {
            targetSection = section;
        }
    });

    if (targetSection) {
        // Neues LI-Element für das Restaurant erstellen
        const newRestaurant = document.createElement('li');

        // Link zu Google Maps erstellen, der den Restaurantnamen und den Bezirk kombiniert
        const googleMapsLink = document.createElement('a');
        const query = `${encodeURIComponent(restaurantName)}+${encodeURIComponent(selectedDistrict)}`; // Kombinierte Suche
        googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
        googleMapsLink.target = "_blank"; // Öffnet den Link in einem neuen Tab
        googleMapsLink.textContent = restaurantName; // Der Name des Restaurants als Linktext

        // Den Link in das LI-Element einfügen
        newRestaurant.appendChild(googleMapsLink);

        // Bewertungsanzeige erstellen und hinzufügen
        const ratingDisplay = document.createElement('span');
        ratingDisplay.innerHTML = ' - ' + document.getElementById('starDisplay').innerHTML; // Zeigt Sterne-Icons an
        newRestaurant.appendChild(ratingDisplay);

        // Restaurant der bestehenden Liste hinzufügen
        const ul = targetSection.querySelector('ul');
        ul.appendChild(newRestaurant);
    }

    // Formular zurücksetzen
    document.getElementById('restaurantForm').reset();
    updateStarRating(3); // Zurücksetzen der Sterneanzeige auf 3
});
