import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export default function NavSub({ item, artworks}) {
  console.log(item, 'item')
  return (
    <li className=" py-2 px-4 underline">
     {item}
    </li>
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
      artworks: 'hello'
    }
  }
}