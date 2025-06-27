import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { BookEntity } from 'src/book/entity/books.entity';
import { Exclude } from 'class-transformer';

@Entity('book_reviews')
export class BookReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    comment: string;

    @Column({ type: 'int' })
    rating: number;

    @ManyToOne(() => UserEntity, user => user.reviews, { eager: false, onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => BookEntity, book => book.reviews, { eager: true, onDelete: 'CASCADE' })
    book: BookEntity;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
}
