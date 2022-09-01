import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{ name:Car.name, schema: CarSchema}]),UsersModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
