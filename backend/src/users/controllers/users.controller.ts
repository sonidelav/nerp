import {
    Body, ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { LoggedUser } from '../decorators/loggeduser.decorator';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/me')
    @UseGuards(AuthGuard())
    myAccount( @LoggedUser() me: User ) {
        return me;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AuthGuard())
    async listUsers() {
        return await this.userService.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
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
