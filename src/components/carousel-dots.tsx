"use client";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function CarouselDots({ api }: { api: CarouselApi | undefined }) {
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };

    sync();
    api.on("select", sync);
    api.on("reInit", sync);

    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Ir para o slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={`h-3.5 cursor-pointer rounded-[14px] bg-[#7189A7] drop-shadow-2xl transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            index === selected ? "w-9" : "w-3.5"
          }`}
        />
      ))}
    </div>
  );
}
