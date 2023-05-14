import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import MyImage from '../components/MyImage'
import Footer from '../components/Footer'
import Mugshots from '../components/Mugshots';
import HomepageSingleImage from '../components/HomepageSingleImage';
import { useState } from 'react';

 const { API_URL } = process.env;
 const client = new ApolloClient({
   uri: `${API_URL}`,
   cache: new InMemoryCache(),
 });

export default function Home({ homepage }) {

  const categories = homepage.categories.data
  const mugshots = homepage.mugshots.data[0].attributes.Images.data;

  const [showMugshots, setShowMugshots] = useState(false);

  return (
    <>
      <AppHeader categories={categories} />
      <main>
        {showMugshots ? (
          <Mugshots mugshotsData={mugshots} />
        ) : (
          <HomepageSingleImage />
        )}
      </main>
      <button
        onClick={() => {
          setShowMugshots(!showMugshots);
        }}
        className="border border-black mx-auto px-4 py-2 hover:bg-gray-200 cursor-pointer z-10"
      >
        <span className="sr-only">switch homepage art</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
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
    query getHomepage {
      categories (sort: ["title"]){
        data {
          attributes {
            title,
            type,
            slug
          }
        }
      },
      mugshots {
        data {
          id,
          attributes {
            Images {
              data {
                attributes {
                  formats,
                  url,
                  width,
                  height,
                  alternativeText
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
      homepage: data,
    }
  }
}
