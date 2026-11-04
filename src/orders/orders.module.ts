import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  // Pastikan Order, Customer, dan Book terdaftar di sini
  imports: [TypeOrmModule.forFeature([Order, Customer, Book])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}