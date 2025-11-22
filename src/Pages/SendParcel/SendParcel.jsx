import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    console.log("cost", cost);
    Swal.fire({
      title: "Agree with the cost? ",
      text: `You will be charged ${cost} taka !!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm & Continue Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        //  save parcel to database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel ", res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels')
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Parcel has Created . Please Pay",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });

    console.log(isSameDistrict, data);
  };
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };
  return (
    <div className="p-5 rounded-2xl bg-white">
      <h2 className="text-3xl font-bold text-secondary md:text-5xl ">
        Send A Parcel
      </h2>
      <p className="mt-7 font-bold">Enter your parcel details</p>

      <div className="border-t border-dashed my-5"></div>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="p-4 text-black"
      >
        {/* parcel type */}
        <div className="">
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info , name , weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 my-5">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight(kg)</label>
            <input
              type="number"
              step="0.01"
              {...register("parcelWeight", {
                required: true,
                valueAsNumber: true,
                min: 0.1,
              })}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        <div className="border-t border-dashed my-5"></div>
        {/* two column */}
        <div className="grid grid-cols-1 md:gap-10 gap-5 md:grid-cols-2">
          {/* sender */}

          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl fond-semibold">Sender Details</h4>
              {/* Sender name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
              {/* Sender email */}
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full"
                defaultValue={user?.email}
                placeholder="Email"
              />
              {/* Sender phone */}
              <label className="label mt-4">Sender Phone Number</label>
              <input
                type="text"
                {...register("senderPhoneNumber")}
                className="input w-full"
                placeholder="Sender Phone Number"
              />
              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Regions</legend>
                <select
                  {...register("senderRegion")}
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
                <legend className="fieldset-legend">Sender Districts</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Sender address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />

              {/* pick up info */}
              <label className="label mt-4">Pickup Instruction</label>
              <textarea
                {...register("pickUpInstruction")}
                className="textarea h-12 w-full"
                placeholder="Pick Up Instructions"
              ></textarea>
            </fieldset>
          </div>
          {/* receiver */}
          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl fond-semibold">Receiver Details</h4>
              {/* receiver name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {/* receiver Email */}
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />

              {/* receiver phone */}
              <label className="label mt-4">Receiver Phone Number</label>
              <input
                type="text"
                {...register("receiverPhoneNumber")}
                className="input w-full"
                placeholder="Receiver Phone Number"
              />

              {/* Receiver region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Regions</legend>
                <select
                  {...register("receiverRegion")}
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
              {/* Receiver districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Districts</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(receiverRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* receiver address */}
              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
              {/* delivery info */}
              <label className="label mt-4">Delivery Instruction</label>
              <textarea
                {...register("deliveryInstruction")}
                className="textarea h-12 w-full"
                placeholder="Delivery Instructions"
              ></textarea>
            </fieldset>
          </div>
        </div>
        {/* submit button */}
        <input
          type="submit"
          className="btn btn-primary mt-4 w-full text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
