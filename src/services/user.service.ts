import { UserCreateDto } from './../dtos/user-create.dto';
import { CryptographySecurity } from './../common/security/cryptography.security';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    private readonly crypto: CryptographySecurity,
  ) {}

  async create(dto: UserCreateDto): Promise<UserModel> {
    const nicknameAlreadyExists = await this.getByNickNameAndCity(
      dto.nickname,
      dto.city,
    );

    if (nicknameAlreadyExists) {
      throw new NotAcceptableException(
        `The nickname ${dto.nickname} already exists on city ${dto.city}`,
      );
    }
    dto.nickname = dto.nickname.toLowerCase();
    dto.city = dto.city.toLowerCase();
    dto.password = await this.crypto.md5(dto.password);
    return await this.userModel.create(dto);
  }

  async getById(_id: string): Promise<UserModel> {
    return await this.userModel.findOne({ _id });
  }

  async getByNickNameAndCity(
    nickname: string,
    city: string,
  ): Promise<UserModel> {
    if (nickname === '' || city === '') {
      throw new NotAcceptableException('Invalid nickname or city');
    }

    return await this.userModel.findOne({
      nickname: nickname.toLowerCase(),
      city: city.toLowerCase(),
    });
  }

  async listByCity(userId: string): Promise<UserModel[]> {
    const user = await this.getById(userId);
    return await this.userModel
      .find({ city: user.city })
      .select('name nickname');
  }
}
