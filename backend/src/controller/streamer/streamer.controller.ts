import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateStreamerDto } from 'src/dto/create-streamer.dto';
import { UpdateStreamerDto } from 'src/dto/update-streamer.dto';
import { StreamerService } from 'src/service/streamer/streamer.service';

@Controller('streamers')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Post()
  async createStreamer(
    @Res() response,
    @Body() createStreamerDto: CreateStreamerDto,
  ) {
    try {
      const newStreamer = await this.streamerService.createStreamer(
        createStreamerDto,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Streamer has been created successfully',
        newStreamer,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put('/:id')
  async updateStreamer(
    @Res() response,
    @Param('id') streamerId: string,
    @Body() updateStreamerDto: UpdateStreamerDto,
  ) {
    try {
      const existingStreamer = await this.streamerService.updateStreamer(
        streamerId,
        updateStreamerDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Streamer has been successfully updated',
        existingStreamer,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  async getStreamers(@Res() response) {
    try {
      const streamerData = await this.streamerService.getAllStreamers();

      return response.status(HttpStatus.OK).json({
        message: 'All streamers data found successfully',
        streamerData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getStreamer(@Res() response, @Param('id') streamerId: string) {
    try {
      const existingStreamer = await this.streamerService.getStreamer(
        streamerId,
      );

      if (!existingStreamer) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Error: Streamer not found.',
        });
      }

      return response.status(HttpStatus.OK).json({
        message: 'Streamer found successfully',
        existingStreamer,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  
  @Delete('/:id')
  async deleteStreamer(@Res() response, @Param('id') streamerId: string) {
    try {
      const deletedStreamer = await this.streamerService.deleteStreamer(
        streamerId,
      );

      if (!deletedStreamer) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Error: Streamer not found.',
        });
      }

      return response.status(HttpStatus.OK).json({
        message: 'Streamer deleted successfully',
        deletedStreamer,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put('/:id/vote')
  async voteForStreamer(
    @Res() response,
    @Param('id') streamerId: string,
    @Body() voteData: { upvotes: number; downvotes: number },
  ) {
    try {
      const existingStreamer = await this.streamerService.updateStreamerVotes(
        streamerId,
        voteData.upvotes,
        voteData.downvotes,
      );

      if (!existingStreamer) {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Error: Streamer not found.',
        });
      }

      return response.status(HttpStatus.OK).json({
        message: 'Votes updated successfully',
        existingStreamer,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
