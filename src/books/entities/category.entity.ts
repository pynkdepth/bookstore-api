import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  // Satu Kategori bisa dimiliki banyak Buku (One-to-Many)
  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}