import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BookEntity } from 'src/book/entity/books.entity';
import { BookReviewEntity } from 'src/bookreview/entity/bookreview.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    first_name: string;

    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    mobile_number: string;

    @Column({ type: 'varchar', length: 255 })
    @Exclude()
    password: string;

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

    @OneToMany(() => BookEntity, book => book.authorUser)
    books: BookEntity[];

    @OneToMany(() => BookReviewEntity, review => review.user)
    reviews: BookReviewEntity[];
}
