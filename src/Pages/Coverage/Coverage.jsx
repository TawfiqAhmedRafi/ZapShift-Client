import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Coverage = () => {
  const position = [23.685, 90.356];
  const serviceCenters = useLoaderData();
  const mapRef =useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.search.value.toLowerCase();

  const districtOrArea = serviceCenters.find(center => 
    center.district.toLowerCase().includes(location) || 
    center.covered_area.some(area => area.toLowerCase().includes(location))
  );

  if (districtOrArea) {
    const coordinate = [districtOrArea.latitude, districtOrArea.longitude];
    mapRef.current.flyTo(coordinate, 14);
  } else {
    toast("Location not found in our service areas!");
  }
  };

  return (
    <div className="bg-base-100 p-5 rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-bold text-secondary">
        We are Available in 64 Districts
      </h2>
      <div className="my-10 ">
        {/* search */}

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-2"
        >
          <label className="input">
            <input type="search" name="search" placeholder="Search Location " />
          </label>
          <button className="btn btn-primary">
            <FaSearch />
            Search
          </button>
        </form>
      </div>
      <div className="h-[400px] md:h-[800px] border mt-10">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[400px] md:h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area :{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
