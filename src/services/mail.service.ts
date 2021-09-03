import { MailCreateDto } from './../dtos/mail-create.dto';
import { FilterEmailBodyDto } from './../dtos/filter-email-body.dto';
import { UserService } from './user.service';
import { MailModel } from './../models/mail.model';
import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
  constructor(
    @InjectModel('Mail') private readonly mailModel: Model<MailModel>,
    private userService: UserService,
  ) {}

  async create(senderId: string, dto: MailCreateDto): Promise<MailModel> {
    if (senderId === dto.receiver) {
      throw new NotAcceptableException('Cannot send email to yourself');
    }
    const sender = await this.userService.getById(senderId);
    const receiver = await this.userService.getById(dto.receiver);

    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    if (sender.city !== receiver.city) {
      throw new NotAcceptableException(
        'Cannot send mail to user in other city',
      );
    }

    const model = {
      title: dto.title,
      body: dto.body,
      sender: senderId,
      receiver: dto.receiver,
    };
    return await this.mailModel.create(model);
  }

  async listSentEmails(sender: string, order: string): Promise<MailModel[]> {
    const sort = order.toUpperCase() === 'DESC' ? -1 : 1;
    return await this.mailModel
      .find({ sender })
      .sort({ createdAt: sort })
      .populate([
        { path: 'sender', select: 'nickname city' },
        { path: 'receiver', select: 'nickname city' },
      ]);
  }

  async listReceivedEmails(
    receiver: string,
    order: string,
  ): Promise<MailModel[]> {
    const sort = order.toUpperCase() === 'DESC' ? -1 : 1;
    return await this.mailModel
      .find({ receiver })
      .sort({ createdAt: sort })
      .populate([
        { path: 'sender', select: 'nickname city' },
        { path: 'receiver', select: 'nickname city' },
      ]);
  }

  async filterBody(
    userId: string,
    filter: FilterEmailBodyDto,
  ): Promise<MailModel[]> {
    if (
      filter.type !== 1 &&
      filter.type !== 2 &&
      filter.type !== 3 &&
      filter.type !== 4
    ) {
      throw new NotAcceptableException(
        "The filter type must be 1 to 'Contains', 2 to 'Exactly the same', 3 to 'Start with' or 4 to 'End with'",
      );
    }

    if (filter.type === 1) {
      return await this.mailModel
        .find({
          $or: [{ sender: userId }, { receiver: userId }],
          body: { $regex: `${filter.value}`, $options: 'i' },
        })
        .populate([
          { path: 'sender', select: 'nickname city' },
          { path: 'receiver', select: 'nickname city' },
        ]);
    }
    if (filter.type === 2) {
      return await this.mailModel
        .find({
          $or: [{ sender: userId }, { receiver: userId }],
          body: { $regex: `^${filter.value}$`, $options: 'i' },
        })
        .populate([
          { path: 'sender', select: 'nickname city' },
          { path: 'receiver', select: 'nickname city' },
        ]);
    }
    if (filter.type === 3) {
      return await this.mailModel
        .find({
          $or: [{ sender: userId }, { receiver: userId }],
          body: { $regex: `^${filter.value}`, $options: 'i' },
        })
        .populate([
          { path: 'sender', select: 'nickname city' },
          { path: 'receiver', select: 'nickname city' },
        ]);
    }
    if (filter.type === 4) {
      return await this.mailModel
        .find({
          $or: [{ sender: userId }, { receiver: userId }],
          body: { $regex: `${filter.value}$`, $options: 'i' },
        })
        .populate([
          { path: 'sender', select: 'nickname city' },
          { path: 'receiver', select: 'nickname city' },
        ]);
    }
  }
}
