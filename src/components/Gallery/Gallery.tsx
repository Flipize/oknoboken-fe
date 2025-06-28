import { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import useConfig from "../../useConfig";
import Card from "../Card";

const Gallery = () => {
  interface Image {
    filename: string;
    description: string;
  }

  const [data, setData] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const config = useConfig();
  const apiUrl = config ? config.apiUrl : "";

  useEffect(() => {
    if (!config) return;
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "/api/v1/image/info/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          console.error("Unknown error occurred:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target as Node) &&
        textRef.current &&
        !textRef.current.contains(event.target as Node) &&
        selectedImage
      ) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedImage]);

  return (
    <div className="">
      <Card title="Galleri">
        <div>
          <div>
            <div className="container">
              {loading && (
                <div>
                  <p>Loading...</p>
                </div>
              )}
              {error && <div>{error.message}</div>}
              <div className="row g-2">
                {data.map((image, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-4 col-md-4 ps-1 pe-1"
                  >
                    <div className="square-image-container">
                      <img
                        src={apiUrl + "/api/v1/image/" + image.filename}
                        alt={image.description}
                        className="img-thumbnail"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click event from propagating up to parent elements
                          handleImageClick(image); // Handles the image click
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative bg-white rounded-xl shadow-2xl md:w-[95%] max-w-3xl md:max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-gray-800 z-10"
                >
                  &times;
                </button>

                <div className="flex flex-col items-center p-4 pt-10">
                  <img
                    ref={imageRef}
                    src={apiUrl + "/api/v1/image/" + selectedImage.filename}
                    alt={selectedImage.description}
                    className="max-h-[60vh] w-auto h-auto rounded-md mb-4"
                  />
                  <div
                    ref={textRef}
                    className="regular-text-font text-gray-800 text-center w-full"
                  >
                    {selectedImage.description}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Gallery;
