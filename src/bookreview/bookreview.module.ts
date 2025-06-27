import { Module } from '@nestjs/common';
import { BookReviewController } from './bookreview.controller';
import { BookReviewService } from './bookreview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReviewEntity } from './entity/bookreview.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import { BookEntity } from 'src/book/entity/books.entity';
import { ExtraBookReviewController } from './extra-bookreview.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookReviewEntity, UserEntity, BookEntity])
  ],
  controllers: [BookReviewController, ExtraBookReviewController],
  providers: [BookReviewService]
})
export class BookreviewModule {}
