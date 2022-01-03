import {IsBoolean, IsString} from "class-validator";
import {User} from "../../users/entities/user.entity";

export class CreateReviewDto {
    @IsString()
    content?: string;

    review_by?: User;

    review_for?: User;
}
