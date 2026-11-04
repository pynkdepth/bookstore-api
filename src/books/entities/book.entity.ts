import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Publisher } from './publisher.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  // Banyak Buku bisa memiliki satu Kategori yang sama (Many-to-One)
  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  // Banyak Buku bisa diterbitkan oleh satu Penerbit yang sama (Many-to-One)
  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;
}