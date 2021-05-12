import { AuthDto } from './../dtos/auth.dto';
import { JwtAuthenticationGuard } from '../common/guards/jwt-authemtication.guard';
import { AuthService } from '../services/auth.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async auth(@Body() dto: AuthDto) {
    try {
      return await this.authService.auth(dto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error on auth',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('forget-password')
  @UseGuards(JwtAuthenticationGuard)
  async forgetPassword(@Body() dto: AuthDto) {
    try {
      await this.authService.resetPassword(dto);
      return {
        message: 'Password has succefully changed',
        nickname: dto.nickname,
        city: dto.city,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error on reset password',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
