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

const List = ({ artworks }) => {
  console.log({artworks})
  return (
    <ul>
      {artworks.map((artwork, i) => {
        return (
          <ListLink
            key={`${artwork.title}${i}`}
            artwork={artwork}
          />
        );
      })}
    </ul>
  );
};

const SeriesArtworks = ({ series }) => {
  const seriesSlug = `/series/${series.slug}`;
  const seriesArtworks = series.artworks

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
                } )}
              <li className="list-none flex flex-row md:flex-row mt-7 ml-[3.7rem] text-slate-500">
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

const SeriesList = ({ list }) => {
  console.log({list})
  return (
    <ul>
      {list.map((item, i) => {
        const work = item
        if (item.__typename === "Artwork")
          return (
            <ListLink
              key={`${work.title}-artwork-${i}`}
              artwork={work}
              series={false}
            />
          );
        if (item.__typename === "Serie")
          return (
            <SeriesArtworks
              key={`${work.title}-series-${i}`}
              series={work}
            />
          );
      })}
    </ul>
  );
};



export default function workTitle({ artworks }) {

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

            <SeriesList list={artworkSeries}/>
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
          sort: ["yearStarted:desc"]
        ) {
          data {
            id
            attributes {
              title
              archive
              slug
              yearStarted
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
