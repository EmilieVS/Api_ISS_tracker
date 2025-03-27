// init variables

const urlAPIIss = "https://api.wheretheiss.at/v1/satellites/25544";
const urlAPINominatim = "https://nominatim.openstreetmap.org";
const markerSvg = "<img src='image/iss.svg'></img>"; //image ISS sur la terre
const date = document.querySelector("#Date");
const latitude = document.querySelector("#Latitude");
const longitude = document.querySelector("#Longitude");
const country = document.querySelector("#Country");
const altitude = document.querySelector("#Altitude");
const speed = document.querySelector("#Speed");
const visibility = document.querySelector("#Visibility");
//initialise un tableau d'objet qu'on utilise pour afficher les données de l'API de l'ISS, la bibliothèque nous oblige à utiliser un tableau
const issData = [{ 
    date: new Date().toLocaleDateString("fr"), //affiche la date locale format jj/mm/aaaa
    lat: "Chargement...",
    lng: "Chargement...",
    country: "Chargement...",
    altitude: "Chargement...",
    velocity: "Chargement...",
    visibility: "Chargement...",
}];
//créer un globe grâce à la bibliothèque Globe.gl : basée sur Three JS
const globe = new Globe(document.querySelector('#globe'))
    .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg') //carte
    .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png') //relief
    .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png') //fond ciel étoilé
    .htmlElementsData(issData) //on récupère les données de l'iss pour les associer à élément
    .htmlElement( () => { //création élément ISS autour de la terre
        const element = document.createElement('div');
        element.innerHTML = markerSvg;
        element.style.width = "60px";
        return element;
    })
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.3;


// init functions

//envoie les données de la position de l'ISS à la bibliothèque
function updateISSPosition() {
    globe.htmlLat(issData.lat);
    globe.htmlLng(issData.lng);
}

async function getISSPosition() {
    try {
        const response = await fetch(urlAPIIss);
        const data = await response.json();

        //on récupère les valeurs renvoyées par l'API pour les mettre dans notre objet
        issData[0].lat = data.latitude.toFixed(3);
        issData[0].lng = data.longitude.toFixed(3); //toFixed : limite le nombre de décimales
        issData[0].altitude = data.altitude.toFixed(0);
        issData[0].velocity = data.velocity.toFixed(0);
        issData[0].visibility = data.visibility;
        updateISSPosition();
        getCountryName();
    }
    catch (error) {
        console.error(error);
    }
}

//on récupère le pays  au dessus duquel passe l'ISS grâce à l'API Nominatim avec Longitude et Latitude ("reverse geocoding")
async function getCountryName() {
    try {
        //on va chercher le pays avec des paramètres de recherche : longitude latitude
        const response = await fetch(`${urlAPINominatim}/reverse?format=json&lat=${issData[0].lat}&lon=${issData[0].lng}`);
        const data = await response.json();

        if (data.error) { //si la propriété error existe dans data alors on est dans "Océan"
            issData[0].country = "Océan";
        }
        else {
            issData[0].country = data.address.country; //j'ai la donnée et j'ai trouvé le pays
        }
    }
    catch (error) { //problèmes API, time out, réseau...
        console.error(error);
    }
}

//permet d'afficher jour ou nuit en fonction de la visibilité de l'ISS
function dayOrNight(visibility) {
    if (visibility === "daylight") {
        return "Jour";
    }
    return "Nuit";
}

//Récupère les informations de l'ISS pour les afficher dans le Dashboard
function showDataUI() {
    date.innerText = issData[0].date;
    latitude.innerText = issData[0].lat;
    longitude.innerText = issData[0].lng;
    country.innerText = issData[0].country;
    altitude.innerText = `${issData[0].altitude} km`;
    speed.innerText = `${issData[0].velocity} km/h`;
    visibility.innerText = dayOrNight(issData[0].visibility);
}

//Initialiser l'application, la position  de l'ISS et afficher le Dashboard
function initiate() {
    getISSPosition();
    date.innerText = issData[0].date;
    latitude.innerText = issData[0].lat;
    longitude.innerText = issData[0].lng;
    country.innerText = issData[0].country;
    altitude.innerText = issData[0].altitude;
    speed.innerText = issData[0].velocity;
    visibility.innerText = issData[0].visibility;
}


// execute code

// on initialise l'affichage puis on lance l'intervalle toutes les 3 sec
initiate();
let intervalId = setInterval(() => {
    getISSPosition();
    showDataUI();
}, 3000);