export const DotButton = ({ selected, onClick }) => (
  <button
    className={`bg-transparent relative min-w-[30px] min-h=[30px] mr-[7.5px] ml-[7.5px] outline-none border-none p-0 flex items-center`}
    type="button"
    onClick={onClick}
  />
);

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="absolute touch-manipulation outline-none border-none w-[100px] sm:w-[200px] h-[30%] sm:h-[80%] p-0 cursor-pointer bg-transparent z-10 bottom-[35px] sm:bottom-[40px] left-0"
    onClick={onClick}
    disabled={!enabled}
    name="previous"
  >

  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="absolute touch-manipulation outline-none border-none w-[100px] sm:w-[200px] h-[30%] sm:h-[70%] p-0 cursor-pointer bg-transparent z-10 bottom-[35px] sm:bottom-[40px] right-0"
    onClick={onClick}
    disabled={!enabled}
    name="next"
  >
  </button>
);

export const PrevArrow = ({ onClick, enabled }) => (
  <button
    className="touch-manipulation outline-none border-none h-[20px] w-[30px] p-1 cursor-pointer bg-transparent z-10 my-auto"
    onClick={onClick}
    disabled={!enabled}
    name="previous"
  >
    <svg className="w-full h-full" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
)

export const NextArrow = ({ onClick, enabled }) => (
  <button
    className="touch-manipulation outline-none border-none h-[20px] w-[30px] p-1 cursor-pointer bg-transparent z-10 my-auto"
    onClick={onClick}
    disabled={!enabled}
    next="next"
  >
    <svg className="w-full h-full" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);