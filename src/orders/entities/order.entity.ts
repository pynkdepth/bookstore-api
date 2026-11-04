import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  totalPrice: number;

  @CreateDateColumn()
  orderDate: Date;

  // Banyak pesanan bisa dilakukan oleh satu Pelanggan
  @ManyToOne(() => Customer, (customer) => customer.id, { eager: true })
  customer: Customer;

  // Banyak pesanan bisa memesan Buku yang sama
  @ManyToOne(() => Book, (book) => book.id, { eager: true })
  book: Book;
}