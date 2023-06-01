const mapContainer = document.getElementById('map-container');
const indiaMap = document.getElementById('map');
const marker = document.getElementById('marker');

const input = document.getElementById('location-input');
const locations = Array.from(document.querySelectorAll('#locations option'));

input.addEventListener('input', function () {
    const selectedLocation = input.value.toLowerCase();

    marker.style.display = 'none';
    // Offsets for particular location
    const offsets = {
        delhi: { top: 23.5, left: 30.5 },
        mumbai: { top: 50, left: 18 },
        bangalore: { top: 64.5, left: 31 },
        kolkata: { top: 39, left: 61 },
        chennai: { top: 64.5, left: 38 },
    };

    // Find the selected location and position the marker accordingly
    const selectedOption = locations.find(option => option.value.toLowerCase() === selectedLocation);
    if (selectedOption && offsets[selectedLocation]) {
        const { top, left } = offsets[selectedLocation];

        // Calculate the position of the marker based on the offsets and the map container dimensions
        const containerWidth = mapContainer.clientWidth;
        const containerHeight = mapContainer.clientHeight;
        const markerSize = marker.clientWidth;
        const markerTop = (containerHeight * top) / 100 - markerSize / 2;
        const markerLeft = (containerWidth * left) / 100 - markerSize / 2;

        // Set the position of the marker
        marker.style.top = `${markerTop}px`;
        marker.style.left = `${markerLeft}px`;
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
    }
});