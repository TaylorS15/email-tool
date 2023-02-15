import React from "react";

const DashboardRequiredFormInput = ({ ...props }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between my-0">
      <label className="my-auto relative">
        {props.label}
        <span className="absolute text-xs  text-lightred"> *</span>
      </label>
      <input
        type={props.type}
        className={`${props.width} text-md rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3`}
        placeholder={props.placeholder}
        required
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
};

export default DashboardRequiredFormInput;
