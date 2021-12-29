import { Controller, Get } from '@nestjs/common';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get('/')
  getStatus() {
    return this.tableService.getAll();
  }
}
