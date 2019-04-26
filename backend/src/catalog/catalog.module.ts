import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Manufacturer]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class CatalogModule {}
