// Creando el map en el contenedor
//setView configura la posiciones del mapa aca son las de chapinero
const map = L.map('map').setView([4.6482837, -74.0642103], 13);
console.log(`el objeto map contiene: ${map}`);
<!-- cargar el encabezado, y el pie de pagina -->

//Mostrando el mapa con el enlace de openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);



// Array con la data para cargar marcadores en el mapa
const ipsData = [
    { name: 'Clinica Marly', lat: 4.6388, lng: -74.1916, type: 'general' },
    { name: 'Clinica Cayre', lat: 4.6122, lng: -74.0458, type: 'pediatrics' },
    { name: 'Dentista', lat: 4.6534, lng: -74.0622, type: 'dentistry' },
    { name: 'Cardiologia', lat: 4.6551, lng: -74.0649, type: 'cardiology' },
];

// Agregando marcadores al mapa
// incluye un popup para mostrar una explicacion del marcador
const markers = ipsData.map(ips => {
    return L.marker([ips.lat, ips.lng])
        // arma un popup con los datos nombre de la clinica y el tipo
        .bindPopup(`<b>${ips.name}</b><br>Service: ${ips.type}`)
        // agrega la informacion a la variable map
        .addTo(map);
});

//funcion se encargada de cargar los marcadores por el tipo de servicio seleccionado
function filterMarkers() {
    const selectedType = document.getElementById('service-type').value;
    console.log(`selectedType es:${selectedType}`)
    markers.forEach((marker, index) => {
        const serviceType = ipsData[index].type;
        console.log(`serviceType es:${serviceType}`)
        // condicion validad si el tipo de servicio es todos o es un tipo de servicio especifico
        if (selectedType === 'all' || serviceType === selectedType) {
            // agrega el marcador
            map.addLayer(marker);
        } else {
            // borra el marcador por que no corresponde al filtro
            map.removeLayer(marker);
        }
    });
}

// evento listener esta escuchando cuando cambia el tipo de servicio con el control select
document.getElementById('event-types').addEventListener('change', filterMarkers);
