import Artwork from "../components/artwork"

export default function Work({ artworks }) {
  console.log(artworks)
  return (
    <>
    <p>hi</p>
      {
        artworks.data.map(artwork => {
          console.log(artwork)
          //<Artwork key={artwork.id} artwork={artwork.attributes} />
        })
      }
    </>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env
  const res = fetch(`${API_URL}/artworks?populate=*`)
  const data = await (await res).json()
  return {
    props: {
      artworks: data
    }
  }
}