import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'

export default function work({ artworks }) {
  console.log(artworks)
  const [ archiveArtworks, setArchiveArtworks ] = useState([])
  useEffect(() => {
    const filtered = artworks.data.filter(artwork => artwork.attributes.archive)
    setArchiveArtworks(filtered)
  }, [artworks])
  

  //console.log('text', text)
  //console.log('articles', articles)
  //console.log('artworks', artworks)
  return (
    <>
      <AppHeader categories={categories} currentPath={category.attributes.slug} currentType={category.attributes.type}/>
      <main>
        {/*<h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>*/}
        <section>

                <ul className="grid grid-cols-3 gap-4">
                {archiveArtworks.map((artwork, i) => 
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>

        </section>
      </main>
    </>
  )
}
export async function getStaticProps() {
  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    query getArtworks {
      artworks(sort: ["yearStarted:desc"], filters: { 
          archive: { eq: true }
        }) {
        data {
          id
          attributes {
            archive,
            people {
              data {
                attributes {
                  lastName
                }
              }
            }
            title,
            yearStarted,
            yearEnded,
            description,
            materials,
            dimensions,
            location,
            client,
            slug,
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
    `
  });

  return {
    props: {
      artworks: data.artworks,
    }
  }
}


