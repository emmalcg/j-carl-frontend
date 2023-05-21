import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import { useState, useEffect} from 'react'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import ListLink from '../components/ListLink'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'

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


  const artworks = category.attributes.artworks.data;

  let artworkSeries = [];

  artworks.forEach((artwork) => {
    if (!artwork.attributes.series.data) {
      artworkSeries.push(artwork.attributes);
    } else {
      const seriesTitle = artwork.attributes.series.data.attributes.title;
      const series = {
        ...artwork.attributes.series.data.attributes,
        artworks: [artwork.attributes],
      };
      const index = artworkSeries.findIndex(
        (work) => work.title === seriesTitle
      );
      if (index === -1) {
        artworkSeries.push(series);
      } else {
        artworkSeries[index].artworks.push(artwork.attributes);
      }
    }
  });

  const [showImages, setShowImages] = useState(false);
  const [sortBy, setSortBy] = useState("yearStarted");

  let sortedWork = [...artworks];

  if (sortBy !== null) {

    if(category.attributes.type === "Work") {
      artworkSeries.sort((a, b) =>
        a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
      );
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

  const ImageList = ({ list }) => {
    return (
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
        {list.map((artwork, i) => (
          <ArtworkThumbnail
            key={`${artwork.attributes.title}${i}`}
            artwork={artwork.attributes}
          />
        ))}
      </ul>
    );
  };

  const SeriesArtworks = ({ artwork }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex">
        <button
          className="rounded-sm flex md:flex-row mt-7"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {artwork.title}, {artwork.yearStarted}
          {artwork.yearEnded && `-${artwork.yearEnded}`}
          <div className="flex h-full ml-7">
            <svg
              className={`mt-[7px] ${open && `rotate-90`}`}
              fill="none"
              height="10"
              viewBox="0 0 10 16"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m.435568 15.4939c-.272762-.3118-.241174-.7856.070554-1.0583l7.354938-6.43561-7.354938-6.43557c-.311728-.27276-.343316-.746581-.070554-1.058309.272761-.311727.746582-.343316 1.058312-.070554l8 7.000003c.16276.14241.25612.34816.25612.56443s-.09336.42202-.25612.56443l-8 6.99998c-.31173.2728-.785551.2412-1.058312-.0705z"
                fill="black"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </button>
        {open && (
          <ul className="pl-14">
            {artwork.artworks.map((work, i) => {
              return (
                <ListLink
                  key={`${work.title}${i}`}
                  artwork={work}
                  series={artworks}
                  categorySlug={category.attributes.slug}
                />
              );})
            }
          </ul>
        )}
      </div>
    );
  };

  const SeriesList = ({ list }) => {
    return (
      <ul>
        {list.map((artwork, i) => {
          if (artwork.__typename === "Artwork")
            return (
              <ListLink
                key={`${artwork.title}${i}`}
                artwork={artwork}
                series={false}
                categorySlug={category.attributes.slug}
              />
            );
          if (artwork.__typename === "Serie")
            return (
              <SeriesArtworks key={`${artwork.title}${i}`} artwork={artwork} />
            );
        })}
      </ul>
    );
  };

  return (
    <>
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
          {showImages && <ImageList list={sortedWork} />}

          {!showImages && isLoading && (
            <section
              className={`h-[80vh] flex justify-center items-center ${
                showLoader ? "opacity-100" : "opacity-0"
              } transition-opacity ease-out duration-500`}
            >
              <Loader />
            </section>
          )}
          {!showImages && !isLoading && <SeriesList list={artworkSeries} />}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;

  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data: singleCategoryData } = await client.query({
    query: gql`
      query getCategory($slug: String!) {
        categories(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              type
              title
              slug
              artworks(sort: "yearStarted") {
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
    }
  }
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
    return {
      params: { category: attributes.slug }
    };
  });
  return {
   paths,
   fallback: false,
  }
}
