import React from "react";

const DashboardFormInput = ({ ...props }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between my-0">
      <label className="my-auto">{props.label} </label>
      <input
        type={props.type}
        className={`${props.width} text-md rounded-md p-1 shadow-blur focus:outline focus:outline-2 focus:outline-color3`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
};

export default DashboardFormInput;
