import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import AppHeader from "../components/AppHeader";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import Mugshots from "../components/Mugshots";

const { API_URL } = process.env;
const client = new ApolloClient({
  uri: `${API_URL}`,
  cache: new InMemoryCache(),
});

export default function vanitySearch({ homepage }) {
  const mugshots = homepage.mugshots.data[0].attributes.Images.data;
  return (
    <>
      <AppHeader currentType="about" />
      <div className="flex flex-col mb-4">
        <BackButton link="/web" />
      </div>
      <main>
        <div className="flex mb-10 space-x-2 align-left">
          <h2 className="text-lg font-medium">vanity search, 2022</h2>
        </div>
        <section>
          <Mugshots mugshotsData={mugshots} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getHomepage {
        mugshots {
          data {
            id
            attributes {
              Images {
                data {
                  attributes {
                    formats
                    url
                    width
                    height
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      homepage: data,
    },
  };
}
