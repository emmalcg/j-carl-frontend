import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import Footer from '../components/Footer'
import HomepageSingleImage from '../components/HomepageSingleImage';
import { useState } from 'react';
import washing from "../public/washing.gif";
import hacksaw from "../public/hacksaw.gif";
import pneu from '../public/pneu.jpg'
import trep from '../public/trep.jpg'
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
           <section className="flex flex-col justify-center items-center mt-10">
            <a href="https://catrionajeffries.com/exhibitions/slow-looking-february-15-april-5-2025#10">
            <Image priority={true} src={pneu} height={450} width={600}/>
                        <div className="pt-2 text-center font-thin text-xs">Catriona Jeffries, Slow Looking</div>

            </a>
            <a href="https://trepanierbaer.com/artist/" className='mt-12'>
            <Image priority={true} src={trep} height={420} width={600}/>
            <div className="pt-2 text-center font-thin text-xs">Trepanier Baer, Standrds</div>

            </a>
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
