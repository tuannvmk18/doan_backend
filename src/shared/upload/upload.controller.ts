import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Public } from 'nest-keycloak-connect';

@Controller('upload')
export class UploadController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file_name: file.filename,
    };
  }

  @Get(':filename')
  @Public()
  getFile(@Param('filename') filename, @Res() res) {
    const filePath = join(process.cwd(), 'upload/' + filename);
    return res.download(filePath);
  }
}
