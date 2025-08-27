import React, { useState } from 'react'

interface ImageWithFallbackProps {
  src: string;
  fallback: string;
  alt: string;
  [key: string]: any;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  )
}

export default ImageWithFallback
