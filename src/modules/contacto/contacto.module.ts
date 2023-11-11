import { Module } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoController } from './contacto.controller';
import { DatabaseModule } from '../../database/database.module';
import { ContactoProviders } from './contacto.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactoController],
  providers: [ContactoService,...ContactoProviders],
  exports: [ContactoService],
})
export class ContactoModule {}
