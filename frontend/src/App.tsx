import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Toggle from './components/ToggleComponent';
import CarouselLayout from './layouts/CarouselLayout';
import GalleryLayout from './layouts/GalleryLayout';
import IImage from './interfaces/IImage';
import IPhoto from './interfaces/IPhoto';

interface IResponse {
  images: IImage[],
  photos: IPhoto[],
}
const defaultImages: IImage[] = [];
const defaultPhotos: IPhoto[] = [];
function App() {
    const [layout, setLayout] = useState<boolean>(false);
    const [images, setImages]: [IImage[], (images: IImage[]) => void] = useState(defaultImages);
    const [photos, setPhotos]: [IPhoto[], (photos: IPhoto[]) => void] = useState(defaultPhotos);
    const fetchData = async (): Promise<void> => {
        await axios
            .get<IResponse>('http://localhost:3000/images')
            .then((response) => {
                // @ts-ignore
                setImages(response.data.images[0]);
                // @ts-ignore
                setPhotos(response.data.photos[0]);
            });
    }

  useEffect(() => {
      fetchData();
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
        { layout
            ? <CarouselLayout images={images}></CarouselLayout>
            : <GalleryLayout photos={photos}></GalleryLayout>
        }
    </div>
  );
}

export default App;
