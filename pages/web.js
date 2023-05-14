import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppHeader from "../components/AppHeader";

import Footer from "../components/Footer";
import Link from "next/link";

export default function webPage() {

  return (
    <>
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
          </ul>
          <h3 className="mt-4 font-semibold">Downloads</h3>
          <ul>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/font">
                <a className="underline">
                  <span>Content Font</span>
                </a>
              </Link>
            </li>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <Link href="/washing-machine">
                <a className="underline">
                  <span>Washing Machine</span>
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