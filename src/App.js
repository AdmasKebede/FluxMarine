import "./App.css";
import React from "react";
import mapStyles from "./mapStyles.js";
import "./Sidebar.css"
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
/*
function SideBar() {
    return (
    <div id="mySdebar" className="sidebar">
        <a href="#">Ready for your trip</a>
        <h1>Here goes the floating container!</h1>
        <input type="text" id="myName" placeholder="Enter Name"/>
        <button type="save" id="btn">Save</button>
    </div>
    );
}
 */

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function App() {
  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyCad2TODIoWKd3o3ykfM9N95O5E8E3B0iY",
    libraries: ["places"],
  });
  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";
  // document.getElementById("mySdebar").style.width="100px";
  return (
      <div>
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
          <div id="main">
            <button className="openbtn" onClick="openNav()">☰ </button>
          </div>
          {
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={8}
              center={center}
              options={options}
            ></GoogleMap>
          }
        </div>
        <div id="mySdebar" className="sidebar">
          <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">&times;</a>
          <a href="#">Ready for your trip</a>
          <input type="text" id="startPosition" placeholder="From"/>
          <input type="to" id="To" placeholder="To"/>
          <button type="Start" id="btn">Start</button>
        </div>
      </div>
  );
}
export default App;
