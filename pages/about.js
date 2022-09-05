import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import Person from '../components/Person'

export default function about({ person, categories }) {
 
  const james = person.data[0]

  return (
    <>
      <AppHeader categories={categories} currentPath='about' currentType="About"/>
      <main>
        <h2 className="text-lg font-semibold mb-3.5">About</h2>
        <section>
          <Person key={james.id} person={james.attributes}/>
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
    query getPeople {
      people(filters: {
        lastName: { eq: "Carl"}
      }) {
        data {
          id
          attributes {
            firstName,
            lastName,
            bio,
            image {
              data {
                attributes {
                  formats,
                  url,
                  width,
                  height,
                  caption
                }
              }
            },
            CV {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }

    `
  });
 
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

  const allCategories = allCategoryData.categories.data

  return {
    props: {
      person: data.people,
      categories: allCategories
    }
  }
}


