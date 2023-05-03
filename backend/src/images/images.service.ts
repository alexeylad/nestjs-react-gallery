import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, forkJoin, map, Observable } from 'rxjs';
import { ImagePhotoMergedDto } from './dto/image-photo-merged.dto';
import { GetPhotoDto } from './dto/get-photo.dto';
import { GetImageDto } from './dto/get-image.dto';
import { HttpService } from '@nestjs/axios';

const API_PATH =
  'https://my-json-server.typicode.com/icedrone/json-demo-server';
const IMAGES_URL = API_PATH + '/images';
const PHOTOS_URL = API_PATH + '/photos';

@Injectable()
export class ImagesService {
  constructor(private httpService: HttpService) {}
  findAll(): Observable<ImagePhotoMergedDto> {
    const photos$ = this.httpService
      .get<GetImageDto[]>(IMAGES_URL)
      .pipe(map((response) => response?.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const images$ = this.httpService
      .get<GetPhotoDto[]>(PHOTOS_URL)
      .pipe(map((response) => response?.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return forkJoin([photos$, images$]).pipe(
      map(([images, photos]) => ({
        images,
        photos,
      })),
    );
  }
}
