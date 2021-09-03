import { ResponseErrorDto } from '../common/dtos/response-error.dto';
import { UserCreateDto } from '../dtos/user-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../common/guards/jwt-authemtication.guard';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: UserCreateDto) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('user.create()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('list/my-city')
  @UseGuards(JwtAuthenticationGuard)
  async listByCity(@Req() request: Request) {
    try {
      return await this.userService.listByCity(request['user'].userId);
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('user.listByCity()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
