import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Head from "next/head";
import { Decade } from "../components/Decade";
import Loader from "../components/Loader";
import ArtworkSidePanel from "../components/ArtworkSidePanel";
import { useRouter } from "next/router";

function findArtworkBySlug(categoriesData, workSlug) {
  if (!categoriesData) {
    return null;
  }

  for (const category of categoriesData) {
    // Check artworks in the category itself
    if (
      category.attributes.artworks &&
      Array.isArray(category.attributes.artworks.data)
    ) {
      for (const artwork of category.attributes.artworks.data) {
        if (artwork.attributes.slug === workSlug) {
          return artwork;
        }
      }
    }

    // Recursively check artworks in series within the category
    if (
      category.attributes.series &&
      Array.isArray(category.attributes.series.data)
    ) {
      for (const serie of category.attributes.series.data) {
        const artwork = findArtworkBySlug([serie], workSlug); // Recursive call
        if (artwork) {
          return artwork;
        }
      }
    }
  }

  return null;
}

export default function workDate({ categories }) {
  const router = useRouter();
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

  const [openedArtwork, setOpenedArtwork] = useState({});


  useEffect(() => {
    const { work, decade, series } = router.query;

    if (series) {
      console.log({ open });
      const targetSeries = document.getElementById(series);
      if (targetSeries) {
        const desiredScrollPosition = targetSeries?.offsetTop - 140;
        window.scrollTo({
          top: desiredScrollPosition,
          behavior: "smooth",
        });
      }
    } else if (decade) {
      const decadeElement = document.getElementById(decade);
      if (decadeElement) {
        const desiredScrollPosition = decadeElement?.offsetTop - 200;
        window.scrollTo({
          top: desiredScrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    const { work } = router.query;

    if (work) {
      const foundArtwork = findArtworkBySlug(categoriesData, work);
      console.log("foundArtwork", foundArtwork)

      if (foundArtwork) {
        setOpenedArtwork(foundArtwork.attributes);
      } else {
        setOpenedArtwork(null);
      }
    } else {
      setOpenedArtwork(null);
    }

  }, [router.query, categoriesData]); 

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
      <main className="mt-[101px]">
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
            <div className="flex justify-between">
                <ul>
                  {categoriesData.map((category, i) => {
                    return (
                      <Decade
                        category={category}
                        setOpenedArtwork={setOpenedArtwork}
                        key={`${category.attributes.slug}-${i}`}
                      />
                    );
                  })}
                </ul>
              <ArtworkSidePanel artwork={openedArtwork}/>
            </div>
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


