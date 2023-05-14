import MyImage from "./MyImage";

export default function Mugshots({ mugshotsData }) {
  const mugshots = mugshotsData.map((mug) => ({
    formats: mug.attributes.formats,
    src: mug.attributes.url,
    width: mug.attributes.width,
    height: mug.attributes.height,
    name: mug.attributes.alternativeText,
  }));

  const compare = (a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()

    let comparison = 0 

    if (nameA > nameB) {
      comparison = 1
    } else if (nameA < nameB) {
      comparison = -1
    }
    return comparison
  }

  mugshots.sort(compare)
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:grid-cols-3 md:grid-cols-5 lg:gap-x-4 mb-10">
      {mugshots.map((mug) => (
        <div key={mug.src} className="group relative">
          <div>
            <div className="w-full overflow-hidden object-cover">
              <MyImage image={mug} size="thumbnail" index={0}></MyImage>
            </div>
            <div>
              <p className="text-center border border-black opacity-0 group-hover:opacity-100">
                {mug.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
