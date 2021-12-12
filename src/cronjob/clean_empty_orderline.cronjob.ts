import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, IsNull, Not, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entity/product.entity';
import { OrderLine } from '../entity/order_line.entity';

@Injectable()
export class CleanEmptyOrderLineCronJob {
  private readonly logger = new Logger(CleanEmptyOrderLineCronJob.name);
  private queryBuilder: SelectQueryBuilder<any>;
  constructor(@InjectConnection() connection: Connection) {
    this.queryBuilder = connection.createQueryBuilder();
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCron() {
    this.logger.log('[CronJob] Clean empty orderline');
    this.queryBuilder
      .delete()
      .from(OrderLine)
      .where({
        order_id: IsNull(),
      })
      .execute();
  }
}
