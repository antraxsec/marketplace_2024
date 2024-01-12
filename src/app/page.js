"use client"
import Image from 'next/image'
import Buscador from './item/Buscador'
import { useEffect, useState } from 'react';
import Buscar from './Buscar';
import { useProductos } from '@/context/Context';
import Buscar1 from './Buscar1';


export default function Home() {







  return (
    <div>

      <Buscar />
      {/* <Buscar1 /> */}
    </div>
  )
}
