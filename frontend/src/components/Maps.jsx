import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useEffect, useState } from "react";


export default function Map(){
    
    const [data, setData] = useState({})
    

    useEffect(() => {

        const fetchData = async () => {
            try {
                const url = `${process.env.REACT_APP_API_BASE_URL}/camps`
                console.log(url)
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } 
        fetchData()    
    }, []);
    
    const myMap = {
        coordinates: [],
        campsites: [],
        map: {},
        markers: {},

        createMap(){
            this.map = L.map('leaflet-container', {
                center: this.coordinates,
                zoom: 10
            });
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map)

            var marker = L.marker(this.coordinates)
            marker.addTo(this.map).bindPopup('<p><b>You are here</b></p>').openPopup()
        },

        addCampMarkers(){
            for (let i = 0; i < this.camp.length; i++) {
                this.markers = L.marker([
                    this.campsites[i].latitude,
                    this.campsites[i].longitude
                ])
                .bindPopup(`<p>${this.campsites[i].name}</p>`)
                .addTo(this.map).openPopup()
                ;     
            }
        }
    }

    async function getUserLocation(){
        let postion = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [postion.coords.latitude, postion.coords.longitude]
    }

    async function getCampground(data){
        let campsites = data.json()
        for (let index = 0; index < campsites.length; index++) {
            const element = data[index];
            let location = {
                name: element.geolocation.name,
                latitude: element.geolocation.coordinates[0],
                longitude: element.geolocation.coordinates[1]
            };
            return location
        }
    }

    window.onload = async () => {
        const coords = await getUserLocation()
        myMap.coordinates = coords
        myMap.createMap()
    }

    return(  
    <div className="map">
        <h3 className="near" >Near you!</h3>
        <div id="leaflet-container">
        </div>
    </div> 
    )
}