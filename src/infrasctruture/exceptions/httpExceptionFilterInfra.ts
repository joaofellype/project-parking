import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';

export class HttpExceptionFilterInfra implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().getTime(),
            message: exception.getResponse(),
          });
    }

}