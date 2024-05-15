import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ArtworkInfo from "./ArtworkInfo";
import ArtworkImage from "./ArtworkImage";

const mockArtwork = {
    __typename: "ArtworkEntity",
    id: "109",
    attributes: {
      __typename: "Artwork",
      title: "Pneu",
      yearStarted: 2023,
      yearEnded: null,
      materials: "Black Kilkenny marble on reclaimed Ontario Hemlock",
      dimensions: '25" in diameter, 6 1/2" (h) ',
      description: null,
      thumbnail: {
        __typename: "UploadFileEntityResponse",
        data: {
          __typename: "UploadFileEntity",
          attributes: {
            __typename: "UploadFile",
            url: "https://res.cloudinary.com/dgonyuzzz/image/upload/v1707188302/james/2023_Pneu_thumb_972ecd8ed8.jpg",
            formats: {
              large: {
                ext: ".jpg",
                url: "https://res.cloudinary.com/dgonyuzzz/image/upload/v1707188303/james/large_2023_Pneu_thumb_972ecd8ed8.jpg",
                hash: "large_2023_Pneu_thumb_972ecd8ed8",
                mime: "image/jpeg",
                name: "large_2023-Pneu-thumb.jpg",
                path: null,
                size: 155,
                width: 1000,
                height: 854,
                provider_metadata: {
                  public_id: "james/large_2023_Pneu_thumb_972ecd8ed8",
                  resource_type: "image",
                },
              },
              small: {
                ext: ".jpg",
                url: "https://res.cloudinary.com/dgonyuzzz/image/upload/v1707188304/james/small_2023_Pneu_thumb_972ecd8ed8.jpg",
                hash: "small_2023_Pneu_thumb_972ecd8ed8",
                mime: "image/jpeg",
                name: "small_2023-Pneu-thumb.jpg",
                path: null,
                size: 51.54,
                width: 500,
                height: 427,
                provider_metadata: {
                  public_id: "james/small_2023_Pneu_thumb_972ecd8ed8",
                  resource_type: "image",
                },
              },
              medium: {
                ext: ".jpg",
                url: "https://res.cloudinary.com/dgonyuzzz/image/upload/v1707188304/james/medium_2023_Pneu_thumb_972ecd8ed8.jpg",
                hash: "medium_2023_Pneu_thumb_972ecd8ed8",
                mime: "image/jpeg",
                name: "medium_2023-Pneu-thumb.jpg",
                path: null,
                size: 99.54,
                width: 750,
                height: 641,
                provider_metadata: {
                  public_id: "james/medium_2023_Pneu_thumb_972ecd8ed8",
                  resource_type: "image",
                },
              },
              thumbnail: {
                ext: ".jpg",
                url: "https://res.cloudinary.com/dgonyuzzz/image/upload/v1707188303/james/thumbnail_2023_Pneu_thumb_972ecd8ed8.jpg",
                hash: "thumbnail_2023_Pneu_thumb_972ecd8ed8",
                mime: "image/jpeg",
                name: "thumbnail_2023-Pneu-thumb.jpg",
                path: null,
                size: 18,
                width: 183,
                height: 156,
                provider_metadata: {
                  public_id: "james/thumbnail_2023_Pneu_thumb_972ecd8ed8",
                  resource_type: "image",
                },
              },
            },
            caption: "2023-Pneu-thumb.jpg",
            width: 1264,
            height: 1080,
          },
        },
      },
    },
};

export default function ArtworkSlideOut({artworkData}) {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="test pointer-events-none h-[calc(100vh-150px)] w-[calc(40vw-20px)] mt-7 flex flex-col fixed right-20 top-[104px]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto bg-white border border-black h-full w-full">
                  <div className="p-3">
                    <div className="flex items-start">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 hidden">
                        {artworkData.title}
                      </Dialog.Title>
                      <div className="ml-auto flex h-7 items-center">
                        <button
                          type="button"
                          className="relative rounded-md bg-white text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {artworkData && (
                      <>
                        {/*<ArtworkImage
                          image={artworkData.thumbnail.data.attributes}
                          index={1}
                          size="small"
                          shrinkHeight={true}
                          responsive={false}
                        />*/}

                        <p className="pb-2">{artworkData.title}</p>

                        <article className="my-3.5">
                          <ArtworkInfo artwork={artworkData} />
                        </article>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
