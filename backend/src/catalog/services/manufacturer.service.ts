import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from '../entities/manufacturer.entity';
import { EntityService } from '../classes/entity.service';

@Injectable()
export class ManufacturerService extends EntityService<Manufacturer> {
    constructor(
        @InjectRepository(Manufacturer) protected repository: Repository<Manufacturer>,
    ) {
        super(repository);
    }
}
