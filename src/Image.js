import React, { useEffect, useState } from 'react';

const App = () => {
  const images = [
    'https://thenewsmen.co.in/public/upload/news/story_image_1661166146.jpg','https://media.gettyimages.com/id/1171492809/photo/prime-minister-of-pakistan-imran-khan-addresses-the-united-nations-general-assembly-at-un.jpg?s=612x612&w=gi&k=20&c=mCD3JIbncfCjxEhBY2vm74FwVZuMLuUhYnKGyDu3fH4=','https://newsimage.radio.gov.pk/20201126/12824844071606359241.jpg','https://i.brecorder.com/large/2020/11/5fbe52ec79762.jpg'
  ];

  const interval = 2000; // Transition delay in milliseconds

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, interval);

    return () => {
      clearTimeout(timer);
    };
  }, [currentImageIndex, images.length, interval]);

  return (
    <div>
      <div className="image-slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            style={{ opacity: currentImageIndex === index ? 1 : 0  }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;