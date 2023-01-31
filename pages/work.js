import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'
import Footer from '../components/Footer';

const ToggleItem = ({ name, artworks }) => {
  const [open, setOpen] = useState(false)
  //const windowWidth = window.innerWidth

  const [imageAmount, setImageAmount] = useState(3)

  useEffect(() => {
    if(window.innerWidth < 768) {
      setImageAmount(2)
    } else if(window.innerWidth > 768) {
      setImageAmount(3)
    }
  }, [])


  return (
    <>
      <div>
        <div className="w-full flex justify-between mb-3">
          <Link href={`/${name}`} key={`${name}`}>
            <a>{name}+</a>
          </Link>
          <button
            className="no-underline text-[14px]"
            onClick={() => setOpen((prev) => !prev)}
          >
            {!open && artworks.length > 3 ? "Show all" : "Show less"}
          </button>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!open
            ? artworks.map(
                (artwork, i) =>
                  i < imageAmount && (
                    <ArtworkThumbnail
                      key={`${artwork.attributes.title}${i}`}
                      artwork={artwork.attributes}
                      centered={true}
                    />
                  )
              )
            : artworks.map((artwork, i) => (
                <ArtworkThumbnail
                  key={`${artwork.attributes.title}${i}`}
                  artwork={artwork.attributes}
                  centered={true}
                />
              ))}
        </ul>
      </div>
    </>
  );
}

export default function work({ artworks, categories }) {

  const yearNav = categories?.filter(cat => cat.attributes.type === 'Year')

  const [years, setYears] = useState([])

  const [ twentyTwenty, setTwentyTwenty ] = useState([])
  const [ twentyTen, setTwentyTen ] = useState([])
  const [ twoThousand, setTwoThousand ] = useState([])
  const [ ninties, setNinties ] = useState([])
  const [ eighties, setEighties ] = useState([])
  useEffect(() => {

    const data = [
      {
        title: '2020s',
        artworks: artworks.data.filter((artwork) => {
          return artwork.attributes.yearStarted >= 2020
        })
      },
      {
        title: '2010s',
        artworks: artworks.data.filter((artwork) => {
          return artwork.attributes.yearStarted >= 2010 && artwork.attributes.yearStarted < 2020
        })
      },
      {
        title: '2000s',
        artworks: artworks.data.filter((artwork) => {
          return artwork.attributes.yearStarted >= 2000 && artwork.attributes.yearStarted < 2010
        })
      },
      {
        title: '1990s',
        artworks: artworks.data.filter((artwork) => {
          return artwork.attributes.yearStarted >= 1990 && artwork.attributes.yearStarted < 2000
        })
      },
      {
        title: '1980s',
        artworks: artworks.data.filter((artwork) => {
          return artwork.attributes.yearStarted >= 1980 && artwork.attributes.yearStarted < 1990
        })
      }
    ]

    const twenty = artworks.data.filter((artwork) => {
      return artwork.attributes.yearStarted >= 2020
    })
    const ten = artworks.data.filter((artwork) => {
      return artwork.attributes.yearStarted >= 2010 && artwork.attributes.yearStarted < 2020
    })
    const thousand = artworks.data.filter((artwork) => {
      return artwork.attributes.yearStarted >= 2000 && artwork.attributes.yearStarted < 2010
    })
    const ninty = artworks.data.filter((artwork) => {
      return artwork.attributes.yearStarted >= 1990 && artwork.attributes.yearStarted < 2000
    })
    const eighty = artworks.data.filter((artwork) => {
      return artwork.attributes.yearStarted >= 1980 && artwork.attributes.yearStarted < 1990
    })
    setTwentyTwenty(twenty)
    setTwentyTen(ten)
    setTwoThousand(thousand)
    setNinties(ninty)
    setEighties(eighty)

    setYears(data)

  }, [artworks])
  
  return (
    <>
      <AppHeader categories={categories} currentPath='work' currentType="Work"/>
      <main>
        <section>
          <div className="underline flex flex-col space-y-5">
         
            <ToggleItem name="2020" artworks={twentyTwenty} />
            <ToggleItem name="2010" artworks={twentyTen} />
            <ToggleItem name="2000" artworks={twoThousand} />
            <ToggleItem name="1990" artworks={ninties} />
          </div>
        </section>
      </main>
    </>
  )
}
export async function getStaticProps() {
  console.log('stat')
  const { API_URL } = process.env
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    query getArtworks {
      artworks(sort: ["yearStarted:desc"], filters: { 
          archive: { eq: true }
        }) {
        data {
          id
          attributes {
            archive,
            people {
              data {
                attributes {
                  lastName
                }
              }
            }
            title,
            yearStarted,
            yearEnded,
            description,
            materials,
            dimensions,
            location,
            client,
            Slug,
            series {
              data {
                attributes {
                  Title,
                  displayName,
                  Slug,      
                }
              }
            },
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
            },
            media {
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
      }
    }
    `
  });

  const {data: allCategoryData } = await client.query({
    query: gql `
      query getCategories {
        categories (sort: ["title"]) {
          data {
            attributes {
              title,
              type,
              slug
            }
          }
        }
      }
    `
  })

  const allCategories = allCategoryData.categories.data

  return {
    props: {
      artworks: data.artworks,
      categories: allCategories
    }
  }
}

