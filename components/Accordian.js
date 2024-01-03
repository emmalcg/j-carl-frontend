import { useState, useEffect } from "react";

export const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="rounded-sm flex md:flex-row mt-7"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex h-full mr-2">
          <svg
            className={`mt-[7px] ${open && `rotate-90`}`}
            fill="none"
            height="10"
            viewBox="0 0 10 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="m.435568 15.4939c-.272762-.3118-.241174-.7856.070554-1.0583l7.354938-6.43561-7.354938-6.43557c-.311728-.27276-.343316-.746581-.070554-1.058309.272761-.311727.746582-.343316 1.058312-.070554l8 7.000003c.16276.14241.25612.34816.25612.56443s-.09336.42202-.25612.56443l-8 6.99998c-.31173.2728-.785551.2412-1.058312-.0705z"
              fill="black"
              fillRule="evenodd"
            />
          </svg>
        </div>
        {title}
      </button>
      {open && <div className="pl-6">{children}</div>}
    </div>
  );
};
