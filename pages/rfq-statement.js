import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

function Statement({ statement }) {
  const img = statement.data.attributes.statementImage.data.attributes
  const mobileImg = statement.data.attributes.statementImageMobile.data.attributes
  return (
    <section className="flex flex-col lg:flex-row mb-2">
      <article className="pr-6 prose">
        <h2>Statement</h2>
        <ReactMarkdown>
          {statement.data.attributes.statement}
        </ReactMarkdown>
      </article>
      <div className="hidden lg:block order-last">
        <div className="relative min-w-[320px] max-w-[320px] max-h-[1000px] min-h-[1000px]">
          <Image 
              src={img.url}
              alt={img.caption}
              layout="fill"
              objectFit="cover"
            />
        </div>
        <div className="text-right text-xs">
          <ReactMarkdown>{statement.data.attributes.statementImageCaption}</ReactMarkdown>
        </div>
      </div>
      <div className="order-first lg:hidden">
        <div className="relative h-[170px]">
          <Image 
              src={mobileImg.url}
              alt={mobileImg.caption}
              layout="fill"
              objectFit="cover"
            />
        </div>
        <div className="text-right text-xs">
          <ReactMarkdown>{statement.data.attributes.statementImageCaption}</ReactMarkdown>
        </div>
      </div>
    </section>
  )
}
export default Statement

export async function getStaticProps() {
  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    query getStatement {
      rfq {
        data {
          id,
          attributes {
            statement,
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
            statementImageCaption,
            statementImageMobile {
              data {
                attributes {
                  url,
                  caption
                }
              }
            }
            statementImage {
              data {
                attributes {
                  url,
                  width,
                  height,
                  caption
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
      statement: data.rfq,
    }
  }
}