import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookReviewDto {
    @IsString()
    @IsNotEmpty({ message: 'Give Some text for books' })
    comment: string;

    @IsInt()
    @IsNotEmpty({ message: 'rating given a numbers 1 to 5' })
    rating: number;

    @IsInt()
    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;
}
