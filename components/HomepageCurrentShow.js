import Image from "next/image";
import pocket from "../public/JC_pocket.jpg";

export default function HomepageCurrentShow() {
  return (
    <div style={{ height: `calc(100vh - 200px)`, marginTop: "100px" }}>
      <a
        href="https://trepanierbaer.com/exhibition/james-carl-standrds/"
        className="hover:underline"
      >
        Standrds, October 5th - November 2nd 2024 at TrépanierBaer &#x2192;
      </a>

      <div className="relative h-[95%] mt-4">
        <Image
          priority={true}
          src={pocket}
          alt="My Image"
          layout="fill" // Will size the image to fill the parent container
          objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
          objectPosition="top" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
        />
      </div>
    </div>
  );
}
