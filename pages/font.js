import Image from "next/image";
import AppHeader from "../components/AppHeader";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import { useState } from "react";

export default function fontPage() {
  const [fontTest, setFontTest] = useState(
    `Font published by Art Metropole and Mercier Union in 2002 with accompanying 'user's manual', Content 1.0.`
  );

  const [bold, setBold] = useState(false)

  return (
    <>
      <AppHeader currentType="about" />
      <div className="flex flex-col mb-4">
        <BackButton link="/web" />
      </div>
      <main className="min-h-[100vh]">
        <div className="flex mb-6 space-x-2 align-center">
          <h2 className="text-lg font-medium">Content font</h2>
          <span>|</span>
          <a
            href="/content-font-to-go.zip"
            download="content-font-to-go.zip"
            className="text-lg underline hover:font-medium"
          >
            download
          </a>
        </div>
        <section className="max-w-[500px] min-h-[80vh]">
          <label htmlFor="font-test" className="sr-only">
            Test the "content" font here
          </label>
          <textarea
            id="font-test"
            value={fontTest}
            onChange={(event) => setFontTest(event.target.value)}
            className="border border-black p-2 w-full min-h-[100px]"
          ></textarea>
          <div className="flex">
            <button
              onClick={() => setBold(false)}
              className={`flex mr-5 border border-black mt-2 px-2  ${
                !bold ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Content regular
            </button>
            <button
              onClick={() => setBold(true)}
              className={`flex mr-auto border border-black mt-2 px-2  ${
                bold ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Content black
            </button>
          </div>
          <div
            style={{ fontFamily: bold ? "ContentBlack" : "Content" }}
            className="mt-10 text-4xl min-h-[70vh]"
          >
            {fontTest}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
