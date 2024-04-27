//import Image from "next/image";
//import marble from "../public/marble.jpeg";

export default function HomepageSingleImage() {
  return (
    <div style={{ height: `calc(100vh - 200px)`, marginTop: "120px" }}>
      <a
        href="https://privateviews.artlogic.net/2/a6bfc670af5a781b652ec6/"
        className="hover:underline"
      >
        Conformity, April 29th - May 19th 2023 at Nicholas Metivier &#x2192;
      </a>

      <div className="relative h-[95%] mt-4">
        <a
          href="https://bordercrossingsmag.com/article/james-carl2"
          className="hover:underline"
        >
          Exhibition Review &#x2192;
        </a>
        {/*<Image
          priority={true}
          src={marble}
          alt="My Image"
          layout="fill" // Will size the image to fill the parent container
          objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
          objectPosition="top" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
        />*/}
      </div>
    </div>
  );
}
