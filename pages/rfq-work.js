import Artwork from "../components/Artwork"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';

console.log(Artwork)

export default function RfqWork({ artworks }) {

  const [ rfqArtworks, setRfqArtworks ] = useState([])

  useEffect(() => {
    const filtered = artworks.data.filter(artwork => artwork.attributes.RFQ)
    setRfqArtworks(filtered)
  }, [artworks])

  console.log(rfqArtworks)
  return (
    <div>
      {
        rfqArtworks.map(artwork => 
          <Artwork key={artwork.id} artwork={artwork.attributes}/>    
          )
      }
    </div>
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
      artworks {
        data {
          id
          attributes {
            RFQ,
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
            media {
              data {
                attributes {
                  url,
                  caption,
                  width
                }
              }
            }
          }
        }
      }
    }
    `
  });
  console.log('data', data)
  return {
    props: {
      artworks: data.artworks,
    }
  }
}