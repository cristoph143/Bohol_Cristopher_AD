import * as admin from 'firebase-admin';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DB_CREDENTIALS = require("../new-keys.json");

async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.cert(DB_CREDENTIALS),
  });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
