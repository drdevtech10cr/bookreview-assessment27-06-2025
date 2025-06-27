import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseService } from 'src/helping-services/repsonsive.service';
import { CreateUsersDto } from './dtos/CreateUsers.dto';
import { UpdateUsersDto } from './dtos/UpdateUsers.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) { }

    /* Fetch User By ID */

    @Get()
    async fetchUsers() {
        try {
            const userAll = await this.userService.fetchUsersAll();
            return ResponseService('User Fetched Successfully', 200, userAll);
        } catch (error) {
            return ResponseService(error.message, 400, null);
        }
    }

    /* Users Create And Save */

    @Post()
    async CreateUser(@Body() dto: CreateUsersDto,) {
        try {
            const userNew = await this.userService.createUsers(dto);
            return ResponseService('Users Create Successfully', 201, userNew);
        } catch (error) {
            return ResponseService(error.message, 400, null);
        }
    }


    /* Users Update And Save */

    @Put(':id')
    async updateUsers(@Param('id') id: number, @Body() dto: UpdateUsersDto) {
        try {
            const updateduser = await this.userService.updateUser(id, dto);
            return ResponseService('User Updated Successfully', 200, updateduser)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    /* Fetch User By ID */

    @Get(':id')
    async fetchUser(@Param('id') id: number) {
        try {
            const user = await this.userService.fetchUserById(id);
            return ResponseService('User Fetched Successfully', 200, user);
        } catch (error) {
            return ResponseService(error.message, 400, null);
        }
    }

    /* Soft Delete User By ID */
    @Delete(':id')
    async deletedUser(@Param('id') id: number) {
        try {
            const deletedUser = await this.userService.Deleteusers(id);
            return ResponseService('User Deleted Succussfully', 200, deletedUser);
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }
}


