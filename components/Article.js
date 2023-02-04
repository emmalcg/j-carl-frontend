export default function Article({article}) {
  return (
    <li className="list-none flex flex-col md:flex-row my-7">
      <a
        href={article.Document.data.attributes.url}
        target="_blank"
        className="underline cursor-alias"
      >
        {article.displayName}
      </a>
    </li>
  );
}
