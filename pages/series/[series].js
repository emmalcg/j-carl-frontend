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
import { useRouter } from "next/router";
import Link from "next/link";
import ArtworkSidePanel from "../../components/ArtworkSidePanel";

const ListArtwork = ({ artwork, series }) => {
  const router = useRouter();
  const slug = artwork.slug;

  console.log({artwork})

  const seriesSlug = router.query.series;
  const newPathname = `/series/${seriesSlug}`;

  const linkRoute = slug
    ? `${newPathname}?work=${slug}`
    : `${newPathname}`;

  return (
    <li
      id={slug}
      className="list-none flex flex-col md:flex-row mt-7 ml-6 text-inherit"
    >
      <Link href={linkRoute} shallow key={`${slug}`}>
        <a className="hover:underline">
          <span>{artwork.title}</span>, {artwork.yearStarted}
          {artwork.yearEnded && `-${artwork.yearEnded}`}
        </a>
      </Link>
    </li>
  );
};

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

  const router = useRouter();

   const [openedArtwork, setOpenedArtwork] = useState({});

   console.log({series})
   const artworks = series.attributes.artworks.data
   console.log({artworks})

   useEffect(() => {
     const { work } = router.query;

     if (work) {
       const foundArtwork = artworks.find(
         (artwork) => artwork.attributes.slug === work
       );

       if (foundArtwork) {
         setOpenedArtwork(foundArtwork.attributes);
       } else {
         setOpenedArtwork(null);
       }
     } else {
       setOpenedArtwork(null);
     }
   }, [router.query, series.data]); 

   console.log({openedArtwork})

  //const [buttonText, setButtonText] = useState("titles");

  //useEffect(() => {
  //  showImages ? setButtonText("titles") : setButtonText("images");
  //}, [showImages]);

  //useEffect(() => {
  //  setTimeout(() => {
  //    setIsLoading(false);
  //  }, 2000);
  //  setTimeout(() => {
  //    setShowLoader(false);
  //  }, 1700);
  //}, []);

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
      <main className="mt-[101px]">
        <div className="flex items-center">
          <h2 className="text-lg">{series.attributes.title}</h2>
          <span className="px-2">|</span>
          <div>
            {series.attributes.yearStarted} - {series.attributes.yearEnded}
          </div>
          {/*<div className="ml-auto">
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
          </div>*/}
          {/*<button
            onClick={() => {
              setShowImages(!showImages);
            }}
            className="underline hover:font-medium flex pt-[1px]"
          >
            {buttonText}
          </button>*/}
        </div>
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
                  {/*<ListLink
                    key={`${work.title}${i}`}
                    artwork={work}
                    series={false}
                  />
                  */}
          {!showImages && !isLoading && (
            <ul>
              {series.attributes.artworks.data.map((item, i) => {
                const work = item.attributes;
                return (
                  <div
                    className="flex justify-between"
                    key={`${work.title}${i}`}
                  >
                    <ListArtwork artwork={work} series={series}/>
                    <ArtworkSidePanel artwork={openedArtwork} hideClose/>
                  </div>
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
