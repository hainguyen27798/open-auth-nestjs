import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { MessageResponseDto, ResponseDto } from '@/common';
import { HEADER_KEY } from '@/constants';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto, UserTokenInfoDto } from '@/modules/auth/dto';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';

class UserTokenInfoDtoType extends ResponseDto(UserTokenInfoDto) {}

@Controller('auth')
@ApiTags('Local Auth')
export class AuthController {
    constructor(private readonly _AuthService: AuthService) {}

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

    @Post('logout')
    @ApiHeader({
        name: HEADER_KEY.REFRESH_TOKEN,
        required: true,
    })
    @ApiOkResponse({
        type: MessageResponseDto,
    })
    logout(@Req() req: Request) {
        const refreshToken = req.get(HEADER_KEY.REFRESH_TOKEN);
        return this._AuthService.logout(refreshToken);
    }
}
