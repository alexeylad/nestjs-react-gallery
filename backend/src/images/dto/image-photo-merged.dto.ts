import { GetImageDto } from './get-image.dto';
import { GetPhotoDto } from './get-photo.dto';

export class ImagePhotoMergedDto {
  images: GetImageDto[];
  photos: GetPhotoDto[];
}
