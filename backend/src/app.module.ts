import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
      // Database
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nerp_database',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        entityPrefix: 'nds34f_',
      }),
      // Modules
      UsersModule,
      CatalogModule,
  ],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
