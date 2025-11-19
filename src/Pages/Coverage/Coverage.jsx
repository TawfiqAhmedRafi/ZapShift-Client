import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.356];
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);
  return (
    <div className="bg-base-100 p-5 rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-bold text-secondary">
        We are Available in 64 Districts
      </h2>
      <div>{/* search */}</div>
      <div className="h-[400px] md:h-[800px] border mt-10">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[400px] md:h-[800px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center,index) => (
            <Marker key={index} position={[center.latitude , center.longitude]}>
              <Popup>
              <strong>{center.district}</strong>  <br /> Service Area : {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
