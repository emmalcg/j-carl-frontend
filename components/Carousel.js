import useEmblaCarousel from "embla-carousel-react"
import { DotButton, PrevButton, NextButton, NextArrow, PrevArrow } from "./CarouselButtons";
import { useState, useEffect, useCallback } from "react";

import MyImage from './MyImage';

export default function Carousel({artwork}) {

  const length = artwork.media.data.length 
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: true,
    inViewThreshold: 0.7,
  })

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  console.log(image.attributes)
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
    <div className="order-first overflow-hidden relative" ref={emblaRef}>
      <div className="flex">
        {
          artwork.media.data.map((image, index) =>
            <div key={image.attributes.url} className="relative flex-[0_0_100%]">
              <MyImage image={image.attributes} index={index} size="large"/>
            </div>
          )
        }
        
      </div>
      <PrevButton onClick={scrollPrev} enabled={true} />
      <NextButton onClick={scrollNext} enabled={true} />
      <div className="flex justify-center list-none">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      <div className="flex align-center justify-end">
        { length > 1 && <PrevArrow onClick={scrollPrev} enabled={true} /> }
        <span className="p-1">
          <p className="">{selectedIndex + 1} / {length}</p>
        </span>
        { length > 1 && <NextArrow onClick={scrollNext} enabled={true} /> }
      </div>
    </div>
  )

}

