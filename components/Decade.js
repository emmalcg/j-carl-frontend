import * as Accordion from "@radix-ui/react-accordion";
import ArtworkThumbnail from "../components/ArtworkThumbnail";
import ListLink from "../components/ListLink";
import Link from "next/link";
import FolderClosed from "./FolderClosed";
import FolderOpen from "./FolderOpen";
import FolderAlias from "./FolderAlias";
import { useRouter } from "next/router";
import { useEffect } from "react";

function buildLink(router, work, dec, seriesOpen) {
  let url = `${router.pathname}`;

  if (work) {
    url += `?work=${work}`;
  }

  if (dec) {
    url += `${url.includes("?") ? "&" : "?"}decade=${dec}`;
  }

  if (seriesOpen) {
    url += `${url.includes("?") ? "&" : "?"}series=${seriesOpen}`;
  }

  return url;
}

const ListArtwork = ({ artwork, decade, seriesOpen }) => {
  const router = useRouter();
  const slug = artwork.slug;

  const dec = decade?.attributes?.slug;

  const linkRoute = buildLink(router, slug, dec, seriesOpen);

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

const List = ({ artworks, category, setOpenedArtwork, series }) => {
  return (
    <ul>
      {artworks.artworks.map((artwork, i) => {
        return (
          <ListArtwork
            key={`${artwork.title}-artwork-${i}`}
            artwork={artwork}
            currentRoute="work-date"
            setOpenedArtwork={setOpenedArtwork}
            seriesOpen={series}
            decade={category}
          />
        );
      })}
    </ul>
  );
};

function organizeArtworksByDecades(artworks, targetDecade) {
  const organizedArtworks = [];
  let targetDecadeObject;

  artworks.forEach((artwork) => {
    const startYear = artwork.attributes.yearStarted;
    const decade = Math.floor(startYear / 10) * 10;

    let decadeObject = organizedArtworks.find(
      (entry) => entry.decade === decade
    );

    if (!decadeObject) {
      decadeObject = { decade, artworks: [] };
      organizedArtworks.push(decadeObject);
    }

    decadeObject.artworks.push({
      title: artwork.attributes.title,
      archive: artwork.attributes.archive,
      slug: artwork.attributes.slug,
      yearStarted: artwork.attributes.yearStarted,
      yearEnded: artwork.attributes.yearEnded,
      description: artwork.attributes.description,
      materials: artwork.attributes.materials,
      dimensions: artwork.attributes.dimensions,
      location: artwork.attributes.location,
      client: artwork.attributes.client,
      thumbnail: artwork.attributes.thumbnail,
    });

    if (decade === targetDecade) {
      targetDecadeObject = decadeObject;
    }
  });

  // Sort artworks within each decade
  organizedArtworks.forEach((decadeObject) => {
    decadeObject.artworks.sort((a, b) => {
      const yearComparison = b.yearStarted - a.yearStarted;

      if (yearComparison !== 0) {
        return yearComparison;
      }

      return a.title.localeCompare(b.title);
    });
  });

  // Sort decades in descending order, with targetDecadeObject moved to the front
  organizedArtworks.sort((a, b) => {
    if (a === targetDecadeObject) return -1;
    if (b === targetDecadeObject) return 1;
    return b.decade - a.decade;
  });

  return organizedArtworks;
}

function spansMultipleDecades(series, decadeStarted, decadeEnded) {
  const startYear = Number(series.yearStarted);
  const endYear = Number(series.yearEnded);

  if ((endYear - startYear) > 9) {
    return true;
  }

  // If the series starts before the decade starts and ends after the decade ends,
  // or if the series starts before the decade ends and ends after the decade starts,
  // it spans multiple decades.
    return (startYear < decadeStarted && endYear > decadeEnded) ||
         (startYear >= decadeStarted && endYear > decadeEnded);
   
}

const SeriesArtworks = ({ series, category, setOpenedArtwork }) => {
  const decade = Number(category.attributes.slug);
  const seriesSlug = `/series/${series.slug}`;
  const seriesArtworks = organizeArtworksByDecades(
    series.artworks.data,
    decade
  );

  const decadeStarted = Number(decade) // would be 2000
  const decadeEnded = Number(decade) + 9 // would be 2009

  const doesSpan = spansMultipleDecades(series, decadeStarted, decadeEnded);

    const router = useRouter();

    const seriesIsOpen = router.query.series;

  return (
    <li id={series.slug}>
      <Accordion.Root type="single" collapsible defaultValue={seriesIsOpen}>
        <Accordion.Item value={series.slug}>
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
                if (work.decade == decade) {
                  return (
                    <List
                      key={`artwork-${i}`}
                      artworks={work}
                      category={category}
                      setOpenedArtwork={setOpenedArtwork}
                      series={series.slug}
                    />
                  );
                }
              })}
              {doesSpan && (
                <li className="list-none flex flex-row md:flex-row mt-7 ml-[3.7rem] text-slate-500">
                  <FolderAlias />
                  <Link href={seriesSlug} key={series.slug}>
                    <a className="hover:underline">
                      {series.title} {series.yearStarted}-{series.yearEnded}
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  );
};

const SeriesList = ({ list, category, setOpenedArtwork }) => {
  return (
    <ul>
      {list.map((item, i) => {
        const work = item.attributes;
        if (item.__typename === "ArtworkEntity")
          return (
            <ListArtwork
              key={`${work.title}-artwork-${i}`}
              artwork={work}
              currentRoute="work-title"
              setOpenedArtwork={setOpenedArtwork}
              decade={category}
            />
          );
        if (item.__typename === "SerieEntity")

          return (
            <SeriesArtworks
              key={`${work.title}-series-${i}`}
              series={work}
              category={category}
              setOpenedArtwork={setOpenedArtwork}
              seriesOpen={work.slug}
            />
          );
      })}
    </ul>
  );
};

export const Decade = ({ category, setOpenedArtwork }) => {
  const series = category.attributes.series.data;

  const artworks = category.attributes.artworks.data;

  const combinedWorkAndSeries = [...artworks, ...series];


  const router = useRouter();

  const openValue = router.query.decade;

  return (
    <li id={category.attributes.slug}>
      <Accordion.Root type="single" collapsible defaultValue={openValue}>
        <Accordion.Item value={category.attributes.slug}>
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger rounded-sm flex md:flex-row mt-12 ml-6">
              <FolderOpen />
              <FolderClosed />
              {category.attributes.title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <div className="pl-14">
              <SeriesList
                list={combinedWorkAndSeries}
                category={category}
                setOpenedArtwork={setOpenedArtwork}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </li>
  );
};
