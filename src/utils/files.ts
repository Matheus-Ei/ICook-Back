import { Request } from 'express';
import multer, { StorageEngine, FileFilterCallback, Multer } from 'multer';

export interface ImageUploadOptions {
  fileSizeLimit?: number;
  storageEngine?: StorageEngine;
}

export class ImageUpload {
  private multerInstance: Multer;

  constructor(options?: ImageUploadOptions) {
    const { fileSizeLimit = 5 * 1024 * 1024, storageEngine } = options || {};
    const storage = storageEngine || multer.memoryStorage();

    this.multerInstance = multer({
      storage,
      fileFilter: ImageUpload.imageFileFilter,
      limits: { fileSize: fileSizeLimit },
    });
  }

  single(fieldName: string) {
    return this.multerInstance.single(fieldName);
  }

  array(fieldName: string, maxCount?: number) {
    return this.multerInstance.array(fieldName, maxCount);
  }

  fields(fields: { name: string; maxCount?: number }[]) {
    return this.multerInstance.fields(fields);
  }

  private static imageFileFilter(
    _: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('This file is not an image'));
    }
  }
}
