import { Controller, Get, ForbiddenException } from '@nestjs/common';
import { GetImageDto } from './dto/get-image.dto';
import { GetPhotoDto } from './dto/get-photo.dto';
import { ImagePhotoMergedDto } from './dto/image-photo-merged.dto';
import { Observable, map, forkJoin, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const API_PATH =
  'https://my-json-server.typicode.com/icedrone/json-demo-server';
const IMAGES_URL = API_PATH + '/images';
const PHOTOS_URL = API_PATH + '/photos';

@Controller('images')
export class ImagesController {
  constructor(private httpService: HttpService) {}

  @Get()
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
