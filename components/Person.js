import MyImage from "./MyImage"

export default function Person({person}) {


//  const { API_URL } = process.env
//artwork.media.data.map(image => {console.log(image.attributes.url)})

  console.log(person)
  return (
    <li>
      <h3 className="sr-only">{person.firstName} {person.lastName}</h3>
      <p>{person.bio}</p>
      {/*<div>
        {
          artwork.media.data.map(image => <MyImage src={image.attributes.url} alt={image.attributes.caption}/>)
        }
      </div>*/}
      <a href="{CV.data.attributes.url}">CV</a>

    </li>
  )
}
