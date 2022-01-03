import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  UpdateDateColumn,
  DeleteDateColumn, CreateDateColumn
} from "typeorm";
import { Review } from "../../reviews/entities/review.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseEntity {
  // @Exclude()
  // @PrimaryGeneratedColumn('uuid')
  // pid: number;

  @Column({
    nullable: true
  })
  name: string;

  @Column({
    nullable: true
  })
  id: string;

  @Column({
    nullable: true
  })
  email: string;

  @Exclude()
  @Column({
    nullable: true
  })
  password: string;

  @Column({
    unique: true,
    primary: true,
    nullable: false
  })
  username: string;

  @Column()
  profile_image_url: string;

  @Column({nullable: true})
  description: string;

  @Column({
    default: 0,
    nullable: true
  })
  average_rating: string;

  @OneToMany((type) => Review, (review) => review.review_for)
  reviews_by_me: Review[];

  @OneToMany((type) => Review, (review) => review.review_by)
  others_reviews: Review[];

  @Exclude()
  @Column({ default: true })
  is_active: boolean;

  @UpdateDateColumn()
  updated_at: string;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: string;

  @CreateDateColumn()
  created_at: string;
}
