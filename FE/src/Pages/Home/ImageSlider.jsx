import React from 'react'
import ImageSlider from '../../components/ImageSlider';
function HomeSlider() {
  const images = [
    'images/Slider/ImageSlider_1.jpg',
    'images/Slider/ImageSlider_2.jpg',
    'images/Slider/ImageSlider_3.jpg',
    'images/Slider/ImageSlider_4.jpg',
  ];

  return (
    <div className="App">
      <ImageSlider images={images}/>
    </div>
  );
  }
export default HomeSlider