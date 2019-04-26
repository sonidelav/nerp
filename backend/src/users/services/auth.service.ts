import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(email: string): Promise<string> {
        return this.jwtService.sign({ email });
    }

    async validateUser(payload: any): Promise<User> {
        return await this.usersService.findOneByEmail(payload.email);
    }
}
