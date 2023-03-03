import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

import * as path from 'path';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  const swaggerConfig = readFileSync(
    path.join(__dirname, '../../swagger.json'),
    'utf8',
  );
  SwaggerModule.setup('api', app, JSON.parse(swaggerConfig));
  await app.listen(port);
  console.log(`listening on port ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
