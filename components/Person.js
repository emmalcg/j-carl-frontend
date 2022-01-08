import MyImage from "./MyImage"
import ReactMarkdown from 'react-markdown'

export default function Person({person}) {

const { MEDIA_URL } = process.env
const cvURL = MEDIA_URL + person.CV.data.attributes.url

//  const { API_URL } = process.env
//artwork.media.data.map(image => {console.log(image.attributes.url)})

  console.log(person.bio)
  return (
    <li>
      <h3 className="sr-only">{person.firstName} {person.lastName}</h3>
      <ReactMarkdown>{person.bio}</ReactMarkdown>
      {/*<div>
        {
          artwork.media.data.map(image => <MyImage src={image.attributes.url} alt={image.attributes.caption}/>)
        }
      </div>*/}
      <a href={cvURL}>CV</a>

    </li>
  )
}
