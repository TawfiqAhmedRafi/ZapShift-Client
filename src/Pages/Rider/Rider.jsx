import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import riderImg from "../../assets/agent-pending.png"

import Swal from "sweetalert2";

const Rider = () => {
  const serviceCenters = useLoaderData();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: "region" });
  const districtByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const handleBeARider = (data) => {
    console.log(data);
    axiosSecure.post('/riders',data)
    .then(res=>{
      if(  res.data.insertedId){
         Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Your application has been submitted . We will reach out to you within 2 weeks",
                      showConfirmButton: false,
                      timer: 1500,
                    });
      }
    })
  };
  return (
    <div className="bg-base-100 p-20 rounded-2xl">
      <h2 className="text-4xl py-5 text-secondary font-bold">Be a Rider</h2>
      <p className="text-sm text-[#606060]">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal <br /> packages to business shipments — we deliver
        on time, every time.
      </p>
      <div className="border-t border-dashed my-5"></div>

     <div className="flex flex-col md:flex-row justify-between items-start gap-10">
         <form onSubmit={handleSubmit(handleBeARider)} className=" text-black flex-1">
        
        <div className="">
          {/* sender */}

          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl text-secondary font-bold">Tell us about yourself</h4>
              {/* Your name */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Your Name"
              />
              <label className="label">Driving License Number</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License Number"
              />
              {/*  email */}
              <label className="label">Your Email</label>
              <input
                type="email"
                {...register("Email")}
                className="input w-full"
                defaultValue={user?.email}
                placeholder="Email"
                readOnly
              />

              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Your Region</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* sender districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Your District</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(riderRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Nd  */}
              <label className="label mt-4">NID No</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="nid"
              />
              {/*  phone */}
              <label className="label mt-4">Your Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="input w-full"
                placeholder="Your Phone Number"
              />
              {/*  Bike Model & Year */}
              <label className="label mt-4">Bike Model & Year</label>
              <input
                type="text"
                {...register("bikeModelYear")}
                className="input w-full"
                placeholder="Bike Model & Year"
              />
              {/*  Bike Reg */}
              <label className="label mt-4">Bike Registration Number</label>
              <input
                type="text"
                {...register("bikeReg")}
                className="input w-full"
                placeholder="Bike Registration Number"
              />

              {/* rider info */}
              <label className="label mt-4">Tell us about Yourself</label>
              <textarea
                {...register("aboutRider")}
                className="textarea w-full"
                placeholder="Tell us about Yourself"
              ></textarea>
            </fieldset>
          </div>
          {/* receiver */}
        </div>
        {/* submit button */}
        <input
          type="submit"
          className="btn btn-primary mt-4 w-full text-black"
          value="Submit"
        />
      </form>
      <div className="flex-1 hidden md:block">
        <img src={riderImg} alt="" />
      </div>
     </div>
    </div>
  );
};

export default Rider;
