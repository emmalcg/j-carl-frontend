import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Person from '../components/Person';

export default function RfqTeam({ people }) {

  const [ rfqPeople, setRfqPeople ] = useState([])

  useEffect(() => {
    setRfqPeople(people.data)
  },[people])


  return (
    <div>
      <h2>The Team</h2>
      {
        rfqPeople.map(person => 
          <Person key={person.id} person={person.attributes}/>
          )
      }
    </div>
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
      people {
        data {
          id
          attributes {
            firstName,
            lastName,
            bio,
            image {
              data {
                attributes {
                  url
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
  console.log('data', data)
  return {
    props: {
      people: data.people,
    }
  }
}