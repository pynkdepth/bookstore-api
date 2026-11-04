import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from '../customers/entities/customer.entity'; // Mundur dua tingkat dari src/orders ke src/
import { Book } from '../books/entities/book.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // 1. Cek apakah customernya ada
    const customer = await this.customerRepo.findOne({ where: { id: createOrderDto.customerId } });
    if (!customer) throw new NotFoundException('Pelanggan tidak ditemukan');

    // 2. Cek apakah bukunya ada
    const book = await this.bookRepo.findOne({ where: { id: createOrderDto.bookId } });
    if (!book) throw new NotFoundException('Buku tidak ditemukan');

    // 3. Hitung total harga otomatis (harga buku * jumlah)
    const totalPrice = book.price * createOrderDto.quantity;

    // 4. Buat pesanan
    const order = this.orderRepo.create({
      quantity: createOrderDto.quantity,
      totalPrice,
      customer,
      book,
    });

    return await this.orderRepo.save(order);
  }

  async findAll() {
    return await this.orderRepo.find();
  }

  async remove(id: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Pesanan dengan ID ${id} tidak ditemukan`);
    return await this.orderRepo.remove(order);
  }
}