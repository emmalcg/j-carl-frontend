import Link from "next/link";
import { useRouter } from "next/router";

const findArtworkSlugsInSeries = (series, slug) => {
  let previous = false;
  let next = false;
  let length = false;
  let current = false;
  if (!series) return { previous, next };

  length = series.length;
  const index = series.findIndex((item) => item.attributes.slug === slug);
  const lastIndex = series.length - 1;
  current = index + 1;
  previous = index === 0 ? false : series[index - 1].attributes.slug;
  next = index === lastIndex ? false : series[index + 1].attributes.slug;
  return { previous, next, current, length };
};

export default function SeriesButton({ series, currentSlug }) {
  //if(!series || series.length == 0) return null

  if(!series) return null
  console.log({series})
  const { title, yearStarted, yearEnded } = series
  const seriesArtworks = series?.artworks?.data;

  const { previous, next, current, length } = findArtworkSlugsInSeries(
    seriesArtworks,
    currentSlug
  );

  const router = useRouter()
  
  console.log(router.pathname)

  return (
    <div className="text-sm items-center inline-flex">
      <Link href={`/work/${previous}`} replace>
        <a className={!previous ? "invisible" : "visible"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 my-auto mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </a>
      </Link>
      <span className="text-sm font-semibold"> {`${current} / ${length}`}</span>
      <Link href={`/work/${next}`} replace>
        <a className={!next ? "invisible" : "visible"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 my-auto ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
}
