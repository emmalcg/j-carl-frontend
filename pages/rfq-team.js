import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Person from '../components/Person';

export default function RfqTeam({ people }) {
  
  console.log({ people } )
  const [ rfqPeople, setRfqPeople ] = useState([])

  useEffect(() => {
    setRfqPeople(people.data)
  },[people])


  return (
    <section>
      <h2 className="text-lg font-semibold">The Team</h2>
      {
        rfqPeople.map(person => 
          <Person key={person.id} person={person.attributes}/>
          )
      }
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
    query getPeople {
      people(sort: "lastName") {
        data {
          id
          attributes {
            firstName,
            lastName,
            bio,
            image {
              data {
                attributes {
                  url,
                  width,
                  height,
                  caption
                }
              }
            },
            CV {
              data {
                attributes {
                  url
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
      people: data.people,
    }
  }
}