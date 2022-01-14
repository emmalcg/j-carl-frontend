import MyImage from "./MyImage"
import ReactMarkdown from 'react-markdown'

export default function Person({person}) {

//  const { API_URL } = process.env
//artwork.media.data.map(image => {console.log(image.attributes.url)})

  console.log(person)
  return (
    <li className="list-none flex flex-col md:flex-row my-7">
      <h3 className="sr-only">{person.firstName} {person.lastName}</h3>
      <div>
        <ReactMarkdown>{person.bio}</ReactMarkdown>
        <a href={person.CV.data.attributes.url}>CV</a>
      </div>
      <div className="relative order-first min-w-[320px] max-w-[320px] min-h-[260px] max-h-[260px] m-auto border mb-2 md:m-auto md:mr-5">
          <MyImage key={person.image.data.attributes.url} image={person.image.data.attributes} />
      </div>

      {/*<div>
        {
          artwork.media.data.map(image => <MyImage src={image.attributes.url} alt={image.attributes.caption}/>)
        }
      </div>*/}

    </li>
  )
}
