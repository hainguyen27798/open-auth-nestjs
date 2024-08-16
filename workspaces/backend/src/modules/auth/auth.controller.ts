import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ResponseDto } from '@/common';
import { LoginDto, UserTokenInfoDto } from '@/modules/auth/dto';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';

class UserTokenInfoDtoType extends ResponseDto(UserTokenInfoDto) {}

@Controller('auth')
@ApiTags('Local Auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        type: LoginDto,
    })
    @ApiOkResponse({
        type: UserTokenInfoDtoType,
        description: 'User info with token',
    })
    login(@Req() req: Request) {
        return req.user;
    }
}
