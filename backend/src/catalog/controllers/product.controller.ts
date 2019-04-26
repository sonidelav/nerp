import {Controller, Get, Param, UseGuards, Put, Body, NotFoundException, Post, Delete} from '@nestjs/common';
import {ProductService} from '../services/product.service';
import {AuthGuard} from '@nestjs/passport';
import {Product} from '../entities/product.entity';

@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
    ) {}

    @Get()
    @UseGuards(AuthGuard())
    async listProducts() {
        return await this.productService.findAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async viewProduct(@Param('id') id) {
        return await this.productService.findOneById(id);
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    async updateProduct(@Param('id') id, @Body() data: Product) {
        const product = await this.productService.updateProduct(id, data);
        if (!product) { throw new NotFoundException(); }
        return product;
    }

    @Post()
    @UseGuards(AuthGuard())
    async createProduct(@Body() data: Product) {
        return await this.productService.createProduct(data);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    async deleteProduct(@Param('id') id) {
        return await this.productService.deleteProduct(id);
    }
}
