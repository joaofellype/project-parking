import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ListCarDto } from './dto/listCar-car.dto';
import { QRCodeDto } from './dto/qrcode-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService ) {}

  @Post()
 async create(@Body() createCarDto: CreateCarDto) {
   
    return this.carService.create(createCarDto);
  }

  @Get()
 async findAll():Promise<ListCarDto[]> {

 
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<ListCarDto>{
    return this.carService.findOne(id);
  }
  @Get('/generate-qrcode/:id')
  async generateQrCode(@Param('id') id:string):Promise<QRCodeDto>{

    return this.carService.createQrCodeCar(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
