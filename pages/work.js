import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'

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
    <div>
      <div className="w-full flex justify-between mb-1">
        <Link href={`/${name}`} key={`${name}`}>
          <a>{name}</a>
        </Link>
        <button 
          className="no-underline text-[14px]"
          onClick={() => setOpen((prev) => !prev)}
        >
            {!open ? 
            'Show all'
            //(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            //  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            //</svg>) 
            : 
            'Show less'
            //(
            //  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            //    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            //  </svg>

            //)
            }
          </button>
      </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {
          !open 
          ?
          artworks.map((artwork, i) => 
            i < imageAmount &&
            <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
            )

          : artworks.map((artwork, i) => 
            <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
            )
          }
        </ul>
    </div>
  )
}

export default function work({ artworks, categories }) {

  
  const yearNav = categories?.filter(cat => cat.attributes.type === 'Year')


  console.log({ yearNav })
  const [years, setYears] = useState([])
  //const years = [
  //  {
  //    title: '2020s',
  //    artworks: []
  //  },
  //  {
  //    title: '2010s',
  //    artworks: []
  //  },
  //  {
  //    title: '2000s',
  //    artworks: []
  //  },
  //  {
  //    title: '1990s',
  //    artworks: []
  //  },
  //  {
  //    title: '1980s',
  //    artworks: []
  //  }
  //]


  console.log({years})

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
    //artworks.data.filter.forEach(artwork => {
    //  if(artwork.attributes.yearStarted >= 2020) {

    //  }
    //})
  }, [artworks])
  

  //console.log({ twentyTwenty })
  //console.log({ twoThousand })
  //console.log({ ninties })
  //console.log({ eighties })
  return (
    <>
      <AppHeader categories={categories} currentPath='work' currentType="Work"/>
      <main>
        {/*<h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>*/}
        <section>
          <div className="underline flex flex-col space-y-6">
         
            <ToggleItem name="2020" artworks={twentyTwenty} />
            <ToggleItem name="2010" artworks={twentyTen} />
            <ToggleItem name="2000" artworks={twoThousand} />
            <ToggleItem name="1990" artworks={ninties} />
            {/*<ToggleItem name="2020s" artworks={twentyTwenty} />*/}
          </div>

                {/*<ul className="grid grid-cols-3 gap-4">
                {archiveArtworks.map((artwork, i) => 
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>*/}

        </section>
      </main>
    </>
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
            slug,
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

