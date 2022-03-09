import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function Rfq({ homepage }) {

  const image = homepage.rfq.data.attributes.homepage.data.attributes

  return (
    <section>
      <Image 
        src={image.url}
        alt={image.caption}
        width={image.width}
        height={image.height}
        layout="responsive"
        priority
      />
      <div className="text-right text-xs mt-1">
        <ReactMarkdown>
          {homepage.rfq.data.attributes.homepageImageCaption}
        </ReactMarkdown>
      </div>

    </section>
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
