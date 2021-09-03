import { ResponseErrorDto } from './../common/dtos/response-error.dto';
import { ApiTags } from '@nestjs/swagger';
import { MailCreateDto } from './../dtos/mail-create.dto';
import { JwtAuthenticationGuard } from './../common/guards/jwt-authemtication.guard';
import { FilterEmailBodyDto } from './../dtos/filter-email-body.dto';
import { MailService } from './../services/mail.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() dto: MailCreateDto, @Req() request: Request) {
    try {
      return await this.mailService.create(request['user'].userId, dto);
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('mail.create()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('received/:order')
  @UseGuards(JwtAuthenticationGuard)
  async listMyReceived(@Param('order') order: string, @Req() request: Request) {
    try {
      return await this.mailService.listReceivedEmails(
        request['user'].userId,
        order,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('mail.listMyReceived()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('sent/:order')
  @UseGuards(JwtAuthenticationGuard)
  async listMySent(@Param('order') order: string, @Req() request: Request) {
    try {
      return await this.mailService.listSentEmails(
        request['user'].userId,
        order,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('mail.listMySent()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('filter-body')
  @UseGuards(JwtAuthenticationGuard)
  async filterBody(@Body() dto: FilterEmailBodyDto, @Req() request: Request) {
    try {
      return await this.mailService.filterBody(request['user'].userId, dto);
    } catch (error) {
      throw new HttpException(
        new ResponseErrorDto('mail.filterBody()', {
          status: error.status,
          error: error.response.error,
          message: error.message,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
