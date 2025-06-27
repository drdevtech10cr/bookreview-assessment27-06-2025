import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Matches,
} from 'class-validator';

export class CreateUsersDto {
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string;

    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Mobile number is required' })
    @Matches(/^[6-9]\d{9}$/, {
        message: 'Mobile number must be 10 digits and start with 6, 7, 8, or 9',
    })
    mobile_number: string;


    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword(
        { minLength: 6, minNumbers: 1, minSymbols: 0, minUppercase: 0 },
        { message: 'Password must be at least 6 characters and include a number' }
    )
    password: string;

}
