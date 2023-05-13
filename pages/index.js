import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import HomepageImage from '../components/HomepageImage';

export default function Home({ homepageData }) {

  const categories = homepageData.categories.data;

  return (
    <>
      <title>James Carl Artist</title>
      <AppHeader categories={categories} />
      <main style={{ height: `calc(100vh - 100px)` }}>
        <a
          href="https://privateviews.artlogic.net/2/a6bfc670af5a781b652ec6/"
          className="hover:underline"
        >
          Conformity, April 29th - May 19th 2023 at Nicholas Metivier &#x2192;
        </a>
        <HomepageImage />
      </main>
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
      
    }
    `
  });
  return {
    props: {
      homepageData: data,
    }
  }
}
