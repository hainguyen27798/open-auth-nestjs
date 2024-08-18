import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common';
import { ApiDataResponse, Auth, AuthUser } from '@/decorators';
import { UserDto } from '@/modules/user/dto';
import { UserService } from '@/modules/user/user.service';
import { TAuthUser } from '@/types';

@Controller('users')
@ApiTags('Users')
@Auth()
export class UserController {
    constructor(private _UserService: UserService) {}

    @Get('me')
    @ApiOperation({ description: 'Get me' })
    @ApiDataResponse({
        type: UserDto,
    })
    getMe(@AuthUser() user: TAuthUser) {
        return this._UserService.findUserById(user.userId);
    }

    @Get()
    @ApiOperation({ description: 'Get all users' })
    @ApiDataResponse({
        type: UserDto,
        isArray: true,
    })
    getUsers(@Query(new ValidationPipe({ transform: true })) pageOption: PageOptionsDto) {
        return this._UserService.getUsers(pageOption);
    }
}
