/** @format */

import { useState, useEffect } from "react";

export const useInView = (
  ref: React.MutableRefObject<Element | null>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    currentRef && observer.observe(currentRef);

    return () => {
      currentRef ? observer.unobserve(currentRef) : null;
    };
  }, [ref, rootMargin]);
  if (!ref) return false;
  return isVisible;
};
