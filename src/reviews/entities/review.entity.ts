import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne, BaseEntity
} from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity()
export class Review extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.reviews_by_me)
  review_by: User;

  @ManyToOne(() => User, (user) => user.others_reviews)
  review_for: User;

  @Column({ default: true })
  is_active: boolean;
}
