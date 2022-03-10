import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import MyImage from './MyImage'

export default function Person({person}) {

  const img = person.image.data.attributes

  return (
    <li className="list-none flex flex-col md:flex-row my-7">
      <h3 className="sr-only">{person.firstName} {person.lastName}</h3>
      <div className="prose">
        <ReactMarkdown>{person.bio}</ReactMarkdown>
        <a href={person.CV.data.attributes.url}>CV</a>
      </div>
      <div className="relative order-first min-w-[320px] max-w-[320px] min-h-[260px] max-h-[260px] m-auto mb-2 md:mr-5 md:mt-2">
          <MyImage 
            image={img}
            size="medium"
            index={1}
          /> 
      </div>
    </li>
  )
}
