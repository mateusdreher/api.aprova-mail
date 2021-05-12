import { AuthDto } from '../dtos/auth.dto';
import { UserModel } from 'src/models/user.model';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptographySecurity } from '../common/security/cryptography.security';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    private readonly crypto: CryptographySecurity,
  ) {}

  async auth(dto: AuthDto) {
    dto.password = await this.crypto.md5(dto.password);
    const user = await this.userModel.findOne({
      nickname: dto.nickname,
      city: dto.city,
      password: dto.password,
    });

    if (!user) {
      throw new NotFoundException('Incorrect nickname or pasword');
    }

    const token = this.createToken(user._id);

    return token;
  }

  async resetPassword(dto: AuthDto): Promise<UserModel> {
    const user = await this.userModel.findOne({
      nickname: dto.nickname,
      city: dto.city,
    });

    if (!user) {
      throw new NotFoundException(`User ${dto.nickname} not found`);
    }
    user.password = await this.crypto.md5(dto.password);

    return await this.userModel.findOneAndUpdate(
      { nickname: dto.nickname, city: dto.city },
      user,
    );
  }

  createToken(userId: string) {
    const user: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(user);
    return { expiresIn: 3600, accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<JwtPayload> {
    return {
      userId: payload.userId,
    };
  }
}
