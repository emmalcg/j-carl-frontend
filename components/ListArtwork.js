import Link from 'next/link'
import { useRouter } from 'next/router';

export default function ListArtwork({ artwork, series, categorySlug }) {
  const router = useRouter();
  const slug = artwork.slug;

  const setUrlStorage = () => {
    localStorage.setItem("categorySlug", categorySlug);
  }
  return (
    <li
      id={slug}
      className="list-none flex flex-col md:flex-row mt-7 ml-6 text-inherit"
    >
      <Link
        href={`${router.pathname}?work=${slug}`}
        shallow
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
