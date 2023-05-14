import Image from "next/image";
import AppHeader from "../components/AppHeader";
import BackButton from "../components/BackButton";
import washing from '../public/washing.gif'
import Footer from "../components/Footer";

export default function washingMachinePage() {
  return (
    <>
      <AppHeader currentType="about" />
      <div className="flex flex-col mb-4">
        <BackButton />
      </div>
      <main>
        <div className="flex mb-10 space-x-2 align-center">
          <h2 className="text-lg font-medium">washing gif</h2>
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
          <Image priority={true} src={washing} height={146} width={245} />
        </section>
      </main>
      <Footer />
    </>
  );
}