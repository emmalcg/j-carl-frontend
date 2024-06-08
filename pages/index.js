import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import Footer from '../components/Footer'
import HomepageSingleImage from '../components/HomepageSingleImage';
import { useState } from 'react';
import washing from "../public/washing.gif";
import hacksaw from "../public/hacksaw.gif";
import Image from 'next/image';
import Head from 'next/head';

 const { API_URL } = process.env;
 const client = new ApolloClient({
   uri: `${API_URL}`,
   cache: new InMemoryCache(),
 });

export default function Home() {

  const [showGif, setShowGif] = useState(false);

  return (
    <>
      <Head>
        <title>James Carl artist</title>
        <meta
          name="description"
          content="Archive website of James Carl, toronto based sculptor and artist."
        />
      </Head>
      <AppHeader />
      <main>
        <section className="h-[80vh] flex flex-col justify-center items-center">
          <Image priority={true} src={hacksaw} height={146} width={600} />
          <div className="pt-2">under construction</div>
        </section>
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
    query getHomepage {
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
