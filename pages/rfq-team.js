import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Person from '../components/Person';
import AppHeader from '../components/AppHeader'
import Footer from '../components/Footer';

export default function RfqTeam({ people }) {
  
  const [ rfqPeople, setRfqPeople ] = useState([])

  useEffect(() => {
    setRfqPeople(people.data)
  },[people])


  return (
    <>
      <AppHeader />
      <main>
        <h2 className="text-lg font-semibold">The Team</h2>
        {rfqPeople.map((person) => (
          <Person key={person.id} person={person.attributes} />
        ))}
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
                  formats,
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