import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityService } from '../classes/entity.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService extends EntityService<Product> {
    constructor(
        @InjectRepository(Product) protected repository: Repository<Product>,
    ) {
        super(repository);
    }
}
