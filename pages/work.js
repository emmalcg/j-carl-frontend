import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader'
//import Artwork from '../components/Artwork'
//import Article from '../components/Article'
import ArtworkThumbnail from '../components/ArtworkThumbnail'

export default function work({ artworks, categories }) {
  console.log(artworks)
  const [ twentyTwenty, setTwentyTwenty ] = useState([])
  const [ twentyTen, setTwentyTen ] = useState([])
  const [ twoThousand, setTwoThousand ] = useState([])
  const [ ninties, setNinties ] = useState([])
  const [ eighties, setEighties ] = useState([])
  useEffect(() => {
    const filtered = artworks.data.filter(artwork => artwork.attributes.archive)
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

    //artworks.data.filter.forEach(artwork => {
    //  if(artwork.attributes.yearStarted >= 2020) {

    //  }
    //})
  }, [artworks])
  

  console.log({ twentyTwenty })
  console.log({ twoThousand })
  console.log({ ninties })
  console.log({ eighties })
  return (
    <>
      <AppHeader categories={categories} currentPath='work' currentType="Work"/>
      <main>
        {/*<h2 className="text-lg font-semibold mb-3.5">{category.attributes.title}</h2>*/}
        <section>
          <div className="underline flex flex-col space-y-3">
            <div className="w-full flex justify-between"><a href="">2020s</a><button>Expand</button></div>
              <ul className="grid grid-cols-3 gap-4">
                {twentyTwenty.map((artwork, i) => 
                  i < 3 &&
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>
            <div className="w-full flex justify-between"><a href="">2010s</a><button>Expand</button></div>
              <ul className="grid grid-cols-3 gap-4">
                {twentyTen.map((artwork, i) => 
                  i < 3 &&
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>
            <div className="w-full flex justify-between"><a href="">2000s</a><button>Expand</button></div>
              <ul className="grid grid-cols-3 gap-4">
                {twoThousand.map((artwork, i) => 
                   i < 3 &&
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>
            <div className="w-full flex justify-between"><a href="">1990s</a><button>Expand</button></div>
              <ul className="grid grid-cols-3 gap-4">
                {ninties.map((artwork, i) => 
                   i < 3 &&
                  //<Artwork key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/>    
                  <ArtworkThumbnail key={`${artwork.attributes.title}${i}`} artwork={artwork.attributes}/> 
                  )
                }
              </ul>
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


