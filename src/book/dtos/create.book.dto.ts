import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty({ message: 'Book Title is required' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Book Author name is required' })
    author: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty({ message: 'Book publish Year is required' })
    @IsInt()
    publishedYear?: number;

    @IsInt()
    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;
}
