import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneById(uuid: string): Promise<User> {
        return await this.userRepository.findOne(uuid);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ email, isActive: true });
    }

    async updateUser(uuid: string, data: User): Promise<User> {
        const user = await this.userRepository.findOne(uuid);
        if (user) {
            this.userRepository.merge(user, data);
            return await this.userRepository.save(user);
        }
        return null;
    }

    async deleteUser(uuid: string) {
        const user = await this.userRepository.findOneOrFail(uuid);
        if (user) {
            return await this.userRepository.remove(user);
        }
        return null;
    }

    async createUser(data: User) {
        return await this.userRepository.save(data);
    }
}
