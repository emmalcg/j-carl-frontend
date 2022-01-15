import useEmblaCarousel from "embla-carousel-react"
import { DotButton, PrevButton, NextButton, NextArrow, PrevArrow } from "./CarouselButtons";
import { useState, useEffect, useCallback } from "react";

import MyImage from './MyImage';

export default function Carousel({artwork}) {
  const [fullScreen, setFullScreen] = useState(false)

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
    <div className={`order-first overflow-hidden relative ${fullScreen && "absolute top-0 left-0 right-0 bottom-0"} `} ref={emblaRef}>
      <div className="flex">
        {
          artwork.media.data.map(image =>
            <div key={image.attributes.url} className="relative flex-[0_0_100%]">
              <MyImage image={image.attributes}/>
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
      <div className="flex align-center justify-between">
        <button onClick={() => {setFullScreen(!fullScreen)}}>Fullscreen</button>
        <div className="flex">
          <PrevArrow onClick={scrollPrev} enabled={true} />
          <span className="p-1">
            <p className="">{selectedIndex + 1} / {length}</p>
          </span>
          <NextArrow onClick={scrollNext} enabled={true} />
        </div>
      </div>
    </div>
  )

}