import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStreamerDto } from 'src/dto/create-streamer.dto';
import { IStreamer } from 'src/interface/streamer.interface';
import { Model } from 'mongoose';
import { UpdateStreamerDto } from 'src/dto/update-streamer.dto';
import { StreamerGateway } from 'src/streamer.gateway';

@Injectable()
export class StreamerService {
  constructor(
    @InjectModel('Streamer') private streamerModel: Model<IStreamer>,
    private readonly streamerGateway: StreamerGateway,
  ) {}

  async createStreamer(
    CreateStreamerDto: CreateStreamerDto,
  ): Promise<IStreamer> {
    const newStreamer = await new this.streamerModel(CreateStreamerDto);
    return newStreamer.save();
  }

  async updateStreamer(
    streamerId: string,
    UpdateStreamerDto: UpdateStreamerDto,
  ): Promise<IStreamer> {
    const existingStreamer = await this.streamerModel.findByIdAndUpdate(
      streamerId,
      UpdateStreamerDto,
      { new: true },
    );

    if (!existingStreamer) {
      throw new NotFoundException(`Streamer #${streamerId} not found`);
    }

    return existingStreamer;
  }

  async updateStreamerVotes(
    streamerId: string,
    upvotes: number,
    downvotes: number,
  ): Promise<IStreamer> {
    const existingStreamer = await this.streamerModel.findByIdAndUpdate(
      streamerId,
      { upvotes, downvotes },
      { new: true },
    );

    if (!existingStreamer) {
      throw new NotFoundException(`Streamer #${streamerId} not found`);
    }

    return existingStreamer;
  }

  async getAllStreamers(): Promise<IStreamer[]> {
    const streamersData = await this.streamerModel.find();

    if (!streamersData || streamersData.length == 0) {
      throw new NotFoundException('No streamers found!');
    }

    return streamersData;
  }

  async getStreamer(streamerId: string): Promise<IStreamer> {
    const existingStreamer = await this.streamerModel
      .findById(streamerId)
      .exec();

    if (!existingStreamer) {
      throw new NotFoundException(`Streamer #${streamerId} not found`);
    }

    return existingStreamer;
  }

  async deleteStreamer(streamerId: string): Promise<IStreamer> {
    const deletedStreamer = await this.streamerModel.findByIdAndDelete(
      streamerId,
    );

    if (!deletedStreamer) {
      throw new NotFoundException(`Streamer #${streamerId} not found`);
    }

    return deletedStreamer;
  }

  async sendUpdateToClients(update: any) {
    this.streamerGateway.sendUpdateToClients(update);
  }
}
