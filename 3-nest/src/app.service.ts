import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
 
}
