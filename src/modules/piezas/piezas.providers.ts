import { DataSource } from 'typeorm';
import {Pieza} from './entities/piezas.entity';
export const PiezaProviders = [
    {
        provide: 'PIEZA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Pieza),
        inject: ['DATA_SOURCE'],
    }
];