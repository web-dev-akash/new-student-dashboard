import { useEffect } from "react";

export const useDynamicStatusBarColor = (color) => {
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", color);

    return () => {
      metaTag.setAttribute("content", "");
    };
  }, [color]);
};
