import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Image from 'next/image'
import MyImage from '../components/MyImage'
import ReactMarkdown from 'react-markdown'
import AppHeader from '../components/AppHeader'
import Footer from '../components/Footer'


export default function Rfq({ homepage }) {

  const image = homepage.rfq.data.attributes.homepage.data.attributes

  return (
    <>
      <AppHeader />
      <main>
        <MyImage
          image={image}
          size="large"
          index={1}
        />
        <div className="text-right text-xs mt-1">
          <ReactMarkdown>
            {homepage.rfq.data.attributes.homepageImageCaption}
          </ReactMarkdown>
        </div>

      </main>
      <Footer/>
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
    query getHomepage {
      rfq {
        data {
          id,
          attributes {
            homepage {
              data {
                attributes {
                  formats,
                  url,
                  width,
                  height,
                  caption
                }
              }
            }
            password,
            homepageImageCaption
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
