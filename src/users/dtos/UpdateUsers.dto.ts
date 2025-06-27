import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    Matches,
} from 'class-validator';

export class UpdateUsersDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Mobile number is required' })
    @Matches(/^[6-9]\d{9}$/, {
        message: 'Mobile number must be 10 digits and start with 6, 7, 8, or 9',
    })
    mobile_number: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword(
        { minLength: 6, minNumbers: 1, minSymbols: 0, minUppercase: 0 },
        { message: 'Password must be at least 6 characters and include a number' }
    )
    password: string;

}
