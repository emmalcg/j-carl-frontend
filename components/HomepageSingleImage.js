import Image from "next/image";
import homepagePic from "../public/jamesMarbleStudio.jpg";

export default function HomepageSingleImage() {
  return (
    <div style={{ height: `calc(100vh - 100px)` }}>
      <a
        href="https://privateviews.artlogic.net/2/a6bfc670af5a781b652ec6/"
        className="hover:underline"
      >
        Conformity, April 29th - May 19th 2023 at Nicholas Metivier &#x2192;
      </a>
      <div className="relative h-[95%] mt-4">
        <Image
          priority={true}
          src={homepagePic}
          alt="My Image"
          layout="fill" // Will size the image to fill the parent container
          objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
          objectPosition="top" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
        />
      </div>
    </div>
  );
}
