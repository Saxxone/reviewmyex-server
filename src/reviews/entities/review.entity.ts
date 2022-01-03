import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    BaseEntity,
    DeleteDateColumn, UpdateDateColumn, CreateDateColumn,
} from "typeorm";
import {User} from '../../users/entities/user.entity';
import {Exclude} from "class-transformer";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.reviews_by_me, {cascade: true})
    review_by: User;

    @ManyToOne(() => User, (user) => user.others_reviews, {cascade: true})
    review_for: User;

    @Column({default: true})
    is_active: boolean;

    @UpdateDateColumn()
    updated_at: string;

    @Exclude()
    @DeleteDateColumn()
    deleted_at: string;

    @CreateDateColumn()
    created_at: string;
}
