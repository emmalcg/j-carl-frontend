import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import { useState, useEffect, useMemo } from 'react'
import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import ListLink from '../components/ListLink'
import Footer from '../components/Footer'

export default function categoryPage({ category, categories }) {
  const articles = category.attributes.article.data;
  const artworks = category.attributes.artworks.data;

  const pw = "bands";

  const [viewPP, setViewPP] = useState(false);
  const [message, setMessage] = useState("");

  console.log('viewPPPPPP', viewPP)

  useEffect(() => {
    const saved = localStorage.getItem("showPP");
    saved && setViewPP(true);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let password = e.target.elements.password?.value;
    if (password == pw) {
      setViewPP(true);
      localStorage.setItem("showPP", true);
    } else {
      setMessage("Wrong Password");
    }
  };

  console.log({ articles });

  let articleSeries = [...articles]

  articleSeries.sort((a, b) => {
    console.log('a', a)
    a.attributes.year > b.attributes.year
      ? 1
      : a.attributes.year < b.attributes.year
      ? -1
      : 0;
  });

  console.log('articleSeries', articleSeries)

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
        artworkSeries[index].artworks.unshift(artwork.attributes);
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
  } else {

  }

  const requestSort = (event) => {
    const value = event.target.value;
    console.log(value);
    setSortBy(value);
  };

  const [buttonText, setButtonText] = useState("titles");

  useEffect(() => {
    showImages ? setButtonText("titles") : setButtonText("images");
  }, [showImages]);

  const ImageList = ({ list }) => {
    return (
      <ul className="space-y-3 w-96">
        {list.map((artwork, i) => (
          <ArtworkThumbnail
            key={`${artwork.attributes.title}${i}`}
            artwork={artwork.attributes}
          />
        ))}
      </ul>
    );
  };

  // hover:outline hover:outline-slate-600 hover:outline-offset-2
  const SeriesArtworks = ({ artwork }) => {
    console.log("work", artwork);
    const [open, setOpen] = useState(false);
    return (
      <div className="flex">
        <button
          className="rounded-sm flex md:flex-row mt-7 underline"
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
            {artwork.artworks.map((work, i) => (
              <ListLink key={`${work.title}${i}`} artwork={work} />
            ))}
          </ul>
        )}
      </div>
    );
  };

  const TitleList = ({ list }) => {
    return (
      <ul>
        {list.map((artwork, i) => (
          <ListLink
            key={`${artwork.attributes.title}${i}`}
            artwork={artwork.attributes}
          />
        ))}
      </ul>
    );
  };

  const SeriesList = ({ list }) => {
    return (
      <ul>
        {list.map((artwork, i) => {
          if (artwork.__typename === "Artwork")
            return <ListLink key={`${artwork.title}${i}`} artwork={artwork} />;
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
        categories={categories}
        currentPath={category.attributes.slug}
        currentType={category.attributes.type}
      />
      <main>
        <div className="flex mb-3.5">
          <h2 className="text-lg font-semibold">{category.attributes.title}</h2>
          {category.attributes.type === "Work" && (
            <>
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
              </div>
            </>
          )}
          {!!articleSeries.length && (
            <div className="ml-auto">
              <label htmlFor="sort" className="hidden">
                Sort
              </label>
              <select
                id="sort"
                name="sort"
                onChange={requestSort}
                className="block w-full border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="year">Sort by year</option>
                <option value="displayName">Sort by title</option>
              </select>
            </div>
          )}
        </div>
        {/*<h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>*/}
        <section>
          {!!artworks.length && showImages && <ImageList list={sortedWork} />}

          {!!artworks.length && !showImages && (
            <SeriesList list={artworkSeries} />
          )}

          {!!articleSeries.length && (
            <>
              <ul>
                {articleSeries.map((article, i) => (
                  <Article
                    key={`${article.attributes.title}${i}`}
                    article={article.attributes}
                    passwordEntered={viewPP}
                  />
                ))}
              </ul>
              <div className="border border-black max-w-[300px] m-auto mt-20">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-col text-center">
                    <label className="py-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="border-y border-black p-2 text-center"
                      type="password"
                      id="password"
                      type="text"
                    />
                  </div>
                  <button className="text-center w-full py-2 hover:bg-gray-200">
                    Submit
                  </button>
                </form>
                {message && (
                  <p className="border-t border-black py-2 text-center text-red-800 font-bold">
                    {message}
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params;
  //console.log("category", { category })
  //console.log('params', params)

  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data: singleCategoryData } = await client.query({ 
    query: gql `
      query getCategory ($slug: String!){
        categories (filters: { 
          slug: { eq: $slug }
        } ){
          data {
            attributes {
              type,
              title,
              slug,
              article {
                data {
                  attributes {
                    title,
                    year,
                    publication,
                    author,
                    editor,
                    issueNumber,
                    type,
                    displayName,
                    year,
                    passwordProtected,
                    document {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              },
              artworks {
                data {
                  attributes {
                    title,
                    archive,
                    slug,
                    yearStarted,
                    yearEnded,
                    description,
                    materials,
                    dimensions,
                    location,
                    client,
                    series {
                      data {
                        attributes {
                          title,
                          displayName,
                          slug,   
                          yearStarted,
                          yearEnded   
                        }
                      }
                    },
                    thumbnail {
                      data {
                        attributes {
                          url,
                          formats,
                          caption,
                          width,
                          height
                        }
                      }
                    },
                    media {
                      data {
                        attributes {
                          url,
                          formats,
                          caption,
                          width,
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
    }
   })

   const {data: allCategoryData } = await client.query({
    query: gql `
      query getCategories {
        categories (sort: ["title"]) {
          data {
            attributes {
              title,
              type,
              slug
            }
          }
        }
      }
    `
  })
  
  const [categoryData] = singleCategoryData.categories.data;
  const allCategories = allCategoryData.categories.data

  return {
    props: {
     category: categoryData,
     categories: allCategories
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
