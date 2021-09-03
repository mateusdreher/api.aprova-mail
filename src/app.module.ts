import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './common/strategies/jwt-strategy';
import { CryptographySecurity } from './common/security/cryptography.security';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './services/mail.service';
import { UserService } from './services/user.service';
import { MailController } from './controllers/mail.controller';
import { UserController } from './controllers/user.controller';
import { mailSchema } from './schemas/mail.schema';
import { userSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.NOSQL_CONNECTION_STRING),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRATION),
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: userSchema,
      },
      {
        name: 'Mail',
        schema: mailSchema,
      },
    ]),
  ],
  controllers: [UserController, MailController, AuthController],
  providers: [
    UserService,
    MailService,
    AuthService,
    CryptographySecurity,
    JwtStrategy,
  ],
})
export class AppModule {}
