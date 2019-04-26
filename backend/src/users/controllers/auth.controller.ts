import {Body, Controller, HttpException, HttpStatus, NotFoundException, Post} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    @Post('/login')
    async generateJwtToken(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            if (user.password === password) {
                const token = await this.authService.signIn(email);
                return {
                    token,
                    expires: 3600,
                };
            }
            throw new HttpException('Invalid User Credentials', HttpStatus.FORBIDDEN);
        }
        throw new NotFoundException();
    }
}
