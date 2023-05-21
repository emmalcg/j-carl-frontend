import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const usePreviousSlug = () => {
  const router = useRouter();
  const previousSlugRef = useRef("");
  const currentSlugRef = useRef("");

  useEffect(() => {
    if (router && router.asPath) {
      const currentSlug = router.asPath.replace(/\//g, "");
      previousSlugRef.current = currentSlugRef.current;
      currentSlugRef.current = currentSlug;
    }
  }, [router.asPath]);

  return previousSlugRef.current;
};

export default usePreviousSlug;
