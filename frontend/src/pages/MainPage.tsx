import React, {useEffect, useState} from 'react';

import Toggle from '../components/ToggleComponent';
import CarouselLayout from '../layouts/CarouselLayout';
import GalleryLayout from '../layouts/GalleryLayout';
import IImage from '../interfaces/IImage';
import IPhoto from '../interfaces/IPhoto';
import { getImages } from '../adapters/MainPageAdapter';

const defaultImages: IImage[] = [];
const defaultPhotos: IPhoto[] = [];

function MainPage() {
    const [layout, setLayout] = useState<boolean>(false);
    const [images, setImages]: [IImage[], (images: IImage[]) => void] = useState(defaultImages);
    const [photos, setPhotos]: [IPhoto[], (photos: IPhoto[]) => void] = useState(defaultPhotos);

    useEffect(() => {
        getImages().then(response => {
            setImages(response.data.images[0]);
            setPhotos(response.data.photos[0]);
        });
    }, []);

    const changeLayout = (): void => {
        setLayout(!layout);
    }

    return (
        <div className="App">
            <Toggle
                label='Change layout'
                layout={layout}
                changeLayout={changeLayout}
            />
            {layout
                ? <CarouselLayout images={images}></CarouselLayout>
                : <GalleryLayout photos={photos}></GalleryLayout>
            }
        </div>
    );
}

export default MainPage;
