import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadDiskStorage } from './provider/file_disk_storage.provider';

@Module({
  imports: [
    MulterModule.register({
      storage: FileUploadDiskStorage,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
