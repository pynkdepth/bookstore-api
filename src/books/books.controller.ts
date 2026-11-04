import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // --- ENDPOINT KATEGORI ---
  @Post('categories')
  createCategory(@Body('name') name: string) {
    return this.booksService.createCategory(name);
  }

  @Get('categories')
  findAllCategories() {
    return this.booksService.findAllCategories();
  }

  // --- ENDPOINT PENERBIT ---
  @Post('publishers')
  createPublisher(@Body('name') name: string) {
    return this.booksService.createPublisher(name);
  }

  @Get('publishers')
  findAllPublishers() {
    return this.booksService.findAllPublishers();
  }

  // --- ENDPOINT BUKU UTAMA ---
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateBookDto>) {
    return this.booksService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}