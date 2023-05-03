import { Controller, Get, ForbiddenException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagePhotoMergedDto } from './dto/image-photo-merged.dto';
import { Observable } from 'rxjs';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll(): Observable<ImagePhotoMergedDto> {
    return this.imagesService.findAll();
  }
}
