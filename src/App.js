import "./App.css";
import React from "react";
import mapStyles from "./mapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import logo from "../src/boat.png";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 42.360081,
  lng: -71.058884,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function SideBar() {
  return (
    <div>
      <h1>Here goes the floating container!</h1>
    </div>
  );
}
function App() {
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyCad2TODIoWKd3o3ykfM9N95O5E8E3B0iY",
    libraries: ["places"],
  });
  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Flux Marine</h1>
      {/* <iframe
        width=" 425 "
        height=" 350 "
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="http://www.openseamap.org/export/embed.html?bbox= -2.01,43.15,13.85,53.35 &layer=mapnik"
        style="border: 1px solid black"
      ></iframe>
      <a href="http://www.openseamap.org/?lat= 48.25 &lon= 5.92 &zoom= 5 &layers=BFTTFFTFFTF0FF">
        View Larger Map
      </a> */}
      {
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
        ></GoogleMap>
      }
    </div>
  );
}

export default App;
