import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middlerware';
import { DatabaseModule } from './db/database.module';
import { ProductModule } from './shared/product/product.module';
import { OrderModule } from './shared/order/order.module';
import { CategoryModule } from './shared/category/category.module';
import * as helmet from 'helmet';
import { AuthModule } from './auth/auth.module';
import * as cookieParser from 'cookie-parser';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './shared/upload/upload.module';
import { TableModule } from './shared/table/table.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UploadModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(helmet(), cookieParser(), LoggerMiddleware).forRoutes('*');
  }
}
