import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Link from 'next/link'
import AppHeader from '../components/AppHeader'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import Footer from '../components/Footer';
import Head from 'next/head';

const DecadeItem = ({ page, artwork }) => {
  return (
    <>
      <div
        onClick={() => {
          localStorage.setItem("showLoading", true);
        }}
      >
        <div className="w-full flex justify-between mb-3">
          <Link href={`/${page.slug}`}>
            <a>{page.title}</a>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ArtworkThumbnail
            artwork={artwork}
            centered={true}
            slug={`/${page.slug}`}
            priority={true}
          />
        </div>
      </div>
    </>
  );
}

export default function work({ artworks }) {
  console.log({artworks})

  const work = artworks.data

  let artworkSeries = [];

  work.forEach((artwork) => {
    if (!artwork.attributes.series.data) {
      artworkSeries.push(artwork.attributes);
    } else {
      const seriesTitle = artwork.attributes.series.data.attributes.title;
      const series = {
        ...artwork.attributes.series.data.attributes,
        artworks: [artwork.attributes],
      };
      const index = artworkSeries.findIndex(
        (work) => work.title === seriesTitle
      );
      if (index === -1) {
        artworkSeries.push(series);
      } else {
        artworkSeries[index].artworks.push(artwork.attributes);
      }
    }
  });
  console.log({work})
  //const decades = pages.data[0].attributes.sublink
  return (
    <>
      <Head>
        <title>All artwork by James Carl</title>
        <meta
          name="description"
          content="artwork by James Carl spanning from the 1990s to present, sorted by decade."
        />
      </Head>
      <AppHeader currentPath="work" currentType="Work" />
      <main>
        <section>
          <div className="underline flex flex-col space-y-5">
            <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-7">
              {work.map((artwork, i) => (
                <ArtworkThumbnail
                  key={`${artwork.attributes.title}${i}`}
                  artwork={artwork.attributes}
                  shrinkHeight={true}
                />
              ))}
            </ul>
          </div>
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
      query getArtworks {
        artworks(filters: { archive: { eq: true }}, sort: ["yearStarted:desc"]) {
          data {
            id
            attributes {
              title
              archive
              slug
              yearStarted
              yearEnded
              description
              materials
              dimensions
              location
              client
              series {
                data {
                  attributes {
                    title
                    displayName
                    slug
                    yearStarted
                    yearEnded
                  }
                }
              }
              thumbnail {
                data {
                  attributes {
                    url
                    formats
                    caption
                    width
                    height
                  }
                }
              }
              media {
                data {
                  attributes {
                    url
                    formats
                    caption
                    width
                    height
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
      artworks: data.artworks,
    },
  };
}






  //const { data } = await client.query({
  //  query: gql`
  //    query GET_WORK_PAGE {
  //      pages(filters: { slug: { eq: "work" } }) {
  //        data {
  //          attributes {
  //            sublink {
  //              artwork {
  //                data {
  //                  attributes {
  //                    title,
  //                    thumbnail {
  //                      data {
  //                        attributes {
  //                          url,
  //                          formats,
  //                          caption,
  //                          width,
  //                          height
  //                        }
  //                      }
  //                    }
  //                  }
  //                }
  //              },
  //              page {
  //                data {
  //                  attributes {
  //                    slug,
  //                    title,
  //                  }
  //                }
  //              }
  //            }
  //          }
  //        }
  //      }
  //    }
  //  `,
  //});

  //return {
  //  props: {
  //    pages: data.pages
  //  }
  //}
//}
