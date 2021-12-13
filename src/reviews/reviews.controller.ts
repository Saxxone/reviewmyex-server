import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {
  }

  @Post("/create")
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get("/get-all-reviews")
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get("/get-review/:id")
  findOne(@Param("id") id: string) {
    const review = this.reviewsService.findOne(id);
    if (!review) {
      throw new NotFoundException("Review with given id not found");
    }
    return review;
  }



  //USERS ARE NOT ALLOWED TO EDIT REVIEWS

  // @Patch("/update/:id")
  // update(@Param("id") id: string, @Body() data: UpdateReviewDto) {
  //   return this.reviewsService.update(+id, data);
  // }

  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(id);
  }
}
