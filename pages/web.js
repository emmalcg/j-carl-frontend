import Head from "next/head";
import AppHeader from "../components/AppHeader";

import Footer from "../components/Footer";
import Link from "next/link";

export default function webPage() {

  return (
    <>
      <Head>
        <title>Web projects by James Carl</title>
        <meta name="description" content="James Carl artist web projects spanning from the early 2000s to present. " />
      </Head>
      <AppHeader currentPath="/web" currentType="about" />
      <main>
        <div className="flex flex-col mb-3.5">
          <h2 className="text-lg font-semibold">Web</h2>
          <h3 className="mt-4 font-semibold">Projects</h3>
          <ul>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <a
                href="https://the-balcony.netlify.app/"
                target="_blank"
                className="underline cursor-alias"
              >
                <span>The Balcony</span>, 2000-2005
              </a>
            </li>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/vanity-search">
                <a className="underline">
                  <span>vanity search, 2022</span>
                </a>
              </Link>
            </li>
          </ul>
          <h3 className="mt-4 font-semibold">Downloads</h3>
          <ul>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/font">
                <a className="underline">
                  <span>Content Font, 2002</span>
                </a>
              </Link>
            </li>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/roll">
                <a className="underline">
                  <span>roll, 2020</span>
                </a>
              </Link>
            </li>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/washing-machine">
                <a className="underline">
                  <span>laundry, 2018</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}