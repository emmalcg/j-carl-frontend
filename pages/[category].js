import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'

export default function categoryPage({ category, categories }) {
  const text = category.attributes.texts.data
  const articles = category.attributes.article.data
  const artworks = category.attributes.artworks.data

  return (
    <>
      <AppHeader categories={categories} currentPath={category.attributes.slug} currentType={category.attributes.type}/>
      <main>
        <h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>
        <section>
            {
              !!artworks.length && 
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {artworks.map((artwork, i) => 
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>
            }

            {
              !!articles.length &&  
                <ul> 
                {articles.map((article, i) => 
                  <Article key={`${article.attributes.title}${i}`} article={article.attributes}/>
                )}
                </ul>
            }
        </section>
      </main>
    </>
  )
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
        }){
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
