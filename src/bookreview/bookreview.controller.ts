import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreateBookReviewDto } from './dtos/createbook.dto';
import { BookReviewService } from './bookreview.service';
import { ResponseService } from 'src/helping-services/repsonsive.service';


@Controller('books/:bookId/review')
export class BookReviewController {
    constructor(private readonly bookReviewService: BookReviewService) { }

    /** Create book reviewo using param bookId   // POST /books/:bookId/review */
    @Post()
    async create(@Param('bookId') bookId: number, @Body() dto: CreateBookReviewDto) {
        try {
            const bookReviewCreate = await this.bookReviewService.createWithBookId(+bookId, dto);
            return ResponseService('Book review Successfully submitted', 201, bookReviewCreate);
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    /** Get review by books id // GET /books/:bookId/review */
    @Get()
    async getReviewsByBook(@Param('bookId') bookId: number) {
        try {
            const getReviewsByBook = await this.bookReviewService.getReviewsByBookId(+bookId);
            return ResponseService('reviews Fetched Success by book', 200, getReviewsByBook);
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }
}
