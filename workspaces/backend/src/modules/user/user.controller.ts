import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common';
import { ResponseDto } from '@/common/dto/response.dto';
import { UserDto } from '@/modules/user/dto';
import { UserService } from '@/modules/user/user.service';

class UserInfosDto extends ResponseDto(UserDto, true) {}

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(private _UserService: UserService) {}

    @Get()
    // @Auth(UserRoles.SUPERUSER)
    @ApiOperation({ description: 'Get all users' })
    @ApiOkResponse({
        type: UserInfosDto,
    })
    getUsers(@Query(new ValidationPipe({ transform: true })) pageOption: PageOptionsDto) {
        return this._UserService.getUsers(pageOption);
    }
}
