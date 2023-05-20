//<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import AppHeader from '../../components/AppHeader'
import ArtworkImage from '../../components/ArtworkImage'
import ArtworkInfo from '../../components/ArtworkInfo'
import Footer from '../../components/Footer'
import BackButton from '../../components/BackButton'
import SeriesButton from '../../components/SeriesButton'
import usePreviousSlug from '../../hooks/usePreviousSlug'

export default function ArtworkPage({ artwork }) {
  const previousSlug = usePreviousSlug()

  console.log('ps', previousSlug)

  const art = artwork.attributes
  const images = art.media.data 

  const [showImages, setShowImages] = useState(true)

  const [buttonText, setButtonText] = useState('information')

  useEffect(() => {
    showImages ? setButtonText('information') : setButtonText('images')
  },[showImages])

  const series = art?.series?.data?.attributes

  return (
    <>
      <AppHeader currentType="Work" />
      <div
        className={`flex justify-between items-center ${
          series ? `mb-2` : `mb-4`
        }`}
      >
        <BackButton />
        <SeriesButton currentSlug={art.slug} series={series} />
      </div>
      {series && (
        <p className="text-sm ml-auto">
          <span className="font-semibold">{series.title}</span>{" "}
          {series.yearStarted}-{series.yearEnded}
        </p>
      )}
      <main>
        <div className="flex mb-3.5 space-x-2">
          <h2 className="text-lg">{art.title}</h2>
          <span>|</span>
          <button
            onClick={() => {
              setShowImages(!showImages);
            }}
            className="underline hover:font-medium"
          >
            {buttonText}
          </button>
        </div>
        <section>
          {showImages ? (
            <ul className="grid gap-y-5">
              {images.map((image, index) => (
                <li
                  className="max-h-screen"
                  key={`${image.attributes.slug}${index}`}
                >
                  <ArtworkImage
                    image={image.attributes}
                    size="large"
                    index={index}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="w-1/2">
                <ArtworkImage
                  image={art.thumbnail.data.attributes}
                  index={1}
                  size="small"
                  responsive={false}
                />
              </div>
              <article className="my-3.5">
                <ArtworkInfo artwork={art} series={series} />
              </article>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { artwork } = params;

  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data: singleArtworkData } = await client.query({
    query: gql`
      query getArtworks($slug: String!) {
        artworks(filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              title
              yearStarted
              yearEnded
              description
              materials
              dimensions
              location
              slug
              client
              series {
                data {
                  attributes {
                    slug
                    title
                    yearStarted
                    yearEnded
                    artworks(sort: "yearStarted") {
                      data {
                        attributes {
                          title
                          archive
                          slug
                          yearStarted
                        }
                      }
                    }
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
    variables: {
      slug: artwork,
    },
  });
  
  const [artworkData] = singleArtworkData.artworks.data;

  return {
    props: {
     artwork: artworkData,
    }
  }
}

export async function getStaticPaths() {
  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      query getItems {
        artworks {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `
  });

  
  const artworkSlugs = data.artworks.data 
  const paths = artworkSlugs.map(({attributes}) => {
    return {
      params: { artwork: attributes.slug }
    };
  });
  return {
   paths,
   fallback: false,
  }
}
