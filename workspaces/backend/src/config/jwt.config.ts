import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { Configuration } from '@/config';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions {
        return Configuration.instance.jwtOptions;
    }
}
