import { DataSource } from 'typeorm';
import { Contacto} from './entities/contacto.entity';
export const ContactoProviders = [
  {
    provide: 'CONTACTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contacto),
    inject: ['DATA_SOURCE'],
  },
];
