import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ReportService } from '@app/service';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';

@ApiBearerAuth()
@Controller('reports')
@UseGuards(RolesGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiTags('Báo cáo nhân viên')
  @Role('USER')
  @Get('/user/report/today')
  @ApiOperation({
    summary: 'Báo cáo hôm nay',
    description: 'Lấy báo cáo đơn hàng của ngày hôm nay. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của ngày hôm nay được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getUserTodayReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getUserTodayReport(page, limit);
  }

  // Báo cáo hôm qua
  @ApiTags('Báo cáo nhân viên')
  @Role('USER')
  @Get('/user/report/yesterday')
  @ApiOperation({
    summary: 'Báo cáo hôm qua',
    description: 'Lấy báo cáo đơn hàng của ngày hôm qua. Chỉ nhân viên có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của ngày hôm qua được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getUserYesterdayReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getUserYesterdayReport(page, limit);
  }

  @ApiTags('Báo cáo nhân viên')
  @Role('USER')
  @Get('/user/report/last-7-days')
  @ApiOperation({
    summary: 'Báo cáo 7 ngày qua',
    description: 'Lấy báo cáo đơn hàng trong 7 ngày gần nhất. Chỉ USER có quyền truy cập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo 7 ngày qua được trả về thành công.',
    type: Object,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getUserLast7DaysReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getUserLast7DaysReport(page, limit);
  }

  @ApiTags('Báo cáo nhân viên')
  @Role('USER')
  @Get('/user/report/this-month')
  @ApiOperation({
    summary: 'Báo cáo tháng này',
    description: 'Lấy báo cáo đơn hàng của tháng hiện tại. Chỉ nhân viên có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của tháng hiện tại được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getUserThisMonthReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getUserThisMonthReport(page, limit);
  }

  @ApiTags('Báo cáo nhân viên')
  @Role('USER')
  @Get('/user/report/date-range')
  @ApiOperation({
    summary: 'Báo cáo trong khoảng thời gian cụ thể',
    description: 'Lấy báo cáo đơn hàng trong khoảng thời gian được chỉ định. Dành cho USER.',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Ngày bắt đầu (định dạng ISO, ví dụ: 2024-01-01)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'Ngày kết thúc (định dạng ISO, ví dụ: 2024-01-31)',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo trong khoảng thời gian được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi định dạng ngày hoặc thiếu tham số.',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getUserReportByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.reportService.getUserReportByDateRange(start, end , page , limit);
  }

  @ApiTags('Báo cáo Admin')
  @Role('ADMIN')
  @Get('/admin/report/today')
  @ApiOperation({
    summary: 'Báo cáo hôm nay',
    description: 'Lấy báo cáo đơn hàng của ngày hôm nay. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của ngày hôm nay được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getTodayReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getTodayReport(page, limit);
  }

  // Báo cáo hôm qua
  @ApiTags('Báo cáo Admin')
  @Role('ADMIN')
  @Get('/admin/report/yesterday')
  @ApiOperation({
    summary: 'Báo cáo hôm qua',
    description: 'Lấy báo cáo đơn hàng của ngày hôm qua. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của ngày hôm qua được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getYesterdayReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getYesterdayReport(page,limit);
  }

  @ApiTags('Báo cáo Admin')
  @Role('ADMIN')
  @Get('/admin/report/last-7-days')
  @ApiOperation({
    summary: 'Báo cáo 7 ngày qua',
    description: 'Lấy báo cáo đơn hàng trong 7 ngày gần nhất. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo 7 ngày qua được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getLast7DaysReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getLast7DaysReport(page, limit);
  }

  @ApiTags('Báo cáo Admin')
  @Role('ADMIN')
  @Get('/admin/report/this-month')
  @ApiOperation({
    summary: 'Báo cáo tháng này',
    description: 'Lấy báo cáo đơn hàng của tháng hiện tại. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo của tháng hiện tại được trả về thành công.',
    type: Object,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getThisMonthReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reportService.getThisMonthReport(page, limit);
  }

  @ApiTags('Báo cáo Admin')
  @Role('ADMIN')
  @Get('/admin/report/date-range')
  @ApiOperation({
    summary: 'Báo cáo trong khoảng thời gian cụ thể',
    description: 'Lấy báo cáo đơn hàng trong khoảng thời gian được chỉ định. Dành cho ADMIN.',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Ngày bắt đầu (định dạng ISO, ví dụ: 2024-01-01)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'Ngày kết thúc (định dạng ISO, ví dụ: 2024-01-31)',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiResponse({
    status: 200,
    description: 'Báo cáo trong khoảng thời gian được trả về thành công.',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi định dạng ngày hoặc thiếu tham số.',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  async getReportByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.reportService.getReportByDateRange(start, end , page , limit);
  }
}
