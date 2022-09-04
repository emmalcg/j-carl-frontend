//<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../../components/AppHeader'
import MyImage from '../../components/MyImage'
import ArtworkInfo from '../../components/ArtworkInfo'

export default function ArtworkPage({ artwork, categories }) {

  const art = artwork.attributes
  const images = art.media.data 

  return (
    <>
      <AppHeader categories={categories} />
      <main>
        <h2 className="text-lg font-semibold mb-3.5">{art.title}</h2>
        <section>
          <ul className="grid gap-y-5">
            {
              images.map((image, index) => 
                <li key={image.attributes.caption}>
                  <MyImage image={image.attributes} size="large" index={index}/>
                </li>
              )
            }
          </ul>
          <article className="my-5">
            <ArtworkInfo artwork={art}/>
          </article>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { artwork } = params;
  console.log(artwork)

  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data: singleArtworkData } = await client.query({ 
    query: gql `
      query getArtworks ($slug: String!){
      artworks(filters:{
        slug:{ eq: $slug}
      }) {
        data {
          id
          attributes {
            title,
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
    `,
    variables: {
      slug: artwork,
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
  
  const [artworkData] = singleArtworkData.artworks.data;
  const allCategories = allCategoryData.categories.data

  return {
    props: {
     artwork: artworkData,
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
        artworks {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `
  });

  
  const artworkSlugs = data.artworks.data 
  const paths = artworkSlugs.map(({attributes}) => {
    return {
      params: { artwork: attributes.slug }
    };
  });
  return {
   paths,
   fallback: false,
  }
}
