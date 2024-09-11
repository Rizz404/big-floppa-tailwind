import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const IMAGES = [
  "https://i.pinimg.com/736x/2a/5a/3b/2a5a3b811e73c30a4359db231aa248e2.jpg",
  "https://i.pinimg.com/236x/63/dc/89/63dc8989773b6ca033e350b4196e5405.jpg",
  "https://i.pinimg.com/736x/21/7e/c6/217ec656af5e2522ce1a821d093834ac.jpg",
];

const CatCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-images"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {IMAGES.map((src, index) => (
          <img
            key={index}
            className="carousel-image"
            src={src}
            alt={`Slide ${index}`}
          />
        ))}
      </div>
      <div className="carousel-nav flex-between base-gap">
        <button type="button" onClick={prevImage}>
          <BsArrowLeft />
        </button>
        <button type="button" onClick={nextImage}>
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};
export default CatCarousel;
