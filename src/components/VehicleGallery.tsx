"use client";

import { useState } from "react";

const carImages: Record<string, string[]> = {
  "toyota-corolla": [
    "/images/cars/toyota_corolla.jpg",
    "/images/cars/toyota_corolla_02.jpg",
    "/images/cars/toyota_corolla_03.jpg",
    "/images/cars/toyota_corolla_04.jpg",
  ],
  "toyota-corolla-cross": [
    "/images/cars/toyota_corolla_cross.jpg",
    "/images/cars/toyota_corolla_cross_02.jpg",
    "/images/cars/toyota_corolla_cross_03.jpg",
    "/images/cars/toyota_corolla_cross_04.jpg",
  ],
  "toyota-hilux": [
    "/images/cars/toyota_hilux.jpg",
    "/images/cars/toyota_hilux_02.jpg",
    "/images/cars/toyota_hilux_03.jpg",
    "/images/cars/toyota_hilux_04.jpg",
  ],
  "volkswagen-polo": [
    "/images/cars/volkswagen_polo.jpg",
    "/images/cars/volkswagen_polo_02.jpg",
    "/images/cars/volkswagen_polo_03.jpg",
    "/images/cars/volkswagen_polo_04.jpg",
  ],
  "volkswagen-virtus": [
    "/images/cars/volkswagen_virtus.jpg",
    "/images/cars/volkswagen_virtus_02.jpg",
    "/images/cars/volkswagen_virtus_03.jpg",
    "/images/cars/volkswagen_virtus_04.jpg",
  ],
  "volkswagen-t-cross": [
    "/images/cars/volkswagen_t_cross.jpg",
    "/images/cars/volkswagen_t_cross_02.jpg",
    "/images/cars/volkswagen_t_cross_03.jpg",
  ],
  "chevrolet-onix": [
    "/images/cars/chevrolet_onix.jpg",
    "/images/cars/chevrolet_onix_02.jpg",
    "/images/cars/chevrolet_onix_03.jpg",
    "/images/cars/chevrolet_onix_04.jpg",
  ],
  "chevrolet-tracker": [
    "/images/cars/chevrolet_tracker.jpg",
    "/images/cars/chevrolet_tracker_02.jpg",
    "/images/cars/chevrolet_tracker_03.jpg",
    "/images/cars/chevrolet_tracker_04.jpg",
  ],
  "chevrolet-montana": [
    "/images/cars/chevrolet_montana.jpg",
    "/images/cars/chevrolet_montana_02.jpg",
    "/images/cars/chevrolet_montana_03.jpg",
    "/images/cars/chevrolet_montana_04.jpg",
  ],
  "hyundai-hb20": [
    "/images/cars/hyundai_hb20.jpg",
    "/images/cars/hyundai_hb20_02.jpg",
  ],
  "hyundai-hb20s": [
    "/images/cars/hyundai_hb20s.jpg",
    "/images/cars/hyundai_hb20s_02.jpg",
  ],
  "hyundai-creta": [
    "/images/cars/hyundai_creta.jpg",
    "/images/cars/hyundai_creta_02.jpg",
    "/images/cars/hyundai_creta_03.jpg",
    "/images/cars/hyundai_creta_04.jpg",
  ],
  "byd-dolphin": [
    "/images/cars/byd_dolphin.jpg",
    "/images/cars/byd_dolphin_02.jpg",
    "/images/cars/byd_dolphin_03.jpg",
    "/images/cars/byd_dolphin_04.jpg",
  ],
  "byd-yuan-plus": [
    "/images/cars/byd_yuan_plus.jpg",
    "/images/cars/byd_yuan_plus_02.jpg",
    "/images/cars/byd_yuan_plus_03.jpg",
    "/images/cars/byd_yuan_plus_04.jpg",
  ],
  "byd-seal": [
    "/images/cars/byd_seal.jpg",
    "/images/cars/byd_seal_02.jpg",
    "/images/cars/byd_seal_03.jpg",
    "/images/cars/byd_seal_04.jpg",
  ],
};

type VehicleGalleryProps = {
  carId: string;
  carName: string;
  fallbackImage: string;
};

export default function VehicleGallery({
  carId,
  carName,
  fallbackImage,
}: VehicleGalleryProps) {
  const images = carImages[carId] || [fallbackImage].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = images[currentIndex];

  function goToPrevious() {
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setCurrentIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-500 shadow-sm transition hover:bg-blue-50 hover:text-blue-700"
            aria-label="Foto anterior"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-500 shadow-sm transition hover:bg-blue-50 hover:text-blue-700"
            aria-label="Próxima foto"
          >
            ›
          </button>
        </>
      )}

      <div className="flex h-[240px] items-center justify-center px-5 sm:h-[360px] lg:h-[420px]">
        {currentImage ? (
          <img
            src={currentImage}
            alt={carName}
            className="h-full w-full object-contain drop-shadow-[0_30px_25px_rgba(15,23,42,0.12)]"
          />
        ) : (
          <div className="text-sm text-slate-500">Imagem não disponível</div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 px-4 pb-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === currentIndex ? "bg-blue-600" : "bg-slate-300"
              }`}
              aria-label={`Ver foto ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
