import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Navigate to /docs for the API documentation';
  }

  getHealth(): string {
    return 'Server is healthy!';
  }
}
