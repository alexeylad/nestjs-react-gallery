import axios from 'axios';
import IImage from '../interfaces/IImage';
import IPhoto from '../interfaces/IPhoto';

interface IResponse {
    images: IImage[],
    photos: IPhoto[],
}

const API_URL: string = 'http://localhost:3000/images';

export function getImages(): Promise<any> {
    return axios.get<IResponse>(API_URL);
}
