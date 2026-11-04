import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity';
import { Publisher } from './entities/publisher.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Publisher) private readonly publisherRepo: Repository<Publisher>,
  ) {}

  // ================= FITUR KATEGORI & PENERBIT =================
  async createCategory(name: string) {
    const category = this.categoryRepo.create({ name });
    return await this.categoryRepo.save(category);
  }

  async findAllCategories() {
    return await this.categoryRepo.find();
  }

  async createPublisher(name: string) {
    const publisher = this.publisherRepo.create({ name });
    return await this.publisherRepo.save(publisher);
  }

  async findAllPublishers() {
    return await this.publisherRepo.find();
  }

  // ================= FITUR BUKU (YANG SUDAH ADA) =================
  async create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepository.create({
      title: createBookDto.title,
      price: createBookDto.price,
      stock: createBookDto.stock ?? 0,
      category: createBookDto.categoryId ? { id: createBookDto.categoryId } : undefined,
      publisher: createBookDto.publisherId ? { id: createBookDto.publisherId } : undefined,
    });
    return await this.booksRepository.save(newBook);
  }

  async findAll() {
    return await this.booksRepository.find({
      relations: { category: true, publisher: true },
    });
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: { category: true, publisher: true },
    });
    if (!book) throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    return book;
  }

  async update(id: string, updateData: Partial<CreateBookDto>) {
    await this.findOne(id);
    await this.booksRepository.update(id, {
      title: updateData.title,
      price: updateData.price,
      stock: updateData.stock,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return await this.booksRepository.remove(book);
  }
}