import { useState, useEffect } from "react";

export const LazyImage = ({ src, alt, className }:{src:string,alt:string,className:string}) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={loaded ? imageSrc : "placeholder.jpg"} // Show placeholder while loading
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};
