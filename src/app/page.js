"use client"
import Image from 'next/image'
import Buscador from './item/Buscador'
import { useEffect, useState } from 'react';
import Buscar from './Buscar';
export default function Home() {

  return (
    <div className=" ">
      <Buscar />
    </div>
  );
}
