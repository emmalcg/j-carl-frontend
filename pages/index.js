import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import useEmblaCarousel from "embla-carousel-react"
import Carousel from "../components/Carousel"

export default function Home({ homepage }) {

  const artwork = homepage.personal.data.attributes.homepage_carousel.data.attributes
  const artworkMedia = artwork

  const [emblaRef] = useEmblaCarousel()
  //thing’s end (Wuhan), #1 pk. entrance plaza, Wuhan, China, 2018
  return (
    <section>
      <Carousel artwork={artworkMedia} />
      <div className="text-right text-xs mt-1">
        <span className="italic">{artwork.title},</span>
        <span> {artwork.location}</span>
        <span> , {artwork.yearStarted}</span>
      </div>
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
    query getHomepage {
      personal {
        data {
          id,
          attributes {
            person {
              data {
                attributes {
                  firstName,
                  lastName
                }
              }
            }
            homepage_carousel {
              data {
                attributes {
                  media {
                    data {
                      attributes {
                        formats,
                        url,
                        caption,
                        width,
                        height
                      }
                    }
                  }
                  dimensions,
                  location,
                  title,
                  yearStarted,
                  yearEnded,
                  materials
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
      homepage: data,
    }
  }
}
