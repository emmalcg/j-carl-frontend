import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Link from 'next/link'
import AppHeader from '../components/AppHeader'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import Footer from '../components/Footer';
import usePreviousSlug from '../hooks/usePreviousSlug';

const DecadeItem = ({ page, artwork }) => {
  return (
    <>
      <div>
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

export default function work({ pages }) {
  const previousSlug = usePreviousSlug();
  const decades = pages.data[0].attributes.sublink
  return (
    <>
      <AppHeader currentPath="work" currentType="Work" />
      <main>
        <section>
          <div className="underline flex flex-col space-y-5">
            {decades.map((decade) => (
              <DecadeItem
                key={decade.page.data.attributes.slug}
                page={decade.page.data.attributes}
                artwork={decade.artwork.data.attributes}
              />
            ))}
          </div>
        </section>
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
      query GET_WORK_PAGE {
        pages(filters: { slug: { eq: "work" } }) {
          data {
            attributes {
              sublink {
                artwork {
                  data {
                    attributes {
                      title,
                      thumbnail {
                        data {
                          attributes {
                            url,
                            formats,
                            caption,
                            width,
                            height
                          }
                        }
                      }
                    }
                  }
                },
                page {
                  data {
                    attributes {
                      slug,
                      title,
                    }
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
      pages: data.pages
    }
  }
}

