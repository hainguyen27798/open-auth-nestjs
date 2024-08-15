import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageOptionsDto, SuccessDto } from '@/common';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly _UsersRepository: Repository<User>) {}

    async getUsers(pageOptions: PageOptionsDto) {
        const data = await this._UsersRepository.find({
            take: pageOptions.take,
            skip: pageOptions.skip,
        });
        return new SuccessDto(null, HttpStatus.OK, data.toDtos());
    }
}
