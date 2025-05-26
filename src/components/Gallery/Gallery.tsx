import { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import useConfig from "../../useConfig";
import Card from "../Card";

const Gallery = () => {
  interface Image {
    filename: string;
    description: string;
  }

  const [data, setData] = useState<Image[]>([]); // To store the fetched data
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState<Error | null>(null); // To handle errors
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    console.log("Image set: " + image.filename);
  };

  const config = useConfig();
  const apiUrl = config ? config.apiUrl : "";

  useEffect(() => {
    if (!config) return;
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "/api/v1/image/info/all"); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text(); // Read response as text
        const data = text ? JSON.parse(text) : []; // Parse only if not empty
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
  }, [config]); // Empty dependency array ensures this runs only once after the component mounts

  useEffect(() => {
    // Function to handle clicks outside the selected image
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target as Node) &&
        textRef.current &&
        !textRef.current.contains(event.target as Node) &&
        selectedImage
      ) {
        console.log("Deselecting image");
        setSelectedImage(null); // Deselect image when clicking outside
      }
    };

    // Add event listener if there's a selected image
    if (selectedImage) {
      document.addEventListener("click", handleClickOutside);
    }

    // Clean up event listener when selectedImage changes or component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedImage]);

  //if (loading) return <div>Loading...</div>; // Loading state
  //if (error) return <div>Error: {error.message}</div>; // Error state
  //if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div className="h-screen">
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
            <div className="full-image-container">
              <div className="image-wrapper">
                <div className="container">
                  <div className="overlay">
                    <img
                      ref={imageRef}
                      src={apiUrl + "/api/v1/image/" + selectedImage.filename}
                      alt={selectedImage.description}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click event from propagating up to parent elements
                      }}
                    />
                    <div ref={textRef} className="text-container">
                      <p>{selectedImage.description}</p>
                    </div>
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
