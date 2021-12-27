import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Public } from 'nest-keycloak-connect';
import * as os from 'os';

@Controller('upload')
export class UploadController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return {
      file_name: file.filename,
      file_url: req.headers.host + `/upload/${file.filename}`,
    };
  }

  @Get(':filename')
  @Public()
  getFile(@Param('filename') filename, @Res() res) {
    const filePath = join(process.cwd(), 'upload/' + filename);
    return res.download(filePath);
  }
}
