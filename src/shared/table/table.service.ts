import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Table } from '../../entity/table.entity';

@Injectable()
export class TableService {
  private tableRepository: Repository<Table>;
  constructor(@InjectConnection() connection: Connection) {
    this.tableRepository = connection.getRepository(Table);
  }

  getAll() {
    return this.tableRepository.find({});
  }
}
