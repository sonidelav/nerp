import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findAllBy(conditions): Promise<Product[]> {
        return await this.productRepository.find(conditions);
    }

    async findOneById(id: number): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async updateProduct(id: number, data: Product): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (product) {
            this.productRepository.merge(product, data);
            return await this.productRepository.save(product);
        }
        return null;
    }

    async deleteProduct(id: number): Promise<Product> {
        const product = await this.productRepository.findOneOrFail(id);
        if (product) {
            return await this.productRepository.remove(product);
        }
        return null;
    }

    async createProduct(data: Product): Promise<Product> {
        return await this.productRepository.save(data);
    }
}
