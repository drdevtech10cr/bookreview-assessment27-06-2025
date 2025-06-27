// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { BookreviewModule } from './bookreview/bookreview.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './common services/app-validatios/all-validation.pipe';
import { AllExceptionsFilter } from './common services/all-httpexcetions-handler/httpexcetions.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const portStr = configService.get<string>('DATABASE_PORT') ?? '5432';
        const port = parseInt(portStr, 10);

        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST') ?? 'localhost',
          port: port,
          username: configService.get<string>('DATABASE_USER') ?? 'postgres',
          password: configService.get<string>('DATABASE_PASSWORD') ?? 'dev112200tech',
          database: configService.get<string>('DATABASE_NAME') ?? 'bookreview',
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: true,
          autoLoadEntities: true
        };
      },
    }),
    BookModule,
    BookreviewModule,
    UsersModule
  ],
  providers:[
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
