import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as Accordion from "@radix-ui/react-accordion";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Head from "next/head";
import Loader from "../components/Loader";
import ListLink from "../components/ListLink";
import Link from "next/link";
import FolderAlias from "../components/FolderAlias";
import FolderOpen from "../components/FolderOpen";
import FolderClosed from "../components/FolderClosed";
import ArtworkSidePanel from "../components/ArtworkSidePanel";
import ArtworkSlideOut from "../components/ArtworkSlideOut";
import { useRouter } from "next/router";
// import ListArtwork from "../components/ListArtwork";

const SeriesArtworks = ({ series }) => {
  const seriesSlug = `/series/${series.slug}`;
  const seriesArtworks = series.artworks
    .filter((artwork) => artwork.series.data)
    .sort((a, b) => (b.yearStarted || 0) - (a.yearStarted || 0));

  return (
    <li>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value={series.title}>
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger rounded-sm flex md:flex-row mt-7 ml-6">
              <FolderOpen />
              <FolderClosed />
              {series.title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="pl-14">
              {seriesArtworks.map((work, i) => {
                return <List key={`artwork-${i}`} artworks={[work]} />;
              })}
              <li className="list-none flex flex-row md:flex-row mt-7 text-slate-500 ml-[26px]">
                <FolderAlias />
                <Link href={seriesSlug} key={series.slug}>
                  <a className="hover:underline">{series.title}</a>
                </Link>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  );
};

const SeriesList = ({ list, setOpenedArtwork}) => {
  console.log({ list });
  return (
    <ul>
      {list.map((item, i) => {
        const work = item;
        if (item.__typename === "Artwork")
          return (
            <ListArtwork
              key={`${work.title}-artwork-${i}`}
              artwork={work}
              currentRoute="work-title"
              setOpenedArtwork={setOpenedArtwork}
            />
          );
        if (item.__typename === "Serie")
          return (
            <SeriesArtworks key={`${work.title}-series-${i}`} series={work} />
          );
      })}
    </ul>
  );
};


const ArtworkButton = ({ artwork, series }) => {
  const router = useRouter();
  const slug = artwork.slug;

  return (
    <li
      id={slug}
      className="list-none flex flex-col md:flex-row mt-7 ml-6 text-inherit"
    >
      <button className="hover:underline">
        <span>{artwork.title}</span>, {artwork.yearStarted}
        {artwork.yearEnded && `-${artwork.yearEnded}`}
      </button>
{/*      
      <Link
        href={`${router.pathname}?work=${slug}`}
        shallow
        key={`${slug}`}
        onClick={setUrlStorage}
      >
        <a className="hover:underline">
          <span>{artwork.title}</span>, {artwork.yearStarted}
          {artwork.yearEnded && `-${artwork.yearEnded}`}
        </a>
      </Link>*/}
    </li>
  );
}

export const ListArtwork = ({ artwork, setOpenedArtwork }) => {
  const router = useRouter();
  const slug = artwork.slug;

  const handleClick = () => {
    router.push(`${router.pathname}?work=${slug}`); 
    setOpenedArtwork(artwork); 
  };

  console.log({artwork})

  return (
    <li
      id={slug}
      className="list-none flex flex-col md:flex-row mt-7 ml-6 text-inherit"
    >
      <Link
        href={`${router.pathname}?work=${slug}`}
        shallow
        key={`${slug}`}
        onClick={handleClick}
      >
        <a className="hover:underline">
          <span>{artwork.title}</span>, {artwork.yearStarted}
          {artwork.yearEnded && `-${artwork.yearEnded}`}
        </a>
      </Link>
    </li>
  );
}


const List = ({ artworks, setOpenedArtwork }) => {
  console.log({artworks})
  return (
    <ul>
      {artworks.map((artwork, i) => {
        return (
          <ListArtwork
            key={`${artwork.title}${i}`}
            artwork={artwork}
            currentRoute="work-title"
            setOpenedArtwork={setOpenedArtwork}
          />
        );
      })}
    </ul>
  );
};

export default function workTitle({ artworks }) {
    const router = useRouter();

    let artworkSeries = [];
    artworks.data.forEach((artwork) => {
      const artworkAttributes = artwork.attributes;
      if (!artworkAttributes.series.data) {
        artworkSeries.push(artworkAttributes);
      } else {
        const seriesSlug = artworkAttributes.series.data.attributes.slug;
        const existingSeriesIndex = artworkSeries.findIndex(
          (series) => series.slug === seriesSlug
        );

        if (existingSeriesIndex > -1) {
          // If the series exists, check if artwork already exists within the series
          const existingArtworkIndex = artworkSeries[
            existingSeriesIndex
          ].artworks.findIndex((art) => art.slug === artworkAttributes.slug);
          if (existingArtworkIndex === -1) {
            artworkSeries[existingSeriesIndex].artworks.push(artworkAttributes);

            artworkSeries[existingSeriesIndex].artworks.sort((a, b) => {
              // Assuming yearStarted is a number
              return a.yearStarted - b.yearStarted;
            });
          }
        } else {
          // If the series doesn't exist, create a new series object and push the artwork
          const newSeries = {
            ...artworkAttributes.series.data.attributes,
            artworks: [artworkAttributes],
          };
          artworkSeries.push(newSeries);
        }
      }
    });

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const [openedArtwork, setOpenedArtwork] = useState({})

  useEffect(() => {
    const { work } = router.query; 
    console.log({work})

    if (work) {
      const foundArtwork = artworks.data.find(
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

    console.log('opened', openedArtwork)
  }, [router.query, artworks.data]); 


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
              <SeriesList
                list={artworkSeries}
                setOpenedArtwork={setOpenedArtwork}
              />
              <ArtworkSidePanel artwork={openedArtwork}/>
              {/*<ArtworkSlideOut artworkData={openedArtwork} />*/}
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
      query getArtworks {
        artworks(
          filters: { archive: { eq: true } }
          sort: ["title"]
        ) {
          data {
            id
            attributes {
              title
              archive
              slug
              yearStarted
              dimensions
              materials
              description
              yearEnded
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
                    width
                    height
                    formats
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
      artworks: data.artworks,
    },
  };
}
