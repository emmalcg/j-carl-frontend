import { useRouter } from "next/router";
import Link from "next/link";

export default function BackButton({link}) {
  const router = useRouter()

  if(link) return (
    <div
      onClick={() => {
        localStorage.setItem("showLoading", false);
      }}
    >
      <Link href={link}>
        <a className="inline-flex shrink text-sm hover:underline hover:font-semibold items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mt-[1px] mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </a>
      </Link>
    </div>
  );

  const backFunction = () => {
    localStorage.setItem("showLoading", false);
    router.back()
  }
  return (
    <button
      type="button"
      onClick={backFunction}
      className="inline-flex shrink text-sm hover:underline hover:font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 mt-[2px] mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      Back
    </button>
  );
}
