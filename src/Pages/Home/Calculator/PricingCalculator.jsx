import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const PricingCalculator = () => {
  const serviceCenters = useLoaderData();
  const { register, handleSubmit, control, reset } = useForm();
  const [cost, setCost] = useState(null);

  const onSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let calculatedCost = 0;

    if (isDocument) {
      calculatedCost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        calculatedCost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        calculatedCost = minCharge + extraCharge;
      }
    }

    setCost(calculatedCost);
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
    <div className="bg-base-100 p-20 rounded-2xl">
      <h2 className="text-5xl font-bold text-secondary">Pricing Calculator</h2>
      <p className="max-w-xl text-sm text-[#606060] pt-5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="border-t border-dashed my-5"></div>

      {/* Form + Cost Display */}
      <h1 className="text-2xl mt-10 text-secondary font-bold mb-2 text-center">
        Calculate Your Cost
      </h1>
      <div className=" rounded-lg flex flex-col md:flex-row max-w-3xl mx-auto p-4 gap-6">
        {/* Form */}
        <div className="flex-1 bg-white p-4 rounded-lg ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Parcel Type */}
            <fieldset className="flex gap-4 items-center">
              <legend className="font-semibold">Parcel Type</legend>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  {...register("parcelType", { required: true })}
                  value="document"
                  defaultChecked
                />
                Document
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  {...register("parcelType", { required: true })}
                  value="parcel"
                />
                Non Document
              </label>
            </fieldset>

            {/* Sender Region & District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick Up Regions</legend>
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
              <legend className="fieldset-legend">Pick Up Districts</legend>
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

            {/* Receiver Region & District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Delivery Region</legend>
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
              <legend className="fieldset-legend">Delivery District</legend>
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

            {/* Parcel Weight */}
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.01"
              {...register("parcelWeight", { required: true, min: 0.1 })}
              placeholder="Parcel Weight"
              className="input w-full border p-2 rounded"
            />

            {/* Buttons */}
            <div className="flex gap-4 justify-between mt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setCost(null);
                }}
                className="btn btn-outline btn-primary hover:btn-primary"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1" // <-- flex-1 makes it take remaining space
              >
                Calculate
              </button>
            </div>
          </form>
        </div>

        {/* Cost Display */}
        <div className="flex-1 p-4 rounded-lg flex items-center justify-center">
          {cost !== null ? (
            <div className="text-center">
              <p className="text-4xl font-semibold">{cost} Tk</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Your calculated cost will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
