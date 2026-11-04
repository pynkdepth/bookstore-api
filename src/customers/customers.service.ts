import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepo.create(createCustomerDto);
    return await this.customerRepo.save(customer);
  }

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: string) {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Pelanggan dengan ID ${id} tidak ditemukan`);
    return customer;
  }

  async update(id: string, updateData: Partial<CreateCustomerDto>) {
    await this.findOne(id); // Pastikan ada dulu
    await this.customerRepo.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const customer = await this.findOne(id);
    return await this.customerRepo.remove(customer);
  }
}