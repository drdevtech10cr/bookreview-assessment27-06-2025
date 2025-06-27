import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, DeleteDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entity/users.entity';
import { BookReviewEntity } from 'src/bookreview/entity/bookreview.entity';

@Entity('books')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    publishedYear: number;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @Exclude()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deletedAt?: Date;

    @ManyToOne(() => UserEntity, user => user.books, { eager: true })
    authorUser: UserEntity;

    @OneToMany(() => BookReviewEntity, review => review.book)
    reviews: BookReviewEntity[];
}
