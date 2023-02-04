import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppHeader from "../components/AppHeader";

import Footer from "../components/Footer";

export default function webPage({ categories }) {
  
  return (
    <>
      <AppHeader
        categories={categories}
        currentPath="/web"
        currentType="about"
      />
      <main>
        <div className="flex flex-col mb-3.5">
          <h2 className="text-lg font-semibold">Web</h2>
          <ul className="mt-7">
            <li className="list-none flex flex-col md:flex-row mt-4">
              <a
                href="https://the-balcony.netlify.app/"
                target="_blank"
                className="underline cursor-alias"
              >
                <span>The Balcony</span>, 2000-2005
              </a>
            </li>
          </ul>
        </div>
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

  const { data: allCategoryData } = await client.query({
    query: gql`
      query getCategories {
        categories(sort: ["title"]) {
          data {
            attributes {
              title
              type
              slug
            }
          }
        }
      }
    `,
  });

  const allCategories = allCategoryData.categories.data;

  return {
    props: {
      categories: allCategories,
    },
  };
}


