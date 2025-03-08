import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from '@app/service';
import { Response } from 'express';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Hóa đơn')
@ApiBearerAuth()
@Controller('invoice')
@UseGuards(RolesGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Role('USER', 'ADMIN')
  @Get(':orderId')
  @ApiOperation({
    summary: 'Tạo và tải xuống hóa đơn theo orderId',
    description: 'API tạo hóa đơn PDF và trả về file dựa trên ID đơn hàng.',
  })
  @ApiParam({
    name: 'orderId',
    description: 'ID của đơn hàng cần tạo hóa đơn',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Hóa đơn được tạo và trả về thành công dưới dạng file PDF.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy hóa đơn hoặc có lỗi xảy ra.',
  })
  async generateInvoice(
    @Param('orderId') orderId: number,
    @Res() res: Response,
  ) {
    try {
      const invoiceStream =
        await this.invoiceService.generateInvoiceByOrderId(orderId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="invoice.pdf"',
      );
      invoiceStream.pipe(res);
    } catch (error) {
      console.error(error.message);
      res.status(404).send(error.message);
    }
  }
}
