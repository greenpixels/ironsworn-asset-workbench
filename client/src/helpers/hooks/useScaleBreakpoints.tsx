import { useEffect, useState } from "react";

type useScaleBreakpointsProps = {
  smallScale: { smallerThan: number; thenScale: number };
  mediumScale: { smallerThan: number; thenScale: number };
  largeScale: { thenScale: number };
};

const defaultBreakpoints = {
  smallScale: { smallerThan: 400, thenScale: 0.75 },
  mediumScale: { smallerThan: 1000, thenScale: 1 },
  largeScale: { thenScale: 1.5 },
} satisfies useScaleBreakpointsProps;

export default function useScaleBreakpoints(props = defaultBreakpoints) {
  const [scale, setScale] = useState(getScale(props));

  const handleWindowResize = (props: useScaleBreakpointsProps) => {
    setScale(getScale(props));
  };

  useEffect(() => {
    const handleResize = () => handleWindowResize(props);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props]);

  return scale;
}

const getScale = (props: useScaleBreakpointsProps) => {
  const width = window.innerWidth;
  if (width) {
    if (width <= props.smallScale.smallerThan) {
      return props.smallScale.thenScale;
    } else if (width <= props.mediumScale.smallerThan) {
      return props.mediumScale.thenScale;
    } else {
      return props.largeScale.thenScale;
    }
  }
  return 0;
};
