import Image from "next/image";
import washing from "../public/washing.gif";

export default function Loader() {
  return (
    <section className="h-[80vh] flex justify-center items-center">
      <Image priority={true} src={washing} height={146} width={245} />
    </section>
  );
}