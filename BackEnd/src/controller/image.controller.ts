import { Controller, Get, Param, Res, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';
import { ApiOperation, ApiParam, ApiTags, ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
@Controller('upload')
@ApiBearerAuth()
@ApiTags('Hình ảnh')
@UseGuards(RolesGuard)
export class ImagesController {
  @Role('USER', 'ADMIN')
  @Post(':folderName')
  @ApiOperation({
    summary: 'Upload ảnh theo tên folderName và file ',
    description: ' Chỉ ADMIN và nhân viên có quyền truy cập.',
  })
  @ApiParam({
    name: 'folderName',
    description: 'Tên thư mục để lưu ảnh',
    required: true,
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Chọn file để upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folderName = req.params.folderName;
          const uploadPath = path.join(process.cwd(), 'public', 'images', folderName);
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file, @Param('folderName') folderName: string) {
    return { url: `${folderName}/${file.filename}` };
  }
}
