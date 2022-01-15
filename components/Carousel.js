import { useEmblaCarousel } from 'embla-carousel-react'
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function Carousel(props) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: true,
    inViewThreshold: 0.7,
  })

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    // Carousel viewport
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {props.image.map((image) => (
          <div key={image.url} className="relative flex flex-none flex-wrap lg:flex-nowrap w-full">
            <div className="overflow-hiden cursor-pointer">
              
            </div>

          </div>
        ))}
      </div>
    </div>
  )

}