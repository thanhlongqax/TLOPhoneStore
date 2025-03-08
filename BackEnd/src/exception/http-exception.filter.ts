
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from '@app/dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.getResponse();
    const responseMessage = typeof message === 'object' && message['message']
      ? message['message']
      : message;
    let success = false;
    if(status === HttpStatus.OK){
      success = true;
    }
    const apiResponse = new ApiResponseDto(status, success, responseMessage);
    response
      .status(status)
      .json(apiResponse);
  }
}
