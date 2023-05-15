import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";

export default function MyImage({ image, index, size }) {

  console.log({image})
  const imgSlug = image.formats.large.url

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
    <a href={image.formats.large.url}>
      <Image
        src={url}
        alt={image.caption}
        width={imageWidth}
        height={imageHeight}
        priority={index == 0 ? true : false}
        placeholder="blur"
        blurDataURL={urlBlurred}
      />
    </a>
  );
}
