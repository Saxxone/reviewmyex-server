import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
  pid?: number;

  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  profile_image_url?: string;

  @IsString()
  description?: string;

  @IsString()
  average_rating?: string;

  @IsBoolean()
  is_active?: boolean;
}
