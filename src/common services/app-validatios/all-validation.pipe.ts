import {
    BadRequestException,
    Injectable,
    ValidationPipe,
    ValidationPipeOptions,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        const options: ValidationPipeOptions = {
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) => {
                const errorMessages: Record<string, string> = {};
                errors.forEach((error) => {
                    if (error.constraints) {
                        errorMessages[error.property] = Object.values(error.constraints).join('. ').trim();
                    }
                });

                return new BadRequestException({
                    message: errorMessages,
                    status: 400,
                    error: 'Validation failed',
                    data: null,
                });
            },
        };

        super(options);
    }
}
