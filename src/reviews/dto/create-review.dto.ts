import { IsString } from "class-validator";

export class CreateReviewDto {
  @IsString()
  content: string;

  @IsString()
  review_by: string;

  @IsString()
  review_for: string;
}
