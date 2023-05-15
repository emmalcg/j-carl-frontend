import Artwork from "../components/Artwork"
import AppHeader from '../components/AppHeader'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Footer from "../components/Footer";

export default function RfqWork({ artworks }) {
  const [ rfqArtworks, setRfqArtworks ] = useState([])
  useEffect(() => {
    const filtered = artworks.data.filter(artwork => artwork.attributes.RFQ)
    setRfqArtworks(filtered)
  }, [artworks])

  return (
    <>
      <AppHeader />
      <main>
        <ul>
          {rfqArtworks.map((artwork) => (
            <Artwork key={artwork.id} artwork={artwork.attributes} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
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
      artworks(sort: ["people.lastName", "yearStarted:desc"]) {
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