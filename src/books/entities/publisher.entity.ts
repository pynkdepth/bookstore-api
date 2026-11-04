import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('publishers')
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  // Satu Penerbit bisa menerbitkan banyak Buku (One-to-Many)
  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}