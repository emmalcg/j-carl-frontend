import Image from "next/image";
import washing from "../public/washing.gif";

export default function Loader() {
  return (
      <Image priority={true} src={washing} height={146} width={245} />
  );
}