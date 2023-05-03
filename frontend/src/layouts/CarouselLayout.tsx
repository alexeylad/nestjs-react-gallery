import React, {FC, useState} from 'react';
import IImage from '../interfaces/IImage';
import './CarouselLayout.css';

interface CarouselLayoutProps {
    images: IImage[];
}

const CarouselLayout: FC<CarouselLayoutProps> = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    return (
        <div className="carousel">
            <div className="carousel-item">
                <img src={images[currentIndex].path} alt={`${images[currentIndex].title}`}/>
            </div>
            <div className="carousel-inner">
                <button className="carousel-prev" onClick={handlePrevClick}>Prev</button>
                <button className="carousel-next" onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
}

export default CarouselLayout;
