import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    author: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    publishedYear?: number;
}
