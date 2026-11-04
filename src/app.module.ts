import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root', // Sesuai dengan MYSQL_ROOT_PASSWORD di docker-compose
      database: 'bookstore_db', // Sesuai dengan MYSQL_DATABASE di docker-compose
      autoLoadEntities: true, // Otomatis membaca entity yang nanti kita buat
      synchronize: true, // Otomatis membuatkan tabel di database (sangat cocok untuk tahap development)
    }),
    BooksModule,
    CustomersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}