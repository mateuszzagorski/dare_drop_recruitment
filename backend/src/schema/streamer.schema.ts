import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

@Schema()
export class Streamer {
  @Prop()
  @IsString()
  @MaxLength(30, {
    message: 'Name must be shorter than or equal to 30 characters',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty({ message: 'Platform should not be empty' })
  platform: string;

  @Prop()
  @IsString()
  @MaxLength(100, {
    message: 'Description must be shorter than or equal to 100 characters',
  })
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @Prop()
  @IsNumber({}, { message: 'Upvotes must be a number' })
  @IsNotEmpty({ message: 'Upvotes should not be empty' })
  upvotes: number;

  @Prop()
  @IsNumber({}, { message: 'Downvotes must be a number' })
  @IsNotEmpty({ message: 'Downvotes should not be empty' })
  downvotes: number;
}
export const StreamerSchema = SchemaFactory.createForClass(Streamer);
