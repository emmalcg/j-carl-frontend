import AppHeader from "../components/AppHeader";

import Footer from "../components/Footer";

export default function washingMachinePage() {
  return (
    <>
      <AppHeader
        currentPath="/web"
        currentType="about"
      />
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
              <a
                href="https://the-balcony.netlify.app/"
                target="_blank"
                className="underline cursor-alias"
              >
                <span>Font</span>, 2000-2005
              </a>
            </li>
            <li className="list-none flex flex-col md:flex-row mt-2">
              <a
                href="https://the-balcony.netlify.app/"
                target="_blank"
                className="underline cursor-alias"
              >
                <span>Washing Machine</span>, 2000-2005
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}