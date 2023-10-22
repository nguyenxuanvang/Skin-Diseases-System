import React, { useState, useEffect } from 'react';

const Slider = ({ images, interval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, interval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [images.length, interval]);

  return (
    <div className="slider-container">
      <div className="slider-image-wrapper">
        <img src={images[currentSlide]} alt="Slide" className="slider-image"  style={{ width: '100%', height: '400px' }}/>
      </div>
    </div>
  );
};

export default Slider;