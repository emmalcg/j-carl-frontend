import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'

export default function about({ categories }) {
 
  

  //console.log('text', text)
  //console.log('articles', articles)
  //console.log('artworks', artworks)
  return (
    <>
      <AppHeader categories={categories} currentPath='about' currentType="About"/>
      <main>
        <h2 className="text-lg font-semibold mb-3.5">About</h2>
        <section>

          

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
      categories: allCategories
    }
  }
}


