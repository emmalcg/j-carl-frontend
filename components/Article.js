export default function Article({ article, passwordEntered }) {
  console.log("article", article);
  console.log("passwordEntered", passwordEntered);
  const show = !article.passwordProtected || passwordEntered
  console.log('show', show)
  return (
    <li
      className={`list-none flex flex-col md:flex-row my-7 ${
        !show && `hidden`
      }`}
    >
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
