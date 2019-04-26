import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity({ name: 'users' })
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

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
