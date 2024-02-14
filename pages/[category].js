import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import * as Accordion from "@radix-ui/react-accordion";
import AppHeader from '../components/AppHeader'
import { useState, useEffect} from 'react'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import ListLink from '../components/ListLink'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Head from 'next/head'
import Link from 'next/link';

const List = ({ artworks, category }) => {
  return (
    <ul>
      {artworks.artworks.map((artwork, i) => {
        return (
          <ListLink
            key={`${artwork.title}${i}`}
            artwork={artwork}
            //series={artworks}
            categorySlug={category.attributes.slug}
          />
        )})}
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

const SeriesImageList = ({ artworks }) => {
  return artworks.map((singleWork, i) => {
    return (
      <ArtworkThumbnail key={`${singleWork.title}${i}`} artwork={singleWork} />
    );
  });
};

const SeriesImages = ({ series, category }) => {
  const decade = Number(category.attributes.slug);
  const seriesArtworks = organizeArtworksByDecades(series.artworks.data, decade);

  return (
    <>
      {seriesArtworks.map((work, i) => {
        if (work.decade === decade) {
          return <SeriesImageList key={i} artworks={work.artworks} />;
        }
        return null; 
      })}
    </>
  );
};

const ImageList = ({ list, category }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
      {list.map((item, i) =>{ 
        const work = item.attributes;
        if (item.__typename === "ArtworkEntity")
          return (
            <ArtworkThumbnail
              key={`${work.title}${i}`}
              artwork={work}
            />
          ) 
         if (item.__typename === "SerieEntity") {

          return (
            <SeriesImages
              key={`${work.title}${i}`}
              series={work}
              category={category}
            />
          );
         }
      })}
    </ul>
  );
};

const SeriesArtworks = ({ series, category }) => {

  const decade = Number(category.attributes.slug)
  const seriesSlug = `/series/${series.slug}`
  const seriesArtworks = organizeArtworksByDecades(series.artworks.data, decade);

  return (
    <li>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value={series.title}>
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger rounded-sm flex md:flex-row mt-7 ml-6">
              {/*<div className="flex h-full AccordionChevron mt-[7px] mr-2">
                <svg
                  fill="none"
                  height="10"
                  viewBox="0 0 10 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="m.435568 15.4939c-.272762-.3118-.241174-.7856.070554-1.0583l7.354938-6.43561-7.354938-6.43557c-.311728-.27276-.343316-.746581-.070554-1.058309.272761-.311727.746582-.343316 1.058312-.070554l8 7.000003c.16276.14241.25612.34816.25612.56443s-.09336.42202-.25612.56443l-8 6.99998c-.31173.2728-.785551.2412-1.058312-.0705z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>*/}
              <div className="openFolder h-full mt-[4px] mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                >
                  <path
                    d="m2.23,42.05s5.59-20.61,5.7-21.03c.56-2.09.61-2.06,1.69-2.06h38.31c.66,0,.32.73-.22,2.36-.28.84-5.79,17.68-6.42,19.59-.64,1.91-1.2,2.17-2.72,2.16-1,0-33.3,0-34.86,0s-2.02-1.03-2.02-2.02V8.73c0-.99.46-1.73,1.53-1.79h7.96s.93.07,1.39.6c.46.53,2.59,3.18,2.59,3.18h24.02c1.79,0,2.12,1.46,2.12,2.12v5.63"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="closedFolder h-full mt-[4px] mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                >
                  <path
                    d="m1.8,8.73v32.31c0,1,.46,2.02,2.02,2.02h34.86c1,0,2.72-.3,2.72-2.16V12.84c0-.66-.33-2.12-2.12-2.12H15.26s-2.12-2.65-2.59-3.18-1.39-.6-1.39-.6H3.32c-1.06.07-1.53.8-1.53,1.79Z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                  <path
                    d="m1.7,16.56s.96-1.39,1.69-1.39h36.39c.83,0,1.79,1.39,1.79,1.39"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              {series.title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="pl-6">
              {seriesArtworks.map((work, i) => {
                if (work.decade == decade) {
                  return <List key={i} artworks={work} category={category} />;
                } else {
                  return (
                    <li>
                      <Accordion.Root
                        key={i}
                        type="single"
                        collapsible
                        className="pl-5"
                      >
                        <Accordion.Item value={series.title}>
                          <Accordion.Header>
                            <Accordion.Trigger className="AccordionTrigger rounded-sm flex md:flex-row mt-7 open:rotate-90 text-slate-500">
                              {/*<div className="flex h-full AccordionChevron mt-[7px] mr-2">
                                <svg
                                  fill="none"
                                  height="10"
                                  viewBox="0 0 10 16"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="m.435568 15.4939c-.272762-.3118-.241174-.7856.070554-1.0583l7.354938-6.43561-7.354938-6.43557c-.311728-.27276-.343316-.746581-.070554-1.058309.272761-.311727.746582-.343316 1.058312-.070554l8 7.000003c.16276.14241.25612.34816.25612.56443s-.09336.42202-.25612.56443l-8 6.99998c-.31173.2728-.785551.2412-1.058312-.0705z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>*/}
                              <div className="openFolder h-full mt-[4px] mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 50 50"
                                  x="0px"
                                  y="0px"
                                  width="15"
                                  height="15"
                                >
                                  <path
                                    d="m2.23,42.05s5.59-20.61,5.7-21.03c.56-2.09.61-2.06,1.69-2.06h38.31c.66,0,.32.73-.22,2.36-.28.84-5.79,17.68-6.42,19.59-.64,1.91-1.2,2.17-2.72,2.16-1,0-33.3,0-34.86,0s-2.02-1.03-2.02-2.02V8.73c0-.99.46-1.73,1.53-1.79h7.96s.93.07,1.39.6c.46.53,2.59,3.18,2.59,3.18h24.02c1.79,0,2.12,1.46,2.12,2.12v5.63"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                  />
                                </svg>
                              </div>
                              <div className="closedFolder h-full mt-[4px] mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 50 50"
                                  x="0px"
                                  y="0px"
                                  width="15"
                                  height="15"
                                >
                                  <path
                                    d="m1.8,8.73v32.31c0,1,.46,2.02,2.02,2.02h34.86c1,0,2.72-.3,2.72-2.16V12.84c0-.66-.33-2.12-2.12-2.12H15.26s-2.12-2.65-2.59-3.18-1.39-.6-1.39-.6H3.32c-1.06.07-1.53.8-1.53,1.79Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="m1.7,16.56s.96-1.39,1.69-1.39h36.39c.83,0,1.79,1.39,1.79,1.39"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeMiterlimit="10"
                                    strokeWidth="2"
                                  />
                                </svg>
                              </div>
                              {work.decade}-
                            </Accordion.Trigger>
                          </Accordion.Header>
                          <Accordion.Content>
                            <div className="ml-6">
                              <List
                                key={i}
                                artworks={work}
                                category={category}
                              />
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
                    </li>
                  );
                }
              })}
              <li className="list-none flex flex-row md:flex-row mt-7 ml-6 text-slate-500">
                <div className="h-full mt-[4px] mr-2 ml-[-5.5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                  >
                    <path
                      d="m7.21,4.68v33.21c0,1.02.48,2.08,2.08,2.08h35.83c1.02,0,2.8-.31,2.8-2.22V8.91c0-.68-.34-2.18-2.18-2.18h-24.68s-2.18-2.73-2.66-3.27c-.48-.55-1.43-.61-1.43-.61h-8.18c-1.09.07-1.57.82-1.57,1.84Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    />
                    <path
                      d="m7.1,12.73s.99-1.43,1.74-1.43h37.4c.85,0,1.84,1.43,1.84,1.43"
                      fill="none"
                      stroke="currentColor"
                      stroke-miterlimit="10"
                      stroke-width="2"
                    />
                    <path
                      d="m3.9,50c-1.02-4.45-.09-5.13,4.63-9.24l1.88,2.39,3.76-8.39-9.92.99,1.97,2.6c-3.74,3.18-6.69,6.73-2.32,11.65Z"
                      fill="currentColor"
                      stroke="#f9f9f9"
                      stroke-miterlimit="10"
                      stroke-width=".25"
                    />
                  </svg>

                </div>
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

const SeriesList = ({ list, category }) => {
  return (
    <ul>
      {list.map((item, i) => {
        const work = item.attributes
        if (item.__typename === "ArtworkEntity")
          return (
            <ListLink
              key={`${work.title}${i}`}
              artwork={work}
              series={false}
              categorySlug={category.attributes.slug}
            />
          );
        if (item.__typename === "SerieEntity")
          return (
            <SeriesArtworks
              key={`${work.title}${i}`}
              series={work}
              category={category}
            />
          );
      })}
    </ul>
  );
};



export default function categoryPage({ category }) {

 const [isLoading, setIsLoading] = useState(true);
 const [showLoader, setShowLoader] = useState(true);

 useEffect(() => {
   setTimeout(() => {
     setIsLoading(false);
   }, 2000);
   setTimeout(() => {
    setShowLoader(false)
   }, 1700)
 }, []);

  const series = category.attributes.series.data;

  const artworks = category.attributes.artworks.data

  const combinedWorkAndSeries = [...artworks, ...series]

  const [showImages, setShowImages] = useState(false);
  const [sortBy, setSortBy] = useState("yearStarted");

  const imageWorks = [...combinedWorkAndSeries]
  imageWorks.sort((a, b) =>
    a.attributes.yearStarted < b.attributes.yearStarted
      ? 1
      : a.attributes.yearStarted > b.attributes.yearStarted
      ? -1
      : 0
  );

  if (sortBy !== null) {
    if (category.attributes.type === "Work") {
      if (sortBy === "slug") {
        combinedWorkAndSeries.sort((a, b) =>
          a.attributes[sortBy] > b.attributes[sortBy]
            ? 1
            : a.attributes[sortBy] < b.attributes[sortBy]
            ? -1
            : 0
        );
      } else {
        combinedWorkAndSeries.sort((a, b) =>
          a.attributes[sortBy] < b.attributes[sortBy]
            ? 1
            : a.attributes[sortBy] > b.attributes[sortBy]
            ? -1
            : 0
        );
      }
    }
  } 

  const requestSort = (event) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const [buttonText, setButtonText] = useState("titles");

  useEffect(() => {
    showImages ? setButtonText("titles") : setButtonText("images");
  }, [showImages]);


  return (
    <>
      <Head>
        <title>{category.attributes.title} artwork by James Carl</title>
        <meta
          name="description"
          content="Archive website of James Carl, toronto based sculptor and artist."
        />
      </Head>
      <AppHeader
        currentPath={category.attributes.slug}
        currentType={category.attributes.type}
      />
      <BackButton link="/work" />
      <main className="mt-2">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">{category.attributes.title}</h2>
          <span className="px-2">|</span>
          <button
            onClick={() => {
              setShowImages(!showImages);
            }}
            className="underline hover:font-medium flex pt-[1px]"
          >
            {buttonText}
          </button>
          <div className="ml-auto">
            {!showImages && (
              <>
                <label htmlFor="sort" className="hidden">
                  Sort
                </label>
                <select
                  id="sort"
                  name="sort"
                  onChange={requestSort}
                  className="block w-full border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="yearStarted">Sort by year</option>
                  <option value="slug">Sort by title</option>
                </select>
              </>
            )}
          </div>
        </div>
        <section>
          {showImages && <ImageList list={imageWorks} category={category}/>}

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
            <SeriesList list={combinedWorkAndSeries} category={category} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;

  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data: singleCategoryData } = await client.query({
    query: gql`
      query getCategory($slug: String!) {
        categories(filters: { slug: { eq: $slug } }) {
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
    variables: {
      slug: category,
    },
  });

  const [categoryData] = singleCategoryData.categories.data;

  return {
    props: {
      category: categoryData,
    },
  };
}


export async function getStaticPaths() {
  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      query getItems {
        categories {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `
  });

  const categorySlugs = data.categories.data 
  const paths = categorySlugs.map(({attributes}) => {
    console.log('in category')
    return {
      params: { category: attributes.slug }
    };
  });
  return {
   paths,
   fallback: false,
  }
}
