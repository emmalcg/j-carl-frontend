export default function Article({ article, passwordEntered }) {
  const show = !article.passwordProtected || passwordEntered
  return (
    <li
      className={`list-none flex flex-col md:flex-row my-7 ${
        !show && `hidden`
      }`}
    >
      <a
        href={article?.document?.data?.attributes?.url}
        target="_blank"
        className="hover:underline cursor-alias"
      >
        {article.type}: "{article.title}",{" "}
        {article.publication && (
          <span className="italic">{article.publication}, </span>
        )}
        {article.author && (`${article.author}, `)} 
        { article.editor && (`Ed: ${article.editor}, `)}
        {article.year}
      </a>
    </li>
  );
}
