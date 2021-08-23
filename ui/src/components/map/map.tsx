import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
import { City } from "../../shared/interfaces";
import './map.scss';
import { Link } from "react-router-dom";
import LoadingScreen from "../../screens/loading-screen/loading-screen";

function MapComponent() {

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<City[]>('/cities/map')
      .then(citiesDTO => {
        setCities(citiesDTO.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  const centerOfMap = [40.52, 34.34] as LatLngExpression;
  return (
    <MapContainer center={centerOfMap} zoom={3} scrollWheelZoom={false} style={{ height: '100vh', width: '100%', zIndex: -1 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map(city =>
        <Marker position={[city.latitude, city.longitude]}>
          <Popup className='popup'>
            <Link to={`/city/${city.id}`} className='link'>
              <div style={{ backgroundImage: `url(${city.image?.image})` }} className='city-image-map'>
                <h1>{city.name}</h1>
              </div>
            </Link>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default MapComponent;