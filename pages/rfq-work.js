import Artwork from "../components/Artwork"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';

export default function RfqWork({ artworks }) {
  
  const rfqArtworks = artworks.data 
  console.log(rfqArtworks)
  return (
    <ul>
      {
        rfqArtworks.map(artwork => 
          <Artwork key={artwork.id} artwork={artwork.attributes}/>    
          )
      }
    </ul>
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
      artworks(filters: { RFQ: { eq: true }}, sort: ["people.lastName", "yearStarted:desc"]) {
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