import React, { useState } from "react";
import Buscar from "../Buscar";



export default function Buscador() {



  return (
    <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
      <div className="w-screen max-w-2xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 p-4">
        <Buscar />
      </div>

    </div>


  );
}
