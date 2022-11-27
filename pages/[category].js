import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import { useState, useEffect } from 'react'
import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import ListLink from '../components/ListLink'
import Footer from '../components/Footer'

export default function categoryPage({ category, categories }) {
  //console.log({category})
  const text = category.attributes.texts.data
  const articles = category.attributes.article.data
  const artworks = category.attributes.artworks.data

  const [showImages, setShowImages] = useState(true)
  const [sortBy, setSortBy] = useState('yearStarted');

  let sortedWork = [...artworks]

  if (sortBy !== null) {
    sortedWork.sort((a, b) =>
      a.attributes[sortBy] > b.attributes[sortBy]
        ? 1
        : a.attributes[sortBy] < b.attributes[sortBy]
        ? -1
        : 0
    );
  }
  
  const requestSort = (event) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const [buttonText, setButtonText] = useState('titles')

  useEffect(() => {
    showImages ? setButtonText('titles') : setButtonText('images')
  },[showImages])

  const ImageList = ({list}) => {
    return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {list.map((artwork, i) => (
          <ArtworkThumbnail
            key={`${artwork.attributes.title}${i}`}
            artwork={artwork.attributes}
          />
        ))}
      </ul>
    )
  }

  const TitleList = ({list}) => {
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
  }

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
                  <option value="title">Sort by title</option>
                </select>
              </div>
            </>
          )}
        </div>
        {/*<h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>*/}
        <section>
          {!!artworks.length && showImages && <ImageList list={sortedWork} />}

          {!!artworks.length && !showImages && <TitleList list={sortedWork} />}

          {!!articles.length && (
            <ul>
              {articles.map((article, i) => (
                <Article
                  key={`${article.attributes.title}${i}`}
                  article={article.attributes}
                />
              ))}
            </ul>
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
                    date,
                    Document {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              },
              texts {
                data {
                  attributes {
                    title, 
                    Markup
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
