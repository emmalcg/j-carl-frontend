import Image from "next/image";
import homepagePic from "../public/jamesMarbleStudio.jpg";

export default function HomepageImage() {
  return (
    
      <div className="relative h-full mt-4">
        <Image
          src={homepagePic}
          alt="My Image"
          layout="fill" // Will size the image to fill the parent container
          objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
          objectPosition="top" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
        />
      </div>
  );
}
