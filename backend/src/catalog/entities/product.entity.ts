import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Index} from 'typeorm';
import {Manufacturer} from './manufacturer.entity';
import {Expose} from 'class-transformer';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => Manufacturer, manufacturer => manufacturer.products)
    manufacturer: Manufacturer;

    @Index('idx-pname')
    @Column({ length: 255, nullable: false})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Index('idx-psku')
    @Column({ length: 32, comment: 'SKU / MPN' })
    reference: string;

    @Index('idx-pbarcode')
    @Column({ length: 13, comment: 'Barcode EAN13' })
    ean13: string;

    @Column({ length: 15 })
    isbn: string;

    @Column({ length: 15 })
    upc: string;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Tax Excluded'})
    wholesalePrice: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Tax Excluded'})
    price: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Tax Excluded'})
    discountPrice: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Tax Excluded'})
    webPrice: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Width in cm'})
    width: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Height in cm'})
    height: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Depth in cm'})
    depth: number;

    @Column({type: 'double', unsigned: true, default: 0, nullable: false, comment: 'Weight in kg'})
    weight: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    // DYNAMIC PROPERTIES

    @Expose()
    get productNameWithSku(): string {
        return `${this.name} - ${this.reference}`;
    }
}
