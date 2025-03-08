import { BadRequestException, Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import * as PDFDocument from 'pdfkit';
import * as path from 'path';
import { OrderService } from '@app/service';

@Injectable()
export class InvoiceService {
  constructor(private readonly orderService: OrderService) {}

  async generateInvoiceByOrderId(orderId: number): Promise<any> {
    try {
      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        throw new Error(`Không tồn tại hóa đơn ${orderId} .`);
      }
      const { customer, orderItems } = order;

      const doc = new PDFDocument();
      const stream = new PassThrough();
      doc.pipe(stream);

      const fontPath = path.resolve('public/assets/fonts/Roboto-Regular.ttf');
      doc.font(fontPath);

      // Header
      const imagePath = path.resolve('public/Logo.png');
      doc.image(imagePath, 50, 50, { width: 50 });
      doc
        .fontSize(20)
        .text('Cửa hàng điện thoại TLO shopping', { align: 'center' })
        .moveDown();
      doc.fontSize(20).text('Hóa đơn mua hàng', { align: 'center' }).moveDown();

      const formatDate = (date: Date | string): string => {
        const d = date instanceof Date ? date : new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      doc
        .fontSize(12)
        .text(`Mã hóa đơn: ${orderId}`)
        .text(`Ngày mua hàng: ${formatDate(order.order_date)}`)
        .text(`Tên khách hàng: ${customer.customer_name}`)
        .text(`SDT: ${customer.customer_phone}`)
        .moveDown();

      doc
        .fontSize(14)
        .text('Chi tiết hóa đơn:', { underline: true })
        .moveDown();
      doc.fontSize(12);

      // Bảng sản phẩm
      const tableTop = doc.y;
      const itemMargin = 20;
      const tableWidth = 500;
      const columnWidths = [30, 200, 60, 60, 80, 70];

      doc
        .moveTo(50, tableTop)
        .lineTo(50 + tableWidth, tableTop)
        .lineTo(50 + tableWidth, tableTop + 20)
        .lineTo(50, tableTop + 20)
        .lineTo(50, tableTop)
        .stroke();

      doc
        .fontSize(10)
        .text('STT', 55, tableTop + 5, {
          width: columnWidths[0],
          align: 'center',
        })
        .text('Tên sản phẩm', 55 + columnWidths[0], tableTop + 5, {
          width: columnWidths[1],
          align: 'left',
        })
        .text('SL', 55 + columnWidths[0] + columnWidths[1], tableTop + 5, {
          width: columnWidths[2],
          align: 'center',
        })
        .text(
          'Đơn giá',
          55 + columnWidths[0] + columnWidths[1] + columnWidths[2],
          tableTop + 5,
          {
            width: columnWidths[3],
            align: 'center',
          },
        )
        .text(
          'Giá thành',
          55 +
            columnWidths[0] +
            columnWidths[1] +
            columnWidths[2] +
            columnWidths[3],
          tableTop + 5,
          {
            width: columnWidths[4],
            align: 'center',
          },
        );

      let currentY = tableTop + 20;
      orderItems.forEach((item, index) => {
        const product = item.product;

        doc
          .moveTo(50, currentY)
          .lineTo(50 + tableWidth, currentY)
          .stroke();

        doc
          .fontSize(10)
          .text(String(index + 1), 55, currentY + 5, {
            width: columnWidths[0],
            align: 'center',
          })
          .text(product.product_name, 55 + columnWidths[0], currentY + 5, {
            width: columnWidths[1],
            align: 'left',
          })
          .text(
            String(item.quantity),
            55 + columnWidths[0] + columnWidths[1],
            currentY + 5,
            {
              width: columnWidths[2],
              align: 'center',
            },
          )

          .text(
            String(`${product.product_price.toLocaleString('vi-VN')}`),
            55 + columnWidths[0] + columnWidths[1] + columnWidths[2],
            currentY + 5,
            {
              width: columnWidths[3],
              align: 'center',
            },
          )
          .text(
            String(`${item.price.toLocaleString('vi-VN')} VND`),
            55 +
              columnWidths[0] +
              columnWidths[1] +
              columnWidths[2] +
              columnWidths[3],
            currentY + 5,
            {
              width: columnWidths[4],
              align: 'center',
            },
          );

        currentY += itemMargin;
      });
      doc
        .moveTo(50, currentY)
        .lineTo(50 + tableWidth, currentY)
        .stroke();

      doc
        .fontSize(12)
        .text(
          `Tổng tiền: ${order.total_price.toLocaleString('vi-VN')} VND`,
          55,
          currentY + 10,
          {
            align: 'right',
          },
        );

      doc.moveDown(2);

      doc
        .fontSize(10)
        .text('Cảm ơn quý khách đã mua hàng', { align: 'center' })
        .moveDown();
      doc
        .fontSize(10)
        .text('TLO Shopping xin chân thành cảm ơn', { align: 'center' })
        .moveDown();

      doc.end();
      return stream;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
