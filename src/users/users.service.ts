import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dtos/CreateUsers.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUsersDto } from './dtos/UpdateUsers.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
    ) { }

    /**** User Created/Singup Using Dto file details service****/
    async createUsers(dto: CreateUsersDto): Promise<any> {
        const existingUser = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.usersRepo.create({
            ...dto,
            password: hashedPassword,
        });

        return this.usersRepo.save(newUser);
    }

    /* Users Update And Save */
    async updateUser(id: number, dto: UpdateUsersDto): Promise<UserEntity> {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, dto);

        if (dto.password) {
            // Hash password if being updated
            user.password = await bcrypt.hash(dto.password, 10);
        }

        return this.usersRepo.save(user);
    }


    /* Fetch User By ID */
    async fetchUserById(id: number): Promise<UserEntity> {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user;
    }

    /* Fetch User By ID */
    async fetchUsersAll(): Promise<UserEntity[]> {
        const users = await this.usersRepo.find();
        if (!users || users.length === 0) {
            throw new NotFoundException('users not found')
        }
        return users;
    }

    /* Soft Delete User By ID */
    async Deleteusers(id: number,): Promise<any> {
        await this.usersRepo.findOne({where: {id}});
        return this.usersRepo.softDelete(id); 
    }
}
