import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateStreamerDto {
  @IsString()
  @MaxLength(30, {
    message: 'Name must be shorter than or equal to 30 characters',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  readonly name: string;

  @IsString()
  @MaxLength(30, {
    message: 'Platform must be shorter than or equal to 30 characters',
  })
  @IsNotEmpty({ message: 'Platform should not be empty' })
  readonly platform: string;

  @IsString()
  @MaxLength(100, {
    message: 'Description must be shorter than or equal to 100 characters',
  })
  @IsNotEmpty({ message: 'Description should not be empty' })
  readonly description: string;

  @IsNumber({}, { message: 'Upvotes must be a number' })
  @IsNotEmpty({ message: 'Upvotes should not be empty' })
  readonly upvotes: number;

  @IsNumber({}, { message: 'Downvotes must be a number' })
  @IsNotEmpty({ message: 'Downvotes should not be empty' })
  readonly downvotes: number;
}
