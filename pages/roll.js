import Image from "next/image";
import AppHeader from "../components/AppHeader";
import BackButton from "../components/BackButton";
import roll from "../public/roll.webp";
import Footer from "../components/Footer";

export default function rollPage() {
  return (
    <>
      <AppHeader currentType="about" />
      <div className="flex flex-col mb-4">
        <BackButton link="/web" />
      </div>
      <main>
        <div className="flex mb-10 space-x-2 align-center">
          <h2 className="text-lg font-medium">roll</h2>
          <span>|</span>
          <a
            href="/washing.gif"
            download="washing.gif"
            className="text-lg underline hover:font-medium"
          >
            download
          </a>
        </div>
        <section>
          <Image priority={true} src={roll} height={560} width={280} />
        </section>
      </main>
      <Footer />
    </>
  );
}
