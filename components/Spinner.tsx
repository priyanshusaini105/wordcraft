import React from "react";
import { RingLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="flex items-center flex-col w-full h-screen justify-center gap-4">
        <RingLoader color="#4A7C59" size={100}/>
        <h1 className='md:text-7xl text-2xl font-nunito text-primary underline'>WordCraft</h1>
    </div>
  );
};

export default Spinner;
