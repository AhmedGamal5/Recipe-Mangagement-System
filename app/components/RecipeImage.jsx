"use client";

import { useState } from "react";
import Image from "next/image";

export default function RecipeImage({ src, alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  // const fallbackSrc = "/images/placeholder.jpg";

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      // {...props}
      // onError={() => setImgSrc(fallbackSrc)}
      width={800}
      height={600}
      style={{ objectFit: "cover" }}
    />
  );
}