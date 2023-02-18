import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";

export default function MyImage({ image, index, size }) {
  console.log({image})
  const imgSlug = image.url;

  let imageHeight = image.formats[size].height;
  let imageWidth = image.formats[size].width;

  if(imageHeight > imageWidth && size != 'small') {
    imageHeight = image.formats.medium.height;
    imageWidth = image.formats.medium.width;
  }

  const url = buildUrl(`${imgSlug}`, {
    cloud: {
      cloudName: "dgonyuzzz",
    },
  });

  const urlBlurred = buildUrl(`${image.formats[size].url}`, {
    cloud: {
      cloudName: "dgonyuzzz",
    },
    transformations: {
      effect: "blur:1000",
      quality: 1,
    },
  });
  return (
    //<div
    //  style={{
    //    position: "relative",
    //    height: 0,
    //    paddingTop: `${(imageHeight / imageWidth) * 100}%`,
    //    backgroundImage: `url(${urlBlurred})`,
    //    backgroundPosition: "center center",
    //    backgroundSize: "100%",
    //  }}
    //>
      //<div className="absolute inset-0">
      <a href={image.url}>
        <Image
          src={url}
          alt={image.caption}
          width={imageWidth}
          height={imageHeight}
          //layout="responsive"
          priority={index == 0 ? true : false}
        />
      </a>
      //</div>
    //</div>
  );
}
