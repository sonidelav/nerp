import {Body, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {EntityService} from './entity.service';
import {AuthGuard} from '@nestjs/passport';

export abstract class EntityController<T> {

    constructor( protected readonly service: EntityService<T> ) {}

    @Get()
    @UseGuards(AuthGuard())
    async list() {
        return await this.service.findAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async view(@Param('id') id: number|string) {
        return await this.service.findOneById(id);
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: number|string, @Body() data: T) {
        const model = await this.service.update(id, data);
        if (!model) { throw new NotFoundException(); }
        return model;
    }

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() data: T) {
        return await this.service.create(data);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: number|string) {
        return await this.service.delete(id);
    }
}
