import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ArtworkInfo from "./ArtworkInfo";
import ArtworkImage from "./ArtworkImage";
import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageLoading from "./ArtworkLoadImage";

export default function ArtworkSidePanel({artwork}) {
  const router = useRouter();
  const workParam = router.query.work;

  const handleClose = () => {
    router.push(router.pathname, undefined, { shallow: true });
  };

  console.log({ artwork });

  if (!workParam) return null;
  return (
    <div
      className="border border-black h-[calc(100vh-150px)] w-[calc(40vw-20px)] mt-7 flex flex-col fixed right-20 top-[104px] p-3"
      //className="border border-black min-w-[35rem] max-h-[45rem] mt-7 flex flex-col fixed right-20 top-[104px] p-3"
    >
      <button
        type="button"
        className="ml-auto rounded-md bg-white text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleClose}
      >
        <span className="absolute -inset-2.5" />
        <span className="sr-only">Close panel</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {artwork && (
        <>
          <ImageLoading
            thumbnail
            image={artwork.thumbnail.data.attributes}
            index={1}
            size="small"
            shrinkHeight={true}
            responsive={false}
          />

          <article className="my-3.5">
            <div className="pb-2">{artwork.title}</div>
            <ArtworkInfo artwork={artwork} />
          </article>
        </>
      )}
    </div>
  );
}
