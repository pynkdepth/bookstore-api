import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity';
import { Publisher } from './entities/publisher.entity';

@Module({
  // Daftarkan ketiga entitas di sini
  imports: [TypeOrmModule.forFeature([Book, Category, Publisher])], 
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}