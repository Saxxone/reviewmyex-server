import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>
  ) {
  }

  create(createReviewDto: CreateReviewDto) {
    return this.reviewsRepository.create();
  }

  findAll() {
    return this.reviewsRepository.find();
  }

  findOne(id: string) {
    return this.reviewsRepository.findOne(id);
  }

  // update(id: number, data: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  remove(id: string) {
    return this.reviewsRepository.delete(id);
  }
}
