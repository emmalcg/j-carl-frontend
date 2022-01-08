import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react';

function RfqStatement({ statement }) {
  return (
    <div>
      <h2>Statement</h2>
      <ReactMarkdown>{statement.data.attributes.statement}</ReactMarkdown>
    </div>
  )
}
export default RfqStatement

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
          attributes {
            statement
            statementImage {
              data {
                attributes {
                  url,
                  caption,
                  width
                }
              }
            }
          }
        }
      }
    }
    `
  });
  console.log('data', data)
  return {
    props: {
      statement: data.rfq,
    }
  }
}