import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppHeader from "../components/AppHeader";
import { useState, useEffect, useMemo } from "react";
import Article from "../components/Article";
import ArtworkThumbnail from "../components/ArtworkThumbnail";
import ListLink from "../components/ListLink";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

export default function workPage({ articles }) {
  const pw = "bands";

  const [viewPP, setViewPP] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("showPP");
    saved && setViewPP(true);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let password = e.target.elements.password?.value;
    if (password == pw) {
      setViewPP(true);
      localStorage.setItem("showPP", true);
    } else {
      setMessage("Wrong Password");
    }
  };

  return (
    <>
      <AppHeader
        currentPath='writing'
        currentType='About'
      />
      <main className="mt-2">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Writing</h2>
        </div>

        <section>
          <ul className="max-w-[47rem]">
            {articles.map((article, i) => (
              <Article
                key={`${article.attributes.title}${i}`}
                article={article.attributes}
                passwordEntered={viewPP}
              />
            ))}
          </ul>
          {!viewPP && (
            <div className="mt-20">
              <p className="text-center">
                For access to further bibliographical material via password
                please contact carjamstew@gmail.com
              </p>
              <div className="border border-black max-w-[300px] m-auto mt-5">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-col text-center">
                    <label className="py-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="border-y border-black p-2 text-center"
                      type="password"
                      id="password"
                    />
                  </div>
                  <button className="text-center w-full py-2 hover:bg-gray-200">
                    Submit
                  </button>
                </form>
                {message && (
                  <p className="border-t border-black py-2 text-center text-red-800 font-bold">
                    {message}
                  </p>
                )}
              </div>
            </div>
          )}
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
      query getAllArticles {
        articles(sort: "year:asc") {
          data {
            attributes {
              title
              year
              publication
              author
              editor
              issueNumber
              type
              displayName
              year
              passwordProtected
              document {
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
    `,
  });

  const articles = data.articles.data;

  return {
    props: {
      articles,
    },
  };
}