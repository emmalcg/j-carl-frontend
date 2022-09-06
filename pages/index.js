import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import AppHeader from '../components/AppHeader'
import MyImage from '../components/MyImage'

export default function Home({ homepage }) {

  const categories = homepage.categories.data

  const mugshots = homepage.mugshots.data[0].attributes.Images.data.map((mug) => ({
    formats: mug.attributes.formats,
    src: mug.attributes.url,
    width: mug.attributes.width,
    height: mug.attributes.height,
    name: mug.attributes.alternativeText
  }))

  const compare = (a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()

    let comparison = 0 

    if (nameA > nameB) {
      comparison = 1
    } else if (nameA < nameB) {
      comparison = -1
    }
    return comparison
  }

  mugshots.sort(compare)

  //thing’s end (Wuhan), #1 pk. entrance plaza, Wuhan, China, 2018
  return (
    <>
      <AppHeader categories={categories}/>
      <main>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-4">
          {mugshots.map((mug) => (
            <div key={mug.src} className="group relative">
              <div>
                <div className="w-full overflow-hidden object-cover">
                  <MyImage
                    image={mug}
                    size="thumbnail"
                    index={0}
                    ></MyImage>
                </div>
                <div>
                  <p className="text-center border border-black opacity-0 group-hover:opacity-100">{mug.name}</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
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
    query getHomepage {
      categories (sort: ["title"]){
        data {
          attributes {
            title,
            type,
            slug
          }
        }
      },
      mugshots {
        data {
          id,
          attributes {
            Images {
              data {
                attributes {
                  formats,
                  url,
                  width,
                  height,
                  alternativeText
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
