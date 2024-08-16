import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

import { PageOptionsDto, SuccessDto } from '@/common';
import { Configuration } from '@/config';
import { SUPERUSER } from '@/constants';
import { BcryptHelper } from '@/helpers';
import { FindOrCreateSuperRoleCommand } from '@/modules/role/commands';
import { Role } from '@/modules/role/entities/role.entity';
import { UserStatus } from '@/modules/user/constants';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly _UsersRepository: Repository<User>,
        private readonly _DataSource: DataSource,
        private readonly _CommandBus: CommandBus,
    ) {}

    async getUsers(pageOptions: PageOptionsDto) {
        const data = await this._UsersRepository.find({
            take: pageOptions.take,
            skip: pageOptions.skip,
        });
        return new SuccessDto(null, HttpStatus.OK, data.toDtos());
    }

    async findUserBy(query: FindOptionsWhere<User>): Promise<User> {
        const user = await this._UsersRepository.findOneBy(query);

        if (!user) {
            throw new NotFoundException('user_is_not_exited');
        }

        return user;
    }

    async createSuperUser() {
        const { email, pass } = Configuration.instance.superuser;
        const superUser = await this._UsersRepository.findOneBy({ email });

        if (!superUser) {
            await this._DataSource.manager.transaction(async (entityManager) => {
                const superRole: Role = await this._CommandBus.execute(new FindOrCreateSuperRoleCommand(entityManager));

                const password = await BcryptHelper.hashPassword(pass);

                await entityManager.save(
                    this._UsersRepository.create({
                        name: SUPERUSER,
                        email,
                        password,
                        roleId: superRole.id,
                        verify: true,
                        status: UserStatus.ACTIVE,
                    }),
                );
            });
        }
    }
}
