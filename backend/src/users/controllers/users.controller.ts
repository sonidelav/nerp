import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User as AuthUser } from '../decorators/user.decorator';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('/me')
    @UseGuards(AuthGuard())
    myAccount( @AuthUser() me: User ) {
        return me;
    }

    @Get()
    @UseGuards(AuthGuard())
    async listUsers() {
        return await this.userService.findAll();
    }

    @Get('/:uuid')
    @UseGuards(AuthGuard())
    async viewUser(@Param('uuid') uuid: string) {
        const user = await this.userService.findOneById(uuid);
        if (!user) { throw new NotFoundException(); }
        return user;
    }

    @Put('/:uuid')
    @UseGuards(AuthGuard())
    async updateUser(@Param('uuid') uuid: string, @Body() userData: User) {
        const user = await this.userService.updateUser(uuid, userData);
        if (!user) { throw new NotFoundException(); }
        return user;
    }

    @Post()
    @UseGuards(AuthGuard())
    async createUser(@Body() userData: User) {
        return await this.userService.createUser(userData);
    }

    @Delete('/:uuid')
    @UseGuards(AuthGuard())
    async deleteUser(@Param('uuid') uuid: string) {
        const user = await this.userService.deleteUser(uuid);
        if (!user) { throw new NotFoundException(); }
        return user;
    }
}
