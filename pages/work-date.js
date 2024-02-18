import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Head from "next/head";
import { Decade } from "../components/Decade";
import Loader from "../components/Loader";

export default function workDate({ categories }) {
  const categoriesData = categories.categories.data

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setTimeout(() => {
      setShowLoader(false);
    }, 1700);
  }, []);

  return (
    <>
      <Head>
        <title>All artwork by James Carl</title>
        <meta
          name="description"
          content="artwork by James Carl spanning from the 1990s to present, sorted by decade."
        />
      </Head>
      <AppHeader currentPath="work" currentType="Work" />
      <main>
        <section>
          {isLoading && (
            <section
              className={`h-[80vh] flex justify-center items-center ${
                showLoader ? "opacity-100" : "opacity-0"
              } transition-opacity ease-out duration-500`}
            >
              <Loader />
            </section>
          )}
          {!isLoading && (
            <ul>
              {categoriesData.map((category, i) => {
                return (
                  <Decade
                    category={category}
                    key={`${category.attributes.slug}-${i}`}
                  />
                );
              })}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getCategories {
        categories(sort: ["title:desc"]) {
          data {
            attributes {
              type
              title
              slug
              series {
                data {
                  attributes {
                    title
                    yearEnded
                    yearStarted
                    slug
                    artworks {
                      data {
                        attributes {
                          title
                          archive
                          slug
                          yearStarted
                          yearEnded
                          description
                          materials
                          dimensions
                          location
                          client
                          thumbnail {
                            data {
                              attributes {
                                url
                                formats
                                caption
                                width
                                height
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              artworks(sort: "yearStarted:desc") {
                data {
                  attributes {
                    title
                    archive
                    slug
                    yearStarted
                    yearEnded
                    description
                    materials
                    dimensions
                    location
                    client
                    categories {
                      data {
                        attributes {
                          slug
                        }
                      }
                    }
                    series {
                      data {
                        attributes {
                          title
                          displayName
                          slug
                          yearStarted
                          yearEnded
                        }
                      }
                    }
                    thumbnail {
                      data {
                        attributes {
                          url
                          formats
                          caption
                          width
                          height
                        }
                      }
                    }
                    media {
                      data {
                        attributes {
                          url
                          formats
                          caption
                          width
                          height
                        }
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

  return {
    props: {
      categories: data,
    },
  };
}
