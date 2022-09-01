import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ListCarDto } from './dto/listCar-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './entities/car.entity';
import { toDataURL } from 'qrcode';
import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync, writeFile } from 'fs'
import { QRCodeDto } from './dto/qrcode-car.dto';
import { BadRequestException } from 'src/infrasctruture/exceptions/badRequestException';
import { NotFoundException } from 'src/infrasctruture/exceptions/notFoundException';
@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>, @InjectConnection() private connection: Connection, private userService: UsersService) { }
  async create(createCarDto: CreateCarDto) {
    const user = await this.userService.findOne(createCarDto.idUser);
    createCarDto.user = user;
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAll(): Promise<ListCarDto[]> {
    const car = await this.carModel.find();
    const carDto = car.map(c => ListCarDto.create(c.model, c.color, c.plate, c.desc, ListUserDto.create(c.user.id, c.user.name, c.user.number, c.user.email)));
    return carDto;
  }

  async findOne(id: string): Promise<ListCarDto> {
    const car = await this.carModel.findById({ _id: id }).exec();
    return ListCarDto.create(car.model, car.color, car.plate, car.desc, ListUserDto.create(car.user.id, car.user.name, car.user.number, car.user.email))
  }

  async update(id: string, updateCarDto: UpdateCarDto) {

    return await this.carModel.updateOne({ _id: id }, updateCarDto);
  }


  async remove(id: string) {
    await this.carModel.findByIdAndUpdate({ _id: id })
    return `This action removes a #${id} car`;
  }
  async createQrCodeCar(id: string):Promise<QRCodeDto> {

    const car = await this.carModel.findById({ _id: id });
    if(!car){
      throw new NotFoundException("Veiculo nao encontrado");
    }
    if (car.qrcode == null || car.qrcode == undefined) {
      const uuid = randomUUID();
      await this.carModel.findByIdAndUpdate({ _id: id }, { qrcode: uuid })
      return {
       qrcode: await this.generateQR(uuid)
      };
    }
    return {
      qrcode: await this.generateQR(car.qrcode)
     };
     


  }
  async generateQR(text: string):Promise<string> {
    try {
      return await toDataURL(text);
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
