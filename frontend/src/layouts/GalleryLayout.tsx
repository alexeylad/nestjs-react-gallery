import React, {FC} from 'react';
import IPhoto from '../interfaces/IPhoto';
import './GalleryLayout.css';
interface GalleryLayoutProps {
    photos: IPhoto[];
}
const GalleryLayout: FC<GalleryLayoutProps> = ({ photos }) => {
    return (
        <div className="gallery">
            {photos.map((photo) => (
                <div key={photo.id + ''} className="gallery-item">
                    <img key={photo.id + ''} src={photo.thumbnailUrl} alt={`${photo.title}`} width={50} height={50}/>
                    <span>{photo.title}</span>
                </div>
            ))}
        </div>
    );
}

export default GalleryLayout;
