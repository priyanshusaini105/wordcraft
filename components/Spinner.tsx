import React from "react";
import { RingLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="flex items-center w-full h-screen justify-center">
        <RingLoader color="#4A7C59" size={100}/>
    </div>
  );
};

export default Spinner;
