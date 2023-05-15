import Image from "next/image";
import AppHeader from "../components/AppHeader";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import { useState } from "react";

export default function fontPage() {
  const [fontTest, setFontTest] = useState('Content is a font that was made in the year of [insert year]. Change the text here to try it out and download for your own use above.')

  const [bold, setBold] = useState(false)

  return (
    <>
      <AppHeader currentType="about" />
      <div className="flex flex-col mb-4">
        <BackButton />
      </div>
      <main>
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
        <section className="max-w-[500px]">
          <label for="font-test" class="sr-only">
            Test the "content" font here
          </label>
          <textarea
            id="font-test"
            value={fontTest}
            onChange={(event) => setFontTest(event.target.value)}
            className="border border-black p-2 w-full min-h-[100px]"
          ></textarea>
          <button
            onClick={() => setBold(!bold)}
            className="flex mr-auto border border-black mt-2 px-2 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 p-1 pl-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            {bold ? `Content regular` : `Content black`}
          </button>
          <p
            style={{ fontFamily: bold ? "ContentBlack" : "Content" }}
            className="mt-10 text-4xl"
          >
            {fontTest}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
