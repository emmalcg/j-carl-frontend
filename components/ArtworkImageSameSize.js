import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";
import { useEffect, useState } from "react";

export default function ArtworkImageSameSize({ image, index, size }) {
  const imgSlug = image.formats.large.url;

  let imageHeight = image.formats[size].height;
  let imageWidth = image.formats[size].width;

  if (imageHeight > imageWidth && size != "small") {
    imageHeight = image.formats.medium.height;
    imageWidth = image.formats.medium.width;
  }

  const url = buildUrl(`${imgSlug}`, {
    cloud: {
      cloudName: "dgonyuzzz",
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide placeholder after the timeout
    }, 1000); // Adjust timeout (in milliseconds) as needed
    console.log("rerun");

    return () => clearTimeout(timer); // Clear timeout if component unmounts early
  }, [image]);

  const urlBlurred = buildUrl(`${image.formats.small.url}`, {
    cloud: {
      cloudName: "dgonyuzzz",
    },
    transformations: {
      effect: "blur:1000",
      quality: 1,
    },
  });

  return (
    <>
      {/*{isLoading && (
        <div
          className="animate-pulse w-100 bg-slate-300"
          style={{
            height: imageHeight,
          }}
        />
      )}
      {!isLoading && (
        <Image
          src={url}
          alt={image.caption}
          width={imageWidth}
          priority
          height={imageHeight}
          // placeholder="blur"
          // blurDataURL={urlBlurred}
          //onLoadingComplete={() => loadComplete()}
        />
      )}*/}

      <div className={`relative w-full h-80`}>
        <Image
          src={url}
          alt={image.caption}
          objectPosition='center'
          ////objectPosition={center ? "right" : "left"}
          layout="fill"
          objectFit='contain'
          priority={false}
          placeholder="blur"
          blurDataURL={urlBlurred}
        />
      </div>
    </>
  );
}
