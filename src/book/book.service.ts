import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/books.entity';
import { UpdateBookDto } from './dtos/update.book.dto';
import { CreateBookDto } from './dtos/create.book.dto';
import { UserEntity } from 'src/users/entity/users.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) { }

    /**** book Create Using Dto and userId/author****/
    async create(dto: CreateBookDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new NotFoundException('User not found');

        const book = this.bookRepo.create({
            title: dto.title,
            author: dto.author,
            description: dto.description,
            publishedYear: dto.publishedYear,
            authorUser: user
        });

        return await this.bookRepo.save(book);
    }

    /**** find all books****/
    async findAll() {
        const books = await this.bookRepo.find();
        if (!books) {
            throw new ConflictException('books not found');
        }
        return books
    }

    /**** Find One book by id ****/
    async findOne(id: number) {
        const book = await this.bookRepo.findOne({ where: { id } });
        if (!book) throw new NotFoundException('Book not found');
        return book;
    }

    /**** update books by id ****/
    async update(id: number, dto: UpdateBookDto) {
        await this.bookRepo.update(id, dto);
        return this.findOne(id);
    }

    /**** delete book by id ****/
    async remove(id: number) {
        const book = await this.findOne(id);
        return this.bookRepo.remove(book);
    }
}
