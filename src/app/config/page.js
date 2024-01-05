"use client";
import Card from "@/components/Card";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
// Asegúrate de que este es el camino correcto a tu componente Card


const MainComponent = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Splide
        options={{
          type: "slide",
          perPage: 2,
          perMove: 1,
          gap: "10",
          pagination: false,
          arrows: true,
          padding: 100,
          breakpoints: {
            420: {
              perPage: 1,
            },
            640: {
              perPage: 2,
            },
          },
        }}
        className="max-w-screen-xl mx-auto"
      >
        {/* Aquí repetirías tu componente de producto dentro de SplideSlide tantas veces como sea necesario */}
        <SplideSlide>
          <Card />
        </SplideSlide>
        <SplideSlide>
          <Card />
        </SplideSlide>
        <SplideSlide>
          <Card />
        </SplideSlide>
        <SplideSlide>
          <Card />
        </SplideSlide>
        {/* ... */}
      </Splide>
    </main>
  );
};

export default MainComponent;
