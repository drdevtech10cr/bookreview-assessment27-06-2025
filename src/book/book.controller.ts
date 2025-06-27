import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create.book.dto';
import { UpdateBookDto } from './dtos/update.book.dto';
import { ResponseService } from 'src/helping-services/repsonsive.service';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    /**** create  book and save ****/
    @Post()
    async create(@Body() dto: CreateBookDto) {
        try {
            const newBook = await this.bookService.create(dto);
            return ResponseService('book created sucessfully', 201, newBook)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    /**** Find all books ****/
    @Get()
    async findAll() {
        try {
            const books = await this.bookService.findAll();
            return ResponseService('books fetch sucessfully', 200, books)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }


    /**** Find One book by id ****/
    @Get(':id')
    async findOnebook(@Param('id') id: number) {
        try {
            const book = await this.bookService.findOne(id);
            return ResponseService('book fetched sucessfully', 200, book)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    /**** update book by id ****/
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
        try {
            const bookUpdate = await this.bookService.update(id, dto);
            return ResponseService('book updated sucessfully', 200, bookUpdate)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    /**** delete book by id ****/
    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            const deletebook = this.bookService.remove(id);
            return ResponseService('book delted successfully', 200, deletebook);
        } catch (error) {
            return (error.message, 400, null)
        }
    }
}
