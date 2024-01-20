import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";

export default function Map(){
    async function getUserLocation(){
        let postion = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [postion.coords.latitude, postion.coords.longitude]
    }
    
    async function fetchCoords() {
        try {
            const response = await fetch('./mockjsondata.json');
    
            if (!response.ok) {
                const data = await response.json();
                return [data.coordinates.latitude, data.coordinates.longitude];;
            }
        } catch (error) {
            console.error('Error fetching local coordinates:', error);
        }
    }
    
    fetchCoords().then(coords => {
        console.log('Local Coordinates:', coords);
    });

    
    const myMap = {
        coordinates: [],
        campsites: [],
        map: {},
        markers: {},

        createMap() {
            this.map = L.map('leaflet-container', {
                center: this.coordinates,
                zoom: 16
            });
    
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
    
            var userLocaction = L.icon({
                iconUrl: require ('../pics/location-pin.png'),
                iconSize: [50, 95]
            })

            var marker = L.marker(this.coordinates, {icon: userLocaction}).addTo(this.map);
            marker.addTo(this.map).bindPopup('<p>You are here</p>');
        },

    
        async addCampMarkers(response) {
            var campPin = L.icon({
                iconUrl: require('../pics/pin.png'),
                iconSize: [50, 95],

            })
            for (let i = 0; i < response.results.length; i++) {
                let camp = response.results[i];
                L.marker([camp.geocodes.main.latitude, camp.geocodes.main.longitude], {icon: campPin})
                    .addTo(this.map)
                    .bindPopup(`<p>${camp.name}</p>`);
            }
        }
    };
    
    async function fetchCampsites() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3yEifxus9374yCFrN+6vk0R0E5eCnqiZMfCzhjAVkVVU=' 
            }
        };
        try {
            const response = await fetch('https://api.foursquare.com/v3/places/search?categories=16008&exclude_all_chains=true', options); 
            const data = await response.json();
            myMap.addCampMarkers(data);
        } catch (err) {
            console.error(err);
        }
    }
    
    // Initialization on window load
    window.onload = async () => {
        const coords = await getUserLocation()
        myMap.coordinates = coords
        myMap.createMap();
        fetchCampsites();
        fetchCoords().then(coords => {
            if (coords) {
                console.log('Additional Coordinates:', coords);
            }
        });
    };

    return(  
        <div className="map">
            <h3 className="near" >Near you!</h3>
            <div id="leaflet-container">
            </div>
        </div> 
        )
}
