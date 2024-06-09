import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as Accordion from "@radix-ui/react-accordion";
import AppHeader from "../../components/AppHeader";
import { useState, useEffect } from "react";
import ArtworkThumbnail from "../../components/ArtworkThumbnail";
import ListLink from "../../components/ListLink";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import Head from "next/head";

export default function seriesPage({ series }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setTimeout(() => {
      setShowLoader(false);
    }, 1700);
  }, []);

  const [buttonText, setButtonText] = useState("titles");

  useEffect(() => {
    showImages ? setButtonText("titles") : setButtonText("images");
  }, [showImages]);

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
        <title>{series.title} artwork by James Carl</title>
        <meta
          name="description"
          content="Archive website of James Carl, toronto based sculptor and artist."
        />
      </Head>
      <AppHeader currentPath={series.attributes.slug} currentType="Work" />
      <BackButton />
      <main className="mt-2">
        <div className="flex items-center">
          <h2 className="text-lg">{series.attributes.title}</h2>
          <span className="px-2">|</span>
          <div>
            {series.attributes.yearStarted} - {series.attributes.yearEnded}
          </div>
          <div className="ml-auto">
            <label htmlFor="sort" className="hidden">
              Show Images
            </label>
            <select
              id="show"
              name="show"
              onChange={() => {
                setShowImages(!showImages);
              }}
              className="block w-full border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="false">Titles</option>
              <option value="slug">Images</option>
            </select>
          </div>
          {/*<button
            onClick={() => {
              setShowImages(!showImages);
            }}
            className="underline hover:font-medium flex pt-[1px]"
          >
            {buttonText}
          </button>*/}
        </div>
      </main>
      <section>
        {showImages && (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
            {series.attributes.artworks.data.map((item, i) => {
              const work = item.attributes;
              return (
                <ArtworkThumbnail key={`${work.title}${i}`} artwork={work} />
              );
            })}
          </ul>
        )}
        {!showImages && isLoading && (
          <section
            className={`h-[80vh] flex justify-center items-center ${
              showLoader ? "opacity-100" : "opacity-0"
            } transition-opacity ease-out duration-500`}
          >
            <Loader />
          </section>
        )}
        {!showImages && !isLoading && (
          <ul>
            {series.attributes.artworks.data.map((item, i) => {
              const work = item.attributes;
              return (
                <ListLink
                  key={`${work.title}${i}`}
                  artwork={work}
                  series={false}
                />
              );
            })}
          </ul>
        )}
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { series } = params;

  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data: singleSeriesData } = await client.query({
    query: gql`
      query getSeries($slug: String!) {
        series(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              title
              slug
              yearStarted
              yearEnded
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
      }
    `,
    variables: {
      slug: series,
    },
  });

  const [seriesData] = singleSeriesData.series.data;

  return {
    props: {
      series: seriesData,
    },
  };
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getItems {
        series {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const seriesSlugs = data.series.data
  const paths = seriesSlugs.map(({ attributes }) => {
    return {
      params: { series: attributes.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
