import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/books.entity';
import { UserEntity } from 'src/users/entity/users.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookEntity, UserEntity])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
