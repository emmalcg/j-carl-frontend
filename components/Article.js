export default function Article({article}) {

  return (
    <li className="list-none flex flex-col md:flex-row my-7">
      <a href={article.Document.data.attributes.url} className="underline">{`Download ${article.title} PDF`}</a>
    </li>
  )
}
