import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
  imports: [],
  controllers: [TableController],
  providers: [TableService],
  exports: [],
})
export class TableModule {}
