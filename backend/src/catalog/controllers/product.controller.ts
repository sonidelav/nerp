import { EntityController } from '../classes/entity.controller';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductController extends EntityController<Product> {
    constructor(
        protected service: ProductService,
    ) {
        super(service);
    }
}
