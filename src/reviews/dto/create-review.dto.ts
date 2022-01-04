import {IsBoolean, IsString} from "class-validator";
import {User} from "../../users/entities/user.entity";

export class CreateReviewDto {
    @IsString()
    content?: string;

    @IsString()
    review_by?: User;

    @IsString()
    review_for?: User;
}
