import { Test, TestingModule } from '@nestjs/testing';
import { BookReviewService } from './bookreview.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookReviewEntity } from './entity/bookreview.entity';
import { Repository } from 'typeorm';

describe('BookReviewService', () => {
  let service: BookReviewService;
  let bookReviewRepo: Repository<BookReviewEntity>;

  const mockReview = {
    id: 1,
    comment: 'Great book for backend devs!',
    rating: 5,
    book: { id: 3 },
    user: { id: 1 },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBookReviewRepo = {
    find: jest.fn().mockResolvedValue([mockReview]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookReviewService,
        {
          provide: getRepositoryToken(BookReviewEntity),
          useValue: mockBookReviewRepo,
        },
        { provide: getRepositoryToken(require('src/users/entity/users.entity')), useValue: {} },
        { provide: getRepositoryToken(require('src/book/entity/books.entity')), useValue: {} },
      ],
    }).compile();

    service = module.get<BookReviewService>(BookReviewService);
    bookReviewRepo = module.get(getRepositoryToken(BookReviewEntity));
  });

  it('should return all reviews for a given book ID', async () => {
    const bookId = 101;

    const reviews = await service.getReviewsByBookId(bookId);

    expect(bookReviewRepo.find).toHaveBeenCalledWith({
      where: { book: { id: bookId } },
    });

    expect(reviews).toBeDefined();
    expect(reviews.length).toBe(1);
    expect(reviews[0].comment).toBe('Great book for backend devs!');
    expect(reviews[0].book.id).toBe(bookId);
  });
});
