import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import MyImage from "../components/MyImage"

export default function Rfq({ homepage }) {
  console.log(homepage)
  return (
    <section>
      {/*<MyImage 
      
      />*/}

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
            password
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
