import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import ReactGa from "react-ga";

function GoogleMap() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    ReactGa.initialize("UA-000000-01");
    ReactGa.pageview(window.location.pathname + window.location.search);

    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const countriesLocations = results.map((data, i) => {
    return (
      <div
        lat={data.countryInfo.lat}
        lng={data.countryInfo.long}
        style={{
          color: "red",
          backgroundColor: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "30%",
        }}
      >
        <img height="10px" src={data.countryInfo.flag} alt={"Country"} />
        <br />
        {data.cases}
      </div>
    );
  });

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center" }}>Covid-19 Live Stats</h2>
      <br />
      
      <div style={{ align: "left", height: "60vh", width: "200vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBQRKHo4sbKMVRYTOZ3rFl6lZ3sA4xScWk" }}
          defaultCenter={{ lat: 13, lng: 105 }}
          defaultZoom={3}
        >
          {countriesLocations}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default GoogleMap;
