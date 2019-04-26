import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Index} from 'typeorm';
import {Product} from './product.entity';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: '100' })
    name: string;

    @OneToMany(type => Product, product => product.manufacturer)
    products: Product[];

    @CreateDateColumn()
    createdAt: string;
}
