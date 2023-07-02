import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamerSchema } from 'src/schema/streamer.schema';
import { StreamerService } from './service/streamer/streamer.service';
import { StreamerController } from './controller/streamer/streamer.controller';
import { StreamerGateway } from './streamer.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adminUser:RMRoEvRs2Bq78JWb@cluster0.tbrc6mc.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Streamer', schema: StreamerSchema }]),
  ],
  controllers: [AppController, StreamerController],
  providers: [AppService, StreamerService, StreamerGateway],
})
export class AppModule {}
