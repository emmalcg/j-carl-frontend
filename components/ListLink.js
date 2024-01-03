import Link from 'next/link'

export default function ListLink({ artwork, series, categorySlug }) {
 
  const slug = artwork.slug;

  const setUrlStorage = () => {
    localStorage.setItem("categorySlug", categorySlug);
  }
  return (
    <li className="list-none flex flex-col md:flex-row mt-7 ml-6">
      <Link
        href={`/work/${slug}`}
        key={`${slug}`}
        onClick={setUrlStorage}
      >
        <a className="hover:underline">
          <span>{artwork.title}</span>, {artwork.yearStarted}
          {artwork.yearEnded && `-${artwork.yearEnded}`}
        </a>
      </Link>
    </li>
  );
}
