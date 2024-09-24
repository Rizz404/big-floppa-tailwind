import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const IMAGES = [
  "https://i.pinimg.com/736x/2a/5a/3b/2a5a3b811e73c30a4359db231aa248e2.jpg",
  "https://i.pinimg.com/236x/63/dc/89/63dc8989773b6ca033e350b4196e5405.jpg",
  "https://i.pinimg.com/736x/21/7e/c6/217ec656af5e2522ce1a821d093834ac.jpg",
];

const CatCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isManually, setIsManually] = useState(false);

  const nextImage = () => {
    setIsManually(true);
    setCurrentImage((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = () => {
    setIsManually(true);
    setCurrentImage((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  useEffect(() => {
    let timer;

    if (!isManually) {
      timer = setInterval(() => {
        nextImage();
      }, 5000); // otomatis geser setiap 3 detik
    } else {
      timer = setTimeout(() => {
        setIsManually(false);
      }, 5000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [isManually]);

  return (
    <div className="group relative overflow-hidden">
      <div className="relative h-[340px] w-full">
        {IMAGES.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide ${index}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-3 text-3xl">
        <button
          type="button"
          onClick={prevImage}
          className="rounded-full bg-white p-1 opacity-0 transition duration-300 ease-out group-hover:opacity-100"
        >
          <BsArrowLeft />
        </button>
        <button
          type="button"
          onClick={nextImage}
          className="rounded-full bg-white p-1 opacity-0 transition duration-300 ease-out group-hover:opacity-100"
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};
export default CatCarousel;
