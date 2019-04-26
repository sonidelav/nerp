import {EntityController} from '../classes/entity.controller';
import {Manufacturer} from '../entities/manufacturer.entity';
import {Controller} from '@nestjs/common';
import {ManufacturerService} from '../services/manufacturer.service';

@Controller('manufacturers')
export class ManufacturerController extends EntityController<Manufacturer> {
    constructor( protected service: ManufacturerService ) {
        super(service);
    }
}
