import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common';
import { ResponseDto } from '@/common/dto/response.dto';
import { Auth, AuthUser } from '@/decorators';
import { UserDto } from '@/modules/user/dto';
import { UserService } from '@/modules/user/user.service';
import { TAuthUser } from '@/types';

class UserInfosDto extends ResponseDto(UserDto, true) {}
class UserInfoDto extends ResponseDto(UserDto) {}

@Controller('users')
@ApiTags('Users')
@Auth()
export class UserController {
    constructor(private _UserService: UserService) {}

    @Get('me')
    @ApiOperation({ description: 'Get me' })
    @ApiOkResponse({
        type: UserInfoDto,
    })
    getMe(@AuthUser() user: TAuthUser) {
        return this._UserService.findUserById(user.userId);
    }

    @Get()
    @ApiOperation({ description: 'Get all users' })
    @ApiOkResponse({
        type: UserInfosDto,
    })
    getUsers(@Query(new ValidationPipe({ transform: true })) pageOption: PageOptionsDto) {
        return this._UserService.getUsers(pageOption);
    }
}
