import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookReviewEntity } from './entity/bookreview.entity';
import { CreateBookReviewDto } from './dtos/createbook.dto';
import { UserEntity } from 'src/users/entity/users.entity';
import { BookEntity } from 'src/book/entity/books.entity';

@Injectable()
export class BookReviewService {
  constructor(
    @InjectRepository(BookReviewEntity)
    private readonly bookReviewRepo: Repository<BookReviewEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
  ) { }

  /*** Create book review using bookid  */
  async createWithBookId(bookId: number, dto: CreateBookReviewDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    const review = this.bookReviewRepo.create({
      comment: dto.comment,
      rating: dto.rating,
      user,
      book,
    });

    return await this.bookReviewRepo.save(review);
  }


  /** Get Review By bookID */
  async getReviewsByBookId(bookId: number) {
    return await this.bookReviewRepo.find({
      where: { book: { id: bookId } },
    });
  }

  /** review fetched by id */
  async fetchReviewByID(id: number) {
    const review = await this.bookReviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException('book review not found');
    }
    return review
  }

  /** review fetched by id */
  async fetchReviewsAll(): Promise<BookReviewEntity[]> {
    const reviews = await this.bookReviewRepo.find();
    if (!reviews) {
      throw new NotFoundException('book reviews not found');
    }
    return reviews;
  }
}
