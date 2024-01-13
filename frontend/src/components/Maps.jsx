import {MapContainer, TileLayer} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";

export default function Map(){
    
    const myMap = {
        coordinates: [],
        campsites: [],
        map: {},
        markers: {},

        buildMap(){
            this.map = L.map('leaflet-containter', {
                center: this.coordinates
            }).addTo(this.map)

            var marker = L.marker(this.coordinates)
            marker.addTo(this.map).bindPopup('<p><b>You are here</b></p>')
        }
    }

    async function getUserLocation(){
        let postion = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [postion.coords.latitude, postion.coords.longitude]
    }

    window.onload = async () => {
        const coords = await getUserLocation()
        myMap.coordinates = coords
        myMap.buildMap()
    }

    return(  
    <div className="map">
        <h3 className="near">Near you!</h3>
        <MapContainer zoom={13}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        </MapContainer>
    </div> 
    )
}