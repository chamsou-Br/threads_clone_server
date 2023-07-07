import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {
  static successResponse(data: any, message: string = '') {
    return {
      statusCode: 200,
      data,
      message,
    };
  }

  static createdResponse(data: any, message: string = '') {
    return {
      statusCode: 201,
      data,
      message,
    };
  }

  static updateResponse(data: any, message: string = '') {
    return {
      statusCode: 200,
      data,
      message: message || 'Update successful',
    };
  }

  static deleteResponse(message: string = '') {
    return {
      statusCode: 200,
      data: null,
      message: message || 'Delete successful',
    };
  }
}

