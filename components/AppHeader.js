import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RfqHeader from "./RfqHeader";

const SubMenu = ({ nav, currentPath }) => (
  <ul className="flex">
    {nav.map((year) => (
      <li key={year?.page?.data?.attributes.slug}>
        <Link href={`/${year?.page?.data?.attributes.slug}`}>
          <a
            className={`block py-2 px-4 xs:px-4 hover:underline text-[14px] ${
              currentPath.includes(year?.page?.data?.attributes.slug) &&
              `italic underline`
            }`}
          >
            {year.page.data.attributes.title}
          </a>
        </Link>
      </li>
    ))}

  </ul>
);

export default function AppHeader({
  currentPath = "/",
  currentType = "",
}) {

  const { data: nav, loading: navLoading, error: navError } = useQuery(GET_NAVIGATION);

  const { data: page, loading: sublinkLoading, error: sublinkError } = useQuery(GET_SUBLINKS);

  const sublinks = page?.pages?.data[0].attributes?.sublink

  const navigation = nav?.global?.data?.attributes?.navigation.links

  const router = useRouter();

  const [isRFQ, setIsRFQ] = useState(
    router.pathname.includes("/rfq") ? true : false
  );
  const [workOpen, setWorkOpen] = useState(
    currentType === "Work" || router.pathname.includes("/work")
  );

  useEffect(() => {
    router.pathname.includes("/rfq") ? setIsRFQ(true) : setIsRFQ(false);
    router.pathname.includes("/cv") ||
      (router.pathname.includes("/writing") && setWorkOpen(false));
    currentType === "About" && setWorkOpen(false);
  }, [router.pathname, currentType]);

  return (
    <header className="text-xs xs:text-sm sm:text-base mt-2 sm:mt-4 mb-4">
      {!isRFQ && (
        <span>
          <div className="flex justify-between border border-black relative">
            <div className="no-underline flex w-full">
              <h1 className="flex justify-items-center">
                <Link href="/">
                  <a
                    className={`text-1xl font-bold border-r border-black px-2 py-2 xs:px-4 sm:px-6 hover:underline hover:bg-gray-200`}
                  >
                    James Carl
                  </a>
                </Link>
              </h1>

              <nav className="grow">
                <ul className="flex w-full">
                  {!navLoading &&
                    navigation.map((item, i) => (
                      <li
                        key={`${item.label}-${i}`}
                        className={`flex border-r border-black hover:bg-gray-200 ${
                          workOpen && item.label === "Work" && "bg-gray-200"
                        }`}
                      >
                        <Link
                          href={item.page?.data?.attributes?.slug ? `/${item.page.data.attributes.slug}` : item.href}
                        >
                          <a
                            target={item.target}
                            className={`py-2 px-2 xs:px-3 sm:px-4 font-medium hover:underline hover:bg-gray-200 ${
                              item.isExternal && `cursor-alias`
                            }`}
                          >
                            {item.label}
                          </a>
                        </Link>
                        {item.label === "Work" &&
                          workOpen &&
                          !sublinkLoading && (
                            <div className="hidden lg:block">
                              <SubMenu
                                nav={sublinks}
                                currentPath={currentPath}
                              />
                            </div>
                          )}
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
          {workOpen && !sublinkLoading && (
            <div className="border border-black border-t-0 lg:hidden">
              <SubMenu nav={sublinks} currentPath={currentPath} />
            </div>
          )}
        </span>
      )}
      {isRFQ && <RfqHeader />}
    </header>
  );
}

const GET_SUBLINKS = gql`
  query GET_SUBLINKS {
    pages(filters: { slug: { eq: "work" } }) {
      data {
        attributes {
          sublink {
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
`;

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
