import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import RfqHeader from "./RfqHeader";

const SubMenu = ({ nav, currentPath }) => (
  <ul className="flex">
    {nav.map((item, i) => (
      <li
        onClick={() => {
          localStorage.setItem("showLoading", false);
        }}
        key={`${item.slug}-subnav`}
      >
        <Link href={item.slug}>
          <a
            className={`block pl-2 py-2 pr-2 sm:pr-9 hover:underline text-xs sm:text-sm ${
              currentPath.includes(item.slug) &&
              `bg-gray-200 border border-black border-t-0 rounded-b-lg`
            }`}
          >
            {item.label}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

const workSubLinks = [
  { slug: "/work-date", label: "Date" },
  { slug: "/work-title", label: "Title" }
];

const mainNav = [
  {
    slug: "/work-date",
    label: "Work",
    isExternal: false,
    target: "_self",
  },
  {
    slug: "/writing",
    label: "Writing",
    isExternal: false,
    target: "_self",
  },
  {
    slug: "https://en.wikipedia.org/wiki/James_Carl",
    label: "About",
    isExternal: true,
    target: "_blank",
  },
  {
    slug: "/recent",
    label: "Recent",
    isExternal: false,
    target: "_self",
  },
];

export default function AppHeader({
  currentPath = "/",
  currentType = "",
}) {

  const router = useRouter();

  const [isRFQ, setIsRFQ] = useState(
    router.pathname.includes("/rfq") ? true : false
  );

  useEffect(() => {
    router.pathname.includes("/rfq") ? setIsRFQ(true) : setIsRFQ(false);
  }, [router.pathname, currentType]);

  return (
    <header className="text-xs xs:text-sm sm:text-base pt-8 sm:pt-8 pb-4 fixed bg-white min-w-full">
      {!isRFQ && (
        <span>
          <div className="flex justify-between relative">
            <div className="no-underline flex w-full items-end">
              <h1 className="flex justify-items-center ">
                <Link href="/">
                  <a
                    className={`rounded-tl-lg text-1xl font-bold border border-black pl-2 py-2 pr-4 sm:pl-4 sm:pr-9 hover:underline hover:bg-gray-200 text-nowrap ${
                      router.pathname.includes("/work") && "border-r-0"
                    }`}
                  >
                    James Carl
                  </a>
                </Link>
              </h1>

              <nav className="grow">
                <ul className="flex w-full items-end">
                  {
                    mainNav.map((item, i) => {
                      let onPath =
                        item.slug ===
                        router.pathname;

                      if(item.slug === '/work-date' && router.pathname === '/work-title') {
                        onPath = true
                      }

                      return (
                        <Fragment key={`${item.label}-${i}`}>
                          <li
                            key={`${item.label}-${i}`}
                            className={`flex border border-black hover:bg-gray-200 ${
                              onPath
                                ? "bg-gray-200 relative pt-2 rounded-t-lg"
                                : "border-l-0 "
                            } ${i === mainNav.length - 1 && "rounded-tr-lg"} ${
                              router.pathname.includes("writing") &&
                              item.label == "Work" &&
                              "border-r-0"
                            } ${
                              router.pathname.includes("recent") &&
                              item.label == "About" &&
                              "border-r-0"
                            }`}
                          >
                            <Link href={item.slug}>
                              <a
                                target={item.target}
                                className={`pl-2 py-2 pr-2 sm:pr-9 font-medium hover:underline ${
                                  item.isExternal && `cursor-alias`
                                } `}
                              >
                                {item.label}
                              </a>
                            </Link>
                          </li>
                          {item.label === "Work" &&
                            router.pathname.includes("/work-") && (
                              <div className="hidden sm:flex">
                                {workSubLinks.map((item) => {
                                  return (
                                    <div
                                      key={item.label}
                                      className="border border-black border-l-0 text-xs sm:text-sm pl-2 py-2 pr-2 sm:pr-9"
                                    >
                                      <span className="invisible">
                                        {item.label}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                        </Fragment>
                      );
                    })}
                </ul>
              </nav>
            </div>
          </div>
          {router.pathname.startsWith("/work-") && (
            <div className="flex">
              <div className="w-[103px] sm:w-[209px]"></div>
              <SubMenu nav={workSubLinks} currentPath={router.pathname} />
            </div>
          )}
        </span>
      )}
      {isRFQ && <RfqHeader />}
    </header>
  );
}

