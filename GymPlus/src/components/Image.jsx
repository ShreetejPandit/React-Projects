import { useState } from "react";

// This component helps handle relative image paths more effectively
const Image = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  // Remove leading slash if present to handle relative paths better
  const formattedSrc = src.startsWith("/") ? src.substring(1) : src;

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  return (
    <>
      {error ? (
        <div
          className={`bg-gray-200 flex items-center justify-center ${className}`}
          {...props}
        >
          <span className="text-gray-400 text-sm p-2 text-center">
            {alt || "Image not available"}
          </span>
        </div>
      ) : (
        <img
          src={formattedSrc}
          alt={alt || "Image"}
          className={className}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </>
  );
};

export default Image;
