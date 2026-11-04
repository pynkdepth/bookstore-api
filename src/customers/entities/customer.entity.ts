import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Nanti relasi ke orders akan kita sambungkan di sini

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;
}