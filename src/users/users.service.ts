import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Like, Repository, UpdateResult} from "typeorm";
import {User} from "./entities/user.entity";
import {HttpService} from "@nestjs/axios";
import axios from "axios";

require('dotenv').config()

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private httpService: HttpService
    ) {
    }

    create(body: CreateUserDto) {
        const user = this.usersRepository.create(body);
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<any> {
        const user = await this.usersRepository.findOne({
            where: {
                username: id,
            },
            relations: ["reviews_by_me", "others_reviews"],
            order: {
                updated_at: 'DESC',
            },
        });
        if (!user) throw  new NotFoundException("User with that id not found");
        else return user;
    }

    async search(username: string) {
        const user = await this.usersRepository.findOne({username: username});
        if (user) return user;
        else {
            const token = 'AAAAAAAAAAAAAAAAAAAAAPJ4VAEAAAAAkDNY0ky0h3uwsHBl6Ugn4WYU7Eo%3DlwrPxVlqlVw2BeotB2Ip8TvEVcQrwOLUTpmpeIPz9mCC3aA1xa';
            const consumer_key = process.env.CONSUMER_KEY;
            const consumer_secret = process.env.CONSUMER_SECRET;

            try {
                const response = await axios.get(`https://api.twitter.com/2/users/by?usernames=${username}`,
                    {
                        params: {"user.fields": "description,profile_image_url,name,verified"},
                        headers: {
                            authorization:
                                `Bearer ${token}`
                        }
                    });
                if (response.data.data[0]) {
                    await this.create(response.data.data[0])
                }
                return response.data;
            } catch (error) {
                if (error && error.code === 'ER_DUP_ENTRY') {
                    // maybe send BAD_REQUEST to client
                }
                // throw new Error(error.message);
            }
        }
    }

    async update(id: string, body: Partial<User>) {
        const user = await this.findOne(id);
        Object.assign(user, body);
        return this.usersRepository.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (!user) {
            throw  new Error("User does not exist");
        } else {
            return this.usersRepository.remove(user);
        }
    }
}
