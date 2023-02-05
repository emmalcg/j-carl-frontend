import Image from "next/image";

export default function ImageNoLoading() {

  return (
    <Image
      src={url}
      alt={image.caption}
      width="100%"
      height="100%"
      layout="responsive"
      objectFit="contain"
      priority={index == 0 ? true : false}
    />
  );
}