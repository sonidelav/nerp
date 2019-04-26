import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column()
    isActive: boolean;

    @Column({ length: 100 })
    firstname: string;

    @Column({ length: 100 })
    lastname: string;
}
