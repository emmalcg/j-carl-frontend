import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
            {item.title}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

const workSubLinks = [
  { slug: "/work-date", title: "Date" },
  { slug: "/work-title", title: "Title" }
];

const mainNav = [
  {
    
  }
]

export default function AppHeader({
  currentPath = "/",
  currentType = "",
}) {

  const { data: nav, loading: navLoading, error: navError } = useQuery(GET_NAVIGATION);

  const navigation = nav?.global?.data?.attributes?.navigation.links

  const router = useRouter();

  console.log({navigation})

  const [isRFQ, setIsRFQ] = useState(
    router.pathname.includes("/rfq") ? true : false
  );

  const [workOpen, setWorkOpen] = useState(
    currentType === "Work" || router.pathname.includes("/work-")
  )

  console.log({currentPath})
  useEffect(() => {
    router.pathname.includes("/rfq") ? setIsRFQ(true) : setIsRFQ(false);
    router.pathname.includes("/cv") ||
      (router.pathname.includes("/writing") && setWorkOpen(false));
    currentType === "About" && setWorkOpen(false);
  }, [router.pathname, currentType]);

  return (
    <header className="text-xs xs:text-sm sm:text-base mt-8 sm:mt-8 mb-4">
      {!isRFQ && (
        <span>
          <div className="flex justify-between relative">
            <div className="no-underline flex w-full items-end">
              <h1 className="flex justify-items-center ">
                <Link href="/">
                  <a
                    className={`rounded-tl-lg text-1xl font-bold border border-black pl-2 py-2 pr-4 sm:pl-4 sm:pr-9 hover:underline hover:bg-gray-200 text-nowrap ${
                      router.pathname.includes("/work-date") && "border-r-0"
                    }`}
                  >
                    James Carl
                  </a>
                </Link>
              </h1>

              <nav className="grow">
                <ul className="flex w-full items-end">
                  {!navLoading &&
                    navigation.map((item, i) => {
                      const onPath =
                        item.page?.data?.attributes?.slug ===
                        router.pathname.substring(1);

                      return (
                        <>
                          <li
                            key={`${item.label}-${i}`}
                            className={`flex border border-black hover:bg-gray-200 ${
                              onPath
                                ? "bg-gray-200 relative pt-2 rounded-t-lg"
                                : "border-l-0 "
                            } ${
                              i === navigation.length - 1 && "rounded-tr-lg"
                            } ${
                              router.pathname.includes("writing") &&
                              item.label == "Work" &&
                              "border-r-0"
                            } ${
                              router.pathname.includes("recent") &&
                              item.label == "About" &&
                              "border-r-0"
                            }`}
                          >
                            <Link
                              href={
                                item.page?.data?.attributes?.slug
                                  ? `/${item.page.data.attributes.slug}`
                                  : item.href
                              }
                            >
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
                                      key={item.title}
                                    className="border border-black border-l-0 text-xs sm:text-sm pl-2 py-2 pr-2 sm:pr-9">
                                      <span className="invisible">
                                        {item.title}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                        </>
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

const GET_NAVIGATION = gql`
  query GET_NAVIGATION {
    global {
      data {
        attributes {
          navigation {
            links {
              label
              href
              target
              isExternal
              page {
                data {
                  attributes {
                    slug
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data: globalData } = await client.query({
    query: gql`
      query GET_NAVIGATION {
        global {
          data {
            attributes {
              navigation {
                links {
                  label,
                  href,
                  target,
                  isExternal,
                  page {
                    data {
                      attributes {
                        slug,
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const navigation = globalData.global.data.attributes;

  return {
    props: {
      navigation: navigation,
    },
  };
}
