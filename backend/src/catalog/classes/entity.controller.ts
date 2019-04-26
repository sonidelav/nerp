import {
    Body,
    ClassSerializerInterceptor,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {EntityService} from './entity.service';
import {AuthGuard} from '@nestjs/passport';

export abstract class EntityController<T> {

    constructor( protected readonly service: EntityService<T> ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AuthGuard())
    async list() {
        return await this.service.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    @UseGuards(AuthGuard())
    async view(@Param('id') id: number|string) {
        return await this.service.findOneById(id);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put('/:id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: number|string, @Body() data: T) {
        const model = await this.service.update(id, data);
        if (!model) { throw new NotFoundException(); }
        return model;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() data: T) {
        return await this.service.create(data);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete('/:id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: number|string) {
        return await this.service.delete(id);
    }
}
